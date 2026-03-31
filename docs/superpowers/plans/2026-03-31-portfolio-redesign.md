# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete redesign of hanzellrivera.vercel.app — Dark Tech style, bilingual ES/EN, Astro 5 + TailwindCSS 4, 9 sections with updated content from CV.

**Architecture:** Single-page Astro 5 static site with TailwindCSS 4 (Vite plugin). Bilingual toggle via `data-lang` attribute swap on `<html>` with both languages pre-rendered in HTML. All content driven from `src/data/info.ts` and `src/data/i18n.ts`.

**Tech Stack:** Astro 5, TailwindCSS 4 (`@tailwindcss/vite`), TypeScript, Vercel (static), Formspree (contact form), Inter + Outfit fonts (local).

**Spec:** `docs/superpowers/specs/2026-03-31-portfolio-redesign.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Upgrade all dependencies |
| `astro.config.mjs` | Rewrite | Astro 5 + TailwindCSS 4 vite plugin config |
| `tailwind.config.mjs` | Delete | Replaced by `@theme` in style.css |
| `src/styles/style.css` | Rewrite | TailwindCSS 4 import + design tokens (@theme) + utility classes |
| `src/styles/custom-styles.css` | Delete | Merged into style.css |
| `src/types/index.ts` | Rewrite | Updated TypeScript interfaces |
| `src/data/info.ts` | Rewrite | All content: 7 experience entries, 9 projects, updated personal info |
| `src/data/i18n.ts` | Create | All bilingual strings (es/en) for every section |
| `src/layouts/Layout.astro` | Modify | Add i18n init script, update imports |
| `src/pages/index.astro` | Rewrite | Wire all new sections |
| `src/components/general/Navbar.astro` | Rewrite | Sticky nav + lang toggle + CV btn + mobile hamburger |
| `src/components/general/Footer.astro` | Rewrite | Simple dark footer |
| `src/components/general/MetaHead.astro` | Modify | Updated SEO meta + OG tags |
| `src/components/general/ProjectCard.astro` | Rewrite | Card with thumbnail, description, stack tags, links |
| `src/components/general/Contact.astro` | Delete | Replaced by `src/components/home/Contact.astro` |
| `src/components/home/Hero.astro` | Rewrite | Full hero with photo, gradient name, pills, CTAs |
| `src/components/home/About.astro` | Create | Bio paragraphs, stat cards, value items |
| `src/components/home/Skills.astro` | Create | Categorized skill chips grid |
| `src/components/home/Experience.astro` | Rewrite | Two-col timeline with 7 entries |
| `src/components/home/Projects.astro` | Rewrite | Acaluva featured + 3-col project grid |
| `src/components/home/Education.astro` | Rewrite | UNAN card + cert chips |
| `src/components/home/Contact.astro` | Create | Formspree form + contact links |
| `.env.example` | Create | Document PUBLIC_FORMSPREE_ID requirement |

---

## Task 1: Upgrade Dependencies and Config

**Files:**
- Modify: `package.json`
- Rewrite: `astro.config.mjs`
- Delete: `tailwind.config.mjs`

- [ ] **Step 1: Upgrade packages**

```bash
cd /home/hanzell/workspace/my-portfolio
pnpm add astro@latest @astrojs/vercel@latest @astrojs/sitemap@latest @vercel/analytics@latest
pnpm add -D @tailwindcss/vite tailwindcss
pnpm remove @astrojs/tailwind astro-robots-txt
```

- [ ] **Step 2: Verify package.json updated correctly**

```bash
cat package.json | grep -E '"astro|tailwind|vercel'
```
Expected: astro 5.x, @tailwindcss/vite present, @astrojs/tailwind absent.

- [ ] **Step 3: Rewrite astro.config.mjs**

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
  vite: {
    plugins: [tailwindcss()],
  },
})
```

- [ ] **Step 4: Delete tailwind.config.mjs**

```bash
rm /home/hanzell/workspace/my-portfolio/tailwind.config.mjs
```

- [ ] **Step 5: Verify dev server starts**

```bash
pnpm dev
```
Expected: Server starts without errors on localhost:4321. Ctrl+C to stop.

- [ ] **Step 6: Commit**

```bash
git add package.json astro.config.mjs pnpm-lock.yaml
git rm tailwind.config.mjs
git commit -m "chore: upgrade to Astro 5 + TailwindCSS 4 vite plugin"
```

---

## Task 2: Design Tokens and Base Styles

**Files:**
- Rewrite: `src/styles/style.css`
- Delete: `src/styles/custom-styles.css`

- [ ] **Step 1: Rewrite style.css with TailwindCSS 4 syntax and all design tokens**

```css
/* src/styles/style.css */
@import "tailwindcss";
@import "./fonts.css";

@theme {
  /* Colors */
  --color-bg:      #080c12;
  --color-bg2:     #0d1117;
  --color-bg3:     #161b22;
  --color-bg4:     #21262d;
  --color-border:  #21262d;
  --color-border2: #30363d;
  --color-text:    #e6edf3;
  --color-text2:   #8b949e;
  --color-text3:   #6e7681;
  --color-blue:    #58a6ff;
  --color-green:   #3fb950;
  --color-purple:  #d2a8ff;
  --color-yellow:  #e3b341;

  /* Fonts */
  --font-inter:   'Inter', sans-serif;
  --font-outfit:  'Outfit', sans-serif;
  --font-mono:    'Cascadia Code', 'Fira Code', 'SF Mono', monospace;
}

/* ── Base ── */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-inter);
}

/* ── i18n: hide inactive language ── */
html[data-lang="es"] [data-lang="en"] { display: none; }
html[data-lang="en"] [data-lang="es"] { display: none; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-bg4); border-radius: 2px; }

/* ── Typography ── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-outfit);
}

/* ── Layout ── */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── Animations ── */
@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--color-green); }
  50% { opacity: 0.3; box-shadow: none; }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ── Utility classes ── */
.section-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--color-blue);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(88,166,255,0.13), transparent);
  margin: 0;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-blue), var(--color-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6875rem;
  border-radius: 0.3125rem;
  font-size: 0.6875rem;
  font-weight: 600;
  font-family: var(--font-mono);
}
.pill-blue   { background: rgba(88,166,255,0.1);  border: 1px solid rgba(88,166,255,0.2);  color: var(--color-blue); }
.pill-green  { background: rgba(63,185,80,0.1);   border: 1px solid rgba(63,185,80,0.2);   color: var(--color-green); }
.pill-purple { background: rgba(210,168,255,0.1); border: 1px solid rgba(210,168,255,0.2); color: var(--color-purple); }
.pill-yellow { background: rgba(227,179,65,0.1);  border: 1px solid rgba(227,179,65,0.2);  color: var(--color-yellow); }

.btn-primary {
  background: var(--color-blue);
  color: #0d1117;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.85; }

.btn-ghost {
  border: 1px solid var(--color-border2);
  color: var(--color-text2);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-decoration: none;
  display: inline-block;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: var(--color-blue); color: var(--color-text); }

.card {
  background: var(--color-bg3);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}
```

- [ ] **Step 2: Delete custom-styles.css**

```bash
rm /home/hanzell/workspace/my-portfolio/src/styles/custom-styles.css
```

- [ ] **Step 3: Verify build succeeds**

```bash
pnpm build 2>&1 | tail -20
```
Expected: `build complete` with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/style.css
git rm src/styles/custom-styles.css
git commit -m "chore: migrate to TailwindCSS 4 design tokens and base styles"
```

---

## Task 3: Types and Data Layer

**Files:**
- Rewrite: `src/types/index.ts`
- Rewrite: `src/data/info.ts`
- Create: `src/data/i18n.ts`

- [ ] **Step 1: Rewrite src/types/index.ts**

```ts
// src/types/index.ts
export interface IExperience {
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current/present
  description: string[];
  tags?: string[];
}

