# Diccionario de datos, claves y granularidad

## 1. Datos recibidos: 15 campos por archivo TXT
Los tres TXT contienen filas separadas por comas. La segunda columna presenta un nombre diferente en cada archivo y el ETL la denomina `CampoExtra`. El resto del contrato de columnas se verifica por nombre y orden.

| Campo de entrada | Significado en este caso | Tratamiento / precaución |
|---|---|---|
| `email` | Identificador de persona usuaria | Valores ficticios; normalización para conteo de usuarios únicos |
| segunda columna (`CampoExtra`) | Columna variable según origen | Se homologa el encabezado, sin atribuirle significado comercial no demostrado |
| `Badmail` | Indicador original de calidad/contactabilidad | Se conserva el valor y etiqueta analítica |
| `Baja` | Indicador original de baja | Indicador de baja en registros de interacción, distinto al abandono de clientes |
| `Fecha envio` | Fecha de envío | Segundo criterio de fecha analítica |
| `Fecha open` | Fecha de apertura | Primera prioridad de fecha analítica |
| `Opens` | Contador de aperturas | Suma de eventos, **no** filas de visitas |
| `Opens virales` | Contador de aperturas virales | Métrica de actividad específica |
| `Fecha click` | Fecha de clic | Atributo de interacción que no define `FechaVisita` |
| `Clicks` | Contador de clics | Suma de eventos, **no** usuarios distintos |
| `Clicks virales` | Contador de clics virales | Métrica de actividad específica |
| `Links` | Referencia/código de enlaces del origen | Se conserva sin interpretarlo automáticamente como URL personal |
| `IPs` | Campo de IP | Direcciones ficticias de documentación en la muestra anonimizada |
| `Navegadores` | Navegador informado | Se conserva y se crea una versión analítica ante ausencias |
| `Plataformas` | Plataforma(s) del evento | Puede contener varias etiquetas; fuente del puente |

## 2. Consolidado y derivaciones
**Grano principal:** una fila por visita, identificada por `IdVisita`. El archivo `output/CONSOLIDADO.csv` y la hoja `CONSOLIDADO` contienen **2,001 filas y 26 columnas**.

| Campo derivado / auxiliar | Función |
|---|---|
| `ArchivoOrigen` | Trazabilidad hacia `report_N.txt` |
| `FechaVisita` | Fecha analítica: apertura → envío → procesamiento |
| `FechaVisita_Texto` | Representación de consumo de fecha/hora |
| `OrigenFechaVisita` | `OPEN`, `ENVIO` o `PROCESO`; evidencia del fallback |
| `VisitasRegistro` | Constante 1 por fila aceptada |
| `EmailNormalizado` | Identificador de usuario para unicidad (`strip` y minúsculas) |
| `NavegadorAnalitico` | Etiqueta separando ausencia de apertura y navegador desconocido |
| `PlataformaAnalitica` | Etiqueta de plataforma para consumo |
| `EstadoBadmail`, `EstadoBaja` | Etiquetas de control sobre valores originales |
| `IdVisita` | Clave secuencial persistente durante cargas incrementales |

## 3. Otros artefactos
| Archivo / tabla | Granularidad | Uso |
|---|---|---|
| `input/report_7.txt` | 503 filas | Fuente inicial |
| `input/report_8.txt` | 503 filas | Fuente inicial |
| `input/report_9.txt` | 995 filas | Fuente inicial |
| `Catalogos/usuarios.txt` | Asociación usuario–rol–plataforma | Derechos de visualización ficticios |
| `output/archivos_procesados.json` | Un hash SHA-256 por nombre de TXT procesado | Idempotencia y detección de cambios |
| `output/CONSOLIDADO.csv` | Una fila por visita | Histórico incremental persistente |
| `Modelo_Integracion_Reporting.xlsx` → `CONSOLIDADO` | Una fila por visita | Consumo Power BI |
| `Modelo_Integracion_Reporting.xlsx` → `usuarios` | Filas del catálogo de permisos | RLS |
| `Interacciones_Plataforma.xlsx` → `VisitaPlataforma` | Una fila por par `IdVisita`–`Plataforma` | Relaciones y conteos de plataformas |

## 4. Puente y usuarios únicos
Las **245 asociaciones** corresponden a **242 visitas**; **3 visitas** presentan varias plataformas. El puente puede producir más registros que visitas únicas y por ello se cuenta `DISTINCTCOUNT(IdVisita)` cuando se pregunta por visitas con plataforma. Los **1,997 usuarios** surgen de `EmailNormalizado`, no del número de filas.

## 5. Anonimización aplicada
Se reemplazaron correos e IP con valores ficticios estables; el catálogo de usuarios también emplea identidades `@example.com`. Se conservaron las repeticiones originales de usuarios, roles y plataformas. Consulta `anonimizacion-y-validacion.md` para los controles concretos.
