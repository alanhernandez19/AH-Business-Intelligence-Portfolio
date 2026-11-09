# Modelo y diccionario de datos

## Linaje

Los ZIP anuales alimentan `FactViajes` y las agregaciones de movimientos y usuario-año. Las altas completan el universo anual de usuarios, incluidas altas sin viajes. Las coordenadas observadas alimentan `DimEstacionUbicacion`; barrios, subte y ciclovías enriquecen esa tabla. ERA5 y el calendario forman `FactContextoDiario`.

`src/01_Fuentes.ipynb` concentra la lectura y verificación de réplicas para exploración y ETL. Los identificadores de usuario de las fuentes se utilizan durante el enlace; las salidas usan una clave sustituta usuario-año. El ordinal de registro y el año permiten conciliar el recorrido con el archivo de origen. Las claves sustitutas se asignan por orden estable de sus componentes sobre las fuentes verificadas.

## Contrato de consumo

`output/` contiene siete archivos correspondientes a seis tablas lógicas. Las dos particiones de viajes se anexan en una sola consulta. Los CSV son UTF-8, delimitados por coma, con entrecomillado CSV y fechas ISO. Los números usan punto decimal sin separador de miles; la conversión de tipos en Power Query utiliza cultura `en-US`. Los campos ausentes permanecen vacíos y deben convertirse a `null`, conservando el cero cuando representa un conteo o resultado observado.

