# Contenido e i18n

Todo el texto visible vive en `i18n/locales/en.json` (default) y `i18n/locales/es.json`. **Ambos archivos deben tener exactamente las mismas keys**, incluidos los arrays con el mismo número de elementos y en el mismo orden.

## Mapa de contenido

| Sección | Keys i18n | Datos no traducibles |
|---|---|---|
| Globales / Hero | `myName`, `myRole`, `tagline`, `funnyQuote`, `terminalCmd`, `yearsExp`, `hero.{ctaProjects,availability,location,scroll,photoAlt}` (`location` va en el badge junto a `yearsExp`) | Foto `public/img/me.jpeg` (también se usa en la imagen og, ver [deployment.md](./deployment.md)) |
| Navbar | `nav.*` (una key por sección, más `nav.menu` para el botón del menú móvil y `nav.language` para el grupo de idiomas) | `navLinks` en `TheNavbar/index.vue` |
| About | `about.heading/bio1-3`, `about.traits.<key>.claim` y, si tiene prueba, `.proof` | `TRAITS` en `AboutMe/constants.ts` (`key`, `demo?`, `repo?`), foto `meFormal.jpeg`. El markdown se renderiza en `AboutMe/AboutContent/` (compartido con la terminal del hero en desktop) |
| Tech stack | `stack.heading`, `stack.sub`, `stack.categories.{frameworks,styling,languages,backend,workflow}` (se muestran como keys del JSON, en minúsculas), `stack.scroll` (pista en la barra de estado del modo fijado) | `TECH_LIST` y `CATEGORIES` en `TechStack/constants.ts` (nombre, icono, categoría; `onDark: true` para logos dibujados sobre un disco negro, como Next.js, que reciben un aro claro) |
| Experience | `experience.entries[]` → `role`, `period`, `type`, `highlights[]`, `tags[]` | — (todo en i18n) |
| Projects | `projects.entries[]` → `title`, `description`, `tags[]`; `projects.viewProject`, `projects.viewCode` | `PROJECT_LINKS` en `Projects/constants.ts` (`link`, `repo`, `image`) |
| Contact | `contact.*`, `contact.socials.<key>.description` | `SOCIAL_LINKS` en `Contact/constants.ts`, constante `EMAIL` en `Contact/index.vue` |
| Footer | `footer.built`, `footer.stats` | `WAKATIME_URL` en `TheFooter/constants.ts` |
| SEO / meta | `seo.title`, `seo.description`, `seo.socialDescription` | `useSeoMeta` en `app.vue`; meta estáticas en `app.head` de `nuxt.config.ts` |

## Cómo agregar contenido

- **Tecnología**: añadir entrada a `TECH_LIST` y el SVG en `public/img/`. Nombre no se traduce. Mantener cada categoría en 4 elementos o menos; si una crece, partirla en una categoría nueva (tipo en `TechCategory`, orden en `CATEGORIES` y `stack.categories.<key>` en ambos locales).
- **Experiencia**: añadir objeto a `experience.entries` en ambos locales. Se lee con `tm()` + `rt()`; el `role` se usa como `key` del `v-for`, así que debe ser único.
- **Proyecto**: añadir objeto a `projects.entries` en ambos locales **y** una entrada en `PROJECT_LINKS` en la **misma posición** — se emparejan por índice. `repo` es la URL del código en GitHub (link "Code" de la tarjeta; el de Angel Front Themes apunta a `angel-vue-themes`, su nombre original). `image` es una captura en `public/img/` exportada a **JPG de 1200px de ancho** (se muestra a ~555px como máximo; 2x cubre pantallas retina): una captura PNG a resolución completa pesaba 1.16 MB. Carga con `loading="lazy"`. `image: null` da la tarjeta compacta sin captura, cuyo link principal es `repo` (se usa para este sitio, `angeldlt.dev`, índice 2). Si el proyecto se sirve bajo `angeldlt.dev/<ruta>`, añadir también la `routeRule` de proxy (ver [deployment.md](./deployment.md)).
- **Red social**: añadir a `SocialKey`, a `SOCIAL_LINKS` y `contact.socials.<key>.description` en ambos locales. Se imprime en la terminal de Contact como `open <key>` (la key es el comando visible, en minúsculas) con la descripción como comentario `//`. Máximo 4 acciones en esa terminal (hoy: copiar, enviar, LinkedIn, GitHub); lo demás va al footer como nota, como WakaTime.
- **Trait**: afirmación + prueba verificable. Añadir `{ key, demo?, repo? }` a `TRAITS` y `about.traits.<key>.claim` en ambos locales. Con prueba, `proof` es el **nombre del producto** ("Angel Front Themes", no el nombre del repo) y enlaza primero al demo en vivo; si también hay repo, sale un link secundario "Code" (`projects.viewCode`). Para los proyectos, `demo`/`repo` salen de `PROJECT_LINKS` por índice. Sin nada verificable que enlazar, el rasgo queda como afirmación sola, sin flecha (hoy: "Easy to work with").
- **Copy sin repeticiones**: la disponibilidad (`hero.availability`) sale una vez en el hero (badge) y una en Contacto (inicio de `contact.sub`, con la misma redacción); "full stack o backend" solo en `tagline`; la ubicación solo en `hero.location`; el rol solo en el h1/h2 del hero, el puesto de Experiencia y el SEO; los años solo en `yearsExp`. Revisar antes de añadir copy nuevo.
- **Experiencia**: máximo 3 logros por puesto, el más concreto primero; sin empleadores ni métricas. La etapa autodidacta va en una sola línea.
- **Rayas**: no usar raya larga (—) en el texto; preferir punto, dos puntos o coma. Los rangos de años usan raya corta: `2020–2022` pegada entre años y `2023 – Present` con espacios ante una palabra (`ExperienceEntry` parte el periodo por `–`). Única excepción: el separador de `seo.title`.

## Gotchas de vue-i18n

- `@` es carácter especial del formato de mensajes: escribirlo como `{'@'}`. El correo de contacto no está en i18n: sale de la constante `EMAIL` en `Contact/index.vue`.
- Para arrays/objetos usar `tm()` y resolver cada string con `rt()`; `$t()` solo para strings.
- Las imágenes se referencian por nombre de archivo relativo a `public/img/` (el componente antepone `/img/`).
