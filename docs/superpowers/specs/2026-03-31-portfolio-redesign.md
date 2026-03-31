# Portfolio Redesign — Design Spec
**Date:** 2026-03-31
**Project:** hanzellrivera.vercel.app
**Owner:** Hanzell Rivera

---

## 1. Overview

Complete redesign and content update of Hanzell Rivera's personal portfolio. The current site (Astro 4 + TailwindCSS 3) is minimalistic, outdated, and missing 2+ years of professional experience. The redesign will modernize the visual identity, add new sections, update all content from the CV, and upgrade the tech stack.

---

## 2. Goals

- Attract **both recruiters** (full-time remote roles) and **freelance clients**
- Reflect current professional reality: Flutter Developer + Founder @ Acaluva
- Bilingual experience: **ES / EN toggle**
- Visual style: **Dark Tech / Developer** — dark background, neon accents, code aesthetic
- Architecture: **Single-page, top sticky navbar**, smooth scroll between sections
- Stack upgrade: Astro 5 + TailwindCSS 4

---

## 3. Tech Stack

| Layer | Current | Target |
|---|---|---|
| Framework | Astro 4.1.2 | Astro 5.x (latest) |
| Styling | TailwindCSS 3.4.1 | TailwindCSS 4.x |
| TailwindCSS integration | @astrojs/tailwind | @tailwindcss/vite (Vite plugin — no astro integration package needed) |
| Astro adapter | @astrojs/vercel 6.x | @astrojs/vercel latest |
| Analytics | @vercel/analytics 1.x | @vercel/analytics latest |
| Sitemap | @astrojs/sitemap 1.x | @astrojs/sitemap latest |
| Deployment | Vercel | Vercel (unchanged) |

### TailwindCSS 4 Migration Notes
- Remove `@astrojs/tailwind` and `tailwind.config.mjs`
- Add `@tailwindcss/vite` to `vite.plugins` in `astro.config.mjs`
- Replace `@tailwind base/components/utilities` directives with `@import "tailwindcss"` in `style.css`
- Design tokens (colors, fonts) moved to `@theme` block in `style.css` instead of `tailwind.config.mjs`
- Output mode: `output: 'static'` — portfolio is fully static, no SSR needed (simpler, faster, cheaper)

### Astro Config target
```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://hanzellrivera.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
})
```

---

## 4. Design System

### Colors
```
--bg:      #080c12   (main background)
--bg2:     #0d1117   (slightly lighter)
--bg3:     #161b22   (cards, inputs)
--bg4:     #21262d   (tags, chips)
--border:  #21262d
--border2: #30363d
--text:    #e6edf3   (primary text)
--text2:   #8b949e   (secondary text)
--text3:   #6e7681   (muted text)
--blue:    #58a6ff   (primary accent)
--green:   #3fb950   (success / "open to work")
--purple:  #d2a8ff   (founder / special accent)
--yellow:  #e3b341   (warning / .NET)
```

### Typography
- **Headings:** Outfit (font-weight 800–900)
- **Body:** Inter (font-weight 400–600)
- **Monospace / labels:** system monospace (Cascadia Code, Fira Code, SF Mono)

### Visual Language
- Dark background with subtle radial glows (blue top-right, green bottom-left)
- Cards: `bg3` background, `border` border, `border-radius: 12px`
- Accent gradient: `linear-gradient(135deg, #58a6ff, #3fb950)` for name/hero
- Status badge: green pulsing dot for "Open to work"
- Section eyebrows: `font-family: monospace`, uppercase, letter-spacing 3px, blue color, format: `// 01 · Section Name`
- Dividers: `linear-gradient(90deg, #58a6ff22, transparent)` 1px height

---

## 5. Sections (in order)

### 5.1 Navbar
- Fixed, top, full-width, `backdrop-filter: blur(16px)`
- Left: `HR.` logo (monospace, blue)
- Center: links — About · Skills · Experience · Projects · Education · Contact (section anchors, smooth scroll)
- Right: Language toggle pill (ES · EN) + "⬇ Download CV" button (blue filled)
- **CV file:** `public/assets/cv/Hanzell_Rivera_CV.pdf` — owner must add this PDF before deploy; button uses `download` attribute on `<a>` tag. Until file is added, button links to LinkedIn as fallback.
- **Mobile (< 768px):** hamburger icon replaces center links; clicking opens a full-screen overlay nav with links + lang toggle + CV button; overlay closes on link click or outside tap; breakpoint: `md` (768px)
- Eyebrow numbering sequence: `// 01 · About` · `// 02 · Skills` · `// 03 · Experience` · `// 04 · Projects` · `// 05 · Education` · `// 06 · Contact`

### 5.2 Hero
- Full viewport height, centered vertically
- Left column (text):
  - Status badge: `● Open to work · Remote` (green, pulsing dot)
  - Eyebrow: `// Hola, soy` (monospace)
  - Name: `Hanzell` (white) + `Rivera` (blue→green gradient)
  - Title: `Flutter Dev · Mobile & Full Stack · Founder @Acaluva`
  - Bio: 2-sentence description highlighting 6+ years + Tigo Money + Acaluva
  - Tech pills: Flutter/Dart · Node.js · Python · C# .NET · React/Next.js · AWS Bedrock · PostgreSQL
  - CTA buttons: "Ver Proyectos" (primary blue) + "Contáctame" (ghost)
  - Social links: LinkedIn · GitHub · Email
