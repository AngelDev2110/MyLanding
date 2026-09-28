# Arquitectura

## Composición de la página

Landing de una sola página. `app/app.vue` monta en orden:

`TheNavbar` → `<main>`: `Hero` → `AboutMe` → `Projects` → `Experience` → `TechStack` → `Contact` → `TheFooter`

Cada sección es un elemento con `id` (`hero`, `about`, `stack`, `experience`, `projects`, `contact`). La navegación es por anclas con `scrollIntoView({ behavior: "smooth" })`. `TheNavbar` tiene la lista de `navLinks` y un `IntersectionObserver` (threshold 0.15) que marca la sección activa; **si agregas/renombras una sección, actualiza `navLinks`, las keys `nav.*` en ambos locales y el `id` del elemento.**

## Estado compartido de scroll (provide/inject)

- `useScrollProvider()` se llama una sola vez en `app.vue`: escucha `window.scroll` y hace `provide("scrollY", readonly(ref))`.
- Los componentes lo consumen con `useInjectWindowScroll()` (devuelve `{ scrollY }`, posiblemente `undefined` → usar `scrollY?.value ?? 0`).
- Usuarios: `Hero` (alterna intro ↔ terminal cuando `scrollY > innerHeight * 0.4`) y `TheNavbar` (fondo con blur cuando `scrollY > 60`).
- No usar `useScroll`/`useWindowScroll` de VueUse para esto; se reemplazó a propósito por este patrón (commit `1626f82`).

## Animaciones de entrada: directiva `v-intersect`

Definida en `app/plugins/intersect.ts` (plugin global). Uso:

```vue
<div class="animate__animated" v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.2 }">
```

- Opciones: `enterClass` (clase de animate.css), `threshold` (default `0.5`), `once` (default `true`).
- Si hay `enterClass`, pone `opacity: 0` al montar y añade la clase al entrar en viewport. El elemento debe llevar también `animate__animated`.
- No oculta nada si el usuario tiene `prefers-reduced-motion: reduce` o el navegador no soporta `IntersectionObserver` (el contenido nunca queda invisible).

## Secciones con comportamiento no obvio

- **Hero**: el `<section>` mide `220vh` y el panel interno es `position: sticky` de `100vh`; el scroll dentro de esa altura dispara el cambio a la vista “terminal” (con `<Transition mode="out-in">`). La foto y el indicador de scroll se ocultan en ese estado.
- **TechStack**: dos marcados distintos en el mismo componente. Desktop (≥1024px, `gsap.matchMedia()` en `onMounted`, que construye/revierte el pin al cruzar el breakpoint; distancias como funciones con `invalidateOnRefresh` para soportar resize) usa GSAP ScrollTrigger con `pin` + `scrub` para desplazar horizontalmente un slide por categoría, con barra de progreso y dots. Mobile usa `.tech-stack-mobile` como grid vertical. El breakpoint está hardcodeado en JS (`1024px`) y debe coincidir con `$bp-lg`. El wrapper es `<div id="stack">`, no `<section>`.
- **Experience**: timeline alternando izquierda/derecha según `index % 2`; la línea se “llena” con `useIntersectionObserver`.
- **Contact**: el email se renderiza desde i18n (`contact.email`) pero se copia/enlaza desde la constante `EMAIL` en `Contact/index.vue` — mantener ambos sincronizados.

## Convenciones de componentes

- **Carpeta por componente** con `index.vue`; subcomponentes anidados (`Projects/ProjectCard/index.vue`). Por el auto-import de Nuxt el nombre en template es la ruta concatenada: `<ProjectsProjectCard>`, `<ContactSocialCard>`, `<ExperienceExperienceEntry>`.
- **Tipos de props** en un archivo hermano `<Nombre>.d.ts` que exporta `interface Props` (en `AppearingText` es `props` en minúscula), importado con `import type { Props } from "./X.d.ts"` y usado como `defineProps<Props>()`.
- **Datos estáticos** en `constants.ts` dentro de la carpeta del componente (`TECH_LIST`, `SOCIAL_LINKS`, `PROJECT_LINKS`, `TRAITS`). Todo texto traducible va en i18n, no en constants. Ver [content.md](./content.md).
- **Bloque `<script setup>`** sigue plantilla de comentarios en este orden (se dejan aunque estén vacíos): `// Imports`, `// Component Options`, `// Props and Emits`, `// Composition API Helpers`, `// Reactive Variables`, `// Computed Properties`, `// Watchers`, `// Lifecycle Hooks`, `// Methods`.
- Los composables (`app/composables/`) y plugins se auto-importan; no importarlos manualmente.
- Todo código que toque `window`/`document` va en `onMounted` o protegido con `typeof window !== "undefined"` (hay SSR).

## Commits

Conventional Commits con scope del componente/área: `feat(contact): …`, `fix(TheNavbar): …`, `refactor(...)`, `chore(...)`, `hotfix(...)`. Trabajo en ramas `feat/*` fusionadas a `main` vía PR.

## Accesibilidad y movimiento

- `main.sass` define un anillo global `:focus-visible` (acento) y un bloque `prefers-reduced-motion: reduce` que resuelve al instante animaciones/transiciones y desactiva el scroll suave. Los estados `:hover` de CTAs y tarjetas se replican en `:focus-visible`.
- Para navegar a una sección usar `scrollToSelector()` (`app/utils/`, auto-importado): respeta reduced-motion.
- `app.vue` sincroniza `<html lang>` con el locale activo vía `useLocaleHead()`.
- Links externos llevan un `<span class="sr-only">` con `contact.newTab`; íconos/glifos decorativos van con `aria-hidden="true"` o `alt=""`.
- Íconos de UI: usar `<AppIcon name="…" :size="…" />` (`app/components/AppIcon/`, SVG de trazo 1.75, `currentColor`, `aria-hidden`). Para agregar uno, añadir su nombre a `IconName` y sus paths a `ICON_PATHS`. No usar glifos unicode (⎘ ✉ ↗ →) como íconos. Los logos de tecnologías/redes siguen siendo SVG en `public/img/`.
