# Matriz de variables, controles y decisiones — Integración y Reporting

El proceso revisa las **15 columnas presentes en los TXT** y sus efectos sobre métricas, calidad y modelo de Power BI. La decisión de conservar una variable no implica que deba convertirse en KPI.

| Campo original | Análisis / control | Uso y justificación |
|---|---|---|
| `email` | Normalización y repeticiones | `Usuarios Unicos`; conservar múltiples visitas por persona |
| Segunda cabecera | Comparar `jk`, `jyv`, `fgh` | Homologar a `CampoExtra` sin inventar significado |
| `Badmail` | Vacíos, guiones y códigos | Etiqueta `EstadoBadmail`, trazabilidad de calidad |
| `Baja` | Revisión de estados y ausencias | Etiqueta `EstadoBaja`; no equivale a churn de clientes |
| `Fecha envio` | Integridad y cronología | Segundo respaldo de `FechaVisita` |
| `Fecha open` | Integridad y orden temporal | Primer criterio de `FechaVisita` |
| `Opens` | Parseo entero, no negativo | `Aperturas Totales`; distinto a visitas |
| `Opens virales` | Parseo y control de rango | Métrica original conservada para consulta |
| `Fecha click` | Calidad y coherencia de interacción | Atributo conservado, no gobierna fecha analítica |
| `Clicks` | Parseo entero, no negativo | `Clicks Totales` y clics por visita |
| `Clicks virales` | Parseo y revisión de calidad | Contador conservado, no inventar conversión |
| `Links` | Presencia/ausencia y códigos | Trazabilidad de enlace; no asumir URLs personales |
| `IPs` | Validación de formato y valores ausentes | Preservar el formato necesario para controles de calidad |
| `Navegadores` | Valores ausentes, `-`, `unknown` | `NavegadorAnalitico` y clics por visita con mínimo 5 |
| `Plataformas` | Tokens separados por comas | Puente de plataformas, métricas tecnológicas y RLS |

## Variables técnicas derivadas para decisión
- `ArchivoOrigen` identifica el TXT y facilita reconciliar volumen y monitorear ingesta.
- `FechaVisita` con `OrigenFechaVisita` distingue evento de apertura, fallback de envío y procesamiento.
- `IdVisita` identifica cada visita consolidada; **no** coincide necesariamente con usuarios únicos.
- `VisitasRegistro=1` mantiene granularidad por fila y evita inferir visitas desde `Opens`.
- `EmailNormalizado` soporta `DISTINCTCOUNT` consistente.
- `VisitaPlataforma` separa asociaciones y evita explotar la tabla de hechos.
- `archivos_procesados.json` asegura idempotencia a nivel de archivo, no de correo.

## Qué no se debe inferir
Apertura no es visita, clic no es usuario, plataforma asociada no es un registro nuevo y la fecha de envío no demuestra apertura. Cada KPI y visual debe conservar esas distinciones.
