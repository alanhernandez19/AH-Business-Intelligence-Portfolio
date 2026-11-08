# Diccionario de indicadores

Las medidas de adopción se evalúan en `FactClienteCorte` bajo una regla y un corte, o por cada regla cuando esta es el eje del visual. Los nulos de ventanas incompletas permanecen fuera del denominador. `FactMovimientos` conserva el detalle transaccional sin `ReglaKey`; una comparación de sus importes con una variante del snapshot exige aplicar por separado los filtros de esa regla.

| Indicador | Definición y fórmula | Grano y filtros | Interpretación y límite |
| --- | --- | --- | --- |
| Clientes observados | `DISTINCTCOUNT(ClienteKey)` en el snapshot | Cliente–corte–regla; una regla/corte | Tamaño de cartera con movimientos, no todo el maestro |
| Origen físico elegible | Suma de `EsElegibleFisico` | Cliente–corte–regla | Primera actividad observada solo física y sin canal ambiguo |
| Elegibles a H días | Conteo no nulo de `AdoptoH` | Cliente–corte–regla; H = 30, 90 o 180 | Clientes de origen físico con H días completos |
| Adoptantes a H días | Suma de `AdoptoH` | Mismo filtro y población del denominador | Compra por Internet en fecha posterior y dentro de H días |
| Tasa de adopción a H días | Adoptantes H / elegibles H | Denominador positivo | Secuencia observada, no conversión de visitas web |
| Días hasta adopción | Mediana no nula de `DiasHastaDigital` | Cliente–corte–regla; adoptantes posteriores observados | Tiempo entre primera física observada e Internet posterior, sin limitarlo al horizonte de 90 días |
| Recurrencia a 90 días | Promedio de `Recompra90` no nulo | Clientes con 90 días completos; todas las clases de origen | Otra fecha de actividad dentro de 90 días; no es baja contractual |
| Visitas antecedentes | Fechas distintas antes del día de adopción o hasta el corte para no adoptantes | Cliente–corte–regla | Actividad previa; no equivale a líneas ni tickets |
| Tickets del periodo | Tickets distintos en hechos bajo regla/corte | Ticket, con filtros de fecha/tienda/producto pertinentes | Volumen de tickets; no sumar clientes por categorías superpuestas |
| Importe firmado | Suma de `MontoCentavos` / 100 bajo regla/corte | Línea de movimiento; centavos enteros | Importe registrado con signo, sin moneda acreditada |
| Importe por ticket | Importe firmado / tickets distintos bajo iguales filtros | Ticket y ventana | Descripción de registros, no margen |
| Concentración positiva | Suma de importes positivos del 10 % superior de clientes / total positivo | Cliente–corte–regla; rango descendente y techo del 10 % | Concentración comercial, no beneficio; cálculo de referencia en Python |
| Cobertura de domicilio | Clientes con municipio válido / clientes observados | Cliente, con filtro de población coherente | Fiabilidad del análisis territorial |

## Medidas del PBIP

Las medidas numeradas que alimentan las siete páginas comienzan con:

| Medida | Cálculo | Ámbito |
| --- | --- | --- |
| `1. Clientes observados` | Clientes distintos en `FactClienteCorte` | Snapshot |
| `2. Elegibles 90` | Conteo no nulo de `Adopto90` | Regla/corte o regla en eje |
| `3. Adoptantes 90` | Suma de `Adopto90` | Mismo universo que la medida 2 |
| `4. Tasa adopción 90` | Medida 3 / medida 2 | Porcentaje |
| `5. Recurrencia 90` | Promedio no nulo de `Recompra90` | Clientes con ventana completa |
| `6. Días hasta digital` | Mediana de `DiasHastaDigital` | Adopción posterior observada |
| `7. Clientes con domicilio válido` | Clientes distintos con `DomicilioMunicipioValido = 1` | Snapshot y dimensión cliente |
| `8. Cobertura domicilio` | Medida 7 / medida 1 | Porcentaje de clientes observados |
| `9. Clientes con edad` | Suma de `EdadDisponible` | Dimensión cliente |
| `10. Cobertura edad` | Medida 9 / filas de `DimCliente` | Porcentaje de clientes de la dimensión |
| `11. Productos catalogados` | Suma de `ProductoEnCatalogo` | Inventario completo de productos |
| `12. Tiendas catalogadas` | Suma de `TiendaEnCatalogo` | Inventario completo de tiendas |

