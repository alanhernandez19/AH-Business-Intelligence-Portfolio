# Inventario íntegro de medidas DAX del modelo AH

Este inventario reúne las medidas DAX definidas en los archivos **TMDL** del modelo semántico. Para revisar filtros, variables y expresiones concretas, consultar el archivo indicado o abrir el modelo en Power BI Desktop.

## 01 Medidas Generales · 9 medidas

Clientes, bajas, churn y controles básicos de calidad.

**Fuente del cálculo:** [`01_Medidas_Generales.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/01_Medidas_Generales.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. Clientes` |
| 2 | `2. Bajas` |
| 3 | `3. Sin abandono` |
| 4 | `4. Churn %` |
| 5 | `10. QA antigüedad cero` |
| 6 | `11. QA score extremo` |
| 7 | `12. QA salario menor 100` |
| 8 | `13. QA edad menos antigüedad` |
| 9 | `14. Insight churn filtrado` |

## 02 Medidas Financieras · 6 medidas

Agregaciones y promedios de saldo observado; no pérdidas financieras.

**Fuente del cálculo:** [`02_Medidas_Financieras.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/02_Medidas_Financieras.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. Saldo agregado total` |
| 2 | `2. Saldo promedio cuenta` |
| 3 | `3. Saldo agregado bajas` |
| 4 | `4. Saldo medio bajas` |
| 5 | `5. Saldo medio sin abandono` |
| 6 | `6. Participación saldo bajas %` |

## 03 Medidas Analisis · 14 medidas

Comparación de grupos con referencia global, índices, diferencias y formatos condicionales.

**Fuente del cálculo:** [`03_Medidas_Analisis.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/03_Medidas_Analisis.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. Clientes global` |
| 2 | `2. Bajas global` |
| 3 | `3. Churn global %` |
| 4 | `4. Participación clientes %` |
| 5 | `5. Contribución bajas %` |
| 6 | `6. Índice churn` |
| 7 | `7. Brecha churn pp` |
| 8 | `8. Bajas referencia` |
| 9 | `9. Exceso descriptivo bajas` |
| 10 | `10. Score promedio` |
| 11 | `11. Salario estimado promedio` |
| 12 | `12. Color riesgo churn texto` |
| 13 | `13. Color riesgo churn fondo` |
| 14 | `14. Color exceso bajas texto` |

## 04 Medidas Segmentacion · 24 medidas

H1/H2/H3, radar de segmentos superpuestos, unicidad y cobertura.

**Fuente del cálculo:** [`04_Medidas_Segmentacion.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/04_Medidas_Segmentacion.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. Clientes H1` |
| 2 | `2. Clientes H2` |
| 3 | `3. Clientes H3` |
| 4 | `4. Bajas H1` |
| 5 | `5. Bajas H2` |
| 6 | `6. Bajas H3` |
| 7 | `7. Churn H1 %` |
| 8 | `8. Churn H3 %` |
| 9 | `9. Radar clientes` |
| 10 | `10. Radar bajas` |
| 11 | `11. Radar churn %` |
| 12 | `12. Radar índice churn` |
| 13 | `13. Radar aporte bajas %` |
| 14 | `14. Radar clientes únicos seleccionados` |
| 15 | `15. Radar bajas únicas seleccionadas` |
| 16 | `16. Radar cobertura única bajas %` |
| 17 | `17. Radar clientes visual` |
| 18 | `18. Radar bajas visual` |
| 19 | `19. Radar cobertura visual %` |
| 20 | `20. Radar churn visual %` |
| 21 | `22. Radar membresías visibles` |
| 22 | `23. Radar duplicaciones evitadas` |
| 23 | `24. Radar segmentos visibles` |
| 24 | `25. Radar color de cuadrante` |

## 05 Medidas Parametros · 8 medidas

Lectura de los parámetros seleccionados del simulador (cobertura, mejora, costos, margen y presupuesto).

**Fuente del cálculo:** [`05_Medidas_Parametros.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/05_Medidas_Parametros.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. pCobertura seleccionado` |
| 2 | `2. pMejora seleccionado` |
| 3 | `3. pCostoContacto seleccionado` |
| 4 | `4. pCostoFijo seleccionado` |
| 5 | `5. pMargen seleccionado` |
| 6 | `6. pCAC seleccionado` |
| 7 | `7. pReemplazo seleccionado` |
| 8 | `8. pPresupuesto seleccionado` |

## 06 Medidas Simulador · 31 medidas

Contactos, presupuesto, escenarios, retenidos hipotéticos, alternativas económicas y sensibilidad.

**Fuente del cálculo:** [`06_Medidas_Simulador.tmdl`](../powerbi/Caso_Analitica_Clientes.SemanticModel/definition/tables/06_Medidas_Simulador.tmdl)

| N.º | Medida DAX existente |
|---:|---|
| 1 | `1. Sim meta H1` |
| 2 | `2. Sim meta H3` |
| 3 | `3. Sim contactos H1` |
| 4 | `4. Sim costo H1` |
| 5 | `5. Sim disponible H3` |
| 6 | `6. Sim contactos H3` |
| 7 | `7. Sim costo H3` |
| 8 | `8. Sim contactos total` |
| 9 | `9. Sim costo total` |
| 10 | `10. Sim presupuesto restante` |
| 11 | `11. Sim uplift válido` |
| 12 | `12. Sim retenidos adicionales esperados` |
| 13 | `13. Sim beneficio margen` |
| 14 | `14. Sim neto margen` |
| 15 | `15. Sim beneficio CAC alternativo` |
| 16 | `16. Sim neto CAC alternativo` |
| 17 | `17. Sim costo por retenido esperado` |
| 18 | `18. Sim uplift equilibrio margen` |
| 19 | `19. Sim uplift equilibrio CAC` |
| 20 | `20. Sim contactos posibles %` |
| 21 | `21. Sim margen viable` |
| 22 | `22. Sim estado escenario` |
| 23 | `23. Sim contactos por hipótesis` |
| 24 | `24. Sim costo por hipótesis` |
| 25 | `26. Sim utilización presupuesto %` |
| 26 | `28. Neto margen sensibilidad cobertura` |
| 27 | `29. Color neto margen` |
| 28 | `30. Color neto CAC` |
| 29 | `31. Color viabilidad` |
| 30 | `32. Color estado escenario` |
| 31 | `36. Contactos sensibilidad cobertura` |

## Interpretación

Las medidas se evalúan en el contexto de filtros y relaciones del modelo. Las expresiones DAX y sus contextos de filtro se encuentran en los archivos TMDL del modelo semántico.

**Total verificado: 92 medidas.**
