import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
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
console.log(
  "HTML verificado: un H1, IDs únicos, anclas y recursos válidos, ocho semestres, tres imágenes y un módulo de interacción.",
);
