# Conclusiones de la exploración de movilidad urbana

## Pregunta de decisión

¿Qué explica la evolución del uso observado y dónde conviene priorizar una investigación o un piloto de activación, recurrencia y planificación de estaciones?

La base comprende 6,715,466 registros brutos de viajes, 2024–2025, y catálogos externos de territorio, infraestructura, clima, calendario y altas de usuarios. La exploración completa está en `notebooks/01_exploracion.ipynb`.

## Hallazgos que orientan el caso

| Indicador y población | 2024 | 2025 | Lectura |
|---|---:|---:|---|
| Usuarios con viajes completos y positivos | 261,432 | 286,322 | Crece la población observada con actividad elegible. |
| Viajes completos y positivos por usuario | 13.47 | 11.02 | La frecuencia cae; conviene distinguir adquisición de vinculación. |
| Usuarios con actividad en un solo día del año | 38.39 % | 41.03 % | Uso concentrado en una única fecha, no una baja contractual confirmada. |
| Retorno a otro día dentro de 30 días, ventana madura | 49.34 % | 45.88 % | Primera observación anual, no alta real. |
| Activación dentro de 30 días del alta, ventana madura | 66.86 % | 69.75 % | Denominador de altas reales, incluidas las que no tienen viaje elegible observado. |

Los registros observados cambian -11.33 % entre años. Junio presenta la mayor caída mensual (-37.26 %); la descripción no identifica una causa.

La descomposición simétrica de viajes elegibles = usuarios × frecuencia atribuye aritméticamente 304,826 viajes al componente usuarios y -670,310 al componente frecuencia. Es una descomposición descriptiva, no un efecto causal.

## Oportunidades analíticas

| Plus | Datos y características | Decisión o análisis | Condiciones |
|---|---|---|---|
| Activación desde el alta real | Altas 2024/2025, primera fecha de viaje, días hasta activar y ventanas 7/30/90 | Separar captación de uso efectivo; comparar cohortes de alta y proponer un piloto de vinculación | Incluir altas sin viaje, censura temporal y cronología contradictoria explícita. |
| Recurrencia y profundidad de uso | Días activos, frecuencia, recencia al corte, variedad de estaciones y retorno 30/90/180 | Distinguir uso ocasional y sostenido; comparar cohortes equivalentes | Identificación de usuario por año; no afirmar primera alta desde el historial de viajes. |
| Explicación del cambio | Usuarios, viajes por usuario, calendario, franjas y periodos equivalentes | Entender el descenso más allá de una variación total | Mantener la misma población en numerador y denominador. |
| Red de flujos | Origen-destino, concentración y diversidad de destinos | Examinar corredores y conexiones entre zonas | La conexión OD no reconstruye la ruta utilizada. |
| Papel de las estaciones | Salidas y llegadas por su propia fecha/hora, saldo y persistencia mensual | Seleccionar estaciones y franjas para observación o piloto | Saldo de movimientos sin equivalencia con inventario ni saturación. |
| Territorio histórico observado | Coordenadas en los viajes, barrio/comuna por polígonos y variantes de ubicación | Comparar zonas sin imponer un catálogo posterior al pasado | Conservar excepciones y variantes; investigar cambios sin afirmar reubicaciones administrativas. |
| Conectividad de contexto | Distancias al subte y ciclovías de las instantáneas descargadas | Explorar complementariedad territorial y sensibilidad 300/500/750 m | Contexto del catálogo, no infraestructura histórica acreditada ni transbordos reales. |
| Clima y calendario | Temperatura, lluvia, viento y fechas especiales | Comparar ritmo y actividad relativa entre condiciones | ERA5 es reanálisis; usar asociaciones descriptivas y explicitar la convención temporal. |
| Escenarios de prioridad | Volumen, desequilibrio y persistencia, con pesos visibles | Evaluar estabilidad de una lista de investigación al cambiar prioridades | Pesos y umbrales explícitos; el resultado es una prioridad de investigación. |

## Contrato de indicadores

