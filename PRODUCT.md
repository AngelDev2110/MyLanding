# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers, and engineering leads at companies evaluating Angel De La Torre for a full-time role. Frontend is his primary focus, but he is also open to full stack or backend roles. They arrive from a job application, LinkedIn, or a shared link, usually scanning several candidates, and need to judge quickly whether he is worth an interview and how to reach him.

## Product Purpose

Personal landing / portfolio for Angel De La Torre, Frontend Developer based in Mexico (3 years of experience). Primarily frontend, open to full stack and backend roles. It exists to get him contacted for full-time opportunities ("Open to new opportunities"). Success means a qualified visitor understands who he is, trusts his craft, and reaches out via email or LinkedIn.

## Positioning

The site itself is the proof. Four differentiators, all confirmed as equally important:

- **UI detail eye**: pixel-perfect translation of designs into faithful UI.
- **Clean code / architecture**: components and libraries a team can maintain.
- **Own technical projects**: Angel Front Themes (custom HEX↔RGB↔OKLCH color engine, WCAG contrast validation) and Noob Draw (multiplayer Pictionary with Postgres as the server, zero custom backend).
- **Personality / easy to work with**: humor and warmth as a signal of collaboration.

## Operating Context

- Single-page site at `https://www.angeldlt.dev` (Vercel). Sections: Hero, About, Tech Stack, Experience, Projects, Contact, Footer.
- Bilingual: English (default) and Spanish; every visible string exists in both.
- The domain also proxies Angel's other deployed projects (`/angel-front-themes`, `/noob-draw`), which the Projects section links to.
- Visitors act through email (copy/send) and social links (LinkedIn, GitHub, WakaTime).

## Capabilities and Constraints

- Stack is fixed: Nuxt 4, Vue 3, TypeScript, indented Sass, `@nuxtjs/i18n`, animate.css. See `docs/` for conventions.
- SSR: browser-only code must run in `onMounted` or be guarded.
- SEO/meta is English-only in `nuxt.config.ts`.
- Projects content (i18n) and `PROJECT_LINKS` pair by index.

## Brand Commitments

- Name: Angel De La Torre. Role: Frontend Developer.
- Voice is binding: casual, self-deprecating developer humor, warm and direct (e.g. "I debug with console.log and I regret nothing.", "Built with Nuxt, Vue, and way too much coffee"). Preserve it in both languages.
- Personal photos are part of the identity (`public/img/me.jpeg`, also the og:image; `public/img/meFormal.jpeg`).

## Evidence on Hand

- Real work history: Frontend Developer (2023–present), Junior Frontend Developer (2023), self-taught (2020–2022). Employer names are not published.
- Two live projects with screenshots: `public/img/angel-front-themes.png`, `public/img/noob-draw.png`.
- Tech icons for the stack in `public/img/*.svg`.
- Absent, and must not be fabricated: testimonials, employer logos or names, metrics/impact numbers, certifications, a CV download.

## Product Principles

1. The page is a work sample: its own craft must demonstrate the UI detail and clean engineering it claims.
2. A recruiter scanning fast should grasp role, experience, and how to contact within the first screens.
3. Show, don't assert: link claims to real projects and real code.
4. Personality is a feature, not decoration; humor stays, but never at the cost of clarity.
5. Both languages are first-class; nothing ships in only one.
