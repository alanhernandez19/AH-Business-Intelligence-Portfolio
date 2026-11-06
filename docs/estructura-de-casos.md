# Estructura estándar de los casos

Esta estructura de referencia organiza los repositorios individuales de Business Intelligence. Cada caso adopta únicamente los componentes que aportan valor y facilitan su reproducción.

```text
nombre-del-caso/
├── README.md                    # Problema, alcance, KPI, hallazgos y ejecución
├── docs/
│   ├── contexto-y-referencias.md
│   ├── diccionario-datos.md
│   ├── diccionario-kpi.md
│   ├── decisiones-y-limitaciones.md
│   └── pruebas-y-conciliaciones.md
├── notebooks/
│   ├── 01_exploracion.ipynb
│   └── 02_etl.ipynb
├── src/                         # Scripts Python, si aportan valor
├── data/
│   └── README.md                # Origen, versión, licencia y acceso
├── powerbi/                     # PBIP/artefactos autorizados
├── reports/                     # PDF de dashboards y resumen ejecutivo
└── assets/                      # Capturas e infografías AH
```

## Reglas

- No todos los proyectos necesitan todos los archivos: **metodología uniforme, implementación proporcional**.
- Separar exploración y ETL cuando mejora claridad y reproducción; usar un solo script en casos pequeños si está justificado.
- Mantener fuentes, parámetros, rutas relativas y requerimientos de ejecución documentados.
- Los KPI se derivan de datos y reglas verificadas; registrar supuestos de cualquier simulación.
- Documentar decisiones técnicas, resultados y mejoras, manteniendo separados los datos de entrada y los artefactos procesados.
- El README debe responder de inmediato: problema, datos, tecnología, KPI, hallazgos, validación, limitaciones y cómo ejecutarlo.
- Evitar credenciales, rutas personales, datos confidenciales y recursos sin permisos de redistribución.

## Complemento diferenciador

Cada caso **podrá** incorporar una mejora concreta (automatización, simulación, SQL, RLS, drill-through, QA adicional, ML explicable u otra), solo cuando aporte valor demostrable y sea mantenible.

## Publicación incremental

Cada repositorio individual se incorpora al catálogo cuando contiene documentación, artefactos útiles y evidencias suficientes para comprender su alcance.
