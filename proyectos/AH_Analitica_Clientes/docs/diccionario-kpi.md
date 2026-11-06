# Diccionario de KPI: definición, fórmula, interpretación y decisión

**Regla de lectura:** usar siempre el contexto de filtros del visual. Los nombres siguientes explican la lógica empresarial; la implementación ejecutable y sus variantes están en los archivos TMDL del PBIP.

| Indicador | Definición operativa | Para qué sirve / precaución |
|---|---|---|
| **Clientes** | Conteo de clientes del contexto (clave única `customer_id`) | Denominador de tasas y tamaño de segmentos |
| **Bajas** | Clientes con `churn = 1` | Volumen absoluto de abandono |
| **Sin abandono** | Clientes con `churn = 0` | Complemento del universo |
| **Churn %** | `Bajas / Clientes` | Comparar incidencia, siempre con tamaño muestral |
| **Churn global %** | Tasa general del universo de referencia | Línea base para comparaciones entre grupos |
| **Contribución de bajas %** | `Bajas del grupo / Bajas totales de referencia` | Detectar grupos que concentran el número de bajas |
| **Participación de clientes %** | `Clientes del grupo / Clientes del universo` | Evaluar tamaño y alcance de una acción |
| **Índice churn** | `Churn del grupo / Churn global` | Valores superiores a 1 = incidencia relativa mayor |
| **Brecha de churn (pp)** | `Churn grupo – churn referencia` | Diferencia en puntos porcentuales |
| **Exceso descriptivo de bajas** | `Bajas grupo – clientes grupo × tasa global` | Comparativa descriptiva; no bajas evitables reales |
| **Saldo agregado total** | `SUM(balance)` | Magnitud del saldo observado, sin moneda asignada |
| **Saldo promedio cuenta** | `AVERAGE(balance)` | Comparación de promedios entre perfiles |
| **Saldo agregado bajas** | `SUM(balance)` para `churn=1` | Saldo *asociado* al abandono, no pérdida financiera |
| **Participación saldo bajas %** | `Saldo agregado bajas / saldo agregado total` | Proporción del saldo bajo la categoría observada |
| **H1/H2/H3: clientes/bajas/churn** | Filtros de grupos comerciales exclusivos | Priorización por tamaño, tasa y contribución |
| **Radar churn %** | Bajas del segmento / clientes del segmento | Medir una regla individual |
| **Radar clientes únicos seleccionados** | `DISTINCTCOUNT(customer_id)` entre reglas elegidas | Evitar duplicar personas por pertenencia múltiple |
| **Radar cobertura única de bajas %** | Bajas únicas de reglas seleccionadas / bajas de referencia | Evaluar cobertura sin sumar segmentos superpuestos |
| **Parámetros del simulador** | Cobertura, mejora hipotética, costo/contacto, fijo, margen, CAC, reemplazo, presupuesto | Escenarios editables, no datos transaccionales |
| **Contactos del simulador** | Clientes objetivo × cobertura, sujetos a presupuesto y costos | Factibilidad de intervención ilustrativa |
| **Retenidos adicionales esperados** | Contactos × mejora hipotética, validada frente al churn observado | Resultado **no medido** en una campaña |
| **Beneficio/resultado neto de escenario** | Beneficio supuesto menos costos del escenario | Sensibilidad económica, no ROI auditado |
| **QA de anomalías** | Conteos de condiciones marcadas en `CalidadCliente` | Alertas a investigar, no exclusiones automáticas |

## Interpretación del radar
El radar tiene **84 reglas** y **178,915 pertenencias** sobre 10,000 clientes. Sumar directamente la columna `clientes` de dos reglas puede contar al mismo cliente varias veces. Para estimar alcance se utiliza el conjunto de claves únicas en `RadarCliente`. Las medidas de membresías y duplicaciones permiten mostrar esa diferencia.

## Hipótesis comerciales

| Grupo | Clientes | Bajas | Tasa | Contribución a las bajas |
|---|---:|---:|---:|---:|
| H1 | 2,521 | 924 | 36.65 % | 45.36 % |
| H2 | 326 | 280 | 85.89 % | 13.75 % |
| H3 | 2,563 | 485 | 18.92 % | 23.81 % |
| Fuera | 4,590 | 348 | 7.58 % | 17.08 % |

## Simulación: qué significa y qué no
El ETL incluye tres supuestos de escenario (conservador, base y optimista) para H1 y H3. El modelo interactivo distribuye primero presupuesto a **H1** y después a **H3**, calcula contactos factibles, retenidos adicionales *esperados* y resultados bajo **dos interpretaciones alternativas**: margen o CAC evitado. Estas alternativas **no deben sumarse**. Se limita el valor de mejora al abandono observado de los grupos para evitar escenarios internamente inconsistentes. Ninguno de esos cálculos demuestra retención causal o ahorro realizado.

Para consultar las **92 medidas exactas**, sus nombres y tablas de origen, ver [inventario de medidas Power BI](inventario-medidas-powerbi.md). Para las reglas de Python, ver `notebooks/02_ETL_Parametrizado.ipynb`.
