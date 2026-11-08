# Validaciones y límites de interpretación

## Controles reproducibles

| Objeto | Control | Resultado de la ejecución local | Evidencia al reproducir |
| --- | --- | --- | --- |
| Reglas de frontera | Visitas frente a líneas, corte anterior, madurez, empate de canales, preferencias, centavos e ITER | 12 pruebas aprobadas con Python 3.14.6 | `src/pruebas_etl.ipynb`; ejecución de `notebooks/02_etl.ipynb` |
| Modelo dimensional | Claves, granularidad, cobertura, importes, ventana temprana y coherencia entre hechos/dimensiones | 108 validaciones aprobadas en una ejecución local | `evidencia/modelo_actual/auditoria/Validaciones.csv` local |
| Cuadernos y dependencias | Ejecución desde raíz y notebooks/ en ruta con espacios y acento | 01 y 02 ejecutados con IPython y magias %run de los seis cuadernos de src/; métricas de perfil y diagnósticos coincidentes y seis CSV idénticos por SHA-256 | Guía de reproducción y comprobaciones de los cuadernos |
| Exportación | Reapertura de los seis CSV, filas, columnas e importes en centavos | Los seis CSV se leen después de exportarlos; las tres dimensiones DAX no se exportan | Manifiesto del ETL y archivos locales |
| Enriquecimiento estatal | 32 nombres de entidades y cruce por clave | Cobertura del catálogo municipal de origen comprobada | `catalogos/estados_inegi.csv`, `catalogos/FUENTES.json` |
| Contexto censal municipal | Total municipal y proporción con denominador | 2,469 totales municipales del ITER 2020 integrados por clave; 2,469 cruces con el catálogo municipal de la muestra | `src/enriquecimiento.ipynb`, `catalogos/FUENTES.json` y manifiesto local |
| Power Query, DAX y reporte | Apertura, medidas visibles, filtros, mapa y exportación | El PBIP abrió con siete páginas; se exportó y revisó el PDF de siete páginas. La recarga en otro equipo requiere configurar `pArchivo` y conciliar sus resultados | PBIP y PDF en `reports/` |

El manifiesto del ETL permite comprobar integridad de sus salidas. El reporte se abrió y exportó en Power BI Desktop con el modelo local ya cargado. La reproducción en otra instalación exige actualizar las seis consultas y conciliar de nuevo las medidas antes de distribuir resultados.

## Límites que afectan los resultados

- La ventana termina el 31 de mayo de 2021. La primera compra registrada puede no ser la primera de la vida del cliente.
- La fecha carece de hora; empates físico–Internet el mismo día se tratan como origen ambiguo.
- La muestra no incluye exposición a campañas, sesiones web ni resultados de tratamientos. Las diferencias entre grupos no establecen causalidad.
- El maestro de cuentas contiene clientes sin movimientos; el denominador de adopción se restringe a clientes observados y elegibles.
- El código de operación observado no distingue importes negativos. Las reglas de positivos y servicios son sensibilidad analítica; el importe no se etiqueta como beneficio o margen.
- Edad y segmento de origen tienen cobertura y vigencia limitadas. El contexto municipal describe un territorio, no a una persona.
- Los códigos de origen se tratan como identificadores opacos; la clave sustituta permite relacionar las tablas del modelo.

La matriz ejecutada de controles del modelo se incluye en [pruebas y conciliaciones](pruebas-y-conciliaciones.csv). Las pruebas Python, la inspección de PBIP y la revisión visual del PDF acreditan objetos distintos; una exportación estática no sustituye las pruebas interactivas.
