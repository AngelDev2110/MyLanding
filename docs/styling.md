# Estilos y sistema de diseño

## Archivos

| Archivo | Contenido |
|---|---|
| `app/assets/sass/colors.sass` | Paleta derivada en OKLCH (en el archivo solo van los hex; valores OKLCH: fondo 0.175 0.012 258, superficies 0.212/0.25 con croma 0.02–0.026, grises 0.27–0.77 con croma ~0.02, todo en hue 258). Neutros tinta fríos (hue 258, croma baja) y un solo acento cálido: cempasúchil / ámbar de fósforo, `$accent` #fab048 = oklch(0.81 0.145 72). Fondo `$dark-navy` #0d1116. `$accent-dim`/`$accent-glow` derivan de `$accent` con `rgba()`, grises `$gray-600…900`, `$text-muted`, superficies `$surface`, `$surface-2`, `$surface-card`, `$border`. |
| `app/assets/sass/variables.sass` | Fuentes por rol (`$font-display` = Fraunces, `$font-nunito`, `$font-mono`), breakpoints (`$bp-sm` 480, `$bp-md` 768, `$bp-lg` 1024, `$bp-xl` 1280), `$section-padding(-mobile)`, z-index (`$z-navbar`, `$z-modal`), transiciones (`$transition-fast/base/slow`). |
| `app/assets/sass/main.sass` | Estilos globales: importa animate.css, reset básico, scrollbar, `::selection`, padding responsivo de `section`, y clases utilitarias compartidas. |

`colors.sass` y `variables.sass` se inyectan automáticamente en todo bloque Sass (config en `nuxt.config.ts`) — **no hacer `@use` manual** en componentes.

## Clases globales reutilizables

Usar en los encabezados de cada sección para mantener consistencia:

- `.section-heading` — título Fraunces 700, `clamp(2.25rem, 5.5vw, 4rem)`, `text-wrap: balance`. Las secciones **no** llevan etiqueta/eyebrow encima del título (se retiró `.section-label`); el título carga su propio peso.
- `.section-subheading` — subtítulo en `$text-muted`.
- `.accent` — texto en color acento.
- `.sr-only` — oculta visualmente pero se mantiene para lectores de pantalla (p. ej. aviso de "abre en pestaña nueva").

## Convenciones

- Sintaxis **Sass indentada** (sin llaves ni `;`), `<style lang="sass" scoped>`.
- Naming **BEM** con prefijo por componente (`hero__cta--primary`, `navbar__link--active`), usando `&__` / `&--` anidados.
- Mobile-first: estilos base y luego `@media (min-width: $bp-md)` / `$bp-lg`. El padding lateral de secciones escala 20px → 60px → 100px.
- Tipografía: Fraunces (variable, eje óptico `opsz`) para títulos y display, Nunito para cuerpo, JetBrains Mono para labels/UI “de código”.
- Nombre del hero: dos líneas deliberadas (nombre / apellidos, calculadas en `Hero.vue` desde `myName`), Fraunces 800, `clamp(2.75rem, 13.5vw, 6rem)` y en desktop `clamp(5rem, 7vw, 7.5rem)`; `letter-spacing: -0.025em` + `word-spacing: 0.06em` (sin eso "De La Torre" se funde) y `line-height: 1` (libra el descendente de la "g").
- Solo tema oscuro; `theme-color` en meta es `#0d1116`.
- No usar colores literales: transparencias como `rgba($accent, 0.2)` / `rgba($dark-navy, 0.85)`. Para estilos inline generados por JS usar la custom property `--accent` (definida en `:root` en `main.sass`), p. ej. `color-mix(in oklch, var(--accent) 15%, transparent)`.
- Todas las combinaciones de texto pasan WCAG AA (acento 10.3:1, `$text-muted` 9.2:1, `$gray-600` 6.8:1 sobre el fondo). `$gray-700` (2.9:1) solo para separadores/decoración.
- Viñetas de lista: cuadrito de acento de 6px con `::before`, no glifos (`▹`).
