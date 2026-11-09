import powerbi from 'powerbi-visuals-api';
import {CorridorMap, Route} from './map';
import '../style/visual.less';

/** Thin adapter: all report filters and identities are managed by Power BI. */
export class Visual implements powerbi.extensibility.visual.IVisual {
    private map: CorridorMap;
    private selection: powerbi.extensibility.ISelectionManager;
    private routes: Route[]=[];
    private host: powerbi.extensibility.visual.IVisualHost;
    constructor(options: powerbi.extensibility.visual.VisualConstructorOptions){
        this.host=options.host;
        this.selection=this.host.createSelectionManager();
        this.map=new CorridorMap(options.element,{
            select:(route,multi)=>{if(this.host.hostCapabilities.allowInteractions!==false)this.selection.select(route.identity,multi).then(()=>this.syncSelection());},
            clear:()=>{if(this.host.hostCapabilities.allowInteractions!==false)this.selection.clear().then(()=>this.syncSelection());},
            tooltip:(route,event)=>{
                if(!route||!event){this.host.tooltipService.hide({immediately:true,isTouchEvent:false});return;}
                this.host.tooltipService.show({coordinates:[event.clientX,event.clientY],isTouchEvent:false,
                    dataItems:[{displayName:'Origen',value:route.origin},{displayName:'Destino',value:route.destination},
                    {displayName:'Viajes',value:new Intl.NumberFormat('en-US').format(route.value)}],identities:[route.identity]});
            },
            context:(route,event)=>this.selection.showContextMenu(route.identity,{x:event.clientX,y:event.clientY})
        });
        this.selection.registerOnSelectCallback(()=>this.syncSelection());
    }
    private syncSelection():void {
        const ids=this.selection.getSelectionIds();
        this.map.setSelection(this.routes.filter(r=>ids.some(id=>(id as powerbi.visuals.ISelectionId).includes(r.identity)||r.identity.includes(id))).map(r=>r.key));
    }
    update(options: powerbi.extensibility.visual.VisualUpdateOptions):void {
        this.host.eventService.renderingStarted(options);
        try{
            const table=options.dataViews?.[0]?.table;
            const index=(role:string)=>table?.columns.findIndex(c=>c.roles?.[role])??-1;
            const key=index('routeKey'),label=index('routeLabel'),path=index('path'),value=index('value'),origin=index('origin'),destination=index('destination'),base=index('background');
            this.routes=(table?.rows||[]).map((row,i)=>({key:String(row[key]??''),label:String(row[label]??''),path:String(row[path]??''),value:Number(row[value]),origin:String(row[origin]??''),destination:String(row[destination]??''),identity:this.host.createSelectionIdBuilder().withTable(table,i).createSelectionId()}));
            this.map.update(this.routes,String(table?.rows[0]?.[base]??''),options.viewport.width,options.viewport.height);
            this.syncSelection();
            this.host.eventService.renderingFinished(options);
        }catch(error){this.host.eventService.renderingFailed(options,String(error));throw error;}
    }
    getFormattingModel():powerbi.visuals.FormattingModel{return {cards:[]};}
    destroy():void{this.map.destroy();}
}
