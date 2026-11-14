# Borrador de anexo: trazabilidad de prompts y documentación de IA

Auditoría del 13 de noviembre de 2026. Versión examinada: `44500066aefeed98688a2767b50f65f498152562` (`main`). Este documento describe esa versión; los números de línea dejan de ser válidos si cambia el código. No certifica autoría humana individual ni cumplimiento total de la rúbrica.

## A. Metodología y evidencias

Se revisaron los 30 archivos propios de código versionado (.astro, .ts, .mjs y .css), configuraciones relevantes y documentación. Se excluyeron dependencias, dist, .astro, tmp, qa, fotos y SVG de terceros. No se leyeron .env privados, credenciales ni historiales de otros proyectos.

Se identificaron **354 bloques de comentarios en 30 archivos**. Un bloque agrupa líneas // consecutivas sin código entre ellas; cada /* */ o comentario HTML es una unidad. Se incluyeron comentarios inline de las variables del carrusel. Las URLs, glob strings (por ejemplo "/*") y ejemplos de sintaxis no se contaron como comentarios. Los bloques son explicativos; algunos combinan separadores estructurales con explicación. No se identificó código ejecutable deshabilitado mediante comentarios ni bloques puramente decorativos separados de una explicación.

Fuentes de evidencia:

- **S1:** sesión local Codex `rollout-2026-11-05T16-38-47-01a1ad38-8ec2-7b10-a4e3-38278d296614.jsonl`, en `.codex/sessions/2026/11/05/` del perfil local. Sus registros JSONL se numeran desde 1; se transcriben únicamente solicitudes del usuario relacionadas con el proyecto. Las fechas del nombre de sesión no se usan como fechas de cada intervención.
- **A:** adjuntos originales que S1 referencia, leídos como texto UTF-8. No se sustituyeron por resúmenes.
- **G:** historial, diffs y blame de Git. `4450006` incorpora comentarios posteriores al código; `3098a61` registra la optimización; `beba0c6` registra el ajuste de contraste. Un autor de commit identifica quién registra el cambio, no quién escribió cada instrucción ni si usó IA.
- **D:** `docs/uso-ia.md`, `docs/verificaciones-entrega.md`, `docs/hallazgos-finales.md` y README. Son síntesis, no transcripciones de prompts. No existe `INFORME.md` versionado ni encontrado en la búsqueda del proyecto.
- **R:** pauta aportada por el usuario, Propuesta de proyecto.pdf, página impresa 11: anexo con herramienta, tarea, prompt y cambios al resultado; documentación línea a línea del código generado.

Se localizaron diez registros de sesión relacionados por la ruta del proyecto. Se usó S1 como conversación original; los registros auxiliares de revisión automática no se trataron como nuevas instrucciones del estudiante ni como evidencia de autoría. No hay acceso a la cuenta o exportación de conversaciones separadas de ChatGPT o Claude. Su mención en README no permite recuperar sus prompts. No se crearon prompts reconstruidos.

Estados: **Verificado** = solicitud auténtica y edición histórica concreta respaldada; **Parcialmente verificado** = solicitud/edición recuperada pero el bloque actual evolucionó o no existe correspondencia completa línea por línea; **No recuperado** = no hay prompt original para la intervención considerada. El origen del código y el origen de los comentarios se evalúan por separado.

## B. Inventario completo de código comentado

Cada ficha explica el propósito del archivo y enumera todos sus bloques. “Tramo contiguo” señala las líneas de código inmediatamente relacionadas entre ese comentario y el próximo: es un localizador reproducible, no una atribución histórica ni una prueba de cobertura semántica completa. Los comentarios de sección pueden abarcar más código que ese tramo.

### astro.config.mjs

Resuelve el origen público, rechaza configuraciones incompatibles con producción y activa el sitemap. Node, variables de entorno y configuración Astro.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-001 | 1–2 | // Configuración de Astro. Aquí se decide la URL pública del sitio, que alimenta el sitemap,<br>// la URL canónica y Open Graph (ver BaseLayout.astro y src/pages/robots.txt.ts).<br>Git: 4450006 | 3–3; `import { defineConfig } from "astro/config";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-002 | 4–4 | // Integración oficial que genera sitemap-index.xml.<br>Git: 4450006 | 5–8; `import sitemap from "@astrojs/sitemap";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-003 | 9–10 | // Define SITE_URL with the real HTTPS origin before the production deployment.<br>// Si existe un archivo .env local, carga sus variables (por ejemplo SITE_URL).<br>Git: 594ed4f, 4450006 | 11–11; `if (existsSync(".env")) loadEnvFile(".env");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-004 | 12–13 | // Netlify URL is the primary site URL, unlike per-preview DEPLOY_URL.<br>// URL del sitio: primero SITE_URL; si no existe y se está construyendo en Netlify, usa la variable URL de Netlify.<br>Git: 3f3f221, 4450006 | 14–18; `const configuredSite = process.env.SITE_URL?.trim() &#124;&#124;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-005 | 19–20 | // Rechaza URLs que no sean un origen público HTTPS simple: sin HTTP, usuario, contraseña,<br>  // parámetros, fragmento, ruta ni dirección local (localhost).<br>Git: 4450006 | 21–26; `if (url.protocol !== "https:" &#124;&#124; url.username &#124;&#124; url.password &#124;&#124;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-006 | 27–27 | // En Netlify es obligatorio tener URL: si falta, el despliegue FALLA para no publicar un sitio incompleto.<br>Git: 4450006 | 28–29; `if (process.env.NETLIFY === "true" &amp;&amp; !site)` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-007 | 30–30 | // En un build local sin URL solo se muestra una advertencia.<br>Git: 4450006 | 31–33; `if (!site &amp;&amp; process.argv.includes("build"))` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-008 | 34–34 | // "static": genera HTML estático (sin servidor).<br>Git: 4450006 | 35–36; `output: "static",` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-009 | 37–37 | // El sitemap solo se genera si hay URL pública.<br>Git: 4450006 | 38–38; `integrations: site ? [sitemap()] : [],` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-010 | 39–39 | // Oculta la barra de herramientas de desarrollo de Astro.<br>Git: 4450006 | 40–42; `devToolbar: { enabled: false },` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### scripts/verify-build.mjs

Comprueba integridad de colecciones, estructura HTML y SEO para detener una entrega inválida. Node fs/assert, JSON y expresiones regulares.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-011 | 1–3 | // Verificador del build: se ejecuta con "npm run verify" DESPUÉS de "astro build".<br>// Revisa que el HTML generado (carpeta dist/) y los archivos de contenido cumplan las reglas<br>// del proyecto. Si alguna comprobación falla (assert), el comando termina con error.<br>Git: 4450006 | 4–6; `import { readFileSync, existsSync } from "node:fs";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-012 | 7–8 | // ---------- 1. Contenido (archivos JSON de src/content) ----------<br>// Las cinco colecciones que se revisan.<br>Git: 4450006 | 9–9; `const contentNames = ["referencias", "malla", "campo-laboral", "faq", "comparacion"];` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-013 | 10–11 | // Lee cada JSON y comprueba que no haya IDs repetidos dentro de la misma colección.<br>// Object.fromEntries arma un objeto { nombre: lista de registros }.<br>Git: 4450006 | 12–18; `const content = Object.fromEntries(contentNames.map((name) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-014 | 19–19 | // IDs de todas las referencias disponibles.<br>Git: 4450006 | 20–20; `const sourceIds = new Set(content.referencias.map((entry) =&gt; entry.id));` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-015 | 21–21 | // Los números de las referencias no pueden repetirse.<br>Git: 4450006 | 22–23; `assert.equal(new Set(content.referencias.map((entry) =&gt; entry.number)).size,` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-016 | 24–24 | // Cada registro de las demás colecciones debe citar una referencia que exista.<br>Git: 4450006 | 25–28; `for (const name of contentNames.filter((name) =&gt; name !== "referencias"))` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-017 | 29–30 | // ---------- 2. Estructura del HTML generado ----------<br>// Lee la página final que se publicará.<br>Git: 4450006 | 31–31; `const html = readFileSync("dist/index.html", "utf8");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-018 | 32–32 | // Lista de todos los id="..." de la página.<br>Git: 4450006 | 33–33; `const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) =&gt; m[1]);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-019 | 34–34 | // No puede haber IDs repetidos.<br>Git: 4450006 | 35–35; `assert.equal(ids.length, new Set(ids).size, "Hay IDs duplicados");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-020 | 36–36 | // Debe haber exactamente un título principal &lt;h1&gt; (buena práctica de accesibilidad y SEO).<br>Git: 4450006 | 37–37; `assert.equal((html.match(/&lt;h1[ &gt;]/g) &#124;&#124; []).length, 1, "Debe existir un H1");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-021 | 38–38 | // El idioma de la página debe ser español de Chile.<br>Git: 4450006 | 39–39; `assert.match(html, /lang="es-CL"/);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-022 | 40–40 | // Todo enlace interno (#algo) debe apuntar a un id que exista.<br>Git: 4450006 | 41–42; `for (const match of html.matchAll(/href="#([^"]+)"/g))` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-023 | 43–43 | // Todo recurso local (imagen, archivo, enlace que empieza con "/") debe existir en dist/.<br>Git: 4450006 | 44–45; `for (const match of html.matchAll(/(?:src&#124;href)="(\/[^"#?]+)"/g))` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-024 | 46–46 | // Deben estar los 8 semestres de la malla (data-year entre 1 y 4).<br>Git: 4450006 | 47–47; `assert.equal((html.match(/&lt;article\b[^&gt;]*data-year="[1-4]"/g) &#124;&#124; []).length, 8, "Faltan semestres");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-025 | 48–48 | // Solo debe haber UN &lt;script&gt;: el módulo de interacción (regla de JavaScript mínimo).<br>Git: 4450006 | 49–54; `assert.equal(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-026 | 55–55 | // El carrusel debe tener 3 diapositivas.<br>Git: 4450006 | 56–61; `assert.equal(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-027 | 62–62 | // La malla debe tener 44 asignaturas en total.<br>Git: 4450006 | 63–68; `assert.equal(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-028 | 69–69 | // Debe estar el aviso de que es un proyecto académico (no oficial).<br>Git: 4450006 | 70–71; `assert.match(html, /Proyecto académico estudiantil/);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-029 | 72–73 | // ---------- 3. SEO ----------<br>// Busca la URL canónica en el HTML. Solo existe si el build tuvo SITE_URL (ver astro.config.mjs).<br>Git: 4450006 | 74–74; `const canonical = html.match(/&lt;link\b[^&gt;]*rel="canonical"[^&gt;]*href="([^"]+)"/);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-030 | 75–75 | // Lee el robots.txt generado.<br>Git: 4450006 | 76–78; `const robots = readFileSync("dist/robots.txt", "utf8");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-031 | 79–79 | // Build con URL pública: se verifica el SEO completo.<br>Git: 4450006 | 80–80; `const url = new URL(canonical[1]);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-032 | 81–81 | // La URL debe ser HTTPS y no puede ser de la computadora local.<br>Git: 4450006 | 82–83; `assert.equal(url.protocol, "https:");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-033 | 84–84 | // Open Graph: la URL y la imagen para compartir deben coincidir con la canónica.<br>Git: 4450006 | 85–88; `assert(html.includes(′property="og:url" content="${canonical[1]}"′));` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-034 | 89–89 | // robots.txt debe anunciar el sitemap.<br>Git: 4450006 | 90–92; `const sitemapUrl = new URL("sitemap-index.xml", url).href;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-035 | 93–93 | // El índice del sitemap no puede estar vacío.<br>Git: 4450006 | 94–97; `const index = readFileSync("dist/sitemap-index.xml", "utf8");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-036 | 98–98 | // Cada sitemap listado debe ser del mismo dominio y contener la página principal.<br>Git: 4450006 | 99–106; `for (const [, location] of maps) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-037 | 107–107 | // Build local sin URL pública: no debe haber URLs absolutas a medias.<br>Git: 4450006 | 108–116; `assert(!html.includes('property="og:url"'));` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/AccesosRapidos.astro

Genera navegación hacia malla, perfil, admisión y FAQ para acortar el recorrido del postulante. Datos TypeScript, HTML y CSS scoped.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-038 | 2–2 | // Datos de admisión (aquí se usa el nombre del proceso, por ejemplo "2027").<br>Git: 4450006 | 3–4; `import { admissions } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-039 | 5–5 | // Los cuatro accesos rápidos: destino dentro de la página (href) y texto visible (label).<br>Git: 4450006 | 6–13; `const links = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-040 | 14–14 | /* Menú de accesos rápidos bajo el hero. aria-labelledby lo nombra con el título de abajo. */<br>Git: 4450006 | 15–17; `&lt;nav class="quick-links container" aria-labelledby="quick-links-title"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-041 | 18–18 | /* Un enlace por cada elemento de la lista; la flecha ↓ es decorativa (aria-hidden). */<br>Git: 4450006 | 19–29; `{links.map(({ href, label }) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-042 | 30–30 | /* Estilos propios de este componente (Astro los aplica solo a él). */<br>Git: 4450006 | 31–31; `&lt;style&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-043 | 32–32 | /* Contenedor: espacio vertical y línea superior que lo separa del hero. */<br>Git: 4450006 | 33–42; `.quick-links {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-044 | 43–43 | /* Lista en 4 columnas iguales, sin viñetas. minmax(0, 1fr) evita que una columna desborde. */<br>Git: 4450006 | 44–54; `.quick-links ul {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-045 | 55–55 | /* Cada enlace: texto a la izquierda y flecha a la derecha; alto mínimo de 48 px para que sea fácil de tocar. */<br>Git: 4450006 | 56–75; `.quick-links a {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-046 | 76–76 | /* Al pasar el cursor o enfocar con teclado, cambia el color, el fondo y la línea inferior. */<br>Git: 4450006 | 77–82; `.quick-links a:hover,` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-047 | 83–83 | /* Hasta 900 px de ancho: 2 columnas. */<br>Git: 4450006 | 84–88; `@media (max-width: 900px) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-048 | 89–89 | /* Hasta 640 px (móvil): menos espacio entre elementos y letra algo más chica. */<br>Git: 4450006 | 90–100; `@media (max-width: 640px) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Admision.astro

Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-049 | 2–2 | // Datos de admisión (proceso, código DEMRE, promedio mínimo, ponderaciones) y generales (URL de admisión).<br>Git: 4450006 | 3–7; `import { admissions, site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-050 | 8–8 | /* Sección "Admisión": cómo postular, requisitos, calendario y ponderaciones. */<br>Git: 4450006 | 9–17; `&lt;section id="admision" class="section admissions-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-051 | 18–18 | /* El código DEMRE sale de src/data/site.ts; la cita lo respalda con la referencia "oferta". */<br>Git: 4450006 | 19–23; `&lt;p&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-052 | 24–24 | /* Lista numerada con los tres pasos. */<br>Git: 4450006 | 25–25; `&lt;ol class="admissions-steps"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-053 | 26–26 | /* Paso 1: vías de ingreso (PAES y Acceso Directo), con dos citas y un enlace externo. */<br>Git: 4450006 | 27–37; `&lt;li&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-054 | 38–38 | /* Paso 2: requisito. El promedio mínimo viene de src/data/site.ts. */<br>Git: 4450006 | 39–49; `&lt;li&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-055 | 50–50 | /* Paso 3: fechas clave del proceso, con cita del calendario DEMRE. */<br>Git: 4450006 | 51–64; `&lt;li&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-056 | 65–65 | /* Explica las siglas la primera vez que se usan en las ponderaciones. */<br>Git: 4450006 | 66–76; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-057 | 77–77 | /* Ponderaciones: una pareja nombre-valor por cada elemento de src/data/site.ts. */<br>Git: 4450006 | 78–89; `&lt;dl class="weights"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-058 | 90–90 | /* Advertencia: los datos pueden cambiar; remite a la oferta oficial. */<br>Git: 4450006 | 91–97; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-059 | 98–98 | /* Botón a la página oficial de admisión de la UTEM (URL de src/data/site.ts). */<br>Git: 4450006 | 99–103; `&lt;a class="button" href={site.admissionsUrl}&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-060 | 104–105 | /* Recursos oficiales de la UTEM (becas, aranceles y orientación). aria-labelledby usa<br>        el título de abajo como nombre de la región. */<br>Git: 4450006 | 106–134; `&lt;aside class="admissions-resources" aria-labelledby="admissions-resources-title"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/CampoLaboral.astro

Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-061 | 2–2 | // Lee la colección "laboral" (src/content/campo-laboral.json, validada por un esquema).<br>Git: 4450006 | 3–3; `import { getCollection } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-062 | 4–4 | // Indicadores de empleabilidad verificados (hoy la lista está vacía).<br>Git: 4450006 | 5–6; `import { employmentIndicators } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-063 | 7–7 | // Ordena las áreas de desempeño según el campo "order".<br>Git: 4450006 | 8–12; `const areas = (await getCollection("laboral")).sort(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-064 | 13–13 | /* Sección "Campo laboral" (fondo oscuro). */<br>Git: 4450006 | 14–17; `&lt;section id="campo-laboral" class="section dark-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-065 | 18–18 | /* La segunda frase va en un span (title-second) para poder darle su propia línea y espacio con CSS. */<br>Git: 4450006 | 19–32; `&lt;h2&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-066 | 33–34 | /* Una fila por área de desempeño, numerada (0 + posición + 1). target="_blank" abre en<br>          pestaña nueva y rel="noopener noreferrer" protege la página de origen. */<br>Git: 4450006 | 35–46; `{areas.map(({ data }, index) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-067 | 47–47 | /* Fuente del conjunto de áreas. */<br>Git: 4450006 | 48–52; `&lt;p class="work-list-source"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-068 | 53–53 | /* Bloque para quien busca su primera experiencia laboral, con enlaces externos referenciales. */<br>Git: 4450006 | 54–63; `&lt;div class="container work-opportunities"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-069 | 64–65 | /* Si hay indicadores verificados (con valor, año y enlace a la fuente), se muestran.<br>        Si no, se muestra un aviso que remite a Mi Futuro: no se publican cifras sin año verificable. */<br>Git: 4450006 | 66–87; `{employmentIndicators.length &gt; 0 ? (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Cite.astro

Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-070 | 2–2 | // Lee las referencias ya preparadas (ordenadas y con la fecha de cita en formato APA).<br>Git: 4450006 | 3–3; `import { getPresentedReferences } from "../data/references";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-071 | 4–4 | // Props = datos que recibe el componente.<br>Git: 4450006 | 5–5; `interface Props {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-072 | 6–6 | // ID de la referencia en referencias.json (por ejemplo "carrera").<br>Git: 4450006 | 7–7; `source: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-073 | 8–8 | // "number": cita corta que salta a la lista de referencias. "source": enlace directo a la fuente.<br>Git: 4450006 | 9–9; `variant?: "number" &#124; "source";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-074 | 10–10 | // Texto de la cita, si se quiere personalizar.<br>Git: 4450006 | 11–13; `label?: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-075 | 14–14 | // Busca la referencia pedida entre todas.<br>Git: 4450006 | 15–15; `const entry = (await getPresentedReferences()).find((item) =&gt; item.id === source);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-076 | 16–16 | // Si el ID no existe, el build FALLA a propósito: así no se publican citas rotas.<br>Git: 4450006 | 17–17; `if (!entry) throw new Error("Referencia inexistente: " + source);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-077 | 18–18 | // Nombres abreviados de los autores más frecuentes, para citas cortas.<br>Git: 4450006 | 19–23; `const shortAuthors: Record&lt;string, string&gt; = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-078 | 24–24 | // Usa la abreviatura si existe; si no, el nombre completo.<br>Git: 4450006 | 25–25; `const shortAuthor = shortAuthors[entry.data.author] ?? entry.data.author;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-079 | 26–26 | // Etiqueta de contexto que se agrega a la cita según el ID (qué dato respalda).<br>Git: 4450006 | 27–39; `const sourceContexts: Record&lt;string, string&gt; = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-080 | 40–41 | // Texto corto de la cita. Si se pasó "label", se reemplaza su "s. f." o su año final por la fecha<br>// de la referencia; si no, se arma como "Autor · Contexto · Año" (filter(Boolean) omite lo que falte).<br>Git: 4450006 | 42–44; `const shortLabel = label` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-081 | 45–45 | // En la variante "source" se muestra el título de la fuente; en la otra, la cita corta.<br>Git: 4450006 | 46–48; `const visibleLabel = variant === "source" ? entry.data.title : shortLabel;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-082 | 49–52 | /* Enlace de la cita.<br>    - variante "source": va a la URL de la fuente y marca la clase "citation-source".<br>    - variante "number": salta a la lista de referencias (#ref-ID) de esta misma página.<br>    aria-label da a los lectores de pantalla la información completa: cita, título, autor y fecha. */<br>Git: 4450006 | 53–60; `&lt;a` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-083 | 61–61 | /* Flecha decorativa que indica enlace externo. */<br>Git: 4450006 | 62–68; `&lt;span aria-hidden="true"&gt;↗&lt;/span&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/FAQ.astro

Ordena preguntas y genera acordeones nativos con fuentes y destinos internos. Colecciones, map, details/summary.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-084 | 2–2 | // Función de Astro que lee una colección de contenido (aquí, las preguntas frecuentes).<br>Git: 4450006 | 3–3; `import { getCollection } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-085 | 4–4 | // Componente que muestra una cita enlazada a la sección de referencias.<br>Git: 4450006 | 5–5; `import Cite from "./Cite.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-086 | 6–7 | // Lee la colección "faq" (src/content/faq.json, validada por un esquema)<br>// y la ordena de menor a mayor según el campo "order".<br>Git: 4450006 | 8–12; `const questions = (await getCollection("faq")).sort(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-087 | 13–13 | /* Sección de preguntas frecuentes: título a la izquierda, lista a la derecha. */<br>Git: 4450006 | 14–23; `&lt;section id="preguntas" class="section container faq-grid"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-088 | 24–24 | /* Aclara que las preguntas las eligió el equipo y falta validarlas con postulantes. */<br>Git: 4450006 | 25–29; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-089 | 30–31 | /* Una pregunta desplegable por cada registro. &lt;details&gt; abre y cierra sin JavaScript.<br>        El "+" es decorativo (aria-hidden). */<br>Git: 4450006 | 32–38; `{questions.map(({ data }) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-090 | 39–39 | /* Respuesta y su cita: data.source.id indica en qué referencia se apoya. */<br>Git: 4450006 | 40–40; `{data.answer} &lt;Cite source={data.source.id} /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-091 | 41–41 | /* Si la pregunta trae un enlace interno (a otra sección), se muestra después del punto. */<br>Git: 4450006 | 42–53; `{data.internalLink &amp;&amp; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Footer.astro

Agrupa navegación final, aviso académico y redes. Componentes Astro y enlaces HTML.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-092 | 2–2 | // Datos generales del sitio (aquí se usa la URL de admisión).<br>Git: 4450006 | 3–3; `import { site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-093 | 4–4 | // Componente con los íconos de redes sociales.<br>Git: 4450006 | 5–7; `import SocialLinks from "./SocialLinks.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-094 | 8–8 | /* Pie de página: marca, enlaces útiles, aviso de proyecto no oficial y redes sociales. */<br>Git: 4450006 | 9–11; `&lt;footer class="site-footer"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-095 | 12–12 | /* Marca: vuelve al inicio de la página. */<br>Git: 4450006 | 13–16; `&lt;a class="footer-brand" href="#inicio"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-096 | 17–17 | /* Enlaces del pie: dos externos (↗) y dos internos. */<br>Git: 4450006 | 18–25; `&lt;nav aria-label="Enlaces del pie de página"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-097 | 26–26 | /* Aviso legal: aclara que es un trabajo del electivo EFE685 y no una página oficial. */<br>Git: 4450006 | 27–34; `&lt;p&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-098 | 35–35 | /* Íconos de redes sociales oficiales de la UTEM. */<br>Git: 4450006 | 36–39; `&lt;SocialLinks /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Header.astro

Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-099 | 2–2 | // Importa la lista de enlaces del menú y los datos generales del sitio (nombre de la universidad).<br>Git: 4450006 | 3–3; `import { navigation, site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-100 | 4–4 | // Importa el componente que dibuja los íconos (aquí, la flecha del botón).<br>Git: 4450006 | 5–7; `import Icon from "./Icon.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-101 | 8–9 | /* Banner superior: avisa que es un proyecto académico y no un sitio oficial.<br>    &lt;aside&gt; = contenido complementario; aria-label lo nombra para lectores de pantalla. */<br>Git: 4450006 | 10–11; `&lt;aside class="academic-banner" aria-label="Información del proyecto"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-102 | 12–12 | /* Eslogan: se oculta en móvil con CSS (global.css) porque no cabe en una línea. */<br>Git: 4450006 | 13–13; `&lt;span class="banner-slogan"&gt;Una guía para tu próxima etapa&lt;/span&gt;{" "}` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-103 | 14–14 | /* Aviso de sitio no oficial: se mantiene en todos los tamaños. */<br>Git: 4450006 | 15–18; `&lt;span&gt;Proyecto académico estudiantil · Sitio no oficial&lt;/span&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-104 | 19–19 | /* Cabecera fija (sticky) con logo, menú y botón de postulación. */<br>Git: 4450006 | 20–21; `&lt;header class="site-header"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-105 | 22–23 | /* Logo y nombre: enlace que lleva al inicio (#inicio).<br>        aria-label compone el nombre completo para lectores de pantalla. */<br>Git: 4450006 | 24–28; `&lt;a` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-106 | 29–30 | /* width y height reservan el espacio antes de cargar la imagen (evita saltos de diseño).<br>          alt describe la imagen para lectores de pantalla (requisito de accesibilidad). */<br>Git: 4450006 | 31–41; `&lt;img` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-107 | 42–44 | /* Menú de escritorio: toma los elementos 1 a 3 de la lista (La carrera,<br>        Qué aprenderás, Campo laboral). El 0 (Inicio) ya lo cubre el logo.<br>        map() crea un enlace por cada elemento. */<br>Git: 4450006 | 45–49; `&lt;nav class="desktop-nav" aria-label="Navegación principal"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-108 | 50–50 | /* Botón principal: lleva a la sección de admisión; el ícono es una flecha de 18 px. */<br>Git: 4450006 | 51–53; `&lt;a class="button small header-cta" href="#admision"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-109 | 54–55 | /* Menú de móvil: &lt;details&gt; abre y cierra sin JavaScript.<br>        aria-hidden en el ícono ☰ evita que el lector de pantalla lo lea. */<br>Git: 4450006 | 56–59; `&lt;details class="mobile-menu"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-110 | 60–60 | /* En móvil se listan todos los enlaces de la lista. */<br>Git: 4450006 | 61–69; `&lt;nav aria-label="Navegación móvil"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Hero.astro

Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-111 | 2–2 | // Cita enlazada a las referencias.<br>Git: 4450006 | 3–3; `import Cite from "./Cite.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-112 | 4–4 | // Carrusel de imágenes con el título principal (portada visual).<br>Git: 4450006 | 5–5; `import HeroCarousel from "./HeroCarousel.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-113 | 6–6 | // Datos de admisión (código DEMRE) y generales (sede o campus).<br>Git: 4450006 | 7–9; `import { admissions, site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-114 | 10–10 | /* Portada (hero): carrusel + ficha con los datos básicos de la carrera. */<br>Git: 4450006 | 11–13; `&lt;section id="inicio" class="hero"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-115 | 14–14 | /* Ficha de datos. &lt;dl&gt; es una lista de términos (dt) y sus valores (dd). */<br>Git: 4450006 | 15–45; `&lt;dl class="facts"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-116 | 46–46 | /* Valor tomado de src/data/site.ts. */<br>Git: 4450006 | 47–52; `&lt;dd&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-117 | 53–53 | /* Valor tomado de src/data/site.ts. */<br>Git: 4450006 | 54–58; `&lt;dd&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-118 | 59–59 | /* Fuentes de los datos de arriba, con la primera aparición de la sigla DEMRE explicada. */<br>Git: 4450006 | 60–71; `&lt;p class="facts-sources"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/HeroCarousel.astro

Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-119 | 2–2 | // getImage genera versiones optimizadas de cada imagen (formato y tamaños).<br>Git: 4450006 | 3–3; `import { getImage } from "astro:assets";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-120 | 4–4 | // Lista de imágenes del carrusel (ruta, texto alternativo, autor, etc.), en src/data/hero.ts.<br>Git: 4450006 | 5–6; `import { heroSlides } from "../data/hero";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-121 | 7–8 | // Para cada imagen se genera: formato webp (más liviano), calidad 78, tres anchos (640, 1024 y 1600 px)<br>// para que cada pantalla descargue el tamaño que necesita. Promise.all las procesa en paralelo.<br>Git: 4450006 | 9–14; `const images = await Promise.all(heroSlides.map((slide) =&gt; getImage({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-122 | 15–16 | /* Carrusel del hero. role="region" y aria-roledescription lo identifican como carrusel<br>    para lectores de pantalla. data-carousel es la marca que usa el script (experience.ts). */<br>Git: 4450006 | 17–24; `&lt;div` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-123 | 25–26 | /* Una diapositiva por imagen. data-active indica cuál se ve; las demás quedan ocultas<br>        para lectores de pantalla (aria-hidden) hasta que les toque. */<br>Git: 4450006 | 27–37; `{heroSlides.map((slide, index) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-124 | 38–40 | /* Solo la primera imagen carga de inmediato (src y srcset). Las demás guardan su dirección<br>            en data-slide-src y data-slide-srcset, y el script las carga después, para acelerar la<br>            carga inicial. fetchpriority="high" le da prioridad a la primera. alt describe la imagen. */<br>Git: 4450006 | 41–58; `&lt;img` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-125 | 59–59 | /* Texto principal sobre las imágenes: es el único &lt;h1&gt; de la página. */<br>Git: 4450006 | 60–74; `&lt;div class="container hero-content"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-126 | 75–75 | /* Botón principal: lleva a la sección "La carrera". */<br>Git: 4450006 | 76–85; `&lt;a class="button hero-primary" href="#carrera"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-127 | 86–87 | /* Controles del carrusel. Empiezan ocultos (atributo hidden): el script los muestra solo si<br>        JavaScript funciona, porque sin él no servirían. */<br>Git: 4450006 | 88–88; `&lt;div class="carousel-controls" data-carousel-controls hidden&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-128 | 89–89 | /* Un botón (punto) por imagen para elegirla. aria-pressed marca la que está activa. */<br>Git: 4450006 | 90–101; `&lt;div class="carousel-dots" role="group" aria-label="Elegir imagen"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-129 | 102–103 | /* Botón pausar/reproducir: permite detener el cambio automático (accesibilidad).<br>          El script cambia su texto y su aria-label según el estado. */<br>Git: 4450006 | 104–113; `&lt;button` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-130 | 114–114 | /* Enlace a los créditos de las fotografías (en la sección de referencias). */<br>Git: 4450006 | 115–118; `&lt;a class="hero-credit" href="#creditos-imagenes"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-131 | 119–120 | /* Mensaje invisible: el script escribe aquí qué imagen se muestra, para que lo lea el lector<br>      de pantalla (aria-live="polite" lo anuncia sin interrumpir). */<br>Git: 4450006 | 121–128; `&lt;p` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Icon.astro

