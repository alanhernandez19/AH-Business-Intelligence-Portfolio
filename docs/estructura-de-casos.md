# Estructura estándar de los casos

Este esquema describe el **objetivo de los nuevos repositorios**, no un conjunto de archivos que ya exista o que sea obligatorio producir artificialmente.

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
- Documentar problemas, mejoras y resultados sin confundir el material histórico con la nueva solución.
- El README debe responder de inmediato: problema, datos, tecnología, KPI, hallazgos, validación, limitaciones y cómo ejecutarlo.
- Nunca subir credenciales, rutas personales, archivos privados, exámenes originales ni datasets sin revisar derechos y privacidad.

## Complemento diferenciador

Cada caso **podrá** incorporar una mejora concreta (automatización, simulación, SQL, RLS, drill-through, QA adicional, ML explicable u otra), solo cuando aporte valor demostrable y sea mantenible.

## Publicación incremental

Crear un repositorio individual únicamente cuando exista contenido nuevo, verificable y útil; no publicar 13 repositorios vacíos ni anunciar como finalizado un proyecto en preparación.
