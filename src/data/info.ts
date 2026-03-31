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
