# Contenido e i18n

Todo el texto visible vive en `i18n/locales/en.json` (default) y `i18n/locales/es.json`. **Ambos archivos deben tener exactamente las mismas keys**, incluidos los arrays con el mismo número de elementos y en el mismo orden.

## Mapa de contenido

| Sección | Keys i18n | Datos no traducibles |
|---|---|---|
| Globales / Hero | `myName`, `myRole`, `tagline`, `funnyQuote`, `terminalCmd`, `yearsExp`, `openToWork`, `hero.{ctaProjects,availability,scroll,photoAlt}` | Foto `public/img/me.jpeg` (también se usa en la imagen og, ver [deployment.md](./deployment.md)) |
| Navbar | `nav.*` (una key por sección) | `navLinks` en `TheNavbar/index.vue` |
| About | `about.heading/bio1-3`, `about.chipRole`, `about.chipLocation`, `about.traits.*` | `TRAITS` en `AboutMe/constants.ts` (lista de keys), foto `meFormal.jpeg` |
| Tech stack | `stack.*`, `stack.categories.{frameworks,languages,tools}` | `TECH_LIST` y `CATEGORIES` en `TechStack/constants.ts` (nombre, icono, categoría) |
| Experience | `experience.entries[]` → `role`, `period`, `type`, `highlights[]`, `tags[]` | — (todo en i18n) |
| Projects | `projects.entries[]` → `title`, `description`, `tags[]` | `PROJECT_LINKS` en `Projects/constants.ts` (`link`, `image`) |
| Contact | `contact.*`, `contact.socials.<key>.{label,description}` | `SOCIAL_LINKS` en `Contact/constants.ts`, constante `EMAIL` en `Contact/index.vue` |
| Footer | `footer.built`, `footer.rights` | — |
| SEO / meta | `seo.title`, `seo.description`, `seo.socialDescription` | `useSeoMeta` en `app.vue`; meta estáticas en `app.head` de `nuxt.config.ts` |

## Cómo agregar contenido

- **Tecnología**: añadir entrada a `TECH_LIST` y el SVG en `public/img/`. Nombre no se traduce.
- **Experiencia**: añadir objeto a `experience.entries` en ambos locales. Se lee con `tm()` + `rt()`; el `role` se usa como `key` del `v-for`, así que debe ser único.
- **Proyecto**: añadir objeto a `projects.entries` en ambos locales **y** una entrada en `PROJECT_LINKS` en la **misma posición** — se emparejan por índice. `image: null` muestra un placeholder `</>`. Si el proyecto se sirve bajo `angeldlt.dev/<ruta>`, añadir también la `routeRule` de proxy (ver [deployment.md](./deployment.md)).
- **Red social**: añadir a `SocialKey`, a `SOCIAL_LINKS` (icono en `public/img/`; `featured: true` la muestra como tarjeta, `false` como link de texto bajo las tarjetas usando su `description`) y `contact.socials.<key>` en ambos locales.
- **Trait**: añadir key a `TRAITS` y `about.traits.<key>` en ambos locales.

## Gotchas de vue-i18n

- `@` es carácter especial del formato de mensajes: escribirlo como `{'@'}`. El correo de contacto no está en i18n: sale de la constante `EMAIL` en `Contact/index.vue`.
- Para arrays/objetos usar `tm()` y resolver cada string con `rt()`; `$t()` solo para strings.
- Las imágenes se referencian por nombre de archivo relativo a `public/img/` (el componente antepone `/img/`).
