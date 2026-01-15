import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  astro: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  formatters: {
    css: "prettier",
    html: "prettier",
    prettierOptions: {
      semi: true,
      singleQuote: false,
    },
  },
  lessOpinionated: true,
  ignores: [
    "public/",
  ],
}, {
  rules: {
    "style/no-tabs": "off",
    // "no-console": ["warn"],
  },
});
