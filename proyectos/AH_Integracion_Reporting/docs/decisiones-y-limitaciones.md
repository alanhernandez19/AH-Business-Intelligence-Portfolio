# Decisiones técnicas y razones de diseño

## 1. Lectura de tres fuentes con variaciones controladas
Los TXT son archivos delimitados por coma. La segunda cabecera difiere entre ellos (`jk`, `jyv`, `fgh`), así que se renombra **solo esa posición** a `CampoExtra`. Cambios en los demás encabezados se consideran error de contrato, no se reparan silenciosamente.

## 2. Una fila = una visita
La definición funcional exige preservar cada fila como una visita. **No se deduplican registros por email**, porque una misma persona puede visitar varias veces, ni se equiparan visitas con `Opens`. Es la decisión central para que los KPI concilien.

## 3. Fecha analítica auditable
Se utiliza primero `Fecha open`, después `Fecha envio` y finalmente día de procesamiento. Se conserva `OrigenFechaVisita` para medir cuánto depende el histórico de un fallback. Una fecha con texto no interpretable produce error y no debe convertirse silenciosamente a fecha de proceso.

## 4. Calidad sin pérdida no justificada de información
Valores vacíos, `-` y `unknown` se distinguen. Para navegadores/plataformas se agregan etiquetas analíticas sin borrar columnas originales. Los contadores deben ser números enteros no negativos. Los registros cronológicamente atípicos se documentan; no se eliminan por simple sospecha.

## 5. Incremental e idempotencia
`archivos_procesados.json` asocia el nombre del TXT a una firma SHA-256. Si reaparece el mismo archivo, se omite; si mantiene nombre pero cambia contenido, se detiene la carga. Los `IdVisita` anteriores persisten y los nuevos reciben IDs consecutivos. Estado y `CONSOLIDADO.csv` deben administrarse juntos.

Antes de persistir, el ETL prepara las salidas en carpeta temporal y usa una marca de control para advertir una interrupción. Este diseño evita publicar silenciosamente una carga parcial, aunque no sustituye transacciones de una base de datos empresarial.

## 6. Plataformas y seguridad
Una visita puede contener varios tokens de plataforma. La tabla `VisitaPlataforma` conserva **pares únicos** entre `IdVisita` y plataforma. El rol `RLS_Usuarios` evalúa `USERPRINCIPALNAME()` frente al catálogo `usuarios`; el administrador `TODAS` tiene cobertura general y los demás identidades solo plataformas autorizadas. La comprobación final del rol debe hacerse en Power BI Desktop con los usuarios ficticios.

## 7. Ejecución local y SFTP
`MODO = "L"` utiliza los TXT que se incluyen. `MODO = "R"` conserva la misma transformación, pero requiere host, cuenta, ruta y credenciales válidas. El modo remoto requiere una conexión SFTP configurada.

## 8. Limitaciones
- Muestra histórica, no resultados actuales. Las medidas con `TODAY()` pueden no mostrar visitas de este mes/año.
- La exactitud de tasas y temporalidad depende de lo registrado; faltan contextos comerciales y de campaña.
- La identidad analítica se conserva entre visitas del mismo usuario para permitir el análisis de recurrencia.

