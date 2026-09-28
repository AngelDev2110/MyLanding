# Arquitectura

## Composición de la página

Landing de una sola página. `app/app.vue` monta en orden:

`TheNavbar` → `<main>`: `Hero` → `AboutMe` → `Projects` → `Experience` → `TechStack` → `Contact` → `TheFooter`

Cada sección es un elemento con `id` (`hero`, `about`, `stack`, `experience`, `projects`, `contact`). La navegación es por anclas con `scrollIntoView({ behavior: "smooth" })`. `TheNavbar` tiene la lista de `navLinks` y marca como activa la última sección cuyo borde superior cruzó el 40% de la pantalla (se recalcula con el scroll compartido; al llegar al final, Contact). No usa `IntersectionObserver`: la escena del hero y el Stack fijado dejan una sección en pantalla varias pantallas y los umbrales se desfasaban; **si agregas/renombras una sección, actualiza `navLinks`, las keys `nav.*` en ambos locales y el `id` del elemento.**

## Estado compartido de scroll (provide/inject)

- `useScrollProvider()` se llama una sola vez en `app.vue`: escucha `window.scroll` y hace `provide("scrollY", readonly(ref))`.
- Los componentes lo consumen con `useInjectWindowScroll()` (devuelve `{ scrollY }`, posiblemente `undefined` → usar `scrollY?.value ?? 0`).
- Usuarios: `Hero` (escena intro → terminal ligada al scroll en desktop, ver abajo) y `TheNavbar` (fondo con blur cuando `scrollY > 60` o con el menú móvil abierto).
- No usar `useScroll`/`useWindowScroll` de VueUse para esto; se reemplazó a propósito por este patrón (commit `1626f82`).

## Animaciones de entrada: directiva `v-intersect`

Definida en `app/plugins/intersect.ts` (plugin global). Uso:

```vue
<div class="animate__animated" v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.2 }">
```

- Opciones: `enterClass` (clase de animate.css), `threshold` (default `0.5`), `once` (default `true`).
- Si hay `enterClass`, pone `opacity: 0` al montar y añade la clase al entrar en viewport. El elemento debe llevar también `animate__animated`.
- Un bloque más alto que la pantalla nunca llegaría a un `threshold` como 0.3; por eso también cuenta como "entrado" cuando tiene media pantalla visible.
- No oculta nada si el usuario tiene `prefers-reduced-motion: reduce` o el navegador no soporta `IntersectionObserver` (el contenido nunca queda invisible).

## Secciones con comportamiento no obvio

