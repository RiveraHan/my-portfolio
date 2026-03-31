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
| Astro adapter | @astrojs/vercel 6.x | @astrojs/vercel latest |
| Analytics | @vercel/analytics 1.x | @vercel/analytics latest |
| Sitemap | @astrojs/sitemap 1.x | @astrojs/sitemap latest |
| Deployment | Vercel | Vercel (unchanged) |

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
- Center: links — About · Skills · Experience · Projects · Contact
- Right: Language toggle pill (ES · EN) + "⬇ Download CV" button (blue filled)
- Mobile: hamburger menu collapsing center links

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
- Left: 3 paragraphs of bio text (ES/EN), 4 stat cards (6+ años, 7 empresas, M+ usuarios, 1 startup)
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
- Active dot glow for current jobs
- 7 entries (newest first):

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

| Project | Stack | Description |
|---|---|---|
| tiktokClone | Flutter, Dart | Clone funcional de TikTok — feed de videos, navegación, UI mobile |
| cryptoView | React, JavaScript | Dashboard de precios de criptomonedas en tiempo real |
| E-Commerce | Next.js, TypeScript, Tailwind | Tienda online con carrito, filtros y checkout |
| todo-list (Angular + Backend) | Angular, TypeScript, Node.js | App full stack con frontend Angular y API REST |
| react-hexagonal-example | React, TypeScript | Ejemplo de arquitectura hexagonal en frontend |
| AppVenta | C# .NET | Sistema de punto de venta desktop |
| Pokedex | TypeScript | Pokédex con búsqueda y detalle por Pokémon |
| Buscador de Recetas | React | Buscador de recetas de bebidas vía API |

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
- Form submission: static form via Netlify Forms or Formspree (no backend required)
- Location updated: Managua, Nicaragua · Remote First

### 5.9 Footer
- Simple one-line footer: copyright + "Built with Astro 5 + TailwindCSS 4"

---

## 6. Bilingual (ES / EN) Implementation

- Language toggle in navbar: pill button switching between `es` and `en`
- All text content stored in `src/data/i18n.ts` as a typed object with `es` and `en` keys
- Active language stored in `localStorage` and Astro's reactive store (or Nano Stores)
- Components read from the active language object
- Default language: Spanish (ES)
- URLs remain the same (no `/en` route prefix) — purely client-side toggle

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

- Images: use Astro's `<Image>` component for optimization
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

## 10. Out of Scope

- Blog section
- Dark/light mode toggle (dark-only for this redesign — cleaner, consistent with Dark Tech style)
- Separate pages per section (single-page architecture chosen)
- Backend contact form (use Formspree or similar static solution)
- Animations library (Framer Motion, GSAP) — CSS transitions only
