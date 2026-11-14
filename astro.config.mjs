// Configuración de Astro. Aquí se decide la URL pública del sitio, que alimenta el sitemap,
// la URL canónica y Open Graph (ver BaseLayout.astro y src/pages/robots.txt.ts).
import { defineConfig } from "astro/config";
// Integración oficial que genera sitemap-index.xml.
import sitemap from "@astrojs/sitemap";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

// Define SITE_URL with the real HTTPS origin before the production deployment.
// Si existe un archivo .env local, carga sus variables (por ejemplo SITE_URL).
if (existsSync(".env")) loadEnvFile(".env");
// Netlify URL is the primary site URL, unlike per-preview DEPLOY_URL.
// URL del sitio: primero SITE_URL; si no existe y se está construyendo en Netlify, usa la variable URL de Netlify.
const configuredSite = process.env.SITE_URL?.trim() ||
  (process.env.NETLIFY === "true" ? process.env.URL?.trim() : undefined);
let site;
if (configuredSite) {
  const url = new URL(configuredSite);
  // Rechaza URLs que no sean un origen público HTTPS simple: sin HTTP, usuario, contraseña,
  // parámetros, fragmento, ruta ni dirección local (localhost).
  if (url.protocol !== "https:" || url.username || url.password ||
      url.search || url.hash || url.pathname !== "/" ||
      /^(localhost|127\..*|\[::1\])$/i.test(url.hostname))
    throw new Error("SITE_URL debe ser un origen público HTTPS, sin ruta, credenciales ni parámetros.");
  site = url.origin;
}
// En Netlify es obligatorio tener URL: si falta, el despliegue FALLA para no publicar un sitio incompleto.
if (process.env.NETLIFY === "true" && !site)
  throw new Error("Define SITE_URL o la URL principal de Netlify antes de desplegar.");
// En un build local sin URL solo se muestra una advertencia.
if (!site && process.argv.includes("build"))
  console.warn("Build local sin SITE_URL: no se generarán sitemap ni URLs canónicas. Configura el origen real antes de publicar.");
export default defineConfig({
  // "static": genera HTML estático (sin servidor).
  output: "static",
  site,
  // El sitemap solo se genera si hay URL pública.
  integrations: site ? [sitemap()] : [],
  // Oculta la barra de herramientas de desarrollo de Astro.
  devToolbar: { enabled: false },
});
