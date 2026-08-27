import { approach, experience, profile } from '../data/profile';
import { useLang } from '../i18n';
import { ui } from '../i18n/ui';

const OutArrow = () => (
  <svg className="channel__arrow" width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 11 11 2M4.5 2H11v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Approach() {
  const { t } = useLang();

  return (
    <section className="section" id="approach" aria-labelledby="approach-h">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="sec-head__top">
            <span className="sec-head__n">09</span>
            <span className="mono">{t(ui.approachKicker)}</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 id="approach-h">{t(ui.approachTitle)}</h2>
        </div>

        <div className="bio reveal">
          <p>{t(profile.summary)}</p>

          <div className="timeline">
            {experience.map((e) => (
              <div className="timeline__row" key={e.org}>
                <span className="timeline__period">{t(e.period)}</span>
                <span className="timeline__org">{e.org}</span>
                <span className="timeline__role">{t(e.role)}</span>
                <span className="timeline__detail">{t(e.detail)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="approach">
          {approach.map((a, i) => (
            <article className="approach__item reveal" key={a.n} style={{ ['--delay' as string]: `${i * 80}ms` }}>
              <span className="approach__n">{a.n}</span>
              <h3>{t(a.title)}</h3>
              <p>{t(a.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="sec-head__top">
            <span className="sec-head__n">10</span>
            <span className="mono">{t(ui.contactKicker)}</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 id="contact-h">{t(ui.contactTitle)}</h2>
          <p>{t(ui.contactLead)}</p>
        </div>

        <div className="channels reveal">
          <a className="channel" href={`mailto:${profile.email}`}>
            <span className="channel__k">Email</span>
            <span className="channel__v">{profile.email}</span>
            <OutArrow />
          </a>
          <a className="channel" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="channel__k">LinkedIn</span>
            <span className="channel__v">{profile.linkedinHandle}</span>
            <OutArrow />
          </a>
          <a className="channel" href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="channel__k">GitHub</span>
            <span className="channel__v">{profile.githubHandle}</span>
            <OutArrow />
          </a>
        </div>

        <div className="hero__cta reveal">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            {t(ui.writeToMe)}
          </a>
          <a className="btn" href={profile.cv} target="_blank" rel="noopener">
            {t(ui.downloadCv)}
          </a>
        </div>

        <footer className="footer">
          <span>
            {profile.name} — {t(profile.location)}
          </span>
          <span>{t(ui.builtWith)}</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
