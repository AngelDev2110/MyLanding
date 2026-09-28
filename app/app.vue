<template>
  <TheNavbar />
  <main>
    <Hero />
    <AboutMe />
    <Projects />
    <Experience />
    <TechStack />
    <Contact />
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
// Imports
import "~/assets/normalize/normalize.css";
import "~/assets/sass/main.sass";

// Component Options
useScrollProvider();

// Keep <html lang> in sync with the active locale (screen readers, hyphenation, SEO)
const i18nHead = useLocaleHead({ seo: false });
useHead({
  htmlAttrs: { lang: () => i18nHead.value.htmlAttrs?.lang },
});

// Localized title + description/social meta (static image/card meta lives in nuxt.config)
const { t, locale } = useI18n();
useSeoMeta({
  title: () => t("seo.title"),
  description: () => t("seo.description"),
  ogTitle: () => t("seo.title"),
  ogDescription: () => t("seo.socialDescription"),
  ogImageAlt: () => t("seo.title"),
  ogLocale: () => (locale.value === "es" ? "es_ES" : "en_US"),
  twitterTitle: () => t("seo.title"),
  twitterDescription: () => t("seo.socialDescription"),
});

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>
