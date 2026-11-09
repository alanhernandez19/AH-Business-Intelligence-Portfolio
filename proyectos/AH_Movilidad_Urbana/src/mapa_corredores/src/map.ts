export interface Route {
    key: string; label: string; path: string; value: number;
    origin: string; destination: string; identity?: any;
}
export interface MapHost {
    select: (route: Route, multi: boolean) => void;
    clear: () => void;
    tooltip: (route: Route | null, event?: PointerEvent) => void;
    context?: (route: Route, event: MouseEvent) => void;
}
const NS = 'http://www.w3.org/2000/svg';
const svgNode = (name: string, attrs: Record<string, string> = {}) => {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
};
const number = (v: number) => new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(v);

/** Geometry comes from ETL. The renderer only handles presentation and host interactions. */
export class CorridorMap {
    private root: HTMLDivElement;
    private svg: SVGSVGElement;
    private base: SVGGElement;
    private lines: SVGGElement;
    private summary: HTMLElement;
    private detail: HTMLElement;
    private empty: HTMLElement;
    private routes: Route[] = [];
    private selected = new Set<string>();
    private viewport = [100, 30, 650, 540];
    private city = [100, 30, 650, 540];
    private fitted = this.city.slice();
    private width = 960;
    private height = 560;
    private drag: {x: number; y: number; box: number[]; moved: boolean} | null = null;
    private blockClick = false;
    private background = '';
    private disposers: Array<() => void> = [];

