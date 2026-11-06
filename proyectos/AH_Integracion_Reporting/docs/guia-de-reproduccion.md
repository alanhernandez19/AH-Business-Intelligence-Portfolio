# Guía de ejecución: primera carga, incremental y Power BI

## Prerrequisitos
Python, `pip`, Jupyter, las librerías de `requirements.txt` y Power BI Desktop para probar el PBIP. No se necesita SFTP real en modo local.

## Primera ejecución desde los tres TXT de muestra
1. Extraer `AH_Integracion_Reporting` conservando sus subcarpetas.
2. Iniciar Jupyter desde la raíz del proyecto o desde `notebooks/` e instalar las dependencias de `requirements.txt`. Comprueba en una celda `from pathlib import Path; print(Path.cwd())` antes de ejecutar los notebooks 01 y 02.
3. Ejecutar `01_EDA_Investigacion_y_Decisiones.ipynb` para revisar encabezados, granularidad, calidad y datos.
4. **Trabajar en una segunda copia del proyecto** para simular primera carga: quitar todo el contenido de `output/` en esa copia; dejar intactos `input/` y `Catalogos/`.
5. En `02_ETL_Explicado_y_Parametrizado.ipynb` conservar `MODO = "L"` y ejecutar todas las celdas.
6. Comprobar 2,001 visitas, 1,997 usuarios, 470 aperturas, 52 clics, 245 asociaciones y los archivos de salida.

## Prueba incremental / idempotente
1. **No borrar** ni `output/archivos_procesados.json` ni `output/CONSOLIDADO.csv`.
2. Volver a ejecutar el notebook ETL con los mismos tres TXT.
3. Debe reconocerlos como conocidos y omitir filas nuevas, sin alterar el histórico.
4. Si cambias el contenido de un archivo ya procesado manteniendo el nombre, el ETL debe **detenerse** en lugar de sobreescribir el historial. Para experimentar, hazlo sobre otra copia.

## Actualizar Power BI
1. Desde Jupyter ejecutar `notebooks/03_Configurar_Rutas_PowerBI.ipynb`. Si Jupyter se abrió fuera del proyecto, indicar su carpeta principal cuando lo solicite.
2. Abrir `powerbi/Caso_Integracion_Reporting.pbip` y actualizar datos.
3. Confirmar resumen operativo, tendencias, audiencias, tecnología y calidad.
4. Validar pruebas de RLS con el catálogo ficticio.
5. Exportar las cinco páginas a `reports/Caso_Integracion_Reporting.pdf`.

## Qué significa cada modo
- `MODO="L"`: lectura local de `input/report_*.txt`.
- `MODO="R"`: descarga desde SFTP, sujeto a servidor, cuenta, contraseña y carpeta reales. El servidor y usuario definidos en el notebook son **valores de ejemplo**; sustituirlos por los de una conexión autorizada para utilizar este modo.

## Comprobaciones rápidas
| Control | Valor esperado en la muestra |
|---|---:|
| Reportes cargados | 3 |
| Visitas | 2,001 |
| Usuarios únicos | 1,997 |
| Aperturas | 470 |
| Clics | 52 |
| Plataformas distintas | 9 |
| Asociaciones plataforma | 245 |
| Visitas con plataforma | 242 |
| Visitas con varias plataformas | 3 |
| Fechas por `OPEN` / `ENVIO` / `PROCESO` | 381 / 1,620 / 0 |

## Problemas frecuentes
- **Rutas no encontradas:** abre la terminal en la raíz o ejecuta notebooks dentro de `notebooks/`; conserva `Catalogos` con C mayúscula.
- **No carga archivos nuevos:** puede ser normal; revisar manifiesto de SHA-256 y histórico.
- **Estado sin consolidado:** es una condición inconsistente; no borrar solo uno de esos archivos.
- **Ruta Power BI ajena:** ejecutar nuevamente `03_Configurar_Rutas_PowerBI.ipynb` antes de abrir el modelo.
- **Mes actual sin visitas:** la muestra es histórica; las medidas basadas en `TODAY()` no deben interpretarse como un error de importación.
- **Exportación PDF:** después de actualizar el modelo, exporta las cinco páginas.

En Power BI Desktop revisa las interacciones, la navegación y los filtros por plataforma.