- **Hero** (escena ligada al scroll solo en desktop): la escena corre únicamente con `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` (`SCENE_QUERY` en el script y `$scene` en el CSS; deben coincidir). El layout lo decide la media query de CSS, no JS, para que el SSR ya pinte el modo correcto.
  - **Modo estático** (móvil, tablet y movimiento reducido): intro arriba (sin altura forzada, así la terminal asoma justo debajo) y la terminal ya completa en el flujo, sin sticky ni tipeo. El avatar se ve fijo en la barra; en desktop con movimiento reducido la foto queda estática a la derecha.
  - **Modo escena**: el `<section>` mide `360vh` y el panel interno es `position: sticky` de `100vh`, lo que deja 2.6vh de scroll: la escena del hero y, en la misma ventana, el About. Intro y terminal están **siempre en el DOM**; el scroll (en unidades de `innerHeight`, rangos en `RANGES`) calcula progresos 0→1 que se aplican con `--intro-out`, `--terminal-in`, `--about-in` y estilos inline.
    - **Suavizado**: la escena no lee el scroll crudo sino `smoothY`, que lo persigue con un `requestAnimationFrame` (constante de tiempo `SMOOTHING_MS` = 160ms, como el `scrub` de GSAP del Stack). Así un golpe de rueda (~0.1vh) se ve como un deslizamiento y no como un salto. Al cargar o cambiar de modo se ajusta de golpe.
    - **Cada cambio abarca 3–4 golpes de rueda** (~0.3–0.45vh). Si se acortan los rangos, la animación vuelve a verse "a saltos".
    - 0.02–0.3: la intro se desvanece y sube. En 0.3 (`SWITCH_AT`) el estado activo cambia: el oculto queda `inert` y sin `pointer-events`.
    - La foto hace un FLIP en dos tiempos: 0–0.34 se encoge (`transform: scale` + `clip-path` de rectángulo a círculo) y 0.08–0.52 viaja hasta el avatar, que está en el extremo **derecho** de la barra; llega ya del tamaño del avatar y desde la derecha, sin cruzar el título. Al llegar, la reemplaza el `<img>` del avatar.
    - 0.2–0.52: la ventana se abre con `clip-path` de arriba abajo y sube 16px mientras aparece (`TERMINAL_RISE`, compensado al medir el avatar). Hasta 1.2 la terminal se queda en pantalla con `cat philosophy.md` (~0.7vh, unos 6 golpes de rueda: la broma se lee con calma).
    - El tipeo **no** depende del scroll: arranca una sola vez cuando la terminal va al 50% (`watch` sobre `terminalProgress` y `scene`, así también arranca al recargar a mitad de escena) y corre con `requestAnimationFrame` a `MS_PER_UNIT` (14ms) por carácter (~1 s en total: rápido a propósito, la broma no debe hacer esperar). La salida aparece tras `QUOTE_PAUSE` y el cursor espera al final del comando.
  - **Fase About (misma ventana)**: al cruzar 1.24 (`ABOUT_AT`; al volver se reinicia bajo 1.18, `ABOUT_LEAVE`) la terminal teclea `clear`, borra las líneas del hero, teclea `cat about.md` y el markdown (`AboutMeAboutContent`) aparece bloque a bloque (`--i` × 90ms, 0.5s cada uno). Va con su propio reloj (`ABOUT_TIMING`, más pausado que el del hero: el cambio a About debe notarse), no con el scroll; si el tecleo del hero seguía, se completa. En paralelo, 1.2–1.8 (`--about-in`, unos 6 golpes de rueda): la ventana pasa de centrada a la columna izquierda del layout del About (`--about-group`, `--about-term`, `--about-photo` en `.hero__panel-inner`), se ancla arriba, el fondo funde a `$surface` y la foto formal entra por la derecha. 1.88–2.48: si about.md no cabe en la ventana (`max-height`), su salida se desplaza dentro de ella (`aboutOverflow`, remedido al cambiar idioma y en `resize`) con desvanecido en los bordes. De 2.48 a 2.6 queda quieta y luego sale con el scroll.
  - Comandos: `cat philosophy.md` (`funnyQuote`) y `terminalCmd`. Ubicación y roles ya no van en la terminal: están en el primer pantallazo (roles en `tagline`, ubicación en el badge con `hero.location`).
  - Cada comando lleva el texto completo transparente (`.hero__type-ghost`, lo leen lectores de pantalla y se puede seleccionar) y encima la parte tipeada (`aria-hidden`), así la terminal no cambia de tamaño mientras se escribe.
  - El cursor se pausa cuando el hero sale de pantalla (se mide la altura real del `<section>`). Posiciones de foto y avatar se miden en `onMounted`, en `resize`, al cambiar la media query y tras cargar las fuentes.
- **TechStack** (`section#stack` en todos los tamaños): un `package.json` dentro de un `TerminalWindow`, con dos modos sobre el mismo marcado. Cada categoría de `CATEGORIES` es una key del JSON (`<dl>`: `dt` = key traducida, `dd` = `<ul>` de tecnologías con su logo; grupos de 4 o menos). Los logos llevan `alt=""`: el nombre accesible es el texto.
  - **Estático** (móvil, tablet y movimiento reducido): `cat package.json`; en `md+` las filas comparten columnas del grid (`display: contents`) para alinear los arrays; en móvil la key va arriba y los `[` `]` se ocultan.
  - **Scroll horizontal fijado** (`(min-width: 1024px) and (prefers-reduced-motion: no-preference)`: `SCENE_QUERY` en el script y `$scene` en el CSS, deben coincidir): `less package.json`. La sección mide `100vh`, la terminal llena el resto y cada key es una columna; `gsap.matchMedia()` crea en `onMounted` un tween con ScrollTrigger (`pin` + `scrub`) que desplaza el `<dl>` en X lo que sobra de ancho (`scrollWidth - clientWidth`), y lo revierte al dejar de cumplirse la query. La columna activa (según el progreso) se enciende en ámbar; abajo hay una barra de estado estilo `less` (`n/5 (x%)` + `stack.scroll`, `aria-hidden`). Los bordes del carril se desvanecen con `mask-image`.
  - Distancias como funciones con `invalidateOnRefresh`; `ScrollTrigger.refresh()` al cambiar de idioma (`watch(locale)`) y tras cargar las fuentes, porque ambos cambian anchos y la altura de la página sobre el pin. Tamaños del modo fijado escalan con `vh` para caber en pantallas de 720px de alto.
  - **Decisión fija (del dueño del sitio): el scroll horizontal fijado en desktop se queda siempre.** No proponer quitarlo, volverlo estático ni reemplazar el pin, aunque un critique o una heurística lo marque como scroll secuestrado; se probó la versión estática (2026-09-28) y se descartó. Sí se vale pulirlo (cortes de columnas, pista al 100%, ancho) sin cambiar el comportamiento.
