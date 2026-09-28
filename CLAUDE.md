# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Landing page / portafolio personal de Angel De La Torre (Frontend Developer). SPA de una sola página en **Nuxt 4 + Vue 3 + TypeScript**, estilos en **Sass indentado**, bilingüe (en/es) con `@nuxtjs/i18n`. Código fuente en `app/`, textos en `i18n/locales/`, assets en `public/img/`.

## Comandos

Gestor de paquetes: **pnpm**.

```bash
pnpm install     # también ejecuta `nuxt prepare` (genera .nuxt/ y los tsconfig)
pnpm dev         # servidor de desarrollo en http://localhost:3000
pnpm build       # build de producción
pnpm generate    # build estático
pnpm preview     # previsualizar el build
```

No hay linter, formatter ni tests configurados.

## Documentación

La documentación detallada está segmentada en `docs/`. Consulta el archivo correspondiente en lugar de explorar todo el código:

| Si necesitas saber sobre… | Lee |
|---|---|
| Qué tecnología/librería se usa, versión y dónde se configura | [docs/technologies.md](docs/technologies.md) |
| Estructura de la página, estado de scroll, directiva `v-intersect`, comportamiento de Hero/TechStack, convenciones de componentes y commits | [docs/architecture.md](docs/architecture.md) |
| Dónde vive cada texto/dato, cómo agregar experiencia, proyectos, tecnologías o redes; gotchas de i18n | [docs/content.md](docs/content.md) |
| Paleta, variables, breakpoints, clases globales y convenciones de Sass/BEM | [docs/styling.md](docs/styling.md) |
| Hosting, proxies de Nitro a otros proyectos, SEO/meta | [docs/deployment.md](docs/deployment.md) |

Mantén estos archivos actualizados cuando cambies algo que documentan.

## Reglas clave (resumen)

- Cualquier texto visible va en **ambos** `en.json` y `es.json` con la misma estructura de keys.
- Proyectos: `projects.entries` (i18n) y `PROJECT_LINKS` (constants) se emparejan **por índice**.
- `colors.sass` y `variables.sass` se inyectan automáticamente; no importarlos en componentes.
- Scroll compartido vía `useInjectWindowScroll()` (provisto en `app.vue`), no con VueUse.
- Props tipadas en un `<Componente>.d.ts` hermano; datos estáticos en `constants.ts` de la carpeta del componente.
- Respetar la plantilla de comentarios del `<script setup>` (`// Imports`, `// Component Options`, …, `// Methods`).
