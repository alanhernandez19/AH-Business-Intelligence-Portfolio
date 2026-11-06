# Datos de entrada y referencia de la fuente

- **Referencia pública:** [Bank Customer Churn Dataset, Kaggle](https://www.kaggle.com/datasets/gauravtopre/bank-customer-churn-dataset).
- **Archivo de trabajo:** `input/Bank Customer Churn Prediction.csv`.
- **Contenido:** 10,000 observaciones y 12 variables de clientes; dataset de muestra para análisis de abandono.
- **Granularidad:** una fila por cliente, con `customer_id` como identificador.
- **Transformación:** el segundo notebook conserva las columnas originales y genera columnas derivadas, seis hojas Excel y puente de segmentos.
- **Trazabilidad:** las reglas están documentadas en `docs/diccionario-datos.md` y `docs/arquitectura-y-trazabilidad.md`.

El campo `balance` se analiza en las unidades originales de la fuente, que no especifica una moneda. Los escenarios económicos utilizan los supuestos documentados en `catalogos/`.
