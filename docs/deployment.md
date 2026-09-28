# Deploy y SEO

## Hosting

- Dominio de producción: `https://www.angeldlt.dev` (desplegado en Vercel).
- Hubo un `vercel.json` con rewrites; se eliminó y se sustituyó por `nitro.routeRules` en `nuxt.config.ts` (commit `2f225c9`). No reintroducir `vercel.json` para esto.

## Proxies a otros proyectos

`nitro.routeRules` sirve otros deploys bajo el dominio de la landing:

| Ruta | Proxy a |
|---|---|
| `/angel-front-themes/**` | `https://angel-front-themes.vercel.app/angel-front-themes/**` |
| `/noob-draw/**` | `https://noob-draw.vercel.app/noob-draw/**` |

Los proyectos destino deben estar compilados con ese mismo base path. Las tarjetas de `Projects` enlazan a `https://www.angeldlt.dev/<ruta>` (ver `Projects/constants.ts`).

## SEO / meta

- Textos localizados (`title`, `description`, `og:title/description/image:alt/locale`, `twitter:title/description`) en `app.vue` con `useSeoMeta()`, desde las keys `seo.*` de i18n. No hay `pages/`, así que no existen rutas `/es`: el idioma lo decide la cookie `i18n_redirected` (SSR incluido). Los crawlers sin cookie ven inglés.
- Meta estáticas en `app.head` de `nuxt.config.ts`: `author`, `og:type`, `og:site_name`, Twitter card `summary_large_image`, `theme-color`.
- La URL del sitio vive una sola vez en `nuxt.config.ts` (`SITE_URL`) y se expone como `runtimeConfig.public.siteUrl`; también es el `i18n.baseUrl`.

### Imagen og (vista previa en LinkedIn/Slack/X)

- `public/img/og-en.png` y `og-es.png`, 1200×630. `app.vue` pone `og:image`/`twitter:image` como URL **absoluta** según el locale, con ancho, alto, tipo y alt.
- Se generan con `pnpm og` (`scripts/og/render.mjs`): toma los textos de `i18n/locales/*.json` (`myName`, `myRole`, `hero.availability`), los inserta en la plantilla `scripts/og/card.html` y la captura con Chrome headless. No agrega dependencias; necesita Chrome instalado (o `CHROME_PATH`) y red para Google Fonts.
- **Regenerar** cada vez que cambien esos textos, la foto `me.jpeg` o la paleta, y commitear los PNG.
- Validar tras desplegar con el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) (también refresca su caché).
- `i18n.baseUrl` = `https://www.angeldlt.dev`.
- `public/robots.txt` permite todo.
- Favicon: `public/favicon.svg` (fuente; `~A` en JetBrains Mono Bold convertida a trazos con opentype.js, porque un favicon no puede cargar fuentes web), `public/favicon.ico` (16/32/48 como PNG embebidos) y `public/apple-touch-icon.png` (180, fondo `$dark-navy` sólido). Es la marca `~A`: el home de la terminal (`~`, en ámbar como el prompt) + la inicial (`A`, en blanco como "angel" en el logo del navbar), dentro de una ventana navy con borde ámbar. Se descartó un `$` en cuadrado redondeado por parecerse al logo de Cash App. Declarados en `app.head.link` de `nuxt.config.ts`. Si se cambia el SVG, regenerar el `.ico` y el PNG a partir de él.
