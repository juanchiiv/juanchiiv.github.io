import { sections, profile } from '../data/profile';
import { useActiveSection } from '../hooks';
import { useLang } from '../i18n';
import { ui } from '../i18n/ui';
import { scrollToSection } from './scroll';

const ids = sections.map((s) => s.id);

/** Two words, one control: the button always names the language you would switch to. */
function LangToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <button
      type="button"
      className="langtoggle"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={t(ui.langSwitchTo)}
      title={t(ui.langSwitchTo)}
    >
      <span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
      <span className="langtoggle__sep" aria-hidden="true" />
      <span className={lang === 'es' ? 'is-on' : undefined}>ES</span>
    </button>
  );
}

export default function Rail() {
  const { active, progress } = useActiveSection(ids);
  const { t } = useLang();

  const current = sections.find((s) => s.id === active) ?? sections[0]!;

  return (
    <>
      <div className="topbar">
        <a className="topbar__mark" href="#hero">
          <span className="topbar__pulse" aria-hidden="true" />
          JDVP
        </a>
        <nav className="topbar__links" aria-label={t(ui.externalNav)}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.cv} target="_blank" rel="noopener">
            {t(ui.cv)}
          </a>
          <LangToggle />
        </nav>
        <div className="topbar__compact">
          <LangToggle />
        </div>
      </div>

      <nav className="rail" aria-label={t(ui.sectionsNav)}>
        <div className="rail__track">
          <span className="rail__fill" style={{ height: `${Math.round(progress * 100)}%` }} aria-hidden="true" />
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className="rail__item"
              aria-current={active === s.id ? 'true' : undefined}
              onClick={() => scrollToSection(s.id)}
            >
              <span className="rail__dot" aria-hidden="true" />
              <span className="rail__label" aria-hidden="true">
                {s.index} {t(s.label)}
              </span>
              <span className="visually-hidden">
                {t(ui.goTo)} {t(s.label)}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Below 1100px the rail collapses into a single indicator: where you are
          and how far through. A menu would be a worse answer on a linear page. */}
      <div className="railbar" aria-hidden="true">
        <span className="railbar__n">{current.index}</span>
        <span className="railbar__label">{t(current.label)}</span>
        <span className="railbar__meter">
          <span style={{ transform: `scaleX(${progress.toFixed(3)})` }} />
        </span>
      </div>
    </>
  );
}
