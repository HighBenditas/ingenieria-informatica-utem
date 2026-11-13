import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
const contentNames = ["referencias", "malla", "campo-laboral", "faq", "comparacion"];
const content = Object.fromEntries(contentNames.map((name) => {
  const entries = JSON.parse(readFileSync(`src/content/${name}.json`, "utf8"));
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length,
    `IDs duplicados en ${name}`);
  return [name, entries];
}));
const sourceIds = new Set(content.referencias.map((entry) => entry.id));
assert.equal(new Set(content.referencias.map((entry) => entry.number)).size,
  content.referencias.length, "Números de referencias duplicados");
for (const name of contentNames.filter((name) => name !== "referencias"))
  for (const entry of content[name])
    assert(sourceIds.has(entry.source), `Fuente inexistente en ${name}: ${entry.source}`);
const html = readFileSync("dist/index.html", "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(ids.length, new Set(ids).size, "Hay IDs duplicados");
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, "Debe existir un H1");
assert.match(html, /lang="es-CL"/);
for (const match of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.includes(match[1]), "Ancla sin destino: " + match[1]);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g))
  assert(existsSync("dist" + match[1]), "Recurso ausente: " + match[1]);
assert.equal((html.match(/<article\b[^>]*data-year="[1-4]"/g) || []).length, 8, "Faltan semestres");
assert.equal(
  (html.match(/<script/g) || []).length,
  1,
  "Se esperaba un único módulo ligero de interacción",
);
assert.equal(
  (html.match(/data-slide /g) || []).length,
  3,
  "Faltan imágenes en el carrusel",
);
assert.equal(
  (html.match(/class="course-card"/g) || []).length,
  44,
  "Revisar la cantidad de asignaturas",
);
assert.match(html, /Proyecto académico estudiantil/);
const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
const robots = readFileSync("dist/robots.txt", "utf8");
if (canonical) {
  const url = new URL(canonical[1]);
  assert.equal(url.protocol, "https:");
  assert(!/^(localhost|127\..*|\[::1\])$/i.test(url.hostname));
  assert(html.includes(`property="og:url" content="${canonical[1]}"`));
  assert(html.includes(`property="og:image" content="${url.origin}/images/social.png"`));
  assert(existsSync("dist/images/social.png"));
  const sitemapUrl = new URL("sitemap-index.xml", url).href;
  assert(robots.includes(`Sitemap: ${sitemapUrl}`), "robots.txt debe anunciar el sitemap");
  const index = readFileSync("dist/sitemap-index.xml", "utf8");
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)];
  assert(maps.length > 0, "Índice sitemap vacío");
  for (const [, location] of maps) {
    const mapUrl = new URL(location);
    assert.equal(mapUrl.origin, url.origin);
    const xml = readFileSync("dist" + mapUrl.pathname, "utf8");
    assert(xml.includes(`<loc>${canonical[1]}</loc>`), "Falta la landing en el sitemap");
  }
  console.log("SEO verificado: canonical, Open Graph, robots e índice sitemap coherentes.");
} else {
  assert(!html.includes('property="og:url"'));
  assert(!html.includes('property="og:image"'));
  assert(!robots.includes("Sitemap:"));
  console.log("Build local sin URL pública: SEO absoluto pendiente de SITE_URL.");
}
console.log(
  "HTML verificado: un H1, IDs únicos, anclas y recursos válidos, ocho semestres, tres imágenes y un módulo de interacción.",
);