Selecciona un trazado SVG tipado para reutilizar símbolos coherentes. Props y Record de TypeScript, SVG inline.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-132 | 2–2 | // Props = datos que recibe el componente. TypeScript los tipa para detectar errores antes de publicar.<br>Git: 4450006 | 3–3; `interface Props {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-133 | 4–4 | // Nombre del ícono: solo se aceptan estos siete valores.<br>Git: 4450006 | 5–5; `name: "code" &#124; "layers" &#124; "network" &#124; "shield" &#124; "spark" &#124; "people" &#124; "arrow";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-134 | 6–6 | // Tamaño en píxeles (opcional).<br>Git: 4450006 | 7–8; `size?: number;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-135 | 9–9 | // Lee los datos recibidos; si no se indica tamaño, usa 24 px.<br>Git: 4450006 | 10–10; `const { name, size = 24 } = Astro.props;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-136 | 11–12 | // Diccionario: cada nombre de ícono se asocia con el trazo SVG (atributo "d") que lo dibuja.<br>// Record&lt;Props["name"], string&gt; obliga a tener un trazo por cada nombre posible.<br>Git: 4450006 | 13–24; `const paths: Record&lt;Props["name"], string&gt; = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-137 | 25–28 | /* Dibuja el ícono como SVG en línea.<br>    viewBox="0 0 24 24" define el sistema de coordenadas del dibujo.<br>    stroke="currentColor": el trazo toma el color del texto que lo rodea.<br>    aria-hidden="true": es decorativo, los lectores de pantalla lo ignoran. */<br>Git: 4450006 | 29–39; `&lt;svg` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-138 | 40–40 | /* El trazo se elige del diccionario según el nombre recibido. */<br>Git: 4450006 | 41–43; `&lt;path d={paths[name]} /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Malla.astro

Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-139 | 2–2 | // Lee la colección "malla" (src/content/malla.json, validada por un esquema).<br>Git: 4450006 | 3–3; `import { getCollection } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-140 | 4–4 | // Datos generales (aquí, el enlace a la malla oficial).<br>Git: 4450006 | 5–6; `import { site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-141 | 7–7 | // Ordena los semestres de menor a mayor.<br>Git: 4450006 | 8–10; `const semesters = (await getCollection("malla")).sort(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-142 | 11–12 | // Validación: si no hay exactamente 8 semestres distintos, el build FALLA a propósito<br>// para no publicar una malla incompleta o con semestres repetidos.<br>Git: 4450006 | 13–20; `if (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-143 | 21–21 | /* Sección "Plan de estudios": malla curricular por semestre, con un filtro para destacar uno. */<br>Git: 4450006 | 22–33; `&lt;section id="malla" class="section curriculum-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-144 | 34–35 | /* Filtro de semestre: botones de opción (radio). El valor 0 es "Ver toda la malla";<br>            del 1 al 8 destacan ese semestre. El script (experience.ts) aplica el estado. */<br>Git: 4450006 | 36–55; `&lt;fieldset class="semester-filter"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-145 | 56–57 | /* Leyenda: explica los tres estados visuales (anteriores, seleccionado, siguientes).<br>            Los cuadritos son decorativos (aria-hidden). */<br>Git: 4450006 | 58–69; `&lt;div class="curriculum-key" aria-label="Estados de la vista"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-146 | 70–70 | /* Indicación de uso. La frase del teclado se oculta en móvil (clase keyboard-hint, en CSS). */<br>Git: 4450006 | 71–77; `&lt;p id="curriculum-scroll-help" class="curriculum-scroll-help"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-147 | 78–79 | /* Zona con desplazamiento horizontal. tabindex="0" permite recorrerla con el teclado;<br>          aria-describedby la vincula con la indicación de arriba. */<br>Git: 4450006 | 80–87; `&lt;div` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-148 | 88–89 | /* Una columna por semestre. data-year y data-semester los usa el script y el CSS<br>              para marcar el estado (anterior, seleccionado, siguiente). */<br>Git: 4450006 | 90–98; `{semesters.map(({ data }) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-149 | 99–99 | /* Cuatro textos de estado; el CSS muestra solo el que corresponde. */<br>Git: 4450006 | 100–107; `&lt;p class="semester-state"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-150 | 108–109 | /* Una tarjeta por asignatura. El número (01, 02...) se arma con padStart para<br>                    que siempre tenga dos dígitos; es decorativo (aria-hidden). */<br>Git: 4450006 | 110–122; `{data.courses.map((course, index) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-151 | 123–123 | /* Enlace a la malla oficial y su cita. */<br>Git: 4450006 | 124–132; `&lt;div class="curriculum-source-link"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-152 | 133–133 | /* Mensaje invisible: el script anuncia aquí qué semestre se destacó (role="status"). */<br>Git: 4450006 | 134–142; `&lt;p` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/PerfilEgreso.astro

Repite competencias con iconos y su cita institucional para explicar habilidades del egresado. Datos TypeScript, map, Icon y Cite.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-153 | 2–2 | // Lista de competencias del perfil de egreso (definida en src/data/site.ts).<br>Git: 4450006 | 3–3; `import { competencies } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-154 | 4–4 | // Cita enlazada a las referencias.<br>Git: 4450006 | 5–5; `import Cite from "./Cite.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-155 | 6–6 | // Íconos de cada competencia.<br>Git: 4450006 | 7–9; `import Icon from "./Icon.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-156 | 10–10 | /* Sección "Perfil de egreso": lo que podrá hacer quien se titula, en lenguaje claro. */<br>Git: 4450006 | 11–24; `&lt;section id="perfil" class="section soft-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-157 | 25–25 | /* Una tarjeta por competencia: ícono, número correlativo (0 + posición + 1), título y descripción. */<br>Git: 4450006 | 26–36; `{competencies.map((item, index) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-158 | 37–37 | /* Distingue el texto del equipo (síntesis) del dato institucional, y cita la fuente. */<br>Git: 4450006 | 38–44; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Referencias.astro

Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-159 | 2–2 | // Lee las referencias ya ordenadas en formato APA (ver src/data/references.ts).<br>Git: 4450006 | 3–3; `import { getPresentedReferences } from "../data/references";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-160 | 4–4 | // Fecha de revisión del contenido y lista de datos por confirmar.<br>Git: 4450006 | 5–5; `import { pendingVerification, site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-161 | 6–6 | // Imágenes del carrusel (se usan para los créditos de las fotografías).<br>Git: 4450006 | 7–9; `import { heroSlides } from "../data/hero";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-162 | 10–11 | // Convierte una fecha como "2026-11-12" en "12 de noviembre de 2026".<br>// timeZone: "UTC" evita que la fecha se corra un día según la zona horaria.<br>Git: 4450006 | 12–20; `const formatDate = (iso: string): string =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-163 | 21–21 | /* Sección "Fuentes y referencias": de dónde sale cada dato (trazabilidad). */<br>Git: 4450006 | 22–26; `&lt;section id="referencias" class="section references-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-164 | 27–27 | /* &lt;time&gt; con datetime marca la fecha de revisión de forma legible para máquinas. */<br>Git: 4450006 | 28–33; `&lt;p&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-165 | 34–34 | /* Desplegable con la lista de referencias en formato APA. */<br>Git: 4450006 | 35–40; `&lt;details class="references-details"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-166 | 41–42 | /* Cada referencia tiene un id "ref-..." para que las citas del sitio puedan saltar a ella.<br>            Se muestra: autor (fecha). Título enlazado. Recuperado el [fecha de consulta]. */<br>Git: 4450006 | 43–55; `{references.map(({ id, data, bibliographicDate }) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-167 | 56–56 | /* Transparencia: qué es del equipo, qué es de terceros, con sus licencias, y qué falta confirmar. */<br>Git: 4450006 | 57–77; `&lt;details class="references-details"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-168 | 78–78 | /* Lista de datos pendientes de confirmar (src/data/site.ts). */<br>Git: 4450006 | 79–83; `{pendingVerification.map((item) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-169 | 84–84 | /* Créditos de las fotografías. "open" lo deja abierto al cargar, porque el hero enlaza aquí. */<br>Git: 4450006 | 85–94; `&lt;details id="creditos-imagenes" class="references-details" open&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-170 | 95–95 | /* Una línea por imagen del carrusel: enlace al original y autor (src/data/hero.ts). */<br>Git: 4450006 | 96–106; `{heroSlides.map((slide) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/Respaldo.astro

Distingue acreditación institucional, certificación de carrera y sede con sus fuentes. HTML editorial y Cite.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-171 | 2–2 | // Cita enlazada a las referencias.<br>Git: 4450006 | 3–5; `import Cite from "./Cite.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-172 | 6–6 | /* Sección "Respaldo institucional": acreditación de la universidad y certificación de la carrera. */<br>Git: 4450006 | 7–20; `&lt;section id="respaldo" class="section container"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-173 | 21–21 | /* Tarjeta principal: acreditación de la universidad (dato de la CNA citado desde la referencia "acreditacion"). */<br>Git: 4450006 | 22–32; `&lt;article class="accreditation"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-174 | 33–33 | /* Advertencia honesta: la resolución de la CNA aún no se contrasta directamente. */<br>Git: 4450006 | 34–38; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-175 | 39–39 | /* Certificación de la carrera (distinta de la acreditación de la universidad). */<br>Git: 4450006 | 40–52; `&lt;article&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-176 | 53–53 | /* Sede donde se imparte la carrera, con su fuente (el folleto con la malla). */<br>Git: 4450006 | 54–71; `&lt;article&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/SobreCarrera.astro

Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-177 | 3–3 | // Lee la colección "comparacion" (src/content/comparacion.json, validada por un esquema).<br>Git: 4450006 | 4–4; `import { getCollection } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-178 | 5–5 | // Ordena las carreras comparadas según el campo "order".<br>Git: 4450006 | 6–8; `const comparison = (await getCollection("comparacion")).sort((a, b) =&gt; a.data.order - b.data.order);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-179 | 9–9 | /* Sección "La carrera": qué es, un ejemplo y en qué se diferencia de carreras afines. */<br>Git: 4450006 | 10–25; `&lt;section id="carrera" class="section container"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-180 | 26–26 | /* Definición de la carrera, con cita de la fuente oficial. */<br>Git: 4450006 | 27–38; `&lt;div class="about-statement"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-181 | 39–39 | /* Ejemplo ilustrativo del equipo (no es un proyecto institucional; así se aclara en el texto). */<br>Git: 4450006 | 40–50; `&lt;div class="example-block"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-182 | 51–52 | /* Recorrido en tres pasos. Los números son decorativos (aria-hidden); el nombre del paso<br>          está en &lt;strong&gt;. aria-label describe la lista completa. */<br>Git: 4450006 | 53–68; `&lt;ol class="process-flow" aria-label="Recorrido desde la necesidad hasta la solución"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-183 | 69–69 | /* Resumen de comparación con carreras afines. aria-labelledby usa el título de abajo como nombre. */<br>Git: 4450006 | 70–80; `&lt;div class="comparison-summary" aria-labelledby="comparison-summary-title"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-184 | 81–81 | /* Aviso: la comparación es interpretación del equipo, basada en fuentes oficiales de cada carrera. */<br>Git: 4450006 | 82–86; `&lt;p class="small-note comparison-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-185 | 87–87 | /* Tarjeta de la carrera que se está explorando. variant="source" enlaza directamente a la fuente. */<br>Git: 4450006 | 88–96; `&lt;article class="comparison-primary"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-186 | 97–97 | /* Dos carreras afines, cada una con su duración y su fuente oficial. */<br>Git: 4450006 | 98–115; `&lt;div class="comparison-related"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-187 | 116–117 | /* Comparación detallada desplegable. Sus textos NO están aquí: vienen de la colección<br>      "comparacion" (JSON), para mantener el contenido separado del código. */<br>Git: 4450006 | 118–127; `&lt;details class="comparison"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-188 | 128–128 | /* Cada apartado: etiqueta en negrita y su texto. */<br>Git: 4450006 | 129–139; `{data.details.map((item) =&gt; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/SocialLinks.astro

Relaciona redes oficiales con SVG y enlaces accesibles; adapta foco, hover y movimiento reducido. TypeScript, SVG importado y CSS scoped.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-189 | 2–2 | // Lista de redes sociales (red, nombre y enlace), definida en src/data/social.ts.<br>Git: 4450006 | 3–3; `import { socialLinks } from "../data/social";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-190 | 4–4 | // Cada ícono es un archivo SVG que Astro importa como componente.<br>Git: 4450006 | 5–10; `import Facebook from "../assets/social/facebook.svg";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-191 | 11–11 | // Diccionario: el nombre de la red se asocia con su ícono.<br>Git: 4450006 | 12–20; `const icons = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-192 | 21–21 | /* Menú de redes sociales oficiales de la UTEM. aria-label lo nombra para lectores de pantalla. */<br>Git: 4450006 | 22–26; `&lt;nav` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-193 | 27–27 | /* Un enlace por red. Se busca su ícono en el diccionario según el campo "network". */<br>Git: 4450006 | 28–29; `{socialLinks.map(({ network, name, url }) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-194 | 30–31 | // target="_blank" abre en pestaña nueva; rel="noopener noreferrer" evita que la página abierta<br>    // acceda a esta. aria-label avisa a lectores de pantalla que abre una pestaña nueva.<br>Git: 4450006 | 32–39; `return (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-195 | 40–41 | /* fill="currentColor": el ícono toma el color del texto. aria-hidden y focusable="false":<br>            es decorativo; el nombre lo da el aria-label del enlace. */<br>Git: 4450006 | 42–53; `&lt;SocialIcon` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-196 | 54–54 | /* Estilos propios de este componente. */<br>Git: 4450006 | 55–55; `&lt;style&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-197 | 56–56 | /* Fila de íconos que se acomoda en varias líneas si no caben. */<br>Git: 4450006 | 57–63; `.social-links {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-198 | 64–64 | /* Cada enlace es un cuadrado de 44 px (tamaño táctil recomendado) con el ícono centrado. */<br>Git: 4450006 | 65–78; `.social-links a {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-199 | 79–79 | /* Al pasar el cursor: se aclara, se agrega un fondo suave y sube 3 px. */<br>Git: 4450006 | 80–84; `.social-links a:hover {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-200 | 85–85 | /* Con navegación por teclado: mismo efecto y un contorno verde visible. */<br>Git: 4450006 | 86–94; `.social-links a:focus-visible {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-201 | 95–95 | /* Si la persona pidió menos movimiento en su sistema, se quitan las animaciones. */<br>Git: 4450006 | 96–105; `@media (prefers-reduced-motion: reduce) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/components/VideoCarrera.astro

Genera reproductor externo diferido y alternativa con JavaScript deshabilitado. iframe, noscript y setupDeferredVideos.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-202 | 2–2 | // Identificador del video de YouTube (lo que va después de "v=" o de "youtu.be/" en el enlace).<br>Git: 4450006 | 3–5; `const videoId: string = "VGQ9TptyvuI";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-203 | 6–6 | /* Sección del video institucional de Admisión UTEM. */<br>Git: 4450006 | 7–9; `&lt;section id="video" class="section container video-section"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-204 | 10–10 | /* Contenedor con proporción 16:9 (se define en global.css): reserva el espacio y evita saltos de diseño. */<br>Git: 4450006 | 11–11; `&lt;div class="video-frame"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-205 | 12–19 | /* data-video-src guarda la dirección del video sin cargarla todavía.<br>        El script (experience.ts, setupDeferredVideos) la copia a "src" cuando el video<br>        está por entrar en pantalla, para no frenar la carga inicial de la página.<br>        youtube-nocookie.com: versión de YouTube que no guarda cookies hasta reproducir.<br>        title: nombre del iframe para lectores de pantalla.<br>        loading="lazy": el navegador difiere la carga.<br>        allow: permisos que YouTube necesita (reproducción y mini reproductor).<br>        referrerpolicy: limita la información que se envía a YouTube. */<br>Git: 4450006 | 20–27; `&lt;iframe` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-206 | 28–28 | /* Alternativa sin JavaScript: si el script no corre, &lt;noscript&gt; muestra el video con src directo. */<br>Git: 4450006 | 29–39; `&lt;noscript&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-207 | 40–40 | /* Aviso de autoría: el video es institucional, no del equipo. El enlace salta a la referencia "video". */<br>Git: 4450006 | 41–46; `&lt;p class="small-note"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/content.config.ts

Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-208 | 1–3 | // Define las "colecciones de contenido": los datos del sitio (malla, FAQ, etc.) se guardan en<br>// archivos JSON y cada colección tiene un ESQUEMA que dice qué campos y tipos debe tener.<br>// Si un dato no cumple su esquema, el build FALLA y no se publica información incompleta o mal escrita.<br>Git: 4450006 | 4–4; `import { defineCollection, reference } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-209 | 5–5 | // file() le dice a Astro que cada colección se lee desde un único archivo JSON.<br>Git: 4450006 | 6–6; `import { file } from "astro/loaders";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-210 | 7–7 | // Zod es la librería que describe y valida los esquemas.<br>Git: 4450006 | 8–9; `import { z } from "astro/zod";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-211 | 10–10 | // Texto no vacío: se le quitan los espacios de los extremos y debe tener al menos 1 carácter.<br>Git: 4450006 | 11–12; `const text = z.string().trim().min(1);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-212 | 13–13 | // Referencias bibliográficas (src/content/referencias.json).<br>Git: 4450006 | 14–16; `const referencias = defineCollection({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-213 | 17–17 | // Número entero positivo de la referencia.<br>Git: 4450006 | 18–19; `number: z.number().int().positive(),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-214 | 20–20 | // Fecha de publicación tal como se escribe en APA (por ejemplo "2026, 18 de octubre" o "s. f.").<br>Git: 4450006 | 21–22; `date: text,` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-215 | 23–23 | // Debe ser una URL válida.<br>Git: 4450006 | 24–24; `url: z.url(),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-216 | 25–25 | // Fecha de consulta con formato AAAA-MM-DD (por ejemplo 2026-11-12).<br>Git: 4450006 | 26–29; `consulted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-217 | 30–30 | // Malla curricular (src/content/malla.json): un registro por semestre.<br>Git: 4450006 | 31–33; `const malla = defineCollection({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-218 | 34–34 | // Semestre entre 1 y 8 y año entre 1 y 4.<br>Git: 4450006 | 35–36; `semester: z.number().int().min(1).max(8),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-219 | 37–37 | // Lista de asignaturas: al menos una.<br>Git: 4450006 | 38–38; `courses: z.array(text).min(1),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-220 | 39–39 | // Fuente: debe ser el ID de una referencia que exista. Si no existe, falla el build.<br>Git: 4450006 | 40–43; `source: reference("referencias"),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-221 | 44–44 | // Campo laboral (src/content/campo-laboral.json): áreas de desempeño.<br>Git: 4450006 | 45–47; `const laboral = defineCollection({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-222 | 48–48 | // Posición en la que se muestra.<br>Git: 4450006 | 49–51; `order: z.number().int(),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-223 | 52–52 | // Enlace a ofertas laborales (URL válida).<br>Git: 4450006 | 53–57; `offersUrl: z.url(),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-224 | 58–58 | // Preguntas frecuentes (src/content/faq.json).<br>Git: 4450006 | 59–64; `const faq = defineCollection({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-225 | 65–65 | // Enlace interno opcional. El destino debe tener forma de ancla: "#" + minúsculas, números o guiones.<br>Git: 4450006 | 66–75; `internalLink: z` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-226 | 76–76 | // Comparación detallada de carreras (src/content/comparacion.json).<br>Git: 4450006 | 77–80; `const comparacion = defineCollection({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-227 | 81–81 | // Duración (por ejemplo "8 semestres") y nombre de la carrera.<br>Git: 4450006 | 82–83; `duration: text,` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-228 | 84–84 | // Exactamente tres apartados, cada uno con etiqueta y texto.<br>Git: 4450006 | 85–89; `details: z.array(z.object({ label: text, text })).length(3),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-229 | 90–90 | // Lista de colecciones que Astro debe conocer.<br>Git: 4450006 | 91–92; `export const collections = { referencias, malla, laboral, faq, comparacion };` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/data/hero.ts

Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-230 | 1–2 | // Imágenes del carrusel del hero, con sus textos y créditos (los usan HeroCarousel.astro y Referencias.astro).<br>// ImageMetadata es el tipo que Astro da a una imagen importada (ruta, ancho y alto).<br>Git: 4450006 | 3–3; `import type { ImageMetadata } from "astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-231 | 4–4 | // Se importan las imágenes locales; Astro las optimiza al construir el sitio.<br>Git: 4450006 | 5–8; `import cybersecurity from "../assets/hero-ciberseguridad.webp";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-232 | 9–9 | // Forma que debe tener cada diapositiva. TypeScript avisa si falta algún campo.<br>Git: 4450006 | 10–10; `interface HeroSlide {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-233 | 11–11 | // La imagen importada.<br>Git: 4450006 | 12–12; `image: ImageMetadata;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-234 | 13–13 | // Nombre corto: se muestra en lectores de pantalla y en los créditos.<br>Git: 4450006 | 14–14; `label: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-235 | 15–15 | // Texto alternativo: describe la imagen para personas que no la ven (accesibilidad).<br>Git: 4450006 | 16–16; `alt: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-236 | 17–17 | // Parte de la imagen que se mantiene visible al recortarla (formato "horizontal% vertical%").<br>Git: 4450006 | 18–18; `position: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-237 | 19–19 | // Autor de la fotografía y enlace al original en Pexels (crédito obligatorio).<br>Git: 4450006 | 20–22; `author: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-238 | 23–23 | // Las tres diapositivas, en el orden en que aparecen.<br>Git: 4450006 | 24–52; `export const heroSlides: HeroSlide[] = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/data/references.ts

Ordena referencias y comparte desambiguación de autor/año entre citas y bibliografía. Colecciones Astro, Intl.Collator y transformaciones TypeScript.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-239 | 1–3 | // Prepara las referencias para mostrarlas: las ordena como en APA 7 y calcula la fecha que se<br>// usa en las citas. Lo usan Cite.astro (citas cortas) y Referencias.astro (lista final), de modo<br>// que ambas muestren siempre lo mismo.<br>Git: 4450006 | 4–5; `import { getCollection, type CollectionEntry } from "astro:content";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-240 | 6–6 | // Una referencia tal como viene del JSON.<br>Git: 4450006 | 7–7; `type Reference = CollectionEntry&lt;"referencias"&gt;;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-241 | 8–8 | // Una referencia ya preparada: el JSON más dos campos calculados.<br>Git: 4450006 | 9–9; `export type PresentedReference = Reference &amp; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-242 | 10–10 | // Año para la cita corta (por ejemplo "2026a").<br>Git: 4450006 | 11–11; `citationDate: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-243 | 12–12 | // Fecha completa con el mismo sufijo, para la lista de referencias.<br>Git: 4450006 | 13–15; `bibliographicDate: string;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-244 | 16–16 | // Comparador de texto en español que ignora mayúsculas y tildes al ordenar (sensitivity: "base").<br>Git: 4450006 | 17–17; `const collator = new Intl.Collator("es", { sensitivity: "base" });` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-245 | 18–18 | // Saca el año (1900 a 2099) del campo "date"; si no hay año, devuelve "s. f." (sin fecha).<br>Git: 4450006 | 19–21; `const publicationYear = (entry: Reference): string =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-246 | 22–23 | // Share APA ordering and same-author/year suffixes between citations and bibliography.<br>// Devuelve las referencias ordenadas y con sus fechas de cita calculadas.<br>Git: 3f3f221, 4450006 | 24–24; `export async function getPresentedReferences(): Promise&lt;PresentedReference[]&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-247 | 25–26 | // Orden APA: por autor, luego por año (las "s. f." cuentan como 0, van primero) y luego por título.<br>  // "&#124;&#124;" pasa al siguiente criterio solo si el anterior empata (da 0).<br>Git: 4450006 | 27–34; `const entries = (await getCollection("referencias")).sort((a, b) =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-248 | 35–35 | // Referencias con el mismo autor y el mismo año: en APA se distinguen con a, b, c...<br>Git: 4450006 | 36–38; `const peers = entries.filter((other) =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-249 | 39–39 | // Si hay más de una, la letra se calcula con su posición (97 es el código de la "a").<br>Git: 4450006 | 40–42; `const suffix = peers.length &gt; 1` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-250 | 43–43 | // Fecha de cita: "s. f.-a" si no tiene año, o el año con la letra (por ejemplo "2026a").<br>Git: 4450006 | 44–49; `const citationDate = year === "s. f." &amp;&amp; suffix` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-251 | 50–50 | // En la fecha completa se reemplaza el año por el año con su letra.<br>Git: 4450006 | 51–55; `bibliographicDate: entry.data.date.replace(year, citationDate),` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/data/site.ts

Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-252 | 1–2 | // Datos generales del sitio que usan varios componentes.<br>// Datos generales: título y descripción de la página (SEO), universidad, sede y enlaces oficiales.<br>Git: 4450006 | 3–8; `export const site = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-253 | 9–9 | // Página oficial de admisión por PAES.<br>Git: 4450006 | 10–10; `admissionsUrl: "https://www.utem.cl/admision/admision-acceso-via-paes/",` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-254 | 11–11 | // PDF oficial con el folleto y la malla.<br>Git: 4450006 | 12–13; `curriculumUrl:` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-255 | 14–14 | // Fecha de la última revisión general del contenido (se muestra en Referencias).<br>Git: 4450006 | 15–16; `reviewDate: "5 de noviembre de 2026",` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-256 | 17–18 | // Enlaces del menú: destino dentro de la página (href) y texto visible (label).<br>// Header.astro usa los elementos 1 a 3 en escritorio y todos en móvil.<br>Git: 4450006 | 19–26; `export const navigation = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-257 | 27–29 | // Competencias del perfil de egreso, reescritas en lenguaje claro (las muestra PerfilEgreso.astro).<br>// icon: nombre del ícono (ver Icon.astro). source: ID de la referencia de la que sale.<br>// "as const" hace que los valores sean fijos, para que TypeScript compruebe que cada icon existe.<br>Git: 4450006 | 30–67; `export const competencies = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-258 | 68–69 | // Datos de admisión del proceso 2027 (los usan Hero, AccesosRapidos y Admision).<br>// weights: ponderación de cada prueba o criterio, en porcentaje.<br>Git: 4450006 | 70–82; `export const admissions = {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-259 | 83–84 | // Do not publish unsupported figures. Each future indicator must include its year and source.<br>// Un indicador de empleabilidad verificado debe traer su valor, su año y el enlace a la fuente.<br>Git: 594ed4f, 4450006 | 85–90; `export interface VerifiedIndicator {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-260 | 91–92 | // Lista vacía a propósito: no se publican cifras sin año y fuente verificables.<br>// CampoLaboral.astro los muestra solo cuando haya al menos uno.<br>Git: 4450006 | 93–93; `export const employmentIndicators: VerifiedIndicator[] = [];` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-261 | 94–94 | // Datos que el equipo aún debe confirmar (se muestran en Referencias, en "Transparencia editorial").<br>Git: 4450006 | 95–103; `export const pendingVerification = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/data/social.ts

Define redes permitidas y destinos oficiales utilizados por SocialLinks. Unión de literales, interfaz y array TypeScript.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-262 | 1–2 | // Redes sociales oficiales de la UTEM (las muestra SocialLinks.astro en el pie de página).<br>// Nombres de red permitidos. TypeScript rechaza cualquier otro valor.<br>Git: 4450006 | 3–5; `export type SocialNetwork =` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-263 | 6–6 | // Forma que debe tener cada enlace: red (para elegir el ícono), nombre visible y dirección.<br>Git: 4450006 | 7–12; `interface SocialLink {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-264 | 13–14 | // Links published at https://www.utem.cl/; checked on 6 November 2026.<br>// Enlaces tomados del sitio oficial de la UTEM y revisados el 6 de noviembre de 2026.<br>Git: 594ed4f, 4450006 | 15–38; `export const socialLinks: SocialLink[] = [` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/layouts/BaseLayout.astro

