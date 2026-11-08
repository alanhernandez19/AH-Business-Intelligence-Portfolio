# Tablero ejecutivo: alcance y decisiones

El reporte reúne análisis de adopción, trayectoria comercial, territorio y escenarios de planeación. Las siete páginas comparten identidad AH, datos y definiciones; cada vista responde una pregunta diferente. El PBIP usa medidas y filtros interactivos.

| Página | Pregunta | Decisión posible |
| --- | --- | --- |
| 01 · Pulso | ¿Cuántos clientes físicos observados adoptan Internet después? | Dimensionar la oportunidad con base y tasa |
| 02 · Cohortes | ¿Cuándo se observa la adopción a 30, 90 y 180 días? | Identificar cohortes que ameritan investigación |
| 03 · Señales | ¿Qué actividad de los primeros 30 días precede a la adopción entre los días 31 y 90? | Formular hipótesis y seleccionar un piloto medible |
| 04 · Cliente | ¿Cuál es la trayectoria de compra previa, antigüedad, inactividad y preferencia? | Entender patrones, sin usar variables posteriores como predictores |
| 05 · Territorio | ¿Dónde coincide la cartera con distinto contexto municipal y qué tan completa es la geografía? | Priorizar revisión territorial junto con tamaño de base |
| 06 · Valor | ¿Qué importes y canales se observan y cuánto cambia la lectura por regla? | Enfocar estudios de volumen; solicitar costos para una evaluación económica real |
| 07 · Escenarios | ¿Cuántos adoptantes y tickets adicionales resultarían bajo supuestos elegidos? | Dimensionar un piloto; validar efecto con comparación posterior |

## Convenciones que evitan conclusiones engañosas

- **Unidad de cliente:** `FactClienteCorte` tiene una fila por cliente, corte y regla. Las páginas de análisis principal fijan la regla base en sus medidas. La vista de sensibilidad exige una regla individual y deja sin total agregado las tasas y los elegibles.
- **Ventana completa:** los clientes sin el horizonte de seguimiento no son ceros. Los gráficos de tasas de cohortes y señales omiten celdas con menos de 200 personas elegibles o candidatas; las tablas conservan los denominadores para auditoría.
- **Señal temprana:** tickets y categorías físicos de días 0–30 preceden al resultado de días 31–90. Son asociaciones; variedad de categorías y frecuencia se solapan.
- **Retrospectiva:** los antecedentes se miden hasta la primera compra por Internet para adoptantes y hasta el corte para el resto. Por eso la página Cliente muestra distribuciones descriptivas, sin atribuirles capacidad predictiva directa.
- **Territorio:** el porcentaje de viviendas con Internet es un indicador del municipio en 2020, no una característica comprobada de cada cliente. El domicilio del cliente y la ubicación de tienda son conceptos distintos.
- **Importes:** los signos se conservan. No se afirma moneda, devolución, margen ni retorno; faltan esas definiciones y los costos. Los movimientos son una fuente única, mientras que el snapshot se evalúa bajo cuatro reglas alternativas.
- **Escenarios:** alcance, mejora de adopción y tickets por nuevo adoptante se pueden variar. La fórmula es `candidatos día 30 × alcance × mejora supuesta`; los tickets se calculan multiplicando por el supuesto de tickets. La mejora no está estimada causalmente.

## Fundamento y referencias

| Referencia | Aplicación en el caso |
| --- | --- |
| [Exploración de cohortes, Google Analytics](https://support.google.com/analytics/answer/9670133?hl=es) | Definición explícita de evento de inclusión y evento posterior. Aquí se implementan con clientes y compras observadas, agregados por mes y con horizontes completos de 30, 90 y 180 días. |
| [Esquema estrella y dimensiones con distintos papeles, Microsoft](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema) | Separación de los granos de movimiento y snapshot; dimensiones independientes para fecha de movimiento, corte, tienda del movimiento y tienda preferida. |
| [Descriptor ITER 2020, INEGI](https://www.inegi.org.mx/contenidos/programas/ccpv/2020/doc/fd_iter_cpv2020.pdf) | Selección del total municipal mediante LOC=0000 y uso de viviendas con características como denominador de conectividad; evita sumar localidades y totales. |

Las reglas de elegibilidad, tratamiento de empates, sensibilidad de importes y separación entre días 0–30 y 31–90 se documentan en el modelo y los KPI del caso. Las referencias fundamentan criterios analíticos y técnicos; los resultados se calculan con las entradas distribuidas.

## Uso en Power BI

Los filtros de cliente, cohorte y señales aplican a las páginas de adopción. Las medidas con prefijo `Base` fijan la regla de lectura y evitan sumar cuatro versiones del mismo cliente. En Valor, los importes y tickets provienen de `FactMovimientos` y no cambian por la regla de sensibilidad; el gráfico de adopción por regla sí usa cada snapshot y su propio denominador.

Las páginas están diseñadas para lectura de dirección: primero el tamaño y la trayectoria, después señales comparables, contexto y sensibilidad, y por último la prueba hipotética. El PDF de `reports/` presenta las siete páginas visibles. La consulta interactiva, los filtros y el escenario editable se utilizan desde el PBIP en Power BI Desktop.
