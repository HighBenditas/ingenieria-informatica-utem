// Prepara las referencias para mostrarlas: las ordena como en APA 7 y calcula la fecha que se
// usa en las citas. Lo usan Cite.astro (citas cortas) y Referencias.astro (lista final), de modo
// que ambas muestren siempre lo mismo.
import { getCollection, type CollectionEntry } from "astro:content";

// Una referencia tal como viene del JSON.
type Reference = CollectionEntry<"referencias">;
// Una referencia ya preparada: el JSON más dos campos calculados.
export type PresentedReference = Reference & {
  // Año para la cita corta (por ejemplo "2026a").
  citationDate: string;
  // Fecha completa con el mismo sufijo, para la lista de referencias.
  bibliographicDate: string;
};

// Comparador de texto en español que ignora mayúsculas y tildes al ordenar (sensitivity: "base").
const collator = new Intl.Collator("es", { sensitivity: "base" });
// Saca el año (1900 a 2099) del campo "date"; si no hay año, devuelve "s. f." (sin fecha).
const publicationYear = (entry: Reference): string =>
  entry.data.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? "s. f.";

// Share APA ordering and same-author/year suffixes between citations and bibliography.
// Devuelve las referencias ordenadas y con sus fechas de cita calculadas.
export async function getPresentedReferences(): Promise<PresentedReference[]> {
  // Orden APA: por autor, luego por año (las "s. f." cuentan como 0, van primero) y luego por título.
  // "||" pasa al siguiente criterio solo si el anterior empata (da 0).
  const entries = (await getCollection("referencias")).sort((a, b) =>
    collator.compare(a.data.author, b.data.author) ||
    Number(publicationYear(a).replace("s. f.", "0")) -
      Number(publicationYear(b).replace("s. f.", "0")) ||
    collator.compare(a.data.title, b.data.title),
  );
  return entries.map((entry) => {
    const year = publicationYear(entry);
    // Referencias con el mismo autor y el mismo año: en APA se distinguen con a, b, c...
    const peers = entries.filter((other) =>
      other.data.author === entry.data.author && publicationYear(other) === year,
    );
    // Si hay más de una, la letra se calcula con su posición (97 es el código de la "a").
    const suffix = peers.length > 1
      ? String.fromCharCode(97 + peers.findIndex((other) => other.id === entry.id))
      : "";
    // Fecha de cita: "s. f.-a" si no tiene año, o el año con la letra (por ejemplo "2026a").
    const citationDate = year === "s. f." && suffix
      ? `${year}-${suffix}`
      : year + suffix;
    return {
      ...entry,
      citationDate,
      // En la fecha completa se reemplaza el año por el año con su letra.
      bibliographicDate: entry.data.date.replace(year, citationDate),
    };
  });
}
