# Pruebas de datos, incremental, KPI y seguridad

## Conciliación del histórico de ejemplo
| Control | Valor | Fuente |
|---|---:|---|
| `report_7.txt` filas / `Opens` / `Clicks` | 503 / 146 / 28 | EDA y TXT |
| `report_8.txt` filas / `Opens` / `Clicks` | 503 / 138 / 11 | EDA y TXT |
| `report_9.txt` filas / `Opens` / `Clicks` | 995 / 186 / 13 | EDA y TXT |
| Visitas consolidadas | **2,001** | `CONSOLIDADO.csv` y Excel |
| Usuarios únicos | **1,997** | `EmailNormalizado` |
| Aperturas | **470** | Suma `Opens` |
| Clics | **52** | Suma `Clicks` |
| Origen fecha `OPEN` | **381** | `OrigenFechaVisita` |
| Origen fecha `ENVIO` | **1,620** | `OrigenFechaVisita` |
| Origen fecha `PROCESO` | **0** | `OrigenFechaVisita` |
| Asociaciones / visitas con plataforma | **245 / 242** | `VisitaPlataforma` |
| Visitas multiplataforma | **3** | Conteo de IDs con 2+ tokens |
| Plataformas distintas | **9** | Categorías del puente |
| Archivos en historial SHA-256 | **3** | `archivos_procesados.json` |

## Controles del ETL
- Contrato de encabezados: cambia solamente la segunda cabecera y se homologa a `CampoExtra`.
- Contadores numéricos no negativos y fechas no interpretables rechazadas.
- `FechaVisita` se asigna por prioridad, y `OrigenFechaVisita` conserva evidencia del criterio.
- `IdVisita` único y estable; el puente no debe contener pares repetidos.
- Manifiesto por SHA-256: misma entrada no se reprocesa; mismo nombre con huella cambiada detiene la carga.
- Salida temporal y señal de carga interrumpida evitan presentar parcialmente una actualización.

## Validaciones de carga y conciliación
La exploración y el ETL se ejecutan con los TXT de ejemplo; una carga inicial consolida 2,001 visitas y una segunda ejecución con el mismo manifiesto no genera filas duplicadas. El histórico resultante alimenta el CSV y los dos libros Excel.

## Comprobaciones de Power BI y seguridad
Las comprobaciones del modelo abarcan recuentos, medidas temporales, relaciones entre visitas y plataformas, y el alcance de los roles RLS. El modelo incluye 27 medidas y 194 objetos visuales distribuidos en cinco páginas. Con `Catalogos/usuarios.txt` se pueden ejecutar las pruebas de acceso por plataforma desde Power BI Desktop.

## Verificación en Power BI Desktop
1. Ejecutar los dos notebooks con la estructura incluida.
2. Verificar resultados y la segunda carga sin duplicación.
3. Actualizar PBIP y validar sus cinco páginas, comparaciones temporales y relaciones de plataforma.
4. Probar las identidades y autorizaciones del catálogo ficticio.
5. Exportar las cinco páginas a PDF y comprobar que muestran únicamente los identificadores ficticios.
6. Confirmar la consistencia de totales y filtros por plataforma frente a los artefactos Excel y CSV.

La presencia de 0 en métricas con `TODAY()` puede ser coherente con el carácter histórico de la muestra.
