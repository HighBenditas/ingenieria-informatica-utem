# Ingeniería en Informática UTEM

Landing page académica estudiantil para orientar a futuros postulantes, especialmente estudiantes de enseñanza media. Presenta la carrera, comparación con carreras relacionadas, perfil de egreso, malla interactiva, campo laboral, respaldo institucional, admisión 2027, video, preguntas frecuentes y fuentes.

No es un sitio oficial de la Universidad Tecnológica Metropolitana. La información debe contrastarse con las fuentes institucionales y su proceso de admisión correspondiente.

## Sitio publicado

- https://paginawebutem.netlify.app

## Integrantes

- Integrante 1: Benjamin Marti Morales (bmarti@utem.cl)
- Integrante 2: Kevin Flores Peña (kfloresp@utem.cl)

## Guía rápida para la Escuela

**¿Dónde veo la página?** En https://paginawebutem.netlify.app

**¿Cómo cambio un dato (por ejemplo, una pregunta frecuente)?**

1. Abra la carpeta `src/content/` del proyecto.
2. Abra el archivo que corresponde y edite el texto (por ejemplo, `faq.json` para las preguntas frecuentes). La tabla de la sección "Actualizar contenidos" indica qué archivo corresponde a cada tema.
3. En la terminal escriba `npm run verify`. Si no muestra errores, el dato es válido.
4. Suba el cambio al repositorio. La página se actualiza sola en pocos minutos.

**¿Qué pasa si me equivoco?** El comando del paso 3 avisa del error y no permite publicar un dato inválido.

**¿Cómo veo la página en mi computador antes de publicar?** Siga los pasos de "Instalación y ejecución" más abajo y abra la dirección que muestra la terminal.

**Glosario mínimo**

- **Repositorio:** el espacio donde se guarda el código y su historial de cambios.
- **Terminal:** la ventana donde se escriben comandos, como `npm run verify`.
- **Despliegue:** la publicación del sitio en internet para que cualquiera lo vea.

## Tecnologías

Astro 7.4.6, TypeScript 6.0.3, HTML y CSS. Colecciones JSON con esquemas de Astro/Zod y referencias entre colecciones. Integración oficial `@astrojs/sitemap`, optimización local mediante `astro:assets` y un módulo TypeScript de mejora progresiva. No utiliza un framework de componentes cliente ni islas hidratadas.

## Estructura

```text
src/pages/          Página principal y endpoint estático robots.txt
src/layouts/        BaseLayout: metadatos, estilos y módulo de interacción
src/components/     Secciones y elementos reutilizables Astro
src/content/        Colecciones JSON editables
src/content.config.ts  Esquemas y relaciones de las colecciones
src/data/           Datos generales, admisión, navegación, fotos y redes
src/assets/         Fotografías locales optimizadas por Astro
src/scripts/        Carrusel, revelado, menú móvil y malla
src/styles/         Estilos generales y de interacción
public/            Recursos estáticos: logos, favicon e imagen social
scripts/           Verificador del HTML y SEO de producción
docs/              Verificaciones pendientes y uso de IA
astro.config.mjs   URL pública e integración del sitemap
netlify.toml       Build, carpeta pública y cabeceras HTTP
```

## Instalación y ejecución

Requiere Node.js **24 o superior** y npm. Desde la raíz del repositorio:

```sh
npm ci
npm run dev
```

Abrir la URL que muestra la terminal (habitualmente `http://localhost:4321`). Mantener el servidor activo. En PowerShell, si la política bloquea `npm.ps1`, usar `npm.cmd` en los mismos comandos.

```sh
npm run check    # Astro y TypeScript
npm run build    # Genera dist/
npm run preview  # Sirve el build para revisión local
npm run verify   # Check + build + validación de HTML, contenido y SEO
```

No editar `dist/`, `.astro/` ni `node_modules/`: son generados. `npm ci` requiere acceso al registro y sincronización de package.json con package-lock.json.

## Actualizar contenidos

