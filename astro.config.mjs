import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

// Define SITE_URL with the real HTTPS origin before the production deployment.
if (existsSync(".env")) loadEnvFile(".env");
// Netlify URL is the primary site URL, unlike per-preview DEPLOY_URL.
const configuredSite = process.env.SITE_URL?.trim() ||
  (process.env.NETLIFY === "true" ? process.env.URL?.trim() : undefined);
let site;
if (configuredSite) {
  const url = new URL(configuredSite);
  if (url.protocol !== "https:" || url.username || url.password ||
      url.search || url.hash || url.pathname !== "/" ||
      /^(localhost|127\..*|\[::1\])$/i.test(url.hostname))
    throw new Error("SITE_URL debe ser un origen público HTTPS, sin ruta, credenciales ni parámetros.");
  site = url.origin;
}
if (process.env.NETLIFY === "true" && !site)
  throw new Error("Define SITE_URL o la URL principal de Netlify antes de desplegar.");
if (!site && process.argv.includes("build"))
  console.warn("Build local sin SITE_URL: no se generarán sitemap ni URLs canónicas. Configura el origen real antes de publicar.");
export default defineConfig({
  output: "static",
  site,
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