| Indicador | Cálculo y población | Filtros y tratamiento |
|---|---|---|
| Registros observados | Suma de `FactViajes.EsObservado` | Fecha de origen, estación y categorías del viaje. |
| Viajes elegibles | Suma de `FactViajes.EsViajeElegible` | Registros completos y positivos; base de flujos y recurrencia. |
| Usuarios con actividad anual | Suma de `FactUsuarioAno.TieneViajeElegible` | Usuario-año. La suma de años representa usuarios-periodo, no personas únicas interanuales. |
| Frecuencia anual | Suma de `ViajesElegibles` / usuarios con actividad anual | Mismos filtros de año y perfil; denominador cero produce ausencia de tasa. |
| Retorno a 30, 90 o 180 días | Suma de `RetornoN` / suma de `ElegibleRetornoN` | Cohorte de primera actividad anual; retorno en otro día. Ventana incompleta: resultado nulo. |
| Activación a 7, 30 o 90 días | Suma de `ActivacionN` / suma de `ElegibleActivacionN` | Cohorte de alta real, incluidas altas sin viaje. Admite activación el mismo día. |
| Duración mediana | Mediana de `DuracionAnaliticaSegundos` / 60 | Minutos de viajes conciliados; se omiten nulos sin convertirlos a cero. |
| Salidas y llegadas | Suma de cada columna de `FactMovimientosEstacion` | Ubicación, fecha y hora efectivas del movimiento; sin segmentación de usuario. |
| Saldo de movimientos | Llegadas menos salidas | Contexto temporal seleccionado; un saldo cero puede incluir muchas entradas y salidas. |
| Desequilibrio direccional | Valor absoluto del saldo / (llegadas + salidas) | Sin eventos: ausencia de tasa. Depende de la franja y periodo elegidos. |
| Diversidad de destinos | Recuento de IDs internos de destino distintos en viajes elegibles | Los cambios de ubicación de una estación no crean otra identidad de estación. |
| Concentración de corredores | Viajes elegibles de los N pares origen-destino principales / viajes elegibles | N es un parámetro explícito; se conserva el mismo universo de filtros. |
| Cercanía a infraestructura | Distancias métricas a subte y ciclovías de contexto | Coordenadas ausentes o 0.0: resultado nulo. La instantánea no acredita infraestructura histórica. |
| Prioridad de investigación | Combinación ponderada de rangos de volumen, desequilibrio y persistencia | Pesos y ventanas visibles; se examina sensibilidad, sin atribuir beneficios financieros observados. |

Los perfiles anuales se interpretan por año, corte y cohorte. Los filtros de estación y hora operan sobre viajes y movimientos; no redefinen automáticamente las poblaciones anuales de activación o retorno.

## Calidad y reglas del ETL

1. **Conservar el origen.** Mantener archivos fuente y huellas. Registrar año, archivo e identidad de cada evento para conciliar el proceso.
2. **Homologar sin aproximar IDs.** Retirar solo `BAEcobici` y la terminación entera `.0` comprobada. No usar el número público de estación como sustituto del ID interno.
3. **Duplicados.** La revisión global detectó 1 réplica exacta, comprobada contra el contenido CSV completo. Conservar una ocurrencia; no retirar dos eventos. Conflictos reales de contenido: 0. Cualquier conflicto futuro debe quedar separado.
4. **Elegibilidad por indicador.** Los registros observados conservan salidas con fecha/origen válidos. Flujos y recurrencia usan viajes completos con duración positiva. La duración analítica se calcula solo cuando las marcas de tiempo concilian dentro de un segundo con el valor declarado. Mantener banderas y denominadores separados.
5. **Extremos.** No truncar duraciones ni distancias por estética. Etiquetar extremos y revisar sensibilidad. La razón distancia directa/tiempo es un diagnóstico, no velocidad real. Las coordenadas 0.0 se conservan identificadas y quedan fuera del cálculo de distancias.
6. **Historia geográfica.** Se observan 414 IDs internos de estación y una clave para estación no identificada y 6 diferencias entre ubicaciones dominantes anuales mayores de 100 m. Conservar ubicación observada y variantes; usar el catálogo externo como referencia, sin rellenar automáticamente coordenadas históricas.
7. **Enlace espacial.** 405 de 407 estaciones del catálogo tienen pertenencia única a barrio/comuna. Las restantes quedan como excepciones explícitas. Las distancias a ciclovías se calculan en EPSG:32721 y las distancias entre puntos con geodesia WGS84.
8. **Usuarios.** Hay 107,243 códigos compartidos entre años. Se conserva la clave usuario-año para cohortes; el solapamiento por sí solo no acredita continuidad de identidad.
9. **Altas.** Mantener todas las altas identificables, incluidas las que no tienen viaje. Separar identidad ambigua, fecha inválida y viaje anterior al alta. Las edades fuera de 0–120 quedan sin segmentación etaria, conservando el valor reportado. El perfil analítico utiliza fecha de alta, edad y género.
10. **Ventanas.** Elegibilidad por fecha de alta o primera observación y fecha de corte del año. Retorno exige otro día; activación admite el mismo día. No convertir ausencia de ventana completa en fracaso.
11. **Tiempo y clima.** Mantener las fechas/horas declaradas por la fuente sin convertirlas a UTC. La lectura local de Buenos Aires se documenta como supuesto de trabajo; no está acreditada por un offset en el CSV. El enlace diario meteorológico se presenta como contexto bajo ese supuesto. No atribuir diferencias a efectos causales.
12. **Conservación del grano.** Cada unión debe validar cardinalidad. Llegadas y salidas se agregan con su marca temporal correspondiente. Conciliar cada tabla auxiliar con su población de viajes; diferenciar desconocido de cero.

