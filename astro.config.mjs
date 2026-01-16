// @ts-check
import { fileURLToPath, URL } from "node:url";
// import vercelAdapter from "@astrojs/vercel";
import node from "@astrojs/node";

// import playformCompress from "@playform/compress";

import sitemap from "@astrojs/sitemap";

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
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
    },
  },
  integrations: [markdownIntegration(), sitemap()],
  adapter: node({
    mode: "standalone",
  }),
});
