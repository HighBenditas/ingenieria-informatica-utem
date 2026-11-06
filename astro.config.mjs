import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

// Define SITE_URL with the real HTTPS origin before the production deployment.
if (existsSync(".env")) loadEnvFile(".env");
const site = process.env.SITE_URL;
if (site && new URL(site).protocol !== "https:")
  throw new Error("SITE_URL debe usar HTTPS.");
export default defineConfig({
  output: "static",
  site,
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