export interface IEducation {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface IProject {
  title: string;
  isFeatured?: boolean;
  thumbnail?: string;
  thumbnailGradient?: string; // CSS gradient for projects without images
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface IInfo {
  baseUrl: string;
  name: string;
  jobDescription: string;
  about: string;
  experience: IExperience[];
  education: IEducation[];
  socialMedia: {
    twitter?: string;
    github?: string;
    email?: string;
    linkedin?: string;
  };
  projects: IProject[];
}
```

- [ ] **Step 2: Rewrite src/data/info.ts with all updated content**

```ts
// src/data/info.ts
import type { IInfo } from '../types'

export const info: IInfo = {
  baseUrl: 'https://hanzellrivera.vercel.app',
  name: 'Hanzell Rivera',
  jobDescription: 'Flutter Developer | Mobile & Full Stack Engineer',
  about: 'Ingeniero en Sistemas con 6+ años construyendo apps móviles de producción usadas por millones de usuarios. Apasionado por el código limpio, la arquitectura escalable y crear productos que impactan vidas reales.',

  experience: [
    {
      name: 'BYONDIT',
      position: 'Flutter Developer',
      location: 'Remote',
      startDate: 'Oct 2025',
      endDate: null,
      description: [
        'Desarrollo y mantenimiento de CrediClub, app financiera para banco mexicano. Integré DataTheorem SDK para seguridad en 3 ambientes. Construí flujos de tarjetas físicas y digitales, soft token y gestión de bloqueos. Configuré notificaciones push y diseñé estructura de metadata reutilizable.',
      ],
      tags: ['Flutter', 'Dart', 'DataTheorem', 'Push Notifications', 'BLoC'],
    },
    {
      name: 'Overinn — Acaluva',
      position: 'Founder & Developer',
      location: 'Remote',
      startDate: 'Nov 2024',
      endDate: null,
      description: [
        'Fundé y desarrollé Acaluva, plataforma SaaS de gestión académica con IA para educadores independientes en LATAM. Sistema con RBAC multi-rol, facturación recurrente, módulo académico jerárquico y asistente IA con LLMs open-source. Actualmente en beta con clientes activos.',
      ],
      tags: ['Flutter', 'Node.js', 'PostgreSQL', 'AI / LLMs', 'RBAC', 'SaaS'],
    },
    {
      name: 'Hypernova Labs',
      position: 'Backend Developer',
      location: 'Remote',
      startDate: 'Sep 2024',
      endDate: 'May 2025',
      description: [
        'Desarrollé el backend para Kiosko de Cochez, app de autoservicio en tiendas retail físicas. Implementé requerimientos con C# .NET Core y ASP.NET asegurando rendimiento y escalabilidad en ambiente ágil.',
      ],
      tags: ['C# .NET', 'ASP.NET', 'SCRUM'],
    },
    {
      name: 'Op-Tech Outsourcing Partners',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Jan 2024',
      endDate: 'Sep 2024',
      description: [
        'Desarrollé portal administrativo para gestión de talleres automotrices. Contribuí a Radar, plataforma AI usando AWS Bedrock para análisis de documentos aduaneros — generación automática de PDFs marcados para comparación de importaciones.',
      ],
      tags: ['AWS Bedrock', 'React', 'Node.js', 'AI'],
    },
    {
      name: 'BYONDIT — Tigo Money / Millicom',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Jan 2023',
      endDate: 'Dec 2023',
      description: [
        'Desarrollé Tigo Money, wallet digital usada por millones en Centroamérica. Implementé login, onboarding, recargas móviles y remesas. Mantuve Flutter frontend y desarrollé APIs Python para consultas de remesas y verificación biométrica con FaceTec.',
      ],
      tags: ['Flutter', 'Dart', 'Python', 'FastAPI', 'FaceTec'],
    },
    {
      name: 'HyperNova Labs',
      position: 'Backend Developer',
      location: 'Remote',
      startDate: 'Jul 2021',
      endDate: 'Dec 2022',
      description: [
        'Lideré integraciones con NAF, Ivend y Salesforce via Azure Functions. Optimicé carga de datos con Node.js y Redis. Desarrollé sistema de tracking para comunicación entre sistemas externos bajo SCRUM.',
      ],
      tags: ['C# .NET', 'Azure Functions', 'Redis', 'Node.js', 'Salesforce'],
    },
    {
      name: 'Qor Development, LLC',
      position: 'Backend Developer',
      location: 'North Las Vegas, USA',
      startDate: 'Feb 2020',
      endDate: 'Jul 2021',
      description: [
        'Desarrollé backend de TypeMatch (app de citas) con Node.js, Express y MySQL. Mejoré la lógica de matching e integré AgileCRM. Trabajé en Kidlind, app educativa, con gestión de recursos de libros y APIs REST.',
      ],
      tags: ['Node.js', 'Express', 'MySQL', 'Socket.IO'],
    },
  ],

  education: [
    {
      name: 'UNAN',
      location: 'Managua, Nicaragua',
      startDate: '2017',
      endDate: '2021',
      description: ['Ingeniería en Sistemas de la Información'],
    },
  ],

  socialMedia: {
    github: 'https://github.com/RiveraHan',
    email: 'mailto:hanzellrivera95@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hanzell-rivera',
  },

  projects: [
    {
      title: 'Acaluva',
      isFeatured: true,
      description: 'Plataforma SaaS de gestión académica con IA para educadores independientes en LATAM. Facturación recurrente, RBAC multi-rol, módulo académico jerárquico y asistente IA con LLMs open-source.',
      tags: ['Flutter', 'Node.js', 'PostgreSQL', 'AI / LLMs', 'RBAC', 'SaaS'],
      liveUrl: 'https://acaluva.overinn.com',
    },
    {
      title: 'TikTok Clone',
      thumbnail: '/assets/images/tiktokClone.png',
      description: 'Clone funcional de TikTok en Flutter — feed de videos con scroll infinito, navegación por tabs y UI mobile nativa.',
      tags: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/RiveraHan/tiktokClone',
    },
    {
      title: 'E-Commerce',
      thumbnail: '/assets/images/e-commerce.png',
      description: 'Tienda online con carrito de compras, filtros por categoría y checkout implementada con Next.js y TypeScript.',
      tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
      githubUrl: 'https://github.com/RiveraHan/carrito-nextjs-typescript-tailwind',
      liveUrl: 'https://e-commercehan.netlify.app/',
    },
    {
      title: 'CryptoView',
      thumbnailGradient: 'linear-gradient(135deg, #1f0d2e, #0d1f3d)',
      description: 'Dashboard de precios de criptomonedas en tiempo real con historial de precios y visualización de datos de mercado.',
      tags: ['React', 'JavaScript', 'API REST'],
      githubUrl: 'https://github.com/RiveraHan/cryptoView',
    },
    {
      title: 'Todo Full Stack',
      thumbnailGradient: 'linear-gradient(135deg, #0d2818, #0d1f3d)',
      description: 'App full stack con frontend Angular, API REST en Node.js/TypeScript y autenticación JWT.',
      tags: ['Angular', 'TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/RiveraHan/todo-list-angular',
    },
    {
      title: 'React Hexagonal',
      thumbnailGradient: 'linear-gradient(135deg, #0d1f3d, #1f0d2e)',
      description: 'Implementación de arquitectura hexagonal en React — separación estricta de capas, puertos y adaptadores.',
      tags: ['React', 'TypeScript', 'Arquitectura'],
      githubUrl: 'https://github.com/RiveraHan/react-hexagonal-example',
    },
    {
      title: 'Pokedex',
      thumbnail: '/assets/images/pokedex.png',
      description: 'Pokédex con búsqueda en tiempo real, ficha detallada por Pokémon y datos de la PokéAPI.',
      tags: ['TypeScript', 'React', 'API REST'],
      githubUrl: 'https://github.com/RiveraHan/pokedex',
    },
    {
      title: 'Buscador de Recetas',
      thumbnail: '/assets/images/bebidas.png',
      description: 'Buscador de recetas de bebidas por ingrediente consumiendo la API de TheCocktailDB.',
      tags: ['React', 'Hooks', 'API REST'],
      githubUrl: 'https://github.com/RiveraHan/react-bebidas',
      liveUrl: 'https://drinkrecipefinder.netlify.app/',
    },
  ],
}
```

- [ ] **Step 3: Create src/data/i18n.ts**

```ts
// src/data/i18n.ts
export const i18n = {
  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Skills',
      experience: 'Experiencia',
      projects: 'Proyectos',
      education: 'Educación',
      contact: 'Contacto',
      downloadCv: '⬇ Descargar CV',
    },
    hero: {
      status: 'Open to work · Remote',
      eyebrow: '// Hola, soy',
      title: 'Flutter Dev · Mobile & Full Stack ·',
      founder: 'Founder @Acaluva',
      bio: 'Ingeniero en Sistemas con <strong>6+ años</strong> construyendo apps móviles de producción usadas por millones de usuarios. Apasionado por el código limpio, la arquitectura escalable y crear productos que impactan vidas reales.',
      ctaPrimary: 'Ver Proyectos',
      ctaSecondary: 'Contáctame',
      location: '🇳🇮 Managua, Nicaragua · Remote',
    },
    about: {
      eyebrow: '// 01 · About me',
      title: 'Un poco sobre mí',
      p1: 'Soy <strong>Hanzell Rivera</strong>, Ingeniero en Sistemas graduado de la UNAN con <strong>6+ años</strong> de experiencia profesional en desarrollo móvil y full stack. Actualmente trabajo como <strong>Flutter Developer en BYONDIT</strong> construyendo CrediClub, una app fintech para un banco mexicano.',
      p2: 'Paralelamente, soy el <strong>Founder y desarrollador de Acaluva</strong> — una plataforma SaaS de gestión académica con IA para educadores independientes en LATAM, actualmente en beta con clientes reales.',
      p3: 'Mi stack principal gira alrededor de <strong>Flutter/Dart</strong> para mobile y <strong>Node.js + Python + C# .NET</strong> para backend. He trabajado en apps con millones de usuarios como <strong>Tigo Money (Millicom)</strong>, y con tecnologías de IA como AWS Bedrock y LLMs open-source.',
      stat1Val: '6+', stat1Label: 'Años de experiencia',
      stat2Val: '7',  stat2Label: 'Empresas / proyectos',
      stat3Val: 'M+', stat3Label: 'Usuarios en producción (Tigo Money)',
      stat4Val: '1',  stat4Label: 'Startup fundada',
      v1Title: 'Clean Code & Arquitectura',
      v1Desc: 'Creo en escribir código que otros puedan leer, mantener y escalar. Patterns como BLoC, RiverPod y Clean Architecture son parte de mi flujo diario.',
      v2Title: 'Mobile-First',
      v2Desc: 'Flutter es mi herramienta principal. He entregado apps para fintech, educación y retail que corren en iOS y Android desde una sola codebase.',
      v3Title: 'AI Enthusiast',
      v3Desc: 'Integro modelos de IA en productos reales — desde AWS Bedrock para análisis de documentos hasta LLMs open-source como asistentes conversacionales en Acaluva.',
      v4Title: 'Builder Mindset',
      v4Desc: 'No solo construyo features, construyo productos. Fundar Acaluva me dio perspectiva de producto, UX y negocio que llevo a cada proyecto.',
    },
    skills: {
      eyebrow: '// 02 · Stack',
      title: 'Tecnologías que uso',
      subtitle: 'Stack completo — de mobile a backend, cloud e inteligencia artificial.',
      mobile: '📱 Mobile Development',
      backend: '⚙️ Backend',
      frontend: '🌐 Frontend',
      cloud: '☁️ Cloud & Bases de datos',
    },
    experience: {
      eyebrow: '// 03 · Experience',
      title: 'Experiencia Laboral',
      subtitle: '6+ años construyendo software en producción para fintechs, retail, educación y startups.',
      present: 'Presente',
    },
    projects: {
      eyebrow: '// 04 · Projects',
      title: 'Proyectos Destacados',
      subtitle: 'Proyectos personales, startups y trabajo open source.',
      featuredBadge: '★ Startup · Founder · En Beta',
      featuredSub: 'Plataforma SaaS de gestión académica con IA para LATAM',
      viewLive: '🌐 Ver Live',
      viewGithub: 'GitHub',
      metric1Val: 'Beta', metric1Label: 'Producción activa',
      metric2Val: 'AI',   metric2Label: 'LLMs open-source',
      metric3Val: '4+',   metric3Label: 'Roles (RBAC)',
      metric4Val: 'SaaS', metric4Label: 'Modelo de negocio',
    },
    education: {
      eyebrow: '// 05 · Education',
      title: 'Educación & Certificaciones',
      degree: 'Ingeniería en Sistemas de la Información',
      university: 'UNAN — Universidad Nacional Autónoma de Nicaragua',
      certs: 'Certificaciones',
    },
    contact: {
      eyebrow: '// 06 · Contact',
      title: 'Hablemos',
      subtitle: '¿Tienes un proyecto o posición que crees que encaja conmigo? Escríbeme — respondo en menos de 24h.',
      headline: '¿Listo para construir algo?',
      body: 'Estoy disponible para roles remotos full-time, contratos de freelance y proyectos de consultoría. Si buscas un desarrollador Flutter/Full Stack con experiencia en fintech y AI, hablemos.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Cuéntame sobre tu proyecto o posición...',
      nameLabel: '// nombre',
      emailLabel: '// email',
      messageLabel: '// mensaje',
      submit: 'Enviar mensaje →',
      success: '¡Mensaje enviado! Te respondo pronto.',
      error: 'Error al enviar. Intenta de nuevo o escríbeme directo.',
      location: 'Managua, Nicaragua · Remote First',
    },
    footer: {
      rights: '© 2026 Hanzell Rivera',
      builtWith: 'Built with Astro 5 + TailwindCSS 4',
    },
  },

  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
      downloadCv: '⬇ Download CV',
    },
    hero: {
      status: 'Open to work · Remote',
      eyebrow: "// Hi, I'm",
      title: 'Flutter Dev · Mobile & Full Stack ·',
      founder: 'Founder @Acaluva',
      bio: 'Systems Engineer with <strong>6+ years</strong> building production mobile apps used by millions. Passionate about clean code, scalable architecture, and creating products that impact real lives.',
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Contact Me',
      location: '🇳🇮 Managua, Nicaragua · Remote',
    },
    about: {
      eyebrow: '// 01 · About me',
      title: 'A bit about me',
      p1: 'I\'m <strong>Hanzell Rivera</strong>, a Systems Engineer from UNAN with <strong>6+ years</strong> of professional experience in mobile and full stack development. Currently working as <strong>Flutter Developer at BYONDIT</strong> building CrediClub, a fintech app for a Mexican bank.',
      p2: 'In parallel, I\'m the <strong>Founder and developer of Acaluva</strong> — an AI-powered academic management SaaS platform for independent educators in LATAM, currently in beta with real customers.',
      p3: 'My main stack revolves around <strong>Flutter/Dart</strong> for mobile and <strong>Node.js + Python + C# .NET</strong> for backend. I\'ve worked on apps with millions of users like <strong>Tigo Money (Millicom)</strong>, and with AI technologies like AWS Bedrock and open-source LLMs.',
      stat1Val: '6+', stat1Label: 'Years of experience',
      stat2Val: '7',  stat2Label: 'Companies / projects',
      stat3Val: 'M+', stat3Label: 'Users in production (Tigo Money)',
      stat4Val: '1',  stat4Label: 'Startup founded',
      v1Title: 'Clean Code & Architecture',
      v1Desc: 'I believe in writing code that others can read, maintain, and scale. Patterns like BLoC, RiverPod, and Clean Architecture are part of my daily workflow.',
      v2Title: 'Mobile-First',
      v2Desc: 'Flutter is my primary tool. I\'ve shipped apps for fintech, education, and retail that run on iOS and Android from a single codebase.',
      v3Title: 'AI Enthusiast',
      v3Desc: 'I integrate AI models into real products — from AWS Bedrock for document analysis to open-source LLMs as conversational assistants in Acaluva.',
      v4Title: 'Builder Mindset',
      v4Desc: "I don't just build features, I build products. Founding Acaluva gave me a product, UX, and business perspective I bring to every project.",
    },
    skills: {
      eyebrow: '// 02 · Stack',
      title: 'Technologies I use',
      subtitle: 'Full stack — from mobile to backend, cloud, and AI.',
      mobile: '📱 Mobile Development',
      backend: '⚙️ Backend',
      frontend: '🌐 Frontend',
      cloud: '☁️ Cloud & Databases',
    },
    experience: {
      eyebrow: '// 03 · Experience',
      title: 'Work Experience',
      subtitle: '6+ years building production software for fintechs, retail, education, and startups.',
      present: 'Present',
    },
    projects: {
      eyebrow: '// 04 · Projects',
      title: 'Featured Projects',
      subtitle: 'Personal projects, startups, and open source work.',
      featuredBadge: '★ Startup · Founder · In Beta',
      featuredSub: 'AI-powered academic management SaaS for LATAM',
      viewLive: '🌐 View Live',
      viewGithub: 'GitHub',
      metric1Val: 'Beta', metric1Label: 'Live in production',
      metric2Val: 'AI',   metric2Label: 'Open-source LLMs',
      metric3Val: '4+',   metric3Label: 'Roles (RBAC)',
      metric4Val: 'SaaS', metric4Label: 'Business model',
    },
    education: {
      eyebrow: '// 05 · Education',
      title: 'Education & Certifications',
      degree: 'Systems Information Engineering',
      university: 'UNAN — National Autonomous University of Nicaragua',
      certs: 'Certifications',
    },
    contact: {
      eyebrow: '// 06 · Contact',
      title: "Let's Talk",
      subtitle: "Have a project or position you think is a good fit? Write me — I respond within 24h.",
      headline: 'Ready to build something?',
      body: "I'm available for full-time remote roles, freelance contracts, and consulting projects. If you're looking for a Flutter/Full Stack developer with fintech and AI experience, let's chat.",
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@email.com',
      messagePlaceholder: 'Tell me about your project or position...',
      nameLabel: '// name',
      emailLabel: '// email',
      messageLabel: '// message',
      submit: 'Send message →',
      success: 'Message sent! I\'ll get back to you soon.',
      error: 'Error sending. Try again or email me directly.',
      location: 'Managua, Nicaragua · Remote First',
    },
    footer: {
      rights: '© 2026 Hanzell Rivera',
      builtWith: 'Built with Astro 5 + TailwindCSS 4',
    },
  },
} as const

