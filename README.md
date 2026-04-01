# Hanzell Rivera — Portfolio

Personal portfolio built with Astro 6 + TailwindCSS 4. Bilingual (ES/EN), Dark Tech aesthetic, deployed on Vercel.

## Stack

- **Astro 6** — static output
- **TailwindCSS 4** — via `@tailwindcss/vite` plugin
- **TypeScript**
- **Formspree** — contact form
- **Vercel** — hosting

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── cv/
│       │   ├── Hanzell_Rivera_CV_ES.pdf
│       │   └── Hanzell_Rivera_CV_EN.pdf
│       ├── fonts/
│       └── images/
│           └── profile.png
├── src/
│   ├── components/
│   │   ├── general/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── MetaHead.astro
│   │   │   ├── ProjectCard.astro
│   │   │   └── ProjectsWrapper.astro
│   │   └── home/
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       ├── Skills.astro
│   │       ├── Experience.astro
│   │       ├── Projects.astro
│   │       ├── Education.astro
│   │       └── Contact.astro
│   ├── data/
│   │   ├── info.ts       ← personal data (experience, projects)
│   │   └── i18n.ts       ← all ES/EN strings
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── style.css     ← TailwindCSS 4 + design tokens
│   │   └── fonts.css
│   └── types/
│       └── index.ts
├── .env.example
└── astro.config.mjs
```

## Setup

```bash
pnpm install
pnpm dev
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```
PUBLIC_FORMSPREE_ID=your_form_id
```

Get a free form ID at [formspree.io](https://formspree.io).

## Commands

| Command       | Action                        |
|---------------|-------------------------------|
| `pnpm dev`    | Dev server at localhost:4321  |
| `pnpm build`  | Build to `./dist/`            |
| `pnpm preview`| Preview production build      |

## Deploy

Hosted on Vercel. Add `PUBLIC_FORMSPREE_ID` in Project Settings → Environment Variables.
