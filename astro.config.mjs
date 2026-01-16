// @ts-check
import { fileURLToPath, URL } from "node:url";
import sitemap from "@astrojs/sitemap";

// import playformCompress from "@playform/compress";

import vercelAdapter from "@astrojs/vercel";

import markdownIntegration from "@astropub/md";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ruhann.me",

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },
  integrations: [markdownIntegration(), sitemap()],
  adapter: vercelAdapter(),
});