export type Lang = 'es' | 'en'
export type I18n = typeof i18n
```

- [ ] **Step 4: Run TypeScript check**

```bash
pnpm astro check
```
Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/data/info.ts src/data/i18n.ts
git commit -m "feat: update types and data layer — 7 experience entries, 9 projects, i18n strings"
```

---

## Task 4: Layout and Bilingual Init Script

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `.env.example`

- [ ] **Step 1: Rewrite Layout.astro**

```astro
---
// src/layouts/Layout.astro
import Footer from '@components/general/Footer.astro'
import Navbar from '@components/general/Navbar.astro'
import '../styles/style.css'
---

<!doctype html>
<html lang="es" data-lang="es">
  <head>
    <!-- i18n: set language before first paint to avoid flash -->
    <script is:inline>
      const lang = localStorage.getItem('lang') || 'es'
      document.documentElement.setAttribute('data-lang', lang)
      document.documentElement.setAttribute('lang', lang)
    </script>
    <slot name="head" />
  </head>
  <body>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create .env.example**

```bash
cat > /home/hanzell/workspace/my-portfolio/.env.example << 'EOF'
# Formspree form ID — get from https://formspree.io after creating a form
# Add this to Vercel dashboard: Project Settings → Environment Variables
PUBLIC_FORMSPREE_ID=
EOF
```

- [ ] **Step 3: Ensure .env is in .gitignore**

```bash
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro .env.example .gitignore
git commit -m "feat: add i18n init script to layout, add .env.example"
```

---

## Task 5: Navbar

**Files:**
- Rewrite: `src/components/general/Navbar.astro`

- [ ] **Step 1: Rewrite Navbar.astro**

```astro
---
// src/components/general/Navbar.astro
import { i18n } from '@data/i18n'
const es = i18n.es.nav
const en = i18n.en.nav
const cvPath = '/assets/cv/Hanzell_Rivera_CV.pdf'
const cvFallback = 'https://www.linkedin.com/in/hanzell-rivera'
---

