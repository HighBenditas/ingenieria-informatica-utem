import { getCollection, type CollectionEntry } from "astro:content";

type Reference = CollectionEntry<"referencias">;
export type PresentedReference = Reference & {
  citationDate: string;
  bibliographicDate: string;
};

const collator = new Intl.Collator("es", { sensitivity: "base" });
const publicationYear = (entry: Reference): string =>
  entry.data.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? "s. f.";

// Share APA ordering and same-author/year suffixes between citations and bibliography.
export async function getPresentedReferences(): Promise<PresentedReference[]> {
  const entries = (await getCollection("referencias")).sort((a, b) =>
    collator.compare(a.data.author, b.data.author) ||
    Number(publicationYear(a).replace("s. f.", "0")) -
      Number(publicationYear(b).replace("s. f.", "0")) ||
    collator.compare(a.data.title, b.data.title),
  );
  return entries.map((entry) => {
    const year = publicationYear(entry);
    const peers = entries.filter((other) =>
      other.data.author === entry.data.author && publicationYear(other) === year,
    );
    const suffix = peers.length > 1
      ? String.fromCharCode(97 + peers.findIndex((other) => other.id === entry.id))
      : "";
    const citationDate = year === "s. f." && suffix
      ? `${year}-${suffix}`
      : year + suffix;
    return {
      ...entry,
      citationDate,
      bibliographicDate: entry.data.date.replace(year, citationDate),
    };
  });
}
