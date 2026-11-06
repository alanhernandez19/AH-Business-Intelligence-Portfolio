# Diccionario de KPI de Integración y Reporting

## Reglas esenciales
- **Visita:** cada fila de origen aceptada vale una visita (`VisitasRegistro=1`).
- **Usuario único:** correo normalizado distinto; es posible más de una visita por usuario.
- **Apertura/clic:** suma de los contadores `Opens` y `Clicks`, que no coinciden necesariamente con las visitas.
- **Plataforma:** puede haber varias por visita; distinguir filas puente y visitas únicas.
- **Tiempo:** el análisis depende de `FechaVisita`; la fuente de fecha se registra en `OrigenFechaVisita`.

## Definición, cálculo y propósito

| KPI / medida | Cálculo o regla en Power BI | Interpretación y uso |
|---|---|---|
| 1. Visitas Totales | `SUM(FactVisitas[VisitasRegistro])` | Magnitud de registros de visita |
| 2. Usuarios Unicos | `DISTINCTCOUNT(EmailNormalizado)` | Alcance de personas distintas |
| 3. Visitas Mes Actual | Visitas entre primer y último día del mes de `TODAY()` | Útil en histórico reciente; **puede ser 0 con esta muestra antigua** |
| 4. Visitas Año Actual | Visitas del año de `TODAY()` | Mismo límite de temporalidad |
| 5. Visitas Mes Anterior | `DATEADD(DimFecha[Date], -1, MONTH)` | Comparar con periodo inmediatamente anterior al contexto |
| 6. Variacion Mensual | `Visitas Totales – Visitas Mes Anterior` | Cambio absoluto |
| 7. Variacion Mensual % | Variación / visitas mes anterior | Cambio relativo; puede estar en blanco sin base |
| 8. Visitas Acumuladas | Suma de visitas hasta última fecha visible | Tendencia acumulada |
| 9. Visitas por Usuario | Reutiliza la medida `Visitas Totales` | Muestra el volumen de visitas según el contexto de filtros; no calcula un promedio por persona |
| 10. Usuarios Nuevos | Usuarios cuya primera `FechaVisitaDia` está dentro del periodo | Primera aparición en la base, **no altas de cuenta reales** |
| 11. Usuarios Recurrentes | Usuarios únicos − usuarios nuevos | Reaparición relativa a la historia disponible |
| 12. Clicks Totales | `SUM(Clicks)` | Total de clics |
| 13. Clicks Promedio por Visita | Clics totales / visitas totales | Intensidad de clics por registro |
| 14. Visitas Año Anterior | `SAMEPERIODLASTYEAR(DimFecha[Date])` | Base de comparación temporal |
| 15. Variacion Anual % | Diferencia respecto al año anterior / año anterior | Puede ser indefinida sin año comparable |
| 16. Aperturas Totales | `SUM(Opens)` | Total de aperturas registradas |
| 17. Visitas Fecha Open | Visitas cuyo origen de fecha es `OPEN` | Calidad temporal: 381 en muestra |
| 18. Visitas Respaldo Envio | Visitas cuyo origen es `ENVIO` | Calidad temporal: 1,620 en muestra |
| 19. Visitas Fecha Proceso | Visitas cuyo origen es `PROCESO` | Conteo por respaldo final; 0 en esta muestra |
| 20. Asociaciones Plataforma | `COUNTROWS(VisitaPlataforma)` | 245 pares plataforma/visita |
| 21. Visitas Plataforma Identificada | `DISTINCTCOUNT(VisitaPlataforma[IdVisita])` | 242 visitas distintas asociadas |
| 22. Plataformas Distintas | `DISTINCTCOUNT(Plataforma)` | 9 categorías en puente |
| 23. Visitas Multiplataforma | Visitas con más de un registro en puente | 3 visitas con más de una plataforma |
| 24. Visitas Adicionales | Visitas totales − usuarios únicos | 4 visitas adicionales al primer registro por usuario (en total) |
| 25. Archivos Origen | `DISTINCTCOUNT(ArchivoOrigen)` | Trazabilidad de las tres fuentes |
| 26. Fechas Finales Vacias | Filas con `FechaVisita` en blanco | Control de integridad temporal; esperado 0 |
| 27. Clicks por Visita Navegadores 5+ | Promedio de clics condicionado a navegadores con >=5 visitas en el contexto | Evita exponer ratios de grupos extremadamente pequeños en esa métrica |

## Ejemplo de conciliación de la muestra
- `503 + 503 + 995 = 2,001` visitas.
- `146 + 138 + 186 = 470` aperturas.
- `28 + 11 + 13 = 52` clics.
- `2,001 − 1,997 = 4` visitas adicionales sobre usuarios únicos.
- `381 + 1,620 + 0 = 2,001` fechas finales clasificadas.
- `245` asociaciones para `242` visitas con plataforma; no sumar ambas cantidades.

Las fórmulas DAX exactas se conservan en `powerbi/Caso_Integracion_Reporting.SemanticModel/definition/tables/Medidas.tmdl`. [Inventario completo](inventario-medidas-powerbi.md). Las medidas DAX se encuentran organizadas por familia de indicadores y finalidad de negocio.
