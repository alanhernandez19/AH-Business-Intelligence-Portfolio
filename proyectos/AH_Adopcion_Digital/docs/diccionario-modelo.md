# Diccionario físico del modelo

Tipos del modelo de Power BI: seis tablas importadas desde CSV de `output/` y tres dimensiones calculadas en DAX (`DimFecha`, `DimCorte`, `DimTiendaPreferida`). El esquema de auditoría de los CSV queda en `evidencia/modelo_actual/auditoria/EsquemaModelo.json`. Las claves sustitutas son enteras; códigos naturales y geográficos permanecen como texto. Los importes en centavos son enteros exactos. El grano y el origen se describen por tabla; los indicadores 1/0 son banderas, y los nulos conservan falta de dato o de ventana observable.

## DimFecha

**Grano:** Día. **Origen:** Fechas de los movimientos observados y calendario derivado.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `FechaKey` | int64 | Clave de día en formato AAAAMMDD. |
| `Fecha` | date | Fecha calendario del movimiento. |
| `Anio` | int64 | Año calendario. |
| `MesNumero` | int64 | Número de mes, 1 a 12. |
| `MesNombre` | text | Nombre del mes. |
| `AnioMes` | text | Mes calendario en formato AAAA-MM. |
| `Trimestre` | int64 | Trimestre calendario, 1 a 4. |
| `DiaSemanaNumero` | int64 | Número de día de la semana. |
| `EsFinSemana` | int64 | Indicador 1/0 de sábado o domingo. |
| `DiaConRegistrosFuente` | int64 | Indicador 1/0 de presencia de movimientos en la fecha. |

## DimCliente

**Grano:** Cliente con movimientos. **Origen:** Maestro de cuentas consolidado, segmento y municipio de domicilio.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `ClienteKey` | int64 | Clave sustituta del cliente; no es el código natural de la fuente. |
| `EdadObservada` | number | Edad disponible en el maestro; vigencia no informada. |
| `MunicipioDomicilioCve` | text | Clave de municipio de domicilio informada en el maestro. |
| `CuentasEnMaestro` | int64 | Número de cuentas asociadas al cliente. |
| `ClienteReferencia` | text | Etiqueta local derivada de ClienteKey para lectura del modelo. |
| `SegmentoOrigenCodigo` | text | Código de segmento de origen, sin etiqueta empresarial acreditada. |
| `EdadDisponible` | int64 | Indicador 1/0 de edad no nula. |
| `EdadMayor100Revisar` | int64 | Indicador 1/0 de edad superior a cien años para revisión. |
| `GrupoEdad` | text | Tramo de edad derivado cuando existe edad. |
| `SegmentoDisponible` | int64 | Indicador 1/0 de segmento de origen disponible. |
| `MunicipioNombre` | text | Nombre del municipio unido por clave. |
| `EstadoClave` | text | Clave de entidad de dos dígitos. |
| `IndiceTerritorialFuente2020` | number | Índice territorial de la muestra; escala e interpretación por acreditar. |
| `NombreEstado` | text | Nombre de entidad incorporado desde catálogo de INEGI. |
| `PoblacionMunicipio2020` | int64 | Población del total municipal ITER 2020, cuando se integra el archivo. |
| `ViviendasConCaracteristicas2020` | int64 | Denominador municipal de viviendas para la proporción de Internet. |
| `ViviendasInternet2020` | int64 | Viviendas municipales con Internet reportadas por ITER. |
| `PorcentajeInternetMunicipio2020` | number | ViviendasInternet2020 / ViviendasConCaracteristicas2020; razón 0 a 1. |
| `CensoMunicipalDisponible` | int64 | Indicador 1/0 de cruce con total municipal ITER. |
| `DomicilioMunicipioValido` | int64 | Indicador 1/0 de domicilio con correspondencia en catálogo municipal. |

Columnas calculadas en DAX para el reporte:

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `BandaInternetMunicipio` | text | Tramos ≤40%, 40–60%, 60–80%, >80% y Sin dato de la proporción municipal. |
| `OrdenBandaInternetMunicipio` | int64 | Orden 1–4 de las bandas; 5 para Sin dato. |
| `EstadoMapaISO` | text | Correspondencia de clave estatal con ISO del mapa integrado de México; nulo sin clave válida. |
| `EstadoVisual` | text | Nombre de entidad o Sin domicilio válido, para filtros y tablas. |

## DimProducto