<header id="navbar" class="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-8 bg-[var(--color-bg)]/90 backdrop-blur-[16px] border-b border-[var(--color-border)]/40 transition-all">
  <!-- Logo -->
  <a href="/" class="font-mono text-lg font-extrabold text-[var(--color-blue)] tracking-tight">HR.</a>

  <!-- Desktop nav -->
  <nav class="hidden md:flex items-center gap-6">
    <a href="#about"      class="nav-link"><span data-lang="es">{es.about}</span><span data-lang="en">{en.about}</span></a>
    <a href="#skills"     class="nav-link"><span data-lang="es">{es.skills}</span><span data-lang="en">{en.skills}</span></a>
    <a href="#experience" class="nav-link"><span data-lang="es">{es.experience}</span><span data-lang="en">{en.experience}</span></a>
    <a href="#projects"   class="nav-link"><span data-lang="es">{es.projects}</span><span data-lang="en">{en.projects}</span></a>
    <a href="#education"  class="nav-link"><span data-lang="es">{es.education}</span><span data-lang="en">{en.education}</span></a>
    <a href="#contact"    class="nav-link"><span data-lang="es">{es.contact}</span><span data-lang="en">{en.contact}</span></a>
  </nav>

  <!-- Right controls -->
  <div class="flex items-center gap-2">
    <button id="lang-toggle" class="hidden md:block bg-[var(--color-bg3)] border border-[var(--color-border2)] text-[var(--color-text2)] px-3 py-1 rounded-full text-xs font-bold tracking-wider cursor-pointer hover:border-[var(--color-blue)] transition-colors">
      ES · EN
    </button>
    <a id="cv-btn"
       href={cvPath}
       download="Hanzell_Rivera_CV.pdf"
       class="hidden md:flex items-center gap-1 bg-[var(--color-blue)] text-[#0d1117] px-3 py-[6px] rounded-[7px] text-xs font-bold">
      <span data-lang="es">{es.downloadCv}</span>
      <span data-lang="en">{en.downloadCv}</span>
    </a>
    <!-- Hamburger -->
    <button id="hamburger" class="md:hidden flex flex-col gap-[5px] p-2" aria-label="Menu">
      <span class="hamburger-line w-5 h-[2px] bg-[var(--color-text2)] block transition-all"></span>
      <span class="hamburger-line w-5 h-[2px] bg-[var(--color-text2)] block transition-all"></span>
      <span class="hamburger-line w-5 h-[2px] bg-[var(--color-text2)] block transition-all"></span>
    </button>
  </div>
</header>

<!-- Mobile overlay -->
<div id="mobile-menu" class="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl hidden flex-col items-center justify-center gap-8">
  <a href="#about"      class="mobile-link"><span data-lang="es">{es.about}</span><span data-lang="en">{en.about}</span></a>
  <a href="#skills"     class="mobile-link"><span data-lang="es">{es.skills}</span><span data-lang="en">{en.skills}</span></a>
  <a href="#experience" class="mobile-link"><span data-lang="es">{es.experience}</span><span data-lang="en">{en.experience}</span></a>
  <a href="#projects"   class="mobile-link"><span data-lang="es">{es.projects}</span><span data-lang="en">{en.projects}</span></a>
  <a href="#education"  class="mobile-link"><span data-lang="es">{es.education}</span><span data-lang="en">{en.education}</span></a>
  <a href="#contact"    class="mobile-link"><span data-lang="es">{es.contact}</span><span data-lang="en">{en.contact}</span></a>
  <div class="flex gap-3 mt-4">
    <button id="lang-toggle-mobile" class="bg-[var(--color-bg3)] border border-[var(--color-border2)] text-[var(--color-text2)] px-4 py-2 rounded-full text-sm font-bold">ES · EN</button>
    <a href={cvPath} download="Hanzell_Rivera_CV.pdf" class="btn-primary text-sm">
      <span data-lang="es">{es.downloadCv}</span>
      <span data-lang="en">{en.downloadCv}</span>
    </a>
  </div>
</div>

<style>
  .nav-link {
    font-size: 0.8125rem;
    color: var(--color-text2);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--color-text); }
  .mobile-link {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text2);
    text-decoration: none;
  }
  .mobile-link:hover { color: var(--color-blue); }
</style>

<script is:inline>
  function toggleLang() {
    const html = document.documentElement
    const current = html.getAttribute('data-lang') || 'es'
    const next = current === 'es' ? 'en' : 'es'
    html.setAttribute('data-lang', next)
    html.setAttribute('lang', next)
    localStorage.setItem('lang', next)
  }

  document.getElementById('lang-toggle')?.addEventListener('click', toggleLang)
  document.getElementById('lang-toggle-mobile')?.addEventListener('click', toggleLang)

  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobile-menu')

  hamburger?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden')
    mobileMenu.classList.toggle('hidden', isOpen)
    mobileMenu.classList.toggle('flex', !isOpen)
  })

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      mobileMenu.classList.remove('flex')
    })
  })

  // Close on outside tap
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add('hidden')
      mobileMenu.classList.remove('flex')
    }
  })

  // CV fallback: if PDF doesn't exist (404), link to LinkedIn instead
  const cvBtn = document.getElementById('cv-btn')
  if (cvBtn) {
    fetch('/assets/cv/Hanzell_Rivera_CV.pdf', { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          cvBtn.setAttribute('href', 'https://www.linkedin.com/in/hanzell-rivera')
          cvBtn.removeAttribute('download')
        }
      })
      .catch(() => {
        cvBtn.setAttribute('href', 'https://www.linkedin.com/in/hanzell-rivera')
        cvBtn.removeAttribute('download')
      })
  }
