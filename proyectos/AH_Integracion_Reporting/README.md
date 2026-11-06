# AH | Integración y Reporting

**Business Intelligence end-to-end · ETL incremental · Calidad de datos · Power BI + Python**  
**Autor:** Alan Arturo Hernández Gutiérrez

> **Pregunta de negocio:** ¿cómo transformar archivos TXT periódicos de visitas e interacciones digitales en un histórico confiable para reporting, sin duplicar cargas y respetando permisos de visualización por plataforma?

## 1. Resumen ejecutivo

El proyecto implementa una solución completa para **investigar, normalizar, integrar y consumir datos de visitas digitales**. El flujo diferencia la ingestión de archivos, la regla funcional de una visita por fila, la fecha analítica con prioridades, el control incremental con SHA-256, el catálogo de permisos y un modelo Power BI con medidas de desempeño, temporalidad y calidad.

| Indicador verificado | Resultado | Qué significa |
|---|---:|---|
| Reportes TXT | **3** | `report_7.txt`, `report_8.txt`, `report_9.txt` |
| Visitas | **2,001** | Filas recibidas y aceptadas; **una fila = una visita** |
| Usuarios únicos | **1,997** | Correos normalizados distintos en la muestra |
| Aperturas | **470** | Suma de `Opens`; no número de visitas |
| Clics | **52** | Suma de `Clicks`; no usuarios únicos |
| Asociaciones de plataforma | **245** | Pares válidos `IdVisita`–`Plataforma` |
| Visitas con plataforma identificada | **242** | ID únicos en la tabla puente |
| Visitas con más de una plataforma | **3** | Justificación de relación auxiliar |
| Plataformas distintas | **9** | Categorías encontradas en la muestra |
| Fecha desde apertura / envío | **381 / 1,620** | Origen de la fecha analítica, no conteo de aperturas |

El criterio funcional central es: **una visita no equivale a una apertura**. Un registro puede tener cero, una o varias aperturas, y por ello `Visitas`, `Opens` y `Clicks` no deben utilizarse como sinónimos.

## 2. Qué se resolvió y por qué

1. **Exploración de fuentes heterogéneas:** tres TXT con delimitador coma y un segundo encabezado variable. Se homologa **solo la segunda columna** bajo `CampoExtra`.
2. **Granularidad estable:** cada fila se conserva como visita; correos repetidos no se eliminan porque una persona puede realizar varias visitas.
3. **Calidad antes de integrar:** cabeceras, fechas inválidas, contadores negativos, vacíos, guiones y `unknown` se revisan explícitamente.
4. **Regla temporal:** `Fecha open` → `Fecha envio` → fecha de procesamiento; guardar `OrigenFechaVisita` para auditar la decisión.
5. **Idempotencia y cambios controlados:** firma SHA-256 por archivo, estado persistente y consolidado sincronizados; un archivo repetido no genera nuevas filas y un nombre ya conocido con otro contenido genera un error.
6. **Consumo separado:** histórico consolidado, catálogo de usuarios/roles y puente de plataformas, evitando atribuir todas las plataformas de una lista a una sola categoría.
7. **Seguridad analítica:** rol DAX/RLS `RLS_Usuarios` por identidad y plataformas permitidas, con opción de administrador `TODAS`.
8. **Reportes:** cinco páginas AH para operación, tendencias, audiencias, tecnología y calidad; 27 medidas DAX.

[Arquitectura completa](docs/arquitectura-y-trazabilidad.md) · [Decisiones de ingeniería](docs/decisiones-y-limitaciones.md) · [Seguridad RLS](docs/seguridad-y-roles.md)

## 3. Métricas: interpretación y utilidad

| Familia | Cómo se obtiene | Decisión que permite |
|---|---|---|
| Visitas, usuarios únicos, visitas adicionales | Histórico con `IdVisita` y `EmailNormalizado` | Volumen vs alcance de usuarios |
| Aperturas y clics | Suma de contadores originales | Actividad observada sin confundirla con visitas |
| Clics por visita | `SUM(Clicks) / SUM(VisitasRegistro)` | Intensidad de interacción por grupo |
| Usuarios nuevos/recurrentes | Primera visita observada dentro del período filtrado | Composición de audiencia **dentro del histórico** |
| Tendencia / comparación mensual o anual | Medidas DAX basadas en `DimFecha` | Lectura temporal; revisar si la muestra histórica cubre el período |
| Plataforma y multidispositivo | Puente de pares visita–plataforma | Tecnología detectada sin sobredimensionar visitas |
| Origen de la fecha | `OPEN`, `ENVIO`, `PROCESO` | Calidad temporal y trazabilidad |
| Control incremental | SHA-256 + manifiesto | Evitar sobrecargas y preservar IDs de visitas |
| RLS | Usuario y plataforma autorizada | Restringir la visualización según identidad |

