# Guía de reproducción y revisión manual

## Requisitos
Python con `pip` y Jupyter; Power BI Desktop para abrir un `.pbip`; los paquetes listados en `requirements.txt`. El proyecto puede ejecutarse desde la carpeta raíz o `notebooks/` si se conserva la estructura incluida.

## Recorrido recomendado

**A. Preparación**
1. Extrae completamente `AH_Analitica_Clientes`, conservando `input/`, `catalogos/`, `output/`, `notebooks/` y `powerbi/`.
2. Inicia Jupyter en la raíz del proyecto o en `notebooks/`. Comprueba en una celda `from pathlib import Path; print(Path.cwd())`: la carpeta de trabajo debe ser una de esas dos. La navegación por la interfaz no siempre cambia el directorio del kernel.
3. Instala las dependencias de `requirements.txt` si todavía no están disponibles en tu entorno.

**B. Notebook 01 — investigación**
1. Ejecuta `notebooks/01_Investigacion_y_Decisiones.ipynb` en orden.
2. Revisa comprobaciones de 12 campos, 10,000 registros, claves únicas y 2,037 bajas.
3. Observa las comparativas por país, actividad, número de productos, edad, saldo y cruces.
4. Comprueba los cuatro grupos comerciales y los criterios del radar. Los resultados de celdas se generan al ejecutar, no son necesarios para la lógica posterior.

**C. Notebook 02 — ETL**
1. Ejecuta `notebooks/02_ETL_Parametrizado.ipynb` completo.
2. Debe producir `output/Modelo_Analitica_Clientes.xlsx` y `output/RadarCliente.csv`.
3. Verifica `FactClientes` 10,000 × 22, `RadarSegmentos` 84 registros, `RadarCliente` 178,915 pertenencias y seis hojas Excel.
4. No elimines `catalogos/SupuestosEscenarios.json`: alimenta los cálculos de escenarios.

**D. Power BI**
1. En Jupyter ejecuta `notebooks/03_Configurar_Rutas_PowerBI.ipynb`. Si Jupyter se inició fuera de la raíz o `notebooks/`, indica la carpeta principal del proyecto cuando se solicite.
2. Abre `powerbi/Caso_Analitica_Clientes.pbip` y selecciona **Actualizar**.
3. Comprueba la portada, filtros, navegación, H1/H2/H3, radar de segmentos, simulador y escenario económico.
4. Las siete páginas visibles deben corresponder al PDF de `reports/`. La página 08 existe como QA y está oculta deliberadamente.

## Controles mínimos tras cualquier cambio de rutas
| Prueba | Resultado esperado |
|---|---|
| Clientes únicos | 10,000 |
| Bajas | 2,037 |
| Churn global | 20.37 % |
| H1 / H2 / H3 / Fuera | 2,521 / 326 / 2,563 / 4,590 clientes |
| Radar reglas | 84 |
| Radar pertenencias | 178,915; no duplicar al seleccionar varios grupos |
| Suma de saldos | 764,858,892.88 (unidad monetaria no especificada) |
| Archivos de salida | Excel de 6 hojas y CSV del radar |

## Incidencias frecuentes
- **Archivo no encontrado:** ejecutar notebooks desde la raíz o carpeta `notebooks/`, no desde una carpeta ajena; conservar mayúsculas y nombres de los insumos.
- **PBIP apunta a otra ubicación:** ejecuta nuevamente `03_Configurar_Rutas_PowerBI.ipynb` antes de abrir el `.pbip`.
- **Radar suma más de 10,000:** se están sumando pertenencias; revisar medida de clientes únicos, no contar filas del puente.
- **Escenario cambia con los parámetros:** comportamiento esperado; no modificar el modelo ni interpretar resultados como efectos observados.
- **Problema de versión Power BI:** revisar soporte de PBIP/TMDL de la instalación antes de cambiar archivos de definición.

Revisa filtros, navegación e interacciones en Power BI Desktop. Consulta `pruebas-y-conciliaciones.md` para los resultados esperados y los controles correspondientes.
