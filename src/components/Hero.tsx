import SystemField from './SystemField';
import { profile } from '../data/profile';
import { useLang } from '../i18n';
import { ui } from '../i18n/ui';

const Arrow = () => (
  <svg className="btn__arrow" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 11 11 2M4.5 2H11v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Hero() {
  const { lang, t } = useLang();
  const statement = profile.statement[lang];

  return (
    <header className="hero section--flush" id="hero">
      <div className="shell hero__grid">
        <div>
          <p className="hero__eyebrow">{t(profile.concept)}</p>

          {/* Keyed by language so switching replays the reveal rather than swapping mid-line. */}
          <h1 key={lang}>
            {statement.map((line, i) => (
              <span className="u" key={line}>
                {/* The claim and the closing line carry; the enumeration between them steps back. */}
                <span
                  style={{ ['--d' as string]: `${120 + i * 90}ms` }}
                  className={i > 0 && i < statement.length - 1 ? 'em' : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero__name">
            <strong>{profile.name}</strong>
            <span className="sep">/</span>
            <span>{t(profile.role)}</span>
            <span className="sep">/</span>
            <span>{t(profile.focus)}</span>
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              {t(ui.seeProjects)} <Arrow />
            </a>
            <a className="btn" href="#contact">
              {t(ui.getInTouch)}
            </a>
            <a className="btn" href={profile.cv} target="_blank" rel="noopener">
              {t(ui.cv)}
            </a>
          </div>

          <p className="hero__meta">
            <span>{t(profile.location)}</span>
            <span>{t(profile.education)}</span>
            <span>{t(profile.availability)}</span>
          </p>
        </div>

        <SystemField />
      </div>

      <p className="scroll-hint" aria-hidden="true">
        {t(ui.scroll)}
      </p>
    </header>
  );
}
