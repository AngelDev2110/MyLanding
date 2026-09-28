# Tecnologías

Stack del proyecto, dónde se configura cada pieza y cómo se usa en el código.

## Runtime / framework

| Tecnología | Versión | Dónde se configura / usa |
|---|---|---|
| Nuxt | ^4.3.1 | `nuxt.config.ts`. Estructura Nuxt 4: el código fuente vive en `app/` (srcDir). `compatibilityDate: 2025-07-15`. |
| Vue | ^3.5 | SFCs con `<script lang="ts" setup>`. Sin `pages/`: la app es una sola página montada en `app/app.vue`. |
| vue-router | ^4.6 | Dependencia de Nuxt; no hay rutas propias (navegación por anclas `#id`). |
| Nitro | (incluido en Nuxt) | `nitro.routeRules` en `nuxt.config.ts` hace proxy de subrutas a otros deploys. Ver [deployment.md](./deployment.md). |
| TypeScript | (vía Nuxt) | `tsconfig.json` solo referencia los tsconfig generados en `.nuxt/` (requiere `nuxt prepare`, que corre en `postinstall`). |

## Módulos de Nuxt

| Módulo | Versión | Uso |
|---|---|---|
| `@nuxtjs/i18n` | 10.2.3 (fija) | Locales `en` (default) y `es`, archivos en `i18n/locales/*.json`. Sin prefijo de ruta configurado explícitamente. Cambio de idioma con `setLocale()` en `TheNavbar`. Ver [content.md](./content.md). |
| `@nuxt/fonts` | 0.14.0 (fija) | Carga Fraunces (600/700/800, solo normal, con eje variable `opsz` vía `providerOptions.google.experimental.variableAxis`), Nunito (400–700) y JetBrains Mono (400/500/700). Variables en `app/assets/sass/variables.sass`. |

## Librerías

| Librería | Uso en el proyecto |
|---|---|
| GSAP ^3.14 + `ScrollTrigger` | Solo en `TechStack/index.vue`: carrusel horizontal “pinneado” con scroll en desktop (≥1024px). Se registra el plugin dentro de `onMounted` y se matan los triggers en `onUnmounted`. |
| animate.css ^4.1 | Importado globalmente en `main.sass` (`@use 'animate.css'`). Se usan sus clases (`animate__animated`, `animate__fadeInUp`, …) junto con la directiva `v-intersect`. |
| @vueuse/core ^14 | `useClipboard` (Contact, copiar email) y `useIntersectionObserver` (línea del timeline de Experience). Se importa explícitamente desde `@vueuse/core` (no está como módulo de Nuxt). |
| normalize.css | Copia local en `app/assets/normalize/normalize.css`, importada en `app.vue`. |

## Estilos

| Tecnología | Detalle |
|---|---|
| Sass ^1.97 (devDependency) | **Sintaxis indentada `.sass`** (no SCSS), también en los `<style lang="sass" scoped>` de los componentes. `colors.sass` y `variables.sass` se inyectan automáticamente en cada bloque Sass vía `vite.css.preprocessorOptions.sass.additionalData`. Ver [styling.md](./styling.md). |

## Tooling

| Herramienta | Detalle |
|---|---|
| pnpm | Gestor de paquetes (`pnpm-lock.yaml`). `pnpm-workspace.yaml` solo define `onlyBuiltDependencies` (`@parcel/watcher`, `esbuild`). |
| Nuxt DevTools | Habilitado (`devtools: { enabled: true }`). |
| i18n Ally (VS Code) | `.vscode/settings.json` apunta a `i18n/locales` con keystyle `nested`. |

No hay linter, formatter, ni framework de tests configurados.
