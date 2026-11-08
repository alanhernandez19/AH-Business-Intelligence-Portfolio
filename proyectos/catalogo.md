# Catálogo de proyectos AH

Los siguientes proyectos reúnen investigación, preparación de datos, modelos analíticos, controles de calidad y visualización en Power BI. Cada uno incluye documentación técnica y una guía de reproducción.

## Proyectos de Business Intelligence

| Proyecto | Problema y objetivo | Elementos técnicos |
| --- | --- | --- |
| **[Analítica de Clientes](AH_Analitica_Clientes/)** | Comprender el abandono de clientes, identificar segmentos prioritarios y evaluar posibles acciones de retención. | Exploración Python/Jupyter, ETL, segmentación, KPI, radar de perfiles, simulador de escenarios y Power BI. |
| **[Integración y Reporting](AH_Integracion_Reporting/)** | Integrar visitas digitales de distintas fuentes y producir indicadores consistentes con trazabilidad de cargas. | ETL incremental Python, control SHA-256, conciliaciones, normalización, modelo de reporting y RLS en Power BI. |
| **[Adopción Digital y Analítica Comercial](AH_Adopcion_Digital/)** | Comprender la adopción digital posterior a la compra física y priorizar hipótesis y pilotos comerciales. | Cohortes, señales de los primeros 30 días, enriquecimiento municipal INEGI, sensibilidad de reglas, escenarios, Jupyter y Power BI. |

## Cómo explorar los proyectos

Cada carpeta contiene un `README.md` con el problema de negocio, la arquitectura, las métricas, las decisiones técnicas, los resultados y los pasos de ejecución. Los directorios `notebooks/`, `powerbi/`, `data/`, `docs/` y `reports/` reúnen el material correspondiente según cada caso.

La [metodología AH](../docs/metodologia.md) y los [criterios de calidad](../docs/criterios-calidad.md) explican el enfoque aplicado a los proyectos del portafolio.