**Grano:** Producto observado. **Origen:** Catálogo de producto y categoría, incluidos miembros sin correspondencia.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `ProductoKey` | int64 | Clave sustituta de producto observado. |
| `ProductoCodigoFuente` | text | Código de producto de la fuente. |
| `MarcaCodigo` | text | Código de marca de la fuente, sin nombre disponible. |
| `CategoriaCodigo` | text | Clave de categoría de producto. |
| `ProductoEnCatalogo` | int64 | Indicador 1/0 de producto con atributos en catálogo. |
| `CategoriaNombre` | text | Nombre de categoría unido por código. |
| `MarcaCategoriaCodigo` | text | Clave compuesta categoría:marca; evita equiparar marcas entre categorías. |

## DimTienda

**Grano:** Tienda observada en movimientos. **Origen:** Catálogo de tienda y municipio comercial.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `TiendaKey` | int64 | Clave sustituta de tienda del movimiento. |
| `TiendaCodigoFuente` | text | Código de tienda de la fuente. |
| `Canal` | text | Clasificación de canal del catálogo de tiendas. |
| `MunicipioTiendaCve` | text | Municipio de la tienda; ubicación comercial. |
| `TiendaEnCatalogo` | int64 | Indicador 1/0 de tienda con atributos en catálogo. |
| `MunicipioNombre` | text | Nombre del municipio unido por clave. |
| `EstadoClave` | text | Clave de entidad de dos dígitos. |
| `IndiceTerritorialFuente2020` | number | Índice territorial de la muestra; escala e interpretación por acreditar. |
| `NombreEstado` | text | Nombre de entidad incorporado desde catálogo de INEGI. |
| `PoblacionMunicipio2020` | int64 | Población del total municipal ITER 2020, cuando se integra el archivo. |
| `ViviendasConCaracteristicas2020` | int64 | Denominador municipal de viviendas para la proporción de Internet. |
| `ViviendasInternet2020` | int64 | Viviendas municipales con Internet reportadas por ITER. |
| `PorcentajeInternetMunicipio2020` | number | ViviendasInternet2020 / ViviendasConCaracteristicas2020; razón 0 a 1. |
| `CensoMunicipalDisponible` | int64 | Indicador 1/0 de cruce con total municipal ITER. |
| `MunicipioTiendaValido` | int64 | Indicador 1/0 de cruce de municipio de tienda. |

## DimTiendaPreferida

**Grano:** Tienda observada como preferida. **Origen:** Proyección DAX de `DimTienda` para el papel de tienda calculado en antecedentes. Contiene las 217 tiendas observadas; todas las claves de preferencia del hecho tienen correspondencia.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `TiendaPreferidaKey` | int64 | Clave sustituta de tienda preferida, copiada de `DimTienda[TiendaKey]`. |
| `TiendaCodigoFuente` | text | Código de tienda de la fuente. |
| `Canal` | text | Clasificación de canal del catálogo de tiendas. |
| `TiendaEnCatalogo` | int64 | Indicador 1/0 de tienda con atributos en catálogo. |
| `MunicipioTiendaValido` | int64 | Indicador 1/0 de cruce de municipio de tienda. |
| `CensoMunicipalDisponible` | int64 | Indicador 1/0 de cruce con total municipal ITER. |
| `MunicipioTiendaCve` | text | Municipio de la tienda; ubicación comercial. |
| `MunicipioNombre` | text | Nombre del municipio unido por clave. |
| `EstadoClave` | text | Clave de entidad de dos dígitos. |
| `IndiceTerritorialFuente2020` | number | Índice territorial de la muestra; escala e interpretación por acreditar. |
| `NombreEstado` | text | Nombre de entidad incorporado desde catálogo de INEGI. |
| `PoblacionMunicipio2020` | int64 | Población del total municipal ITER 2020, cuando se integra el archivo. |
| `ViviendasConCaracteristicas2020` | int64 | Denominador municipal de viviendas para la proporción de Internet. |
| `ViviendasInternet2020` | int64 | Viviendas municipales con Internet reportadas por ITER. |
| `PorcentajeInternetMunicipio2020` | number | ViviendasInternet2020 / ViviendasConCaracteristicas2020; razón 0 a 1. |

## DimReglaAnalisis

**Grano:** Regla analítica. **Origen:** Cuatro criterios de selección de movimientos.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `ReglaKey` | int64 | Clave de criterio analítico; elegir una sola regla en una vista. |
| `ReglaNombre` | text | Nombre breve del criterio. |
| `Definicion` | text | Condiciones del criterio de selección de movimientos. |

## DimCorte

**Grano:** Corte de observación. **Origen:** Fecha final del snapshot.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `CorteKey` | int64 | Clave de fecha de corte en formato AAAAMMDD. |
| `FechaCorte` | date | Fecha final de observación del snapshot. |
| `CorteNombre` | text | Etiqueta del corte de observación. |

## FactMovimientos

