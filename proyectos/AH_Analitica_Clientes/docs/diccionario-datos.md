# Diccionario de datos y granularidad

## 1. Origen: CSV de clientes
**Grano:** una fila por `customer_id`. **Registros:** 10,000. **Columnas originales:** 12.

| Campo | Tipo / interpretación | Uso analítico y cautela |
|---|---|---|
| `customer_id` | Identificador | Clave para unicidad y pertenencias del radar; no sumable |
| `credit_score` | Score numérico | Perfilado y extremos de calidad; no determina riesgo causal |
| `country` | País categórico | Comparativas geográficas y `DimPais` |
| `gender` | Género declarado | Comparativa descriptiva; no explica causalidad ni justifica trato desigual |
| `age` | Edad | Distribución y bandas analíticas |
| `tenure` | Antigüedad | Revisión de consistencia y perfiles |
| `balance` | Saldo numérico observado | Total, media, estado y cuartiles; no es ingreso ni pérdida |
| `products_number` | Número de productos | Vínculo comercial; define parte de H1/H2/H3 |
| `credit_card` | Indicador 0/1 | Perfil exploratorio, conservado como campo original |
| `active_member` | Indicador 0/1 | Diferencia actividad e inactividad |
| `estimated_salary` | Ingreso estimado | Perfilado, revisión de valores bajos; no ingreso bancario |
| `churn` | Indicador 0/1 | Variable de salida observada: 1 = abandono |

## 2. Campos derivados en `FactClientes`
El ETL conserva intactos los 12 campos anteriores y añade **10 campos**; 10,000 filas y 22 columnas.

| Campo | Regla / propósito |
|---|---|
| `saldo_estado` | `Cero` o `Positivo` según `balance` |
| `edad_banda` | 18–29, 30–39, 40–49, 50–59, 60–69 y 70+ |
| `saldo_banda` | `Cero` y cuatro cuartiles calculados sobre saldos positivos |
| `vinculacion_tipo` | Un producto frente a multiproducto |
| `perfil_actividad_saldo` | Cruce de actividad y estado de saldo |
| `perfil_actividad_productos` | Cruce de actividad y vinculación |
| `perfil_saldo_producto` | Cruce de estado de saldo y vinculación |
| `productos_alto_3o4` | Marca de tres o cuatro productos |
| `hipotesis` | Grupo exclusivo H1/H2/H3/Fuera con prioridad de condiciones |
| `simulable` | Marca derivada para distinguir perfiles contemplados en escenarios |

Los límites de los cuartiles proceden de la muestra actual; no deben interpretarse como bandas oficiales o universales.

## 3. Salidas del ETL

| Archivo / hoja | Grano y función |
|---|---|
| `Modelo_Analitica_Clientes.xlsx` → `FactClientes` | Una fila por cliente; 10,000 filas |
| `DimPais` | Un registro por país; descripciones y códigos |
| `RadarSegmentos` | Una fila por regla del radar; **84 segmentos** |
| `CalidadCliente` | Una fila por cliente; indicadores QA, 10,000 filas |
| `Escenarios` | Una fila por combinación de escenario e hipótesis; **6 filas** |
| `HipotesisResumen` | Una fila por H1/H2/H3/Fuera; **4 filas** |
| `RadarCliente.csv` | Relación `segmento_id`–`customer_id`; **178,915 pertenencias** |

## 4. Cardinalidades que no deben confundirse
- **Cliente**: 10,000 únicos, identificados por `customer_id`.
- **Hipótesis comerciales**: mutuamente excluyentes; su suma representa todo el universo.
- **Segmentos radar**: pueden cruzarse; sus 178,915 filas son pertenencias, no personas diferentes.
- **Escenarios**: hipótesis económicas ilustrativas, no transacciones de una campaña.

Las columnas de control (`tenure_cero`, `score_extremo_350_850`, `salario_menor_100`, `edad_menos_antiguedad_menor_18`) son **banderas para revisión**, no pruebas automáticas de registros inválidos.
