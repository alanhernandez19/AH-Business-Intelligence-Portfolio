# Guía del dashboard

**Movilidad Urbana y Planificación Territorial · Alan Arturo Hernández Gutiérrez**

## Recorrido de decisión

| Página | Pregunta | Herramienta |
|---|---|---|
| 01 · Pulso | ¿Por qué cambia el volumen de viajes? | Descomposición entre usuarios y frecuencia, serie mensual y distribución de uso. |
| 02 · Activación | ¿Qué sucede después del alta real? | Embudo con base común de 120 días y matriz de cohortes de activación. |
| 03 · Recurrencia | ¿Qué cohortes regresan en otro día? | Ventanas de 30, 90 y 180 días; tasa y base elegible juntas. |
| 04 · Ritmos | ¿Cuándo se concentra la actividad? | Mapa de calor día–hora, perfil horario y dispersión lluvia–actividad; filtros de calendario y clima. |
| 05 · Territorio | ¿Dónde se registran los movimientos? | Polígonos oficiales de barrios, balance por estación y sensibilidad de proximidad a 300, 500 y 750 m. |
| 06 · Corredores | ¿Qué conexiones entre extremos concentran viajes? | Mapa de conexiones principales del contexto, detalle y filtros de origen y destino; todos los pares representables están disponibles. |
| 07 · Escenarios | ¿Qué volumen implican distintos supuestos? | Incremento de frecuencia y mejora de activación, con bases y límites explícitos. |
| 08 · Prioridades | ¿Qué estaciones conviene investigar primero? | Volumen, desequilibrio y persistencia; dispersión, ritmo horario y pesos modificables. |
| 09 · Hipótesis | ¿Qué pilotos podrían contrastar los patrones? | Preguntas, evidencia descriptiva, intervención y criterio de evaluación. |

## Apertura

1. Extraer el caso manteniendo sus carpetas.
2. Con Power BI Desktop cerrado, ejecutar [03_Configurar_Rutas_PowerBI.ipynb](../notebooks/03_Configurar_Rutas_PowerBI.ipynb).
3. Abrir [Caso_Movilidad_Urbana.pbip](../powerbi/Caso_Movilidad_Urbana.pbip) y actualizar el modelo.

El parámetro `pArchivo` señala `output/`. Las siete salidas forman seis tablas de origen. Las dimensiones de fecha, año, hora, usuario y roles de estación se generan con DAX. `PuntosCorredor.csv` contiene los extremos preparados en el ETL. Power Query no vuelve a agrupar ni cruzar la tabla completa de viajes.

## Poblaciones y filtros

- **Viajes:** registros únicos con extremos completos y duración positiva. Las banderas de calidad permiten distinguir el universo observado del elegible.
- **Perfil usuario-año:** actividad y frecuencia anuales. Los filtros de estación, hora o día no recalculan la cohorte ni la frecuencia de esta población.
- **Activación:** altas reales con cronología utilizable y ventana completa. La matriz utiliza las altas; el embudo mantiene una base de altas con al menos 120 días hasta el cierre.
- **Retorno:** otro día con viaje elegible después de la primera actividad observada dentro del año. La ausencia de una ventana completa conserva un resultado nulo y se excluye del denominador.
- **Movimientos:** salidas y llegadas se asignan a su fecha y hora efectivas. Un viaje que cruza el cierre anual puede dejar su llegada en el año siguiente.
- **Corredores:** todos los pares anuales de ubicaciones observadas, con coordenadas utilizables y estaciones distintas. El mapa y la tabla aplican un límite de conexiones después de los filtros de año, origen y destino. El reporte utiliza filtros Top N de 25 conexiones y la medida 83 con el mismo límite; el archivo conserva todos los pares. Para cambiar ese alcance de presentación deben mantenerse sincronizados el Top N del mapa, el de la tabla y la medida 83. Seleccionar un corredor afecta al mapa y al detalle de conexiones. El gráfico permite seleccionar directamente una línea y combinar conexiones con Ctrl + clic; Limpiar o Escape restablece su selección. Ajustar encuadra las conexiones y Ciudad muestra el territorio completo. Las tarjetas de la red mantienen el contexto de año, origen y destino.