**Grano:** Línea ticket–producto. **Origen:** Movimientos fuente enriquecidos, sin alterar importe ni unidades.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `LineaFuenteNro` | int64 | Número secuencial de línea de la fuente; clave del hecho. |
| `TicketKey` | int64 | Clave sustituta del ticket. |
| `FechaKey` | int64 | Clave de día en formato AAAAMMDD. |
| `ClienteKey` | int64 | Clave sustituta del cliente; no es el código natural de la fuente. |
| `ProductoKey` | int64 | Clave sustituta de producto observado. |
| `TiendaKey` | int64 | Clave sustituta de tienda del movimiento. |
| `OperacionFuente` | int64 | Código de operación registrado en la fuente. |
| `MontoCentavos` | int64 | Importe firmado convertido a centavos enteros. |
| `ImporteFirmado` | number | MontoCentavos / 100; moneda no acreditada. |
| `Unidades` | number | Unidades de la línea; se conservan fracciones. |
| `EsMontoNegativo` | int64 | Indicador 1/0 de importe menor que cero. |
| `EsMontoCero` | int64 | Indicador 1/0 de importe igual a cero. |
| `EsServicio` | int64 | Indicador 1/0 de categoría servicios. |
| `EsProductoDesconocido` | int64 | Indicador 1/0 de producto sin categoría acreditada. |
| `EsCanalDesconocido` | int64 | Indicador 1/0 de tienda sin canal acreditado. |

## FactClienteCorte

**Grano:** Cliente × corte × regla. **Origen:** Snapshot de actividad, adopción y antecedentes.

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `ClienteKey` | int64 | Clave sustituta del cliente; no es el código natural de la fuente. |
| `FechaPrimeraObservada` | date | Primera fecha con movimiento en la ventana y regla. |
| `FechaUltimaObservada` | date | Última fecha con movimiento hasta el corte. |
| `LineasPeriodo` | int64 | Número de líneas observadas hasta el corte. |
| `TicketsPeriodo` | int64 | Tickets distintos observados hasta el corte. |
| `VisitasPeriodo` | int64 | Fechas distintas con actividad hasta el corte. |
| `CentavosPeriodo` | int64 | Suma firmada de centavos hasta el corte. |
| `UnidadesPeriodo` | number | Suma de unidades hasta el corte. |
| `FechaPrimeraFisica` | date | Primera fecha de actividad física observada. |
| `FechaPrimeraInternet` | date | Primera fecha de actividad por Internet observada. |
| `EstadoOrigen` | text | Clasificación del primer día observado, con empates y desconocidos explícitos. |
| `EsElegibleFisico` | int64 | Indicador 1/0 de primer día exclusivamente físico. |
| `EsAdoptantePosterior` | int64 | Indicador 1/0 de compra Internet posterior a primera física. |
| `DiasHastaDigital` | int64 | Días entre primera física e Internet posterior; nulo en otros casos. |
| `SeguimientoDias` | int64 | Días disponibles desde primera observación hasta el corte. |
| `RecenciaCorteDias` | int64 | Días desde última actividad hasta el corte. |
| `CohorteMes` | text | Mes de primera actividad observada. |
| `VentanaCompleta30` | int64 | Indicador 1/0 de seguimiento completo durante 30 días. |
| `Adopto30` | int64 | Indicador 1/0 de adopción posterior dentro de 30 días; nulo si no aplica. |
| `Recompra30` | int64 | Indicador 1/0 de otra fecha de actividad dentro de 30 días; nulo si no aplica. |
| `VentanaCompleta90` | int64 | Indicador 1/0 de seguimiento completo durante 90 días. |
| `Adopto90` | int64 | Indicador 1/0 de adopción posterior dentro de 90 días; nulo si no aplica. |
| `Recompra90` | int64 | Indicador 1/0 de otra fecha de actividad dentro de 90 días; nulo si no aplica. |
| `VentanaCompleta180` | int64 | Indicador 1/0 de seguimiento completo durante 180 días. |
| `Adopto180` | int64 | Indicador 1/0 de adopción posterior dentro de 180 días; nulo si no aplica. |
| `Recompra180` | int64 | Indicador 1/0 de otra fecha de actividad dentro de 180 días; nulo si no aplica. |
| `TicketsFisicos30` | int64 | Tickets físicos distintos en los días 0–30 desde la primera compra física observada, dentro de la regla. |
| `CategoriasFisicas30` | int64 | Categorías distintas en esas compras físicas de los días 0–30. |
| `GrupoTicketsFisicos30` | text | Tramo 0, 1, 2–3 o 4+ tickets físicos iniciales. |
| `GrupoCategoriasFisicas30` | text | Tramo 0, 1, 2 o 3+ categorías físicas iniciales. |
| `CandidatoDia30` | int64 | Elegible a 90 días sin compra digital dentro de los primeros 30 días. |
| `Adopto31a90` | int64 | Para candidatos del día 30, primera compra digital posterior entre los días 31 y 90; nulo fuera de esa población. |
| `FechaReferenciaAntecedentes` | date | Día de primera adopción posterior o fecha de corte. |
| `AntiguedadReferenciaDias` | int64 | Días desde primera observación hasta la fecha de referencia. |
| `VisitasAntecedentes` | int64 | Fechas distintas previas a la referencia, según regla de adopción. |
| `TicketsAntecedentes` | int64 | Tickets distintos previos a la referencia. |
| `LineasAntecedentes` | int64 | Líneas previas a la referencia. |
| `CentavosAntecedentes` | int64 | Importe firmado en centavos previo a la referencia. |
| `UnidadesAntecedentes` | number | Unidades previas a la referencia. |
| `FechaUltimaAntecedente` | date | Última fecha de movimiento previo a la referencia. |
| `InactividadReferenciaDias` | int64 | Días entre referencia y última actividad anterior. |
| `CentavosPositivosPeriodo` | int64 | Suma de centavos positivos hasta el corte. |
| `CentavosNegativosPeriodo` | int64 | Suma de centavos negativos hasta el corte. |
| `TiendaPreferidaKey` | int64 | Clave sustituta de tienda preferida; cero indica ausencia de preferencia. |
| `EmpateTiendaPreferida` | int64 | Indicador 1/0 de empate técnico en preferencia de tienda. |
| `CategoriaPreferidaCodigo` | text | Categoría predominante en antecedentes bajo desempate documentado. |
| `EmpateCategoriaPreferida` | int64 | Indicador 1/0 de empate técnico en preferencia de categoría. |
| `CorteKey` | int64 | Clave de fecha de corte en formato AAAAMMDD. |
| `ReglaKey` | int64 | Clave de criterio analítico; elegir una sola regla en una vista. |
| `ImportePeriodo` | number | CentavosPeriodo / 100, con signo y moneda no acreditada. |
| `ImporteAntecedentes` | number | CentavosAntecedentes / 100. |
| `ImportePositivosPeriodo` | number | CentavosPositivosPeriodo / 100. |
| `ImporteNegativosPeriodo` | number | CentavosNegativosPeriodo / 100. |
| `ImportePorTicketPeriodo` | number | ImportePeriodo / TicketsPeriodo cuando hay tickets. |
| `GrupoRecencia` | text | Tramo descriptivo de recencia a corte. |
| `GrupoFrecuencia` | text | Tramo descriptivo de número de tickets. |
| `MunicipioComercialCve` | text | Domicilio disponible o municipio de tienda preferida como proxy identificado. |
| `OrigenGeografiaComercial` | text | Origen de MunicipioComercialCve: domicilio, proxy o sin dato. |
| `CategoriaPreferidaNombre` | text | Etiqueta de categoría preferida en antecedentes. |

