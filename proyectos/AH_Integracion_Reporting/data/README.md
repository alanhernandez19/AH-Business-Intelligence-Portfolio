# Datos de entrada y preparación

## Archivos de entrada

El proyecto utiliza tres archivos TXT de muestra procedentes de un ejercicio de integración de datos: `input/report_7.txt`, `report_8.txt` y `report_9.txt`, con **2,001 registros de visitas**. El catálogo `Catalogos/usuarios.txt` define las reglas de acceso por plataforma.

## Identificadores de ejemplo

Para trabajar con los archivos de muestra se utilizan identificadores consistentes:

- **Correos:** `correo0001@example.com`, `correo0002@example.com`, etc. Se conserva la misma identidad ficticia en todas las apariciones de cada usuario.
- **Catálogo de acceso:** `usuario0001@example.com`, etc., conservando roles y asociaciones de plataforma.
- **Direcciones IP:** valores de los rangos de documentación TEST-NET (`192.0.2.0/24`, `198.51.100.0/24` y `203.0.113.0/24`).

`example.com` es un dominio reservado para ejemplos. La preparación mantiene las **2,001 visitas, 1,997 usuarios únicos, cinco identidades del catálogo y seis asignaciones de permisos**.

## Flujo de información

`input/` + `Catalogos/` → exploración y ETL en Jupyter → `output/CONSOLIDADO.csv`, `output/archivos_procesados.json` y libros Excel → modelo Power BI.

Los archivos de `output/` se producen a partir de estas entradas con el notebook de transformación incluido. La estructura y el significado de cada campo se explican en los diccionarios de `docs/`.
