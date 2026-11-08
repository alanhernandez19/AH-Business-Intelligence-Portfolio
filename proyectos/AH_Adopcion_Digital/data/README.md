# Datos de entrada y condiciones de acceso

## Fuente y versión

La entrada del caso es una muestra de comercio minorista recibida para un ejercicio técnico. La fuente transaccional distribuida es `input/Tablas_Dimensiones_y_Ventas.zip`. Contiene siete CSV: `FAC_VENTAS`, `DIM_CLIENTES`, `DIM_TIENDA`, `DIM_PRODUCTO`, `DIM_CATEGORIA`, `DIM_MUNICIPIO` y `DIM_SEGMENTOS`. El ETL verifica su SHA-256 contra `config/proyecto.json` antes de procesarlo.

| Componente | Granularidad | Uso |
| --- | --- | --- |
| FAC_VENTAS | Línea ticket–producto | Movimientos, fechas, importes, unidades y claves de unión |
| DIM_CLIENTES | Cuenta, con posible repetición del cliente | Consolidación de identidad y domicilio |
| DIM_PRODUCTO | Producto | Categoría y marca codificada |
| DIM_TIENDA | Tienda | Canal y ubicación comercial |
| DIM_CATEGORIA | Categoría | Nombre de categoría |
| DIM_MUNICIPIO | Municipio | Nombre, entidad e índice territorial de origen |
| DIM_SEGMENTOS | Cliente | Código de segmento sin etiqueta empresarial acreditada |

## Acceso y tratamiento

La entrega incluye `Tablas_Dimensiones_y_Ventas.zip` en `input/`. También puede seleccionar una copia mediante `AH_SOURCE_ZIP`; el programa verifica su versión y lo lee sin modificarlo. El ETL escribe seis CSV para Power BI en `output/`: `FactClienteCorte`, `FactMovimientos`, `DimCliente`, `DimProducto`, `DimTienda` y `DimReglaAnalisis`. Las dimensiones de fecha, corte y tienda preferida se calculan dentro del PBIP. El mapa de claves y los controles quedan en `evidencia/`. La correspondencia entre códigos de cliente fuente y claves sustitutas se genera en `evidencia/modelo_actual/trazabilidad_privada/` y se excluye de Git.

El catálogo `catalogos/estados_inegi.csv` procede del [servicio de claves geoestadísticas de INEGI](https://www.inegi.org.mx/servicios/catalogounico/) y conserva la fecha de consulta y procedencia en `catalogos/FUENTES.json`. La ejecución local integra los totales municipales del [ITER 2020](https://www.inegi.org.mx/contenidos/programas/ccpv/2020/doc/fd_iter_cpv2020.pdf) mediante el archivo oficial `iter_00_cpv2020_csv.zip`, verificado por SHA-256. La copia distribuida está en `input/iter_00_cpv2020_csv.zip`; también puede indicar `AH_ITER_ZIP`; el código selecciona únicamente registros municipales (`LOC = 0000`) y une por clave. El contexto territorial describe municipios, no atributos individuales de clientes.

## Identificadores y atribución

Las tablas transaccionales contienen códigos de cliente, cuenta, ticket, tienda y producto; el maestro de clientes aporta municipio y edad cuando existen. El modelo usa claves sustitutas y conserva códigos de producto y tienda para trazar los catálogos. La geografía de domicilio se limita al municipio.

El conjunto transaccional se identifica como muestra facilitada para el ejercicio; la documentación recibida no aporta una URL primaria ni una licencia nominal que pueda citarse. El código, las transformaciones, las medidas y el reporte se atribuyen a Alan Arturo Hernández Gutiérrez. Las tablas fuente y los recursos de terceros conservan su procedencia.

El catálogo estatal y los indicadores municipales se atribuyen a INEGI, Censo de Población y Vivienda 2020, ITER. Sus enlaces y hashes están en `catalogos/FUENTES.json`. El mapa estatal es el recurso integrado de Power BI para México, con claves ISO; véase la [referencia de Shape Map de Microsoft](https://learn.microsoft.com/power-bi/visuals/desktop-shape-map).