Las medidas 13–31 cubren universo, horizontes completos, señales de los días 0–30 y trayectoria previa. Las medidas 32–39 describen tickets, importes y cobertura de catálogos sin inferir rentabilidad. Las medidas 40–44 son supuestos editables del escenario, y las 45–46 presentan cada regla por separado. La medida 47 omite tasas a 30 días con base menor que 200. Las medidas 48–51 muestran `n<200` en tablas cuando corresponde; los gráficos conservan medidas numéricas y omiten tasas de base pequeña. Las fórmulas exactas se encuentran en `powerbi/Caso_Adopcion_Digital.SemanticModel/definition/tables/Medidas.tmdl`.

Las tarjetas 11 y 12 describen los catálogos cargados; los filtros del snapshot no alteran esos inventarios. Las páginas principales fijan `Base observada`; la página Valor compara las cuatro reglas con sus denominadores propios.

## Cuatro reglas de lectura

1. **Base observada:** movimientos de operación tipo 1, con signo y todas las categorías.
2. **Solo positivos:** misma operación, únicamente importes mayores que cero.
3. **Sin servicios:** misma operación, categoría conocida distinta de servicios.
4. **Positivos sin servicios:** intersección de las reglas 2 y 3.

Son comparaciones de sensibilidad. Cambiar de regla puede modificar el primer evento observado y, con ello, la elegibilidad. Los totales y tasas deben mostrar la regla elegida y su denominador. Una tasa territorial o de cohorte se interpreta junto con el tamaño de su base y la cobertura de domicilio.

## Inventario completo de medidas

Las fórmulas siguientes son las expresiones del PBIP. Los porcentajes usan razón 0–1 y formato porcentual; las medidas visibles 48–51 son texto para comunicar el umbral de base.

