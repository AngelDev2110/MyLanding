# Arquitectura

## Composición de la página

Landing de una sola página. `app/app.vue` monta en orden:

`TheNavbar` → `<main>`: `Hero` → `AboutMe` → `Projects` → `Experience` → `TechStack` → `Contact` → `TheFooter`

Cada sección es un elemento con `id` (`hero`, `about`, `stack`, `experience`, `projects`, `contact`). La navegación es por anclas con `scrollIntoView({ behavior: "smooth" })`. `TheNavbar` tiene la lista de `navLinks` y un `IntersectionObserver` (threshold 0.15) que marca la sección activa; **si agregas/renombras una sección, actualiza `navLinks`, las keys `nav.*` en ambos locales y el `id` del elemento.**

## Estado compartido de scroll (provide/inject)

- `useScrollProvider()` se llama una sola vez en `app.vue`: escucha `window.scroll` y hace `provide("scrollY", readonly(ref))`.
- Los componentes lo consumen con `useInjectWindowScroll()` (devuelve `{ scrollY }`, posiblemente `undefined` → usar `scrollY?.value ?? 0`).
- Usuarios: `Hero` (escena intro → terminal ligada al scroll, ver abajo) y `TheNavbar` (fondo con blur cuando `scrollY > 60`).
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

- **Hero** (escena ligada al scroll): el `<section>` mide `300vh` (`HERO_HEIGHT_VH`, debe coincidir con el CSS) y el panel interno es `position: sticky` de `100vh`, lo que deja 2vh de scroll para la escena. Intro y terminal están **siempre en el DOM**; el scroll (en unidades de `innerHeight`, rangos en `RANGES` dentro de `Hero.vue`) calcula progresos 0→1 que se aplican con las variables CSS `--intro-out` y `--terminal-in` y con estilos inline:
  - 0.25–0.4: la intro se desvanece y sube. En 0.4 (`SWITCH_AT`) el estado activo cambia: el oculto queda `inert` y sin `pointer-events`.
  - 0.22–0.55 (solo desktop con movimiento): la foto viaja y se encoge (FLIP con `transform` + `clip-path` de rectángulo a círculo) hasta el avatar de la barra de la terminal; al llegar, la reemplaza el `<img>` del avatar.
  - 0.35–0.5: la ventana de la terminal se abre con `clip-path`.
  - 0.55–1.8: los comandos se tipean según el scroll (1.8–2.0 es una pausa con la terminal completa antes de salir); cada salida aparece completa tras una pausa (`OUTPUT_WEIGHT`) y el cursor espera al final del comando.
  - Cada comando lleva el texto completo transparente (`.hero__type-ghost`, lo leen lectores de pantalla y se puede seleccionar) y encima la parte tipeada (`aria-hidden`), así la terminal no cambia de tamaño mientras se escribe.
  - Con `prefers-reduced-motion`: sin viaje de foto ni tipeo; en 0.4 se pasa directo a la terminal completa. En móvil (< 1024px) no hay foto: el avatar aparece fijo y solo hay tipeo.
  - Las posiciones de foto y avatar se miden en `onMounted`, en `resize` y tras cargar las fuentes.
- **TechStack**: dos marcados distintos en el mismo componente. Desktop (≥1024px, `gsap.matchMedia()` en `onMounted`, que construye/revierte el pin al cruzar el breakpoint; distancias como funciones con `invalidateOnRefresh` para soportar resize) usa GSAP ScrollTrigger con `pin` + `scrub` para desplazar horizontalmente un slide por categoría, con barra de progreso y dots. Mobile usa `.tech-stack-mobile` como grid vertical. El breakpoint está hardcodeado en JS (`1024px`) y debe coincidir con `$bp-lg`. El wrapper es `<div id="stack">`, no `<section>`.
- **Experience**: timeline alternando izquierda/derecha según `index % 2`; la línea se “llena” con `useIntersectionObserver`.
- **Contact** (cierre en la terminal): el correo sale solo de la constante `EMAIL` en `Contact/index.vue` (se muestra, se copia y va en el `mailto:`), partido en usuario y dominio con `<wbr>` para que en pantallas estrechas solo se corte después de la `@`. La confirmación de copiado o el error se imprime como una línea de la terminal dentro de un `role="status"`.
- **TerminalWindow**: ventana de terminal compartida (Hero y Contact). Pone la barra con los tres puntos, el slot `bar` para extras (el avatar del hero), el `title`, el cuerpo con scanlines y los estilos de línea vía `:slotted`: usar las clases `terminal__line`, `terminal__prompt`, `terminal__cmd` y `terminal__output` en el contenido.

## Convenciones de componentes

- **Carpeta por componente** con `index.vue`; subcomponentes anidados (`Projects/ProjectCard/index.vue`). Por el auto-import de Nuxt el nombre en template es la ruta concatenada: `<ProjectsProjectCard>`, `<ContactSocialCard>`, `<ExperienceExperienceEntry>`.
- **Tipos de props** en un archivo hermano `<Nombre>.d.ts` que exporta `interface Props` (en `AppearingText` es `props` en minúscula), importado con `import type { Props } from "./X.d.ts"` y usado como `defineProps<Props>()`.
- **Comentarios:** el código no se comenta salvo que explique algo que no se deduce de leerlo: un porqué no obvio, un workaround, un número mágico o una restricción externa. Nada de comentarios que repitan lo que el código ya dice ni encabezados decorativos. La única excepción es la plantilla de secciones del `<script setup>` (abajo), que es convención del proyecto.
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
