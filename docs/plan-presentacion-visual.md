# Plan: presentación visual más impactante

Estado: **en curso** (3 ✅) · Creado: 2026-09-27

Quiero incorporar estos cinco cambios para que la landing tenga momentos memorables y deje de verse como plantilla. Van en el orden de ejecución recomendado; cada uno se puede entregar y revisar por separado.

| # | Cambio | Impacto | Costo | Comando sugerido |
|---|---|---|---|---|
| 3 | Nombre como tipografía de exhibición ✅ | Alto | Bajo | `/impeccable typeset` |
| 7 | Imagen og propia para LinkedIn/Slack | Alto | Bajo | trabajo directo |
| 2 | Transición del hero como escena | Alto | Medio | `/impeccable animate hero` |
| 5 | Textura propia: fósforo ámbar CRT | Medio | Bajo | `/impeccable bolder` |
| 6 | Final memorable en Contacto | Medio | Medio | `/impeccable delight contact` |

## Restricciones que aplican a todo

- **El recruiter primero.** Ninguna animación puede retrasar el acceso a nombre, rol, disponibilidad y contacto (principio 2 de `PRODUCT.md`).
- **Conservar** el cambio intro → terminal del hero y el scroll horizontal fijado del TechStack.
- **Movimiento reducido:** todo lo nuevo se resuelve al instante con `prefers-reduced-motion: reduce` (bloque global en `main.sass` + comprobación en JS cuando aplique).
- **i18n:** todo texto nuevo va en `en.json` y `es.json` con las mismas keys.
- **Paleta:** usar solo los tokens de `colors.sass` (acento cempasúchil `#fab048`); nada de colores literales. Contraste AA en todo texto.
- **Voz:** casual, con humor de developer; ya es un compromiso de marca.
- **Docs:** actualizar `docs/` en cada cambio (en especial `architecture.md` y `styling.md`).
- **Verificación:** build de producción + capturas headless en 1440px, 375px y 320px, en inglés y en español, antes de dar cada cambio por terminado.

---

## 3. Nombre como tipografía de exhibición

**Problema:** en desktop "Angel De La Torre" va a unos 4rem, con mucho espacio muerto a la derecha y abajo. El hero se siente como formulario, no como portada.

**Qué hacer**
- Subir el nombre a ~7–8rem en desktop (`clamp()` fluido), con interletrado más cerrado (no menos de `-0.04em`) y un peso más fuerte.
- Decidir el tipo de letra: un corte más pesado de Lora (ya cargada) o una fuente de exhibición propia servida por `@nuxt/fonts`.
- Rehacer la escala tipográfica del hero: nombre → rol → tagline, con saltos claros de tamaño y peso.
- Quitar las etiquetas de sección ("PROYECTOS ——", "CONTACTO", etc.) en todas las secciones para que los títulos respiren. Implica retirar `.section-label` de los componentes y de `main.sass`, y revisar si las keys `*.label` quedan sin uso.

**Archivos:** `Hero.vue`, `main.sass`, `variables.sass` (si se agrega una fuente), `nuxt.config.ts` (fuentes), todos los componentes de sección, `docs/styling.md`.

**Criterios de aceptación**
- A 375px el nombre cabe sin desbordar, y el hero completo (nombre, rol, tagline, CTAs y badge) sigue dentro de la primera pantalla de 667px de alto.
- En español ningún título se parte de forma extraña.

**Hecho (2026-09-27):** se eligió **Fraunces** (Lora ya estaba en su peso máximo). Reemplaza a Lora en todos los títulos; nombre del hero en dos líneas a escala de exhibición; etiquetas de sección y keys `*.label` retiradas; indicador de scroll oculto < 768px (chocaba con el badge). Verificado con capturas en 1440/1024/375/320 en inglés y español.

---

## 7. Imagen og propia para LinkedIn/Slack

**Problema:** la vista previa al compartir el link es la foto de viaje recortada. Es lo primero que ve un recruiter en LinkedIn o Slack.

**Qué hacer**
- Diseñar una tarjeta de 1200×630 con nombre, rol, disponibilidad ("Open to full-time roles") y el acento ámbar sobre el fondo tinta, coherente con el sitio.
- Hacer una versión en inglés y otra en español.
- Generarla como PNG estático en `public/img/og-en.png` y `public/img/og-es.png`: maquetarla en HTML/CSS y capturarla con Chrome headless, sin agregar dependencias. Alternativa: el módulo `nuxt-og-image`.
- Apuntar `og:image` y `twitter:image` a la imagen según el locale, desde `useSeoMeta` en `app.vue`, con ancho, alto y `og:image:alt` correctos.

