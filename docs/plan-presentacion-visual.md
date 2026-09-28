# Plan: la terminal de punta a punta

Estado: **pendiente** · Creado: 2026-09-27 · Origen: critique del 2026-09-28 (22/32; snapshot en `.impeccable/critique/2026-09-28T05-09-10Z__app-app-vue.md`)

La ronda anterior (nombre de exhibición, imagen og, escena del hero, textura CRT, cierre en Contacto) dejó los extremos de la página con identidad propia. El centro todavía parece plantilla, y es donde más se gasta el scroll. Esta ronda lleva la terminal ámbar por toda la página, deja de secuestrar el scroll y limpia el copy. Los pasos van en el orden de ejecución; 1–3 rehacen el centro de la página y conviene hacerlos juntos para que quede coherente.

| # | Cambio | Prioridad | Comando sugerido |
|---|---|---|---|
| 1 | Escena del hero más corta y solo en desktop ✅ | P1 | `/impeccable distill` + `adapt` |
| 2 | TechStack estático como `package.json` ✅ | P1 | `/impeccable distill` + `harden` |
| 3 | La terminal atraviesa el centro ✅ | P2 | `/impeccable bolder` |
| 4 | Quitar los recursos de plantilla ✅ | P2 | `/impeccable quieter` |
| 5 | Cerrar en la terminal, sin diluir ✅ | P2 | `/impeccable distill` |
| 6 | Copy sin repeticiones y con pruebas ✅ | P2 | `/impeccable clarify` |
| 7 | Accesibilidad e i18n | P3 | `/impeccable harden` |
| 8 | Pasada final | — | `/impeccable polish` |

## Restricciones que aplican a todo

- **El recruiter primero.** Nombre, rol, disponibilidad y contacto no pueden quedar detrás de una animación (principio 2 de `PRODUCT.md`).
- **Nada de scroll secuestrado fuera de desktop.** Lo que se fije o se ligue al scroll corre solo con `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`; en otro caso se muestra estático.
- **Movimiento reducido:** el bloque global de `main.sass` no alcanza a GSAP ni a los estilos inline; cada efecto en JS comprueba la media query.
- **i18n:** todo texto nuevo va en `en.json` y `es.json` con las mismas keys.
- **Paleta:** solo tokens de `colors.sass`; nada de colores literales. Contraste AA en todo texto.
- **No inventar:** sin nombres de empleadores, métricas ni testimonios (`PRODUCT.md`, *Evidence on Hand*).
- **Voz:** casual, con humor de developer, pero que un recruiter no-dev entienda cada comando por su salida.
- **Docs:** actualizar `docs/` en cada cambio (en especial `architecture.md`, `styling.md` y `content.md`).
- **Verificación:** build de producción + capturas headless en 1440, 1024, 768, 375 y 320px, en inglés y en español, antes de dar cada cambio por terminado.

---

## 1. Escena del hero más corta y solo en desktop

**Problema:** `.hero` mide `300vh` sin media query (`Hero.vue:345`). En móvil y con movimiento reducido eso son 2 pantallas de scroll muerto; en móvil tampoco hay foto y la barra de URL de iOS hace saltar la escena. Además la terminal imprime nombre y rol, lo mismo que el h1.

**Qué hacer**
- Escena solo con `≥1024px` y sin movimiento reducido, recortada a unos 180vh.
- En móvil y con movimiento reducido, la terminal va en línea bajo el intro (o se quita), y el hero mide una pantalla.
- Cambiar los comandos para que aporten algo nuevo, p. ej. `cat now.md` → disponibilidad, ubicación y "abierto a full stack/backend", en vez de repetir el h1.

**Archivos:** `Hero.vue`, locales, `docs/architecture.md`.

**Criterios de aceptación**
- En 375px y con movimiento reducido no hay tramo de scroll sin contenido nuevo.
- A 320×568 en español el intro cabe en `100svh` sin meterse bajo el navbar.
- Sin saltos al recargar a mitad de scroll ni al colapsar la barra de URL.

---

## 2. TechStack estático como `package.json`

**Problema:** el carrusel horizontal se fija durante `innerWidth × 2` de scroll (`TechStack/index.vue:124-148`) para 15 logos, el contenido menos distintivo. El `matchMedia` solo mira `min-width: 1024px`, así que ignora movimiento reducido; y nada llama a `ScrollTrigger.refresh()` al cambiar de idioma, por lo que el pin queda desfasado en español.

**Qué hacer**
- Reemplazar el pin por un bloque estático y agrupado con forma de terminal, p. ej. `cat package.json` con `"dependencies"` por grupo.
- Grupos de 4 elementos o menos, o con jerarquía clara dentro del grupo.
- Si GSAP deja de usarse en el sitio, retirar la dependencia y actualizar `docs/technologies.md`. (Se mantiene: lo usa el modo fijado de TechStack.)

**Archivos:** `TechStack/index.vue`, `TechStack/constants.ts`, `TechCard/`, locales, `docs/architecture.md`, `docs/technologies.md`.

**Criterios de aceptación**
- ~~Sin pin ni scroll horizontal en ningún tamaño.~~ **Cambio de decisión (2026-09-28):** se conserva el scroll horizontal fijado en desktop, ya con el estilo de terminal (`less package.json`), solo con `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`; en el resto es estático. Se refresca el pin al cambiar de idioma.
- Mismo landmark (`section#stack`) en todos los breakpoints.
- Los logos siguen teniendo nombre accesible.

---

## 3. La terminal atraviesa el centro

**Problema:** la terminal solo aparece en los extremos; About, Proyectos y Experiencia son tarjetas de vidrio genéricas. La textura CRT se queda en el grano de fondo y el interior de la terminal.

