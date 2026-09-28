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

const i18nHead = useLocaleHead({ seo: false });
useHead({
  htmlAttrs: { lang: () => i18nHead.value.htmlAttrs?.lang },
});

const { t, locale } = useI18n();
const { siteUrl } = useRuntimeConfig().public;
const ogImage = () => `${siteUrl}/img/og-${locale.value === "es" ? "es" : "en"}.png`;
useSeoMeta({
  title: () => t("seo.title"),
  description: () => t("seo.description"),
  ogTitle: () => t("seo.title"),
  ogDescription: () => t("seo.socialDescription"),
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: "image/png",
  ogImageAlt: () => t("seo.title"),
  ogLocale: () => (locale.value === "es" ? "es_ES" : "en_US"),
  twitterTitle: () => t("seo.title"),
  twitterDescription: () => t("seo.socialDescription"),
  twitterImage: ogImage,
  twitterImageAlt: () => t("seo.title"),
});

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>