Cada página conserva su selección de año. Los selectores ofrecen años con viajes de origen observados. El calendario mantiene las llegadas que cruzan el cierre anual; esas filas participan en las conciliaciones del detalle aunque el selector se limite al período de origen. Los controles de perfiles se muestran en las páginas que utilizan el usuario-año; los territoriales se aplican a movimientos o conexiones.

## Lectura de escenarios y prioridades

La descomposición usa el promedio de las frecuencias para valorar el cambio de usuarios y el promedio de usuarios para valorar el cambio de frecuencia. Los dos componentes suman la variación exacta de viajes.

El escenario de frecuencia conserva usuarios y añade los viajes seleccionados por usuario. El de activación añade puntos porcentuales a la tasa de las altas elegibles, con tope del 100 %. Sus efectos pueden solaparse: se presentan por separado y no se suman como una previsión.

La prioridad combina rangos densos de volumen, desequilibrio absoluto y persistencia del signo mensual. Cada rango se normaliza entre 0 y 1 sobre los valores distintos del contexto, conservando los empates. Las estaciones sin movimientos no reciben prioridad ni aparecen en la tabla de prioridades. Los pesos se normalizan por su suma. Con suma cero, el índice no se calcula. La prioridad sirve para elegir dónde investigar; el inventario, la capacidad y los costes no están observados.

## Geografía y presentación

Los barrios usan polígonos oficiales incluidos en el proyecto. Las posiciones 0.0 o sin coordenada utilizable quedan fuera del mapa. Las líneas de corredores unen extremos observados y no representan un trayecto GPS. El mapa de conexiones es un componente HTML/SVG y JavaScript empaquetado dentro del informe. La geometría procede del ETL; el componente gestiona únicamente presentación, navegación y selección mediante las identidades de Power BI. No realiza llamadas a mapas externos.

Las distancias de la tabla muestran el mínimo entre las variantes de ubicación observadas de cada estación y la infraestructura de referencia. Describen proximidad al subte y a ciclovías de la instantánea, sin atribuir esa infraestructura a una fecha histórica acreditada. El radio seleccionado se aplica a estaciones con movimientos en el contexto; los porcentajes utilizan esas estaciones activas como denominador.

El informe utiliza separador de miles con coma, punto decimal y porcentajes. El mapa de calor expresa miles de viajes para mantener las celdas legibles. Los CSV conservan punto decimal y fechas ISO, convertidos con cultura `en-US` al importar.

Las matrices de Activación y Recurrencia comparan los años disponibles. El selector de año conserva su efecto sobre las tarjetas y gráficos de la página; se excluye su interacción con estas dos matrices para mantener visible la comparación. Las bases elegibles se muestran junto a cada tasa.

### Portabilidad

El proyecto conserva sus datos, polígonos y componente de conexiones dentro de su propia carpeta. Antes de actualizar en otro equipo Windows, ejecute el cuaderno de configuración para ajustar únicamente `pArchivo`. El componente se incorpora al PBIP y su paquete se incluye en `assets/`; el código reproducible está en `src/mapa_corredores/`. No requiere cuenta de mapas, Python para dibujar, servidor local ni tipografías adicionales. Una política corporativa que bloquee visuales privados puede impedir su ejecución; no se modifica esa política.

El PDF distribuido contiene las nueve páginas y una vista estática del mapa. La selección y navegación del mapa se utilizan en el informe Power BI. El componente se distribuye como visual privado; su uso en organizaciones depende de las políticas de visuales habilitadas.

## Hipótesis y ausencia de base

H1 compara activación y continuidad dentro de la misma base del embudo: altas elegibles, activadas y recurrentes con seguimiento completo. H2 muestra las cinco estaciones de mayor actividad y permite contrastar dirección y persistencia. H3 compara condiciones de lluvia; no identifica un efecto causal. Las variaciones anuales muestran «Sin año anterior» cuando falta una referencia comparable y distinguen esa situación de una base no elegible. La persistencia de la tarjeta de Prioridades es la mediana de las estaciones activas.
