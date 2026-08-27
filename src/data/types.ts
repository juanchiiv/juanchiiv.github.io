import type { LText } from '../i18n';

export type Kind = 'professional' | 'internship' | 'academic' | 'personal';

export interface ArchNode {
  id: string;
  label: LText;
  note?: LText;
  /** Marks the node as the one that carries the hardest logic — rendered with the accent. */
  hot?: boolean;
}

export interface ArchLayer {
  id: string;
  /** Short stack label rendered in the gutter: UI, APP, LOGIC, DATA… */
  tier: LText;
  nodes: ArchNode[];
}

export interface Architecture {
  layers: ArchLayer[];
  links: [string, string][];
  caption: LText;
}

export interface Challenge {
  title: LText;
  body: LText;
}

export interface CaseStudy {
  id: string;
  /** A proper noun — the same in both languages unless the project itself is named differently. */
  name: LText;
  tagline: LText;
  kind: Kind;
  context: LText;
  period: LText;
  role: LText;
  /** CSS hue applied locally — keeps each system visually distinct without a rainbow. */
  accent: string;
  /** One-line reason this project earned a place in the portfolio. */
  why: LText;
  problem: LText;
  system: LText;
  build: LText[];
  challenges: Challenge[];
  result: LText;
  /** Technology names stay untranslated — they are proper nouns in both languages. */
  stack: string[];
  evidence: { label: LText; value: LText }[];
  links?: { label: LText; href: string }[];
  architecture: Architecture;
}



/** A project shown compactly: enough to understand it, not a full case study. */
export interface MiniProject {
  id: string;
  name: LText;
  kind: Kind;
  context: LText;
  period: LText;
  accent: string;
  summary: LText;
  points: LText[];
  stack: string[];
  preview?: { src: string; alt: LText };
}
