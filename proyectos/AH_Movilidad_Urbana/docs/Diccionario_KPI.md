# Diccionario de KPI y medidas

## Poblaciones y contexto

Los indicadores de viajes utilizan registros únicos y sus banderas de calidad. Activación y recurrencia se calculan sobre usuario-año, con numerador y denominador de la misma ventana. Movimientos utiliza ubicación, fecha y hora del evento; corredores utiliza un par anual de ubicaciones. La fecha de primera actividad observada y el alta real son referencias distintas.

| Indicador | Fórmula y unidad | Base, filtros y ausencia de datos | Uso de decisión |
|---|---|---|---|
| Viajes elegibles · medida 2 | Suma de EsViajeElegible; viajes | Completos, duración positiva. Año, fecha de origen, usuario y roles geográficos; sin registros: 0. | Dimensionar uso y comparar períodos equivalentes. |
| Usuarios con actividad · 3 | Suma de TieneViajeElegible; usuarios-año | Año y perfil anual. Varios años representan usuarios-período. | Separar tamaño de población de frecuencia. |
| Viajes por usuario · 4 | ViajesElegibles del perfil / usuarios con actividad; viajes por usuario | Año y perfil con idéntico contexto; base cero: resultado vacío. | Investigar profundidad de uso. |
| Duración mediana · 5 | Mediana de DuracionAnaliticaSegundos / 60; minutos | Viajes con duración conciliada; omite nulos. | Comparar patrones de duración. |
| Variación interanual · 8 | (Viajes actuales − anteriores) / anteriores; % | Año anterior al seleccionado; sin referencia: etiqueta explícita. | Cuantificar evolución. |
| Descomposición · 30–31 | Δusuarios × frecuencia media; Δfrecuencia × usuarios medios; viajes | Mismo año y perfil en ambos componentes; su suma concilia con Δviajes. | Distinguir captación de vinculación. |
| Activación 30 · 12 | Activadas30 / ElegibleActivacion30; % | Alta real, cronología utilizable y 30 días completos; sin base: ausencia de tasa. | Comparar cohortes de alta y planificar pilotos. |
| Retorno · 15–19 | RetornoN / ElegibleRetornoN; % | Otro día posterior al primero; N = 30, 90 o 180. Año, cohorte observada y perfil; ventanas incompletas: nulas. | Comparar continuidad con seguimiento equivalente. |
| Embudo · 33–35 | Altas elegibles → activadas30 → recurrentes90; usuarios-año | Alta con 120 días de seguimiento completo para la suma de ventanas configurada. | Localizar pérdida de continuidad en una base común. |
| H1 · 81–82 | Activadas de base común / altas; recurrentes de base común / activadas; % | Mismos filtros y base del embudo; denominador cero: ausencia de tasa. | Formular pilotos posteriores al primer viaje. |
| Saldo · 22 | Llegadas − salidas; movimientos | Fecha y hora efectivas del evento, territorio y estación. | Identificar franjas direccionales. |
| Desequilibrio · 24 | ABS(saldo) / (llegadas + salidas); % | Contexto de movimientos; sin actividad: resultado vacío. | Comparar dirección relativa sin confundirla con inventario. |
| Persistencia · 42 | MAX(meses receptores, meses emisores) / meses activos; % | Signo del saldo mensual; meses de saldo cero permanecen en la base activa. | Identificar repetición de dirección. |
| Prioridad · 46 | (rango volumen × V + rango dirección × D + rango persistencia × P) / (V + D + P); índice 0–1 | Rangos densos sobre valores distintos de estaciones activas, normalizados de 0 a 1. Empates conservados; un solo valor: rango 0; suma de pesos cero: índice vacío. | Seleccionar estaciones para investigar. |
| Escenarios · 48–54 | Usuarios × incremento de viajes; altas elegibles × mejora de tasa; volúmenes supuestos | Frecuencia y activación se presentan por separado. La tasa de activación tiene tope del 100 %. | Dimensionar un supuesto de intervención. |
| Viajes por día · 57 | Promedio diario de viajes elegibles; viajes/día | Fechas del contexto, incluidas las de cero viajes. | Comparar ritmos y condiciones. |
| Viajes de conexión · 58 | MAX(Viajes) por RutaKey; viajes | Año de origen y roles origen/destino. Cada conexión tiene dos extremos con el mismo conteo. | Consultar volumen de un par sin duplicarlo. |
| Peso de mayores flujos · 83 | Suma del volumen de las 25 mayores RutaKey / viajes elegibles de la red; % | Mayor volumen, desempate por RutaKey ascendente. El mapa y la tabla aplican el mismo límite. | Dimensionar cobertura de las conexiones visibles. |
| Proximidad · 85–88 | Estaciones activas dentro del radio / estaciones activas; % | Radio 300/500/750 m; distancia mínima entre ubicaciones activas observadas y catálogo de infraestructura. | Comparar sensibilidad de conectividad territorial. |
| Persistencia mediana · 89 | Mediana de persistencia de estaciones activas; % | Cada estación cuenta una vez en el contexto. | Resumir la red sin usar el signo del saldo agregado. |
| Diferencias anuales · 62–63 | 100 × (tasa actual − anterior); puntos porcentuales | Referencias y poblaciones de cada tasa; etiquetas 90–91 distinguen base ausente de año anterior ausente. | Localizar cambios para investigar. |

