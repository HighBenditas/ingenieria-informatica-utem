// Define las "colecciones de contenido": los datos del sitio (malla, FAQ, etc.) se guardan en
// archivos JSON y cada colección tiene un ESQUEMA que dice qué campos y tipos debe tener.
// Si un dato no cumple su esquema, el build FALLA y no se publica información incompleta o mal escrita.
import { defineCollection, reference } from "astro:content";
// file() le dice a Astro que cada colección se lee desde un único archivo JSON.
import { file } from "astro/loaders";
// Zod es la librería que describe y valida los esquemas.
import { z } from "astro/zod";

// Texto no vacío: se le quitan los espacios de los extremos y debe tener al menos 1 carácter.
const text = z.string().trim().min(1);

// Referencias bibliográficas (src/content/referencias.json).
const referencias = defineCollection({
  loader: file("src/content/referencias.json"),
  schema: z.object({
    // Número entero positivo de la referencia.
    number: z.number().int().positive(),
    author: text,
    // Fecha de publicación tal como se escribe en APA (por ejemplo "2026, 18 de octubre" o "s. f.").
    date: text,
    title: text,
    // Debe ser una URL válida.
    url: z.url(),
    // Fecha de consulta con formato AAAA-MM-DD (por ejemplo 2026-11-12).
    consulted: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

// Malla curricular (src/content/malla.json): un registro por semestre.
const malla = defineCollection({
  loader: file("src/content/malla.json"),
  schema: z.object({
    // Semestre entre 1 y 8 y año entre 1 y 4.
    semester: z.number().int().min(1).max(8),
    year: z.number().int().min(1).max(4),
    // Lista de asignaturas: al menos una.
    courses: z.array(text).min(1),
    // Fuente: debe ser el ID de una referencia que exista. Si no existe, falla el build.
    source: reference("referencias"),
  }),
});

// Campo laboral (src/content/campo-laboral.json): áreas de desempeño.
const laboral = defineCollection({
  loader: file("src/content/campo-laboral.json"),
  schema: z.object({
    // Posición en la que se muestra.
    order: z.number().int(),
    title: text,
    description: text,
    // Enlace a ofertas laborales (URL válida).
    offersUrl: z.url(),
    source: reference("referencias"),
  }),
});

// Preguntas frecuentes (src/content/faq.json).
const faq = defineCollection({
  loader: file("src/content/faq.json"),
  schema: z.object({
    order: z.number().int(),
    question: text,
    answer: text,
    // Enlace interno opcional. El destino debe tener forma de ancla: "#" + minúsculas, números o guiones.
    internalLink: z
      .object({
        href: z.string().regex(/^#[a-z][a-z0-9-]*$/),
        label: text,
      })
      .optional(),
    source: reference("referencias"),
  }),
});

// Comparación detallada de carreras (src/content/comparacion.json).
const comparacion = defineCollection({
  loader: file("src/content/comparacion.json"),
  schema: z.object({
    order: z.number().int().positive(),
    // Duración (por ejemplo "8 semestres") y nombre de la carrera.
    duration: text,
    name: text,
    // Resumen de una línea que se muestra en la tarjeta de comparación.
    summary: text,
    // Exactamente tres apartados, cada uno con etiqueta y texto.
    details: z.array(z.object({ label: text, text })).length(3),
    source: reference("referencias"),
  }),
});

// Enlace opcional: dirección válida y texto visible.
const link = z.object({ href: z.url(), label: text }).optional();

// Respaldo institucional (src/content/respaldo.json): acreditación, certificación y sede.
const respaldo = defineCollection({
  loader: file("src/content/respaldo.json"),
  schema: z.object({
    // El registro con order 1 se muestra como tarjeta principal.
    order: z.number().int().positive(),
    eyebrow: text,
    // Cifra destacada opcional (por ejemplo "5" "años").
    highlight: z.object({ value: text, unit: text }).optional(),
    title: text,
    text,
    // Nota aclaratoria opcional, en letra más pequeña.
    note: text.optional(),
    link,
    source: reference("referencias"),
  }),
});

// Pasos de admisión (src/content/admision.json).
const admision = defineCollection({
  loader: file("src/content/admision.json"),
  schema: z.object({
    order: z.number().int().positive(),
    title: text,
    text,
    link,
    // Uno o más IDs de referencias; cada uno debe existir.
    sources: z.array(reference("referencias")).min(1),
  }),
});

// Lista de colecciones que Astro debe conocer.
export const collections = { referencias, malla, laboral, faq, comparacion, respaldo, admision };