- **AboutMe**: el contenido (título, bio, rasgos con prueba) vive en `AboutMe/AboutContent/` y lo usan la sección y la terminal del hero. En la escena de desktop (misma `$scene` que el hero) la sección no se ve: queda como marcador `#about` invisible de altura 0, `position: absolute; top: 180vh`: los saltos al ancla aterrizan en 1.8vh, con el layout completo, y la línea del 40% del nav lo cruza en 1.4vh, a un tercio del cambio; así el texto no se duplica para lectores de pantalla. En los demás modos es la sección normal: salida de `cat about.md` en un `TerminalWindow` (markdown “renderizado”: `#` título en Fraunces como `h2`, bio en Nunito, rasgos como lista `-` en mono, cada uno con su prueba como link markdown ámbar (repo externo o ancla a `#experience`); la sintaxis markdown va en mono ámbar y `aria-hidden`). La foto formal va al lado en `lg+` y debajo en móvil, con el mismo borde y resplandor de las ventanas.
- **Projects**: título de sección + línea `$ ls projects/` (decorativa, `aria-hidden`) + una ventana por proyecto, **una por fila** (`ProjectCard` usa `TerminalWindow` con título `~/projects/<carpeta>`, derivado del path de `link`, o del host si el sitio vive en la raíz). Es el pico de la página: la captura ocupa todo el ancho de la ventana para que la app se lea, y debajo va una fila de datos (en `lg+`: título grande + tags, descripción, acciones en una columna fija de 10rem para que las descripciones alineen). Sin captura (`image: null`) la tarjeta es compacta y su único link es el repo: es el caso de `angeldlt.dev`, este mismo sitio, último de la lista. El link del título se estira con `::after` sobre el cuerpo de la ventana para que toda la tarjeta sea clicable; el anillo de foco se dibuja en la ventana con `:has()` porque su `overflow: hidden` recortaría el del link. Tags como `#tag` en mono. Sin elevación en hover: solo cambia el borde a ámbar.
- **Experience**: salida de `git log --graph` en un `TerminalWindow`: un `<ol>` con un `ExperienceEntry` (`<li>`) por puesto; `*` ámbar por commit y un riel `|` (`::before`) hasta el siguiente. Cada entrada: periodo · tipo, rol en Fraunces, logros con `-` y tags `#tag`. El periodo traducido se parte por la raya corta `–` y cada año de 4 dígitos va en `<time datetime>`; "Present"/"Presente" queda como texto. Una sola columna en todos los tamaños.
- **Contact** (cierre en la terminal): el correo sale solo de la constante `EMAIL` en `Contact/index.vue` (se muestra, se copia y va en el `mailto:`), partido en usuario y dominio con `<wbr>` para que en pantallas estrechas solo se corte después de la `@`. La confirmación de copiado o el error se imprime como una línea de la terminal dentro de un `role="status"`. Debajo, LinkedIn y GitHub son comandos `open linkedin` / `open github`: cada línea entera es el link (48px de alto, se ilumina en hover/foco). La terminal termina en `$ ▮` parpadeando: es el final de la página. `TheFooter` es solo una nota al pie sobre la misma superficie (línea de "built with" + link a WakaTime), sin copyright.
- **TerminalWindow**: ventana de terminal compartida (Hero, About, Projects, Experience, TechStack y Contact). Pone la barra con los tres aros ámbar, el slot `bar` para extras (el avatar del hero), el `title`, el cuerpo con scanlines y los estilos de línea vía `:slotted`: usar las clases `terminal__line`, `terminal__prompt`, `terminal__cmd` y `terminal__output` en el contenido.

## Convenciones de componentes