- Right column: profile photo in rounded card with gradient ring + location badge
- Background: subtle radial glow effects (no particles — performant)

### 5.3 About Me
- Two-column grid
- Left: 3 paragraphs of bio text (ES/EN), 4 stat cards (6+ años, 7 empresas, "Millones+ usuarios (Tigo Money)", 1 startup)
- Right: 4 value items with icon, title, and description:
  1. Clean Code & Architecture (BLoC, RiverPod, Clean Architecture)
  2. Mobile-First (Flutter iOS+Android single codebase)
  3. AI Enthusiast (AWS Bedrock + open-source LLMs in Acaluva)
  4. Builder Mindset (founder perspective on product, UX, business)

### 5.4 Skills
- Categorized chip grid (no progress bars — they're meaningless)
- Categories:
  - 📱 Mobile: Flutter, Dart, BLoC, RiverPod, Freezed, Push Notifications, React Native, FaceTec SDK
  - ⚙️ Backend: Node.js, Python, FastAPI, Express.js, C# .NET Core, ASP.NET, Redis, REST APIs
  - 🌐 Frontend: React, Next.js, TypeScript, Astro, TailwindCSS
  - ☁️ Cloud & DB: AWS Bedrock, Azure Functions, Firebase, PostgreSQL, MySQL, SQL Server
- Each chip: colored dot (blue/green/purple/yellow by category) + label

### 5.5 Experience
- Two-column timeline layout: date/company on left, details on right
- Vertical line connecting timeline items
- Active dot glow (green, box-shadow pulse) for entries where `endDate` is `null` (current)
- 7 entries (newest first):
- **Data shape extension** — `info.ts` experience entries get two new optional fields:
  - `endDate: string | null` — `null` means current/present
  - `tags: string[]` — tech chips shown below description (rename existing `skills` to `tags` for consistency)

| # | Company | Role | Period |
|---|---|---|---|
| 1 | BYONDIT | Flutter Developer — CrediClub | Oct 2025 → Present |
| 2 | Overinn (Acaluva) | Founder & Developer | Nov 2024 → Present |
| 3 | Hypernova Labs | Backend Developer — Kiosko de Cochez | Sep 2024 → May 2025 |
| 4 | Op-Tech Outsourcing Partners | Full Stack — Radar AI + Portal Automotriz | Jan 2024 → Sep 2024 |
| 5 | BYONDIT (Tigo Money) | Full Stack Developer | Jan 2023 → Dec 2023 |
| 6 | HyperNova Labs | Backend Developer | Jul 2021 → Dec 2022 |
| 7 | Qor Development LLC | Backend Developer | Feb 2020 → Jul 2021 |

### 5.6 Projects

#### Featured: Acaluva
- Full-width card with gradient border (blue/green)
- Left: badge "★ Startup · Founder · En Beta", title, subtitle, description, tech pills, CTA buttons (Live + GitHub)
- Right: 4 metric cards (Beta/Producción, AI/LLMs open-source, 4+ Roles RBAC, SaaS)
- Link: acaluva.overinn.com

#### Project Grid (3 columns)
Projects with thumbnail, title, description, tech stack tags, and GitHub/Live links:

| Project | Stack | Thumbnail | Description |
|---|---|---|---|
| tiktokClone | Flutter, Dart | existing `/assets/images/tiktokClone.png` | Clone funcional de TikTok — feed de videos, navegación, UI mobile |
| cryptoView | React, JavaScript | gradient placeholder (purple→blue) | Dashboard de precios de criptomonedas en tiempo real |
| E-Commerce | Next.js, TypeScript, Tailwind | existing `/assets/images/e-commerce.png` | Tienda online con carrito, filtros y checkout |
| todo-list (Angular + Backend) | Angular, TypeScript, Node.js | gradient placeholder (green→teal) | App full stack con frontend Angular y API REST |
| react-hexagonal-example | React, TypeScript | gradient placeholder (blue→purple) | Implementación de arquitectura hexagonal en React — separación de capas, puertos y adaptadores |
| AppVenta | C# .NET | gradient placeholder (yellow→orange) | Sistema de punto de venta — gestión de productos, ventas y clientes |
| Pokedex | TypeScript | existing `/assets/images/pokedex.png` | Pokédex con búsqueda y ficha detallada por Pokémon |
| Buscador de Recetas | React | existing `/assets/images/bebidas.png` | Buscador de recetas de bebidas vía API externa |

**Thumbnail note:** Projects without existing images use CSS `linear-gradient` backgrounds as placeholders — no image files needed.

### 5.7 Education & Certifications
- Left card: UNAN — Ingeniería en Sistemas de la Información (2017–2021)
- Right: 4 certification chips:
  - React Native CLI
  - Frontend Developer
  - Node.js: De cero a experto
  - Python Básico

### 5.8 Contact
- Two-column layout
- Left: headline + description + contact link items (email, LinkedIn, GitHub, ubicación)
- Right: contact form — name, email, message textarea, submit button
- **Form submission: Formspree** (not Netlify Forms — site deploys on Vercel, not Netlify)
  - Create free account at formspree.io, create a form, get endpoint URL
  - Form `action` points to `https://formspree.io/f/<FORM_ID>`
  - Store form ID in `.env` as `PUBLIC_FORMSPREE_ID` and reference in component
  - Show success/error state after submission (no page reload — JS fetch)
- Location updated: Managua, Nicaragua · Remote First

### 5.9 Footer
- Simple one-line footer: copyright + "Built with Astro 5 + TailwindCSS 4"

---

## 6. Bilingual (ES / EN) Implementation

**Strategy: CSS class swap on `<html>` + data attributes (no SSR, no islands required)**

Since the site is fully static (`output: 'static'`), Astro components render at build time and cannot read `localStorage`. The bilingual toggle works as follows:

1. **All text for both languages is rendered in the HTML** — each translatable element renders two `<span>` tags with `data-lang="es"` and `data-lang="en"` respectively
2. **Active language is stored in `localStorage`** (default: `"es"`)
3. **A small inline `<script>` in `<head>`** reads `localStorage` and sets `data-lang` on `<html>` before first paint (no flash)
4. **CSS rule** hides inactive language: `[data-lang="es"] [data-lang="en"] { display: none }` and vice versa
5. **Toggle button** flips `data-lang` on `<html>` and writes to `localStorage`

**`src/data/i18n.ts` structure:**
```ts
export const i18n = {
  es: {
    nav: { about: 'Sobre mí', skills: 'Skills', ... },
    hero: { greeting: 'Hola, soy', cta: 'Ver Proyectos', ... },
    about: { title: 'Un poco sobre mí', ... },
    // ... all sections
  },
  en: {
    nav: { about: 'About', skills: 'Skills', ... },
    hero: { greeting: "Hi, I'm", cta: 'View Projects', ... },
    // ...
  }
}
```

- Default language: Spanish (ES)
- URLs remain the same — purely client-side toggle
- No `/en` route prefix needed

---

## 7. Content Updates (from CV)

### Personal Info
- **Title:** Flutter Developer | Mobile & Full Stack Engineer
- **Tagline:** Founder @Acaluva
- **Location:** Managua, Nicaragua (was Panama City — incorrect)
- **Years of experience:** 6+
- **Bio language:** Spanish default with EN toggle

### New Experience (4 entries to add)
See section 5.5 above.

### Projects
- Remove: `astro-portfolio` (redundant)
- Add: tiktokClone, cryptoView, todo-list-angular, react-hexagonal-example, AppVenta
- Improve: all existing projects get descriptions and tech stack
- Feature: Acaluva as hero project

---

## 8. Performance & SEO

- Images: use Astro's `<Image>` component for optimization; profile photo expected at `public/assets/images/profile.png` (existing), dimensions `width={240} height={270}`, `alt="Hanzell Rivera"`
- Fonts: keep local Inter + Outfit (already in repo)
- Animations: CSS-only where possible (no heavy JS libraries), `prefers-reduced-motion` respected
- Meta tags: update title, description, OG image
- Sitemap: keep `@astrojs/sitemap`

---

## 9. File Structure Changes

```
src/
  data/
    info.ts          ← update all content
    i18n.ts          ← NEW: bilingual strings (es/en)
  components/
    general/
      Navbar.astro        ← redesign + lang toggle + CV button
      Footer.astro        ← redesign
      ProjectCard.astro   ← redesign with description + stack
      Contact.astro       ← replace email-copy with full form
    home/
      Hero.astro          ← full redesign
      About.astro         ← NEW
      Skills.astro        ← NEW
      Experience.astro    ← redesign (timeline layout)
      Projects.astro      ← redesign (Acaluva featured + grid)
      Education.astro     ← redesign
  styles/
    style.css        ← update design tokens + new utility classes
  pages/
    index.astro      ← add new section imports
```

---

## 10. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PUBLIC_FORMSPREE_ID` | Yes (for contact form) | Formspree form ID — get from formspree.io after creating a form |

**Setup steps:**
1. Create a free account at formspree.io and create a new form
2. Copy the form ID (e.g., `xrgvpwkz`)
3. Add to `.env` locally: `PUBLIC_FORMSPREE_ID=xrgvpwkz`
4. Add the same variable in Vercel dashboard → Project Settings → Environment Variables
5. Commit a `.env.example` file with `PUBLIC_FORMSPREE_ID=` (empty value) so future contributors know it's required

**Fallback behavior if missing:** The contact form renders but the submit button is disabled with a tooltip "Form not configured". No build error — accessed via `import.meta.env.PUBLIC_FORMSPREE_ID ?? ''`.

---

## 11. Out of Scope

- Blog section
- Dark/light mode toggle (dark-only for this redesign — cleaner, consistent with Dark Tech style)
- Separate pages per section (single-page architecture chosen)
- Backend contact form (use Formspree or similar static solution)
- Animations library (Framer Motion, GSAP) — CSS transitions only
