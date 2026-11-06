# AH | Analítica de Clientes

**Business Intelligence end-to-end · Segmentación de abandono · Power BI + Python**  
**Autor:** Alan Arturo Hernández Gutiérrez

> **Pregunta de negocio:** ¿qué grupos de clientes presentan mayor abandono, cuánto contribuyen al volumen total de bajas y cómo priorizar acciones de retención sin confundir correlación con causalidad?

## 1. Resumen ejecutivo

Este caso integra una investigación exploratoria de **12 variables**, un ETL reproducible en Python, una clasificación comercial no solapada, un radar de segmentos superpuestos, un modelo Power BI con medidas DAX y un simulador de escenarios. La finalidad es convertir una muestra transversal de clientes en **evidencia para priorizar decisiones**, no construir una predicción causal ni afirmar ahorros reales.

| Indicador verificado | Resultado | Interpretación |
|---|---:|---|
| Clientes | **10,000** | Universo único por `customer_id` |
| Bajas (`churn=1`) | **2,037** | Clientes que abandonaron en el corte observado |
| Tasa de abandono | **20.37 %** | 2,037 / 10,000 |
| Saldo agregado | **764,858,892.88** | Suma del campo `balance`; **sin moneda declarada** |
| Saldo asociado a bajas | **185,588,094.63** | Saldo observado de clientes con abandono, **no una pérdida** |
| Radar analítico | **84 segmentos** | Reglas descriptivas con población mínima de 100 |
| Pertenencias radar | **178,915** | Relación cliente–segmento; hay solapamientos |

### Hallazgo que orienta la decisión

La tasa de abandono global oculta perfiles de comportamiento muy diferentes. Los grupos comerciales **H1, H2 y H3** se definieron a partir de actividad y cantidad de productos, con una jerarquía explícita para evitar dobles asignaciones. Sus diferencias justifican *prioridades de investigación y pilotos*, no políticas automáticas sobre clientes reales.

| Grupo | Definición | Clientes | Bajas | Churn |
|---|---|---:|---:|---:|
| **H1** | Inactivo y con un producto | 2,521 | 924 | **36.65 %** |
| **H2** | Tres o cuatro productos | 326 | 280 | **85.89 %** |
| **H3** | Activo y con un producto | 2,563 | 485 | **18.92 %** |
| **Fuera** | Perfiles restantes | 4,590 | 348 | **7.58 %** |

H1 concentra **924 de las 2,037 bajas (45.36 %)**: es relevante por volumen y por tasa. H2 es una alerta de incidencia extrema sobre un grupo reducido que debe investigarse antes de actuar. H3 permite estudiar prevención, pero su tasa observada está por debajo del promedio global. Consulta [hallazgos y decisiones](docs/hallazgos-y-acciones.md) para la interpretación completa.

## 2. Metodología aplicada y por qué

1. **Entender el problema:** priorizar análisis de abandono sin disponer de fechas, campañas ni resultados de tratamientos.
2. **Explorar todas las variables:** distribuciones, nulos, claves, valores extremos, tasas y tamaños de muestra; revisar país, edad, productos, actividad, tarjeta, score, antigüedad, saldo y salario.
3. **Seleccionar cruces útiles:** actividad × productos; saldo × productos; actividad × saldo. Descartar columnas derivadas que no mejoraban suficientemente el análisis.
4. **Preparar datos con Python:** conservar 12 columnas originales y crear 10 campos analíticos; generar tablas de calidad, hipótesis y radar.
5. **Modelar en Power BI:** separar hechos, dimensiones, pertenencias de radar, parámetros y medidas; evitar sumar registros del puente como clientes únicos.
6. **Validar:** conciliar conteos, segmentos y cálculos entre notebooks, Excel, CSV y medidas DAX; mantener una página técnica de QA.
7. **Recomendar:** diferenciar hechos observados, hipótesis comerciales y escenarios económicos construidos con supuestos.

[Proceso y arquitectura](docs/arquitectura-y-trazabilidad.md) · [Matriz variable → decisión](docs/matriz-variable-decision.md) · [Decisiones y límites](docs/decisiones-y-limitaciones.md)

## 3. Qué se entrega

```text
AH_Analitica_Clientes/
├── input/                       # CSV fuente (12 variables)
├── catalogos/                   # Países y supuestos editables de escenario
├── notebooks/
│   ├── 01_Investigacion_y_Decisiones.ipynb
│   ├── 02_ETL_Parametrizado.ipynb
│   └── 03_Configurar_Rutas_PowerBI.ipynb
├── output/                      # Excel (6 hojas) + puente CSV
├── powerbi/                     # Proyecto PBIP con identidad AH
├── reports/                     # PDF de 7 páginas visibles
├── docs/                        # Evidencia, diccionarios y decisiones
├── requirements.txt
└── MANIFIESTO_SHA256.txt
```