</script>
```

- [ ] **Step 2: Verify build**

```bash
pnpm build 2>&1 | tail -5
```
Expected: build complete, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/general/Navbar.astro
git commit -m "feat: redesign Navbar — sticky, lang toggle, CV download, mobile hamburger"
```

---

## Task 6: Hero Section

**Files:**
- Rewrite: `src/components/home/Hero.astro`

- [ ] **Step 1: Rewrite Hero.astro**

```astro
---
// src/components/home/Hero.astro
import { Image } from 'astro:assets'
import { info } from '@data/info'
import { i18n } from '@data/i18n'
const es = i18n.es.hero
const en = i18n.en.hero
---

<section id="hero" class="relative min-h-screen flex items-center pt-[60px] overflow-hidden">
  <!-- Background glows -->
  <div class="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style="background: radial-gradient(circle at 70% 30%, rgba(88,166,255,0.06) 0%, transparent 60%)"></div>
  <div class="pointer-events-none absolute bottom-0 left-[-100px] w-[500px] h-[500px] rounded-full" style="background: radial-gradient(circle, rgba(63,185,80,0.04) 0%, transparent 60%)"></div>

  <div class="container w-full py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-center">
    <!-- Text -->
    <div>
      <!-- Status badge -->
      <div class="inline-flex items-center gap-2 bg-[rgba(63,185,80,0.08)] border border-[rgba(63,185,80,0.2)] text-[var(--color-green)] px-3 py-[5px] rounded-full text-xs font-semibold mb-5">
        <span class="w-[7px] h-[7px] rounded-full bg-[var(--color-green)]" style="animation: blink 2s infinite"></span>
        {es.status}
      </div>

      <!-- Eyebrow -->
      <p class="font-mono text-sm text-[var(--color-text3)] mb-2">
        <span data-lang="es">{es.eyebrow}</span>
        <span data-lang="en">{en.eyebrow}</span>
      </p>

      <!-- Name -->
      <h1 class="font-outfit font-black leading-[0.95] tracking-[-3px] mb-2" style="font-size: clamp(3.5rem, 8vw, 5rem)">
        <span class="block text-[var(--color-text)]">{info.name.split(' ')[0]}</span>
        <span class="block gradient-text">{info.name.split(' ')[1]}</span>
      </h1>

      <!-- Title -->
      <p class="text-[var(--color-text2)] text-lg mb-5">
        <span data-lang="es">{es.title}</span>
        <span data-lang="en">{en.title}</span>
        {' '}<span class="text-[var(--color-purple)] font-semibold">
          <span data-lang="es">{es.founder}</span>
          <span data-lang="en">{en.founder}</span>
        </span>
      </p>

      <!-- Bio -->
      <p class="text-[var(--color-text3)] text-[0.9375rem] leading-[1.8] max-w-[500px] mb-7">
        <span data-lang="es" set:html={es.bio} />
        <span data-lang="en" set:html={en.bio} />
      </p>

      <!-- Tech pills -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span class="pill pill-blue">Flutter / Dart</span>
        <span class="pill pill-green">Node.js</span>
        <span class="pill pill-purple">Python</span>
        <span class="pill pill-yellow">C# .NET</span>
        <span class="pill pill-blue">React / Next.js</span>
        <span class="pill pill-green">AWS Bedrock</span>
        <span class="pill pill-blue">PostgreSQL</span>
      </div>

      <!-- CTAs -->
      <div class="flex flex-wrap gap-3 mb-7">
        <a href="#projects" class="btn-primary">
          <span data-lang="es">{es.ctaPrimary}</span>
          <span data-lang="en">{en.ctaPrimary}</span>
        </a>
        <a href="#contact" class="btn-ghost">
          <span data-lang="es">{es.ctaSecondary}</span>
          <span data-lang="en">{en.ctaSecondary}</span>
        </a>
      </div>

      <!-- Social links -->
      <div class="flex gap-2">
        <a href={info.socialMedia.linkedin} target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">in</a>
        <a href={info.socialMedia.github}   target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">gh</a>
        <a href={info.socialMedia.email}    class="social-btn" aria-label="Email">✉</a>
      </div>
    </div>

    <!-- Avatar -->
    <div class="relative flex justify-center">
      <div class="absolute inset-[-10px] rounded-[28px] -z-10" style="background: linear-gradient(135deg, rgba(88,166,255,0.12), rgba(63,185,80,0.08), transparent, rgba(210,168,255,0.08))"></div>
      <div class="w-[220px] h-[260px] md:w-[240px] md:h-[280px] rounded-[20px] overflow-hidden border border-[var(--color-border2)] bg-[var(--color-bg3)]">
        <Image
          src="/assets/images/profile.png"
          alt="Hanzell Rivera"
          width={240}
          height={280}
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div class="absolute bottom-[-14px] left-1/2 -translate-x-1/2 bg-[var(--color-bg2)] border border-[var(--color-border2)] px-4 py-1 rounded-full text-xs text-[var(--color-text2)] whitespace-nowrap">
        <span data-lang="es">{es.location}</span>
        <span data-lang="en">{en.location}</span>
      </div>
    </div>
  </div>
</section>

<style>
  .social-btn {
    width: 38px; height: 38px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: var(--color-text3);
    font-size: 13px; font-weight: 700;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .social-btn:hover { border-color: var(--color-blue); color: var(--color-blue); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Hero.astro
git commit -m "feat: redesign Hero — gradient name, status badge, tech pills, profile photo"
```

---

## Task 7: About Section

**Files:**
- Create: `src/components/home/About.astro`

- [ ] **Step 1: Create About.astro**

```astro
---
// src/components/home/About.astro
import { i18n } from '@data/i18n'
const es = i18n.es.about
const en = i18n.en.about
---

<section id="about" class="py-24">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-10 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <!-- Left: bio + stats -->
      <div>
        <p class="text-[var(--color-text2)] text-[0.9375rem] leading-[1.8] mb-4">
          <span data-lang="es" set:html={es.p1} />
          <span data-lang="en" set:html={en.p1} />
        </p>
        <p class="text-[var(--color-text2)] text-[0.9375rem] leading-[1.8] mb-4">
          <span data-lang="es" set:html={es.p2} />
          <span data-lang="en" set:html={en.p2} />
        </p>
        <p class="text-[var(--color-text2)] text-[0.9375rem] leading-[1.8] mb-8">
          <span data-lang="es" set:html={es.p3} />
          <span data-lang="en" set:html={en.p3} />
        </p>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-3">
          {[
            { esVal: es.stat1Val, enVal: en.stat1Val, esLabel: es.stat1Label, enLabel: en.stat1Label },
            { esVal: es.stat2Val, enVal: en.stat2Val, esLabel: es.stat2Label, enLabel: en.stat2Label },
            { esVal: es.stat3Val, enVal: en.stat3Val, esLabel: es.stat3Label, enLabel: en.stat3Label },
            { esVal: es.stat4Val, enVal: en.stat4Val, esLabel: es.stat4Label, enLabel: en.stat4Label },
          ].map((s) => (
            <div class="card p-4">
              <div class="text-2xl font-black text-[var(--color-blue)]">
                <span data-lang="es">{s.esVal}</span>
                <span data-lang="en">{s.enVal}</span>
              </div>
              <div class="text-xs text-[var(--color-text3)] mt-1">
                <span data-lang="es">{s.esLabel}</span>
                <span data-lang="en">{s.enLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <!-- Right: values -->
      <div class="flex flex-col gap-5">
        {[
          { icon: '⚡', esTitle: es.v1Title, enTitle: en.v1Title, esDesc: es.v1Desc, enDesc: en.v1Desc },
          { icon: '📱', esTitle: es.v2Title, enTitle: en.v2Title, esDesc: es.v2Desc, enDesc: en.v2Desc },
          { icon: '🤖', esTitle: es.v3Title, enTitle: en.v3Title, esDesc: es.v3Desc, enDesc: en.v3Desc },
          { icon: '🚀', esTitle: es.v4Title, enTitle: en.v4Title, esDesc: es.v4Desc, enDesc: en.v4Desc },
        ].map((v) => (
          <div class="flex items-start gap-4">
            <span class="text-xl mt-0.5 flex-shrink-0">{v.icon}</span>
            <div>
              <div class="text-sm font-bold text-[var(--color-text)] mb-1">
                <span data-lang="es">{v.esTitle}</span>
                <span data-lang="en">{v.enTitle}</span>
              </div>
              <div class="text-xs text-[var(--color-text3)] leading-relaxed">
                <span data-lang="es">{v.esDesc}</span>
                <span data-lang="en">{v.enDesc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/About.astro
git commit -m "feat: add About section — bio, stat cards, value items"
```

