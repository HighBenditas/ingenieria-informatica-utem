// Genera el archivo /robots.txt, que les dice a los buscadores qué pueden revisar del sitio.
import type { APIRoute } from "astro";

// "site" es la URL pública configurada en astro.config.mjs (puede no existir en un build local).
export const GET: APIRoute = ({ site }) => {
  // Si hay URL pública, se agrega la línea que anuncia dónde está el sitemap; si no, queda vacía.
  const sitemap = site
    ? "\nSitemap: " + new URL("sitemap-index.xml", site).href
    : "";
  // "User-agent: *" = todos los buscadores; "Allow: /" = pueden revisar todo el sitio.
  return new Response("User-agent: *\nAllow: /\n" + sitemap, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