**Fuentes y transformaciones.** El ETL produce `Modelo_Analitica_Clientes.xlsx` (`FactClientes`, `DimPais`, `RadarSegmentos`, `CalidadCliente`, `Escenarios`, `HipotesisResumen`) y `RadarCliente.csv` como puente de pertenencias. Las seis hojas separan hechos, catálogo, radar, controles de calidad, escenarios y síntesis de hipótesis.

**Power BI.** Ocho páginas: resumen ejecutivo, factores, segmentación, radar, simulador, evaluación económica, plan de acción y calidad/validaciones. **Siete son visibles; la página 08 es técnica y permanece oculta deliberadamente.** El modelo incluye **92 medidas DAX** y **557 objetos visuales**. El [inventario de medidas](docs/inventario-medidas-powerbi.md) enlaza cada grupo con su archivo TMDL.

## 4. Por qué estas métricas

| Familia | Pregunta empresarial | Decisión que habilita |
|---|---|---|
| Clientes, bajas, churn | ¿Qué tamaño y frecuencia tiene el abandono? | Establecer magnitud y referencia |
| Participación de bajas | ¿Qué segmentos concentran el problema? | Priorizar por impacto en volumen |
| Índice de churn | ¿Qué grupos superan la tasa general? | Detectar incidencia relativa elevada |
| Saldos observados | ¿Dónde se concentran saldos de clientes? | Contextualizar exposición, sin monetizar pérdidas |
| H1/H2/H3 | ¿Qué grupos no solapados conviene investigar? | Proponer pilotos diferenciados |
| Radar / cobertura única | ¿Qué combinaciones muestran patrones relevantes? | Explorar reglas sin contar clientes dos veces |
| Simulador / presupuesto | ¿Qué sucedería **si** cambian cobertura, mejora y costos? | Analizar factibilidad hipotética, no retorno observado |
| QA | ¿Qué anomalías podrían afectar conclusiones? | Revisar datos antes de tomar decisiones |

[Diccionario de KPI y fórmulas](docs/diccionario-kpi.md) · [Diccionario de datos](docs/diccionario-datos.md)

## 5. Cómo reproducir en Windows

1. Descargar o extraer el proyecto completo conservando sus carpetas.
2. Iniciar Jupyter con el directorio de trabajo en la raíz del proyecto o en `notebooks/`. Compruébalo en una celda con `from pathlib import Path; print(Path.cwd())` antes de ejecutar 01 y 02.
3. Ejecutar **01 → 02** para reproducir el análisis y el ETL. Los archivos generados también están incluidos en `output/`.
4. Ejecutar `03_Configurar_Rutas_PowerBI.ipynb` para configurar los orígenes Excel y CSV. Detecta la carpeta del proyecto cuando Jupyter está iniciado desde su raíz o `notebooks/`; en otro caso solicita esa carpeta una sola vez.
5. Abrir `powerbi/Caso_Analitica_Clientes.pbip` con Power BI Desktop, actualizar el modelo y revisar indicadores, navegación y filtros. Comparar las siete páginas con `reports/Caso_Analitica_Clientes.pdf`.

[Guía de ejecución y diagnóstico](docs/guia-de-reproduccion.md) · [Pruebas y conciliaciones](docs/pruebas-y-conciliaciones.md)

## 6. Límites del caso

- Los datos representan un **corte transversal**: no existen fechas de abandono, campañas, tratamientos ni trayectoria temporal. Por tanto, no hay análisis de supervivencia, uplift causal ni impacto real de retención.
- `balance` es saldo observado: no se interpreta como ingresos, pérdidas realizadas, CLV o beneficios.
- Los costos, el margen, CAC y las mejoras del simulador son **supuestos**, no valores suministrados como transacciones reales. Las alternativas económicas no se suman entre sí.
- La pertenencia al radar es múltiple: **178,915 relaciones no equivalen a 178,915 clientes**.
- El PDF es evidencia estática; los filtros, interacciones y actualización del PBIP se revisan en Desktop.

Consulta la [ficha de datos](data/README.md) para conocer la granularidad, los campos de entrada y las condiciones de uso de la muestra.

---

**AH · Simplicidad a través de la elegancia.** La evidencia primero; las decisiones después.