Configura documento, metadatos, idioma, salto al contenido y módulo cliente. Astro props/slot, URL, head y script.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-265 | 2–3 | // Layout base: estructura común de la página (&lt;head&gt;, metadatos, SEO y script).<br>// Estilos globales y de interacción: Astro los incluye en la página final.<br>Git: 4450006 | 4–5; `import "../styles/global.css";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-266 | 6–6 | // Datos generales del sitio: título y descripción por defecto.<br>Git: 4450006 | 7–7; `import { site } from "../data/site";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-267 | 8–8 | // Props = datos que recibe el layout. Ambos son opcionales.<br>Git: 4450006 | 9–12; `interface Props {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-268 | 13–13 | // Si no se entrega título o descripción, se usan los de src/data/site.ts.<br>Git: 4450006 | 14–14; `const { title = site.title, description = site.description } = Astro.props;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-269 | 15–15 | // URL canónica de la página: solo existe si el sitio tiene URL pública (SITE_URL, ver astro.config.mjs).<br>Git: 4450006 | 16–21; `const canonical = Astro.site` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-270 | 22–22 | /* lang="es-CL": idioma de la página, para lectores de pantalla y buscadores. */<br>Git: 4450006 | 23–25; `&lt;html lang="es-CL"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-271 | 26–26 | /* Hace que la página se ajuste al ancho de cada pantalla (necesario para el diseño responsivo). */<br>Git: 4450006 | 27–27; `&lt;meta name="viewport" content="width=device-width, initial-scale=1" /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-272 | 28–28 | /* Título y descripción únicos de la página (SEO). */<br>Git: 4450006 | 29–30; `&lt;title&gt;{title}&lt;/title&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-273 | 31–31 | /* Color de la barra del navegador en celulares. */<br>Git: 4450006 | 32–33; `&lt;meta name="theme-color" content="#004eaa" /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-274 | 34–34 | /* URL canónica: indica a los buscadores cuál es la dirección oficial. Solo si hay URL pública. */<br>Git: 4450006 | 35–35; `{canonical &amp;&amp; &lt;link rel="canonical" href={canonical} /&gt;}` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-275 | 36–36 | /* Open Graph: define cómo se ve el enlace al compartirlo en redes sociales. */<br>Git: 4450006 | 37–41; `&lt;meta property="og:type" content="website" /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-276 | 42–43 | /* La imagen al compartir necesita URL absoluta, por eso solo se agrega si hay URL pública.<br>        1200 x 630 es el tamaño estándar para esta imagen. */<br>Git: 4450006 | 44–57; `{Astro.site &amp;&amp; (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-277 | 58–58 | /* Tarjeta de Twitter/X en formato resumen. */<br>Git: 4450006 | 59–61; `&lt;meta name="twitter:card" content="summary" /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-278 | 62–62 | /* Enlace para saltar al contenido (accesibilidad): aparece al usar el teclado y evita recorrer todo el menú. */<br>Git: 4450006 | 63–65; `&lt;a class="skip-link" href="#contenido"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-279 | 66–66 | /* Aquí se inserta el contenido de la página (index.astro). */<br>Git: 4450006 | 67–67; `&lt;slot /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-280 | 68–68 | /* Único script de la página: Astro lo convierte en un módulo ligero (carrusel, video diferido, menú, etc.). */<br>Git: 4450006 | 69–74; `&lt;script&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/pages/index.astro

Ensambla secciones dentro de main y layout. Imports Astro y composición declarativa.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-281 | 2–3 | // Página principal (landing). Solo ensambla el layout y los componentes; el contenido de<br>// cada sección está dentro de su componente o en los archivos JSON de src/content.<br>Git: 4450006 | 4–19; `import BaseLayout from "../layouts/BaseLayout.astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-282 | 20–20 | /* BaseLayout aporta el &lt;head&gt; y la estructura común; lo de adentro va en su &lt;slot /&gt;. */<br>Git: 4450006 | 21–22; `&lt;BaseLayout&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-283 | 23–23 | /* id="contenido": destino del enlace "Saltar al contenido principal" (accesibilidad). */<br>Git: 4450006 | 24–24; `&lt;main id="contenido"&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-284 | 25–25 | /* Orden de las secciones, de arriba hacia abajo. */<br>Git: 4450006 | 26–40; `&lt;Hero /&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/pages/robots.txt.ts

