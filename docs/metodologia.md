# Metodología AH | Business Intelligence end-to-end

## Objetivo

Desarrollar soluciones de **Business Intelligence con enfoque técnico-funcional**, ajustando las herramientas y el nivel de profundidad analítica al problema empresarial. La metodología permite comparar casos, comunicar decisiones y reutilizar prácticas sin imponer una arquitectura única.

**Principio rector:** simplicidad a través de la elegancia. La metodología es común; el grado de implementación depende del problema, la calidad de los datos y el valor empresarial.

## Etapas y evidencia mínima

| Etapa | Pregunta / tarea | Evidencia esperada |
| --- | --- | --- |
| 1. Contexto | ¿Qué problema de negocio y qué decisiones se busca apoyar? | Alcance, objetivo, preguntas y criterios de éxito |
| 2. Investigación | ¿Existen proyectos comparables, estándares o buenas prácticas? | Fuentes, ideas aprovechables y decisiones propias; sin copiar soluciones |
| 3. Comprensión de datos | ¿Cuáles son las fuentes, variables, granularidad, calidad y límites? | Diccionario, perfilado y reglas iniciales |
| 4. Oportunidades analíticas | ¿Qué puede responder **cada variable** y qué KPI o segmentos resultan útiles? | Matriz variable → KPI/pregunta → decisión → dato requerido |
| 5. Exploración | ¿Qué distribuciones, anomalías, relaciones y patrones merecen investigarse? | Notebook EDA interpretable y hallazgos preliminares |
| 6. ETL | ¿Qué limpiar, transformar, documentar y validar? | Script/notebook Python reproducible, insumos y outputs permitidos |
| 7. Modelo y KPI | ¿Qué modelo semántico y medidas responden al negocio? | Power BI, relaciones pertinentes, medidas DAX y diccionario de KPI |
| 8. Visualización | ¿Qué debe ver y explorar un usuario para decidir? | Reporte AH funcional, navegación útil, capturas y PDF |
| 9. Validación | ¿Los números, filtros y reglas se corresponden con lo esperado? | Conciliaciones Python↔Power BI, pruebas y limitaciones |
| 10. Resultados | ¿Qué se observó, qué es hipótesis y qué recomendamos? | Resumen ejecutivo, decisiones, supuestos y siguientes pasos |
| 11. Publicación | ¿Puede alguien entenderlo y reproducirlo lícitamente? | README, archivos autorizados, control de versiones y guía de ejecución |

La revisión de variables debe ser **sistemática**: no significa inventar cien indicadores, sino priorizar oportunidades analíticas relevantes según el problema empresarial.

## KPI y análisis de negocio

Definir, cuando corresponda, métricas de:

- **Clientes y retención:** churn, retención, saldos, segmentos de valor, riesgo de fuga, CAC y costos de retención (solo si existen datos o supuestos explícitos).
- **Comercial:** ingresos, crecimiento, ticket promedio, frecuencia, conversión, recurrencia.
- **Finanzas:** margen, EBIT, EBITDA, CAPEX, OPEX, variaciones presupuestales, rentabilidad (solo con información contable adecuada).
- **Riesgo y cartera:** concentración, exposición, morosidad, deterioro, recuperaciones.
- **Operaciones:** productividad, tiempos de procesamiento, incidencias, calidad, automatización.

Para cada KPI registrar **definición, fórmula, granularidad, fuente, filtros, limitaciones e interpretación de negocio**. Distinguir datos observados de hipótesis, supuestos, escenarios y proyecciones. No confundir saldos con ingresos ni correlación con causalidad.

## Tecnología y complementos

**Predeterminadas:** Python/Jupyter/pandas, Power BI/DAX y Git. SQL o bases de datos se incorporan cuando son pertinentes; librerías simples y mantenibles son preferibles a infraestructura innecesaria.

**Complementos posibles:** simulador, análisis SQL, automatización, validación adicional, RLS, drill-through, análisis RFM o modelo ML explicable. Cada complemento debe justificar qué decisión o validación mejora. No forzar ML, Apache, Spark, Airflow, Docker o servicios cloud si el caso no lo necesita.

## Transferibilidad

La metodología reúne prácticas de reporting, modernización, automatización y análisis. La revisión sistemática de variables y la matriz KPI–decisión facilitan trasladar la solución a distintas tecnologías con los ajustes correspondientes.

## Criterio de cierre

Un caso solo está completo si sus datos son confiables, el análisis explota las oportunidades relevantes, sus KPI sostienen conclusiones útiles y los artefactos se pueden explicar y reproducir.
