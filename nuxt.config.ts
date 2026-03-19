// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Angel DLT",
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
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json", language: "en-US" },
      { code: "es", name: "Español", file: "es.json", language: "es-ES" },
    ],
  },
});
