# Fuentes, acceso y atribución

## Datos y vigencia

| Fuente | Contenido y grano | Uso |
|---|---|---|
| Buenos Aires Data: recorridos 2024 y 2025 | Un registro de viaje, con extremos, fechas, duración y códigos de usuario y estación | Evolución, flujos, ritmos y recurrencia |
| Buenos Aires Data: usuarios 2024 y 2025 | Un alta de usuario, con fecha, edad y género reportados | Activación desde el registro real y segmentación de altas |
| Buenos Aires Data: estaciones de bicicletas | Identidad, nombre, número público y coordenadas del catálogo | Referencia de identidad y nombres |
| Buenos Aires Data: barrios | Polígonos oficiales de los 48 barrios y su comuna | Pertenencia territorial por coordenada observada |
| Buenos Aires Data: ciclovías | Segmentos de la instantánea descargada | Distancia a infraestructura ciclista de contexto |
| SBASE / Buenos Aires Data: estaciones de subte | Puntos y líneas de la instantánea descargada | Cercanía potencial a transporte público |
| Open-Meteo / ERA5 | 731 días de temperatura media, precipitación y viento | Contexto diario estimado de 2024–2025 |
| Gobierno de Argentina | Compilación de 40 fechas especiales generales de 2024–2025 | Separación entre feriado nacional y día no laborable |

`../catalogos/FUENTES.json` registra los diez archivos de entrada y catálogos, sus URLs, tamaño y SHA-256. Las fechas de modificación del servidor y de consulta se conservan cuando estaban disponibles.

Las instantáneas de infraestructura describen la versión descargada; no acreditan su vigencia durante todo el historial de viajes. Las posiciones históricas proceden de los registros de viaje. Las coordenadas `0,0` permanecen identificadas y quedan fuera del cálculo de distancias. La fecha de referencia de la edad reportada no está acreditada.

## Acceso y reproducción

1. Conservar los dos ZIP anuales incluidos en `input/`, sin extraer ni editar y con sus nombres registrados. La entrega ZIP contiene ambos originales. Al trabajar desde Git, descargarlos mediante las URLs del manifiesto: por tamaño, se excluyen únicamente del control de versiones.
2. Conservar los ocho archivos complementarios en `catalogos/`. El calendario compilado cita la fuente oficial por fecha.
3. Iniciar Jupyter desde la raíz del caso o desde `notebooks/`, con las dependencias de `requirements.txt`.
4. Ejecutar `notebooks/01_exploracion.ipynb` para revisar las poblaciones e hipótesis y `notebooks/02_etl.ipynb` para reconstruir las siete salidas físicas de `output/`.

La lectura común está en `src/01_Fuentes.ipynb`. Ambos procesos verifican las huellas antes de trabajar. El ETL conserva los originales y sustituye el conjunto completo de salidas después de comprobarlo. Los CSV grandes utilizan GZip determinista; las fechas son ISO y los vacíos se interpretan como nulos, según el diccionario.

## Atribución y condiciones de las fuentes

Los conjuntos de [viajes y usuarios](https://data.buenosaires.gob.ar/ru/dataset/bicicletas-publicas), [estaciones de bicicletas](https://data.buenosaires.gob.ar/sr_Latn/dataset/estaciones-bicicletas-publicas), [barrios](https://data.buenosaires.gob.ar/es_AR/dataset/barrios), [ciclovías](https://data.buenosaires.gob.ar/dataset/ciclovias) y [subte](https://data.buenosaires.gob.ar/es/dataset/subte-estaciones) se atribuyen al Gobierno de la Ciudad Autónoma de Buenos Aires y los organismos responsables indicados en Buenos Aires Data, cuyo catálogo declara CC-BY-2.5-AR.

El contexto meteorológico utiliza [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) y el reanálisis ERA5 de ECMWF/Copernicus. [Open-Meteo declara datos bajo CC BY 4.0](https://open-meteo.com/en/licence). Las unidades y el punto de referencia devuelto por la consulta permanecen en los datos y su documentación.

El calendario se compiló a partir del [calendario oficial 2024](https://www.argentina.gob.ar/node/413320), el [calendario oficial 2025](https://www.argentina.gob.ar/node/453962) y la [comunicación del traslado del feriado de octubre de 2025](https://www.argentina.gob.ar/noticias/el-gobierno-habilito-el-traslado-del-feriado-para-un-nuevo-fin-de-semana-largo). Se distinguen días no laborables y feriados nacionales; los asuetos sectoriales quedan fuera de este calendario general.

El campo `Customer Has Dni (Yes / No)` de la fuente de altas 2025 es un indicador administrativo. Las salidas utilizan fecha de alta, edad y género para el perfil anual. Los enlaces de usuarios se realizan durante el proceso y las tablas de consumo usan una clave sustituta de usuario-año. Las claves y sus poblaciones están descritas en `../docs/Modelo_y_Datos.md`.

Los recursos de Buenos Aires Data se distribuyen bajo [CC BY 2.5 Argentina](https://creativecommons.org/licenses/by/2.5/ar/). Los CSV de consumo son una transformación AH de esas fuentes: homologación de claves, reglas de elegibilidad, agregaciones y enriquecimiento geográfico. El contexto de [Open-Meteo](https://open-meteo.com/) se redistribuye bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), con nombres de columnas normalizados y enlace al calendario. El calendario contiene fechas compiladas de las publicaciones oficiales citadas.