**Qué hacer**
- About como salida de `cat about.md`, Proyectos como `ls projects/` y Experiencia como `git log`, todo en el mismo mundo ámbar y con `TerminalWindow` o su lenguaje visual.
- Llevar scanlines o el resplandor de fósforo a títulos de sección o divisores, con moderación.
- Mantener Fraunces para los títulos grandes dentro de la terminal (el choque deliberado ya funciona en el hero).

**Archivos:** `AboutMe/`, `Projects/`, `Experience/`, `TerminalWindow/`, `main.sass`, `docs/styling.md`.

**Criterios de aceptación**
- Un recruiter no-dev entiende cada sección por su contenido, sin necesitar leer el comando.
- Nada parpadea ni se anima en bucle; la textura no baja ningún texto de AA.
- Las líneas del timeline de 769–1023px ya no se aprietan a ~285px.

---

## 4. Quitar los recursos de plantilla

**Problema:** botones de ventana macOS fuera de paleta (`TerminalWindow:60-65`), 7 puntos pulsando sin fin, tarjetas con tilt 3D, vidrio que se levanta en hover, brillos radiales y el logo `<ADT />`.

**Qué hacer**
- Barra de título de la terminal monocroma ámbar.
- Un solo pulso vivo: el de disponibilidad.
- Quitar el tilt de `TechCard` y el vidrio con hover-lift; reemplazar por tratamientos tipográficos o CRT.
- Retirar los brillos radiales que queden, o pasarlos al lenguaje del fósforo.
- Borrar `public/img/worn-dots.png` (no se usa).
- Cambiar los 6 `transition: all` por propiedades explícitas (`SocialCard:62`, `Hero:444`, `TechStack:254`, `TheNavbar:249/275/314`) y dejar de animar `max-height` en el menú móvil.

**Archivos:** `TerminalWindow/`, `TechCard/`, `AboutMe/`, `Experience/`, `Contact/`, `TheNavbar/`, `Hero.vue`, `docs/styling.md`.

---

## 5. Cerrar en la terminal, sin diluir

**Problema:** después del pico (la terminal de Contacto) vienen un divisor, dos tarjetas sociales, la línea de WakaTime y "All rights reserved": 5 opciones de contacto a la vez y un cierre genérico.

**Qué hacer**
- LinkedIn y GitHub como comandos dentro de la terminal (p. ej. `open linkedin`), con máximo 4 acciones visibles.
- WakaTime como nota al pie.
- La página termina en el cursor parpadeando.
- Footer con una línea en tu voz en lugar del copyright genérico.

**Archivos:** `Contact/index.vue`, `Contact/SocialCard/`, `TheFooter/`, locales, `docs/content.md`.

**Criterios de aceptación**
- Botones de 44–48px mínimo; funciona igual con teclado y lector de pantalla.
- El estado de copiado sigue anunciándose (`role="status"`).

---

## 6. Copy sin repeticiones y con pruebas

**Problema:** el rol aparece 4–5 veces, la disponibilidad 3 y la frase "full stack o backend" 3. El título del About ("Always delighted to learn something new.") es genérico, los rasgos son afirmaciones sobre ti y los proyectos solo enlazan al demo, no al código (principio 3 de `PRODUCT.md`).

**Qué hacer**
- Disponibilidad una vez en el hero y una en Contacto, con la misma redacción.
- Título del About ligado a un diferenciador concreto.
- Rasgos convertidos en evidencia que apunta a los proyectos.
- Link "Code" por proyecto, en los dos idiomas. Agregar un campo `repo` a `ProjectLink` en `PROJECT_LINKS`, respetando el orden actual:

  | Índice | Proyecto | Repo |
  |---|---|---|
  | 0 | Angel Front Themes | https://github.com/AngelDev2110/angel-vue-themes |
  | 1 | Noob Draw | https://github.com/AngelDev2110/noob-draw |

  El repo de Angel Front Themes se llama `angel-vue-themes`; es la URL correcta aunque el nombre no coincida. Al implementarlo, documentar el campo `repo` en `docs/content.md`.

**Archivos:** `en.json`, `es.json`, `Projects/constants.ts` (`PROJECT_LINKS`, emparejado por índice), `AboutMe/`, `docs/content.md`.

---

## 7. Accesibilidad e i18n

**Qué hacer**
- `aria-label="Toggle menu"` a i18n (`TheNavbar:43`).
- Botones de idioma: que el texto visible "EN/ES" coincida con el nombre accesible (WCAG 2.5.3).
- Menú móvil: mover el foco al abrir, devolverlo al cerrar con Esc y cerrarlo al pasar de 768px.
- Targets de 44px mínimo (burger ~30×24, botones de idioma ~26px).
- Resolver el solape en exactamente 768px (reglas `max-width` y `min-width` en `$bp-md` aplican a la vez en ExperienceEntry y los chips del About).
- Rol del hero fuera de `h2` si rompe el esquema de títulos; periodos de experiencia en `<time>`.
- `AppearingText.d.ts`: exportar `Props` según la convención.

**Archivos:** `TheNavbar/`, `Hero.vue`, `Experience/`, `AboutMe/`, `AppearingText/`, locales.

---

## 8. Pasada final

`/impeccable polish` sobre todo lo anterior, y volver a correr `/impeccable critique` para comparar con 22/32.

---

## Fuera de este plan (por ahora)

- **Re-tematizar el sitio en vivo con el motor OKLCH:** propuesta de mayor impacto, pero no entra en esta ronda.
- **Proyectos animados con clips o trazos SVG:** requieren que grabes los clips de las apps.
- **Reordenar para poner Proyectos antes que About:** se evalúa después del paso 3.
