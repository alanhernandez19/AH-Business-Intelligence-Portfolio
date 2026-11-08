# Variables, preguntas y decisiones

La revisión cubre los **26 campos** de las siete tablas fuente. La evidencia requerida indica qué se comprueba antes de utilizar cada variable; una clave o categoría disponible no implica por sí sola una interpretación comercial.

| Tabla y campo | Pregunta o KPI posible | Decisión que apoya | Evidencia y condición |
| --- | --- | --- | --- |
| DIM_CATEGORIA.CATEGORIA_CVE | ¿Cómo se distribuyen movimientos por categoría? | Priorizar familias para estudiar | Unión única con producto |
| DIM_CATEGORIA.CATEGORIA_NOMBRE | ¿Cuánto cambia el análisis al excluir servicios? | Separar sensibilidad de la lectura base | Etiquetas verificadas; exclusión explícita |
| DIM_MUNICIPIO.MUNICIPIO_CVE | ¿Dónde hay cartera con domicilio válido? | Explorar cobertura territorial | Clave de cinco dígitos; cruce por clave |
| DIM_MUNICIPIO.NOM_MUN | ¿Qué municipio corresponde a la clave? | Comunicar territorio | Nombre junto con entidad; evitar homónimos |
| DIM_MUNICIPIO.ESTADO_CLAVE | ¿Qué entidad contiene cada municipio? | Agrupar territorios | Prefijo y catálogo estatal conciliados |
| DIM_MUNICIPIO.IM_2020 | ¿Existe contexto territorial interpretable? | Contrastar patrones agregados | Definición y dirección del índice pendientes de acreditar |
| DIM_TIENDA.TIENDA_CVE | ¿En qué tienda ocurrió cada movimiento? | Revisar canal y cobertura | Claves sin catálogo visibles como desconocidas |
| DIM_TIENDA.TIPO | ¿Fue físico, Internet o boutique? | Definir origen y adopción | No imputar canal faltante; empates por día separados |
| DIM_TIENDA.MUNICIPIO_CVE | ¿Dónde se ubica la tienda? | Explorar ubicación comercial | No equiparar a domicilio del cliente |
| DIM_SEGMENTOS.CLIENTE_CVE | ¿Hay segmento de origen para el cliente? | Evaluar cobertura del atributo | Unión única; ausentes explícitos |
| DIM_SEGMENTOS.SEGMENTO | ¿Difieren patrones por código original? | Investigar segmentación existente | Sin etiqueta ni orden empresarial acreditados |
| DIM_CLIENTES.CLIENTE_CVE | ¿Cuántas personas distintas tienen actividad? | Definir denominador de cartera | Consolidar cuentas y validar identidad |
| DIM_CLIENTES.CUENTA_CVE | ¿Cuántas cuentas se asocian a cada cliente? | Evitar sobreconteo | Identificador opaco conservado como texto |
| DIM_CLIENTES.MUNICIPIO_CVE | ¿Qué cobertura de domicilio existe? | Seleccionar cortes territoriales confiables | Nulos y claves sin correspondencia visibles |
| DIM_CLIENTES.EDAD | ¿Es interpretable la distribución etaria? | Decidir si usar edad como filtro | Vigencia y cobertura baja; sin imputación |
| DIM_PRODUCTO.SKU_CVE | ¿Qué producto integra cada línea? | Relacionar ventas con catálogo | Unión exacta y no encontrados auditados |
| DIM_PRODUCTO.MARCA_CVE | ¿Hay concentración por marca codificada? | Investigar composición | Clave compuesta categoría–marca; sin nombre de marca |
| DIM_PRODUCTO.CATEGORIA_CVE | ¿Qué categoría corresponde al SKU? | Comparar composición y sensibilidad | Relación única con catálogo |
| FAC_VENTAS.TICKET | ¿Cuántos tickets distintos hay? | Diferenciar órdenes de líneas | Unicidad/duplicados y agregación por ticket |
| FAC_VENTAS.SKU_CVE | ¿Cuántas líneas y productos se observan? | Analizar mezcla | Grano ticket–SKU en la versión revisada |
| FAC_VENTAS.TIENDA_CVE | ¿Qué canal y ubicación originaron el movimiento? | Comparar físico e Internet | Cruce con tienda; faltantes no imputados |
| FAC_VENTAS.CUENTA_CVE | ¿A qué cliente pertenece el movimiento? | Consolidar actividad | Cruce muchos a uno con maestro de cuentas |
| FAC_VENTAS.FECHA | ¿En qué cohorte y ventana ocurre la compra? | Comparar adopción con seguimiento igual | Fecha ISO, sin hora; cortes y empates por día |
| FAC_VENTAS.TIPO_OPERACION | ¿Distingue compra de devolución? | Definir reglas monetarias | Solo un código observado; no resuelve negativos |
| FAC_VENTAS.MONTO | ¿Qué importe firmado y concentración se registran? | Describir mezcla y sensibilidad | Centavos exactos; moneda y signo por confirmar |
| FAC_VENTAS.ITEMS | ¿Cuántas unidades se registran? | Describir composición | Valores fraccionarios conservados |

## Enriquecimientos seleccionados

El calendario se deriva de `FECHA`; estado y municipio se unen por claves; categoría y canal se obtienen de sus catálogos internos. Primera actividad, visitas, tickets, recencia, recurrencia, preferencias y cohortes son derivaciones con reglas verificables. Cuando existe el archivo ITER oficial, se añaden población y proporción municipal de viviendas con Internet con su año explícito.

La fuente carece de código postal, costo, sesiones web, campañas y datos de rentabilidad. Por ello, el caso no calcula distancia individual, conversión de visitas, efecto de campaña, margen, CAC ni retorno económico. Tampoco deduce ingreso personal a partir del municipio.