| Medida | Expresión DAX |
| --- | --- |
| `1. Clientes observados` | `DISTINCTCOUNT ( FactClienteCorte[ClienteKey] )` |
| `2. Elegibles 90` | `COUNT ( FactClienteCorte[Adopto90] )` |
| `3. Adoptantes 90` | `SUM ( FactClienteCorte[Adopto90] )` |
| `4. Tasa adopción 90` | `DIVIDE ( [3. Adoptantes 90], [2. Elegibles 90] )` |
| `5. Recurrencia 90` | `AVERAGE ( FactClienteCorte[Recompra90] )` |
| `6. Días hasta digital` | `MEDIAN ( FactClienteCorte[DiasHastaDigital] )` |
| `7. Clientes con domicilio válido` | `CALCULATE ( DISTINCTCOUNT ( FactClienteCorte[ClienteKey] ), DimCliente[DomicilioMunicipioValido] = 1 )` |
| `8. Cobertura domicilio` | `DIVIDE ( [7. Clientes con domicilio válido], [1. Clientes observados] )` |
| `9. Clientes con edad` | `SUM ( DimCliente[EdadDisponible] )` |
| `10. Cobertura edad` | `DIVIDE ( [9. Clientes con edad], COUNTROWS ( DimCliente ) )` |
| `11. Productos catalogados` | `SUM ( DimProducto[ProductoEnCatalogo] )` |
| `12. Tiendas catalogadas` | `SUM ( DimTienda[TiendaEnCatalogo] )` |
| `13. Base clientes` | `CALCULATE ( DISTINCTCOUNT ( FactClienteCorte[ClienteKey] ), FactClienteCorte[ReglaKey] = 1 )` |
| `14. Base elegibles 30` | `CALCULATE ( COUNT ( FactClienteCorte[Adopto30] ), FactClienteCorte[ReglaKey] = 1 )` |
| `15. Base adoptantes 30` | `CALCULATE ( SUM ( FactClienteCorte[Adopto30] ), FactClienteCorte[ReglaKey] = 1 )` |
| `16. Base tasa 30` | `DIVIDE ( [15. Base adoptantes 30], [14. Base elegibles 30] )` |
| `17. Base elegibles 90` | `CALCULATE ( COUNT ( FactClienteCorte[Adopto90] ), FactClienteCorte[ReglaKey] = 1 )` |
| `18. Base adoptantes 90` | `CALCULATE ( SUM ( FactClienteCorte[Adopto90] ), FactClienteCorte[ReglaKey] = 1 )` |
| `19. Base tasa 90` | `DIVIDE ( [18. Base adoptantes 90], [17. Base elegibles 90] )` |
| `20. Base elegibles 180` | `CALCULATE ( COUNT ( FactClienteCorte[Adopto180] ), FactClienteCorte[ReglaKey] = 1 )` |
| `21. Base adoptantes 180` | `CALCULATE ( SUM ( FactClienteCorte[Adopto180] ), FactClienteCorte[ReglaKey] = 1 )` |
| `22. Base tasa 180` | `DIVIDE ( [21. Base adoptantes 180], [20. Base elegibles 180] )` |
| `23. Candidatos día 30` | `CALCULATE ( SUM ( FactClienteCorte[CandidatoDia30] ), FactClienteCorte[ReglaKey] = 1 )` |
| `24. Adoptantes días 31 a 90` | `CALCULATE ( SUM ( FactClienteCorte[Adopto31a90] ), FactClienteCorte[ReglaKey] = 1 )` |
| `25. Tasa días 31 a 90` | `DIVIDE ( [24. Adoptantes días 31 a 90], [23. Candidatos día 30] )` |
| `26. Tasa 90 base amplia` | `IF ( [17. Base elegibles 90] >= 200, [19. Base tasa 90] )` |
| `27. Tasa 180 base amplia` | `IF ( [20. Base elegibles 180] >= 200, [22. Base tasa 180] )` |
| `28. Tasa posterior base amplia` | `IF ( [23. Candidatos día 30] >= 200, [25. Tasa días 31 a 90] )` |
| `29. Mediana visitas previas` | `CALCULATE ( MEDIAN ( FactClienteCorte[VisitasAntecedentes] ), FactClienteCorte[ReglaKey] = 1 )` |
| `30. Mediana tickets previos` | `CALCULATE ( MEDIAN ( FactClienteCorte[TicketsAntecedentes] ), FactClienteCorte[ReglaKey] = 1 )` |
| `31. Mediana inactividad previa` | `CALCULATE ( MEDIAN ( FactClienteCorte[InactividadReferenciaDias] ), FactClienteCorte[ReglaKey] = 1 )` |
| `32. Tickets fuente` | `DISTINCTCOUNT ( FactMovimientos[TicketKey] )` |
| `33. Tickets Internet` | `CALCULATE ( [32. Tickets fuente], DimTienda[Canal] = "Internet" )` |
| `34. Participación tickets Internet` | `DIVIDE ( [33. Tickets Internet], [32. Tickets fuente] )` |
| `35. Importe firmado fuente` | `SUM ( FactMovimientos[ImporteFirmado] )` |
| `36. Importe positivo fuente` | `CALCULATE ( [35. Importe firmado fuente], FactMovimientos[ImporteFirmado] > 0 )` |
| `37. Importe negativo fuente` | `CALCULATE ( [35. Importe firmado fuente], FactMovimientos[ImporteFirmado] < 0 )` |
| `38. Cobertura tiendas` | `DIVIDE ( SUM ( DimTienda[TiendaEnCatalogo] ), COUNTROWS ( DimTienda ) )` |
| `39. Cobertura productos` | `DIVIDE ( SUM ( DimProducto[ProductoEnCatalogo] ), COUNTROWS ( DimProducto ) )` |
| `40. Alcance supuesto` | `SELECTEDVALUE ( ParamAlcance[Alcance], 0.25 )` |
| `41. Mejora supuesta` | `SELECTEDVALUE ( ParamMejora[Mejora], 0.02 )` |
| `42. Tickets por nuevo adoptante` | `SELECTEDVALUE ( ParamTickets[Tickets], 2 )` |
| `43. Nuevos adoptantes ilustrativos` | `ROUND ( [23. Candidatos día 30] * [40. Alcance supuesto] * [41. Mejora supuesta], 0 )` |
| `44. Tickets ilustrativos` | `[43. Nuevos adoptantes ilustrativos] * [42. Tickets por nuevo adoptante]` |
| `45. Elegibles por regla` | `IF ( HASONEVALUE ( DimReglaAnalisis[ReglaKey] ), [2. Elegibles 90] )` |
| `46. Tasa por regla` | `IF ( HASONEVALUE ( DimReglaAnalisis[ReglaKey] ), [4. Tasa adopción 90] )` |
| `47. Tasa 30 base amplia` | `IF ( [14. Base elegibles 30] >= 200, [16. Base tasa 30] )` |
| `48. Tasa 30 visible` | `IF ( [14. Base elegibles 30] >= 200, FORMAT ( [16. Base tasa 30], "0.00%" ), "n<200" )` |
| `49. Tasa 90 visible` | `IF ( [17. Base elegibles 90] >= 200, FORMAT ( [19. Base tasa 90], "0.00%" ), "n<200" )` |
| `50. Tasa 180 visible` | `IF ( [20. Base elegibles 180] >= 200, FORMAT ( [22. Base tasa 180], "0.00%" ), "n<200" )` |
| `51. Tasa posterior visible` | `IF ( [23. Candidatos día 30] >= 200, FORMAT ( [25. Tasa días 31 a 90], "0.00%" ), "n<200" )` |