---

## Task 8: Skills Section

**Files:**
- Create: `src/components/home/Skills.astro`

- [ ] **Step 1: Create Skills.astro**

```astro
---
// src/components/home/Skills.astro
import { i18n } from '@data/i18n'
const es = i18n.es.skills
const en = i18n.en.skills

const skillCategories = [
  {
    esTitle: es.mobile, enTitle: en.mobile,
    dotClass: 'bg-[var(--color-blue)]',
    skills: ['Flutter', 'Dart', 'BLoC', 'RiverPod', 'Freezed', 'Push Notifications', 'React Native', 'FaceTec SDK'],
  },
  {
    esTitle: es.backend, enTitle: en.backend,
    dotClass: 'bg-[var(--color-green)]',
    skills: ['Node.js', 'Python', 'FastAPI', 'Express.js', 'C# .NET Core', 'ASP.NET', 'Redis', 'REST APIs'],
  },
  {
    esTitle: es.frontend, enTitle: en.frontend,
    dotClass: 'bg-[var(--color-purple)]',
    skills: ['React', 'Next.js', 'TypeScript', 'Astro', 'TailwindCSS'],
  },
  {
    esTitle: es.cloud, enTitle: en.cloud,
    dotClass: 'bg-[var(--color-yellow)]',
    skills: ['AWS Bedrock', 'Azure Functions', 'Firebase', 'PostgreSQL', 'MySQL', 'SQL Server'],
  },
]
---

<section id="skills" class="py-24 bg-[var(--color-bg2)]">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-3 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>
    <p class="text-[var(--color-text2)] text-sm mb-10">
      <span data-lang="es">{es.subtitle}</span>
      <span data-lang="en">{en.subtitle}</span>
    </p>

    <div class="flex flex-col gap-8">
      {skillCategories.map((cat) => (
        <div>
          <p class="text-xs text-[var(--color-text3)] uppercase tracking-[0.15em] font-mono mb-4">
            <span data-lang="es">{cat.esTitle}</span>
            <span data-lang="en">{cat.enTitle}</span>
          </p>
          <div class="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <div class="flex items-center gap-2 bg-[var(--color-bg3)] border border-[var(--color-border)] px-3 py-2 rounded-lg text-xs font-semibold text-[var(--color-text2)] hover:border-[var(--color-blue)] hover:text-[var(--color-text)] transition-colors cursor-default">
                <span class={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${cat.dotClass}`}></span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Skills.astro
git commit -m "feat: add Skills section — categorized chip grid"
```

---

## Task 9: Experience Section

**Files:**
- Rewrite: `src/components/home/Experience.astro`

- [ ] **Step 1: Rewrite Experience.astro**

```astro
---
// src/components/home/Experience.astro
import { info } from '@data/info'
import { i18n } from '@data/i18n'
const es = i18n.es.experience
const en = i18n.en.experience
---

