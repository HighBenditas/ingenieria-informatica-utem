import { defineCollection, reference } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const text = z.string().trim().min(1);
const referencias = defineCollection({
  loader: file("src/content/referencias.json"),
  schema: z.object({
    number: z.number().int().positive(),
    author: text,
    date: text,
    title: text,
    url: z.url(),
    consulted: z.literal("2026-11-05"),
  }),
});
const malla = defineCollection({
  loader: file("src/content/malla.json"),
  schema: z.object({
    semester: z.number().int().min(1).max(8),
    year: z.number().int().min(1).max(4),
    courses: z.array(text).min(1),
    source: reference("referencias"),
  }),
});
const laboral = defineCollection({
  loader: file("src/content/campo-laboral.json"),
  schema: z.object({
    order: z.number().int(),
    title: text,
    description: text,
    source: reference("referencias"),
  }),
});
const faq = defineCollection({
  loader: file("src/content/faq.json"),
  schema: z.object({
    order: z.number().int(),
    question: text,
    answer: text,
    internalLink: z
      .object({
        href: z.string().regex(/^#[a-z][a-z0-9-]*$/),
        label: text,
      })
      .optional(),
    source: reference("referencias"),
  }),
});
export const collections = { referencias, malla, laboral, faq };
