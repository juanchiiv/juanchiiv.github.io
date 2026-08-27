import { caseStudies, miniProjects } from '../data/projects';
import { sections } from '../data/profile';
import { useLang } from '../i18n';
import { kindLabels, ui } from '../i18n/ui';
import { scrollToSection } from './scroll';

/** The index shows the same number the section carries, so the two never disagree. */
const sectionIndexOf = (id: string) => sections.find((s) => s.id === id)?.index ?? '';

interface Row {
  id: string;
  target: string;
  index: string;
  name: string;
  meta: string;
  line: string;
  stack: string[];
  accent: string;
  deep: boolean;
}

export default function ProjectsIndex() {
  const { t } = useLang();

  const rows: Row[] = [
    ...caseStudies.map((cs) => ({
      id: cs.id,
      target: cs.id,
      index: sectionIndexOf(cs.id),
      name: t(cs.name),
      meta: `${t(kindLabels[cs.kind])} · ${t(cs.period)}`,
      line: t(cs.why),
      stack: cs.stack.slice(0, 5),
      accent: cs.accent,
      deep: true,
    })),
    // The three short ones all live in section 07.
    ...miniProjects.map((mp) => ({
      id: mp.id,
      target: 'more',
      index: sectionIndexOf('more'),
      name: t(mp.name),
      meta: `${t(kindLabels[mp.kind])} · ${t(mp.period)}`,
      line: t(mp.summary),
      stack: mp.stack.slice(0, 4),
      accent: mp.accent,
      deep: false,
    })),
  ];

  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="sec-head__top">
            <span className="sec-head__n">02</span>
            <span className="mono">{t(ui.projectsKicker)}</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 id="projects-h">{t(ui.projectsTitle)}</h2>
          <p>{t(ui.projectsLead)}</p>
        </div>

        <div className="index-list">
          {rows.map((row, i) => (
            <button
              key={row.id}
              type="button"
              className={`index-row reveal${row.deep ? '' : ' index-row--brief'}`}
              style={{ ['--accent' as string]: row.accent, ['--delay' as string]: `${i * 55}ms` }}
              onClick={() => scrollToSection(row.target)}
            >
              <span className="index-row__inner">
                <span className="index-row__n">{row.index}</span>
                <span>
                  <span className="index-row__name">{row.name}</span>
                  <br />
                  <span className="index-row__meta">{row.meta}</span>
                </span>
                <span className="index-row__why">{row.line}</span>
                <span className="index-row__go">
                  {row.deep ? t(ui.caseStudy) : t(ui.brief)}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="index-row__tags">
                  {row.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