- **Carpeta por componente** con `index.vue`; subcomponentes anidados (`Projects/ProjectCard/index.vue`). Por el auto-import de Nuxt el nombre en template es la ruta concatenada: `<ProjectsProjectCard>`, `<ExperienceExperienceEntry>`.
- **Tipos de props** en un archivo hermano `<Nombre>.d.ts` que exporta `interface Props` (en `AppearingText` es `props` en minúscula), importado con `import type { Props } from "./X.d.ts"` y usado como `defineProps<Props>()`.
- **Comentarios:** el código no se comenta salvo que explique algo que no se deduce de leerlo: un porqué no obvio, un workaround, un número mágico o una restricción externa. Nada de comentarios que repitan lo que el código ya dice ni encabezados decorativos. La única excepción es la plantilla de secciones del `<script setup>` (abajo), que es convención del proyecto.
- **Datos estáticos** en `constants.ts` dentro de la carpeta del componente (`TECH_LIST`, `SOCIAL_LINKS`, `PROJECT_LINKS`, `TRAITS`). Todo texto traducible va en i18n, no en constants. Ver [content.md](./content.md).
- **Bloque `<script setup>`** sigue plantilla de comentarios en este orden (se dejan aunque estén vacíos): `// Imports`, `// Component Options`, `// Props and Emits`, `// Composition API Helpers`, `// Reactive Variables`, `// Computed Properties`, `// Watchers`, `// Lifecycle Hooks`, `// Methods`.
- Los composables (`app/composables/`) y plugins se auto-importan; no importarlos manualmente.
- Todo código que toque `window`/`document` va en `onMounted` o protegido con `typeof window !== "undefined"` (hay SSR).

## Commits

Conventional Commits con scope del componente/área: `feat(contact): …`, `fix(TheNavbar): …`, `refactor(...)`, `chore(...)`, `hotfix(...)`. Trabajo en ramas `feat/*` fusionadas a `main` vía PR.

## Accesibilidad y movimiento

- `main.sass` define un anillo global `:focus-visible` (acento) y un bloque `prefers-reduced-motion: reduce` que resuelve al instante animaciones/transiciones y desactiva el scroll suave. Los estados `:hover` de CTAs y tarjetas se replican en `:focus-visible`. Nada se anima en bucle en el centro de la página (sin puntos que laten en About ni en Experience).
- Para navegar a una sección usar `scrollToSelector()` (`app/utils/`, auto-importado): respeta reduced-motion.
- `app.vue` sincroniza `<html lang>` con el locale activo vía `useLocaleHead()`.
- Nombre accesible = texto visible (WCAG 2.5.3): no poner `aria-label` que reemplace lo que se lee en pantalla; si hace falta contexto, añadirlo con `sr-only` **después** del texto visible (botones de idioma "EN English", logo "angel, Angel De La Torre", link "Code: <proyecto>").
- Targets de 44px mínimo: el burger mide 44×44, los links del menú móvil 44px de alto y los botones de idioma extienden su área con un `::after` invisible; los CTAs del hero miden 44px (`min-height`) y el link de WakaTime del footer (texto de 0.72rem) también amplía su área con `::after`.
- Skip link: primer elemento de `app.vue` (`skipLink` en i18n), oculto hasta recibir foco; salta a `<main id="main" tabindex="-1">` (sin anillo de foco en `main`).
- Botones del correo en Contact: uno solo es primario (fondo ámbar). En móvil "Send email" (el `mailto` abre la app de correo) y desde `md` "Copy email" (en desktop es común no tener cliente de correo configurado). Solo cambia el estilo, no el orden, para que el orden de tabulación coincida con el visual.
- Menú móvil (`TheNavbar`): es un disclosure, no un modal (sin trampa de foco). Al abrir, el foco va al primer link; Esc lo cierra y devuelve el foco al burger; se cierra solo al pasar de 768px (`DESKTOP_NAV_QUERY`, debe coincidir con `$bp-md`).
- Esquema de títulos: un solo `h1` (nombre), un `h2` por sección y `h3` por proyecto/puesto. El rol del hero es un `p`, no un `h2`.
- Links externos llevan un `<span class="sr-only">` con `contact.newTab`; íconos/glifos decorativos van con `aria-hidden="true"` o `alt=""`.
- Íconos de UI: usar `<AppIcon name="…" :size="…" />` (`app/components/AppIcon/`, SVG de trazo 1.75, `currentColor`, `aria-hidden`). Para agregar uno, añadir su nombre a `IconName` y sus paths a `ICON_PATHS`. No usar glifos unicode (⎘ ✉ ↗ →) como íconos. Los logos de tecnologías/redes siguen siendo SVG en `public/img/`.
