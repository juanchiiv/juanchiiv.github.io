import ArchDiagram from './ArchDiagram';
import type { CaseStudy } from '../data/types';
import { useLang } from '../i18n';
import { kindLabels, ui } from '../i18n/ui';

/**
 * One case study, told in the same five beats every time: the problem, the system,
 * the build, the challenges, the result. The narrative is fixed; what changes per
 * project is the accent, the diagram topology and the evidence in the margin.
 */
export default function CaseStudySection({ cs, sectionIndex }: { cs: CaseStudy; sectionIndex: string }) {
  const { t } = useLang();

  return (
    <section
      className="case"
      id={cs.id}
      style={{ ['--accent' as string]: cs.accent }}
      aria-labelledby={`${cs.id}-h`}
    >
      <div className="shell case__layout">
        <aside className="case__aside">
          <div className="reveal">
            <span className="case__n" aria-hidden="true">
              {sectionIndex}
            </span>
            <h3 id={`${cs.id}-h`}>{t(cs.name)}</h3>
            <p className="case__tagline">{t(cs.tagline)}</p>

            <p style={{ marginBottom: '1.25rem' }}>
              <span className="tag tag--kind">{t(kindLabels[cs.kind])}</span>
            </p>

            <dl className="case__facts">
              <div className="case__fact">
                <dt>{t(ui.factContext)}</dt>
                <dd>{t(cs.context)}</dd>
              </div>
              <div className="case__fact">
                <dt>{t(ui.factPeriod)}</dt>
                <dd>{t(cs.period)}</dd>
              </div>
              <div className="case__fact">
                <dt>{t(ui.factRole)}</dt>
                <dd>{t(cs.role)}</dd>
              </div>
            </dl>

            <dl className="case__evidence">
              {cs.evidence.map((e) => (
                <div key={e.label.en}>
                  <dt>{t(e.label)}</dt>
                  <dd>{t(e.value)}</dd>
                </div>
              ))}
            </dl>

            <div className="case__stack">
              {cs.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            {cs.links && (
              <div className="case__links">
                {cs.links.map((l) => (
                  <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                    {t(l.label)}
                    <svg className="btn__arrow" width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2 11 11 2M4.5 2H11v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div>
          <div className="beat reveal">
            <p className="beat__label">{t(ui.beatProblem)}</p>
            <p>{t(cs.problem)}</p>
          </div>

          <div className="beat reveal">
            <p className="beat__label">{t(ui.beatSystem)}</p>
            <p style={{ marginBottom: '1.75rem' }}>{t(cs.system)}</p>
            <ArchDiagram arch={cs.architecture} label={t(cs.name)} />
          </div>

          <div className="beat reveal">
            <p className="beat__label">{t(ui.beatBuild)}</p>
            <ul className="build-list">
              {cs.build.map((b) => (
                <li key={b.en}>{t(b)}</li>
              ))}
            </ul>
          </div>

          <div className="beat reveal">
            <p className="beat__label">{t(ui.beatChallenges)}</p>
            <div className={`challenges${cs.challenges.length % 2 === 0 ? ' challenges--pair' : ''}`}>
              {cs.challenges.map((c) => (
                <article className="challenge" key={c.title.en}>
                  <h4>{t(c.title)}</h4>
                  <p>{t(c.body)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="beat reveal">
            <p className="beat__label">{t(ui.beatResult)}</p>
            <div className="result">
              <p>{t(cs.result)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