## Modelo lógico

| Tabla | Grano y propósito | Preparación |
|---|---|---|
| FactViajes | Un viaje tras retirar la réplica exacta; datos fuente, claves de roles, duración y banderas de elegibilidad | ETL. Conservar registros anómalos identificados; las medidas seleccionan su población. |
| FactMovimientosEstacion | Estación/ubicación observada, fecha y hora; salidas y llegadas de viajes completos positivos | ETL agregado para comparar entradas y salidas con medidas sencillas. El grano conserva las variantes de ubicación y concilia ambas sumas con los viajes elegibles. |
| FactUsuarioAno | Usuario y corte anual, unión externa de usuarios con viajes y altas del año | ETL. Flags diferenciados de alta, actividad, activación y retorno; conserva no activados y usuarios anteriores sin alta anual disponible. |
| FactContextoDiario | Fecha y punto de referencia meteorológica de la ciudad | ETL con contexto ERA5 y calendario; no multiplicar viajes al enlazar. |
| EstacionUbicacion | ID interno y variante de ubicación observada, con nombre estable documentado, aliases y geografía derivada | Catálogo enriquecido de ubicaciones observadas. No suponer fechas administrativas de vigencia. |
| DimFecha, DimHora, categorías y roles de estación | Dominios de análisis y claves únicas | DAX simple cuando los atributos ya estén disponibles; roles derivados de una única fuente enriquecida. |

La fact de usuarios consolida dos poblaciones al mismo grano, preservando sus banderas; evita una tabla separada para cada ventana. La tabla de movimientos responde a una decisión distinta y evita fórmulas extensas para cambiar roles de fecha/hora y estación.

La distribución física utiliza dos CSV GZip anuales para viajes y un archivo por cada tabla restante; los siete archivos permanecen por debajo de 100 MiB. Los archivos anuales originales superan el límite ordinario de GitHub y se reproducen desde sus URLs, sin incorporarlos como archivos ordinarios al repositorio. `output/` se reserva para las tablas consumidas por Power BI; no recibe auditorías ni muestras.

## Alcance de las conclusiones

Las conclusiones cubren patrones de uso y prioridades de investigación. Los saldos describen movimientos registrados y las relaciones con clima y territorio son descriptivas. Inventario, costes y sustitución modal requieren fuentes adicionales para calcular disponibilidad, retorno financiero o emisiones evitadas.

## Validación

Se ejecutaron 25 celdas de código contra las diez fuentes y catálogos. Los controles de identidad tras réplica, grano, conciliación, calendario, clima y tasas resultaron satisfactorios. Las anomalías se conservan identificadas mediante banderas y criterios de elegibilidad.

Las tablas de consumo y sus reglas se implementan en `notebooks/02_etl.ipynb`. Las claves, campos y contratos se detallan en `docs/Modelo_y_Datos.md`; las conciliaciones de lectura y exportación se documentan en `docs/Ejecucion_y_Validacion.md`.

La exploración compara prioridades en la mañana laboral de 07–09 h, con al menos seis meses observados y rangos percentiles. El reporte aplica rangos densos normalizados a las estaciones activas del contexto seleccionado y permite cambiar los pesos. Estas definiciones responden a preguntas distintas: patrón de la franja laboral y prioridad del contexto del dashboard. La persistencia observada y los índices ponderados se mantienen en columnas distintas.
