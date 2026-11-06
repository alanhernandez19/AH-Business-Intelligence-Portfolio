# Decisiones de diseño, razonamiento y límites

## Por qué analizar todas las variables sin convertir todas en dimensiones
La exploración revisó las 12 columnas: unicidad y calidad, distribuciones, cantidades por grupo, tasa de bajas e interacciones. Se conservaron score, antigüedad y salario en su escala original tras estudiar particiones exploratorias: no justificaban nuevas bandas persistentes en este caso. Se construyeron bandas de edad y saldo porque eran útiles para comparar perfiles y navegar el dashboard.

## Decisiones respaldadas por el EDA
1. **Cantidad y tasa juntas.** Una tasa extraordinaria en un grupo pequeño no equivale al mayor impacto absoluto. H2 ejemplifica este riesgo.
2. **H1/H2/H3 sin solapamiento.** La prioridad de condiciones produce una sola etiqueta por cliente, lo que permite sumar poblaciones y bajas sin duplicar.
3. **Radar diferente a las hipótesis.** El radar admite superposición deliberada para comparar reglas de una o dos variables, con mínimo de 100 clientes. La cobertura se calcula sobre personas únicas.
4. **Saldo cero separado.** Separar saldo cero y los cuartiles positivos evita mezclar condiciones de naturaleza distinta. Los cuartiles son propios de la muestra.
5. **Actividad × productos y saldo × productos.** Cruces relevantes para explicar heterogeneidad. Por ejemplo, entre clientes con saldo cero, un producto presenta 338 bajas/905 clientes (37.35 %) frente a 162/2,712 (5.97 %) en multiproducto.
6. **Tarjeta en escala original.** La diferencia de tasas entre clientes de un producto con y sin tarjeta fue pequeña; no se añadió una columna derivada exclusiva para ese cruce.
7. **Alertas de calidad sin imputación automática.** Antigüedad cero, scores de borde y otros controles se registran, no se eliminan indiscriminadamente.
8. **Separación de datos y decisiones.** `FactClientes`, `CalidadCliente`, `HipotesisResumen`, `RadarSegmentos`, `RadarCliente` y `Escenarios` cumplen funciones distintas.

## Arquitectura y herramientas
Python transforma el CSV y los catálogos en un Excel de seis hojas y el puente `RadarCliente.csv`; Power BI consume ambos recursos. El modelo incorpora 92 medidas DAX y ocho páginas, de las cuales siete son visibles y una se destina a controles de calidad.

## Limitaciones explícitas
- Sin secuencia temporal de abandono: no se infiere *cuándo* o *por qué* un cliente se fue.
- No existen campañas observadas, grupo de control, costos reales, CLV ni moneda declarada.
- El saldo asociado a bajas no equivale a pérdida financiera.
- Las agrupaciones muestran **asociaciones**, no efectos causales.
- H2 (326 clientes) amerita confirmar la definición de producto y calidad de la fuente antes de una decisión comercial.
- Los valores y escenarios corresponden a la muestra; con otra fuente deben volver a calcularse.
- Para comprobar actualización, navegación y filtros es necesario abrir el proyecto PBIP en Power BI Desktop.
