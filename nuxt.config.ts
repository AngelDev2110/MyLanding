const SITE_URL = "https://www.angeldlt.dev";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      // title, description, og/twitter texts and images are set per locale in app.vue
      meta: [
        { name: "author", content: "Angel De La Torre" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Angel De La Torre" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#0d1116" },
      ],
      // ~A mark (terminal home + initial): SVG for modern browsers, .ico (16/32/48) as fallback
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },

  runtimeConfig: {
    public: { siteUrl: SITE_URL },
  },

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "~/assets/sass/colors.sass" as *;\n@use "~/assets/sass/variables.sass" as *;\n`,
        },
      },
    },
  },

  modules: ["@nuxt/fonts", "@nuxtjs/i18n"],

  fonts: {
    families: [
      {
        name: "Fraunces",
        weights: [600, 700, 800],
        styles: ["normal"],
        // opsz axis isn't requested by default; without it large sizes lose Fraunces' display cut
        providerOptions: {
          google: { experimental: { variableAxis: { opsz: [["9", "144"]] } } },
        },
      },
      { name: "Nunito", weights: [400, 500, 600, 700] },
      { name: "JetBrains Mono", weights: [400, 500, 700] },
    ],
  },

  i18n: {
    baseUrl: SITE_URL,
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json", language: "en-US" },
      { code: "es", name: "Español", file: "es.json", language: "es-ES" },
    ],
  },

  nitro: {
    routeRules: {
      "/angel-front-themes/**": {
        proxy: "https://angel-front-themes.vercel.app/angel-front-themes/**",
      },
      "/noob-draw/**": { proxy: "https://noob-draw.vercel.app/noob-draw/**" },
    },
  },
});
