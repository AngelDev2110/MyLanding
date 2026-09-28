# Estilos y sistema de diseño

## Archivos

| Archivo | Contenido |
|---|---|
| `app/assets/sass/colors.sass` | Paleta definida en OKLCH (hex equivalente + valor OKLCH comentado). Neutros tinta fríos (hue 258, croma baja) y un solo acento cálido: cempasúchil / ámbar de fósforo, `$accent` #fab048 = oklch(0.81 0.145 72). Fondo `$dark-navy` #0d1116. `$accent-dim`/`$accent-glow` derivan de `$accent` con `rgba()`, grises `$gray-600…900`, `$text-muted`, superficies `$surface`, `$surface-2`, `$surface-card`, `$border`. |
| `app/assets/sass/variables.sass` | Fuentes (`$font-lora`, `$font-nunito`, `$font-mono`), breakpoints (`$bp-sm` 480, `$bp-md` 768, `$bp-lg` 1024, `$bp-xl` 1280), `$section-padding(-mobile)`, z-index (`$z-navbar`, `$z-modal`), transiciones (`$transition-fast/base/slow`). |
| `app/assets/sass/main.sass` | Estilos globales: importa animate.css, reset básico, scrollbar, `::selection`, padding responsivo de `section`, y clases utilitarias compartidas. |

`colors.sass` y `variables.sass` se inyectan automáticamente en todo bloque Sass (config en `nuxt.config.ts`) — **no hacer `@use` manual** en componentes.

## Clases globales reutilizables

Usar en los encabezados de cada sección para mantener consistencia:

- `.section-label` — etiqueta mono en mayúsculas color acento con línea decorativa.
- `.section-heading` — título Lora con `clamp()`.
- `.section-subheading` — subtítulo en `$text-muted`.
- `.accent` — texto en color acento.
- `.sr-only` — oculta visualmente pero se mantiene para lectores de pantalla (p. ej. aviso de "abre en pestaña nueva").

## Convenciones

- Sintaxis **Sass indentada** (sin llaves ni `;`), `<style lang="sass" scoped>`.
- Naming **BEM** con prefijo por componente (`hero__cta--primary`, `navbar__link--active`), usando `&__` / `&--` anidados.
- Mobile-first: estilos base y luego `@media (min-width: $bp-md)` / `$bp-lg`. El padding lateral de secciones escala 20px → 60px → 100px.
- Tipografía: Lora para títulos, Nunito para cuerpo, JetBrains Mono para labels/UI “de código”.
- Solo tema oscuro; `theme-color` en meta es `#0d1116`.
- No usar colores literales: transparencias como `rgba($accent, 0.2)` / `rgba($dark-navy, 0.85)`. Para estilos inline generados por JS usar la custom property `--accent` (definida en `:root` en `main.sass`), p. ej. `color-mix(in oklch, var(--accent) 15%, transparent)`.
- Todas las combinaciones de texto pasan WCAG AA (acento 10.3:1, `$text-muted` 9.2:1, `$gray-600` 6.8:1 sobre el fondo). `$gray-700` (2.9:1) solo para separadores/decoración.
- Viñetas de lista: cuadrito de acento de 6px con `::before`, no glifos (`▹`).
