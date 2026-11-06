# Contexto, problema y alcance

## Situación de negocio
Un área de inteligencia comercial necesita comprender dónde se concentra el abandono de clientes y qué perfiles ameritan investigación o acciones de retención. Una cifra agregada como 20.37 % es útil para dimensionar el problema, pero por sí sola no explica *a qué grupo* dirigir los recursos.

## Preguntas que resuelve el caso
1. ¿Cuántos clientes abandonaron y cuál es la tasa global?
2. ¿Cómo se distribuyen los abandonos por país, edad, actividad, productos y situación de saldo?
3. ¿Qué perfiles concentran bajas absolutas y cuáles muestran tasas elevadas con poca población?
4. ¿Cómo priorizar hipótesis no solapadas y explorar cruces adicionales sin duplicar clientes?
5. ¿Qué pasaría bajo diferentes supuestos de cobertura, mejora, costo y presupuesto?
6. ¿Qué controles permiten confiar en los resultados?

## Población y límites
El insumo tiene **10,000 clientes únicos, 12 campos y 2,037 casos con `churn=1`**. La granularidad es una fila por cliente. No hay fechas de eventos, causa de abandono, resultados de campañas, costos comerciales observados ni moneda declarada en `balance`.

Por lo anterior, la solución es de **BI descriptivo y apoyo a decisiones**. No presenta un modelo de propensión como probabilidad individual ni afirma que actividad, edad o número de productos *causen* abandono. Las acciones propuestas son hipótesis para contrastar mediante pilotos.

## Alcance realizado
- Investigación exploratoria y perfilado de todas las columnas.
- Diseño selectivo de campos derivados y cruces interpretables.
- Reglas comerciales exclusivas H1/H2/H3/Fuera.
- Radar de 84 segmentos con pertenencias múltiples y conteos únicos.
- ETL reproducible con controles de calidad y seis hojas de consumo.
- Modelo semántico Power BI, 92 medidas, ocho páginas (siete visibles).
- Evaluación de escenarios hipotéticos y propuestas de acción.

## Evidencia consultable
Los notebooks son la evidencia de exploración, reglas y transformación; los Excel/CSV son las salidas conciliadas; el PBIP contiene la lógica de visualización y las medidas; los documentos de esta carpeta explican el fundamento de cada decisión.