    constructor(element: HTMLElement, private host: MapHost) {
        this.root = document.createElement('div');
        this.root.className = 'ah-corridor-map';
        element.appendChild(this.root);
        const style = document.createElement('style');
        style.textContent = `
          .ah-corridor-map{height:100%;width:100%;box-sizing:border-box;display:flex;flex-direction:column;position:relative;overflow:hidden;background:#fff;color:#12263E;font:16px 'Segoe UI',Arial,sans-serif}
          .ah-corridor-map *{box-sizing:border-box}.ah-map-header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 6px 9px;border-bottom:1px solid #D5E3EF;flex-wrap:wrap}
          .ah-map-summary{font-weight:600;font-size:16px;line-height:1.4}.ah-map-toolbar{display:flex;gap:5px;flex-wrap:wrap}
          .ah-map-toolbar button{font:600 14px 'Segoe UI',Arial;border:1px solid #B8CBDC;border-radius:5px;padding:5px 9px;background:#F3F7FC;color:#174A79;cursor:pointer;min-height:30px}
          .ah-map-toolbar button:hover{background:#DCEEFF}.ah-corridor-map :focus-visible{outline:3px solid #C76550;outline-offset:2px}
          .ah-map-scene{flex:1;min-height:0;position:relative;background:#FBFDFF;overflow:hidden}.ah-map-scene svg{height:100%;width:100%;display:block;touch-action:none;cursor:grab}
          .ah-map-scene svg:active{cursor:grabbing}.ah-map-hit{cursor:pointer}.ah-map-route:focus .ah-map-stroke{stroke:#C76550!important;opacity:1!important}
          .ah-map-detail{padding:8px 10px;border-top:1px solid #D5E3EF;background:#EAF4FD;line-height:1.35;min-height:48px;font-size:15px;overflow-wrap:anywhere}
          .ah-map-detail strong{color:#174A79}.ah-map-empty{position:absolute;inset:0;display:none;align-items:center;justify-content:center;padding:24px;text-align:center;font-size:19px;font-weight:600;color:#174A79;background:#F3F7FCe8}
          .ah-map-caption{position:absolute;bottom:6px;left:8px;pointer-events:none;color:#45617D;font-size:12px;background:#FFFFFFE8;padding:3px 6px;border-radius:4px}
          @media(max-width:600px){.ah-map-summary{font-size:14px}.ah-map-toolbar button{font-size:12px;padding:4px 7px}.ah-map-detail{font-size:13px}}
        `;
        this.root.appendChild(style);
        const header = document.createElement('div'); header.className = 'ah-map-header';
        this.summary = document.createElement('div'); this.summary.className = 'ah-map-summary';
        this.summary.setAttribute('aria-live','polite'); header.appendChild(this.summary);
        const toolbar = document.createElement('div'); toolbar.className = 'ah-map-toolbar'; toolbar.setAttribute('role','toolbar'); toolbar.setAttribute('aria-label','Navegación del mapa');
        [ ['+','Acercar',()=>this.zoom(.75)], ['−','Alejar',()=>this.zoom(1.3)],
          ['Ajustar','Ajustar a las conexiones',()=>this.setBox(this.fitted)],
          ['Ciudad','Ver toda la ciudad',()=>this.setBox(this.city)],
          ['Limpiar','Limpiar selección',()=>this.host.clear()] ].forEach(([label, title, action])=>{
            const b=document.createElement('button'); b.type='button';b.textContent=String(label);b.title=String(title);b.setAttribute('aria-label',String(title));
            b.addEventListener('click',action as EventListener);toolbar.appendChild(b);
        });
        header.appendChild(toolbar);this.root.appendChild(header);
        const scene = document.createElement('div');scene.className='ah-map-scene';
        this.svg=svgNode('svg',{'role':'group','aria-label':'Mapa interactivo de conexiones. Arrastre para desplazar; use los controles para ampliar.','tabindex':'0'}) as SVGSVGElement;
        const defs=svgNode('defs');
        ['blue','coral'].forEach((id)=>{
            const marker=svgNode('marker',{id:'ah-arrow-'+id,viewBox:'0 0 10 10',refX:'8',refY:'5',markerWidth:'4',markerHeight:'4',orient:'auto'});
            marker.appendChild(svgNode('path',{d:'M0 0L10 5L0 10Z',fill:id==='blue'?'#248CDD':'#C76550'}));defs.appendChild(marker);
        });this.svg.appendChild(defs);
        this.base=svgNode('g',{'aria-hidden':'true',fill:'#EDF3F9',stroke:'#B8CBDC','stroke-width':'.7'}) as SVGGElement;
        this.lines=svgNode('g') as SVGGElement;this.svg.append(this.base,this.lines);scene.appendChild(this.svg);
        const caption=document.createElement('div');caption.className='ah-map-caption';caption.textContent='CABA · Origen → destino · Líneas esquemáticas, sin ruta GPS';scene.appendChild(caption);
        this.empty=document.createElement('div');this.empty.className='ah-map-empty';this.empty.setAttribute('role','status');scene.appendChild(this.empty);this.root.appendChild(scene);
        this.detail=document.createElement('div');this.detail.className='ah-map-detail';this.detail.setAttribute('aria-live','polite');this.root.appendChild(this.detail);
        this.svg.addEventListener('pointerdown',(e)=>{
            if(e.button!==0)return;this.drag={x:e.clientX,y:e.clientY,box:this.viewport.slice(),moved:false};
        });
        const move=(e:PointerEvent)=>{
            if(!this.drag)return;
            const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;
            if(Math.hypot(dx,dy)>4){this.drag.moved=true;this.host.tooltip(null);}
            if(this.drag.moved){const r=this.svg.getBoundingClientRect();const s=Math.min(r.width/this.drag.box[2],r.height/this.drag.box[3]);this.setBox([this.drag.box[0]-dx/s,this.drag.box[1]-dy/s,this.drag.box[2],this.drag.box[3]]);}
        };
        const up=()=>{if(this.drag){this.blockClick=this.drag.moved;this.drag=null;}};
        window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
        this.disposers.push(()=>window.removeEventListener('pointermove',move),()=>window.removeEventListener('pointerup',up));
        this.svg.addEventListener('click',(e)=>{
            if(this.blockClick){this.blockClick=false;return;}
            if(!(e.target as Element).closest('.ah-map-route'))this.host.clear();
        });
        this.svg.addEventListener('wheel',(e)=>{e.preventDefault();this.zoom(e.deltaY>0?1.15:.87,e.clientX,e.clientY);},{passive:false});
        this.root.addEventListener('keydown',(e)=>{
            if(e.key==='Escape'){this.host.clear();e.preventDefault();}
            if(e.target!==this.svg)return;
            if(e.key==='+'||e.key==='='){this.zoom(.75);e.preventDefault();}
            if(e.key==='-'){this.zoom(1.3);e.preventDefault();}
            const d:Record<string,number[]>={ArrowLeft:[-.1,0],ArrowRight:[.1,0],ArrowUp:[0,-.1],ArrowDown:[0,.1]};
            if(d[e.key]){const [x,y,w,h]=this.viewport;this.setBox([x+d[e.key][0]*w,y+d[e.key][1]*h,w,h]);e.preventDefault();}
        });
        this.setSelection([]);
    }
    update(routes: Route[], background: string, width: number, height: number): void {
        this.width=width;this.height=height;this.root.style.width=width+'px';this.root.style.height=height+'px';
        if(background && background!==this.background){
            const xml=new DOMParser().parseFromString(background,'image/svg+xml');
            const polygons=Array.from(xml.querySelectorAll('g[fill="#F3F7FC"] > path'));
            this.base.replaceChildren();
            polygons.forEach(p=>{const d=p.getAttribute('d')||'';if(/^[MLZmlz\d\s.,+-]+$/.test(d))this.base.appendChild(svgNode('path',{d,'vector-effect':'non-scaling-stroke'}));});
            this.background=background;
            if(this.base.childElementCount){const b=this.base.getBBox();this.city=[b.x-12,b.y-12,b.width+24,b.height+24];}
        }
        const previous=this.routes.map(r=>r.key).join('|');
        this.routes=routes.filter(r=>Number.isFinite(r.value)&&r.value>0&&/^<path\s/.test(r.path));
        this.lines.replaceChildren();
        const maximum=Math.max(1,...this.routes.map(r=>r.value));
        this.routes.forEach(route=>{
            const xml=new DOMParser().parseFromString('<svg xmlns="'+NS+'">'+route.path+'</svg>','image/svg+xml');
            const raw=xml.querySelector('path')?.getAttribute('d')||'';
            const match=raw.match(/^M(-?[\d.]+)[ ,](-?[\d.]+)L(-?[\d.]+)[ ,](-?[\d.]+)$/);
            if(!match)return;
            const [x1,y1,x2,y2]=match.slice(1).map(Number);if(![x1,y1,x2,y2].every(Number.isFinite))return;
            const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);
            const bend=Math.min(18,Math.max(3,len*.06));
            const d=len<.1?`M${x1} ${y1}c-14 -20 14 -20 0 0`:`M${x1} ${y1}Q${(x1+x2)/2-dy/len*bend} ${(y1+y2)/2+dx/len*bend} ${x2} ${y2}`;
            const g=svgNode('g',{class:'ah-map-route','data-key':route.key,tabindex:'0',role:'button','aria-label':`${route.label}: ${number(route.value)} viajes`});
            const stroke=svgNode('path',{class:'ah-map-stroke',d,fill:'none',stroke:'#248CDD','stroke-width':String(1.7+3.8*Math.sqrt(route.value/maximum)),'stroke-opacity':'.78','vector-effect':'non-scaling-stroke','marker-end':'url(#ah-arrow-blue)'});
            g.appendChild(stroke);g.appendChild(svgNode('path',{class:'ah-map-hit',d,fill:'none',stroke:'transparent','stroke-width':'13','vector-effect':'non-scaling-stroke'}));
            g.appendChild(svgNode('circle',{cx:String(x1),cy:String(y1),r:'1.8',fill:'#174A79','aria-hidden':'true'}));
            g.appendChild(svgNode('circle',{cx:String(x2),cy:String(y2),r:'2',fill:'#fff',stroke:'#248CDD','stroke-width':'.8','aria-hidden':'true'}));
            const title=svgNode('title');title.textContent=route.label+' · '+number(route.value)+' viajes';g.appendChild(title);
            g.addEventListener('click',(event)=>{event.stopPropagation();if(this.blockClick){this.blockClick=false;return;}this.host.select(route,(event as MouseEvent).ctrlKey||(event as MouseEvent).metaKey);});
            g.addEventListener('keydown',(event:KeyboardEvent)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();this.host.select(route,event.ctrlKey||event.metaKey);}});
            g.addEventListener('pointermove',(event:PointerEvent)=>{if(!this.drag?.moved)this.host.tooltip(route,event);});
            g.addEventListener('pointerleave',()=>this.host.tooltip(null));
            g.addEventListener('contextmenu',(event:MouseEvent)=>{event.preventDefault();this.host.context?.(route,event);});
            this.lines.appendChild(g);
        });
        this.summary.textContent=`${number(this.routes.length)} conexiones · ${number(this.routes.reduce((s,r)=>s+r.value,0))} viajes representados`;
        this.empty.style.display=this.lines.childElementCount?'none':'flex';
        this.empty.textContent='Sin conexiones representables para los filtros actuales.';
        if(this.lines.childElementCount){const b=this.lines.getBBox();const w=Math.max(110,b.width+48),h=Math.max(90,b.height+48);this.fitted=[b.x+b.width/2-w/2,b.y+b.height/2-h/2,w,h];}else this.fitted=this.city.slice();
        if(previous!==this.routes.map(r=>r.key).join('|'))this.setBox(this.fitted);else this.setBox(this.viewport);
        this.setSelection(Array.from(this.selected));
    }
    setSelection(keys: string[]): void {
        this.selected=new Set(keys);
        Array.from(this.lines.children).forEach(g=>{
            const yes=this.selected.has(g.getAttribute('data-key')||'');
            g.setAttribute('aria-pressed',String(yes));
            const p=g.querySelector('.ah-map-stroke');
            p?.setAttribute('stroke',yes?'#C76550':'#248CDD');p?.setAttribute('opacity',this.selected.size&&!yes?'.16':'1');p?.setAttribute('marker-end',yes?'url(#ah-arrow-coral)':'url(#ah-arrow-blue)');
        });
        const selected=this.routes.filter(r=>this.selected.has(r.key));
        this.detail.replaceChildren();
        const strong=document.createElement('strong');
        if(selected.length===1){strong.textContent=selected[0].label;this.detail.append(strong,document.createTextNode(' · '+number(selected[0].value)+' viajes'));}
        else if(selected.length){strong.textContent=`${selected.length} conexiones seleccionadas`;this.detail.append(strong,document.createTextNode(' · '+number(selected.reduce((s,r)=>s+r.value,0))+' viajes'));}
        else{strong.textContent='Explore y seleccione';this.detail.append(strong,document.createTextNode(' · Clic: filtrar el informe. Ctrl + clic: selección múltiple. Arrastre o use + / − para explorar.'));}
    }
    private setBox(box: number[]): void {this.viewport=box.slice();this.svg.setAttribute('viewBox',this.viewport.join(' '));}
    private zoom(factor: number, clientX?: number, clientY?: number): void {
        const [x,y,w,h]=this.viewport;const limit=Math.max(this.city[2],this.city[3]);
        const f=Math.max(45/w,Math.min(limit*2/w,factor));
        let px=x+w/2,py=y+h/2;
        if(clientX!==undefined&&clientY!==undefined){const pt=this.svg.createSVGPoint();pt.x=clientX;pt.y=clientY;const p=pt.matrixTransform(this.svg.getScreenCTM()!.inverse());px=p.x;py=p.y;}
        this.setBox([px-(px-x)*f,py-(py-y)*f,w*f,h*f]);
    }
    destroy():void{this.disposers.forEach(dispose=>dispose());this.root.remove();}
}
