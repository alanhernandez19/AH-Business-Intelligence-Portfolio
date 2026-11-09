# AH · Conexiones urbanas

Visual privado de Power BI construido con TypeScript, HTML y SVG. El paquete está incorporado al informe y también disponible en [AH_Conexiones_Urbanas.pbiviz](../../assets/AH_Conexiones_Urbanas.pbiviz). No requiere ejecutar este código para abrir el dashboard.

## Recompilar

Con Node.js 20.19 o posterior y npm, ejecutar `npm ci --ignore-scripts` y `npm run build` desde esta carpeta. Las herramientas se instalan localmente. El proceso de empaquetado no inicia un servidor de desarrollo ni crea certificados del sistema. El resultado queda en `dist/`.

## Datos e interacción

Recibe RutaKey, Ruta, TrazoSVG, Origen, Destino, la medida de viajes y el fondo geográfico. El informe filtra Orden = 0 y aplica el mismo límite y desempate que el detalle de conexiones. Las posiciones se preparan en el ETL; las curvas son esquemáticas y no representan GPS. El grosor codifica volumen relativo entre las conexiones visibles.

Clic selecciona; Ctrl + clic combina conexiones; Escape o Limpiar retira la selección. Los controles acercan, alejan, ajustan las conexiones o muestran la ciudad. Se puede arrastrar, usar la rueda y navegar con teclado. La selección se comunica mediante identidades nativas de Power BI; los filtros entrantes actualizan los datos del componente.

No solicita privilegios de red, archivos ni almacenamiento. Los textos se insertan como texto y solo se admiten geometrías de ruta. La tipografía y los colores siguen la línea AH. La interfaz está en español.

El componente no está certificado por Microsoft. Las políticas corporativas sobre visuales privados y la exportación automática a PDF pueden restringirlo. La copia PDF distribuida contiene una representación estática del mapa. El contacto técnico es el perfil GitHub indicado en los metadatos.
