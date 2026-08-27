import type { Lang, LText } from '../i18n';

export const profile = {
  name: 'Juan Diego Vidal Peirano',
  role: { en: 'Full Stack Developer', es: 'Full Stack Developer' } satisfies LText,
  focus: { en: 'Backend-oriented', es: 'Orientado a backend' } satisfies LText,
  location: {
    en: 'Lobería, Buenos Aires, Argentina',
    es: 'Lobería, Buenos Aires, Argentina',
  } satisfies LText,
  concept: { en: 'From idea to system', es: 'De la idea al sistema' } satisfies LText,

  /** The hero, broken into lines per language — the break points differ. */
  statement: {
    en: ["I'm Juan Diego.", 'I build full stack software,', 'mostly backend.'],
    es: ['Soy Juan Diego.', 'Hago software full stack,', 'sobre todo backend.'],
  } satisfies Record<Lang, string[]>,

  summary: {
    en: "I'm a Full Stack Developer focused on backend. I've worked across the whole cycle — gathering requirements, the data model, development, testing and going live — on booking, payment and management systems for clients in energy, healthcare and public administration.",
    es: 'Soy Full Stack Developer con foco en backend. Trabajé en el ciclo completo (relevamiento, modelo de datos, desarrollo, pruebas y puesta en producción) en sistemas de reservas, de pagos y de gestión para empresas de energía, salud y administración pública.',
  } satisfies LText,

  availability: {
    en: 'Open to full stack and backend roles',
    es: 'Disponible para puestos full stack y backend',
  } satisfies LText,

  email: 'juanchiilobe@gmail.com',
  github: 'https://github.com/juanchiiv',
  githubHandle: 'github.com/juanchiiv',
  linkedin: 'https://www.linkedin.com/in/juan-diego-vidal-7b390133b',
  linkedinHandle: 'in/juan-diego-vidal',
  cv: '/juan-diego-vidal-cv.pdf',
  education: { en: 'UNICEN, 2026', es: 'UNICEN, 2026' } satisfies LText,
};

export const experience: { org: string; role: LText; period: LText; detail: LText }[] = [
  {
    org: 'DIXER',
    role: { en: 'Full Stack Developer', es: 'Full Stack Developer' },
    period: { en: 'Dec 2024 — Jul 2026', es: 'Dic 2024 — Jul 2026' },
    detail: {
      en: 'Custom web systems for energy, healthcare and public administration, from the technical definition through to production, in a team with other developers, an engineer and designers.',
      es: 'Sistemas web a medida para energía, salud y administración pública, desde la definición técnica hasta producción, en un equipo con otros desarrolladores, un ingeniero y diseñadores.',
    },
  },
  {
    org: 'UNICEN',
    role: {
      en: 'Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas',
      es: 'Tecnicatura Universitaria en Desarrollo de Aplicaciones Informáticas',
    },
    period: { en: 'Graduated Apr 2026', es: 'Graduado Abr 2026' },
    detail: {
      en: 'Web architectures, relational and non-relational databases, interfaces and software development.',
      es: 'Arquitecturas web, bases de datos relacionales y no relacionales, interfaces y desarrollo de software.',
    },
  },
];

export const approach: { n: string; title: LText; body: LText }[] = [
  {
    n: '01',
    title: { en: 'I start at the data model', es: 'Empiezo por el modelo de datos' },
    body: {
      en: 'Before thinking about a screen I want to know what each thing is and which rule can never be broken. Almost every bug I had to fix later came from a decision made in the database, not in a function.',
      es: 'Antes de pensar una pantalla quiero saber qué es cada cosa y qué regla no se puede romper nunca. Casi todos los bugs que tuve que arreglar después venían de una decisión tomada en la base, no en una función.',
    },
  },
  {
    n: '02',
    title: { en: 'One rule, one place', es: 'Una regla, un solo lugar' },
    body: {
      en: "If the price simulator and the real booking don't agree, it's because the calculation is written twice. Pulling logic out of the controllers isn't about being tidy: it's what later lets you recalculate without being afraid to.",
      es: 'Si el simulador de precios y la reserva real no dan lo mismo, es porque el cálculo está escrito dos veces. Sacar la lógica de los controladores no es prolijidad: es lo que después te deja recalcular sin miedo.',
    },
  },
  {
    n: '03',
    title: {
      en: 'I think about the second time something happens',
      es: 'Pienso en la segunda vez que pasa algo',
    },
    body: {
      en: "The payment callback arrives twice. The result gets corrected once you've already scored everyone. If the state can be rebuilt from what happened, you survive it. If it's a column someone overwrote, you don't.",
      es: 'El callback de pago llega dos veces. El resultado se corrige cuando ya puntuaste a todos. Si el estado se puede reconstruir a partir de lo que pasó, sobrevivís. Si es una columna que alguien pisó, no.',
    },
  },
  {
    n: '04',
    title: { en: 'I check what fails without an error', es: 'Reviso lo que falla sin dar error' },
    body: {
      en: "When something breaks, you find out right away. When it hands you a number that's wrong but looks right, you never do. That's why I ended up writing 27 scripts to test the simulator's rules: it was the only way to know if it was working.",
      es: 'Cuando algo se rompe, te enterás enseguida. Cuando te devuelve un número que está mal pero parece correcto, no te enterás nunca. Por eso en el simulador terminé escribiendo 27 scripts que prueban las reglas: era la única forma de saber si andaba bien.',
    },
  },
];

export const sections: { id: string; index: string; label: LText }[] = [
  { id: 'hero', index: '01', label: { en: 'Start', es: 'Inicio' } },
  { id: 'projects', index: '02', label: { en: 'My projects', es: 'Mis proyectos' } },
  { id: 'arenas-verdes', index: '03', label: { en: 'Arenas Verdes', es: 'Arenas Verdes' } },
  { id: 'fixture-2026', index: '04', label: { en: 'Fixture 2026', es: 'Fixture 2026' } },
  { id: 'urban-mobility', index: '05', label: { en: 'Scooter Sharing', es: 'Monopatines' } },
  { id: 'rift-legacy', index: '06', label: { en: 'Rift Legacy', es: 'Rift Legacy' } },
  { id: 'more', index: '07', label: { en: 'More projects', es: 'Más proyectos' } },
  { id: 'toolkit', index: '08', label: { en: 'Toolkit', es: 'Herramientas' } },
  { id: 'approach', index: '09', label: { en: 'Approach', es: 'Enfoque' } },
  { id: 'contact', index: '10', label: { en: 'Contact', es: 'Contacto' } },
];
