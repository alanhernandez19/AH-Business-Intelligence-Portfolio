# Contexto de negocio y alcance

## Situación
Una operación digital recibe **archivos TXT periódicos de visitas e interacciones**. Los reportes pueden tener diferencias de encabezados, usuarios que aparecen varias veces, fechas incompletas y listas de plataformas. Consolidarlos ingenuamente llevaría a visitas duplicadas, métricas incorrectas o permisos de consulta imprecisos.

## Preguntas de negocio
1. ¿Cuántas visitas se registran, cuántas personas únicas aparecen y cuántas aperturas y clics se observan?
2. ¿Cómo cambian los indicadores por fecha, archivo de origen, plataforma y navegador?
3. ¿Qué porcentaje del histórico usa fechas de apertura y cuánto depende de fechas de envío?
4. ¿Cómo añadir nuevos TXT manteniendo el histórico **sin volver a cargar los mismos archivos**?
5. ¿Cómo separar las asociaciones de plataforma sin duplicar visitas y restringir el acceso por identidad?
6. ¿Qué controles hacen trazable cada carga?

## Dataset y granularidad
La muestra contiene tres TXT de origen histórico: **503, 503 y 995 filas**, para un total de **2,001 visitas**. Cada fila representa una visita y los contadores `Opens`/`Clicks` representan eventos acumulados. Los usuarios únicos se identifican a partir de `email` normalizado; los correos e IP de esta muestra son ficticios.

## Alcance implementado
EDA con investigación de encabezados, calidad y distribución; ETL local o remoto parametrizado; almacenamiento incremental y huellas SHA-256; `CONSOLIDADO.csv`; Excel para Power BI; puente de plataformas; catálogo de roles; 27 medidas DAX y cinco páginas AH.

## Alcance de ejecución
La solución se reproduce con archivos TXT locales. El notebook dispone además de una modalidad SFTP configurable para entornos con conexión autorizada. La exploración, el ETL incremental y el modelo Power BI se documentan por separado para facilitar su evaluación técnica.