Power Query lee GZip con [Binary.Decompress](https://learn.microsoft.com/en-us/powerquery-m/binary-decompress) y `Compression.GZip`, antes de `Csv.Document`. El contrato de carga define `pArchivo` como ruta base. Los archivos grandes permanecen por debajo de 100 MiB.

## Claves y filtros

- Viajes y perfiles comparten `UsuarioAnoKey`. La dimensión de usuario-año puede derivarse mediante `DISTINCT` y `SELECTCOLUMNS` desde el perfil anual.
- Las dos claves de ubicación del viaje tienen roles origen y destino. Los roles se derivan de una única tabla geográfica enriquecida; no requieren copias CSV.
- Los movimientos usan una sola ubicación y su fecha/hora efectiva. Admiten filtros territoriales y temporales; su grano agregado no incorpora segmentación de usuario.
- La fecha diaria, la cohorte y el corte anual son roles distintos. La dimensión diaria se construye dinámicamente a partir de las fechas observadas. Los perfiles anuales responden a año, corte y cohorte; un filtro horario o de estación no redefine su población.
- Hora y categorías simples pueden derivarse con DAX sencillo. Los atributos externos de territorio y meteorología se conservan en las tablas cargadas.

Los detalles de relaciones y medidas corresponden al modelo semántico. El contrato de datos preserva claves únicas y poblaciones explícitas para facilitar fórmulas pequeñas.

## Diccionario

### FactViajes

Un viaje identificado; la partición de 2025 tiene el mismo esquema.

| Campo | Tipo | Significado y tratamiento |
|---|---|---|
| ViajeKey | Entero | Identificador entero del recorrido en la fuente; único tras retirar la réplica exacta. |
| Ano | Entero | Año de la fuente y del perfil anual. La identidad de usuario se interpreta dentro de ese año. |
| FilaFuente | Entero | Ordinal del registro de datos dentro del CSV anual, excluyendo el encabezado. |
| UsuarioAnoKey | Entero | Clave sustituta de usuario-año, común a viajes y perfiles anuales. |
| FechaOrigen | Fecha ISO | Fecha declarada de inicio del viaje. |
| HoraOrigen | Entero | Hora de inicio declarada, 0–23. |
| FechaDestino | Fecha ISO | Fecha declarada de finalización; nula cuando falta el destino temporal. |
| HoraDestino | Entero | Hora declarada de finalización, 0–23; nula en viajes sin fecha final. |
| EstacionOrigenUbicacionKey | Entero | Clave de la ubicación observada en origen. |
| EstacionDestinoUbicacionKey | Entero | Clave de la ubicación observada en destino; 0 cuando no se identifica la estación. |
| DuracionDeclaradaSegundos | Entero | Duración original interpretada como segundos enteros, incluidas las anomalías. |
| DuracionAnaliticaSegundos | Entero | Diferencia de fechas en segundos para viajes elegibles que concilian con la duración declarada en ±1 s; nula en los restantes. |
| DistanciaDirectaKm | Decimal | Distancia geodésica WGS84 entre extremos disponibles, en km. Nula sin geografía utilizable; no es distancia de ruta. |
| ModeloReportado | Texto | Modelo de bicicleta según el registro de viaje. |
| GeneroReportado | Texto | Categoría reportada por la fuente del viaje; SIN DATO para ausencia. |
| EsObservado | Entero 0/1 | 1 si existe fecha de inicio y estación de origen identificada. |
| EsCompleto | Entero 0/1 | 1 si la salida observada tiene fecha final no anterior al inicio y destino identificado. |
| EsViajeElegible | Entero 0/1 | 1 si el registro completo tiene duración declarada positiva; población de flujos y recurrencia. |
| EsDuracionConciliada | Entero 0/1 | 1 si el viaje elegible concilia duración declarada y diferencia de fechas dentro de un segundo. |
| EsDuracionNoPositiva | Entero 0/1 | 1 para una duración declarada igual o menor que cero. |
| EsDuracionMayor24h | Entero 0/1 | 1 para una duración declarada superior a 86,400 s; conserva el valor original. |
| EsMismaEstacion | Entero 0/1 | 1 cuando los IDs internos identificados de origen y destino coinciden. |
| EsRazonDistanciaTiempoAlta | Entero 0/1 | 1 si un viaje elegible supera 60 km/h al dividir distancia directa por duración declarada; diagnóstico, no velocidad real. |

### FactMovimientosEstacion

Una ubicación, fecha y hora, con llegadas y salidas elegibles.

| Campo | Tipo | Significado y tratamiento |
|---|---|---|
| EstacionUbicacionKey | Entero | Clave sustituta de ID interno y coordenadas a seis decimales. El valor 0 identifica estación desconocida. |
| Fecha | Fecha ISO | Fecha del movimiento o del contexto meteorológico, según la tabla. |
| Hora | Entero | Hora 0–23 del evento de estación. |
| Salidas | Entero | Viajes elegibles que parten de esta ubicación en la fecha y hora indicadas. |
| Llegadas | Entero | Viajes elegibles que llegan a esta ubicación en su propia fecha y hora de destino. |
| Saldo | Entero | Llegadas menos salidas; saldo de movimientos, sin equivalencia con inventario. |

### FactUsuarioAno

Un usuario-año, unión externa de actividad y altas.

| Campo | Tipo | Significado y tratamiento |
|---|---|---|
| Ano | Entero | Año de la fuente y del perfil anual. La identidad de usuario se interpreta dentro de ese año. |
| UsuarioAnoKey | Entero | Clave sustituta de usuario-año, común a viajes y perfiles anuales. |
| FechaPrimeraObservada | Fecha ISO | Primer día del año con viaje completo y positivo de ese usuario; no equivale a alta. |
| FechaUltimaObservada | Fecha ISO | Último día del año con viaje completo y positivo. |
| ViajesElegibles | Entero | Número anual de viajes completos y positivos del usuario; 0 si no tiene actividad elegible observada. |
| DiasActivos | Entero | Días distintos del año con viajes elegibles; 0 cuando no hay actividad elegible. |
| EstacionesOrigenDistintas | Entero | Cantidad anual de estaciones de origen distintas en viajes elegibles. |
| FechaAlta | Fecha ISO | Fecha de registro real en el catálogo de altas del mismo año; nula cuando no figura en ese catálogo anual. |
| EdadReportada | Entero | Edad original del catálogo anual de altas, conservada aunque sea anómala; nula sin alta/dato. |
| GeneroAlta | Texto | Género del catálogo de altas; Sin alta en catálogo anual distingue la población sin alta disponible. |
| ViajesObservados | Entero | Número de salidas observadas del usuario-año, con independencia de la elegibilidad por duración. |
| EsAltaObservada | Entero 0/1 | 1 cuando el usuario aparece con fecha válida en el catálogo de altas del año. |
| TieneViajeObservado | Entero 0/1 | 1 cuando el usuario tiene al menos una salida observada durante el año. |
| TieneViajeElegible | Entero 0/1 | 1 cuando el usuario tiene al menos un viaje completo y positivo durante el año. |
| FechaCorte | Fecha ISO | Última fecha de inicio observada de la fuente anual; referencia de ventanas y recencia. |
| RecenciaCierreDias | Entero | Días entre último viaje elegible y corte anual; nula sin actividad elegible. |
| SeguimientoObservadoDias | Entero | Días disponibles desde la primera actividad elegible hasta el corte anual. |
| DiasHastaActivacion | Entero | Días desde alta real hasta el primer viaje elegible del año; nula sin una de las fechas. |
| EsCronologiaContradictoria | Entero 0/1 | 1 si el primer viaje elegible es anterior al alta registrada. |
| ElegibleRetorno30 | Entero 0/1 | 1 si la primera actividad elegible tiene 30 días completos de seguimiento dentro del año. |
| Retorno30 | Entero 0/1 | 1 si existe actividad en otro día, de 1 a 30 días desde la primera observación; 0 sin retorno en ventana completa; nulo si no es elegible. |
| ElegibleRetorno90 | Entero 0/1 | 1 si la primera actividad elegible tiene 90 días completos de seguimiento dentro del año. |
| Retorno90 | Entero 0/1 | 1 si existe actividad en otro día, de 1 a 90 días desde la primera observación; 0 sin retorno en ventana completa; nulo si no es elegible. |
| ElegibleRetorno180 | Entero 0/1 | 1 si la primera actividad elegible tiene 180 días completos de seguimiento dentro del año. |
| Retorno180 | Entero 0/1 | 1 si existe actividad en otro día, de 1 a 180 días desde la primera observación; 0 sin retorno en ventana completa; nulo si no es elegible. |
| ElegibleActivacion7 | Entero 0/1 | 1 para alta identificable y cronológicamente consistente con 7 días completos hasta el corte. |
| Activacion7 | Entero 0/1 | 1 si el primer viaje elegible ocurre entre el alta y 7 días después inclusive; 0 sin activación en ventana completa; nulo sin elegibilidad. |
| ElegibleActivacion30 | Entero 0/1 | 1 para alta identificable y cronológicamente consistente con 30 días completos hasta el corte. |
| Activacion30 | Entero 0/1 | 1 si el primer viaje elegible ocurre entre el alta y 30 días después inclusive; 0 sin activación en ventana completa; nulo sin elegibilidad. |
| ElegibleActivacion90 | Entero 0/1 | 1 para alta identificable y cronológicamente consistente con 90 días completos hasta el corte. |
| Activacion90 | Entero 0/1 | 1 si el primer viaje elegible ocurre entre el alta y 90 días después inclusive; 0 sin activación en ventana completa; nulo sin elegibilidad. |
| EdadAnalitica | Entero | Edad reportada dentro de 0–120; nula cuando no es utilizable. La fecha de referencia de edad no está acreditada. |
| GrupoEdad | Texto | Tramos de edad reportada utilizable; Sin edad utilizable reúne ausencia y anomalías. |
| CohorteObservada | Fecha ISO | Primer día del mes de primera actividad elegible observada en el año. |
| CohorteAlta | Fecha ISO | Primer día del mes de alta real disponible. |
| GrupoFrecuencia | Texto | Tramos anuales de viajes elegibles: ninguno, 1, 2–5, 6–20 y más de 20. |

### FactContextoDiario

Una fecha y celda de referencia meteorológica.

| Campo | Tipo | Significado y tratamiento |
|---|---|---|
| Fecha | Fecha ISO | Fecha del movimiento o del contexto meteorológico, según la tabla. |
| TemperaturaMediaC | Decimal | Temperatura media diaria de ERA5 en °C. |
| PrecipitacionMm | Decimal | Precipitación diaria estimada ERA5, en mm. |
| VientoMaximoKmh | Decimal | Máximo diario de velocidad del viento a 10 m según ERA5, en km/h. |
| TipoDiaEspecial | Texto | Feriado nacional, día no laborable o Sin fecha especial general. |
| NombreDiaEspecial | Texto | Denominación del calendario nacional general o Sin fecha especial general. |
| LatitudReferencia | Decimal | Latitud de la celda meteorológica devuelta por la fuente. |
| LongitudReferencia | Decimal | Longitud de la celda meteorológica devuelta por la fuente. |
| ModeloClima | Texto | Modelo de reanálisis utilizado: ERA5. |

### DimEstacionUbicacion

Un ID interno y variante de coordenada observada.

| Campo | Tipo | Significado y tratamiento |
|---|---|---|
| EstacionUbicacionKey | Entero | Clave sustituta de ID interno y coordenadas a seis decimales. El valor 0 identifica estación desconocida. |
| Longitud | Decimal | Longitud observada redondeada a seis decimales; nula sin coordenada utilizable. |
| Latitud | Decimal | Latitud observada redondeada a seis decimales; nula sin coordenada utilizable. |
| NombreEstacion | Texto | Nombre estable por catálogo; sin coincidencia de ID, nombre observado dominante del último año disponible. |
| NumeroPublico | Entero | Número público del catálogo; opcional y sin función de clave. |
| EstacionKey | Entero | ID interno estable de estación; 0 reservado para estación no identificada. |
| EtiquetaEstacion | Texto | ID interno y nombre estable para identificar estaciones sin confundir números públicos. |
| AliasObservados | Texto | Nombres distintos reportados en los viajes para el mismo ID interno. |
| Barrio | Texto | Barrio por pertenencia única a polígono oficial; Sin asignación en excepciones. |
| Comuna | Texto | Comuna del polígono oficial; Sin asignación en excepciones. |
| EstadoGeografia | Texto | Asignada, Fuera de polígonos, Asignación ambigua, Coordenada 0.0 o Coordenada no disponible. |
| DistanciaSubteActualM | Decimal | Distancia geodésica WGS84 al punto de subte más cercano de la instantánea; metros, nula sin coordenada. |
| SubteActualMasCercano | Texto | Nombre del punto de subte más próximo; Sin coordenada cuando no se puede calcular. |
| DistanciaCicloviaActualM | Decimal | Distancia al segmento más próximo de ciclovía en EPSG:32721, en metros; nula sin coordenada. |


## Preparación y granularidad del modelo de consumo

`FactViajes` contiene un registro por viaje, con trazabilidad a su fila de fuente, claves, atributos y banderas de calidad. `FactMovimientosEstacion` agrega por ubicación, fecha y hora. `FactUsuarioAno` integra actividad y altas al grano usuario-año. `FactContextoDiario` organiza el calendario y el clima al grano diario.

Las dos dimensiones de cohortes proyectan las fechas mensuales distintas de alta y primera actividad observada. El número y nombre de mes se calculan sobre esas dimensiones pequeñas, sin repetir cuatro columnas en cada usuario. El calendario de movimientos mantiene los atributos temporales sencillos y toma del contexto diario su clasificación de clima y calendario.

### Atributos estáticos de consumo

| Tabla | Campo | Regla |
|---|---|---|
| FactUsuarioAno | EsElegibleEmbudo | Entero 0/1. Alta observada y fecha de alta no posterior al corte menos la suma de las ventanas de activación y retorno del embudo. Los parámetros actuales son 30 y 90 días. |
| FactContextoDiario | TipoClima | Etiqueta calculada con PrecipitacionMm y el umbral configurado en milímetros; se conserva como dato diario. |

### PuntosCorredor

Dos extremos por conexión anual entre ubicaciones observadas de estaciones distintas y con geografía utilizable. Se exportan todos los pares representables. La tabla se prepara en el ETL; Power Query realiza lectura, validación de cabecera, conversión de vacíos y tipos.

| Campo | Tipo | Significado |
|---|---|---|
| Ano | Entero | Año de origen del viaje. |
| RutaKey | Entero | Identificador de la conexión anual en la reconstrucción completa. |
| Ruta | Texto | Nombres observados de origen y destino. El identificador distingue variantes con el mismo nombre. |
| Orden | Entero | 0 para origen y 1 para destino. |
| Latitud, Longitud | Decimal | Coordenadas del extremo observado. |
| Viajes | Entero | Viajes elegibles de la conexión; el mismo conteo aparece en ambos extremos. |
| Origen, Destino | Texto | Nombre de la estación de cada extremo. |
| EstacionOrigenUbicacionKey, EstacionDestinoUbicacionKey | Entero | Referencias al catálogo de ubicaciones observadas. |
| TrazoSVG | Texto | Geometría de presentación preparada en el ETL para Orden = 0; vacía en el segundo extremo. No modifica las coordenadas ni las métricas. |

`Viajes` no debe sumarse directamente sobre ambos extremos. El mapa y su detalle utilizan el máximo por RutaKey; las conciliaciones de la tabla suman únicamente Orden = 0. El número de conexiones se obtiene mediante conteo distinto de RutaKey.

El grano anual permite filtrar el mapa por año, origen, destino y conexión. El límite visible se aplica en los visuales después de sus filtros y no recorta el archivo. El detalle conserva fecha, hora, usuario y las demás variables para los análisis que las necesitan. Un filtro de mes, hora o perfil no se atribuye a la tabla anual de conexiones.

### Reejecución y crecimiento

Los años de recorridos se descubren en FUENTES.json. Los archivos anuales grandes pueden dividirse por el máximo de filas configurado; Power Query combina todas las particiones FactViajes_*.csv.gz. La lectura exige el mismo esquema en todas ellas y rechaza columnas adicionales o cabeceras distintas.

El proceso actual reconstruye el conjunto completo. Sus claves son deterministas para el mismo conjunto de entradas; no se presentan como claves persistentes entre ampliaciones históricas. Una estrategia incremental futura debe establecer correspondencias estables e invalidar dependencias cuando cambien fuentes, reglas o catálogos. Las fuentes de clima y calendario deben cubrir las fechas incorporadas.

### Geografía de presentación local

El ETL genera `assets/mapa_base_corredores.svg` con proyección común para fondo y conexiones. La tabla de configuración `ConfigMapaLocal` lee este único recurso. La medida 80 devuelve únicamente el fondo geográfico con MAX. El visual recibe una fila por conexión mediante Orden = 0 y aplica el mismo Top N y desempate por RutaKey que la tabla. Las proyecciones y trazos permanecen preparados en el ETL. El componente dibuja curvas esquemáticas para distinguir sentidos, sin inferir recorridos por calles ni modificar las métricas. El grosor es una codificación visual del volumen y la selección utiliza las identidades nativas del modelo. El recurso se distribuye en `assets/`, junto con el paquete del componente.
