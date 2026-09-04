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
        { property: "og:image", content: "/img/me.jpeg" },
        { property: "og:image:width", content: "1280" },
        { property: "og:image:height", content: "960" },
        {
          property: "og:image:alt",
          content: "Angel De La Torre — Frontend Developer",
        },
        { property: "og:site_name", content: "Angel De La Torre" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Angel De La Torre — Frontend Developer",
        },
        {
          name: "twitter:description",
          content:
            "Frontend Developer based in México. Crafting interfaces that feel as good as they look.",
        },
        { name: "twitter:image", content: "/img/me.jpeg" },
        { name: "theme-color", content: "#0e1116" },
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
      { name: "JetBrains Mono", weights: [400, 500, 700] },
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