Las medidas de formato y presentación devuelven etiquetas, colores o recursos. Las medidas de escenario utilizan supuestos editables. Las demás medidas numéricas se derivan de observaciones y reglas de elegibilidad; las hipótesis del dashboard son propuestas para contrastar, sin atribuir un efecto causal.

## Inventario del modelo

La definición ejecutable de las 91 medidas se encuentra en [Medidas.tmdl](../powerbi/Caso_Movilidad_Urbana.SemanticModel/definition/tables/Medidas.tmdl). Los nombres numerados coinciden con los usados por el informe.

| Medida | Carpeta | Formato |
|---|---|---|
| 1. Registros observados | Actividad | `#,0` |
| 2. Viajes elegibles | Actividad | `#,0` |
| 3. Usuarios con actividad | Actividad | `#,0` |
| 4. Viajes por usuario | Actividad | `0.00` |
| 5. Mediana minutos | Actividad | `0.0` |
| 6. Viajes elegibles porcentaje | Actividad | `0.0%` |
| 7. Viajes año anterior | Actividad | `#,0` |
| 8. Variación viajes | Actividad | `0.0%` |
| 9. Altas reales | Activación | `#,0` |
| 10. Altas elegibles 30 | Activación | `#,0` |
| 11. Activadas 30 | Activación | `#,0` |
| 12. Activación 30 | Activación | `0.0%` |
| 13. Elegibles retorno 30 | Recurrencia | `#,0` |
| 14. Retornaron 30 | Recurrencia | `#,0` |
| 15. Retorno 30 | Recurrencia | `0.0%` |
| 16. Retorno 90 | Recurrencia | `0.0%` |
| 17. Retorno 180 | Recurrencia | `0.0%` |
| 18. Elegibles horizonte | Recurrencia | `#,0` |
| 19. Retorno horizonte | Recurrencia | `0.0%` |
| 20. Salidas | Estaciones | `#,0` |
| 21. Llegadas | Estaciones | `#,0` |
| 22. Saldo | Estaciones | `#,0` |
| 23. Movimientos | Estaciones | `#,0` |
| 24. Desequilibrio | Estaciones | `0.0%` |
| 25. Estaciones activas | Estaciones | `#,0` |
| 26. Circulares | Flujos | `#,0` |
| 27. Circulares porcentaje | Flujos | `0.0%` |
| 28. Usuarios año anterior | Actividad | `#,0` |
| 29. Frecuencia año anterior | Actividad | `0.00` |
| 30. Efecto usuarios | Actividad | `#,0` |
| 31. Efecto frecuencia | Actividad | `#,0` |
| 32. Variación por factor | Actividad | `#,0` |
| 33. Embudo altas | Activación | `#,0` |
| 34. Embudo activadas | Activación | `#,0` |
| 35. Embudo recurrentes | Activación | `#,0` |
| 36. Embudo etapa | Activación | `#,0` |
| 37. Activación 7 | Activación | `0.0%` |
| 38. Activación 90 | Activación | `0.0%` |
| 39. Meses activos | Prioridades | `#,0` |
| 40. Meses receptores | Prioridades | `#,0` |
| 41. Meses emisores | Prioridades | `#,0` |
| 42. Persistencia | Prioridades | `0.0%` |
| 43. Rango volumen | Prioridades | `0.00` |
| 44. Rango dirección | Prioridades | `0.00` |
| 45. Rango persistencia | Prioridades | `0.00` |
| 46. Prioridad | Prioridades | `0.000` |
| 47. Incremento frecuencia | Escenarios | `0.00` |
| 48. Viajes adicionales supuesto | Escenarios | `#,0` |
| 49. Viajes escenario | Escenarios | `#,0` |
| 50. Mejora activación puntos | Escenarios | `0.0` |
| 51. Altas adicionales supuesto | Escenarios | `#,0` |
| 52. Activadas escenario | Escenarios | `#,0` |
| 53. Comparación frecuencia | Escenarios | `#,0` |
| 54. Comparación activación | Escenarios | `#,0` |
| 55. Precipitación | Contexto | `0.0` |
| 56. Temperatura | Contexto | `0.0` |
| 57. Viajes por día | Contexto | `#,0` |
| 58. Viajes corredor | Flujos | `#,0` |
| 59. Corredores mostrados | Flujos | `#,0` |
| 60. Activación año anterior | Hipótesis | `0.0%` |
| 61. Retorno año anterior | Hipótesis | `0.0%` |
| 62. Diferencia activación | Hipótesis | `+0.0 "pp";-0.0 "pp";0.0 "pp"` |
| 63. Diferencia retorno | Hipótesis | `+0.0 "pp";-0.0 "pp";0.0 "pp"` |
| 64. Color ritmo | Formato | `Texto / recurso` |
| 65. Color cohorte | Formato | `Texto / recurso` |
| 66. Alertas duración | Calidad | `#,0` |
| 67. Viajes sin duración conciliada | Calidad | `#,0` |
| 68. Participación movimiento | Estaciones | `0.0%` |
| 69. Peso total | Prioridades | `0` |
| 70. Color activación | Formato | `Texto / recurso` |
| 71. Usuarios un solo día | Recurrencia | `#,0` |
| 72. Un solo día porcentaje | Recurrencia | `0.0%` |
| 73. Variación etiqueta | Formato | `Texto / recurso` |
| 74. Activación etiqueta | Formato | `Texto / recurso` |
| 75. Retorno etiqueta | Formato | `Texto / recurso` |
| 76. Viajes miles | Formato | `0.0` |
| 77. Texto ritmo | Formato | `Texto / recurso` |
| 78. Texto cohorte | Formato | `Texto / recurso` |
| 79. Texto activación | Formato | `Texto / recurso` |
| 80. Base mapa corredores | Presentación | `Texto / recurso` |
| 81. Activación base común | Hipótesis | `0.0%` |
| 82. Continuidad tras activar | Hipótesis | `0.0%` |
| 83. Peso mayores flujos | Flujos | `0.0%` |
| 84. Radio proximidad | Contexto | `0` |
| 85. Estaciones cerca de subte | Contexto | `#,0` |
| 86. Estaciones cerca de ciclovía | Contexto | `#,0` |
| 87. Cercanía subte porcentaje | Contexto | `0.0%` |
| 88. Cercanía ciclovía porcentaje | Contexto | `0.0%` |
| 89. Persistencia mediana estación | Prioridades | `0.0%` |
| 90. Cambio activación etiqueta | Formato | `Texto / recurso` |
| 91. Cambio retorno etiqueta | Formato | `Texto / recurso` |
