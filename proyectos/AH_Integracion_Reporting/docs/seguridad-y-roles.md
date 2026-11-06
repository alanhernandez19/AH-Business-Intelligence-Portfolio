# Seguridad por fila (RLS) y catálogo de permisos

## Propósito
El modelo incorpora una definición de RLS (`RLS_Usuarios`) para restringir datos según el usuario que consulta y las plataformas autorizadas. El catálogo incluido utiliza identidades ficticias para comprobar el comportamiento de los roles.

## Tablas relacionadas con seguridad
| Tabla | Campos principales | Función |
|---|---|---|
| `Usuarios` | `Usuario`, `Rol`, `Plataforma` | Catálogo de permisos; una persona puede tener varias filas de plataforma |
| `FactVisitas` | `Plataformas`, `IdVisita` | Datos de visitas filtrados por tokens exactos de plataforma |
| `VisitaPlataforma` | `IdVisita`, `Plataforma` | Asociaciones específicas y alcance por plataforma |

## Regla implementada en el PBIP
1. Obtiene la identidad mediante `LOWER(USERPRINCIPALNAME())`.
2. Busca las plataformas del usuario en `Usuarios`.
3. Si el catálogo contiene `TODAS`, autoriza el alcance completo.
4. En otro caso compara **tokens completos** de plataforma, separados por comas, evitando coincidencias por subcadenas.
5. Restringe tanto los registros de visitas como el catálogo y el puente.

El detalle DAX está en `powerbi/Caso_Integracion_Reporting.SemanticModel/definition/roles/RLS_Usuarios.tmdl`.

## Catálogo ficticio incluido
`Catalogos/usuarios.txt` contiene cinco identidades ficticias y seis asociaciones usuario–rol–plataforma. Se conservan los roles de administrador y desarrollador y las plataformas declaradas. Las identidades utilizan el dominio reservado `example.com`.

## Prueba de autorizaciones
1. Actualiza el PBIP con `Modelo_Integracion_Reporting.xlsx` y `Interacciones_Plataforma.xlsx` recién generados.
2. En Power BI Desktop revisa **Administrar roles** / **Ver como** según la versión instalada.
3. Prueba una identidad ficticia administradora, una de plataforma única y una que tenga dos plataformas.
4. Confirma que el administrador accede al universo, el restringido solo a sus plataformas y un usuario desconocido no recibe permisos previstos.
5. Comprueba que tarjetas y visuales de plataformas concilian bajo el filtro de seguridad.

La matriz de pruebas comprende **6 identidades RLS**. Para verificar cada escenario se utiliza **Ver como** en Power BI Desktop. El control de acceso en Power BI Service requiere configurar usuarios, grupos y permisos de publicación en el entorno correspondiente.
