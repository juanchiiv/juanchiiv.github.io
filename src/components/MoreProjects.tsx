import { miniProjects } from '../data/projects';
import { useLang } from '../i18n';
import { kindLabels, ui } from '../i18n/ui';

/**
 * Section 07. Same evidence-first shape as the case studies, without the narrative:
 * what it is, three facts, the stack. Castellano carries an image because the point
 * of that one is what it looks like.
 */
export default function MoreProjects() {
  const { t } = useLang();

  return (
    <section className="section" id="more" aria-labelledby="more-h">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="sec-head__top">
            <span className="sec-head__n">07</span>
            <span className="mono">{t(ui.moreKicker)}</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 id="more-h">{t(ui.moreTitle)}</h2>
        </div>

        <div className="minis">
          {miniProjects.map((p, i) => (
            <article
              className={`mini reveal${p.preview ? ' mini--visual' : ''}`}
              key={p.id}
              style={{ ['--accent' as string]: p.accent, ['--delay' as string]: `${i * 80}ms` }}
            >
              <div className="mini__body">
                <header className="mini__head">
                  <h3>{t(p.name)}</h3>
                  <p className="mini__meta">
                    <span className="tag tag--kind">{t(kindLabels[p.kind])}</span>
                    <span>
                      {t(p.context)} · {t(p.period)}
                    </span>
                  </p>
                </header>

                <p className="mini__summary">{t(p.summary)}</p>

                <ul className="mini__points">
                  {p.points.map((pt) => (
                    <li key={pt.en}>{t(pt)}</li>
                  ))}
                </ul>

                <p className="mini__stack">
                  {p.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </p>
              </div>

              {p.preview && (
                <figure className="mini__preview">
                  <img
                    src={p.preview.src}
                    alt={t(p.preview.alt)}
                    width={880}
                    height={495}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
