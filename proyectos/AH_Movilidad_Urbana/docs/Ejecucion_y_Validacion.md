# Ejecución y conciliaciones

## Entorno y entrada

Entorno verificado: Python 3.14.6, pandas 3.0.3, NumPy 2.4.6, Matplotlib 3.11.0 y pyproj 3.8.0. Las dependencias están en `requirements.txt`. Jupyter debe iniciarse desde la raíz del caso o desde `notebooks/`; desde otra ubicación se debe cambiar primero a una de esas carpetas. Las rutas se resuelven a partir de la presencia de los archivos de entrada.

La exploración y el ETL cargan las funciones comunes mediante `%run src/01_Fuentes.ipynb`, situando temporalmente el directorio de trabajo en la raíz del caso. Las fuentes se comparan con SHA-256 antes del proceso. Una diferencia detiene la carga y exige revisar la versión de datos.

## Conciliaciones ejecutadas

| Control | Resultado |
|---|---:|
| Registros brutos | 6,715,466 |
| Réplicas exactas retiradas, verificadas contra CSV completo | 1 |
| Viajes identificados únicos | 6,715,465 |
| Viajes completos y positivos | 6,677,846 |
| Salidas agregadas | 6,677,846 |
| Llegadas agregadas | 6,677,846 |
| Viajes atribuidos a perfiles de usuario-año | 6,677,846 |

Los siete archivos fueron leídos íntegramente después de escribirlos. Se verificaron conteos, claves de recorrido, referencias a ubicación y usuario, fechas, duración analítica y nulos de ventanas incompletas. La repetición de la serialización de todas las tablas produjo huellas idénticas.

La proyección EPSG:32721 se contrastó con geodesia WGS84 a puntos de subte: error relativo máximo 0.0207 %. El cálculo a segmentos conserva las unidades métricas y los puntos sin coordenadas permanecen sin distancia.

## Reejecución y manejo de excepciones

La carga reconstruye el conjunto completo desde las mismas fuentes. Conserva una ocurrencia de las réplicas idénticas; un ID con contenido contradictorio detiene la exportación. Los archivos ajenos al contrato de `output/` también detienen la sustitución, conservando el contenido existente.

Los CSV vacíos de resultado por ventana incompleta representan ausencia de observabilidad, no un cero. Las banderas de elegibilidad determinan el denominador de cada indicador. Las fechas y coordenadas ausentes se mantienen como tales.

El cuaderno ETL conserva las conciliaciones y huellas en sus salidas. `MANIFIESTO_SHA256.txt` verifica el conjunto distribuido; `catalogos/FUENTES.json` verifica además los originales anuales descargados.


## Verificación de la arquitectura de consumo

Las siete salidas conservan viajes individuales, movimientos por ubicación–fecha–hora, usuarios anuales, contexto diario y geografía. EsElegibleEmbudo y TipoClima son atributos estáticos preparados en el ETL.

PuntosCorredor contiene 190,300 conexiones y 380,600 extremos. Los pares representables suman 5,928,775 viajes; los 749,071 viajes circulares o sin geografía utilizable permanecen en el detalle. Ambas poblaciones concilian con los 6,677,846 viajes elegibles.

Las pruebas de crecimiento cubren años adicionales, más conexiones que el límite visible, conservación del detalle al dividir particiones y límites de elegibilidad con ventanas configurables. Cada comprobación utiliza entradas controladas separadas de las fuentes distribuidas.

El fondo y los trazos geográficos se preparan en el ETL y se comprueban como XML. Su longitud cabe en el modelo semántico. El componente recibe conexiones individuales e identidades del modelo; la medida de fondo usa MAX, con selección y navegación gestionadas por el visual.

El PBIP se comprueba mediante deserialización del modelo, referencias de campos, relaciones, recursos y límites del lienzo. La revisión funcional en Desktop incluye selección desde mapa y tabla, limpieza, zoom y desplazamiento, radio de proximidad y escenarios. El PDF contiene las nueve páginas del informe.

## Rendimiento medido

En un equipo con 7.78 GiB de memoria utilizable e Intel Core i5-10300H, la lectura de FactViajes consumió 361.5 s y PuntosCorredor 15.7 s. La memoria alcanzó 97 %, con un mínimo de 0.184 GiB disponible. Son mediciones de esta ejecución y equipo, no una garantía de duración para otros sistemas. No se midió paginación como para atribuirle un tiempo concreto.

El Analizador de rendimiento registró las nueve páginas: 55 consultas DAX, mediana de 63 ms y máximo de 5,415 ms en la dispersión diaria de contexto meteorológico. Los eventos se solapan; sus duraciones no deben sumarse para inferir el tiempo total. Se conserva toda la granularidad del detalle. El proceso actual es una reconstrucción completa, sin presentar una carga incremental como ya implementada.

Las métricas finales se conciliaron de forma independiente sobre las salidas: en 2025, 404 estaciones activas y 42,386 viajes en las 25 mayores conexiones. Con radio de 500 m, 139 estaciones activas tienen proximidad al subte y 367 a ciclovías. El embudo de base común contiene 122,636 altas, 84,564 activadas y 38,104 recurrentes. Se comprobaron radios monotónicos, rangos normalizados, empates y ausencia de resultado con pesos nulos.