Columnas calculadas en DAX para segmentar antecedentes:

| Campo | Tipo | Significado y regla |
| --- | --- | --- |
| `GrupoVisitasPrevias` | text | Fechas distintas: hasta 2, hasta 5, hasta 10 y más de 10. |
| `GrupoTicketsPrevios` | text | Tickets: hasta 2, hasta 5, hasta 10 y más de 10. |
| `GrupoUnidadesPrevias` | text | Unidades: hasta 5, hasta 10, hasta 20 y más de 20; las etiquetas son abreviadas y se conservan valores fraccionarios. |
| `GrupoInactividadPrevia` | text | Días: hasta 30, hasta 90, hasta 180 y más de 180. |
| `GrupoAntiguedadPrevia` | text | Días: hasta 90, hasta 180, hasta 365 y más de 365. |
| `OrdenGrupoVisitasPrevias` | int64 | Orden 1–4 de los tramos de visitas; 5 para Sin dato. |
| `OrdenGrupoTicketsPrevios` | int64 | Orden 1–4 de los tramos de tickets; 5 para Sin dato. |
| `OrdenGrupoUnidadesPrevias` | int64 | Orden 1–4 de los tramos de unidades; 5 para Sin dato. |
| `OrdenGrupoInactividadPrevia` | int64 | Orden 1–4 de los tramos de inactividad; 5 para Sin dato. |
| `OrdenGrupoAntiguedadPrevia` | int64 | Orden 1–4 de los tramos de antigüedad; 5 para Sin dato. |
| `SegmentoSenal30` | text | Concatenación de grupos de tickets y categorías físicas iniciales. |

Los cinco grupos de antecedentes muestran Sin dato cuando su variable base es nula. Se usan como descripciones retrospectivas; la ventana de cada cliente termina en su adopción observada o en el corte.

