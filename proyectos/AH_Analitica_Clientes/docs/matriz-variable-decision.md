# Matriz de oportunidades: variable → análisis → KPI → decisión

Esta matriz registra el recorrido por **las 12 columnas originales**, incluso aquellas que no generaron un campo derivado. El objetivo es justificar por qué se calcula cada indicador y por qué no se agregan transformaciones superfluas.

| Variable | Pregunta / análisis | KPI o derivación considerada | Decisión técnica / empresarial |
|---|---|---|---|
| `customer_id` | ¿La base contiene clientes únicos? | Duplicados, conteo, cobertura única | Clave de cliente y puente radar; evitar sobreconteo |
| `credit_score` | ¿Cambia el abandono por score? | Distribución, quintiles exploratorios y extremos | Conservar score original; bandera QA de bordes |
| `country` | ¿Hay heterogeneidad territorial? | Clientes, bajas, churn, índice por país | Dimensión de país y comparaciones, sin causalidad |
| `gender` | ¿Hay diferencias descriptivas? | Clientes, bajas, churn por categoría | Conservar columna para auditoría descriptiva; no atribuir efectos causales |
| `age` | ¿Hay concentración por etapas de edad? | Bandas 18–29 a 70+, tasas y tamaños | Crear `edad_banda`; conservar edad continua |
| `tenure` | ¿La antigüedad ayuda a diferenciar? | Distribución, años, coherencia edad–tenure | Conservar original y controles QA; no nueva banda persistente |
| `balance` | ¿Saldo cero y saldos positivos se comportan igual? | Saldo agregado/medio, cero/positivo, cuartiles | Crear `saldo_estado`, `saldo_banda`, cruces; no monetizar pérdidas |
| `products_number` | ¿El grado de vinculación se asocia a bajas? | Un producto, varios, tres/cuatro; tasas | Crear tipo vinculación, H1/H2/H3 y radar |
| `credit_card` | ¿Aporta valor al perfil? | Churn por indicador y cruce con productos | Conservar original; no crear derivada innecesaria |
| `active_member` | ¿Difiere la incidencia por actividad? | Tasas activo/inactivo, cruces | Crear perfiles de actividad/saldo y actividad/productos |
| `estimated_salary` | ¿Se observan patrones por estimación salarial? | Distribución, quintiles y alertas | Mantener dato original; QA salario bajo; no asumir ingresos bancarios |
| `churn` | ¿Quién abandonó en el corte? | Bajas, tasa, aportación, índice | Variable de resultado para análisis, no causa conocida |

## Cruces cuya utilidad se comprobó
- **Actividad × productos:** fundamenta diferencias entre H1 y H3.
- **Saldo × productos:** muestra que saldo cero no implica el mismo comportamiento en uniproducción y multiproducto.
- **Actividad × saldo:** facilita navegación y perfiles cruzados.
- **Tarjeta × productos:** se exploró, pero no justificó un campo persistente adicional.
- **Radar:** reglas de una o dos variables, población mínima de 100 y puente para medidas de clientes únicos.

## Principio de priorización
Para cada grupo hay que mirar **volumen de clientes, número de bajas, tasa y contribución al total**, no ordenar exclusivamente por porcentaje. Cualquier iniciativa resultante es una hipótesis que exigiría medición posterior.