[Diccionario completo de KPI](docs/diccionario-kpi.md) · [Inventario de las 27 medidas DAX](docs/inventario-medidas-powerbi.md)

## 4. Contenido reproducible

```text
AH_Integracion_Reporting/
├── input/                       # 3 TXT con identificadores ficticios
├── Catalogos/                   # usuarios.txt, roles y permisos ficticios
├── notebooks/
│   ├── 01_EDA_Investigacion_y_Decisiones.ipynb
│   ├── 02_ETL_Explicado_y_Parametrizado.ipynb
│   └── 03_Configurar_Rutas_PowerBI.ipynb
├── output/                      # histórico, manifiesto, dos Excel
├── powerbi/                     # PBIP AH y definición RLS
├── reports/                     # PDF de cinco páginas y guía del informe
├── docs/                        # linaje, KPI, QA, roles y decisiones
├── requirements.txt
└── MANIFIESTO_SHA256.txt
```

**Datos de ejemplo:** los tres TXT y el catálogo utilizan correos e IP ficticios consistentes, manteniendo **filas, repeticiones y categorías**. Los Excel/CSV se generan mediante el ETL incluido. [Tratamiento de identificadores](docs/anonimizacion-y-validacion.md).

**Modalidades:** el notebook mantiene `MODO = "L"` para lectura de la carpeta `input/` y `MODO = "R"` para lectura SFTP configurada por el usuario. El modo local permite reproducir el proyecto con los TXT incluidos; la conexión SFTP requiere un servidor y credenciales configurados por el usuario.

## 5. Ejecución y verificación

1. Extraer el proyecto completo conservando sus carpetas.
2. Iniciar Jupyter con el directorio de trabajo en la raíz del proyecto o en `notebooks/`. Compruébalo en una celda con `from pathlib import Path; print(Path.cwd())` antes de ejecutar 01 y 02.
3. Ejecutar **01 → 02** con `MODO = "L"` para reproducir el análisis y el ETL. Los archivos generados también están incluidos en `output/`.
4. **Para validar la carga incremental:** conservar `output/CONSOLIDADO.csv` y `output/archivos_procesados.json`; una segunda ejecución reconoce los TXT y no duplica visitas.
5. **Para validar la primera carga:** trabajar sobre otra copia del proyecto y vaciar por completo `output/` en esa copia antes de ejecutar el notebook 02.
6. Ejecutar `03_Configurar_Rutas_PowerBI.ipynb` desde Jupyter para configurar los orígenes de Power BI. Detecta la carpeta del proyecto cuando Jupyter se inicia desde la raíz o `notebooks/`; en otro caso solicita esa carpeta una sola vez.
7. Abrir `powerbi/Caso_Integracion_Reporting.pbip`, actualizar los datos y revisar cinco páginas, filtros, fechas, asociaciones de plataforma y RLS. Exportar las páginas a PDF después de la actualización.

[Guía paso a paso y solución de incidencias](docs/guia-de-reproduccion.md) · [Pruebas y conciliaciones](docs/pruebas-y-conciliaciones.md)

## 6. Límites y buenas prácticas

- Los TXT son una **muestra histórica**: una medida con `TODAY()` puede estar en blanco o cero para el año actual. La interpretación temporal depende del período cubierto por la muestra.
- Un correo repetido puede representar varias visitas; la deduplicación ocurre a nivel de **archivo procesado**, no eliminando filas del histórico.
- Un usuario nuevo significa **primera aparición en el histórico disponible**, no registro nuevo de una plataforma.
- El modo SFTP utiliza host y usuario de ejemplo; para utilizarlo se necesita configurar una conexión autorizada.
- El catálogo de identidades ficticias permite comprobar las reglas RLS desde **Ver como** en Power BI Desktop.

**AH · Simplicidad a través de la elegancia:** integración controlada, KPI interpretables y decisiones respaldadas por evidencia.
