import type { LText } from './index';
import type { Kind } from '../data/types';

/** Interface chrome. Project content lives in `data/`, next to the project it describes. */
export const ui = {
  skip: { en: 'Skip to the projects', es: 'Ir directamente a los proyectos' },
  sectionsNav: { en: 'Sections', es: 'Secciones' },
  externalNav: { en: 'External links', es: 'Enlaces externos' },
  goTo: { en: 'Go to', es: 'Ir a' },
  langSwitchTo: { en: 'Ver en español', es: 'View in English' },

  cv: { en: 'CV', es: 'CV' },
  seeProjects: { en: 'See my projects', es: 'Ver mis proyectos' },
  getInTouch: { en: 'Contact', es: 'Contacto' },
  scroll: { en: 'Scroll', es: 'Scroll' },
  caseStudy: { en: 'Read more', es: 'Ver más' },
  brief: { en: 'In short', es: 'En corto' },

  heroDiagramAlt: {
    en: 'Diagram of a request going down from the interface through the application and the business rules to the database, and the response coming back.',
    es: 'Diagrama de una petición que baja desde la interfaz, pasa por la aplicación y las reglas de negocio hasta la base de datos, y de la respuesta que vuelve.',
  },
  request: { en: 'request', es: 'petición' },
  response: { en: 'response', es: 'respuesta' },

  // Case study beats
  beatProblem: { en: 'The problem', es: 'El problema' },
  beatSystem: { en: 'The system', es: 'El sistema' },
  beatBuild: { en: 'What I built', es: 'Qué construí' },
  beatChallenges: { en: 'The hard parts', es: 'Lo difícil' },
  beatResult: { en: 'How it ended', es: 'Cómo terminó' },

  factContext: { en: 'Where', es: 'Dónde' },
  factPeriod: { en: 'When', es: 'Cuándo' },
  factRole: { en: 'My part', es: 'Mi parte' },

  // Architecture diagram
  archLabel: { en: 'Architecture', es: 'Arquitectura' },
  archLayers: { en: 'layers', es: 'capas' },
  archComponents: { en: 'parts', es: 'partes' },
  archScrollHint: { en: 'Scroll the diagram sideways →', es: 'Desplazá el diagrama en horizontal →' },
  archAlt: { en: 'Architecture diagram', es: 'Diagrama de arquitectura' },

  // 02 — projects index
  projectsKicker: { en: 'My projects', es: 'Mis proyectos' },
  projectsTitle: {
    en: "What I've worked on, and what each one taught me.",
    es: 'En lo que trabajé, y qué me dejó cada uno.',
  },
  projectsLead: {
    en: 'The first four I tell in detail, because they are the ones with the most to show. The other three, briefly.',
    es: 'Los primeros cuatro los cuento en detalle, porque son los que tienen más para mostrar. Los otros tres van en corto.',
  },

  // 07 — more projects
  moreKicker: { en: 'More projects', es: 'Más proyectos' },
  moreTitle: { en: 'Three more, in short.', es: 'Tres más, en corto.' },

  // 08 — toolkit
  toolkitKicker: { en: 'Toolkit', es: 'Herramientas' },
  toolkitTitle: {
    en: 'What I use, and where I used it.',
    es: 'Con qué trabajo, y dónde lo usé.',
  },
  toolkitLead: {
    en: 'A list of technologies on its own proves nothing, so each row says which projects it belongs to.',
    es: 'Una lista de tecnologías sola no prueba nada, así que cada fila dice en qué proyectos la usé.',
  },
  toolkitLegend: {
    en: 'AV — Arenas Verdes · FX — Fixture 2026 · SS — Scooter Sharing · RL — Rift Legacy · + — the three above',
    es: 'AV — Arenas Verdes · FX — Fixture 2026 · SS — Monopatines · RL — Rift Legacy · + — los tres de arriba',
  },
  colCapability: { en: 'Tool', es: 'Herramienta' },
  usedIn: { en: 'Used in', es: 'Usado en' },
  notUsedIn: { en: 'Not used in', es: 'No usado en' },

  // 09 — approach
  approachKicker: { en: 'Approach', es: 'Enfoque' },
  approachTitle: {
    en: 'How I think about what I build.',
    es: 'Cómo pienso lo que construyo.',
  },

  // 10 — contact
  contactKicker: { en: 'Contact', es: 'Contacto' },
  contactTitle: { en: "Let's talk", es: 'Hablemos' },
  contactLead: {
    en: 'If something here caught your attention, write to me. Any of these three works.',
    es: 'Si te interesó algo de lo que viste, escribime. Por cualquiera de estos tres.',
  },
  writeToMe: { en: 'Write to me', es: 'Escribime' },
  downloadCv: { en: 'Download CV', es: 'Descargar CV' },
  builtWith: {
    en: 'Made from scratch · React · TypeScript · Vite',
    es: 'Hecho desde cero · React · TypeScript · Vite',
  },
} satisfies Record<string, LText>;

export const kindLabels: Record<Kind, LText> = {
  professional: { en: 'Professional', es: 'Profesional' },
  internship: { en: 'Professional practice', es: 'Práctica profesional' },
  academic: { en: 'Academic', es: 'Académico' },
  personal: { en: 'Personal', es: 'Personal' },
};