Genera robots.txt y anuncia sitemap solo con origen configurado. Endpoint Astro, Response y plantilla de texto.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-285 | 1–1 | // Genera el archivo /robots.txt, que les dice a los buscadores qué pueden revisar del sitio.<br>Git: 4450006 | 2–3; `import type { APIRoute } from "astro";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-286 | 4–4 | // "site" es la URL pública configurada en astro.config.mjs (puede no existir en un build local).<br>Git: 4450006 | 5–5; `export const GET: APIRoute = ({ site }) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-287 | 6–6 | // Si hay URL pública, se agrega la línea que anuncia dónde está el sitemap; si no, queda vacía.<br>Git: 4450006 | 7–9; `const sitemap = site` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-288 | 10–10 | // "User-agent: *" = todos los buscadores; "Allow: /" = pueden revisar todo el sitio.<br>Git: 4450006 | 11–15; `return new Response("User-agent: *\nAllow: /\n" + sitemap, {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/scripts/experience.ts

Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-289 | 1–8 | // Único JavaScript que se ejecuta en el navegador. Mejora la página, pero no es necesario para leerla:<br>// Progressive enhancement: the first image and all content remain visible without JS.<br>// (Mejora progresiva: la primera imagen y todo el contenido se ven aunque JavaScript falle.)<br>//<br>// Contiene seis funciones, que se ejecutan al final del archivo:<br>//   setupCarousel, setupDeferredVideos, setupReveals, setupMobileMenu, setupCurriculum, setupReferenceLinks.<br>// Detecta si la persona pidió "reducir movimiento" en su sistema. Si es así, se evitan animaciones y autoplay.<br>Git: 4450006, 594ed4f | 9–10; `const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-290 | 11–12 | // ---------- 1. Carrusel del hero ----------<br>// "root" es el contenedor del carrusel (el elemento con data-carousel).<br>Git: 4450006 | 13–13; `function setupCarousel(root: HTMLElement): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-291 | 14–14 | // Busca las piezas del carrusel dentro de "root" por sus marcas data-*.<br>Git: 4450006 | 15–27; `const slides = [...root.querySelectorAll&lt;HTMLElement&gt;("[data-slide]")];` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-292 | 28–29 | // Si faltan los controles o el mensaje para lectores de pantalla, o hay menos de 2 imágenes,<br>  // no se activa el carrusel (la primera imagen igual se ve).<br>Git: 4450006 | 30–36; `if (` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-293 | 37–37 | // Estado del carrusel:<br>Git: 4450006 | Misma línea 37; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-294 | 38–38 | // índice de la imagen visible<br>Git: 4450006 | Misma línea 38; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-295 | 39–39 | // pausado por la persona (o por preferir menos movimiento)<br>Git: 4450006 | Misma línea 39; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-296 | 40–40 | // el cursor está encima del carrusel<br>Git: 4450006 | Misma línea 40; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-297 | 41–41 | // el foco del teclado está dentro del carrusel<br>Git: 4450006 | Misma línea 41; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-298 | 42–42 | // el carrusel está visible en pantalla<br>Git: 4450006 | Misma línea 42; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-299 | 43–43 | // temporizador del cambio automático<br>Git: 4450006 | Misma línea 43; `Comentario inline o rótulo; ver misma línea y contexto del archivo` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-300 | 44–47 | // número de la última petición de cambio (para ignorar peticiones antiguas)<br>  // Carga la imagen de la diapositiva "index" si todavía no se cargó. Las imágenes después de la<br>  // primera guardan su dirección en data-slide-src y solo se cargan cuando hace falta.<br>Git: 4450006, 3098a61 | 48–58; `function loadSlide(index: number): HTMLImageElement &#124; null {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-301 | 59–61 | // Programa el siguiente cambio automático a los 6,5 segundos, salvo que algo lo impida:<br>  // pausa de la persona, cursor encima, foco dentro, carrusel fuera de pantalla, pestaña oculta<br>  // o preferencia de menos movimiento.<br>Git: 4450006 | 62–76; `function schedule(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-302 | 77–78 | // Actualiza el botón de pausa/reproducir (texto, ícono y aria-label) según el estado.<br>  // Se oculta si la persona prefiere menos movimiento. Luego vuelve a programar el cambio automático.<br>Git: 4450006 | 79–92; `const updatePlayback = (): void =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-303 | 93–94 | // Muestra la diapositiva "index" (con vuelta al principio al pasar la última).<br>  // manual = true cuando la persona eligió la imagen: en ese caso se pausa el cambio automático.<br>Git: 4450006 | 95–101; `const show = async (index: number, manual: boolean): Promise&lt;void&gt; =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-304 | 102–103 | // Keep the current photo visible until the requested one is ready.<br>    // (Se mantiene la foto actual hasta que la nueva esté lista para mostrarse.)<br>Git: 3098a61, 4450006 | 104–104; `await loadSlide(next)?.decode().catch(() =&gt; undefined);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-305 | 105–105 | // Si mientras tanto se pidió otra imagen, esta petición queda descartada.<br>Git: 4450006 | 106–107; `if (request !== requestedSlide) return;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-306 | 108–108 | // Precarga la siguiente imagen para que el próximo cambio sea fluido.<br>Git: 4450006 | 109–109; `if (!motionPreference.matches) loadSlide((current + 1) % slides.length);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-307 | 110–110 | // Marca la diapositiva activa y oculta las demás a lectores de pantalla.<br>Git: 4450006 | 111–114; `slides.forEach((slide, i) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-308 | 115–115 | // Marca cuál de los puntos está activo.<br>Git: 4450006 | 116–118; `buttons.forEach((button, i) =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-309 | 119–119 | // Actualiza el pie de foto y el contador, si existen en la página.<br>Git: 4450006 | 120–122; `if (caption) caption.textContent = slides[current]?.dataset.caption ?? "";` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-310 | 123–123 | // Si la persona eligió la imagen, se anuncia el cambio a lectores de pantalla.<br>Git: 4450006 | 124–131; `if (manual) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-311 | 132–132 | // Cada punto muestra su imagen al hacer clic.<br>Git: 4450006 | 133–135; `buttons.forEach((button, index) =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-312 | 136–136 | // El botón de pausa alterna entre pausar y reproducir.<br>Git: 4450006 | 137–140; `play?.addEventListener("click", () =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-313 | 141–141 | // Con el mouse encima, el carrusel se detiene; al salir, continúa.<br>Git: 4450006 | 142–151; `root.addEventListener("pointerenter", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-314 | 152–153 | // Pause while keyboard focus remains inside the carousel.<br>  // (Se pausa mientras el foco del teclado esté dentro del carrusel.)<br>Git: 3f3f221, 4450006 | 154–161; `root.addEventListener("focusin", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-315 | 162–162 | // Si el foco solo se movió a otro elemento del carrusel, no se hace nada.<br>Git: 4450006 | 163–167; `if (event.relatedTarget instanceof Node &amp;&amp; root.contains(event.relatedTarget))` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-316 | 168–168 | // Si la pestaña se oculta o se vuelve a mostrar, se recalcula el cambio automático.<br>Git: 4450006 | 169–169; `document.addEventListener("visibilitychange", schedule);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-317 | 170–170 | // Si la preferencia de movimiento cambia mientras se usa la página, se actualiza.<br>Git: 4450006 | 171–174; `motionPreference.addEventListener("change", () =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-318 | 175–175 | // Detecta si el carrusel está visible en pantalla (IntersectionObserver); si no lo está, no cambia.<br>Git: 4450006 | 176–181; `if ("IntersectionObserver" in window) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-319 | 182–182 | // Los controles empiezan ocultos (atributo hidden): se muestran aquí, porque ya sabemos que JavaScript funciona.<br>Git: 4450006 | 183–184; `controls.hidden = false;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-320 | 185–186 | // Do not compete with the first photo before it has decoded and painted.<br>  // (No se carga la segunda imagen hasta que la primera esté lista, y se espera 1 segundo más.)<br>Git: 3098a61, 4450006 | 187–194; `void loadSlide(0)?.decode().catch(() =&gt; undefined).then(() =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-321 | 195–197 | // ---------- 2. Video diferido ----------<br>// El iframe del video guarda su dirección en data-video-src y no carga nada. Aquí se copia a "src"<br>// justo antes de que el video entre en pantalla, para no frenar la carga inicial de la página.<br>Git: 4450006 | 198–205; `function setupDeferredVideos(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-322 | 206–206 | // Si el navegador no tiene IntersectionObserver, el video se carga de inmediato.<br>Git: 4450006 | 207–210; `if (!("IntersectionObserver" in window)) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-323 | 211–211 | // Observa el contenedor del video. rootMargin "200px": empieza a cargar 200 px antes de que se vea.<br>Git: 4450006 | 212–216; `const observer = new IntersectionObserver((entries) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-324 | 217–217 | // Una vez cargado, deja de observarlo.<br>Git: 4450006 | 218–226; `observer.unobserve(entry.target);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-325 | 227–228 | // ---------- 3. Revelado al hacer scroll ----------<br>// Las secciones que están más abajo de la pantalla aparecen suavemente al llegar a ellas.<br>Git: 4450006 | 229–229; `function setupReveals(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-326 | 230–230 | // Sin IntersectionObserver o con preferencia de menos movimiento, no se hace nada: todo queda visible.<br>Git: 4450006 | 231–231; `if (!("IntersectionObserver" in window) &#124;&#124; motionPreference.matches) return;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-327 | 232–232 | // Bloques que se revelan (selectores CSS).<br>Git: 4450006 | 233–235; `const elements = document.querySelectorAll&lt;HTMLElement&gt;(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-328 | 236–236 | // Quita la clase que lo oculta y deja de observarlo.<br>Git: 4450006 | 237–240; `const reveal = (element: Element): void =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-329 | 241–241 | // Revela cada bloque cuando al menos un 6% entra en pantalla.<br>Git: 4450006 | 242–249; `const observer = new IntersectionObserver(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-330 | 250–250 | // Solo se ocultan los bloques que están debajo de la pantalla; los que ya se ven quedan como están.<br>Git: 4450006 | 251–256; `elements.forEach((element) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-331 | 257–258 | // Never leave keyboard focus or an anchor destination inside hidden content.<br>  // (Nunca se deja el foco del teclado ni el destino de un enlace dentro de contenido oculto.)<br>Git: 594ed4f, 4450006 | 259–264; `function revealTarget(target: Element &#124; null): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-332 | 265–265 | // Si el teclado enfoca algo, se revela el bloque que lo contiene.<br>Git: 4450006 | 266–268; `document.addEventListener("focusin", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-333 | 269–269 | // Si se navega a un enlace interno (#algo), se revela su destino.<br>Git: 4450006 | 270–272; `window.addEventListener("hashchange", () =&gt;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-334 | 273–273 | // Si se activa la preferencia de menos movimiento, se revela todo.<br>Git: 4450006 | 274–276; `motionPreference.addEventListener("change", () =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-335 | 277–277 | // Si la página se abrió con un #destino en la dirección, se revela de inmediato.<br>Git: 4450006 | 278–280; `revealTarget(document.getElementById(location.hash.slice(1)));` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-336 | 281–282 | // ---------- 4. Menú móvil ----------<br>// El menú es un &lt;details&gt; (abre y cierra sin JavaScript). Este código mejora su comportamiento.<br>Git: 4450006 | 283–287; `function setupMobileMenu(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-337 | 288–288 | // Al elegir un enlace interno, se cierra el menú.<br>Git: 4450006 | 289–292; `menu.addEventListener("click", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-338 | 293–293 | // Se ignoran clics que no sean un clic simple (por ejemplo con Ctrl o Shift) o sin enlace.<br>Git: 4450006 | 294–298; `if (!link &#124;&#124; event.defaultPrevented &#124;&#124; event.button !== 0 &#124;&#124;` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-339 | 299–300 | // Keep native anchor scrolling and move keyboard focus out of the closed menu.<br>    // (Se conserva el desplazamiento normal y el foco del teclado pasa al destino, fuera del menú cerrado.)<br>Git: 716ad85, 4450006 | 301–302; `if (!target.hasAttribute("tabindex")) {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-340 | 303–303 | // Al perder el foco, se quita el tabindex temporal.<br>Git: 4450006 | 304–309; `target.addEventListener("blur", () =&gt; target.removeAttribute("tabindex"), {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-341 | 310–310 | // Con la tecla Escape se cierra el menú y el foco vuelve al botón "Menú".<br>Git: 4450006 | 311–319; `menu.addEventListener("keydown", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-342 | 320–322 | // ---------- 5. Malla curricular: filtro de semestre ----------<br>// Al elegir un semestre en el filtro, se desplaza la malla hasta él y se anuncia el cambio.<br>// El resaltado de semestres anteriores, seleccionado y siguientes lo hace el CSS.<br>Git: 4450006 | 323–329; `function setupCurriculum(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-343 | 330–330 | // Escucha los cambios de los botones de opción del filtro.<br>Git: 4450006 | 331–337; `root.addEventListener("change", (event) =&gt; {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-344 | 338–338 | // Valor elegido: 0 = toda la malla, 1 a 8 = ese semestre. Si no es válido, no hace nada.<br>Git: 4450006 | 339–345; `const selectedSemester = Number(input.value);` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-345 | 346–346 | // Columna del semestre elegido.<br>Git: 4450006 | 347–349; `const semester = root.querySelector&lt;HTMLElement&gt;(` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-346 | 350–352 | // Move only this horizontal panel; keep the visitor's vertical position.<br>    // (Se mueve solo este panel horizontal; la posición vertical de la página no cambia.)<br>    // Cálculo: posición de la columna respecto al panel + lo ya desplazado - 3 px de margen. Para "toda la malla", vuelve al inicio (0).<br>Git: 594ed4f, 4450006 | 353–358; `const left = semester` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-347 | 359–359 | // Desplazamiento suave, o inmediato si la persona prefiere menos movimiento.<br>Git: 4450006 | 360–363; `scroller.scrollTo({` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-348 | 364–364 | // Mensaje para lectores de pantalla sobre lo que se está mostrando.<br>Git: 4450006 | 365–374; `if (announcement)` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-349 | 375–377 | // ---------- 6. Citas que abren su referencia ----------<br>// Al hacer clic en una cita (por ejemplo "UTEM · Carrera · 2026"), se abre el desplegable que<br>// contiene su referencia, para que el salto (#ref-...) llegue a algo visible.<br>Git: 4450006 | 378–389; `function setupReferenceLinks(): void {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-350 | 390–391 | // ---------- Inicio: se ejecutan las seis funciones ----------<br>// Activa el carrusel en cada elemento marcado con data-carousel.<br>Git: 4450006 | 392–400; `document` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/styles/experience.css

Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-351 | 1–1 | /* Photographic hero and native curriculum exploration. */<br>Git: 594ed4f | 2–457; `.sr-only {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-352 | 458–458 | /* Selecting one semester keeps all eight columns and their courses visible. */<br>Git: 594ed4f | 459–752; `.curriculum:has(input[name="academic-semester"][value="1"]:checked)` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |
| IA-353 | 753–753 | /* Reveal only after JS attaches the observer. Without JS, content is visible. */<br>Git: 594ed4f | 754–974; `.section-heading,` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### src/styles/global.css

Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries.

| ID | Comentario (líneas) | Texto exacto del comentario | Tramo contiguo / instrucción de referencia | Estado documental |
| --- | --- | --- | --- | --- |
| IA-354 | 1–1 | /* Colors from UTEM's 2026 manual; ink and pale backgrounds are project colors. */<br>Git: 594ed4f | 2–1551; `:root {` | Explicación por bloque; no certifica documentación línea a línea. Prompt de sus comentarios: no recuperado salvo evidencia específica. |

### Configuración adicional revisada

- `.env.example`: líneas 1–5, un bloque # de instrucciones para SITE_URL; la línea de ejemplo está deshabilitada a propósito y no contiene credenciales reales. Su intervención inicial está documentada en S1/67; no se atribuye cada ampliación posterior al mismo prompt. Se cuenta aparte de los 354 bloques de lenguajes de código: **355 bloques en 31 archivos si se incluye este archivo de instrucciones**.
- `netlify.toml`: build verify, publish dist, Node 24 y tres cabeceras. Sin comentarios.
- `tsconfig.json`: strict, noUncheckedIndexedAccess, include/exclude. Sin comentarios.
- `package.json`: scripts y dependencias declaradas. Sin comentarios.
- `.gitignore`: exclusiones; no comentarios. `.nvmrc`: versión de Node; no comentarios. `package-lock.json`: lockfile generado; revisado como metadato, no como código explicativo manual.
- Colecciones sin comentarios por ser JSON: `src/content/campo-laboral.json`, `comparacion.json`, `faq.json`, `malla.json`, `referencias.json`. Sirven como contexto de los loaders; no se exige insertar sintaxis de comentarios inválida en JSON.

### Comentarios históricos con relación directa recuperada

La columna Git de B permite separar la incorporación del comentario de la del código. `4450006` identifica los comentarios nuevos cuya instrucción original no se recuperó. Para los comentarios anteriores se conservan estas relaciones directas en S1:

| Comentario | Prompt | Evidencia de edición |
| --- | --- | --- |
| `global.css` 1, “Colors from UTEM's 2026 manual…” | P-001 | S1/93 incluye ese comentario en el CSS generado. |
| `experience.css` 1, “Photographic hero and native curriculum exploration.” | P-002 | S1/314 incluye ese encabezado en la hoja generada. |
| `data/references.ts` 22, “Share APA ordering…” | P-030 | S1/3652 añade el helper con ese comentario. |
| `experience.ts` 102, “Keep the current photo visible…” y 185, “Do not compete…” | P-031 | S1/3936 incorpora la optimización; 4450006 agrega las explicaciones españolas posteriores. |

Estas correspondencias verifican intervenciones concretas. No convierten las traducciones añadidas posteriormente en texto generado por el mismo prompt. Los demás comentarios con un commit anterior se conservan identificados por Git y con estado parcial hasta completar el cruce exacto con las operaciones originales.

## C. Prompts originales recuperados

Se recuperaron **32 solicitudes originales** ligadas a intervenciones sobre los archivos auditados. Son instrucciones auténticas, no prompts redactados retrospectivamente. El nombre de herramienta comprobado para estas intervenciones es **Codex**. No se infieren versiones históricas de modelo. Los rangos de acciones se refieren a S1 y permiten inspeccionar la edición y su resultado; una llamada aislada no se considera por sí sola prueba de ejecución correcta. Git y el código posterior complementan esa evidencia.

### P-001 — solicitud S1/16

Procedencia: S1, registro 16; adjunto 4c5c162a-655e-4ca7-a79f-246409e512a7/Texto pegado.txt. Ediciones registradas en S1: 67, 80, 93, 175.

``````text
# PROYECTO: LANDING PAGE INGENIERÍA EN INFORMÁTICA UTEM

## 1. TU ROL

Actúa como un desarrollador frontend senior, especialista en Astro, TypeScript, diseño UI/UX, accesibilidad web, SEO y desarrollo de sitios estáticos de alto rendimiento.

Tu misión es diseñar, implementar y comprobar una landing page académica moderna para promocionar la carrera de Ingeniería en Informática de la Universidad Tecnológica Metropolitana (UTEM), Chile.

Este proyecto corresponde a la asignatura EFE685 – Electivo de Computación Móvil, y será desarrollado por dos estudiantes de Ingeniería en Informática.

Quiero un resultado profesional, atractivo, responsivo, mantenible y que cumpla rigurosamente los requisitos técnicos definidos en este prompt.

**IMPORTANTE:** No quiero solamente una propuesta o estructura inicial. Quiero que implementes el sitio web completo, trabajando directamente sobre los archivos del proyecto, ejecutando las comprobaciones necesarias y corrigiendo los errores que encuentres.

Por ahora NO debes desarrollar documentación académica extensa, encuestas, informes, matrices de investigación ni anexos. Todo eso se realizará posteriormente.

---

## 2. OBJETIVO GENERAL

Construir una landing page de una sola vista destinada principalmente a estudiantes de tercero y cuarto medio que estén considerando estudiar Ingeniería en Informática en la UTEM.

También debe resultar útil para sus familias y para personas que buscan ingresar a la educación superior o cambiar de carrera.

La página debe resolver claramente estas preguntas:

1. ¿Qué es Ingeniería en Informática?
2. ¿Qué hace un ingeniero informático?
3. ¿Qué diferencia esta carrera de otras relacionadas?
4. ¿Qué aprenderé durante los ocho semestres?
5. ¿Qué podré hacer cuando egrese?
6. ¿En qué áreas podré trabajar?
7. ¿Qué respaldo institucional tiene la carrera?
8. ¿Cómo puedo postular a la UTEM?
9. ¿Dónde puedo consultar información oficial?

La experiencia debe ser intuitiva, visualmente atractiva y especialmente cómoda desde dispositivos móviles.

No debe parecer un informe académico convertido en página web. Debe sentirse como un sitio universitario contemporáneo, con identidad tecnológica, jerarquía visual clara y excelente experiencia de navegación.

---

## 3. TECNOLOGÍAS OBLIGATORIAS

### Framework

- Astro, versión estable vigente.
- Node.js 24 LTS o superior.
- TypeScript en modo strict.
- HTML5 semántico.
- CSS moderno.

### Arquitectura

- Sitio estático.
- Una sola página principal.
- Componentes `.astro` reutilizables.
- Layout base.
- Colecciones de contenido tipadas.
- Validación de datos mediante esquemas.
- Separación entre contenido, diseño y configuración.

### Restricciones

- No utilizar `any` en TypeScript.
- No implementar backend ni base de datos.
- No crear autenticación.
- Evitar dependencias innecesarias.
- Preferir CSS nativo y Astro frente a frameworks adicionales.
- No utilizar React, Vue o similares salvo que exista una necesidad técnica clara y justificada.
- Mantener el JavaScript del cliente al mínimo, idealmente cero, excepto una isla interactiva justificada.

El código debe ser claro, modular, fácil de entender y adecuado para que estudiantes de Ingeniería en Informática puedan explicarlo en una evaluación académica.

Consulta las APIs vigentes de Astro antes de implementar funcionalidades que hayan cambiado entre versiones.

---

## 4. DISEÑO VISUAL

Quiero una estética profesional similar a las landing pages tecnológicas y universitarias modernas.

### Identidad visual

Inspirarse en los colores institucionales de la UTEM y combinarlos con una estética tecnológica.

Paleta propuesta, ajustable:

- Azul institucional como color principal.
- Azul oscuro para títulos y secciones destacadas.
- Verde como color de acento.
- Blanco para fondos principales.
- Gris muy claro para separar secciones.
- Texto oscuro de alto contraste.

Investiga la identidad institucional oficial cuando sea posible, sin inventar códigos de color oficiales.

### Características visuales

- Diseño moderno, elegante y minimalista.
- Tipografía sans serif legible y profesional.
- Excelente uso del espacio en blanco.
- Tarjetas con bordes suaves.
- Sombras ligeras donde aporten profundidad.
- Iconografía consistente.
- Botones claramente identificables.
- Transiciones suaves y discretas.
- Buen contraste de colores.
- Secciones diferenciadas visualmente.
- Navegación clara.
- Distribución fluida y responsiva.

Evita:

- Exceso de animaciones.
- Efectos visuales pesados.
- Carruseles innecesarios.
- Apariencia genérica de plantilla.
- Grandes cantidades de texto sin jerarquía.
- Elementos decorativos que perjudiquen la accesibilidad.

### Imágenes

Incorporar imágenes pertinentes sobre informática, programación, tecnología y formación universitaria.

Las imágenes deben ser:

- Propias, institucionales autorizadas o de licencia abierta.
- Correctamente atribuidas.
- Optimizadas.
- Responsivas.
- Con textos alternativos apropiados.

No inventes fotografías del campus ni utilices el logotipo institucional sin verificar las condiciones de uso.

Si no encuentras imágenes adecuadamente autorizadas, utiliza gráficos originales construidos con CSS o SVG y elementos visuales tecnológicos.

No se aceptan imágenes rotas ni fotografías sin fuente.

## REFERENCIAS VISUALES Y DISEÑO PROFESIONAL — OBLIGATORIO

Antes de comenzar a diseñar e implementar la interfaz, investiga y analiza sitios web reales desarrollados con Astro.

Quiero evitar que el resultado tenga la apariencia típica de una página generada automáticamente por inteligencia artificial.

La landing page debe sentirse como un sitio web diseñado cuidadosamente por un equipo profesional de diseño y desarrollo frontend.

### 1. Investigar ejemplos reales de Astro

Consulta estas fuentes:

**Astro Showcase — sitios reales:**
https://astro.build/showcase/

**Astro Themes — plantillas y ejemplos:**
https://astro.build/themes/

**Documentación oficial:**
https://docs.astro.build/

Explora al menos 3 referencias pertinentes de landing pages, sitios institucionales, educativos o tecnológicos.

Analiza:
- Distribución de las secciones.
- Composición del hero principal.
- Estilos de navegación.
- Tipografía y jerarquía visual.
- Espaciado y proporciones.
- Uso de colores.
- Presentación de información extensa.
- Diseño de tarjetas y elementos interactivos.
- Adaptación a dispositivos móviles.
- Organización de componentes Astro cuando el código fuente esté disponible.

Distingue los ejemplos visuales del Showcase de los ejemplos técnicos con código disponible.

No copies literalmente una plantilla ni reproduzcas un diseño completo. Utiliza las referencias como inspiración para construir una identidad visual propia.

Respeta las licencias de cualquier recurso o componente reutilizado.

### 2. Evitar la apariencia genérica de IA

NO quiero:
- Gradientes morados y azules utilizados indiscriminadamente.
- Fondos llenos de luces, partículas o efectos artificiales.
- Exceso de tarjetas idénticas con íconos.
- Bordes excesivamente redondeados en todos los elementos.
- Sombras o efectos glassmorphism innecesarios.
- Emojis reemplazando íconos profesionales.
- Animaciones sin propósito.
- Todas las secciones con exactamente la misma composición.
- Texto publicitario genérico.
- Una página que parezca una plantilla SaaS de inteligencia artificial.

En su lugar, quiero:
- Un diseño editorial universitario moderno.
- Identidad visual relacionada con la UTEM.
- Composiciones variadas pero coherentes.
- Tipografía profesional.
- Jerarquía visual sólida.
- Espaciado bien equilibrado.
- Elementos gráficos cuidadosamente seleccionados.
- Secciones informativas atractivas y fáciles de explorar.
- Una experiencia visual auténtica y apropiada para futuros estudiantes.

### 3. Dirección artística del proyecto

El sitio debe combinar tres conceptos:

**Universidad:** credibilidad, claridad, identidad institucional y seriedad académica.

**Tecnología:** innovación, programación, sistemas informáticos y desarrollo de soluciones.

**Juventud:** dinamismo, exploración, facilidad de navegación y una estética contemporánea.

El resultado debe recordar a una landing page universitaria desarrollada por un equipo profesional de UX/UI, no a una plantilla comercial genérica.

### 4. Originalidad de la interfaz

No quiero que simplemente coloques una barra de navegación, un hero y diez bloques repetidos.

Cada sección debe tener una composición visual adecuada a su contenido.

Por ejemplo:
- La malla curricular puede usar una estructura de exploración visual por semestres.
- El perfil de egreso puede mostrar competencias mediante bloques de diferentes proporciones.
- La sección laboral puede combinar descripciones con elementos gráficos informativos.
- La admisión puede utilizar una secuencia visual de pasos.
- Las preguntas frecuentes pueden aprovechar un diseño editorial limpio.

Prioriza la funcionalidad y la claridad por sobre los efectos visuales.

### 5. Investigación antes del diseño

Antes de implementar la interfaz:

1. Revisa referencias reales desarrolladas con Astro.
2. Selecciona tres ejemplos relevantes.
3. Identifica elementos visuales y técnicos que podrían servir.
4. Define un sistema de diseño propio para Ingeniería en Informática UTEM.
5. Implementa la landing page siguiendo ese sistema.

Si no tienes acceso a navegación web, no inventes haber revisado las referencias. Continúa con principios profesionales de diseño y deja constancia de esa limitación.

### 6. Calidad visual final

Al finalizar, revisa críticamente la interfaz como si fueras un diseñador UI/UX senior.

Comprueba que:
- El sitio tenga identidad propia.
- La interfaz no parezca generada automáticamente.
- Las secciones no sean repetitivas.
- La tipografía tenga una jerarquía clara.
- La experiencia móvil sea excelente.
- El diseño transmita profesionalismo.
- El contenido siga siendo el protagonista.
- Se respeten los requisitos académicos, técnicos y de accesibilidad.

No sacrifiques accesibilidad, rendimiento ni veracidad del contenido para mejorar únicamente la estética.

**Resultado esperado:** una landing page original, moderna y visualmente convincente, inspirada en buenas prácticas de sitios reales desarrollados con Astro, adaptada a Ingeniería en Informática UTEM.



---

## 5. ESTRUCTURA DE LA LANDING PAGE

El sitio debe contener todas las siguientes secciones.

### SECCIÓN 1: HEADER Y NAVEGACIÓN

Crear una barra de navegación moderna con:

- Nombre o identidad de la carrera.
- Enlaces internos a las principales secciones.
- Botón destacado "Cómo postular".
- Navegación responsiva para móviles.
- Estados de foco visibles.
- Enlace para saltar directamente al contenido principal.

Propuesta de enlaces:

- Inicio
- La carrera
- Qué aprenderás
- Campo laboral
- Admisión
- Preguntas frecuentes

El menú debe funcionar correctamente mediante navegación por anclas.

### SECCIÓN 2: HERO PRINCIPAL

Esta sección debe ser visualmente impactante.

Título propuesto:

"Transforma ideas en tecnología"

Subtítulo propuesto:

"Descubre Ingeniería en Informática en la UTEM y conoce las herramientas que te permitirán diseñar, desarrollar y gestionar soluciones tecnológicas."

El texto promocional puede ajustarse, pero cualquier afirmación verificable deberá tener respaldo.

Incluir:

- Nombre oficial de Ingeniería en Informática UTEM.
- Título profesional.
- Grado académico.
- Duración.
- Jornada.
- Botón "Explorar la carrera".
- Botón "Conoce la malla curricular".
- Recursos gráficos relacionados con tecnología.

La disposición puede utilizar dos columnas en escritorio y una columna en móvil.

### SECCIÓN 3: SOBRE LA CARRERA

Título propuesto:

"¿Qué es Ingeniería en Informática?"

Explicar con lenguaje accesible:

- Qué estudia esta carrera.
- Cuál es su propósito formativo.
- Qué problemas puede ayudar a resolver.
- Qué tipos de sistemas y tecnologías estudia.
- Diferencias frente a carreras afines.

Incluir una comparación clara con al menos dos carreras relacionadas, utilizando sus perfiles oficiales.

La comparación debe distinguir los hechos institucionales de la interpretación del equipo.

No afirmar superioridad de una carrera sobre otra.

### SECCIÓN 4: PERFIL DE EGRESO

Título propuesto:

"¿Qué podrás hacer como ingeniero informático?"

Presentar las competencias del perfil oficial de egreso con lenguaje sencillo.

Diseñar tarjetas visuales para aquellas áreas respaldadas por el perfil institucional, como:

- Desarrollo de software.
- Gestión de sistemas informáticos.
- Redes.
- Ciberseguridad.
- Soluciones tecnológicas.
- Trabajo colaborativo y gestión.

Cada tarjeta debe incluir:

- Ícono.
- Título.
- Explicación breve.
- Referencia a la fuente correspondiente.

No presentar como competencia oficial un contenido que la institución no respalde.

### SECCIÓN 5: PLAN DE ESTUDIOS

Esta debe ser una de las secciones más interesantes de la página.

Título propuesto:

"Explora lo que aprenderás"

Crear una representación moderna de la malla curricular oficial de Ingeniería en Informática UTEM.

Requisitos:

- Mostrar los ocho semestres.
- Organizar asignaturas por semestre.
- Permitir explorar los contenidos fácilmente.
- Mostrar créditos SCT solo cuando estén verificados en una fuente oficial.
- Incorporar las líneas formativas si están respaldadas por la malla.
- Utilizar tarjetas, columnas o un diseño de línea de tiempo.

Me gustaría implementar un filtro interactivo por semestre o año académico.

Esta puede ser la única isla interactiva del proyecto, siempre que su implementación sea ligera y esté justificada por la facilidad de navegación.

Preferir HTML y CSS cuando permitan resolver la interacción adecuadamente.

La información debe provenir de la malla oficial vigente, sin inventar asignaturas, prerrequisitos ni créditos.

### SECCIÓN 6: CAMPO LABORAL

Título propuesto:

"¿Dónde podrías trabajar?"

Crear tarjetas para visualizar áreas de desempeño, por ejemplo:

- Desarrollo de software.
- Infraestructura y redes.
- Ciberseguridad.
- Servicios cloud.
- Análisis de datos.
- Gestión de proyectos tecnológicos.

Verificar que las áreas mostradas estén respaldadas por el perfil profesional o fuentes confiables.

Agregar indicadores de empleabilidad e ingresos solo cuando exista información oficial verificable y pertinente para la carrera.

Toda cifra debe mostrar:

- Valor.
- Año del dato.
- Fuente.
- Enlace a la referencia.

Consultar fuentes como Mi Futuro y SIES.

No inventar porcentajes de empleabilidad, sueldos ni estadísticas.

Si una cifra no está verificada, omitirla temporalmente y conservar la estructura preparada para agregarla posteriormente.

### SECCIÓN 7: RESPALDO INSTITUCIONAL

Título propuesto:

"Una formación con respaldo institucional"

Incluir información verificable relacionada con:

- Universidad Tecnológica Metropolitana.
- Estado de acreditación institucional.
- Certificación de la carrera, si corresponde.
- Infraestructura académica.
- Laboratorios o recursos disponibles.
- Cuerpo académico, cuando exista información oficial pertinente.

Distinguir claramente acreditación institucional de certificación o acreditación de carrera.

Mostrar fechas y organismo responsable cuando corresponda.

No inventar laboratorios, equipamientos o reconocimientos.

### SECCIÓN 8: ADMISIÓN

Título propuesto:

"Tu camino hacia Ingeniería en Informática"

Diseñar un apartado práctico e intuitivo con:

- Vías de admisión.
- Requisitos de postulación.
- Ponderaciones PAES verificadas.
- Puntajes mínimos, si corresponden.
- Fechas relevantes del proceso claramente identificado.
- Enlaces oficiales.

Si los requisitos cambian entre procesos de admisión, indicar el proceso correspondiente.

Incluir un botón principal:

"Revisar admisión oficial UTEM"

Este botón debe dirigir a una URL real y verificada.

### SECCIÓN 9: PREGUNTAS FRECUENTES

Implementar entre cinco y ocho preguntas relevantes para futuros postulantes.

Las preguntas definitivas se obtendrán de una investigación de audiencia posterior.

Mientras tanto, crear una estructura editable con preguntas iniciales sujetas a validación.

Ejemplos:

- ¿Necesito saber programar antes de ingresar?
- ¿Cuánto dura la carrera?
- ¿Qué título obtengo?
- ¿Dónde se imparte?
- ¿Qué áreas estudiaré?
- ¿Cómo puedo postular?
- ¿Dónde encuentro la malla oficial?

No inventar respuestas institucionales.

Utilizar acordeones accesibles mediante `details` y `summary` de HTML cuando sea posible, sin JavaScript innecesario.

### SECCIÓN 10: REFERENCIAS

Crear un apartado denominado:

"Fuentes y referencias"

Debe contener las referencias oficiales utilizadas en el sitio.

Requisitos:

- Referencias en formato APA 7.
- URLs verificables.
- Fecha o año del documento cuando corresponda.
- Fecha de consulta cuando sea pertinente.
- Identificadores internos para conectar las citas del contenido.

Cada cifra o afirmación verificable del sitio debe contar con una cita enlazada a la referencia correspondiente.

Debe resultar visualmente ordenado y legible.

### SECCIÓN 11: FOOTER

Incluir:

- Nombre de la carrera.
- Universidad.
- Enlace al sitio institucional.
- Enlace a admisión.
- Enlace a las referencias.
- Identificación del sitio como proyecto académico estudiantil y no como página oficial de la universidad.

No inventar correos, teléfonos ni datos de contacto.

---

## 6. FUENTES OFICIALES

Priorizar las siguientes fuentes:

**Universidad Tecnológica Metropolitana**

[https://utem.cl/carreras/ingenieria-en-informatica/](https://utem.cl/carreras/ingenieria-en-informatica/)

**Documentación oficial de Astro**

[https://docs.astro.build/](https://docs.astro.build/)

**Comisión Nacional de Acreditación**

[https://www.cnachile.cl/](https://www.cnachile.cl/)

**Mi Futuro**

[https://www.mifuturo.cl/](https://www.mifuturo.cl/)

**DEMRE**

[https://demre.cl/](https://demre.cl/)

**Acceso Educación Superior**

[https://acceso.mineduc.cl/](https://acceso.mineduc.cl/)

También pueden utilizarse documentos oficiales de la malla curricular, resoluciones universitarias y estadísticas SIES.

Reglas:

1. Verificar la información antes de incorporarla.
2. Priorizar fuentes primarias.
3. No inventar datos.
4. No utilizar cifras sin indicar año y fuente.
5. No generar testimonios ficticios.
6. No utilizar frases como "la mejor universidad" o "empleabilidad garantizada".
7. Conservar referencias estructuradas para generar sus citas.
8. Si no puedes verificar un dato, no lo presentes como verdadero.
9. Mantener una lista de los datos pendientes de verificación.

---

## 7. ARQUITECTURA DEL PROYECTO

Utilizar una estructura similar a esta, adaptándola a las APIs actuales de Astro:

```text
ingenieria-informatica-utem/
├── public/
│   ├── images/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── SobreCarrera.astro
│   │   ├── PerfilEgreso.astro
│   │   ├── Malla.astro
│   │   ├── CampoLaboral.astro
│   │   ├── Respaldo.astro
│   │   ├── Admision.astro
│   │   ├── FAQ.astro
│   │   ├── Referencias.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── malla/
│   │   ├── campo-laboral/
│   │   ├── faq/
│   │   └── referencias/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   ├── lib/
│   └── content.config.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

El objetivo es mantener el contenido separado del diseño.

La página principal debe componer los componentes, evitando concentrar todo el sitio en un archivo enorme.

### Colecciones de contenido

Implementar colecciones tipadas para:

- Malla curricular.
- Campo laboral.
- Preguntas frecuentes.
- Referencias.

Utilizar `defineCollection`, los loaders oficiales vigentes y esquemas con Zod.

Los datos deben cargarse desde Markdown o JSON.

Cada esquema debe definir campos obligatorios y tipos explícitos.

Si un archivo contiene información incompatible con su esquema, la compilación debe fallar.

No dejar validaciones decorativas que no se ejecuten realmente.

### TypeScript

Utilizar modo strict y declarar los tipos de:

- Props de componentes.
- Estructuras de datos.
- Funciones auxiliares.
- Datos derivados de colecciones.

No utilizar `any` ni desactivar reglas para esconder errores.

---

## 8. RESPONSIVIDAD

Diseñar la página con enfoque mobile-first.

Verificar especialmente estos anchos:

- 360 px: teléfono móvil.
- 768 px: tablet.
- 1280 px: escritorio.

También comprobar tamaños intermedios.

Condiciones:

- No debe aparecer scroll horizontal accidental.
- Los textos no deben desbordarse.
- La navegación móvil debe funcionar.
- Las tarjetas deben adaptarse a cada resolución.
- La malla curricular debe seguir siendo legible en teléfonos.
- Los botones deben tener tamaños táctiles adecuados.
- Las imágenes deben redimensionarse correctamente.

Priorizar la experiencia móvil sin sacrificar el diseño de escritorio.

---

## 9. ACCESIBILIDAD

Cumplir los criterios aplicables de WCAG 2.2 nivel AA.

Implementar:

- HTML semántico.
- Un encabezado H1 principal.
- Jerarquía correcta de H2 y H3.
- Navegación por teclado.
- Indicadores de foco visibles.
- Contraste suficiente.
- Textos alternativos.
- Enlaces descriptivos.
- Etiquetas accesibles.
- Estructuras fáciles de comprender.
- Interacciones que no dependan exclusivamente del mouse.
- Respeto por `prefers-reduced-motion`.

El objetivo es alcanzar al menos 90/100 en CompliaScan, además de verificar manualmente los aspectos que una herramienta automática no puede evaluar.

Herramienta:

[https://compliascan.com/](https://compliascan.com/)

No declares cumplimiento total sin realizar las verificaciones.

---

## 10. SEO

Implementar:

- Título descriptivo.
- Meta description.
- Open Graph.
- Imagen social cuando exista un recurso autorizado.
- Favicon.
- Canonical URL cuando se conozca la dirección pública definitiva.
- `lang="es-CL"`.
- Sitemap XML.
- Estructura correcta de encabezados.
- Metadatos centralizados en el layout.

No inventar la URL definitiva del sitio.

Si todavía no existe dominio público, dejar la configuración preparada y claramente identificada para completarla antes del despliegue.

---

## 11. RENDIMIENTO

La pauta exige un puntaje mínimo de 90 en las cuatro categorías de Lighthouse:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Optimizar:

- Peso y dimensiones de imágenes.
- Carga de fuentes.
- CSS.
- JavaScript enviado al navegador.
- Recursos innecesarios.
- Estabilidad visual.
- Tiempo de carga.

Priorizar HTML estático generado por Astro.

No añadir librerías grandes para interacciones que pueden resolverse con HTML y CSS.

Herramienta de evaluación:

[https://pagespeed.web.dev/](https://pagespeed.web.dev/)

Los puntajes deben comprobarse realmente cuando el sitio esté disponible. No inventar resultados.

---

## 12. EXPERIENCIA DE USUARIO

El diseño debe tener una secuencia lógica:

1. Captar la atención del visitante.
2. Explicar qué es la carrera.
3. Mostrar las competencias que desarrollará.
4. Permitir explorar la malla.
5. Presentar posibilidades laborales.
6. Mostrar respaldo institucional.
7. Explicar cómo postular.
8. Resolver preguntas frecuentes.
9. Permitir consultar las fuentes.

Agregar botones de navegación contextual entre secciones cuando realmente faciliten el recorrido.

Evitar que el visitante tenga que buscar información importante durante demasiado tiempo.

La página debe ofrecer una experiencia coherente, clara y profesional.

---

## 13. PREPARACIÓN PARA PUBLICACIÓN

La landing page deberá poder desplegarse en un hosting estático compatible con Astro, preferentemente Netlify.

Requisitos:

- Generación estática correcta.
- Sin dependencias de servidores propios.
- Compilación de producción funcional.
- Recursos con rutas correctas.
- Compatibilidad con publicación futura desde GitHub.

Por ahora no necesitas publicar el sitio ni crear cuentas externas.

No realices push a GitHub sin autorización explícita. Tampoco modifiques archivos ajenos al proyecto.

Deja el proyecto preparado para conectar posteriormente el repositorio y desplegarlo.

---

## 14. FORMA DE TRABAJO

Quiero que trabajes directamente sobre los archivos del proyecto.

### Paso 1: inspección

Revisa primero el directorio actual.

Si ya existe un proyecto:

- Identifica su estructura.
- Conserva el trabajo existente.
- No sobrescribas archivos innecesariamente.

Si está vacío:

- Inicializa el proyecto Astro.
- Configura TypeScript strict.
- Instala las dependencias necesarias.

### Paso 2: arquitectura

Crea:

- Layout principal.
- Sistema global de estilos.
- Componentes reutilizables.
- Colecciones de contenido.
- Esquemas de validación.

### Paso 3: implementación visual

Desarrolla todas las secciones indicadas.

Prioriza primero la estructura y luego los detalles de diseño.

El sitio debe verse completo, aunque algunos datos institucionales requieran verificación posterior.

Cuando falten datos:

- No inventes cifras ni afirmaciones.
- No publiques datos ficticios como verdaderos.
- Usa una solución visual honesta y discreta.
- Registra qué información falta confirmar.

### Paso 4: contenido

Integra solamente información verificable.

Incluye citas enlazadas y referencias.

Evita mezclar datos institucionales con interpretaciones propias sin distinguirlos.

### Paso 5: comprobaciones

Ejecuta, cuando el entorno lo permita:

- Instalación de dependencias.
- `astro check` o comando equivalente configurado.
- Build de producción.
- Revisión de errores TypeScript.
- Revisión básica de recursos y enlaces.
- Comprobación de comportamiento responsivo.

Corrige los problemas detectados.

No afirmes haber realizado pruebas que no pudiste ejecutar.

### Paso 6: resultado final

Una vez terminado, informa:

- Qué archivos creaste.
- Qué funcionalidades implementaste.
- Qué comandos ejecutaste.
- Si la compilación terminó correctamente.
- Qué datos están pendientes de verificación.
- Cómo levantar el servidor local.
- Qué falta para publicar el sitio.

---

## 15. RESTRICCIONES ACADÉMICAS IMPORTANTES

El profesor permite utilizar inteligencia artificial, pero los estudiantes deberán comprender y defender el código generado.

Por eso:

- Utiliza soluciones claras y justificables.
- Evita arquitecturas excesivamente complejas.
- No introduzcas tecnologías innecesarias.
- Mantén funciones y componentes comprensibles.
- Escribe código legible.
- Incluye comentarios útiles cuando exista lógica no evidente.
- Facilita la revisión posterior de cada archivo.

No crees todavía los documentos académicos `INFORME.md`, la matriz de fuentes, las encuestas ni los anexos.

El `README.md` académico también se preparará después.

Si es necesario registrar decisiones técnicas durante el desarrollo, entrégalas en tu respuesta final sin crear esos documentos.

---

## 16. CRITERIO DE FINALIZACIÓN

Consideraré que esta primera etapa está terminada cuando:

1. El proyecto Astro esté configurado correctamente.
2. La landing page contenga todas las secciones obligatorias.
3. El diseño sea profesional y coherente.
4. El sitio funcione en móvil, tablet y escritorio.
5. Los componentes estén separados correctamente.
6. TypeScript esté configurado en modo strict.
7. Las colecciones de contenido estén tipadas y validadas.
8. Las citas y referencias estén integradas.
9. No existan afirmaciones institucionales inventadas.
10. La compilación de producción funcione correctamente.
11. El código esté preparado para publicación posterior.
12. Los elementos pendientes estén identificados claramente.

**COMIENZA AHORA.**

Primero inspecciona el directorio del proyecto y luego procede con la implementación completa de la landing page.

No te limites a explicar cómo hacerlo: realiza los cambios en los archivos y verifica el resultado.

Trabaja de forma autónoma dentro de los límites establecidos, tomando decisiones de implementación razonables y priorizando los requisitos de la pauta académica.
``````

### P-002 — solicitud S1/241

Procedencia: S1, registro 241. Ediciones registradas en S1: 282, 303, 314, 331, 356, 379.

``````text
[https://www.uai.cl/](https://www.uai.cl/)   me llama la atencion el carrusel principal con las imagenes, tambien que al ir bajando como que hay una transcicion cuando aparece la informacion y cosas asi, tambien hay una idea que me gustaria implementarle al apartado de la malla, mi idea seria dejarla como esta imagen de la malla que te mandare, es una imagen de referencia ya que no salen todos los ramos, mi idea es que esten separados asi y que cuando uno pinche año 1 por ejemplo te salgan en verde los ramos de ese año y los demas en gris pero como dandole una sombra nomas, luego si pinchas el año 2 te aparezcan tachados los ramos del primer año en verde los del dos y los demas para adelante con una sombra gris algo asi quiero de un principio
``````

### P-003 — solicitud S1/462

Procedencia: S1, registro 462. Ediciones registradas en S1: 481.

``````text
perfecto ahora la malla en vez de seleccionar por año me gustaria que fuera por semestre para que sea mas individual
``````

### P-004 — solicitud S1/516

Procedencia: S1, registro 516. Ediciones registradas en S1: 606.

``````text
puedes poner la imagen del logo de la utem al costado izquierdo de la banda superior donde dice informatica, y tambein que en vez de informatica diga ingenieria informatica UTEM
``````

### P-005 — solicitud S1/639

Procedencia: S1, registro 639. Ediciones registradas en S1: 674.

``````text
puedes agregar al final de la hoja abajo unos logos interactivos con las redes socialess de la universidad como se ve en la foto que te proporcione si quieres puedes buscarlo en la pagina oficial de la utem apra saber cual es el link oficial de cada red social
``````

### P-006 — solicitud S1/928

Procedencia: S1, registro 928; adjunto 76df4924-6edd-4fe3-bd57-71fdc6012c80/Texto pegado.txt. Ediciones registradas en S1: 955.

``````text
# ETAPA 1 — MEJORAS CONTROLADAS DE LA LANDING PAGE DE INGENIERÍA EN INFORMÁTICA

Actúa como desarrollador frontend senior especializado en Astro, TypeScript y diseño UX/UI.

Vamos a continuar desarrollando nuestra landing page académica de Ingeniería en Informática de la Universidad Tecnológica Metropolitana (UTEM).

El proyecto ya está construido y funciona. Hemos realizado una auditoría comparativa con la página de Ingeniería en Computer Science de la UAI y revisado visualmente nuestra implementación.

La conclusión es que el diseño actual debe conservarse.

## OBJETIVO DE ESTA EJECUCIÓN

Implementa únicamente tres mejoras:

1. Ajustar el nombre de la carrera en la cabecera.
2. Completar la ficha académica con dos datos existentes.
3. Agregar una navegación compacta de accesos rápidos.

No quiero una reconstrucción, un rediseño general ni una nueva auditoría.

Tengo un presupuesto limitado de uso de Codex, por lo que debes trabajar de manera eficiente y concentrarte exclusivamente en estas modificaciones.

---

## 1. REVISIÓN INICIAL

Antes de editar:

- Identifica el directorio actual del proyecto.
- Revisa el componente de cabecera.
- Revisa el componente del hero y de la ficha académica.
- Identifica dónde se centralizan los datos institucionales.
- Revisa `index.astro` para conocer el orden real de las secciones.
- Identifica los IDs de las secciones existentes.
- Consulta los estilos relevantes para los componentes que modificarás.

No vuelvas a analizar todos los componentes ni a realizar investigaciones extensas.

Revisa el estado de Git y conserva todos los cambios preexistentes.

No instales dependencias nuevas.

---

## 2. PRIMERA MEJORA: NOMBRE DE LA CARRERA

Actualmente la cabecera presenta el nombre de Ingeniería en Informática junto con la palabra «UTEM».

Quiero separar la identidad de la carrera de la institución.

### Nombre principal

**Ingeniería en Informática**

### Identidad institucional

**Universidad Tecnológica Metropolitana**

Mantén el logotipo de UTEM tal como está.

El nombre de la carrera no debe llevar «UTEM» inmediatamente al final, porque la universidad ya está identificada mediante su logotipo y nombre institucional.

### Restricciones

- Conserva el diseño de la cabecera.
- Mantén la tipografía y jerarquía existentes.
- Conserva el logo.
- No cambies el menú.
- No alteres la altura de la cabecera innecesariamente.
- Comprueba que el nombre siga siendo legible en móvil.
- No elimines las menciones a UTEM que correspondan a la universidad.
- No modifiques el título expresivo «Transforma ideas en tecnología».

El título SEO puede mantener la estructura:

`Ingeniería en Informática | UTEM`

Realiza exclusivamente los cambios necesarios en la identificación visual de la carrera.

---

## 3. SEGUNDA MEJORA: COMPLETAR LA FICHA ACADÉMICA

Actualmente, debajo del hero principal existe una ficha académica con cuatro elementos:

1. Duración: 8 semestres.
2. Jornada: Diurna.
3. Título profesional.
4. Grado académico.

Quiero conservar esos cuatro elementos y agregar:

5. Sede o campus.
6. Código DEMRE.

### Reutilización de datos

El sitio ya muestra la sede en la sección «Respaldo institucional» y el código DEMRE en «Admisión 2027».

Busca los datos existentes y reutilízalos.

No crees valores duplicados innecesariamente.

No inventes información, modifiques cifras ni cambies referencias.

Si la sede y el código se encuentran centralizados en `site.ts`, consúmelos desde allí.

Mantén las citas oficiales que respaldan cada dato.

### Diseño

La ficha debe mantenerse compacta y coherente con el diseño actual.

No quiero seis tarjetas grandes independientes.

Puedes reorganizar los elementos mediante una cuadrícula responsiva.

Prioriza:

- Legibilidad.
- Espaciado equilibrado.
- Separadores discretos.
- Jerarquía de datos clara.
- Distribución apropiada para escritorio, tablet y móvil.

No fuerces seis columnas si perjudican la lectura.

Evita aumentar excesivamente la altura de la ficha.

No modifiques la sección de respaldo institucional ni la sección de admisión. Solamente reutiliza los datos que ya contienen.

---

## 4. TERCERA MEJORA: ACCESOS RÁPIDOS

Quiero incorporar un bloque compacto de navegación inmediatamente después de la ficha académica y antes de «La carrera».

Esta idea está inspirada en la arquitectura de información de páginas universitarias como la UAI.

No debes copiar su diseño ni sus colores.

### Encabezado propuesto

**¿Qué te gustaría conocer?**

### Cuatro accesos

1. Malla curricular.
2. Perfil de egreso.
3. Admisión 2027.
4. Preguntas frecuentes.

Cada elemento debe ser un enlace interno hacia una sección ya existente.

### MUY IMPORTANTE: ACLARACIÓN SOBRE LA MALLA

Nuestra landing ya contiene dos elementos relacionados con la malla curricular:

**A. Malla interactiva existente**

Sección titulada «Un camino. Ocho semestres», con botones para seleccionar semestres y visualizar las asignaturas.

**B. Malla oficial en PDF**

Enlace «Consultar malla oficial (PDF)».

Ambos ya funcionan y deben conservarse.

El nuevo acceso rápido «Malla curricular» debe llevar mediante un enlace interno a la sección interactiva existente.

NO debe:
- Crear una nueva malla.
- Reconstruir la malla interactiva.
- Modificar sus asignaturas.
- Alterar los filtros de semestre.
- Crear otro botón de descarga del PDF.
- Cambiar el enlace actual al PDF oficial.
- Modificar los estados visuales de semestres anteriores, seleccionados y posteriores.

Utiliza el ID real de la sección existente.

### Diseño del bloque de accesos

Quiero un diseño profesional, discreto y compacto.

Requisitos:
- Coherente con la identidad visual actual.
- Sin grandes tarjetas innecesarias.
- Con tipografía existente.
- Íconos únicamente si aportan claridad.
- Buena distribución en escritorio.
- Adaptación a tablet y móvil.
- Estados hover y focus visibles.
- Navegación accesible por teclado.
- Sin incorporar JavaScript adicional.

Puedes crear un componente `AccesosRapidos.astro` si es apropiado.

Si existe un componente reutilizable equivalente, úsalo antes de crear uno nuevo.

### Comportamiento

Al seleccionar cualquier acceso:

- La página debe desplazarse hacia la sección correspondiente.
- No deben abrirse páginas nuevas.
- No debe recargarse innecesariamente el sitio.
- El título de destino no debe quedar oculto detrás del header fijo.

Para ello, utiliza navegación con anclas y CSS nativo.

Comprueba que los cuatro enlaces apunten a IDs reales.

---

## 5. PRESERVAR EL DISEÑO ACTUAL

Es fundamental mantener la identidad visual que ya construimos.

Conservar:
- Colores institucionales actuales.
- Tipografías.
- Estilo editorial.
- Fotografías y carrusel.
- Títulos expresivos de las secciones.
- Composiciones existentes.
- Malla curricular.
- Perfil de egreso.
- Campo laboral.
- Respaldo institucional.
- Admisión.
- Preguntas frecuentes.
- Referencias y créditos.
- Footer.

No modifiques el funcionamiento de estos componentes.

Los cambios deben limitarse a la cabecera, la ficha académica, el nuevo bloque de accesos y los estilos estrictamente necesarios.

Si necesitas tocar archivos compartidos, realiza solamente modificaciones localizadas.

---

## 6. COMPROBACIONES

Después de implementar los tres cambios:

1. Ejecuta el chequeo existente de Astro y TypeScript.
2. Ejecuta una compilación de producción.
3. Corrige los errores que hayas introducido.
4. Verifica que los cuatro enlaces internos tengan destinos válidos.
5. Confirma que no existan desbordamientos horizontales evidentes.
6. Comprueba la distribución en 360, 768 y 1280 px si tienes herramientas visuales disponibles.
7. Confirma que la malla interactiva no haya sido modificada.
8. Revisa el diff final para asegurar que no existan cambios fuera de alcance.

Si alguna prueba no puede ejecutarse, informa la limitación sin inventar resultados.

No es necesario repetir una auditoría completa de Lighthouse en esta etapa.

---

## 7. CONTROL DEL CONSUMO DE CODEX

Esta es una tarea de alcance limitado.

Para trabajar eficientemente:

- Inspecciona solo archivos relevantes.
- No realices búsquedas web extensas.
- No vuelvas a analizar toda la rúbrica.
- No reconstruyas componentes que ya funcionan.
- No instales paquetes adicionales.
- No generes documentación académica.
- No repitas pruebas que ya hayan terminado correctamente.
- Evita ciclos adicionales de rediseño.
- No realices mejoras que no estén expresamente solicitadas.

No modifiques `README.md` ni `INFORME.md`.

No hagas commits ni push a GitHub sin autorización.

Si descubres problemas ajenos a estas tres tareas, regístralos en tu respuesta final, pero no los soluciones durante esta ejecución.

---

## 8. RESULTADO FINAL

Al terminar, responde brevemente:

1. Qué archivos modificaste.
2. Qué cambiaste en la cabecera.
3. Cómo quedó organizada la ficha de seis datos.
4. Cómo implementaste los cuatro accesos rápidos.
5. Qué comprobaciones ejecutaste y sus resultados.
6. Si quedó algún problema pendiente.

No necesito una explicación extensa de toda la arquitectura.

**COMIENZA AHORA Y REALIZA ÚNICAMENTE ESTAS TRES MEJORAS, CONSERVANDO EL RESTO DEL PROYECTO.**
``````

### P-007 — solicitud S1/1031

Procedencia: S1, registro 1031. Ediciones registradas en S1: 1051.

``````text
sacale este nombre ya que en el logo ya esta el nombre y como que se repite
``````

### P-008 — solicitud S1/1073

Procedencia: S1, registro 1073. Ediciones registradas en S1: 1130, 1137.

``````text
# ETAPA 2 — MEJORAS DE EXPERIENCIA DE USUARIO UTEM

Continúa trabajando sobre la landing page existente de Ingeniería en Informática UTEM, desarrollada con Astro y TypeScript.

La Etapa 1 ya fue implementada y debe conservarse completamente.

Quiero realizar únicamente tres mejoras pequeñas para facilitar la experiencia de futuros estudiantes.

No rediseñes el sitio ni modifiques funcionalidades que ya funcionan.

## MEJORA 1: COMPARACIÓN ENTRE CARRERAS

En `SobreCarrera.astro` ya existe una comparación con dos carreras afines dentro de un desplegable.

Actualmente la comparación no es inmediatamente visible.

Quiero que agregues un resumen breve y visible de las diferencias principales antes del desplegable existente.

Requisitos:

- Reutilizar exclusivamente la información y fuentes verificadas que ya están en el proyecto.
- Mantener el desplegable para consultar información detallada.
- No duplicar párrafos extensos.
- Conservar el diseño actual.
- Mantener lenguaje neutral, sin afirmar que una carrera es mejor que otra.
- No inventar diferencias académicas.

El resultado debe permitir que un estudiante de enseñanza media entienda rápidamente las diferencias principales.

## MEJORA 2: PREGUNTAS FRECUENTES

Revisa las preguntas frecuentes actuales.

En la auditoría anterior detectamos una referencia al título antiguo «Explora lo que aprenderás».

La sección actualmente se llama «Un camino. Ocho semestres».

Corrige las referencias desactualizadas utilizando los nombres y enlaces internos reales del proyecto.

Revisa que las respuestas sean claras y que no existan enlaces internos incorrectos.

No agregues nuevas preguntas ni modifiques las respuestas que ya sean correctas.

Conserva el funcionamiento de los acordeones HTML.

## MEJORA 3: BECAS, ARANCELES Y ORIENTACIÓN

En la sección de Admisión, incorpora un bloque pequeño y visualmente integrado llamado:

«Becas, financiamiento y orientación»

Debe contener accesos a:

- Información oficial de becas y beneficios UTEM.
- Información oficial de aranceles.
- Canal oficial de orientación o consultas de admisión.

Busca y verifica las URLs oficiales correspondientes.

No inventes cifras, beneficios, contactos ni montos.

No es necesario crear una sección nueva independiente. Integra esta información al final de la sección de admisión existente.

Mantén el diseño y estilo visual actual.

## RESTRICCIONES

- No modificar el hero ni el carrusel.
- No modificar la ficha académica ni los accesos rápidos de la Etapa 1.
- No modificar la malla curricular ni el PDF oficial.
- No cambiar colores ni tipografías.
- No instalar dependencias.
- No agregar JavaScript innecesario.
- No modificar otras secciones.
- No realizar cambios fuera de estos tres puntos.
- No hacer push ni commits.
- No crear documentación académica.

## VERIFICACIONES

Al finalizar:

1. Ejecuta Astro Check y la compilación de producción.
2. Verifica que no existan enlaces internos rotos.
3. Comprueba que los nuevos elementos sean responsivos.
4. Revisa que no haya cambios fuera del alcance solicitado.

## CONSUMO

Tengo uso limitado de Codex.

Trabaja exclusivamente sobre los archivos necesarios, evita auditorías generales y no realices investigaciones extensas que no estén relacionadas con las URLs oficiales necesarias.

Al terminar, entrega un resumen breve de los cambios y de las pruebas realizadas.

**Comienza implementando estas tres mejoras, sin alterar el resto del proyecto.**
``````

### P-009 — solicitud S1/1198

Procedencia: S1, registro 1198. Ediciones registradas en S1: 1211, 1218.

``````text
# MEJORA PUNTUAL — COMPARACIÓN ENTRE CARRERAS

Continúa trabajando sobre el proyecto Astro de Ingeniería en Informática UTEM.

Quiero mejorar exclusivamente la presentación visual de la comparación entre carreras que actualmente aparece dentro del componente `SobreCarrera.astro`.

La sección ya funciona, pero su presentación actual es poco clara para un visitante que entra por primera vez.

## PROBLEMA ACTUAL

Debajo de los dos bloques que explican qué es Ingeniería en Informática aparece un apartado titulado «DIFERENCIAS EN BREVE».

Actualmente las tres carreras se presentan horizontalmente, pero no existe una jerarquía suficientemente clara para distinguir la carrera principal de las carreras relacionadas.

La comparación parece un bloque secundario añadido al final, en lugar de una explicación útil para el futuro postulante.

## OBJETIVO

Rediseñar solamente este apartado para que cualquier estudiante de enseñanza media comprenda inmediatamente:

1. Que está explorando Ingeniería en Informática.
2. Que las otras dos son carreras distintas, pero relacionadas.
3. Cuáles son sus principales diferencias.
4. Que puede consultar información más detallada en el desplegable existente.

## NUEVA ESTRUCTURA

### Encabezado principal

Utilizar el título:

«¿En qué se diferencia Ingeniería en Informática de otras carreras?»

Debajo agregar una introducción breve:

«Si te interesa la tecnología, probablemente hayas visto carreras con nombres similares. Compara sus enfoques para entender mejor cuál se relaciona con tus intereses.»

### Primer bloque: carrera principal

Destacar visualmente:

**LA CARRERA QUE ESTÁS EXPLORANDO**

Ingeniería en Informática

Mostrar su duración y enfoque académico utilizando los datos y referencias que ya existen.

Debe distinguirse visualmente de las otras carreras, pero sin utilizar efectos exagerados.

### Segundo bloque: carreras relacionadas

Agregar un pequeño encabezado:

**OTRAS CARRERAS RELACIONADAS**

Mostrar:

- Ingeniería Civil en Computación.
- Ingeniería Civil en Ciencia de Datos.

Cada carrera debe mostrar su nombre completo, duración y enfoque principal.

No utilizar abreviaciones como «Ing. Civil» en los títulos.

En escritorio, las dos carreras relacionadas pueden aparecer en columnas equilibradas.

En móvil, deben organizarse verticalmente para facilitar la lectura.

### Tercer bloque: información detallada

Conservar el desplegable que ya existe.

Cambiar su título a:

«Conoce las diferencias en detalle»

No eliminar el contenido, las fuentes ni las funcionalidades actuales de este desplegable.

## DISEÑO VISUAL

Conservar completamente la identidad visual existente:

- Paleta de colores.
- Tipografías.
- Estilo editorial.
- Separadores.
- Espaciados generales.
- Lenguaje visual de la landing.

La nueva comparación debe sentirse integrada con el resto de la página.

No quiero una sección excesivamente grande ni tarjetas genéricas de estilo SaaS.

Utiliza una composición limpia y profesional, con una diferencia visual clara entre la carrera principal y las alternativas.

Agrega suficiente separación respecto a los dos bloques superiores.

## RESTRICCIONES

- No modificar los dos bloques superiores de «La carrera».
- No modificar el contenido académico ni sus valores.
- No inventar diferencias entre carreras.
- Reutilizar los datos y las citas existentes.
- No modificar el hero ni la malla curricular.
- No modificar otras secciones.
- No instalar dependencias.
- No agregar JavaScript innecesario.
- No modificar archivos de documentación.
- No crear commits ni realizar push.

## COMPROBACIONES

Después del cambio:

1. Ejecuta las verificaciones existentes de Astro y TypeScript.
2. Ejecuta el build.
3. Verifica que la comparación sea legible en móvil y escritorio.
4. Comprueba que el desplegable siga funcionando.
5. Revisa que las citas existentes se conserven.
6. Confirma que los cambios estén limitados al apartado solicitado.

No realices auditorías extensas ni cambios fuera del alcance.

Al finalizar, resume brevemente los archivos modificados y las comprobaciones realizadas.

**Implementa únicamente esta mejora.**
``````

### P-010 — solicitud S1/1276

Procedencia: S1, registro 1276. Ediciones registradas en S1: 1303.

``````text
# MEJORA PUNTUAL — COMPARACIÓN DETALLADA ENTRE CARRERAS

Continúa trabajando sobre el proyecto Astro de Ingeniería en Informática UTEM.

Quiero realizar únicamente dos modificaciones dentro de la sección de comparación entre carreras del componente `SobreCarrera.astro`.

La presentación general ya fue mejorada y quiero conservarla.

## 1. AMPLIAR LA INFORMACIÓN DEL DESPLEGABLE

Actualmente existe el apartado:

**«Conoce las diferencias en detalle»**

Este apartado muestra información demasiado general y repite buena parte de la comparación resumida que aparece justo encima.

Quiero que el contenido sea más informativo y permita entender las diferencias reales entre las tres carreras.

### Carreras que debemos comparar

1. Ingeniería en Informática.
2. Ingeniería Civil en Computación mención Informática.
3. Ingeniería Civil en Ciencia de Datos.

### Nueva organización

Conserva la distribución de tres columnas en escritorio.

Para cada carrera, presenta:

**Enfoque principal:** una explicación breve de qué se centra en estudiar o desarrollar la carrera.

**Qué aprenderás:** menciona los principales conocimientos o habilidades que la distinguen, según su plan de estudios o perfil de egreso oficial.

**Diferencia principal:** explica de manera sencilla qué la diferencia de las otras alternativas, sin establecer rankings ni afirmar superioridad.

### Extensión

- Aproximadamente 50–70 palabras por carrera, excluyendo títulos.
- Frases cortas y lenguaje sencillo.
- Evitar párrafos largos.
- No repetir únicamente «software, sistemas y redes».
- Evitar descripciones genéricas que puedan servir para cualquiera de las tres carreras.
- No inventar contenidos académicos ni campos laborales.

### Fuentes

Utiliza los perfiles de egreso y planes de estudio oficiales que ya están referenciados en nuestro proyecto.

Si necesitas consultar información complementaria, utiliza exclusivamente fuentes institucionales verificables.

Conserva las citas existentes y agrega las referencias necesarias cuando incorpores información nueva.

No presentes interpretaciones del equipo como afirmaciones oficiales de la universidad.

### Diseño

Mantén:

- Las tres columnas actuales.
- Los nombres completos de las carreras.
- La duración de cada carrera.
- La tipografía.
- Los colores institucionales.
- Los separadores verticales.
- El funcionamiento del acordeón.

Organiza los tres elementos mediante pequeñas etiquetas en negrita y textos breves.

En dispositivos móviles, las columnas deben apilarse verticalmente.

No agregues grandes tarjetas ni efectos visuales adicionales.

El resultado debe sentirse integrado con el diseño editorial actual.

## 2. ELIMINAR SEPARADORES HORIZONTALES DUPLICADOS

En la captura actual se observan varias líneas horizontales entre el bloque «Otras carreras relacionadas» y el desplegable «Conoce las diferencias en detalle».

Quiero eliminar las líneas redundantes para que la transición entre ambos apartados sea más limpia.

### Resultado esperado

- Conservar únicamente un separador horizontal discreto entre la comparación resumida y el desplegable detallado, si resulta necesario.
- Eliminar las líneas horizontales duplicadas.
- Mantener un espacio vertical equilibrado.
- No eliminar los separadores verticales entre las carreras.
- Conservar los bordes que delimitan correctamente el acordeón y el resto de la página.

Revisa si las líneas proceden de bordes de componentes, elementos `hr` o pseudoelementos CSS, y corrige únicamente los estilos responsables.

## 3. RESTRICCIONES

- No modificar el resto de la sección «La carrera».
- No cambiar la comparación resumida superior.
- No modificar el hero, la malla ni otras secciones.
- No alterar los colores ni la tipografía.
- No instalar dependencias.
- No agregar JavaScript.
- No crear documentación.
- No realizar commits ni push.

## 4. VERIFICACIÓN

Al finalizar:

1. Verifica que el acordeón abra y cierre correctamente.
2. Comprueba que los textos nuevos estén respaldados por fuentes.
3. Verifica que la comparación sea legible en móvil y escritorio.
4. Confirma que ya no existan líneas horizontales duplicadas.
5. Ejecuta Astro Check y el build.
6. Revisa que los cambios se limiten al apartado solicitado.

Trabaja de manera eficiente, sin realizar una auditoría general del proyecto.

**Implementa únicamente estas dos mejoras y entrega un resumen breve de los cambios.**
``````

### P-011 — solicitud S1/1354

Procedencia: S1, registro 1354. Ediciones registradas en S1: 1367.

``````text
quita esto y deja lo demas tal cual 

"Estas son distintas rutas para acercarte a la tecnología. Los énfasis son una síntesis del equipo a partir de los perfiles oficiales; no son un ranking."
``````

### P-012 — solicitud S1/1385

Procedencia: S1, registro 1385. Ediciones registradas en S1: 1405.

``````text
# MEJORA VISUAL — PRESENTACIÓN DE REFERENCIAS ACADÉMICAS

Continúa trabajando sobre la landing page Astro de Ingeniería en Informática UTEM.

Quiero mejorar únicamente la presentación visual de las citas dentro de la sección de comparación entre carreras.

## PROBLEMA

Actualmente las referencias aparecen como números entre corchetes, por ejemplo [1], [3] y [4].

Estos números se repiten después de varias frases y dificultan la lectura, especialmente en el desplegable «Conoce las diferencias en detalle».

No quiero eliminar las fuentes ni perder la trazabilidad académica exigida por el profesor.

## CAMBIO SOLICITADO

Reemplaza visualmente las referencias numéricas repetidas por enlaces de fuente más discretos y descriptivos.

Por ejemplo:

«Fuente: Perfil oficial de Ingeniería en Informática»

«Fuente: Perfil oficial de Ingeniería Civil en Computación»

«Fuente: Perfil oficial de Ingeniería Civil en Ciencia de Datos»

Cada texto debe enlazar a la referencia real correspondiente, reutilizando los datos existentes.

## ORGANIZACIÓN

En el apartado «Conoce las diferencias en detalle»:

- Mantén las tres columnas.
- Conserva los textos actuales.
- Evita repetir referencias después de cada párrafo cuando una misma fuente respalde todo el bloque.
- Ubica la referencia correspondiente al final de cada columna.
- Si se utilizan varias fuentes distintas dentro de una columna, conserva enlaces suficientes para identificar claramente qué afirmaciones respalda cada una.
- Utiliza un texto pequeño, legible y discreto.
- Puedes utilizar un ícono sencillo de enlace externo o documento.
- Mantén la navegación por teclado y los estados de foco.

Aplica el mismo criterio a la comparación resumida inmediatamente superior, para conservar la coherencia visual.

## IMPORTANTE

- No elimines las referencias de la base de datos.
- No elimines las citas exigidas por la rúbrica.
- No cambies las fuentes originales ni sus identificadores.
- No elimines la sección «Fuentes y referencias».
- No atribuyas a una misma fuente afirmaciones que no respalda.
- No ocultes las referencias exclusivamente detrás de hover o tooltips.
- Mantén enlaces visibles, accesibles y verificables.

## DISEÑO

Conserva el diseño actual:

- Tres columnas.
- Tipografía.
- Colores.
- Espaciados.
- Separadores verticales.
- Contenido académico.
- Funcionamiento del desplegable.

No agregues nuevas dependencias ni JavaScript.

Si existe un componente reutilizable de citas, reutilízalo o realiza una adaptación mínima y localizada, evitando modificar accidentalmente las referencias de otras secciones.

## VERIFICACIÓN

Comprueba que:

1. Las referencias sigan siendo enlaces funcionales.
2. Cada referencia corresponda a la carrera y los datos que respalda.
3. No se hayan perdido citas obligatorias.
4. La lectura sea más limpia.
5. La presentación funcione correctamente en móvil y escritorio.
6. Astro Check y el build terminen sin errores.

Realiza únicamente esta modificación y entrega un resumen breve.

No hagas commits ni push.
``````

### P-013 — solicitud S1/1458

Procedencia: S1, registro 1458. Ediciones registradas en S1: 1471.

``````text
En la sección de comparación entre carreras, tanto en el resumen superior como en el apartado «Conoce las diferencias en detalle», quiero realizar un único ajuste visual.

Actualmente los enlaces de referencias muestran textos como:

- «Fuente: Perfil oficial de Ingeniería en Informática»
- «Fuente: Perfil oficial de Ingeniería Civil en Computación»
- «Fuente: Perfil oficial de Ingeniería Civil en Ciencia de Datos»

**Quiero eliminar la palabra «Fuente:» y dejar únicamente el nombre de cada carrera como enlace.**

Por ejemplo:

- Ingeniería en Informática
- Ingeniería Civil en Computación mención Informática
- Ingeniería Civil en Ciencia de Datos

Cada nombre debe conservar su enlace a la referencia oficial correspondiente.

Mantén los estilos discretos, la accesibilidad y la ubicación actual de los enlaces.

**No modifiques ningún otro elemento:** textos descriptivos, columnas, separadores, colores, componentes, contenido académico ni funcionamiento del desplegable.

Realiza únicamente este ajuste y confirma brevemente el archivo modificado. No hagas commits ni push.
``````

### P-014 — solicitud S1/1491

Procedencia: S1, registro 1491. Ediciones registradas en S1: 1504.

``````text
En la sección **Malla curricular** del proyecto Astro, elimina completamente el siguiente texto informativo:

"Basada en el folleto institucional, con tildes y mayúsculas normalizadas. El equipo corrigió la numeración de Trabajo de Título: I en el semestre VII y II en el VIII. No se infieren créditos ni prerrequisitos."

**Instrucciones:**

- Elimina únicamente este párrafo de la interfaz.
- No elimines ni modifiques las asignaturas, semestres o datos de la malla.
- Conserva las referencias oficiales, el enlace al PDF y las fuentes originales.
- No cambies el diseño, los colores ni el funcionamiento de la malla interactiva.
- Si queda un espacio vacío innecesario, ajusta solamente ese espaciado.

No realices otras modificaciones, commits ni push a GitHub.

Confirma brevemente qué archivo modificaste.
``````

### P-015 — solicitud S1/1524

Procedencia: S1, registro 1524. Ediciones registradas en S1: 1537.

``````text
En la sección **Malla curricular** del proyecto Astro, elimina todos los textos repetidos «Folleto UTEM [2]» que aparecen debajo de las asignaturas de cada semestre.

**Instrucciones:**

- Elimina completamente el texto «Folleto UTEM» y el número de referencia `[2]` de esas ubicaciones.
- Aplica el cambio a los ocho semestres.
- Si quedan espacios vacíos, ajusta únicamente el espaciado necesario.
- No elimines las asignaturas ni modifiques los datos de la malla.
- No alteres los filtros interactivos, los colores ni la distribución.
- **Conserva el enlace «Consultar malla oficial (PDF)»** que aparece al comienzo de la sección.
- Mantén la fuente oficial registrada en la colección de referencias; solo queremos eliminar su repetición visual debajo de cada semestre.

No modifiques ninguna otra sección, no hagas commits ni push a GitHub.

Confirma brevemente qué archivo modificaste.
``````

### P-016 — solicitud S1/1557

Procedencia: S1, registro 1557. Ediciones registradas en S1: 1570.

``````text
Realiza tres modificaciones puntuales en la sección **Malla curricular** de nuestro proyecto Astro.

**1. Eliminar el párrafo introductorio**

Elimina completamente este texto:

"Explora lo que aprenderás. Elige un semestre y recorre la malla completa, sin perder de vista lo que viene después."

Elimina también la referencia `[2]` asociada a ese párrafo.

**2. Modificar el enlace a la malla oficial**

Actualmente aparece:

"Consultar malla oficial (PDF)"

Cámbialo por:

**"Consultar malla oficial"**

Conserva exactamente la misma URL, el ícono de enlace externo y su funcionamiento.

Ubica este enlace debajo de los cuadros que muestran la malla curricular, al finalizar los ocho semestres y sus asignaturas.

Debe aparecer una sola vez y conservar un espaciado adecuado respecto de la malla.

**3. Eliminar la explicación de colores y estados**

Elimina completamente este párrafo:

"Al elegir un semestre, sus ramos se destacan en verde, los anteriores se tachan y los siguientes quedan en gris. Es una vista del recorrido, no un registro de ramos aprobados."

No elimines la leyenda de colores ni modifiques el comportamiento de los semestres.

**Restricciones importantes:**

- No modificar las asignaturas ni los datos académicos.
- No alterar los botones de selección de semestre.
- No cambiar el funcionamiento de la malla interactiva.
- No modificar los colores ni los estados visuales de los ramos.
- No eliminar la fuente oficial del sistema de referencias.
- No modificar otras secciones.
- No instalar dependencias.
- No realizar commits ni push a GitHub.

Mantén una referencia visible y discreta que permita identificar la fuente oficial de la malla, sin recuperar los textos repetitivos eliminados anteriormente.

Realiza únicamente estos ajustes y confirma brevemente los archivos modificados.
``````

### P-017 — solicitud S1/1762

Procedencia: S1, registro 1762; adjunto e08602ff-9af2-47f2-a612-5e7726af6f72/Texto pegado.txt. Ediciones registradas en S1: 1810.

``````text
# ETAPA 3 — OPTIMIZACIÓN DE EXPERIENCIA DE USUARIO Y NAVEGACIÓN

## CONTEXTO DEL PROYECTO

Actúa como desarrollador frontend senior especializado en Astro, TypeScript, accesibilidad web y diseño UX/UI.

Estamos desarrollando una landing page académica de Ingeniería en Informática para la Universidad Tecnológica Metropolitana (UTEM), destinada principalmente a estudiantes de tercero y cuarto medio.

El proyecto ya se encuentra implementado con Astro y TypeScript, y hemos realizado varias mejoras de diseño, navegación y contenido.

También utilizamos como referencia la arquitectura de información de la página de Ingeniería en Computer Science de la UAI.

La landing actual cuenta con:

- Header y navegación responsiva.
- Hero con carrusel fotográfico.
- Ficha académica.
- Accesos rápidos.
- Presentación de la carrera.
- Comparación con carreras afines.
- Perfil de egreso.
- Malla curricular interactiva por semestre.
- Enlace a la malla oficial.
- Campo laboral.
- Respaldo institucional.
- Admisión.
- Preguntas frecuentes.
- Referencias académicas.
- Footer institucional.

**IMPORTANTE:** La estructura y el diseño actuales están aprobados. No quiero rediseñar la página ni reconstruir componentes que ya funcionan.

## OBJETIVO DE ESTA ETAPA

Realizar una revisión técnica y visual enfocada en cuatro aspectos:

1. Navegación móvil.
2. Elementos visuales del campo laboral.
3. Claridad de títulos y legibilidad.
4. Preguntas frecuentes y enlaces internos.

Primero identifica si los problemas detectados en la auditoría anterior siguen presentes.

**Si un problema ya está solucionado, no modifiques ese componente innecesariamente.**

---

## 1. REVISIÓN INICIAL DEL PROYECTO

Antes de realizar modificaciones:

1. Inspecciona la estructura actual del repositorio.
2. Revisa el estado de Git mediante `git status`.
3. Identifica los componentes relacionados con esta etapa.
4. Comprueba qué cambios anteriores ya están implementados.
5. Conserva los avances existentes.
6. Revisa los estilos e interacciones asociados a los componentes relevantes.

Archivos que probablemente debas revisar:

- `src/components/Header.astro`
- `src/components/CampoLaboral.astro`
- `src/components/FAQ.astro`
- `src/content/faq.json`
- `src/pages/index.astro`
- `src/styles/global.css`
- `src/styles/experience.css`
- `src/scripts/experience.ts`

Los nombres son orientativos. Utiliza la estructura real del proyecto.

No sobrescribas trabajo existente ni reviertas cambios anteriores.

---

## 2. MEJORA 1 — NAVEGACIÓN MÓVIL

### Problema detectado anteriormente

Durante la auditoría se identificó que el menú móvil podría permanecer abierto después de seleccionar un enlace hacia una sección interna.

No se confirmó visualmente que el problema ocurriera, por lo que debes comprobarlo antes de modificar el código.

### Trabajo solicitado

Revisa el comportamiento del menú móvil.

Comprueba:

- Apertura y cierre del menú.
- Navegación mediante enlaces internos.
- Comportamiento después de seleccionar una sección.
- Navegación mediante teclado.
- Indicadores de foco.
- Comportamiento con el header fijo.
- Visualización correcta en pantallas pequeñas.

### Resultado esperado

Cuando el visitante seleccione una sección desde el menú móvil:

1. Debe navegar hacia la sección correspondiente.
2. El menú debe cerrarse correctamente.
3. El encabezado fijo no debe ocultar el título de destino.
4. La navegación debe seguir funcionando mediante teclado.
5. No deben aparecer superposiciones ni desplazamientos horizontales.

Prioriza HTML semántico y JavaScript mínimo.

Si se requiere JavaScript, implementa solamente el necesario.

No cambies la apariencia general del header.

No modifiques el nombre de la carrera, el logotipo ni las decisiones visuales anteriores.

---

## 3. MEJORA 2 — ELEMENTOS VISUALES DEL CAMPO LABORAL

### Problema detectado

En una auditoría anterior se observaron flechas decorativas junto a las áreas laborales.

Aunque visualmente aportaban dinamismo, podían interpretarse como botones o enlaces.

### Trabajo solicitado

Inspecciona `CampoLaboral.astro` y verifica si estas flechas siguen presentes.

Si son elementos puramente decorativos:

- Elimínalas si resultan innecesarias.
- O adapta su presentación para que no parezcan elementos interactivos.

Selecciona la solución que mejor conserve la identidad visual del sitio.

### Restricciones

No modificar:

- Las cinco áreas laborales.
- Los textos descriptivos.
- Las referencias oficiales.
- El orden de la información.
- Los colores de la sección.
- La composición general.
- Los enlaces reales existentes.

No agregues enlaces ficticios para justificar los elementos decorativos.

La sección debe continuar siendo visualmente atractiva y sencilla de comprender.

---

## 4. MEJORA 3 — CLARIDAD DE TÍTULOS Y LEGIBILIDAD

### Objetivo

Asegurar que cualquier estudiante de enseñanza media pueda identificar rápidamente el contenido de cada sección.

Actualmente utilizamos títulos editoriales y expresivos, lo que forma parte de nuestra identidad visual.

**Quiero conservarlos.**

Sin embargo, algunos podrían necesitar una identificación académica complementaria.

### Trabajo solicitado

Revisa los encabezados de las principales secciones y comprueba si su propósito resulta evidente.

Ejemplos de etiquetas académicas:

- Sobre la carrera.
- Perfil de egreso.
- Plan de estudios.
- Campo laboral.
- Respaldo institucional.
- Admisión.
- Preguntas frecuentes.

Si alguna sección tiene un título creativo poco descriptivo, puedes incorporar una etiqueta breve y discreta que ayude a reconocer el tema.

No reemplaces masivamente los títulos existentes.

### Legibilidad

Revisa especialmente:

- Tamaños de fuente.
- Espaciado entre párrafos.
- Contraste.
- Longitud de líneas.
- Desbordamientos.
- Legibilidad de referencias.
- Distribución en pantallas pequeñas.

### Atención especial a la malla curricular

La malla contiene ocho semestres y asignaturas organizadas visualmente.

Anteriormente se detectó que algunos textos podrían resultar pequeños.

Comprueba su legibilidad, especialmente en móvil.

**No modifiques la interacción ni el contenido de la malla.**

Conserva:
- Los ocho semestres.
- Todas las asignaturas.
- El selector.
- Los colores de estados.
- El tachado de semestres anteriores.
- Los semestres posteriores en gris.
- El enlace «Consultar malla oficial».

También conserva las decisiones editoriales recientes:

- No recuperar el párrafo que comienza con «Basada en el folleto institucional...».
- No recuperar los textos repetidos «Folleto UTEM [2]».
- No recuperar el párrafo que comienza con «Al elegir un semestre, sus ramos...».
- No recuperar el texto introductorio eliminado anteriormente.
- No volver a añadir «(PDF)» al enlace «Consultar malla oficial».
- No crear otra malla curricular.

Si detectas problemas de legibilidad que requieren una modificación importante de la malla, descríbelos como pendientes en lugar de rediseñarla automáticamente.

---

## 5. MEJORA 4 — PREGUNTAS FRECUENTES Y ENLACES INTERNOS

### Objetivo

Garantizar que las preguntas frecuentes sean claras y que todos los enlaces internos conduzcan correctamente hacia las secciones actuales.

### Trabajo solicitado

Revisa:

- `FAQ.astro`
- `faq.json`
- Los identificadores de las secciones.
- Los enlaces internos utilizados en respuestas.

En la auditoría anterior se detectó una referencia al título antiguo:

«Explora lo que aprenderás».

Actualmente la sección de malla curricular se titula:

«Un camino. Ocho semestres».

Si la referencia antigua todavía aparece, corrígela.

### Requisitos

- Mantener las siete preguntas actuales.
- No inventar nuevas preguntas.
- No modificar información institucional correcta.
- Conservar los acordeones HTML.
- Mantener la accesibilidad mediante teclado.
- Verificar las anclas.
- Evitar enlaces rotos.
- Mejorar únicamente las respuestas que presenten errores concretos de navegación o claridad.

No cambies el contenido académico sin una justificación verificable.

---

## 6. PRESERVACIÓN DE LOS CAMBIOS ANTERIORES

Debes conservar las mejoras implementadas en etapas anteriores.

### Header

- Nombre principal: «Ingeniería en Informática».
- Identidad institucional UTEM independiente.
- Logotipo existente.
- Menú y navegación actual.

### Hero

- Carrusel fotográfico.
- Título expresivo.
- Botones.
- Ficha académica de seis datos.
- Identidad visual existente.

### Accesos rápidos

Conservar los cuatro accesos:

- Malla curricular.
- Perfil de egreso.
- Admisión 2027.
- Preguntas frecuentes.

### Comparación entre carreras

Conservar:

- Carrera principal destacada.
- Otras dos carreras relacionadas.
- Apartado «Conoce las diferencias en detalle».
- Descripciones ampliadas.
- Enlaces discretos a referencias oficiales utilizando los nombres de las carreras.
- Organización visual actual.
- Separadores corregidos.

No recuperar números de citas repetidos ni la palabra «Fuente:» en los enlaces que ya fueron simplificados.

### Malla curricular

Mantener todos los cambios editoriales y visuales implementados recientemente.

### Otras secciones

No modificar:

- Perfil de egreso.
- Respaldo institucional.
- Ponderaciones de admisión.
- Referencias académicas.
- Créditos de imágenes.
- Footer.

Solo se permiten cambios fuera de los cuatro puntos cuando sean estrictamente necesarios para corregir un problema introducido por esta etapa.

---

## 7. CALIDAD DE IMPLEMENTACIÓN Y VERIFICACIÓN

Prioriza la calidad, la estabilidad y la experiencia del usuario.

Puedes inspeccionar los archivos relacionados, realizar las correcciones necesarias y ejecutar las pruebas correspondientes.

### Comprobaciones técnicas

Ejecuta:

1. Astro Check.
2. Compilación de producción.
3. Validación de los enlaces internos.
4. Revisión de errores de TypeScript.
5. Verificación de elementos interactivos.

### Comprobaciones visuales

Si el entorno dispone de herramientas para visualizar la web, comprueba estas resoluciones:

- 360 px — teléfono móvil.
- 768 px — tablet.
- 1280 px — escritorio.

Verifica:
- Ausencia de desplazamiento horizontal accidental.
- Correcto funcionamiento del menú móvil.
- Alineación de contenidos.
- Legibilidad de títulos.
- Distribución de tarjetas y columnas.
- Navegación por anclas.
- Indicadores de foco visibles.

### Accesibilidad

Comprueba los aspectos aplicables de WCAG 2.2 AA relacionados con los componentes modificados.

Considera:
- Navegación mediante teclado.
- Semántica HTML.
- Contraste.
- Foco visible.
- Tamaños de elementos interactivos.
- Compatibilidad con movimiento reducido.

No declares cumplimiento completo de WCAG ni resultados de Lighthouse que no hayas comprobado realmente.

---

## 8. RESTRICCIONES GENERALES

No debes:

- Rediseñar la landing.
- Cambiar la paleta de colores.
- Cambiar la tipografía general.
- Reemplazar imágenes.
- Reorganizar las secciones.
- Modificar información institucional sin verificarla.
- Instalar dependencias innecesarias.
- Añadir nuevas funcionalidades.
- Crear componentes sin justificación.
- Generar documentación académica.
- Modificar `README.md` o `INFORME.md`.
- Hacer commits.
- Realizar push a GitHub.

Conserva la separación entre contenido, presentación y configuración exigida por el proyecto Astro.

No introduzcas `any` en TypeScript.

Si detectas problemas ajenos al alcance de esta etapa, regístralos para una revisión posterior.

---

## 9. RESULTADO FINAL

Después de finalizar las correcciones, entrégame un resumen organizado con:

**Problemas encontrados**
- Qué problemas de la auditoría seguían presentes.
- Cuáles ya estaban solucionados.

**Cambios realizados**
- Archivos modificados.
- Ajustes específicos aplicados.

**Verificaciones**
- Astro Check.
- Build.
- Navegación.
- Responsividad.
- Accesibilidad relevante.

**Pendientes**
- Problemas que necesitan una revisión posterior.
- Elementos que no pudiste verificar.

No inventes resultados de pruebas.

**COMIENZA AHORA.**

Inspecciona el estado actual del proyecto, aplica solamente las correcciones necesarias de esta etapa y verifica que todas las funcionalidades existentes continúen trabajando correctamente.

El objetivo es mejorar la experiencia de usuario sin perder la identidad visual ni alterar el contenido académico de la landing page.
``````

### P-018 — solicitud S1/2334

Procedencia: S1, registro 2334. Ediciones registradas en S1: 2363, 2376.

``````text
ahora en el carrusel hay sola una imagen al principio? me gustaria que estuviera como esta tal cual pero que se transcicionen las imagenes que habiamos puesto anteriormente, como que cada cierto tiempo se vayan cambiando
``````

### P-019 — solicitud S1/2429

Procedencia: S1, registro 2429. Ediciones registradas en S1: 2435.

``````text
quita esta flecha solo deja que se mueva nomas
``````

### P-020 — solicitud S1/2465

Procedencia: S1, registro 2465; adjunto 943d47e2-0d43-4297-be3a-c42764bc43cd/Texto pegado.txt. Ediciones registradas en S1: 2510.

``````text
# MEJORA DEL HERO — REEMPLAZAR FOTOGRAFÍAS DEL CARRUSEL

Actúa como desarrollador frontend especializado en Astro, TypeScript, diseño web responsivo y optimización de imágenes.

Estamos trabajando en nuestra landing page de Ingeniería en Informática de la UTEM.

Quiero mejorar únicamente las fotografías del carrusel principal (Hero), porque las imágenes actuales son demasiado genéricas y no representan suficientemente las actividades relacionadas con Ingeniería en Informática.

## 1. OBJETIVO

Reemplazar las tres imágenes actuales del carrusel por fotografías que representen:

1. Programación y trabajo colaborativo.
2. Desarrollo de software.
3. Redes e infraestructura tecnológica.

Quiero conservar absolutamente todo el diseño actual del Hero.

## 2. FOTOGRAFÍAS SELECCIONADAS

Utiliza estas tres fotografías, en este orden:

### Imagen 1 — Programación colaborativa

Fotografía de dos desarrolladores trabajando con computadores.

Autor: Mikhail Nilov.

URL:
https://www.pexels.com/photo/people-using-computers-at-work-7988079/

Nombre local sugerido:
`hero-programacion.webp`

### Imagen 2 — Desarrollo de software

Fotografía de un desarrollador trabajando con código en dos monitores.

Autor: Zayed Hossain.

URL:
https://www.pexels.com/photo/developer-working-on-code-in-a-modern-office-36706460/

Nombre local sugerido:
`hero-desarrollo.webp`

### Imagen 3 — Redes e infraestructura

Fotografía de trabajo con conexiones y equipos de red en un centro de datos.

Autor: panumas nikhomkhai.

URL:
https://www.pexels.com/photo/engineer-fixing-core-swith-in-data-center-room-19226353/

Nombre local sugerido:
`hero-infraestructura.webp`

## 3. DESCARGA DE IMÁGENES

Primero revisa cómo está implementado actualmente el carrusel.

Después:

1. Intenta descargar las fotografías originales desde sus respectivas páginas de Pexels.
2. Comprueba que cada descarga corresponde a la fotografía indicada.
3. Almacénalas localmente en la carpeta de recursos adecuada del proyecto Astro.
4. Optimízalas para web, preferentemente en formato WebP o AVIF.
5. Utiliza las herramientas de optimización existentes, evitando instalar dependencias innecesarias.
6. Actualiza las referencias del carrusel para utilizar los archivos locales.

No utilices las URLs de las páginas de Pexels como `src` de imágenes ni dependas de fotografías alojadas en servidores externos.

**Si no puedes descargar los archivos, no reemplaces las imágenes por otras diferentes. Indícame qué archivos debo descargar manualmente y dónde colocarlos.**

## 4. MANTENER EL DISEÑO DEL HERO

Es fundamental conservar:

- Título: «Transforma ideas en tecnología».
- Palabra «tecnología» destacada en verde.
- Texto descriptivo actual.
- Botón verde «Explorar la carrera».
- Enlace «Conoce la malla».
- Carrusel de tres fotografías.
- Indicadores inferiores de navegación.
- Transiciones y comportamiento actual.
- Altura y distribución general del Hero.
- Degradado azul oscuro.
- Identidad visual de la página.

No cambies textos, botones, colores ni tipografías.

## 5. ENCUADRE Y LEGIBILIDAD

Las fotografías deben adaptarse correctamente al formato panorámico del Hero.

Requisitos:

- Evitar imágenes estiradas o deformadas.
- Mantener las personas y elementos relevantes visibles.
- Priorizar la ubicación de elementos visuales importantes hacia el centro o la derecha.
- Conservar espacio suficiente para el texto de la izquierda.
- Mantener el degradado oscuro para garantizar la lectura del título.
- Ajustar `object-position` individualmente si es necesario.
- Evitar recortes incorrectos en móviles.
- Mantener una buena composición a distintas resoluciones.

Revisa específicamente las resoluciones:

- 360 px.
- 768 px.
- 1280 px.

Si una fotografía no se adapta correctamente, intenta corregir su encuadre sin alterar el diseño general.

No agregues textos dentro de las fotografías.

## 6. OPTIMIZACIÓN Y ACCESIBILIDAD

Mantén un buen rendimiento y evita perjudicar Lighthouse.

- Utiliza imágenes optimizadas.
- Evita descargar fotografías excesivamente pesadas en la página.
- Conserva el funcionamiento del carrusel.
- Evita desplazamientos de contenido inesperados.
- Mantén la accesibilidad del componente.
- Utiliza textos alternativos adecuados cuando las imágenes aporten información; si funcionan únicamente como fondos decorativos, trátalas como tales.
- Respeta las preferencias de movimiento reducido existentes.

No modifiques la lógica del carrusel salvo que sea estrictamente necesario.

## 7. CRÉDITOS FOTOGRÁFICOS

Actualmente nuestro Hero tiene un enlace a «Fotografías referenciales · Créditos».

Conserva ese enlace y actualiza los créditos para incluir las tres fotografías nuevas.

Registra:
- Nombre del fotógrafo.
- Nombre o descripción de la fotografía.
- Enlace al original.
- Plataforma: Pexels.

No elimines referencias académicas del proyecto.

No presentes a las personas de estas fotografías como estudiantes, docentes o trabajadores reales de la UTEM.

## 8. RESTRICCIONES

No modificar:

- Header.
- Ficha académica.
- Accesos rápidos.
- Sobre la carrera.
- Comparación entre carreras.
- Perfil de egreso.
- Malla curricular.
- Campo laboral.
- Admisión.
- Preguntas frecuentes.
- Referencias académicas.
- Footer, salvo ajustes estrictamente necesarios en los créditos fotográficos.

No rediseñar el Hero.

No agregar nuevas diapositivas.

No modificar contenidos académicos.

No hacer commits ni push a GitHub.

No eliminar las fotografías anteriores si todavía son utilizadas en otra parte del proyecto.

## 9. VERIFICACIONES

Al terminar:

1. Comprueba que las tres fotografías nuevas aparezcan en el carrusel.
2. Verifica que el cambio entre imágenes funcione correctamente.
3. Revisa el encuadre en móvil, tablet y escritorio.
4. Comprueba que el texto siga siendo legible.
5. Verifica los créditos fotográficos.
6. Ejecuta Astro Check.
7. Ejecuta el build de producción.
8. Confirma que no haya errores de carga.
9. Revisa el diff para asegurar que solo se modificaron los archivos necesarios.

## 10. RESULTADO ESPERADO

Entrégame un resumen con:

- Imágenes incorporadas.
- Archivos modificados.
- Ubicación de las imágenes locales.
- Optimización realizada.
- Créditos actualizados.
- Pruebas ejecutadas.
- Problemas pendientes.

**COMIENZA AHORA. Quiero que el carrusel represente mejor Ingeniería en Informática, conservando exactamente la identidad visual que ya hemos desarrollado.**
``````

### P-021 — solicitud S1/2533

Procedencia: S1, registro 2533. Ediciones registradas en S1: 2554.

``````text
la tercera imagen puedes cambiarla y buscar otra
``````

### P-022 — solicitud S1/2568

Procedencia: S1, registro 2568. Ediciones registradas en S1: 2611.

``````text
la primera y tercera imagen aun no me convencen puedes buscar tambien quizas alguna imagen con referencia a ciberseguridad y tambien puede ser a analista de datos, bases de datos etc ya que la de al medio es como la que representa la programacion como tal, necesito que sean imagenes atractivas para alguien que anda buscando la carrera ingeneria ingormatica
``````

### P-023 — solicitud S1/2625

Procedencia: S1, registro 2625. Ediciones registradas en S1: 2644.

``````text
la tercera aun no me convence busca otra
``````

### P-024 — solicitud S1/2699

Procedencia: S1, registro 2699. Ediciones registradas en S1: 2709.

``````text
sii
``````

### P-025 — solicitud S1/2724

Procedencia: S1, registro 2724; adjunto d6e504df-ddd9-4d97-891a-d15afac19ad8/Texto pegado.txt. Ediciones registradas en S1: 2750, 2758, 2767.

``````text
# ETAPA FINAL — CORRECCIONES TÉCNICAS Y PREPARACIÓN PARA LA ENTREGA

Actúa como desarrollador senior especializado en Astro, TypeScript, SEO, accesibilidad y despliegue web.

Estamos finalizando nuestra landing page académica de Ingeniería en Informática de la UTEM.

Repositorio:
https://github.com/HighBenditas/ingenieria-informatica-utem

El diseño y las funcionalidades principales ya están terminados.

Una revisión externa identificó varios riesgos que debemos resolver antes de la entrega.

## OBJETIVO

Preparar el proyecto para cumplir con los requisitos técnicos y de documentación de la rúbrica, sin rediseñar la página ni deshacer las mejoras anteriores.

Trabaja sobre el estado actual del repositorio.

Antes de modificar archivos, revisa `git status` y conserva todos los cambios locales pendientes.

---

## 1. CORREGIR SITEMAP Y CONFIGURACIÓN SEO

Se detectó que el sitemap no se genera cuando falta `SITE_URL`.

Revisa:

- `astro.config.mjs`
- Integración `@astrojs/sitemap`
- Generación de canonical URL
- Metadatos Open Graph
- `robots.txt`
- Configuración de Netlify

Implementa una solución correcta para producción.

Requisitos:

1. Configurar correctamente `site` de Astro con la URL pública real.
2. Mantener la integración oficial del sitemap.
3. Verificar que el build genere `sitemap-index.xml` y los archivos de sitemap correspondientes.
4. Evitar URLs incorrectas o `localhost` en canonical y Open Graph de producción.
5. Verificar que `robots.txt` apunte al sitemap correcto.
6. Asegurar que la configuración funcione en Netlify.

Si todavía no existe una URL pública definitiva, no inventes una.

En ese caso, prepara la configuración necesaria y explícame cómo establecer `SITE_URL` cuando tengamos el dominio.

Comprueba la generación del sitemap utilizando una URL válida únicamente para las pruebas, sin publicar esa URL ficticia como canónica.

## 2. CREAR O COMPLETAR README.md

Revisa si existe `README.md` en la raíz del repositorio.

Si no existe, créalo.

Si existe pero está incompleto, actualízalo conservando información correcta.

El README debe estar redactado en español, con formato Markdown profesional.

Debe incluir:

### Descripción del proyecto
- Landing page de Ingeniería en Informática de la UTEM.
- Objetivo informativo y público al que está dirigida.
- Principales secciones del sitio.

### Integrantes
- Espacios para identificar a ambos integrantes si esos datos no están documentados.
- No inventar nombres.

### Tecnologías
- Astro.
- TypeScript.
- CSS.
- Otras tecnologías que efectivamente utilice el proyecto.

### Estructura del repositorio
- Explicación breve de las carpetas principales.
- Componentes.
- Colecciones de contenido.
- Recursos estáticos.
- Configuración.

### Instalación y ejecución
- Requisitos de Node.js.
- Comandos para instalar dependencias.
- Comando para iniciar el servidor local.
- Comando de verificación Astro.
- Comando de compilación.

Revisa `package.json` para utilizar los comandos reales.

### Actualización de contenidos
Explica cómo modificar:
- Asignaturas de la malla.
- Campo laboral.
- FAQ.
- Referencias.
- Datos académicos.

Utiliza las rutas reales de los archivos.

### Publicación
- Procedimiento de despliegue en Netlify.
- Variables de entorno necesarias.
- URL pública del proyecto, si ya existe.

### Verificaciones
Explica cómo ejecutar las pruebas disponibles.

### Fuentes y créditos
Menciona la utilización de fuentes institucionales verificables y créditos fotográficos.

No inventes dependencias, comandos, URLs ni resultados de pruebas.

Mantén el README claro y fácil de comprender para el profesor y otros estudiantes.

## 3. AUDITORÍA DEL CONTENIDO DENTRO DE COMPONENTES

La revisión detectó textos largos escritos directamente en componentes Astro.

Ejemplo:
`SobreCarrera.astro`

Inspecciona si esos textos deberían estar en colecciones JSON o Markdown con esquemas, según la rúbrica.

Distingue entre:
- Textos de interfaz breves que pueden permanecer en los componentes.
- Contenido académico editable que conviene separar.
- Información ya almacenada en colecciones.

Si existen textos académicos largos que claramente deben separarse, realiza una extracción controlada a archivos de contenido estructurado.

Conserva exactamente la información visible, sus referencias y su presentación.

No cambies el contenido ni hagas reescrituras editoriales.

No realices una migración extensa que comprometa la estabilidad del proyecto.

Si alguna extracción requiere cambios arquitectónicos importantes, documenta el problema y déjalo pendiente para aprobación.

## 4. REVISIÓN DE EXPERIENCE.TS

Analiza el archivo `experience.ts`.

Actualmente maneja diferentes interacciones del sitio, incluyendo navegación, carrusel y selección de semestres.

Verifica si su organización incumple algún requisito concreto de la rúbrica.

No confundas la cantidad de funciones de un archivo con la cantidad de islas de Astro.

Si su implementación es correcta, consérvala.

Si detectas un problema técnico verificable, realiza el ajuste mínimo necesario.

No refactorices funcionalidades que funcionan correctamente solo por preferencia de estilo.

## 5. ACCESIBILIDAD Y RENDIMIENTO

Revisa el estado actual del proyecto para preparar las mediciones finales.

Comprueba:
- Navegación mediante teclado.
- Contrastes.
- Imágenes.
- Texto alternativo.
- Menú móvil.
- Malla interactiva.
- Enlaces.
- Indicadores de foco.
- Respeto por movimiento reducido.
- Posibles problemas de rendimiento del carrusel.

Si el sitio ya está publicado y tienes acceso, intenta ejecutar o consultar pruebas de Lighthouse y CompliaScan.

Si no tienes acceso a esas herramientas, no inventes puntuaciones.

Indica exactamente qué debe realizarse manualmente en:

https://pagespeed.web.dev/

https://compliascan.com/

La meta de la rúbrica es obtener al menos 90 puntos en cada categoría de Lighthouse y el resultado exigido en CompliaScan.

No afirmes haber alcanzado esos puntajes sin mediciones reales.

## 6. EVIDENCIAS DE RESPONSIVIDAD

Comprueba las siguientes resoluciones:

- 360 px.
- 768 px.
- 1280 px.

Revisa:
- Hero.
- Navegación.
- Tarjetas.
- Comparación entre carreras.
- Malla curricular.
- Campo laboral.
- FAQ.
- Footer.

Si tienes herramientas de navegador y captura disponibles, guarda capturas reales del sitio para incluirlas en las evidencias del informe.

No generes imágenes simuladas de pruebas.

Si no puedes realizar las capturas, indícame los pasos exactos para obtenerlas manualmente.

## 7. DOCUMENTACIÓN DEL USO DE IA

El proyecto se desarrolló parcialmente con asistencia de Codex y ChatGPT.

Identifica las partes del código que puedan documentarse de manera verificable a partir de los archivos y registros disponibles.

Prepara un resumen técnico que explique:
- Herramientas utilizadas.
- Funcionalidades implementadas con asistencia.
- Revisión realizada por el equipo.
- Pruebas de validación.
- Decisiones que deben poder explicar los integrantes.

No inventes prompts históricos ni atribuyas trabajo a personas sin evidencia.

No agregues comentarios innecesarios en cada línea del código.

Si la rúbrica exige un nivel de documentación más específico, identifica exactamente qué falta.

No escribas encuestas, resultados ni pruebas académicas ficticias.

## 8. RESTRICCIONES

No rediseñar la página.

No modificar:
- El Hero ni las fotografías seleccionadas.
- La identidad visual.
- Los colores.
- La tipografía.
- Las asignaturas de la malla.
- Los datos de admisión.
- Las comparaciones académicas.
- La estructura general.
- Los créditos existentes.

Solo modificar estos elementos si se descubre un error técnico concreto que impida cumplir los requisitos.

No realizar commits ni push.

No sobrescribir cambios locales.

No inventar resultados ni evidencias.

## 9. VERIFICACIONES FINALES

Ejecuta:

1. Astro Check.
2. Build de producción.
3. Verificación de sitemap.
4. Comprobación de enlaces internos.
5. Verificación de canonical y metadatos.
6. Comprobación de colecciones.
7. Revisión de errores de TypeScript.
8. Revisión del diff de Git.

Revisa que el proyecto siga compilando correctamente.

## 10. INFORME FINAL DE CAMBIOS

Al terminar, entrega:

1. Problemas encontrados.
2. Problemas corregidos.
3. Archivos modificados.
4. Confirmación de creación o actualización de README.md.
5. Estado de sitemap y SITE_URL.
6. Estado de Lighthouse y CompliaScan.
7. Estado de las capturas de responsividad.
8. Cambios de arquitectura realizados, si los hubo.
9. Tareas manuales que todavía debemos completar.

No declares el proyecto listo para entrega si existen requisitos sin verificar.

**COMIENZA AHORA. Prioriza sitemap, README y verificaciones críticas. Conserva la estabilidad y el diseño de nuestra landing page.**
``````

### P-026 — solicitud S1/2848

Procedencia: S1, registro 2848. Ediciones registradas en S1: 2861.

``````text
yaa agrega un boton de pausa
``````

### P-027 — solicitud S1/2932

Procedencia: S1, registro 2932. Ediciones registradas en S1: 2964.

``````text
# MEJORA DEL CAMPO LABORAL — OFERTAS DE TRABAJO EN CHILE

Continúa trabajando sobre nuestra landing page de Ingeniería en Informática UTEM, desarrollada en Astro y TypeScript.

Quiero mejorar únicamente la sección «Campo laboral», agregando enlaces a búsquedas de ofertas laborales en Chile.

## OBJETIVO

Ayudar a los futuros estudiantes a conocer ejemplos de empresas, cargos profesionales y requisitos laborales relacionados con las cinco áreas de Ingeniería en Informática.

Prioriza portales chilenos como Chiletrabajos, Trabajando.com y FirstJob.

## 1. ENLACES POR ÁREA LABORAL

Conserva los cinco bloques actuales y agrega debajo de cada descripción un enlace discreto:

«Ver ofertas en Chile ↗»

Utiliza estos destinos:

**01. Desarrollo de software**\
Portal: Chiletrabajos\
[https://www.chiletrabajos.cl/encuentra-un-empleo?2=desarrollador](https://www.chiletrabajos.cl/encuentra-un-empleo?2=desarrollador)

**02. Sistemas de información**\
Portal: Trabajando.com\
[https://www.trabajando.cl/trabajo-ti](https://www.trabajando.cl/trabajo-ti)

**03. Infraestructura y redes**\
Portal: Trabajando.com\
[https://www.trabajando.cl/trabajo-infraestructura-ti](https://www.trabajando.cl/trabajo-infraestructura-ti)

**04. Seguridad de la información**\
Portal: Chiletrabajos\
[https://www.chiletrabajos.cl/encuentra-un-empleo/?2=ciberseguridad](https://www.chiletrabajos.cl/encuentra-un-empleo/?2=ciberseguridad)

**05. Proyectos tecnológicos**\
Portal: Trabajando.com\
[https://www.trabajando.cl/trabajo-proyectos-ti](https://www.trabajando.cl/trabajo-proyectos-ti)

Antes de implementarlos, verifica que los enlaces funcionen y que sus búsquedas correspondan razonablemente a las áreas indicadas. Si un enlace falla, no inventes otro: infórmalo.

## 2. ACCESO ADICIONAL A PRÁCTICAS

Al finalizar el listado, incorpora un bloque pequeño y discreto:

Título:\
«¿Buscas tu primera experiencia laboral?»

Descripción:\
«Explora oportunidades de práctica profesional y primeros empleos en Chile.»

Enlace:\
«Ver prácticas y primeros trabajos ↗»

Destino:\
[https://firstjob.me/ofertas](https://firstjob.me/ofertas)

Esta página contiene oportunidades de distintas ubicaciones y especialidades, por lo que debe indicarse que los visitantes seleccionen Chile y los filtros adecuados.

No presentes las vacantes como oportunidades exclusivas para estudiantes de la UTEM.

## 3. DISEÑO

Mantener:

- Fondo azul oscuro.
- Título editorial actual.
- Cinco bloques laborales.
- Numeración 01 a 05.
- Separadores horizontales.
- Descripciones y referencias.
- Colores y tipografías existentes.

Los nuevos enlaces deben:

- Utilizar el verde de la identidad visual.
- Tener un tamaño legible.
- Mantener suficiente separación respecto a las descripciones.
- Presentar estados hover y foco visible.
- Ser accesibles mediante teclado.
- Abrirse en una pestaña nueva con rel="noopener noreferrer".

El bloque de FirstJob debe estar visualmente integrado y no ocupar demasiado espacio.

No transformar la sección en tarjetas grandes ni modificar su estructura principal.

## 4. ACLARACIÓN INFORMATIVA

Incluye una nota breve:

«Enlaces externos referenciales. Las ofertas, requisitos y ubicaciones dependen de cada empresa y pueden cambiar.»

No mostrar estadísticas ni salarios no verificados.

No incorporar ofertas individuales que puedan caducar.

No integrar APIs externas ni sistemas automáticos de actualización.

## 5. VERIFICACIONES

Comprueba:

1. Los cinco enlaces laborales.
2. El enlace de FirstJob.
3. Accesibilidad de los enlaces.
4. Visualización en móvil, tablet y escritorio.
5. Astro Check.
6. Build de producción.

No modificar otras secciones.

No hacer commit ni push a GitHub.

Al finalizar, resume los archivos modificados y las verificaciones realizadas.

**IMPLEMENTA SOLO ESTA MEJORA Y CONSERVA EL DISEÑO ACTUAL.**
``````

### P-028 — solicitud S1/3054

Procedencia: S1, registro 3054; adjunto fa4c418b-dc8c-4fe8-84c5-b737ef22235b/Texto pegado.txt. Ediciones registradas en S1: 3112, 3144, 3172, 3221.

``````text
# MEJORA FINAL — ELIMINAR CITAS NUMÉRICAS REPETIDAS DEL DISEÑO

Continúa trabajando en nuestra landing page de Ingeniería en Informática UTEM, desarrollada con Astro y TypeScript.

He revisado visualmente varias secciones y detecté que aparecen numerosos números de referencias entre corchetes, por ejemplo:

[1], [2], [5], [6], [7], [8] y [9].

Estos números aparecen junto a los textos, asignaturas, datos académicos, competencias, campo laboral, admisión y respaldo institucional.

Quiero eliminar esta presentación numérica porque dificulta la lectura y hace que la página parezca un informe académico en lugar de una landing informativa.

## 1. OBJETIVO

Eliminar los números de citas entre corchetes de los textos visibles en toda la landing page.

**IMPORTANTE: NO ELIMINAR LAS FUENTES ACADÉMICAS NI SU TRAZABILIDAD.**

La rúbrica exige que las cifras y afirmaciones verificables estén respaldadas por una cita breve enlazada a la sección de referencias.

No exige específicamente el formato numérico.

Por tanto, reemplaza las citas numéricas por una presentación más discreta, utilizando autor institucional y año, agrupándolas cuando sea adecuado.

## 2. SECCIONES QUE DEBES REVISAR

Inspecciona todas las secciones, especialmente:

- Ficha académica.
- Sobre la carrera.
- Comparación entre carreras.
- Perfil de egreso.
- Malla curricular.
- Campo laboral.
- Respaldo institucional.
- Admisión 2027.
- Preguntas frecuentes.
- Cualquier otro componente que muestre números entre corchetes.

## 3. NUEVA PRESENTACIÓN DE LAS REFERENCIAS

### Ficha académica

Eliminar los números entre corchetes junto a:

- Duración.
- Jornada.
- Título profesional.
- Grado académico.
- Campus.
- Código DEMRE.

Conservar referencias breves y discretas, agrupadas por fuente cuando corresponda.

Por ejemplo:
«UTEM · 2022»
«DEMRE · 2027»

Estos textos deben estar enlazados a las referencias bibliográficas correspondientes.

### Perfil de egreso

Actualmente las seis competencias muestran repetidamente [1].

Eliminar esas repeticiones.

Como las competencias provienen del mismo perfil institucional, utilizar una referencia discreta al finalizar el conjunto.

Conservar las seis competencias, sus iconos y sus descripciones.

### Campo laboral

Eliminar las citas numéricas repetidas junto a las cinco áreas laborales.

Conservar una referencia institucional breve para el conjunto, sin eliminar los enlaces laborales a Chiletrabajos, Trabajando.com y FirstJob.

Conservar también el enlace existente a Mi Futuro.

### Respaldo institucional

Eliminar los números entre corchetes y utilizar referencias breves con autor institucional y año.

Conservar:
- Cinco años de acreditación institucional.
- Nivel Avanzado.
- Fecha informada.
- Certificación de carrera.
- Campus.
- Aclaraciones sobre verificaciones pendientes.

No cambiar ningún dato académico.

### Admisión 2027

Eliminar las citas numéricas y utilizar referencias breves asociadas a las fuentes oficiales.

Utilizar DEMRE 2027 cuando respalde los datos correspondientes.

Conservar fechas, ponderaciones, requisitos y enlaces existentes.

### Otras secciones

Aplicar el mismo criterio.

No eliminar información ni enlaces útiles.

## 4. CRITERIO DE CITACIÓN

Quiero una página visualmente limpia, pero académicamente respaldada.

Implementa estas reglas:

1. No mostrar números de citas entre corchetes en los textos de la landing.
2. No reemplazarlos por otros símbolos repetitivos.
3. Utilizar referencias institucionales breves y discretas.
4. Agrupar citas cuando varias afirmaciones próximas dependan de la misma fuente.
5. Mantener la asociación inequívoca entre cada dato verificable y su fuente.
6. Para cifras importantes, conservar la identificación del año y el respaldo correspondiente.
7. Mantener los enlaces hacia la entrada pertinente de la sección Referencias.
8. Conservar el formato APA 7 en la bibliografía.
9. No inventar fechas, autores ni documentos.
10. Si una afirmación no puede quedar correctamente respaldada mediante una cita agrupada, mantener una cita individual breve en formato autor-año.

No ocultar todas las referencias detrás de atributos de accesibilidad: debe existir trazabilidad visible para el lector.

## 5. SECCIÓN DE REFERENCIAS

Mantén la sección de Referencias completa, con sus fuentes oficiales, enlaces y fechas de consulta correspondientes.

Puedes eliminar numeraciones decorativas de la presentación si no afectan los identificadores internos.

No cambies las claves, IDs ni las relaciones necesarias para que los enlaces funcionen.

No elimines ninguna fuente porque haya desaparecido su número en los textos.

## 6. DISEÑO

Conservar absolutamente:

- Identidad visual.
- Colores.
- Tipografías.
- Distribución de secciones.
- Tamaños principales.
- Iconos.
- Carrusel.
- Malla interactiva.
- Enlaces a ofertas laborales.
- Funcionamiento del menú.
- Acordeones.
- Responsividad.

No realizar rediseños.

Las nuevas referencias deben ser pequeñas, discretas y coherentes con el estilo existente, pero legibles y accesibles.

No generar grandes bloques de texto dedicados a las fuentes.

## 7. VERIFICACIONES

Al finalizar:

1. Revisa todos los componentes y contenido estructurado.
2. Comprueba que no queden citas numéricas visibles entre corchetes.
3. Verifica que los datos sigan respaldados por fuentes identificables.
4. Comprueba los enlaces a Referencias.
5. Ejecuta Astro Check.
6. Ejecuta el build de producción.
7. Revisa los cambios en móvil, tablet y escritorio si el entorno lo permite.
8. Comprueba que no haya modificaciones visuales imprevistas.

No hacer commit ni push a GitHub.

## 8. RESULTADO ESPERADO

Entrega un resumen indicando:

- Secciones corregidas.
- Archivos modificados.
- Cómo se mantienen las citas académicas.
- Enlaces verificados.
- Pruebas realizadas.
- Problemas pendientes.

**COMIENZA AHORA. Elimina las citas numéricas repetidas y mejora su presentación sin perder el respaldo académico exigido por la rúbrica.**
``````

### P-029 — solicitud S1/3278

Procedencia: S1, registro 3278. Ediciones registradas en S1: 3297.

``````text
**Mejora localizada — bloque explicativo en “Sobre la carrera”**

Continúa trabajando sobre nuestra landing page de **Ingeniería en Informática**, desarrollada en Astro.

Quiero hacer una mejora visual pequeña y localizada en la sección donde aparece la tarjeta verde clara con el título:

**“Una idea que hace más fácil el día a día.”**

### Cambios solicitados

#### 1. Eliminar texto innecesario

Quita por completo esta línea:

**“Ejemplo ilustrativo del equipo; no describe un proyecto institucional.”**

No la reemplaces por otro texto.

---

#### 2. Mejorar visualmente el flujo inferior

Actualmente aparece un flujo muy simple con:

**Necesidad → Diseño → Solución**

Quiero conservar esa idea, pero hacer que se vea **más clara, más ordenada y visualmente mejor integrada** con la tarjeta.

### Requisitos para el nuevo flujo

- Mantener los tres conceptos:
  - **Necesidad**
  - **Diseño**
  - **Solución**
- Mejorar su presentación visual para que:
  - se entienda más rápido,
  - tenga mejor jerarquía,
  - no parezca una fila suelta al final,
  - y se vea coherente con el resto del diseño.

### Sugerencia de implementación

Puedes resolverlo de una de estas formas, eligiendo la que mejor encaje con el diseño actual:

- como **3 pasos horizontales**,
- como **3 mini bloques** o etiquetas conectadas,
- o como un **flujo visual simple** con mejor espaciado y alineación.

### Criterios de diseño

- Mantener el estilo actual de la tarjeta.
- No cambiar colores principales de la sección.
- No agregar animaciones innecesarias.
- Debe verse limpio y elegante.
- Debe seguir funcionando bien en móvil.
- Los tres pasos deben seguir en una sola lógica de recorrido.
- Si el diseño lo requiere, puedes usar separadores, íconos muy sutiles o una mejor disposición tipográfica, pero sin recargar.

---

### Restricciones

- No modificar el contenido principal del bloque.
- No cambiar el título ni el párrafo principal.
- No tocar otras secciones.
- No hacer rediseños grandes.
- No hacer commit ni push.

---

### Verificación

Al finalizar:

1. Confirma que el texto eliminado ya no aparece.
2. Confirma cómo quedó visualmente el flujo.
3. Verifica que se vea bien en móvil y escritorio.
4. Indica qué archivo(s) modificaste.
``````

### P-030 — solicitud S1/3605

Procedencia: S1, registro 3605; adjunto 88dee5e1-4514-4591-8f34-1c87011b90cd/Texto pegado.txt. Ediciones registradas en S1: 3652, 3669, 3711, 3729.

``````text
# ETAPA FINAL — CORRECCIONES TÉCNICAS Y CUMPLIMIENTO DE RÚBRICA

Actúa como desarrollador frontend senior especializado en Astro, TypeScript, accesibilidad WCAG 2.2, SEO y desarrollo web.

Estamos finalizando nuestro proyecto académico: una landing page de Ingeniería en Informática de la Universidad Tecnológica Metropolitana (UTEM).

Repositorio:
https://github.com/HighBenditas/ingenieria-informatica-utem

Ya realizamos una auditoría completa utilizando la rúbrica oficial del profesor, «Propuesta de proyecto.pdf».

La página tiene un diseño avanzado, sus funcionalidades principales funcionan y las pruebas locales de Astro y Lighthouse entregaron buenos resultados.

Ahora quiero implementar exclusivamente las correcciones técnicas y editoriales necesarias antes de publicar la versión final.

## 1. OBJETIVO

Corregir los incumplimientos comprobados de la auditoría, conservando el diseño y las funcionalidades existentes.

No quiero reconstruir la página ni agregar nuevas secciones.

Antes de modificar archivos:

- Revisa el estado actual de Git.
- Conserva los cambios locales pendientes.
- Revisa los componentes involucrados.
- Confirma qué problemas continúan presentes.
- No modifiques componentes que ya estén correctos.

## 2. CORREGIR ACCESIBILIDAD WCAG 2.5.3

La auditoría detectó problemas relacionados con el criterio WCAG 2.5.3, «Label in Name».

Archivos identificados:

- `src/components/Cite.astro`
- `src/scripts/experience.ts`

Algunos elementos muestran un texto visible que no coincide adecuadamente con su nombre accesible.

Ejemplos:

- Enlaces de referencias cuyo texto visible incluye «UTEM · ...».
- Control del carrusel cuyo texto visible es «Reproducir», pero utiliza un nombre accesible diferente.

### Trabajo solicitado

1. Inspecciona los elementos afectados.
2. Asegúrate de que el nombre accesible contenga el texto visible.
3. Mantén etiquetas comprensibles para lectores de pantalla.
4. Conserva el comportamiento del botón de pausa y reproducción.
5. Comprueba los estados dinámicos del carrusel.
6. Mantén la navegación por teclado.
7. Conserva los indicadores de foco.
8. Revisa controles similares para prevenir el mismo problema.

No recuperes los números de citas entre corchetes.

No cambies la apariencia de los enlaces ni del carrusel.

## 3. MEJORAR CLARIDAD DE SIGLAS Y REDACCIÓN

La rúbrica exige lenguaje claro, explicaciones accesibles y siglas desarrolladas en su primera aparición.

Revisa especialmente:

- DEMRE.
- PAES.
- NEM.
- M1 y M2.
- CNA.
- Otras siglas académicas presentes.

Utiliza sus denominaciones oficiales y explícitas.

Explica cada sigla cuando aparece por primera vez en el contenido principal.

Evita explicaciones excesivamente largas.

### Oraciones

Revisa textos que superen las 25 palabras recomendadas por la pauta.

Divide las oraciones cuando corresponda, conservando su significado.

No modifiques:
- Datos académicos.
- Ponderaciones.
- Fechas.
- Nombres de asignaturas.
- Referencias oficiales.
- Valores numéricos.

## 4. IDENTIFICAR LAS INTERPRETACIONES DEL EQUIPO

La auditoría encontró que la comparación entre Ingeniería en Informática, Ingeniería Civil en Computación mención Informática e Ingeniería Civil en Ciencia de Datos contiene interpretaciones elaboradas por el equipo.

La pauta exige distinguir claramente los datos institucionales de las interpretaciones.

### Trabajo solicitado

Incorpora una aclaración breve y discreta, próxima al contenido comparativo.

Texto sugerido:

«Comparación de enfoques formativos elaborada a partir de información oficial de cada carrera.»

No agregues textos editoriales extensos.

No modifiques los contenidos de la comparación.

No cambies:
- Las tres carreras.
- Su distribución.
- Los enlaces.
- Los colores.
- Las descripciones.
- Los apartados desplegables.

## 5. VERIFICAR REFERENCIAS Y APA 7

La auditoría identificó algunas inconsistencias bibliográficas.

Revisa:

- Referencias institucionales.
- Fechas de publicación.
- Fechas de consulta.
- Citas breves.
- Enlaces a la bibliografía.
- Formato APA 7.
- Desambiguación de documentos del mismo autor y año.

Corrige solamente problemas verificables.

No inventes fechas bibliográficas.

No utilices la fecha presente en una URL como prueba automática del año de publicación.

Mantén el sistema de referencias discretas que ya implementamos.

No recuperar citas numéricas como [1], [2] o [3].

No eliminar fuentes oficiales ni sus enlaces.

## 6. MALLA CURRICULAR — VERIFICACIÓN SIN MODIFICACIÓN

Conserva las 44 asignaturas y los ocho semestres actuales.

Existe una discrepancia entre el folleto de Ingeniería en Informática y la Resolución Exenta N.º 3838 de 2022.

Fuentes:

https://transparencia.utem.cl/lbt5

https://www.utem.cl/wp-content/uploads/2026/05/INGENIERIA_EN_INFORMATICA_UTEM.pdf

Revisa específicamente:

- Trabajo de Título I en semestre VII.
- Trabajo de Título II en semestre VIII.
- Nombres oficiales de asignaturas.
- Identificación del plan de estudios.
- Aplicación del plan al ingreso 2027.

No modifiques la malla automáticamente.

Si las fuentes presentan contradicciones, documenta las diferencias y señala qué confirmación institucional falta.

No inventes créditos ni prerrequisitos.

## 7. VERIFICAR README Y DOCUMENTACIÓN

Comprueba que `README.md` exista en la raíz del proyecto.

Revisa que contenga:

- Objetivo de la landing.
- Tecnologías utilizadas.
- Estructura del proyecto.
- Instrucciones de instalación.
- Ejecución local.
- Actualización de contenidos.
- Instrucciones de publicación.
- Integrantes del equipo, si sus nombres están disponibles.
- URL pública, si ya existe.

No inventes nombres ni URLs.

Si faltan datos que solo los integrantes pueden proporcionar, deja identificados esos pendientes.

Conserva la documentación existente en `docs/`.

No generes resultados ficticios de pruebas ni encuestas.

## 8. VERIFICACIONES TÉCNICAS

Una vez implementadas las correcciones, ejecuta:

1. Astro Check.
2. Build de producción.
3. Verificación de enlaces internos.
4. Validación de Content Collections.
5. Comprobación de nombres accesibles.
6. Revisión de TypeScript.
7. Revisión de los archivos modificados.
8. Comprobación de Git status.

Si tienes un navegador disponible, revisa:

- 360 px.
- 768 px.
- 1280 px.

Comprueba especialmente:

- Menú móvil.
- Carrusel.
- Botón de pausa.
- Comparación entre carreras.
- Malla interactiva.
- Preguntas frecuentes.
- Campo laboral.
- Enlaces externos.

No inventes resultados de verificaciones que no puedas ejecutar.

## 9. RESTRICCIONES GENERALES

No modificar:

- Diseño general.
- Identidad visual.
- Hero y fotografías.
- Colores.
- Tipografías.
- Estructura de las secciones.
- Funcionamiento de la malla.
- Enlaces a ofertas laborales.
- Contenido académico verificado.
- Información de Admisión 2027.

No instalar dependencias innecesarias.

No actualizar Astro durante esta etapa salvo que descubras un requisito técnico imprescindible y puedas justificarlo.

No crear nuevas funcionalidades.

No generar `INFORME.md` todavía.

No hacer commit.

No hacer push a GitHub.

No publicar en Netlify todavía.

## 10. RESULTADO FINAL

Cuando termines, entrégame un resumen con:

**A. Correcciones realizadas**
- Problemas solucionados.
- Archivos modificados.

**B. Pruebas**
- Astro Check.
- Build.
- Accesibilidad.
- Enlaces.
- Responsividad.

**C. Hallazgos académicos**
- Estado de la malla.
- Estado de las referencias.
- Problemas que requieren confirmación externa.

**D. Pendientes**
- Requisitos que siguen sin cumplirse.
- Acciones manuales necesarias.

**E. Preparación para publicación**
- Confirma si el proyecto está técnicamente preparado para subir todos los cambios a GitHub.
- Indica si existe algún error bloqueante.
- No realices todavía el commit ni el push.

## INSTRUCCIÓN FINAL

Implementa las correcciones autorizadas, verifica su funcionamiento y conserva todo el trabajo existente.

No rediseñes la página.

Prioriza el cumplimiento de la rúbrica, la accesibilidad y la estabilidad del proyecto.

**COMIENZA AHORA.**
``````

### P-031 — solicitud S1/3873

Procedencia: S1, registro 3873; adjunto 4eeb6492-f5e2-4610-a9c3-1f60bf123b15/Texto pegado.txt. Ediciones registradas en S1: 3936, 3954, 3985.

``````text
# OPTIMIZACIÓN FINAL — CUMPLIMIENTO DE LIGHTHOUSE Y COMPLIASCAN

Continúa trabajando sobre nuestra landing page de Ingeniería en Informática UTEM, desarrollada con Astro y TypeScript.

Repositorio:
https://github.com/HighBenditas/ingenieria-informatica-utem

Sitio público:
https://paginawebutem.netlify.app/

Ya publicamos el proyecto en Netlify y ejecutamos las pruebas oficiales solicitadas por la rúbrica.

## OBJETIVO

Corregir los problemas comprobados de accesibilidad y rendimiento móvil para intentar alcanzar:

- PageSpeed: mínimo 90 en las cuatro categorías.
- CompliaScan: mínimo 90/100.

No quiero rediseñar la página, eliminar contenido ni cambiar su identidad visual.

## 1. RESULTADOS REALES DE PAGESPEED

Medición de producción, versión móvil:

- Rendimiento: 61/100.
- Accesibilidad: 100/100.
- Buenas prácticas: 96/100.
- SEO: 100/100.

Métricas:

- First Contentful Paint: 5,5 segundos.
- Largest Contentful Paint: 8,0 segundos.
- Speed Index: 5,7 segundos.
- Total Blocking Time: 20 ms.
- Cumulative Layout Shift: 0.

Diagnósticos:

- JavaScript potencialmente no utilizado: 540 KiB.
- CSS potencialmente no utilizado: 112 KiB.
- Recursos que bloquean el renderizado: ahorro estimado 150 ms.
- Mejoras de imágenes: ahorro estimado 11 KiB.
- Caché: ahorro estimado 11 KiB.
- Tres tareas largas identificadas.

El análisis fue realizado con una conexión móvil lenta simulada.

### Prioridad principal

Reducir FCP y LCP sin alterar la experiencia visual.

Identifica exactamente cuál es el elemento LCP.

Verifica si corresponde a:
- Imagen principal del Hero.
- Texto del Hero.
- Otro recurso.

Comprueba:
- Qué recurso retrasa su aparición.
- Si existe lazy loading incorrecto en el elemento LCP.
- Si necesita prioridad de descarga.
- Si hay imágenes cargadas innecesariamente.
- Si fuentes, CSS o scripts bloquean la presentación.
- Si un recurso externo está causando retrasos.

No cargues todas las imágenes del carrusel con prioridad alta. Optimiza la imagen visible inicialmente y difiere las que no sean necesarias.

### JavaScript y CSS

Investiga los 540 KiB de JavaScript señalados por PageSpeed.

Distingue:
- Código propio.
- Dependencias.
- Contenido externo.
- Recursos utilizados por el video institucional.

No elimines funcionalidades por interpretar incorrectamente una advertencia de JavaScript no utilizado.

Investiga también los 112 KiB de CSS.

Reduce cargas innecesarias únicamente si se puede demostrar que no afectan ninguna sección.

## 2. RESULTADOS REALES DE COMPLIASCAN

Puntuación de producción: 83/100.

La herramienta revisó 66 reglas y reportó cinco problemas:

- Tres incumplimientos confirmados.
- Dos observaciones adicionales de buenas prácticas.
- Uno de los problemas está clasificado como serio.

### Problema comprobado A — Objetivos táctiles pequeños

Criterio relacionado: WCAG 2.2, 2.5.8.

CompliaScan detectó dos elementos afectados.

Uno tiene dimensiones aproximadas de:
185,2 px de ancho × 19,7 px de alto.

Revisa enlaces y botones pequeños, especialmente referencias, controles de navegación y enlaces del pie de página.

Corrige el tamaño y la separación según WCAG 2.2 AA, considerando las excepciones que permite el criterio.

No aumentes innecesariamente el tamaño de toda la tipografía.

Conserva el diseño visual.

### Problema comprobado B — Contenido fuera de regiones semánticas

CompliaScan detectó un elemento con contenido fuera de los landmarks correspondientes.

Revisa:
- Header.
- Navegación.
- Main.
- Footer.
- Elementos decorativos.
- Controles y contenido colocados directamente en el body.

Corrige la estructura semántica sin cambiar la distribución visual.

### Problemas adicionales

El informe señala otros problemas, pero las capturas no permiten identificarlos completamente.

Usa una auditoría accesible gratuita como axe-core o una herramienta equivalente para identificar las infracciones reales.

No inventes los problemas faltantes.

No confundas recomendaciones opcionales con incumplimientos WCAG obligatorios.

## 3. RESTRICCIONES

Mantén intactos:

- Diseño general.
- Colores y tipografías.
- Fotografías del Hero.
- Carrusel.
- Menú móvil.
- Comparación de carreras.
- Malla curricular interactiva.
- Campo laboral.
- Admisión.
- FAQ.
- Video institucional.
- Referencias y fuentes oficiales.

No elimines secciones.

No reemplaces fotografías sin autorización.

No cambies datos académicos.

No introduzcas nuevas dependencias pesadas.

No optimices exclusivamente para manipular la puntuación de Lighthouse: las mejoras deben beneficiar la experiencia real.

## 4. VERIFICACIÓN

Después de realizar las correcciones:

1. Ejecuta Astro Check.
2. Ejecuta el build de producción.
3. Comprueba la navegación móvil.
4. Comprueba el menú y el carrusel.
5. Comprueba las interacciones de la malla.
6. Revisa el diseño en 360, 768 y 1280 px.
7. Ejecuta una auditoría de accesibilidad.
8. Repite Lighthouse móvil en condiciones equivalentes si está disponible.

Compara las métricas antes y después.

No afirmes haber obtenido una nueva puntuación pública de CompliaScan o PageSpeed si no la mediste realmente.

## 5. RESULTADO ESPERADO

Entrega un resumen con:

- Causa principal del LCP elevado.
- Causa principal del FCP elevado.
- Procedencia del JavaScript potencialmente no utilizado.
- Problemas de accesibilidad identificados.
- Correcciones realizadas.
- Archivos modificados.
- Resultados de pruebas.
- Métricas anteriores y posteriores, si se pudieron obtener.
- Pendientes que requieren comprobación pública.

No hagas commit ni push todavía.

## 6. INSTRUCCIÓN FINAL

Implementa mejoras específicas de rendimiento y accesibilidad, sin realizar refactorizaciones generales.

Prioriza primero las correcciones de mayor impacto.

Conserva todos los cambios existentes.

Al terminar, confirma si la versión está preparada para un nuevo commit y despliegue automático de Netlify.

COMIENZA AHORA.
``````

### P-032 — solicitud S1/4144

Procedencia: S1, registro 4144. Ediciones registradas en S1: 4386.

``````text
# ÚLTIMA CORRECCIÓN — COMPLIASCAN 86/100

Estamos cerrando el proyecto Astro de Ingeniería en Informática UTEM.

Sitio: [https://paginawebutem.netlify.app/](https://paginawebutem.netlify.app/)

La última versión publicada obtuvo:

- PageSpeed móvil: 100 en las cuatro categorías.
- CompliaScan: 86/100.
- CompliaScan informa cuatro hallazgos: uno serio y tres moderados.

Quiero corregir los problemas auténticos de accesibilidad sin afectar el rendimiento ni rediseñar la página.

## 1. REVISAR CONTRASTE DE COLORES

CompliaScan informa:

«Elements must meet minimum color contrast ratio thresholds».

Investiga el incumplimiento WCAG 2.2, criterio 1.4.3.

Revisa:

- Texto sobre fondos claros y oscuros.
- Enlaces de referencias.
- Textos secundarios.
- Botones y estados hover/focus.
- Etiquetas de las tarjetas.
- Carrusel y textos superpuestos a imágenes.
- Controles de la malla.
- Footer.
- Elementos dinámicos.

Identifica los elementos afectados usando el DOM y los estilos calculados.

Para cada problema comprobado, informa:

- Selector o ubicación.
- Color del texto y fondo.
- Contraste actual.
- Contraste mínimo aplicable.
- Corrección aplicada.
- Contraste final.

Mantén la identidad visual actual. Prefiere ajustes pequeños y localizados de color, fondo u opacidad, en lugar de rediseñar componentes.

## 2. REVISAR LOS OTROS HALLAZGOS

CompliaScan también muestra esta advertencia:

«Ensure iframe and frame elements contain the axe-core script».

Investiga si corresponde al reproductor de YouTube.

Ten presente que la regla `frame-tested` puede indicar una limitación de cobertura del auditor en un iframe externo.

No inyectes axe-core en YouTube ni alteres el reproductor para satisfacer artificialmente el escáner.

Identifica, si es posible, el segundo incumplimiento confirmado y los hallazgos restantes.

Utiliza axe-core y comprobaciones manuales para distinguir:

- Incumplimientos WCAG demostrados.
- Advertencias de buenas prácticas.
- Limitaciones del escáner.
- Falsos positivos.

No inventes errores que no puedas reproducir.

## 3. PROTEGER EL RENDIMIENTO

La última versión publicada obtuvo 100/100 en:

- Rendimiento.
- Accesibilidad.
- Buenas prácticas.
- SEO.

Mantén las optimizaciones de carga diferida de YouTube, fotografías, CSS y JavaScript.

No elimines ninguna sección.

No cambies:

- Contenidos académicos.
- Fotografías.
- Carrusel.
- Malla interactiva.
- Menú.
- FAQ.
- Video.
- Referencias.

## 4. VALIDACIÓN

Ejecuta:

- Astro Check.
- Build de producción.
- Auditoría axe-core.
- Revisión de contraste en estados dinámicos.
- Verificación visual a 360, 768 y 1280 px.
- Lighthouse móvil en condiciones equivalentes si está disponible.

Comprueba que no existan regresiones.

No afirmes que CompliaScan ya supera 90 sin haberlo medido públicamente.

## 5. RESULTADO FINAL

Indícame:

1. Qué elementos tenían problemas de contraste.
2. Qué colores o estilos corregiste.
3. Qué hallazgos eran reales y cuáles eran limitaciones de análisis.
4. Qué archivos modificaste.
5. Qué pruebas aprobaste.
6. Si la versión está preparada para publicar.

No hagas commit ni push todavía.

Realiza únicamente las correcciones comprobadas y conserva todos los avances anteriores.
``````

## D. Relación prompt → archivos → líneas

Los rangos completos de archivo son el **ámbito actual que hay que consultar**, no la afirmación de que el prompt generó todas esas líneas. El inventario B permite localizar cada comentario; los registros de edición permiten distinguir altas, modificaciones y eliminaciones originales. Para una entrega línea a línea se requiere añadir el cruce de cada hunk histórico con las líneas supervivientes, especialmente tras `4450006`.

| ID | Archivo | Líneas actuales (ámbito) | Funcionalidad documentada | Prompt original | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| P-001 | `astro.config.mjs` | 1–42; detalle B | Resuelve el origen público, rechaza configuraciones incompatibles con producción y activa el sitemap. Node, variables de entorno y configuración Astro. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `scripts/verify-build.mjs` | 1–116; detalle B | Comprueba integridad de colecciones, estructura HTML y SEO para detener una entrega inválida. Node fs/assert, JSON y expresiones regulares. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Admision.astro` | 1–134; detalle B | Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/CampoLaboral.astro` | 1–87; detalle B | Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Cite.astro` | 1–68; detalle B | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/FAQ.astro` | 1–53; detalle B | Ordena preguntas y genera acordeones nativos con fuentes y destinos internos. Colecciones, map, details/summary. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Footer.astro` | 1–39; detalle B | Agrupa navegación final, aviso académico y redes. Componentes Astro y enlaces HTML. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Header.astro` | 1–69; detalle B | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Hero.astro` | 1–71; detalle B | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Icon.astro` | 1–43; detalle B | Selecciona un trazado SVG tipado para reutilizar símbolos coherentes. Props y Record de TypeScript, SVG inline. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/PerfilEgreso.astro` | 1–44; detalle B | Repite competencias con iconos y su cita institucional para explicar habilidades del egresado. Datos TypeScript, map, Icon y Cite. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/Respaldo.astro` | 1–71; detalle B | Distingue acreditación institucional, certificación de carrera y sede con sus fuentes. HTML editorial y Cite. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/content.config.ts` | 1–92; detalle B | Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/data/site.ts` | 1–103; detalle B | Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/layouts/BaseLayout.astro` | 1–74; detalle B | Configura documento, metadatos, idioma, salto al contenido y módulo cliente. Astro props/slot, URL, head y script. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/pages/index.astro` | 1–40; detalle B | Ensambla secciones dentro de main y layout. Imports Astro y composición declarativa. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/pages/robots.txt.ts` | 1–15; detalle B | Genera robots.txt y anuncia sitemap solo con origen configurado. Endpoint Astro, Response y plantilla de texto. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-001 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-001 | S1/16 → edición 67, 80, 93, 175; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/components/HeroCarousel.astro` | 1–128; detalle B | Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/components/Hero.astro` | 1–71; detalle B | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/layouts/BaseLayout.astro` | 1–74; detalle B | Configura documento, metadatos, idioma, salto al contenido y módulo cliente. Astro props/slot, URL, head y script. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-002 | `src/styles/experience.css` | 1–974; detalle B | Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Ver transcripción P-002 | S1/241 → edición 282, 303, 314, 331, 356, 379; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-003 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-003 | S1/462 → edición 481; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-003 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-003 | S1/462 → edición 481; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-003 | `src/styles/experience.css` | 1–974; detalle B | Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Ver transcripción P-003 | S1/462 → edición 481; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-004 | `src/components/Header.astro` | 1–69; detalle B | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Ver transcripción P-004 | S1/516 → edición 606; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-004 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-004 | S1/516 → edición 606; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-004 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-004 | S1/516 → edición 606; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-005 | `src/data/social.ts` | 1–38; detalle B | Define redes permitidas y destinos oficiales utilizados por SocialLinks. Unión de literales, interfaz y array TypeScript. | Ver transcripción P-005 | S1/639 → edición 674; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-005 | `src/components/SocialLinks.astro` | 1–105; detalle B | Relaciona redes oficiales con SVG y enlaces accesibles; adapta foco, hover y movimiento reducido. TypeScript, SVG importado y CSS scoped. | Ver transcripción P-005 | S1/639 → edición 674; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-005 | `src/components/Footer.astro` | 1–39; detalle B | Agrupa navegación final, aviso académico y redes. Componentes Astro y enlaces HTML. | Ver transcripción P-005 | S1/639 → edición 674; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-005 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-005 | S1/639 → edición 674; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/components/Header.astro` | 1–69; detalle B | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/data/site.ts` | 1–103; detalle B | Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/components/Hero.astro` | 1–71; detalle B | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/pages/index.astro` | 1–40; detalle B | Ensambla secciones dentro de main y layout. Imports Astro y composición declarativa. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/components/AccesosRapidos.astro` | 1–100; detalle B | Genera navegación hacia malla, perfil, admisión y FAQ para acortar el recorrido del postulante. Datos TypeScript, HTML y CSS scoped. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-006 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-006 | S1/928 → edición 955; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-007 | `src/components/Header.astro` | 1–69; detalle B | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Ver transcripción P-007 | S1/1031 → edición 1051; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-008 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-008 | S1/1073 → edición 1130, 1137; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-008 | `src/content.config.ts` | 1–92; detalle B | Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | Ver transcripción P-008 | S1/1073 → edición 1130, 1137; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-008 | `src/components/FAQ.astro` | 1–53; detalle B | Ordena preguntas y genera acordeones nativos con fuentes y destinos internos. Colecciones, map, details/summary. | Ver transcripción P-008 | S1/1073 → edición 1130, 1137; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-008 | `src/components/Admision.astro` | 1–134; detalle B | Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico. | Ver transcripción P-008 | S1/1073 → edición 1130, 1137; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-008 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-008 | S1/1073 → edición 1130, 1137; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-009 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-009 | S1/1198 → edición 1211, 1218; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-009 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-009 | S1/1198 → edición 1211, 1218; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-010 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-010 | S1/1276 → edición 1303; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-010 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-010 | S1/1276 → edición 1303; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-011 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-011 | S1/1354 → edición 1367; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-012 | `src/components/Cite.astro` | 1–68; detalle B | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Ver transcripción P-012 | S1/1385 → edición 1405; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-012 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-012 | S1/1385 → edición 1405; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-012 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-012 | S1/1385 → edición 1405; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-013 | `src/components/Cite.astro` | 1–68; detalle B | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Ver transcripción P-013 | S1/1458 → edición 1471; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-014 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-014 | S1/1491 → edición 1504; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-015 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-015 | S1/1524 → edición 1537; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-016 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-016 | S1/1557 → edición 1570; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-016 | `src/styles/experience.css` | 1–974; detalle B | Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Ver transcripción P-016 | S1/1557 → edición 1570; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-017 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-017 | S1/1762 → edición 1810; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-017 | `src/components/CampoLaboral.astro` | 1–87; detalle B | Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | Ver transcripción P-017 | S1/1762 → edición 1810; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-017 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-017 | S1/1762 → edición 1810; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-017 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-017 | S1/1762 → edición 1810; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-017 | `src/styles/experience.css` | 1–974; detalle B | Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Ver transcripción P-017 | S1/1762 → edición 1810; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-018 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-018 | S1/2334 → edición 2363, 2376; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-019 | `src/components/HeroCarousel.astro` | 1–128; detalle B | Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | Ver transcripción P-019 | S1/2429 → edición 2435; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-020 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-020 | S1/2465 → edición 2510; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-021 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-021 | S1/2533 → edición 2554; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-022 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-022 | S1/2568 → edición 2611; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-023 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-023 | S1/2625 → edición 2644; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-024 | `src/data/hero.ts` | 1–52; detalle B | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Ver transcripción P-024 | S1/2699 → edición 2709; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-025 | `astro.config.mjs` | 1–42; detalle B | Resuelve el origen público, rechaza configuraciones incompatibles con producción y activa el sitemap. Node, variables de entorno y configuración Astro. | Ver transcripción P-025 | S1/2724 → edición 2750, 2758, 2767; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-025 | `scripts/verify-build.mjs` | 1–116; detalle B | Comprueba integridad de colecciones, estructura HTML y SEO para detener una entrega inválida. Node fs/assert, JSON y expresiones regulares. | Ver transcripción P-025 | S1/2724 → edición 2750, 2758, 2767; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-025 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-025 | S1/2724 → edición 2750, 2758, 2767; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-025 | `src/content.config.ts` | 1–92; detalle B | Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | Ver transcripción P-025 | S1/2724 → edición 2750, 2758, 2767; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-026 | `src/components/HeroCarousel.astro` | 1–128; detalle B | Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | Ver transcripción P-026 | S1/2848 → edición 2861; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-026 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-026 | S1/2848 → edición 2861; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-027 | `src/content.config.ts` | 1–92; detalle B | Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | Ver transcripción P-027 | S1/2932 → edición 2964; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-027 | `src/components/CampoLaboral.astro` | 1–87; detalle B | Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | Ver transcripción P-027 | S1/2932 → edición 2964; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-027 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-027 | S1/2932 → edición 2964; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/Cite.astro` | 1–68; detalle B | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/Hero.astro` | 1–71; detalle B | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/PerfilEgreso.astro` | 1–44; detalle B | Repite competencias con iconos y su cita institucional para explicar habilidades del egresado. Datos TypeScript, map, Icon y Cite. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/CampoLaboral.astro` | 1–87; detalle B | Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/components/Malla.astro` | 1–142; detalle B | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-028 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-028 | S1/3054 → edición 3112, 3144, 3172, 3221; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-029 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-029 | S1/3278 → edición 3297; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-029 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-029 | S1/3278 → edición 3297; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/data/references.ts` | 1–55; detalle B | Ordena referencias y comparte desambiguación de autor/año entre citas y bibliografía. Colecciones Astro, Intl.Collator y transformaciones TypeScript. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/Cite.astro` | 1–68; detalle B | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/Referencias.astro` | 1–106; detalle B | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/SobreCarrera.astro` | 1–139; detalle B | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/Hero.astro` | 1–71; detalle B | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/Admision.astro` | 1–134; detalle B | Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/components/Respaldo.astro` | 1–71; detalle B | Distingue acreditación institucional, certificación de carrera y sede con sus fuentes. HTML editorial y Cite. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/data/site.ts` | 1–103; detalle B | Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-030 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-030 | S1/3605 → edición 3652, 3669, 3711, 3729; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-031 | `src/components/Header.astro` | 1–69; detalle B | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Ver transcripción P-031 | S1/3873 → edición 3936, 3954, 3985; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-031 | `src/components/HeroCarousel.astro` | 1–128; detalle B | Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | Ver transcripción P-031 | S1/3873 → edición 3936, 3954, 3985; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-031 | `src/components/VideoCarrera.astro` | 1–46; detalle B | Genera reproductor externo diferido y alternativa con JavaScript deshabilitado. iframe, noscript y setupDeferredVideos. | Ver transcripción P-031 | S1/3873 → edición 3936, 3954, 3985; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-031 | `src/scripts/experience.ts` | 1–400; detalle B | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Ver transcripción P-031 | S1/3873 → edición 3936, 3954, 3985; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-031 | `src/styles/global.css` | 1–1551; detalle B | Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Ver transcripción P-031 | S1/3873 → edición 3936, 3954, 3985; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |
| P-032 | `src/styles/experience.css` | 1–974; detalle B | Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Ver transcripción P-032 | S1/4144 → edición 4386; evolución Git | Parcialmente verificado: intervención histórica; no autoría integral de las líneas actuales. |

### Correspondencias actuales concretas verificadas

| ID | Archivo | Líneas actuales | Funcionalidad | Prompt original | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| P-031 | `src/components/Header.astro` | 8–17 | Banner convertido en aside con nombre accesible | Transcripción P-031 | S1/3936,3954,3985; `git show 3098a61 -- src/components/Header.astro`; compare `4450006` | Verificado para la intervención de optimización; comentarios añadidos después no atribuidos a ese prompt. |
| P-031 | `src/components/HeroCarousel.astro` | 7–12 y 38–57 | getImage y URLs diferidas para imágenes secundarias | Transcripción P-031 | S1/3936,3954,3985; `git show 3098a61 -- src/components/HeroCarousel.astro`; compare `4450006` | Verificado para la intervención de optimización; comentarios añadidos después no atribuidos a ese prompt. |
| P-031 | `src/components/VideoCarrera.astro` | 12–38 | data-video-src y alternativa noscript | Transcripción P-031 | S1/3936,3954,3985; `git show 3098a61 -- src/components/VideoCarrera.astro`; compare `4450006` | Verificado para la intervención de optimización; comentarios añadidos después no atribuidos a ese prompt. |
| P-031 | `src/scripts/experience.ts` | 46–57, 93–130 y 185–225 | Carga y decodificación de fotos y carga diferida del video | Transcripción P-031 | S1/3936,3954,3985; `git show 3098a61 -- src/scripts/experience.ts`; compare `4450006` | Verificado para la intervención de optimización; comentarios añadidos después no atribuidos a ese prompt. |
| P-031 | `src/styles/global.css` | 184–196 y 1518–1523 | Área mínima de cita y ocultación del iframe pendiente | Transcripción P-031 | S1/3936,3954,3985; `git show 3098a61 -- src/styles/global.css`; compare `4450006` | Verificado para la intervención de optimización; comentarios añadidos después no atribuidos a ese prompt. |
| P-032 | `src/styles/experience.css` | 781–785 | Superposición oscura entre 641 y 900 px; regla móvil posterior sigue teniendo precedencia | Transcripción P-032 | S1/4386; `git show beba0c6 -- src/styles/experience.css` | Verificado; el bloque corregido no tiene comentario propio. |

Las solicitudes de eliminación de textos y controles conservadas en C documentan decisiones históricas; no son prueba de que ese texto eliminado permanezca en el código actual. Las descripciones originales de fotos y etiquetas también evolucionaron. La aprobación “sii” de S1/2699 debe leerse con S1/2668 (“una de servidores estaria buena como de base de datos”) y la propuesta previa; no es una especificación autosuficiente.

## E. Prompts originales pendientes de recuperación y procedencia no verificada

| Archivo / ámbito | Funcionalidad | Qué falta | Dónde buscar | Descripción funcional comprobable |
| --- | --- | --- | --- | --- |
| `astro.config.mjs`, comentarios listados en B; 1–42 | Resuelve el origen público, rechaza configuraciones incompatibles con producción y activa el sitemap. Node, variables de entorno y configuración Astro. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `scripts/verify-build.mjs`, comentarios listados en B; 1–116 | Comprueba integridad de colecciones, estructura HTML y SEO para detener una entrega inválida. Node fs/assert, JSON y expresiones regulares. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/AccesosRapidos.astro`, comentarios listados en B; 1–100 | Genera navegación hacia malla, perfil, admisión y FAQ para acortar el recorrido del postulante. Datos TypeScript, HTML y CSS scoped. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Admision.astro`, comentarios listados en B; 1–134 | Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/CampoLaboral.astro`, comentarios listados en B; 1–87 | Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Cite.astro`, comentarios listados en B; 1–68 | Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/FAQ.astro`, comentarios listados en B; 1–53 | Ordena preguntas y genera acordeones nativos con fuentes y destinos internos. Colecciones, map, details/summary. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Footer.astro`, comentarios listados en B; 1–39 | Agrupa navegación final, aviso académico y redes. Componentes Astro y enlaces HTML. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Header.astro`, comentarios listados en B; 1–69 | Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Hero.astro`, comentarios listados en B; 1–71 | Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/HeroCarousel.astro`, comentarios listados en B; 1–128 | Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Icon.astro`, comentarios listados en B; 1–43 | Selecciona un trazado SVG tipado para reutilizar símbolos coherentes. Props y Record de TypeScript, SVG inline. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Malla.astro`, comentarios listados en B; 1–142 | Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/PerfilEgreso.astro`, comentarios listados en B; 1–44 | Repite competencias con iconos y su cita institucional para explicar habilidades del egresado. Datos TypeScript, map, Icon y Cite. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Referencias.astro`, comentarios listados en B; 1–106 | Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/Respaldo.astro`, comentarios listados en B; 1–71 | Distingue acreditación institucional, certificación de carrera y sede con sus fuentes. HTML editorial y Cite. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/SobreCarrera.astro`, comentarios listados en B; 1–139 | Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/SocialLinks.astro`, comentarios listados en B; 1–105 | Relaciona redes oficiales con SVG y enlaces accesibles; adapta foco, hover y movimiento reducido. TypeScript, SVG importado y CSS scoped. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/components/VideoCarrera.astro`, comentarios listados en B; 1–46 | Genera reproductor externo diferido y alternativa con JavaScript deshabilitado. iframe, noscript y setupDeferredVideos. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/content.config.ts`, comentarios listados en B; 1–92 | Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/data/hero.ts`, comentarios listados en B; 1–52 | Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/data/references.ts`, comentarios listados en B; 1–55 | Ordena referencias y comparte desambiguación de autor/año entre citas y bibliografía. Colecciones Astro, Intl.Collator y transformaciones TypeScript. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/data/site.ts`, comentarios listados en B; 1–103 | Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/data/social.ts`, comentarios listados en B; 1–38 | Define redes permitidas y destinos oficiales utilizados por SocialLinks. Unión de literales, interfaz y array TypeScript. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/layouts/BaseLayout.astro`, comentarios listados en B; 1–74 | Configura documento, metadatos, idioma, salto al contenido y módulo cliente. Astro props/slot, URL, head y script. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/pages/index.astro`, comentarios listados en B; 1–40 | Ensambla secciones dentro de main y layout. Imports Astro y composición declarativa. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/pages/robots.txt.ts`, comentarios listados en B; 1–15 | Genera robots.txt y anuncia sitemap solo con origen configurado. Endpoint Astro, Response y plantilla de texto. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/scripts/experience.ts`, comentarios listados en B; 1–400 | Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | Prompt que produjo los comentarios añadidos en 4450006, si se usó IA; revisión humana posterior | Conversación/exportación del integrante que preparó 4450006; registros de Claude/ChatGPT si existen | La explicación actual documenta bloques; su presencia no prueba generación con IA. |
| `src/styles/experience.css`, 1–974; `src/styles/global.css`, 1–1551 | Presentación e interacción CSS | Correspondencia final de cada regla con las múltiples revisiones, y cualquier cambio no registrado en S1 | Diffs por commit, exportaciones originales del equipo | Hay generación/asistencia histórica demostrada; no autoría íntegra de cada regla final. |

No se recuperó un prompt separado para añadir el video en `15b8003` ni para reducir su espacio en `09f49b1`. Sí se recuperó su optimización posterior (P-031). Para esas intervenciones revisar `VideoCarrera.astro` 1–46 y reglas `.video-section` de `global.css`, y pedir el registro original al autor de esos commits. El mensaje de commit solo describe una acción; no transcribe el prompt ni prueba que se usó IA.

Los commits `6a5dba5`, `c6cdcb8`, `775fde6`, `716ad85` y las modificaciones de lógica incluidas junto con comentarios en `4450006` deben contrastarse con el registro del integrante correspondiente antes de atribuir sus hunks a una herramienta. Una coincidencia temática con los prompts de C no es prueba suficiente. La procedencia de esas intervenciones concretas queda **no verificada**.

## F. Documentación línea a línea y exactitud de los comentarios

**No se puede acreditar cumplimiento integral de la exigencia línea a línea.** El proyecto tiene explicaciones de responsabilidades, entradas, eventos y decisiones, pero no una explicación individual de todas las instrucciones asistidas por IA. No se calculó un porcentaje artificial por proximidad a comentarios. Más comentarios tampoco demuestran comprensión: el equipo debe poder explicar las líneas y su resultado.

| Archivo | Ya explicado | Ámbitos que requieren explicación adicional o cruce histórico | Evaluación |
| --- | --- | --- | --- |
| `astro.config.mjs` | 10 bloques; Resuelve el origen público, rechaza configuraciones incompatibles con producción y activa el sitemap. Node, variables de entorno y configuración Astro. | 1–42: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `scripts/verify-build.mjs` | 27 bloques; Comprueba integridad de colecciones, estructura HTML y SEO para detener una entrega inválida. Node fs/assert, JSON y expresiones regulares. | 1–116: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/AccesosRapidos.astro` | 11 bloques; Genera navegación hacia malla, perfil, admisión y FAQ para acortar el recorrido del postulante. Datos TypeScript, HTML y CSS scoped. | 1–100: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Admision.astro` | 12 bloques; Presenta vías, requisitos, ponderaciones y recursos oficiales para orientar la postulación. Datos TypeScript, Cite y HTML semántico. | 1–134: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/CampoLaboral.astro` | 9 bloques; Lista áreas profesionales y búsquedas externas; evita publicar indicadores sin respaldo. Colecciones Astro, condiciones y Cite. | 1–87: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Cite.astro` | 14 bloques; Resuelve una referencia y genera su etiqueta, destino y nombre accesible para conservar trazabilidad. Props TypeScript y getPresentedReferences. | 1–68: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/FAQ.astro` | 8 bloques; Ordena preguntas y genera acordeones nativos con fuentes y destinos internos. Colecciones, map, details/summary. | 1–53: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Footer.astro` | 7 bloques; Agrupa navegación final, aviso académico y redes. Componentes Astro y enlaces HTML. | 1–39: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Header.astro` | 12 bloques; Presenta aviso académico, identidad y navegación por dispositivo. Astro, datos compartidos, aside/header/nav y details. | 1–69: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Hero.astro` | 8 bloques; Compone portada y ficha académica con fuentes. Componentes Astro, lista dl y datos compartidos. | 1–71: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/HeroCarousel.astro` | 13 bloques; Genera imágenes responsivas, contenido de portada y controles accesibles; difiere imágenes secundarias. astro:assets/getImage y atributos data-* consumidos por TypeScript. | 1–128: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Icon.astro` | 7 bloques; Selecciona un trazado SVG tipado para reutilizar símbolos coherentes. Props y Record de TypeScript, SVG inline. | 1–43: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Malla.astro` | 14 bloques; Valida y ordena ocho semestres; genera radios, leyenda, asignaturas y fuente. Colección malla, HTML semántico, data-*, CSS y TypeScript externos. | 1–142: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/PerfilEgreso.astro` | 6 bloques; Repite competencias con iconos y su cita institucional para explicar habilidades del egresado. Datos TypeScript, map, Icon y Cite. | 1–44: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Referencias.astro` | 12 bloques; Presenta bibliografía, revisión editorial y créditos recuperables desde las citas. Fechas Intl, helper APA, details e IDs. | 1–106: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/Respaldo.astro` | 6 bloques; Distingue acreditación institucional, certificación de carrera y sede con sus fuentes. HTML editorial y Cite. | 1–71: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/SobreCarrera.astro` | 12 bloques; Explica la carrera, ejemplifica un recorrido y compara alternativas sin rankings. Colección comparacion, Cite, HTML y acordeón nativo. | 1–139: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/SocialLinks.astro` | 13 bloques; Relaciona redes oficiales con SVG y enlaces accesibles; adapta foco, hover y movimiento reducido. TypeScript, SVG importado y CSS scoped. | 1–105: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/components/VideoCarrera.astro` | 6 bloques; Genera reproductor externo diferido y alternativa con JavaScript deshabilitado. iframe, noscript y setupDeferredVideos. | 1–46: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/content.config.ts` | 22 bloques; Declara contratos de datos para rechazar formas inválidas antes de publicar. Astro collections, file loader y Zod. | 14–91: explicar campos no descritos individualmente, objetos anidados, cierre y exportación; distinguir forma válida de dato académicamente correcto. | Parcial; cumplimiento literal completo no demostrado. |
| `src/data/hero.ts` | 9 bloques; Registra fotos, descripciones, encuadres y créditos del carrusel. ImageMetadata y array tipado. | 1–52: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/data/references.ts` | 13 bloques; Ordena referencias y comparte desambiguación de autor/año entre citas y bibliografía. Colecciones Astro, Intl.Collator y transformaciones TypeScript. | 24–54: sort/filter/map, empates, sufijos y reemplazo; justificar límites del año extraído y de localeCompare/Intl.Collator. | Parcial; cumplimiento literal completo no demostrado. |
| `src/data/site.ts` | 10 bloques; Centraliza datos, navegación, competencias, admisión y pendientes para reutilización editorial. Constantes y tipos TypeScript. | 1–103: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/data/social.ts` | 3 bloques; Define redes permitidas y destinos oficiales utilizados por SocialLinks. Unión de literales, interfaz y array TypeScript. | 1–38: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/layouts/BaseLayout.astro` | 16 bloques; Configura documento, metadatos, idioma, salto al contenido y módulo cliente. Astro props/slot, URL, head y script. | 1–74: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/pages/index.astro` | 4 bloques; Ensambla secciones dentro de main y layout. Imports Astro y composición declarativa. | 1–40: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/pages/robots.txt.ts` | 4 bloques; Genera robots.txt y anuncia sitemap solo con origen configurado. Endpoint Astro, Response y plantilla de texto. | 1–15: completar explicación de imports, atributos/expresiones, condiciones, iteraciones y cierres en las líneas no descritas individualmente. Inventario B localiza los segmentos y C/D distingue la evidencia disponible. | Parcial; cumplimiento literal completo no demostrado. |
| `src/scripts/experience.ts` | 62 bloques; Mejora carrusel, carga de video, revelado, menú, malla y citas sin framework cliente. DOM tipado, eventos, promesas, matchMedia e IntersectionObserver. | 48–57: orden srcset/src, delete y retorno; 95–109: contador, módulo y promesas; 198–225: load/fallback/observer; 283–318: foco y eventos; 323–388: tipos, coordenadas, mensajes y apertura de referencias. Explicar cada instrucción, no solo cada función. | Parcial; cumplimiento literal completo no demostrado. |
| `src/styles/experience.css` | 3 bloques; Define hero fotográfico, estados por semestre, revelado y ajustes responsivos. CSS, pseudoelementos, variables, :has y media queries. | Reglas, selectores, propiedades, estados y media queries: 2–457, 459–752, 754–974; en particular 781–785. Los comentarios generales no explican cada declaración. | Parcial; cumplimiento literal completo no demostrado. |
| `src/styles/global.css` | 1 bloques; Define identidad, distribución editorial, componentes y adaptación por ancho. CSS, variables, grid/flex y media queries. | Reglas, selectores, propiedades, estados y media queries: 2–1551. Los comentarios generales no explican cada declaración. | Parcial; cumplimiento literal completo no demostrado. |

### Comentarios que necesitan precisión

- `VideoCarrera.astro` 28: “si el script no corre” es más amplio que el comportamiento real. `<noscript>` se muestra con scripting deshabilitado; no es un mecanismo de recuperación ante un error de ejecución del módulo con JavaScript habilitado. Lo mismo limita la generalización de `experience.ts` 1–6 sobre todo el contenido cuando JavaScript falla.
- `VideoCarrera.astro` 15: el dominio youtube-nocookie no demuestra por inspección de este código una promesa absoluta de ausencia de cookies hasta reproducir. Documentar el modo de privacidad mejorada sin atribuir garantías externas no verificadas en esta auditoría.
- `SobreCarrera.astro` 39: dice que el texto aclara expresamente que no es proyecto institucional. El bloque visible 41–50 muestra “IMAGINA, POR EJEMPLO” y la aplicación ilustrativa, pero ya no incluye la frase explícita eliminada por el usuario. El comentario debe describir esa presentación real.
- `experience.ts` 77–92 y 152–166: distinguir pausa por foco (`focused`) de pausa persistente (`pausedByUser`). Al enfocar un elemento distinto del botón de reproducción se fija la pausa del usuario; salir no garantiza reanudación.
- `experience.ts` 185–193: la promesa se resuelve también si decode falla porque el error se captura. El comentario “hasta que la primera esté lista” simplifica esa ruta; explicar el catch y el temporizador.
- `src/content.config.ts` 1–3: un esquema valida estructura/tipos; no asegura que una cifra académica sea verdadera. `consulted` 25–26 comprueba formato, no validez calendárica. La integridad de fuentes también depende del verificador.
- Los comentarios sobre revisión de redes (`src/data/social.ts` 13–14), licencia y fuentes describen afirmaciones históricas; esta auditoría no revalidó las URLs ni certifica esas fechas de consulta.

### Cobertura concreta de tramos con asistencia demostrada

Los bloques verificados en D —incluido el CSS 781–785 sin comentario propio— necesitan explicación de cada instrucción para satisfacer literalmente la pauta. Añadir a un anexo la razón de la prioridad de la primera foto, eliminación de data-* tras cargar, decode/catch, observación del contenedor, alternativa noscript, min-height y composición de los degradados. En los demás bloques, usar el diff original antes de afirmar qué líneas concretas fueron generadas por IA.

## G. Participación del equipo y cierre de pendientes

Git registra `4450006` con autor Wskrdmon y mensaje “modificacion de archivos y comentarios”. Eso demuestra incorporación al historial, no redacción manual ni uso de Claude, ChatGPT o Codex. No se asigna a una persona la autoría intelectual de todos los comentarios. README declara tres herramientas; docs/uso-ia.md menciona Codex y ChatGPT. Falta confirmar con el equipo la declaración completa y los registros de Claude.

La conversación S1 prueba decisiones humanas del usuario: petición de filtros por semestre, revisión de alternativas fotográficas y aprobación de la foto de servidores. También prueba intervenciones de Codex mediante las operaciones citadas. No prueba una defensa oral, revisión académica por ambos integrantes ni pruebas de usuarios. Las contribuciones individuales restantes quedan pendientes de confirmación.

Para completar el anexo del informe:

1. Conservar una exportación privada y revisable de S1 y de los adjuntos citados; no publicar el historial completo con rutas privadas, herramientas o contexto ajeno. Este borrador transcribe solo las solicitudes pertinentes.
2. Recuperar el registro del autor de 4450006 y las conversaciones de Claude/ChatGPT. Si los comentarios fueron humanos, declarar esa revisión humana sin inventar un prompt.
3. Completar el cruce hunk → líneas supervivientes y explicar línea a línea los bloques asistidos por IA. Registrar tarea, herramienta, prompt y cambios posteriores al resultado; no reemplazar el prompt por un resumen.
4. Corregir documentalmente las imprecisiones de F en una etapa posterior autorizada; este análisis no cambió el código.
5. Integrar o enlazar este borrador desde INFORME.md cuando el equipo cree su informe. Pedir al profesor confirmación de si admite explicación línea a línea en anexo o exige comentarios inline.
6. Registrar quién revisó y puede defender cada módulo. No completar nombres, firmas, fechas o modelos que no estén acreditados.

## Listado de archivos revisados

- `astro.config.mjs`
- `scripts/verify-build.mjs`
- `src/components/AccesosRapidos.astro`
- `src/components/Admision.astro`
- `src/components/CampoLaboral.astro`
- `src/components/Cite.astro`
- `src/components/FAQ.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/Hero.astro`
- `src/components/HeroCarousel.astro`
- `src/components/Icon.astro`
- `src/components/Malla.astro`
- `src/components/PerfilEgreso.astro`
- `src/components/Referencias.astro`
- `src/components/Respaldo.astro`
- `src/components/SobreCarrera.astro`
- `src/components/SocialLinks.astro`
- `src/components/VideoCarrera.astro`
- `src/content.config.ts`
- `src/data/hero.ts`
- `src/data/references.ts`
- `src/data/site.ts`
- `src/data/social.ts`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/robots.txt.ts`
- `src/scripts/experience.ts`
- `src/styles/experience.css`
- `src/styles/global.css`

Adicionales: README.md; docs/uso-ia.md; docs/verificaciones-entrega.md; docs/hallazgos-finales.md; .env.example; .gitignore; .nvmrc; netlify.toml; package.json; package-lock.json; tsconfig.json; las cinco colecciones JSON listadas en B; pauta PDF y adjuntos originales citados en C. Se usó el historial Git de los archivos propios.

## Verificación de esta auditoría

Solo se creó este documento, sin modificar componentes, scripts, estilos, dependencias ni publicación. No se ejecutaron pruebas de build porque no hubo cambios de código. El inventario no sustituye una nueva auditoría de funcionamiento o fuentes académicas.
