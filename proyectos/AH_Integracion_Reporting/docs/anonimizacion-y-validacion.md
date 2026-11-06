# Tratamiento de identificadores y consistencia de datos

## Campos preparados

| Fuente | Campo | Ejemplo | Criterio |
|---|---|---|---|
| `input/report_*.txt` | `email` | `correo0001@example.com` | Identificador estable entre archivos y visitas repetidas |
| `input/report_*.txt` | `IPs` | `192.0.2.25` | Dirección de ejemplo de rangos TEST-NET |
| `Catalogos/usuarios.txt` | `Usuario` | `usuario0001@example.com` | Identidad ficticia para ensayar perfiles RLS |
| `output/` | Identificadores derivados | `correo0001@example.com` | Propagación directa desde los datos de entrada mediante el ETL |

El dominio `example.com` está reservado para documentación. Las sustituciones son consistentes en los tres TXT, el catálogo y los archivos generados, de modo que un usuario con varias visitas conserva una sola identidad analítica.

## Controles de consistencia

| Control | Resultado esperado |
|---|---:|
| Visitas | **2,001** |
| Usuarios únicos | **1,997** |
| Aperturas | **470** |
| Clics | **52** |
| Pares visita–plataforma | **245** |
| Identidades de catálogo | **5** |
| Asignaciones usuario–plataforma | **6** |

La cantidad de filas, los eventos, las fechas, los roles y las plataformas se mantienen para reproducir el análisis y las reglas de acceso. Los indicadores consolidados se verifican mediante el notebook ETL y las conciliaciones de `pruebas-y-conciliaciones.md`.
