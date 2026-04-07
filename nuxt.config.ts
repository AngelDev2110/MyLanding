// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Angel De La Torre — Frontend Developer",
      meta: [
        {
          name: "description",
          content:
            "Personal portfolio of Angel De La Torre, a Frontend Developer based in México specializing in Vue.js, Nuxt, React and TypeScript.",
        },
        { name: "author", content: "Angel De La Torre" },
        {
          property: "og:title",
          content: "Angel De La Torre — Frontend Developer",
        },
        {
          property: "og:description",
          content:
            "Frontend Developer based in México. Crafting interfaces that feel as good as they look.",
        },
        { property: "og:type", content: "website" },
        { name: "theme-color", content: "#0e1116" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap",
        },
      ],
    },
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
      { name: "Lora", weights: [400, 600, 700] },
      { name: "Nunito", weights: [400, 500, 600, 700] },
    ],
  },

  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json", language: "en-US" },
      { code: "es", name: "Español", file: "es.json", language: "es-ES" },
    ],
  },
});
