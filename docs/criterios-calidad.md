# Criterios de calidad, trazabilidad y cierre

## Lista de verificación por caso

- [ ] Problema y objetivos de negocio claramente definidos.
- [ ] Contexto, problema, decisiones y objetivos claramente definidos.
- [ ] Fuentes, granularidad, esquema, fechas, unidades y limitaciones documentadas.
- [ ] Perfilado de **todas** las variables y selección razonada de oportunidades analíticas.
- [ ] Diccionario de KPI: definición, fórmula, filtros, fuente e interpretación.
- [ ] ETL reproducible y transformaciones explicables; no depende de rutas privadas.
- [ ] Controles de duplicidad, nulos, tipos, reglas, totales y excepciones según el caso.
- [ ] Cifras clave conciliadas entre la preparación de datos y Power BI.
- [ ] Modelo y DAX pertinentes; ningún visual o medida agregados solo por decoración.
- [ ] Navegación, segmentadores, botones, filtros y RLS probados **cuando correspondan**.
- [ ] Hallazgos separados de hipótesis, estimaciones y escenarios simulados.
- [ ] Recomendaciones empresariales respaldadas y limitaciones expresadas.
- [ ] Dependencias, versiones y pasos de ejecución documentados.
- [ ] Derechos, atribución y privacidad de cada recurso público verificados.
- [ ] El proyecto es explicable y defendible con el conocimiento del autor.

## Niveles de evidencia

**Confirmado:** existe ejecución, salida o prueba conservada que respalda la afirmación.  
**Inspección estática:** se verificó código, configuración o estructura, **no necesariamente ejecución real**.  
**Pendiente:** requiere validación adicional.  
**Hipótesis:** afirmación no establecida por los datos y tratada explícitamente como tal.

Cada caso debe contar con evidencia propia y controles adecuados a sus fuentes, reglas y modelo.

## Definición de terminado

Un proyecto solo se publica como caso completado cuando es **reproducible, trazable, analíticamente pertinente, visualmente comprensible, justificable ante negocio y seguro para su publicación**.
