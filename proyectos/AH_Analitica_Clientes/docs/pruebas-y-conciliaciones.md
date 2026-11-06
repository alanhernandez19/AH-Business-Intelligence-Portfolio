# Pruebas, conciliaciones y evidencia de cierre

## Matriz de referencia: base y segmentación
| Comprobación | Esperado | Fuente para comprobar |
|---|---:|---|
| Filas `FactClientes` / claves únicas | 10,000 | Notebook 02 y Excel |
| `churn = 1` | 2,037 | CSV, Notebook 01/02 y Power BI |
| Churn global | 20.37 % | DAX y Excel |
| H1 clientes / bajas | 2,521 / 924 | `HipotesisResumen` |
| H2 clientes / bajas | 326 / 280 | `HipotesisResumen` |
| H3 clientes / bajas | 2,563 / 485 | `HipotesisResumen` |
| Fuera clientes / bajas | 4,590 / 348 | `HipotesisResumen` |
| Saldo agregado | 764,858,892.88 | `FactClientes[balance]` |
| Saldo asociado a bajas | 185,588,094.63 | Filtro `churn=1` |
| Radar segmentos | 84 | `RadarSegmentos` |
| Radar pertenencias | 178,915 | `RadarCliente.csv` |
| Clientes únicos en radar | 10,000 | Distintos `customer_id` en puente |
| Tablas de salida Excel | 6 hojas | `Modelo_Analitica_Clientes.xlsx` |

## QA dimensional y analítico
- Chequeos de nulos, duplicados y valores distintos en la exploración.
- `CalidadCliente` por `customer_id`: antigüedad cero, score de bordes, salario menor de 100 y edad menos antigüedad menor que 18. Son banderas, no filas borradas.
- La clasificación H1/H2/H3/Fuera debe ser **exhaustiva y mutuamente excluyente**.
- Radar de reglas con mínimo de 100 clientes; puente sin pares duplicados y cada cliente presente al menos una vez.
- Simulaciones: se calculan a partir del catálogo y mantienen separación entre hipótesis, costos y beneficios alternativos.

## Validaciones del modelo y del radar
La conciliación contempla los indicadores principales y la consistencia de las reglas del radar con las pertenencias por cliente. El modelo dispone de 92 medidas DAX y ocho páginas, incluida la página 08 de calidad, oculta en navegación.

## Cómo verificar el modelo en Power BI Desktop
1. Ejecutar notebooks 01 y 02 en orden; verificar aserciones de las tablas exportadas.
2. Preparar rutas del PBIP en el equipo de prueba y actualizar datos.
3. Confirmar filtros, interacciones, segmentadores y el radar con conteos únicos.
4. Probar que el simulador responde a sus parámetros sin inventar rentabilidades observadas.
5. Comparar las siete páginas visibles con `reports/Caso_Analitica_Clientes.pdf`.
6. Contrastar los totales de Power BI con las tablas Excel y CSV generadas por el ETL.

La ejecución en Power BI Desktop permite comprobar filtros, navegación, relaciones e interacciones; el manifiesto SHA-256 permite comprobar la integridad de los archivos.