| Contenido                  | Archivo                            | Consideraciones                                                                                                                              |
| -------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Asignaturas                | `src/content/malla.json`           | Conservar semestres, año e identificadores. Cada registro referencia una fuente. Validar cualquier cambio con documentación oficial.         |
| Campo laboral              | `src/content/campo-laboral.json`   | Orden, título, descripción y fuente.                                                                                                         |
| Preguntas frecuentes       | `src/content/faq.json`             | Mantener destinos reales de `internalLink`.                                                                                                  |
| Referencias                | `src/content/referencias.json`     | ID y número únicos, autor, fecha, título, URL y consulta real. No inventar fechas.                                                           |
| Comparación detallada      | `src/content/comparacion.json`     | Nombre, duración, tres apartados y fuente validada.                                                                                          |
| Datos generales y admisión | `src/data/site.ts`                 | Campus, proceso, ponderaciones, competencias y URLs. Parte de la ficha y explicaciones breves permanece en los componentes correspondientes. |
| Fotografías y créditos     | `src/data/hero.ts` y `src/assets/` | Los créditos se generan con los datos del carrusel. No atribuir las fotografías de archivo a UTEM.                                           |

Después de editar, ejecutar `npm run verify`. La verificación rechaza anclas inexistentes, recursos locales ausentes, IDs o números de fuente duplicados y relaciones de fuentes inexistentes. Astro valida los esquemas.

## Publicación en Netlify

La URL pública definitiva: https://paginawebutem.netlify.app

1. Importar el repositorio en Netlify y seleccionar la rama acordada por el equipo.
2. Usar la raíz del repositorio, comando `npm run verify` y carpeta de publicación `dist`. `netlify.toml` ya declara estos valores y Node 24.
3. Configurar `SITE_URL` con el origen HTTPS real y completo, sin ruta, query ni fragmento, por ejemplo el dominio real asignado por Netlify. No copiar un dominio de ejemplo.
4. Si `SITE_URL` no existe, en Netlify se utiliza su variable `URL`, que identifica el sitio principal. No se utilizan las URLs efímeras de cada despliegue.
5. Volver a desplegar si cambia el dominio. Verificar `/robots.txt`, `/sitemap-index.xml`, el sitemap enlazado y la URL canónica del HTML.

En local puede copiarse `.env.example` como `.env` y completar `SITE_URL`. `.env` está excluido de Git. Sin URL pública, los builds locales omiten las URLs absolutas y muestran una advertencia; un build Netlify sin SITE_URL ni URL falla para impedir una publicación incompleta.

Para una prueba técnica aislada puede asignarse `SITE_URL=https://example.org` solo al proceso de build. **No desplegar ese resultado**. Al terminar, quitar la variable y reconstruir: el ejemplo no debe quedar como canonical del sitio entregado.

## Verificación y evidencias

`npm run verify` comprueba estructura, ocho semestres, 44 asignaturas, tres diapositivas y un módulo de interacción. Con URL configurada también verifica canonical, Open Graph, robots y los archivos de sitemap. Estas pruebas no reemplazan navegación real, Lighthouse ni una auditoría de accesibilidad.

Consultar [verificaciones de entrega](docs/verificaciones-entrega.md) para las mediciones públicas y las capturas responsivas pendientes. No hay puntuaciones Lighthouse o CompliaScan certificadas en este repositorio.

## Fuentes, créditos y asistencia de IA

Se utilizan fuentes institucionales UTEM, DEMRE y Ministerio de Educación, identificadas en `referencias.json` y accesibles en la sección de referencias. Su presencia no garantiza vigencia: el equipo debe revisar los datos y resolver las observaciones académicas pendientes antes de la entrega.

Las imágenes del carrusel son fotografías referenciales de Pexels; autores y originales están registrados en `src/data/hero.ts` y visibles en los créditos. Se conserva el video institucional con su referencia.

El desarrollo recibió asistencia de Codex, Claude y ChatGPT. El alcance verificable, las decisiones técnicas y las tareas de validación del equipo se describen en [uso de IA](docs/uso-ia.md).
