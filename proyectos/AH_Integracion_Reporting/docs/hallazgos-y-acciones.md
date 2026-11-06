# Hallazgos, decisiones operativas y recomendaciones

## Evidencia observable
| Fuente | Visitas | Aperturas | Clics |
|---|---:|---:|---:|
| `report_7.txt` | 503 | 146 | 28 |
| `report_8.txt` | 503 | 138 | 11 |
| `report_9.txt` | 995 | 186 | 13 |
| **Total** | **2,001** | **470** | **52** |

- Se identifican **1,997 usuarios únicos**. La diferencia de **4** respecto a las visitas es coherente con correos que aparecen más de una vez; no se debe borrar por defecto.
- La regla temporal utiliza `OPEN` en **381 visitas** y `ENVIO` en **1,620**. Las 470 aperturas son un contador distinto del número de visitas fechadas por apertura.
- El puente registra **245 asociaciones de plataforma** para **242 visitas**; tres visitas contienen más de una plataforma. Hay nueve plataformas identificadas.
- Las fuentes contienen calidades distintas de fecha, navegador y plataforma; por ello se guardan campos originales y etiquetas analíticas separadas.

## Qué decisiones habilita el reporte
| Tema | Evidencia | Uso / acción operativa |
|---|---|---|
| Control de ingesta | Archivos identificados por nombre y SHA-256 | Revisar cargas omitidas, modificadas o interrumpidas |
| Actividad | Visitas ≠ aperturas ≠ clics | Construir KPI sin confundir unidades |
| Historia | `IdVisita` persistente y datos acumulados | Comparar períodos sin recargar fuentes previas |
| Calidad temporal | 381 `OPEN` y 1,620 `ENVIO` | Priorizar mejoras de captura de fecha de apertura |
| Tecnología | Nueve plataformas; puente multidispositivo | Comparar presencia de plataformas sin duplicar visitas |
| Seguridad | Catálogo de usuario/rol/plataforma | Revisar que cada perfil vea solo el alcance previsto |
| Consumo ejecutivo | Cinco páginas AH | Exponer volumen, tendencia, audiencia, tecnología y QA |

## Límite de las conclusiones
No hay información suficiente para atribuir clics a campañas específicas, estimar conversión económica, calcular rentabilidad o concluir que una tecnología **causa** mayor participación. Las variaciones con `TODAY()` solo tienen sentido si el período visible está cubierto por los datos. El análisis permite evaluar la integración y el reporting de la muestra disponible.

## Mejoras futuras fuera del alcance desarrollado
Una ampliación operativa incorporaría responsables de datos, acuerdos de entrega, gestión de credenciales, monitoreo, alertas y gobierno de accesos y retención.
