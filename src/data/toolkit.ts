import type { LText } from '../i18n';

/**
 * The toolkit is a matrix, not a logo wall: every technology is claimed only against
 * the systems where it was actually used. `other` covers the three short projects in section 07.
 * Technology names are proper nouns, so only the notes and group headings translate.
 */

export const columns = [
  { id: 'arenas-verdes', short: 'AV', name: { en: 'Arenas Verdes', es: 'Arenas Verdes' } },
  { id: 'fixture-2026', short: 'FX', name: { en: 'Fixture 2026', es: 'Fixture 2026' } },
  { id: 'urban-mobility', short: 'SS', name: { en: 'Scooter Sharing', es: 'Monopatines' } },
  { id: 'rift-legacy', short: 'RL', name: { en: 'Rift Legacy', es: 'Rift Legacy' } },
  { id: 'other', short: '+', name: { en: 'The three above', es: 'Los tres de arriba' } },
] as const;

export type ColumnId = (typeof columns)[number]['id'];

export interface Capability {
  name: string;
  used: ColumnId[];
  note: LText;
}

export interface CapabilityGroup {
  group: LText;
  items: Capability[];
}

export const toolkit: CapabilityGroup[] = [
  {
    group: { en: 'Systems & architecture', es: 'Sistemas y arquitectura' },
    items: [
      {
        name: 'MVC',
        used: ['arenas-verdes', 'fixture-2026', 'other'],
        note: {
          en: 'Written by hand in PHP before I used a framework that brings it',
          es: 'Escrito a mano en PHP antes de usar un framework que ya lo trae',
        },
      },
      {
        name: 'Microservices',
        used: ['urban-mobility'],
        note: {
          en: 'Cut by which tables each service uses',
          es: 'Cortados por qué tablas usa cada servicio',
        },
      },
      {
        name: 'REST APIs',
        used: ['fixture-2026', 'urban-mobility', 'other'],
        note: {
          en: 'Consumed and designed, including third-party integrations',
          es: 'Consumidas y diseñadas, incluyendo integraciones con terceros',
        },
      },
      {
        name: 'OpenAPI / Swagger',
        used: ['urban-mobility'],
        note: {
          en: 'The API published as a contract, with its schemas and errors',
          es: 'API publicada como contrato, con esquemas y respuestas de error',
        },
      },
      {
        name: 'Auth, roles & permissions',
        used: ['arenas-verdes', 'fixture-2026', 'urban-mobility'],
        note: {
          en: 'Sessions, OAuth sign-in, JWT across services',
          es: 'Sesiones, inicio de sesión con OAuth, JWT entre servicios',
        },
      },
      {
        name: 'Audit & event trails',
        used: ['fixture-2026'],
        note: {
          en: 'A record of what happened, for logins, profiles, results and payments',
          es: 'Un registro de lo que pasó, para logins, perfiles, resultados y pagos',
        },
      },
      {
        name: 'Scheduled jobs',
        used: ['arenas-verdes'],
        note: {
          en: 'node-cron for time-based notifications',
          es: 'node-cron para notificaciones basadas en tiempo',
        },
      },
    ],
  },
  {
    group: { en: 'Backend', es: 'Backend' },
    items: [
      {
        name: 'PHP',
        used: ['arenas-verdes', 'fixture-2026', 'other'],
        note: {
          en: 'From bare MVC to Laravel 12 on PHP 8.2',
          es: 'Desde MVC puro hasta Laravel 12 sobre PHP 8.2',
        },
      },
      {
        name: 'Laravel',
        used: ['fixture-2026', 'other'],
        note: {
          en: 'Services, migrations, Breeze, Socialite, Blade',
          es: 'Servicios, migraciones, Breeze, Socialite, Blade',
        },
      },
      {
        name: 'Python / Django',
        used: ['other'],
        note: {
          en: 'The management system, 10 to 15 modules',
          es: 'El sistema de gestión, de 10 a 15 módulos',
        },
      },
      {
        name: 'Java / Spring Boot',
        used: ['urban-mobility'],
        note: {
          en: 'Microservices and REST services with Spring Data JPA',
          es: 'Microservicios y servicios REST con Spring Data JPA',
        },
      },
      {
        name: 'Node.js',
        used: ['arenas-verdes', 'rift-legacy'],
        note: {
          en: 'Scheduled tasks, data pipelines and verification scripts',
          es: 'Tareas programadas, pipelines de datos y scripts de verificación',
        },
      },
      {
        name: 'TypeScript',
        used: ['rift-legacy'],
        note: {
          en: 'Typed domain model shared by engine and interface',
          es: 'Modelo de dominio tipado compartido por el motor y la interfaz',
        },
      },
    ],
  },
  {
    group: { en: 'Data', es: 'Datos' },
    items: [
      {
        name: 'MySQL / MariaDB',
        used: ['arenas-verdes', 'fixture-2026', 'urban-mobility', 'other'],
        note: {
          en: 'The relational database behind most of this',
          es: 'La base relacional detrás de casi todo esto',
        },
      },
      {
        name: 'PostgreSQL',
        used: ['other'],
        note: {
          en: 'The clinical records system',
          es: 'El sistema de historias clínicas',
        },
      },
      {
        name: 'MongoDB',
        used: ['urban-mobility'],
        note: {
          en: 'Trip routes: documents that grow and change shape',
          es: 'Recorridos: documentos que crecen y cambian de forma',
        },
      },
      {
        name: 'Schema design & migrations',
        used: ['arenas-verdes', 'fixture-2026', 'other'],
        note: {
          en: '34 migrations on Fixture 2026 alone',
          es: '34 migraciones solo en Fixture 2026',
        },
      },
      {
        name: 'JPQL & query optimisation',
        used: ['urban-mobility'],
        note: {
          en: 'Reports resolved in the database instead of looping in code',
          es: 'Reportes resueltos en la base en vez de recorrer en código',
        },
      },
    ],
  },
  {
    group: { en: 'Frontend', es: 'Frontend' },
    items: [
      {
        name: 'JavaScript',
        used: ['arenas-verdes', 'fixture-2026', 'other'],
        note: {
          en: 'Validation and dynamic behaviour on server-rendered views',
          es: 'Validaciones y comportamiento dinámico sobre vistas renderizadas en servidor',
        },
      },
      {
        name: 'CSS',
        used: ['arenas-verdes', 'rift-legacy', 'other'],
        note: {
          en: 'Written by hand, including this site',
          es: 'Escrito a mano, incluido este sitio',
        },
      },
      {
        name: 'PHTML / Blade',
        used: ['arenas-verdes', 'fixture-2026', 'other'],
        note: {
          en: 'Server-side templating as the default rendering model',
          es: 'Plantillas del lado del servidor como modelo de renderizado por defecto',
        },
      },
      {
        name: 'React',
        used: ['rift-legacy', 'other'],
        note: { en: 'Application interfaces, not pages', es: 'Interfaces de aplicación, no páginas' },
      },
      {
        name: 'SvelteKit',
        used: ['rift-legacy'],
        note: {
          en: 'Static build for a simulator that runs in the browser',
          es: 'Build estático para un simulador que corre en el navegador',
        },
      },
    ],
  },
  {
    group: { en: 'Delivery', es: 'Despliegue' },
    items: [
      {
        name: 'Docker',
        used: ['fixture-2026', 'other'],
        note: {
          en: 'Containerised development and deployment',
          es: 'Desarrollo y despliegue en contenedores',
        },
      },
      {
        name: 'Git & GitHub',
        used: ['arenas-verdes', 'fixture-2026', 'urban-mobility', 'rift-legacy', 'other'],
        note: {
          en: 'Working on shared repositories with other people',
          es: 'Trabajando sobre repositorios compartidos con otra gente',
        },
      },
      {
        name: 'GitHub Actions',
        used: ['fixture-2026'],
        note: {
          en: 'Continuous integration on a production repository',
          es: 'Integración continua sobre un repositorio en producción',
        },
      },
      {
        name: 'Apache / Nginx / Linux',
        used: ['arenas-verdes', 'other'],
        note: {
          en: 'Serving and maintaining deployed applications',
          es: 'Servir y mantener aplicaciones desplegadas',
        },
      },
      {
        name: 'Cloudflare Pages',
        used: ['rift-legacy', 'other'],
        note: { en: 'Static deployment via Wrangler', es: 'Despliegue estático vía Wrangler' },
      },
      {
        name: 'Postman',
        used: ['urban-mobility'],
        note: {
          en: 'API collections used to exercise services',
          es: 'Colecciones de API para ejercitar los servicios',
        },
      },
    ],
  },
];
