// @ts-check
import { fileURLToPath, URL } from "node:url";
// import vercelAdapter from "@astrojs/vercel";
import node from "@astrojs/node";

// import playformCompress from "@playform/compress";

import sitemap from "@astrojs/sitemap";

import vercelAdapter from "@astrojs/vercel";

import markdownIntegration from "@astropub/md";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import { highlighter } from "./src/lib/shiki";

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
    syntaxHighlight: "shiki",
    shikiConfig: {
      defaultColor: false,
      themes: {
        light: "aurora-x",
        dark: "catppuccin-mocha",
      },
    },
    // rehypePlugins: [
    //   [
    //     rehypePrettyCode,
    //     {
    //       theme: {
    //         light: "catppuccin-latte",
    //         dark: "catppuccin-mocha",
    //       },
    //       getHighlighter: () => highlighter,
    //     },
    //   ],
    // ],
  },
  integrations: [markdownIntegration(), sitemap()],
  // adapter: node({
  //   mode: "standalone",
  // }),
  adapter: vercelAdapter(),
});
