# Arquitectura, grano y linaje

## De fuente a decisión

```text
Siete CSV de entrada
  ├─ claves, nulos, fechas, importes y cobertura → EDA y auditoría
  ├─ clientes + cuentas + municipio + segmento → DimCliente
  ├─ productos + categorías → DimProducto
  ├─ tiendas + municipio → DimTienda → DimTiendaPreferida en DAX
  └─ movimientos → FactMovimientos → snapshots por cliente/corte/regla
                                      └─ FactClienteCorte

FactMovimientos + FactClienteCorte + dimensiones
  → medidas de cartera, adopción, recurrencia y composición
  → preguntas de priorización comercial y calidad
```

El cuaderno `src/etl.ipynb` contiene las operaciones de transformación; `notebooks/02_etl.ipynb` las ejecuta y muestra sus controles. La fuente se lee desde el ZIP original del ejercicio sin alterarlo. Después de validar la construcción, los seis CSV de consumo se colocan directamente en `output/`; análisis, auditoría y trazabilidad quedan en `evidencia/` para revisión local. El ETL calcula las otras tres dimensiones en memoria para comprobar claves y cobertura, pero no las exporta como CSV.

## Modelo dimensional

| Tabla | Grano | Clave y papel | Origen en Power BI |
| --- | --- | --- | --- |
| FactMovimientos | Línea de venta observada | `LineaFuenteNro`; conserva importe firmado y unidades | CSV |
| FactClienteCorte | Cliente × corte × regla | `ClienteKey`, `CorteKey`, `ReglaKey`; cohortes y antecedentes | CSV |
| DimCliente | Cliente con movimientos | `ClienteKey`; domicilio y atributos con banderas de cobertura | CSV |
| DimFecha | Día del periodo observado | `FechaKey`; fecha de movimiento | DAX, calendario continuo |
| DimProducto | Producto presente en movimientos | `ProductoKey`; categoría y marca codificada | CSV |
| DimTienda | Tienda presente en movimientos | `TiendaKey`; canal y municipio de la transacción | CSV |
| DimTiendaPreferida | Tienda observada como preferida | `TiendaPreferidaKey`; papel independiente del movimiento | DAX, proyección de `DimTienda` |
| DimReglaAnalisis | Regla de lectura | `ReglaKey`; cuatro variantes mutuamente excluyentes en la vista | CSV |
| DimCorte | Fecha de observación del snapshot | `CorteKey`; papel distinto de fecha de movimiento | DAX, selección de `DimFecha` |

Las ocho relaciones analíticas del PBIP son de **uno a muchos** y filtro **simple desde dimensión a hecho**: DimFecha, DimCliente, DimProducto y DimTienda hacia FactMovimientos; DimCliente, DimTiendaPreferida, DimReglaAnalisis y DimCorte hacia FactClienteCorte. El PBIP conserva además ocho relaciones de calendario automático generadas por Desktop y sus tablas ocultas; son dependencias técnicas del archivo. No existe relación directa entre los hechos. Un filtro de `DimFecha` describe movimientos; un filtro de `DimCorte` describe snapshots. La elección de una regla impide sumar cuatro vistas de los mismos clientes.

## Reglas que protegen la interpretación

- Cuenta y cliente son unidades distintas. Los movimientos se unen al maestro por cuenta y después se consolidan por cliente.
- La primera actividad es la primera observada en la ventana. Cuando dos canales aparecen el mismo día o el canal es desconocido, el cliente no se asigna por conjetura al origen físico.
- Una visita es una **fecha distinta** de actividad por cliente. Ticket y línea tienen conteos propios.
- Las cohortes a 30, 90 y 180 días requieren seguimiento completo; la ausencia de ventana se representa como nulo, no como cero.
- La ventana temprana resume tickets y categorías físicas de los días 0–30. Su resultado posterior (`Adopto31a90`) se observa solo entre quienes seguían sin compra digital al día 30 y tienen seguimiento completo a 90 días. Así se separan señales previas y desenlace.
- La preferencia se calcula sobre antecedentes según fechas, importe y unidades, con desempate estable. El municipio de tienda preferida se etiqueta como ubicación comercial y no como domicilio.
- El importe se conserva firmado y en centavos enteros para las conciliaciones. La moneda y el significado de negativos permanecen sin semántica empresarial confirmada.
- El ITER 2020 oficial se une por clave de municipio. Sus campos son contexto municipal/año; no se suman por cliente ni movimiento ni se interpretan como atributos de personas.

El esquema físico de los seis CSV se conserva en `evidencia/modelo_actual/auditoria/EsquemaModelo.json`. El PBIP aplica esos tipos en Power Query; las tres dimensiones calculadas se verifican contra las claves y fechas de sus tablas fuente. `DimTiendaPreferida` proyecta las 217 tiendas de `DimTienda` y cubre todas las claves de preferencia observadas en el snapshot.
