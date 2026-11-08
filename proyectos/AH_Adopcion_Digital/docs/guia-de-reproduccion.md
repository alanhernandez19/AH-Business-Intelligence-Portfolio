# Reproducir el análisis y preparar Power BI

## Requisitos

El flujo se comprobó en Windows con Anaconda, **Python 3.14.6**, pandas **3.0.3**, NumPy **2.4.6** y Matplotlib **3.11.0**. El código requiere las bibliotecas de `requirements.txt` y Jupyter Notebook o JupyterLab. Si faltan dependencias, abra Anaconda Prompt en la raíz del proyecto y ejecute `python -m pip install -r requirements.txt`. Power BI Desktop se utiliza para validar consultas, relaciones, medidas y visuales.

Las dos entradas descritas en `data/README.md` están incluidas en `input/`. La copia de referencia del [ITER 2020 oficial](https://www.inegi.org.mx/contenidos/programas/ccpv/2020/datosabiertos/iter/iter_00_cpv2020_csv.zip) puede descargarse de INEGI; el código verifica el SHA-256 del ITER indicado en `catalogos/FUENTES.json` como referencia de la ejecución documentada.

## Jupyter

1. Extraiga o clone la carpeta `AH_Adopcion_Digital` conservando su estructura.
2. Abra Jupyter desde la **raíz del proyecto** o desde `notebooks/`. Compruebe en una celda `from pathlib import Path; print(Path.cwd())`. Si el directorio es otro, navegue a la raíz antes de ejecutar.
3. Ejecute la primera celda: el cuaderno busca primero `input/Tablas_Dimensiones_y_Ventas.zip`. Si no existe, solicita una ruta local; también puede configurar `AH_SOURCE_ZIP` antes de iniciar Jupyter. El ETL detecta `input/iter_00_cpv2020_csv.zip` o acepta `AH_ITER_ZIP`. Las rutas elegidas quedan en la sesión del kernel y no se guardan en el cuaderno.
4. Ejecute `notebooks/01_exploracion.ipynb` y después `notebooks/02_etl.ipynb`. El primero perfila las siete fuentes; el segundo ejecuta pruebas y construye el modelo.
5. Compruebe `evidencia/modelo_actual/auditoria/Validaciones.csv` y `EsquemaModelo.json`. Los únicos archivos de `output/` serán los seis CSV que importa Power BI.

Los cuadernos principales cargan sus dependencias de `src/` con `%run`, una instrucción de Jupyter. Cada cuaderno auxiliar contiene explicaciones y celdas por operación; cada transformación tiene una sola implementación.

| Cuaderno en src/ | Función | Lo utiliza |
| --- | --- | --- |
| `perfilado.ipynb` | Estructura, calidad, relaciones y cobertura de las fuentes | 01 · Exploración |
| `diagnosticos.ipynb` | Diagnósticos de fechas, importes, atributos y sensibilidad | 01 · Exploración |
| `enriquecimiento.ipynb` | Catálogos estatales e indicadores municipales ITER | ETL |
| `etl.ipynb` | Preparación por etapas, modelo y exportación validada | 02 · ETL |
| `pruebas_etl.ipynb` | Doce pruebas sintéticas de reglas de negocio | 02 · ETL |
| `graficos.ipynb` | Figuras de exploración y conciliación | 01 y 02 |

Para estudiar una operación, abra el cuaderno correspondiente en `src/` y ejecute sus celdas en orden. La ejecución completa y la visualización de resultados se realizan desde 01 y 02. Puede iniciar los cuadernos auxiliares desde la raíz, `src/` o `notebooks/`. El ETL recibe la ruta fuente mediante `AH_SOURCE_ZIP`, verifica su SHA-256 y reemplaza el conjunto completo validado sin añadir filas a la versión anterior. No ejecute dos cargas simultáneas sobre la misma salida.

## Preparar el modelo en Power BI Desktop

1. Con Power BI Desktop cerrado, ejecute `notebooks/03_Configurar_Rutas_PowerBI.ipynb`. El cuaderno cambia el parámetro `pArchivo` a la ruta local de `output/` sin barra final. Después abra `powerbi/Caso_Adopcion_Digital.pbip`.
2. Actualice las **seis** consultas CSV: `FactClienteCorte`, `FactMovimientos`, `DimCliente`, `DimProducto`, `DimTienda` y `DimReglaAnalisis`. Sus tipos están en `evidencia/modelo_actual/auditoria/EsquemaModelo.json`. `DimFecha`, `DimCorte` y `DimTiendaPreferida` se calculan en DAX dentro del PBIP.
3. Compruebe las ocho relaciones de `docs/arquitectura-y-modelo.md`, de dimensión a hecho en una sola dirección. Mantenga separados fecha de movimiento/corte y tienda de movimiento/tienda preferida.
4. Revise las medidas numeradas ya incluidas. Las páginas de adopción usan la regla base; la página **06 · Valor** compara las cuatro reglas, cada una con su denominador. Contraste tarjetas y gráficos con `evidencia/modelo_actual/analisis/SensibilidadReglas.csv` y las cohortes con `evidencia/modelo_actual/analisis/Cohortes90.csv`.
5. Compruebe filtros, nulos, cohortes sin ventana completa, importes negativos y navegación de las **siete páginas**: Pulso, Cohortes, Señales, Cliente, Territorio, Valor y Escenarios. Revise en particular que las tablas separen columnas numéricas y porcentajes, que sus totales se lean completos y que el mapa filtre la tabla de estados. Guarde el PBIP y, después de conciliar sus resultados, exporte el PDF a `reports/`.

La carga, las medidas, las relaciones y la navegación se comprueban en Power BI Desktop; los controles Python documentados aquí verifican la preparación de datos. **En la distribución**, el PBIP se distribuye con `C:\RUTA_DEL_PROYECTO_AH\output` como ruta genérica y el tercer cuaderno la adapta al equipo local. Los seis CSV y el PDF están incluidos para consultar resultados antes de ejecutar los cuadernos.
