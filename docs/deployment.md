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
- Meta estáticas en `app.head` de `nuxt.config.ts`: `author`, `og:type`, `og:image` (`/img/me.jpeg`, 1280×960), `og:site_name`, Twitter card `summary_large_image`, `theme-color`.
- `i18n.baseUrl` = `https://www.angeldlt.dev`.
- `public/robots.txt` permite todo.
- `public/favicon.ico`.