<section id="experience" class="py-24">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-3 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>
    <p class="text-[var(--color-text2)] text-sm mb-12">
      <span data-lang="es">{es.subtitle}</span>
      <span data-lang="en">{en.subtitle}</span>
    </p>

    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-[180px] top-0 bottom-0 w-px bg-[var(--color-border)] hidden md:block"></div>

      <div class="flex flex-col gap-10">
        {info.experience.map((job) => {
          const isCurrent = job.endDate === null
          return (
            <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 relative">
              <!-- Date column -->
              <div class="md:text-right md:pr-8 relative">
                <p class="text-xs text-[var(--color-text3)] font-mono">{job.startDate} →</p>
                <p class="text-xs font-mono" class:list={[isCurrent ? 'text-[var(--color-green)]' : 'text-[var(--color-text3)]']}>
                  {isCurrent
                    ? <><span data-lang="es">{es.present}</span><span data-lang="en">{en.present}</span></>
                    : job.endDate
                  }
                </p>
                <p class="text-[10px] text-[var(--color-text3)] mt-1">{job.location}</p>
                <!-- Timeline dot -->
                <div
                  class:list={[
                    'hidden md:block absolute right-[-5px] top-[5px] w-[10px] h-[10px] rounded-full border-2',
                    isCurrent
                      ? 'bg-[var(--color-green)] border-[var(--color-green)]'
                      : 'bg-[var(--color-bg4)] border-[var(--color-border2)]'
                  ]}
                  style={isCurrent ? 'box-shadow: 0 0 8px var(--color-green)' : ''}
                ></div>
              </div>

              <!-- Content column -->
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="text-base font-bold text-[var(--color-text)]">{job.name}</h3>
                  {isCurrent && (
                    <span class="text-[10px] text-[var(--color-green)] font-semibold">● Activo</span>
                  )}
                  {job.name.includes('Overinn') && (
                    <span class="text-[10px] text-[var(--color-purple)] font-semibold">★ Founder</span>
                  )}
                </div>
                <p class="text-xs text-[var(--color-blue)] font-semibold mb-3">{job.position}</p>
                <p class="text-xs text-[var(--color-text3)] leading-relaxed mb-3">{job.description[0]}</p>
                {job.tags && job.tags.length > 0 && (
                  <div class="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span class="bg-[var(--color-bg4)] text-[var(--color-text3)] px-2 py-0.5 rounded text-[10px] font-mono">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Experience.astro
git commit -m "feat: redesign Experience — two-col timeline, 7 entries, current job glow"
```

---

## Task 10: Projects Section

**Files:**
- Rewrite: `src/components/home/Projects.astro`
- Rewrite: `src/components/general/ProjectCard.astro`

- [ ] **Step 1: Rewrite ProjectCard.astro**

```astro
---
// src/components/general/ProjectCard.astro
import type { IProject } from '@types'
interface Props { project: IProject }
const { project } = Astro.props
const { title, thumbnail, thumbnailGradient, description, tags, githubUrl, liveUrl } = project
---

<article class="card overflow-hidden hover:border-[var(--color-blue)]/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
  <!-- Thumbnail -->
  <div class="h-[130px] flex items-center justify-center overflow-hidden"
       style={thumbnailGradient ? `background: ${thumbnailGradient}` : ''}>
    {thumbnail
      ? <img src={thumbnail} alt={title} class="w-full h-full object-cover" loading="lazy" />
      : <span class="text-4xl opacity-30">{'</>'}</span>
    }
  </div>

  <!-- Body -->
  <div class="p-4 flex flex-col flex-1">
    <h3 class="text-sm font-bold text-[var(--color-text)] mb-2">{title}</h3>
    <p class="text-[10.5px] text-[var(--color-text3)] leading-relaxed mb-3 flex-1">{description}</p>

    <div class="flex flex-wrap gap-1 mb-3">
      {tags.map((tag) => (
        <span class="bg-[var(--color-bg4)] text-[var(--color-text3)] px-1.5 py-0.5 rounded text-[9px] font-mono">{tag}</span>
      ))}
    </div>

    <div class="flex gap-3 pt-3 border-t border-[var(--color-border)]">
      {liveUrl && <a href={liveUrl} target="_blank" rel="noopener" class="text-[10px] text-[var(--color-blue)] font-mono hover:underline">↗ Live</a>}
      {githubUrl && <a href={githubUrl} target="_blank" rel="noopener" class="text-[10px] text-[var(--color-text3)] font-mono hover:text-[var(--color-text)]">gh GitHub</a>}
    </div>
  </div>
</article>
```

- [ ] **Step 2: Rewrite Projects.astro**

```astro
---
// src/components/home/Projects.astro
import { info } from '@data/info'
import { i18n } from '@data/i18n'
import ProjectCard from '@components/general/ProjectCard.astro'

const es = i18n.es.projects
const en = i18n.en.projects
const acaluva = info.projects.find(p => p.title === 'Acaluva')!
const rest = info.projects.filter(p => p.title !== 'Acaluva')
---

<section id="projects" class="py-24 bg-[var(--color-bg2)]">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-3 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>
    <p class="text-[var(--color-text2)] text-sm mb-10">
      <span data-lang="es">{es.subtitle}</span>
      <span data-lang="en">{en.subtitle}</span>
    </p>

    <!-- Acaluva Featured -->
    <div class="rounded-2xl p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
         style="background: linear-gradient(135deg, rgba(88,166,255,0.04), rgba(63,185,80,0.03)); border: 1px solid rgba(88,166,255,0.15)">
      <div>
        <div class="inline-flex items-center gap-2 bg-[rgba(210,168,255,0.1)] border border-[rgba(210,168,255,0.2)] text-[var(--color-purple)] px-3 py-1 rounded-full text-[10px] font-semibold mb-4">
          <span data-lang="es">{es.featuredBadge}</span>
          <span data-lang="en">{en.featuredBadge}</span>
        </div>
        <h3 class="text-4xl font-black text-[var(--color-text)] tracking-tight mb-2">Acaluva</h3>
        <p class="text-sm text-[var(--color-blue)] font-semibold mb-4">
          <span data-lang="es">{es.featuredSub}</span>
          <span data-lang="en">{en.featuredSub}</span>
        </p>
        <p class="text-xs text-[var(--color-text3)] leading-relaxed mb-5">{acaluva.description}</p>
        <div class="flex flex-wrap gap-2 mb-6">
          {acaluva.tags.map(tag => <span class="pill pill-blue">{tag}</span>)}
        </div>
        <div class="flex gap-3">
          <a href={acaluva.liveUrl} target="_blank" rel="noopener" class="btn-primary text-sm">
            <span data-lang="es">{es.viewLive}</span>
            <span data-lang="en">{en.viewLive}</span>
          </a>
        </div>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-2 gap-3">
        {[
          { esVal: es.metric1Val, enVal: en.metric1Val, esLabel: es.metric1Label, enLabel: en.metric1Label },
          { esVal: es.metric2Val, enVal: en.metric2Val, esLabel: es.metric2Label, enLabel: en.metric2Label },
          { esVal: es.metric3Val, enVal: en.metric3Val, esLabel: es.metric3Label, enLabel: en.metric3Label },
          { esVal: es.metric4Val, enVal: en.metric4Val, esLabel: es.metric4Label, enLabel: en.metric4Label },
        ].map(m => (
          <div class="bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] rounded-xl p-4 text-center">
            <div class="text-xl font-black text-[var(--color-blue)]">
              <span data-lang="es">{m.esVal}</span>
              <span data-lang="en">{m.enVal}</span>
            </div>
            <div class="text-[10px] text-[var(--color-text3)] mt-1">
              <span data-lang="es">{m.esLabel}</span>
              <span data-lang="en">{m.enLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <!-- Project grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rest.map(project => <ProjectCard project={project} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Projects.astro src/components/general/ProjectCard.astro
git commit -m "feat: redesign Projects — Acaluva featured card + responsive project grid"
```

---

## Task 11: Education Section

**Files:**
- Rewrite: `src/components/home/Education.astro`

- [ ] **Step 1: Rewrite Education.astro**

```astro
---
// src/components/home/Education.astro
import { info } from '@data/info'
import { i18n } from '@data/i18n'
const es = i18n.es.education
const en = i18n.en.education

const certifications = [
  { icon: '📱', name: 'React Native CLI' },
  { icon: '🌐', name: 'Frontend Developer' },
  { icon: '🟩', name: 'Node.js: De cero a experto' },
  { icon: '🐍', name: 'Python Básico' },
]
---

<section id="education" class="py-24">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-10 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Degree -->
      <div class="card p-6" style="border-color: rgba(88,166,255,0.2)">
        <div class="text-2xl mb-4">🎓</div>
        <h3 class="text-base font-bold text-[var(--color-text)] mb-1">
          <span data-lang="es">{es.degree}</span>
          <span data-lang="en">{en.degree}</span>
        </h3>
        <p class="text-sm text-[var(--color-blue)] mb-2">
          <span data-lang="es">{es.university}</span>
          <span data-lang="en">{en.university}</span>
        </p>
        <p class="text-xs text-[var(--color-text3)] font-mono">{info.education[0].startDate} → {info.education[0].endDate} · {info.education[0].location}</p>
      </div>

      <!-- Certs -->
      <div>
        <p class="text-xs text-[var(--color-text3)] uppercase tracking-[0.15em] font-mono mb-4">
          <span data-lang="es">{es.certs}</span>
          <span data-lang="en">{en.certs}</span>
        </p>
        <div class="grid grid-cols-2 gap-3">
          {certifications.map(cert => (
            <div class="card p-3 text-center">
              <div class="text-xl mb-2">{cert.icon}</div>
              <p class="text-[11px] text-[var(--color-text2)] font-semibold leading-snug">{cert.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Education.astro
git commit -m "feat: redesign Education — UNAN card + certification chips"
```

---

## Task 12: Contact Section

**Files:**
- Create: `src/components/home/Contact.astro`
- Delete: `src/components/general/Contact.astro`

- [ ] **Step 1: Delete old Contact.astro**

```bash
git rm src/components/general/Contact.astro
```

- [ ] **Step 2: Create src/components/home/Contact.astro**

```astro
---
// src/components/home/Contact.astro
import { info } from '@data/info'
import { i18n } from '@data/i18n'
const es = i18n.es.contact
const en = i18n.en.contact
const formspreeId = import.meta.env.PUBLIC_FORMSPREE_ID ?? ''
---

<section id="contact" class="py-24 bg-[var(--color-bg2)]">
  <div class="container">
    <p class="section-eyebrow"><span data-lang="es">{es.eyebrow}</span><span data-lang="en">{en.eyebrow}</span></p>
    <h2 class="text-3xl font-black text-[var(--color-text)] mb-3 tracking-tight">
      <span data-lang="es">{es.title}</span>
      <span data-lang="en">{en.title}</span>
    </h2>
    <p class="text-[var(--color-text2)] text-sm mb-10 max-w-[500px]">
      <span data-lang="es">{es.subtitle}</span>
      <span data-lang="en">{en.subtitle}</span>
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">
      <!-- Left: info -->
      <div>
        <h3 class="text-xl font-bold text-[var(--color-text)] mb-3">
          <span data-lang="es">{es.headline}</span>
          <span data-lang="en">{en.headline}</span>
        </h3>
        <p class="text-sm text-[var(--color-text3)] leading-relaxed mb-7">
          <span data-lang="es">{es.body}</span>
          <span data-lang="en">{en.body}</span>
        </p>

        <div class="flex flex-col gap-3">
          {[
            { icon: '✉️', label: 'Email', value: 'hanzellrivera95@gmail.com', href: info.socialMedia.email },
            { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/hanzell-rivera', href: info.socialMedia.linkedin },
            { icon: '🐙', label: 'GitHub', value: 'github.com/RiveraHan', href: info.socialMedia.github },
            { icon: '🇳🇮', label: 'Ubicación', value: es.location, href: undefined },
          ].map(item => (
            <div class="flex items-center gap-3 card p-3 px-4">
              <span class="text-base">{item.icon}</span>
              <div>
                <p class="text-[10px] text-[var(--color-text3)]">{item.label}</p>
                {item.href
                  ? <a href={item.href} target="_blank" rel="noopener" class="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-blue)] transition-colors">{item.value}</a>
                  : <p class="text-sm font-semibold text-[var(--color-text)]">{item.value}</p>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <!-- Right: form -->
      <form id="contact-form" class="flex flex-col gap-4" data-formspree-id={formspreeId}>
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono text-[var(--color-text2)] tracking-wider">
            <span data-lang="es">{es.nameLabel}</span>
            <span data-lang="en">{en.nameLabel}</span>
          </label>
          <input name="name" type="text" required
            class="bg-[var(--color-bg3)] border border-[var(--color-border2)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-blue)] transition-colors"
            placeholder-es={es.namePlaceholder}
            placeholder-en={en.namePlaceholder}
            placeholder={es.namePlaceholder}
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono text-[var(--color-text2)] tracking-wider">
            <span data-lang="es">{es.emailLabel}</span>
            <span data-lang="en">{en.emailLabel}</span>
          </label>
          <input name="email" type="email" required
            class="bg-[var(--color-bg3)] border border-[var(--color-border2)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-blue)] transition-colors"
            placeholder-es={es.emailPlaceholder}
            placeholder-en={en.emailPlaceholder}
            placeholder={es.emailPlaceholder}
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono text-[var(--color-text2)] tracking-wider">
            <span data-lang="es">{es.messageLabel}</span>
            <span data-lang="en">{en.messageLabel}</span>
          </label>
          <textarea name="message" rows="5" required
            class="bg-[var(--color-bg3)] border border-[var(--color-border2)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-blue)] transition-colors resize-y"
            placeholder-es={es.messagePlaceholder}
            placeholder-en={en.messagePlaceholder}
            placeholder={es.messagePlaceholder}
          ></textarea>
        </div>

        <button type="submit"
          id="submit-btn"
          disabled={!formspreeId}
          class="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          title={!formspreeId ? 'Form not configured' : ''}>
          <span data-lang="es">{es.submit}</span>
          <span data-lang="en">{en.submit}</span>
        </button>

        <p id="form-feedback" class="text-xs text-center hidden"></p>
      </form>
    </div>
  </div>
</section>

<script is:inline>
  // Update input placeholders when lang changes
  function updatePlaceholders() {
    const lang = document.documentElement.getAttribute('data-lang') || 'es'
    document.querySelectorAll('[placeholder-es]').forEach(el => {
      el.placeholder = el.getAttribute(`placeholder-${lang}`) || ''
    })
  }
  updatePlaceholders()

  // Watch for lang changes
  new MutationObserver(updatePlaceholders).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['data-lang'] }
  )

  // Form submission
  const form = document.getElementById('contact-form')
  const feedback = document.getElementById('form-feedback')
  const submitBtn = document.getElementById('submit-btn')

  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const id = form.dataset.formspreeId
    if (!id) return

    submitBtn.disabled = true
    submitBtn.textContent = '...'

    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      const lang = document.documentElement.getAttribute('data-lang') || 'es'
      if (res.ok) {
        feedback.textContent = lang === 'es' ? '¡Mensaje enviado! Te respondo pronto.' : "Message sent! I'll get back to you soon."
        feedback.className = 'text-xs text-center text-[var(--color-green)]'
        form.reset()
      } else {
        throw new Error()
      }
    } catch {
      const lang = document.documentElement.getAttribute('data-lang') || 'es'
      feedback.textContent = lang === 'es'
        ? 'Error al enviar. Intenta de nuevo o escríbeme directo.'
        : 'Error sending. Try again or email me directly.'
      feedback.className = 'text-xs text-center text-[var(--color-red,#f85149)]'
      submitBtn.disabled = false
      submitBtn.textContent = lang === 'es' ? 'Enviar mensaje →' : 'Send message →'
    }
    feedback.classList.remove('hidden')
  })
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Contact.astro
git commit -m "feat: add Contact section — Formspree form, contact links, bilingual placeholders"
```

---

## Task 13: Footer and Page Assembly

**Files:**
- Rewrite: `src/components/general/Footer.astro`
- Rewrite: `src/pages/index.astro`
- Modify: `src/components/general/MetaHead.astro`

- [ ] **Step 1: Rewrite Footer.astro**

```astro
---
// src/components/general/Footer.astro
import { i18n } from '@data/i18n'
const es = i18n.es.footer
const en = i18n.en.footer
---
<footer class="border-t border-[var(--color-border)] py-6 px-8">
  <div class="container flex flex-col sm:flex-row items-center justify-between gap-2">
    <p class="text-xs text-[var(--color-text3)] font-mono">
      <span data-lang="es">{es.rights}</span>
      <span data-lang="en">{en.rights}</span>
    </p>
    <p class="text-xs text-[var(--color-text3)] font-mono">
      <span data-lang="es">{es.builtWith}</span>
      <span data-lang="en">{en.builtWith}</span>
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Rewrite index.astro**

```astro
---
// src/pages/index.astro
import { info } from '@data/info'
import Layout from '@layouts/Layout.astro'
import MetaHead from '@components/general/MetaHead.astro'
import Hero from '@components/home/Hero.astro'
import About from '@components/home/About.astro'
import Skills from '@components/home/Skills.astro'
import Experience from '@components/home/Experience.astro'
import Projects from '@components/home/Projects.astro'
import Education from '@components/home/Education.astro'
import Contact from '@components/home/Contact.astro'
---

<Layout>
  <MetaHead
    slot="head"
    title="Hanzell Rivera — Flutter Dev · Full Stack · Founder"
    description={info.about}
    ogImageUrl="/assets/images/profile.png"
  />
  <Hero />
  <div class="section-divider"></div>
  <About />
  <div class="section-divider"></div>
  <Skills />
  <div class="section-divider"></div>
  <Experience />
  <div class="section-divider"></div>
  <Projects />
  <div class="section-divider"></div>
  <Education />
  <div class="section-divider"></div>
  <Contact />
</Layout>
```

- [ ] **Step 3: Update MetaHead.astro — fix description, theme color, keywords**

The component structure stays the same (it already uses props correctly). Only update the hardcoded stale values:

```astro
---
// src/components/general/MetaHead.astro
import { info } from '@data/info'

interface Props {
  title: string
  description: string
  ogImageUrl?: string
}
const { title, description, ogImageUrl } = Astro.props
---

<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#080c12" />
<meta name="author" content="Hanzell Rivera" />
<meta name="keywords" content="Hanzell Rivera, Flutter Developer, Full Stack Developer, Mobile Engineer, Nicaragua, portfolio" />
<meta name="generator" content={Astro.generator} />

<!-- Primary -->
<title>{title}</title>
<link rel="canonical" href={`${info.baseUrl}${Astro.url.pathname}`} />
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={`${info.baseUrl}${Astro.url.pathname}`} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{ogImageUrl && <meta property="og:image" content={`${info.baseUrl}${ogImageUrl}`} />}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={`${info.baseUrl}${Astro.url.pathname}`} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
{ogImageUrl && <meta property="twitter:image" content={`${info.baseUrl}${ogImageUrl}`} />}

<!-- Font preloads -->
<link rel="preload" href="/assets/fonts/Inter/Inter-Light.ttf" as="font" crossorigin />
<link rel="preload" href="/assets/fonts/Outfit/Outfit-SemiBold.ttf" as="font" crossorigin />
```

- [ ] **Step 4: Build and verify full site**

```bash
pnpm build 2>&1 | tail -10
```
Expected: build completes, no errors, `dist/` folder created.

- [ ] **Step 5: Preview locally**

```bash
pnpm preview
```
Open http://localhost:4321 and verify: all 7 sections visible, scroll works, no layout breaks.

- [ ] **Step 6: Commit**

```bash
git add src/components/general/Footer.astro src/pages/index.astro src/components/general/MetaHead.astro
git commit -m "feat: assemble full page — Footer, index.astro with all sections, updated MetaHead"
```

---

## Task 14: Final Polish and Cleanup

**Files:**
- Delete: `src/utils/index.ts` (createLogo utility no longer needed)
- Verify: `.gitignore` has `.env` and `.superpowers/`

- [ ] **Step 1: Remove unused utils**

Check if `src/utils/index.ts` is still referenced anywhere:
```bash
grep -r "from '@utils'" src/
```
If no references, delete it:
```bash
git rm src/utils/index.ts
```

- [ ] **Step 2: Remove old general/Contact.astro if not already removed**

```bash
ls src/components/general/Contact.astro 2>/dev/null && git rm src/components/general/Contact.astro || echo "already removed"
```

- [ ] **Step 3: Add .superpowers to .gitignore**

```bash
grep -q "\.superpowers" .gitignore || echo ".superpowers/" >> .gitignore
git add .gitignore
```

- [ ] **Step 4: Final build check**

```bash
pnpm build 2>&1 | grep -E "error|warn|complete"
```
Expected: `build complete`, no errors.

- [ ] **Step 5: Verify key HTML output**

```bash
grep -o 'Hanzell Rivera\|CrediClub\|Acaluva\|Tigo Money\|data-lang' dist/index.html | sort | uniq -c
```
Expected: all names present, `data-lang` appears (bilingual markup rendered).

- [ ] **Step 6: TypeScript check**

```bash
pnpm astro check
```
Expected: 0 errors.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup — remove unused files, update .gitignore"
```

---

## Pre-Deploy Checklist

Before pushing to Vercel:

- [ ] Add `public/assets/cv/Hanzell_Rivera_CV.pdf` (your CV file)
- [ ] Create Formspree account, get form ID, add to `.env` as `PUBLIC_FORMSPREE_ID=<id>`
- [ ] Add `PUBLIC_FORMSPREE_ID` to Vercel dashboard → Project Settings → Environment Variables
- [ ] Push to main: `git push origin main`
- [ ] Verify Vercel auto-deploys and site loads at hanzellrivera.vercel.app
