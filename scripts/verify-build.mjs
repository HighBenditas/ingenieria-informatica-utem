// Verificador del build: se ejecuta con "npm run verify" DESPUÉS de "astro build".
// Revisa que el HTML generado (carpeta dist/) y los archivos de contenido cumplan las reglas
// del proyecto. Si alguna comprobación falla (assert), el comando termina con error.
import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

// ---------- 1. Contenido (archivos JSON de src/content) ----------
// Las cinco colecciones que se revisan.
const contentNames = ["referencias", "malla", "campo-laboral", "faq", "comparacion", "respaldo", "admision"];
// Lee cada JSON y comprueba que no haya IDs repetidos dentro de la misma colección.
// Object.fromEntries arma un objeto { nombre: lista de registros }.
const content = Object.fromEntries(contentNames.map((name) => {
  const entries = JSON.parse(readFileSync(`src/content/${name}.json`, "utf8"));
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length,
    `IDs duplicados en ${name}`);
  return [name, entries];
}));

// IDs de todas las referencias disponibles.
const sourceIds = new Set(content.referencias.map((entry) => entry.id));
// Los números de las referencias no pueden repetirse.
assert.equal(new Set(content.referencias.map((entry) => entry.number)).size,
  content.referencias.length, "Números de referencias duplicados");
// Cada registro de las demás colecciones debe citar una referencia que exista.
// Algunos registros tienen una sola fuente ("source") y otros varias ("sources").
for (const name of contentNames.filter((name) => name !== "referencias"))
  for (const entry of content[name])
    for (const source of entry.sources ?? [entry.source])
      assert(sourceIds.has(source), `Fuente inexistente en ${name}: ${source}`);

// ---------- 2. Estructura del HTML generado ----------
// Lee la página final que se publicará.
const html = readFileSync("dist/index.html", "utf8");
// Lista de todos los id="..." de la página.
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
// No puede haber IDs repetidos.
assert.equal(ids.length, new Set(ids).size, "Hay IDs duplicados");
// Debe haber exactamente un título principal <h1> (buena práctica de accesibilidad y SEO).
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, "Debe existir un H1");
// El idioma de la página debe ser español de Chile.
assert.match(html, /lang="es-CL"/);
// Todo enlace interno (#algo) debe apuntar a un id que exista.
for (const match of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.includes(match[1]), "Ancla sin destino: " + match[1]);
// Todo recurso local (imagen, archivo, enlace que empieza con "/") debe existir en dist/.
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g))
  assert(existsSync("dist" + match[1]), "Recurso ausente: " + match[1]);
// Deben estar los 8 semestres de la malla (data-year entre 1 y 4).
assert.equal((html.match(/<article\b[^>]*data-year="[1-4]"/g) || []).length, 8, "Faltan semestres");
// Solo debe haber UN <script>: el módulo de interacción (regla de JavaScript mínimo).
assert.equal(
  (html.match(/<script/g) || []).length,
  1,
  "Se esperaba un único módulo ligero de interacción",
);

// El carrusel debe tener 3 diapositivas.
assert.equal(
  (html.match(/data-slide /g) || []).length,
  3,
  "Faltan imágenes en el carrusel",
);

// La malla debe tener 44 asignaturas en total.
assert.equal(
  (html.match(/class="course-card"/g) || []).length,
  44,
  "Revisar la cantidad de asignaturas",
);

// Debe estar el aviso de que es un proyecto académico (no oficial).
assert.match(html, /Proyecto académico estudiantil/);

// ---------- 3. SEO ----------
// Busca la URL canónica en el HTML. Solo existe si el build tuvo SITE_URL (ver astro.config.mjs).
const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
// Lee el robots.txt generado.
const robots = readFileSync("dist/robots.txt", "utf8");

if (canonical) {
  // Build con URL pública: se verifica el SEO completo.
  const url = new URL(canonical[1]);
  // La URL debe ser HTTPS y no puede ser de la computadora local.
  assert.equal(url.protocol, "https:");
  assert(!/^(localhost|127\..*|\[::1\])$/i.test(url.hostname));
  // Open Graph: la URL y la imagen para compartir deben coincidir con la canónica.
  assert(html.includes(`property="og:url" content="${canonical[1]}"`));
  assert(html.includes(`property="og:image" content="${url.origin}/images/social.png"`));
  assert(existsSync("dist/images/social.png"));

  // robots.txt debe anunciar el sitemap.
  const sitemapUrl = new URL("sitemap-index.xml", url).href;
  assert(robots.includes(`Sitemap: ${sitemapUrl}`), "robots.txt debe anunciar el sitemap");

  // El índice del sitemap no puede estar vacío.
  const index = readFileSync("dist/sitemap-index.xml", "utf8");
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)];
  assert(maps.length > 0, "Índice sitemap vacío");

  // Cada sitemap listado debe ser del mismo dominio y contener la página principal.
  for (const [, location] of maps) {
    const mapUrl = new URL(location);
    assert.equal(mapUrl.origin, url.origin);
    const xml = readFileSync("dist" + mapUrl.pathname, "utf8");
    assert(xml.includes(`<loc>${canonical[1]}</loc>`), "Falta la landing en el sitemap");
  }
  console.log("SEO verificado: canonical, Open Graph, robots e índice sitemap coherentes.");
} else {
  // Build local sin URL pública: no debe haber URLs absolutas a medias.
  assert(!html.includes('property="og:url"'));
  assert(!html.includes('property="og:image"'));
  assert(!robots.includes("Sitemap:"));
  console.log("Build local sin URL pública: SEO absoluto pendiente de SITE_URL.");
}
console.log(
  "HTML verificado: un H1, IDs únicos, anclas y recursos válidos, ocho semestres, tres imágenes y un módulo de interacción.",
);