**Archivos:** `public/img/`, `app.vue`, `nuxt.config.ts`, `docs/deployment.md`.

**Criterios de aceptación**
- Validar con el Post Inspector de LinkedIn y el depurador de Open Graph una vez en producción.
- El texto de la imagen se lee bien en miniatura (unos 400px de ancho).

**Nota:** los crawlers ven inglés, porque no hay rutas `/es` (ver `docs/deployment.md`). La versión en español solo aplica con la cookie, salvo que después se agregue `app/pages/`.

---

## 2. Transición del hero como escena

**Problema:** hoy el cambio intro → terminal es un fade genérico, y en el estado terminal la foto desaparece y deja media pantalla vacía.

**Qué hacer**
- Al hacer scroll, la foto se encoge y viaja hasta volverse el avatar de la barra de título de la terminal, en lugar de desvanecerse.
- Los comandos de la terminal se escriben con el avance ligado al scroll, no a un temporizador: `whoami` → `Angel De La Torre — Frontend Developer` → `cat philosophy.md` → la cita → `npm run start-day`. El visitante controla el ritmo.
- Aprovechar el espacio del estado terminal, por ejemplo centrando la ventana o equilibrando la composición en desktop.
- Mantener el umbral actual del cambio (40% de la pantalla) o ajustarlo si la escena lo pide.

**Implementación**
- Animar solo `transform` y `opacity`, más `clip-path` si hace falta. Nada de propiedades de layout.
- Avance derivado de `useInjectWindowScroll()` o de un ScrollTrigger propio (sin matar triggers globales).
- En móvil, una versión simplificada o solo el tipeo, sin el viaje de la foto (en móvil el hero no tiene foto).

**Archivos:** `Hero.vue`, posiblemente un composable nuevo en `app/composables/`, `docs/architecture.md`.

**Criterios de aceptación**
- Con movimiento reducido, la terminal aparece completa al instante.
- Sin saltos al recargar a mitad de scroll.
- El texto de la terminal sigue siendo seleccionable y legible para lectores de pantalla (el contenido completo está en el DOM; el tipeo es solo visual).
- 60 fps en desktop, sin cambios de layout.

---

## 5. Textura propia: fósforo ámbar CRT

**Problema:** la cuadrícula con brillo radial del hero es un recurso de plantilla.

**Qué hacer**
- Reemplazar la cuadrícula con un concepto que cierre la paleta cempasúchil: el fósforo ámbar de los monitores CRT.
- Scanlines muy sutiles y un leve resplandor ámbar solo dentro de la terminal.
- Un grano fino y estático en el fondo, hecho con SVG `feTurbulence` o PNG en mosaico, con opacidad muy baja.
- Revisar los brillos radiales de otras secciones (About, Contact) para que usen el mismo lenguaje o desaparezcan.

**Archivos:** `Hero.vue`, `main.sass`, `AboutMe/index.vue`, `Contact/index.vue`, `docs/styling.md`.

**Criterios de aceptación**
- Nada parpadea ni se anima en bucle.
- La textura no baja el contraste de ningún texto por debajo de AA.
- Se ve como un detalle, no como un disfraz: a distancia normal apenas se percibe.
- Sin costo notable de rendimiento (nada de filtros animados a pantalla completa).

---

## 6. Final memorable en Contacto

**Problema:** la regla pico-final dice que el cierre pesa tanto como el pico, y hoy el final es una lista de tarjetas y el copyright.

**Qué hacer**
- Cerrar la página en la terminal para que empiece y termine en el mismo mundo. Por ejemplo `$ mail angel`, que muestra tu correo grande, en tipografía de exhibición, con las acciones de copiar y enviar.
- Conservar lo que ya funciona: el estado "Copied!" o de error anunciado a lectores de pantalla, LinkedIn y GitHub como tarjetas, WakaTime como link de texto.
- Revisar el footer para que acompañe ese cierre y no lo diluya.

**Archivos:** `Contact/index.vue`, `Contact/SocialCard/index.vue`, `TheFooter/index.vue`, locales, `docs/architecture.md`.

**Criterios de aceptación**
- A 320px el correo se sigue viendo completo y los botones miden al menos 44–48px.
- Funciona igual con teclado y con lector de pantalla.
- Con movimiento reducido no hay animación.
- El copy sigue en tu voz y en los dos idiomas.

---

## Fuera de este plan (por ahora)

- **Re-tematizar el sitio en vivo con el motor OKLCH:** es la propuesta de mayor impacto, pero no entra en esta ronda.
- **Proyectos animados con clips o trazos SVG:** requieren que grabes los clips de las apps.
- **Stack como mapa de pruebas.**
- **Links "Source" a GitHub:** pendientes de las URLs de los repos.
