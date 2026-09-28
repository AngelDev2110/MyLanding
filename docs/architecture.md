# Arquitectura

## Composición de la página

Landing de una sola página. `app/app.vue` monta en orden:

`TheNavbar` → `<main>`: `Hero` → `AboutMe` → `Projects` → `Experience` → `TechStack` → `Contact` → `TheFooter`

Cada sección es un elemento con `id` (`hero`, `about`, `stack`, `experience`, `projects`, `contact`). La navegación es por anclas con `scrollIntoView({ behavior: "smooth" })`. `TheNavbar` tiene la lista de `navLinks` y un `IntersectionObserver` (threshold 0.15) que marca la sección activa; **si agregas/renombras una sección, actualiza `navLinks`, las keys `nav.*` en ambos locales y el `id` del elemento.**

## Estado compartido de scroll (provide/inject)

- `useScrollProvider()` se llama una sola vez en `app.vue`: escucha `window.scroll` y hace `provide("scrollY", readonly(ref))`.
- Los componentes lo consumen con `useInjectWindowScroll()` (devuelve `{ scrollY }`, posiblemente `undefined` → usar `scrollY?.value ?? 0`).
- Usuarios: `Hero` (escena intro → terminal ligada al scroll en desktop, ver abajo) y `TheNavbar` (fondo con blur cuando `scrollY > 60`).
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

- **Hero** (escena ligada al scroll solo en desktop): la escena corre únicamente con `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` (`SCENE_QUERY` en el script y `$scene` en el CSS; deben coincidir). El layout lo decide la media query de CSS, no JS, para que el SSR ya pinte el modo correcto.
  - **Modo estático** (móvil, tablet y movimiento reducido): intro arriba (sin altura forzada, así la terminal asoma justo debajo) y la terminal ya completa en el flujo, sin sticky ni tipeo. El avatar se ve fijo en la barra; en desktop con movimiento reducido la foto queda estática a la derecha.
  - **Modo escena**: el `<section>` mide `180vh` y el panel interno es `position: sticky` de `100vh`, lo que deja 0.8vh de scroll. Intro y terminal están **siempre en el DOM**; el scroll (en unidades de `innerHeight`, rangos en `RANGES`) calcula progresos 0→1 que se aplican con `--intro-out`, `--terminal-in` y estilos inline:
    - 0.08–0.22: la intro se desvanece y sube. En 0.22 (`SWITCH_AT`) el estado activo cambia: el oculto queda `inert` y sin `pointer-events`.
    - 0.06–0.32: la foto viaja y se encoge (FLIP con `transform` + `clip-path` de rectángulo a círculo) hasta el avatar de la barra; al llegar, la reemplaza el `<img>` del avatar.
    - 0.16–0.3: la ventana de la terminal se abre con `clip-path`.
    - 0.3–0.7: los comandos se tipean según el scroll (0.7–0.8 es una pausa con la terminal completa); cada salida aparece tras una pausa (`OUTPUT_WEIGHT`) y el cursor espera al final del comando.
  - Comandos: `cat now.md` (ubicación, disponibilidad y roles como `<dl>`, keys `hero.now.*`), `cat philosophy.md` (`funnyQuote`) y `terminalCmd`. No repiten el nombre ni el rol del h1.
  - Cada comando lleva el texto completo transparente (`.hero__type-ghost`, lo leen lectores de pantalla y se puede seleccionar) y encima la parte tipeada (`aria-hidden`), así la terminal no cambia de tamaño mientras se escribe.
  - El cursor se pausa cuando el hero sale de pantalla (se mide la altura real del `<section>`). Posiciones de foto y avatar se miden en `onMounted`, en `resize`, al cambiar la media query y tras cargar las fuentes.
- **TechStack** (`section#stack`, estático en todos los tamaños): la salida de `cat package.json` dentro de un `TerminalWindow`. Cada categoría de `CATEGORIES` es una key del JSON (`<dl>`: `dt` = key traducida, `dd` = `<ul>` de tecnologías con su logo). Grupos de 4 o menos. En `md+` las filas comparten columnas del grid (`display: contents`) para alinear los arrays; en móvil la key va arriba y los `[` `]` se ocultan. Los logos llevan `alt=""`: el nombre accesible es el texto. Sin pin, sin scroll horizontal y sin GSAP.
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
