import { Fragment } from 'react';
import { columns, toolkit } from '../data/toolkit';
import { useLang } from '../i18n';
import { ui } from '../i18n/ui';

/**
 * A matrix instead of a logo wall: every row states where the technology was
 * actually used. A tool with no dot anywhere would have no business being listed.
 */
export default function Toolkit() {
  const { t } = useLang();

  return (
    <section className="section" id="toolkit" aria-labelledby="toolkit-h">
      <div className="shell">
        <div className="sec-head reveal">
          <div className="sec-head__top">
            <span className="sec-head__n">08</span>
            <span className="mono">{t(ui.toolkitKicker)}</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 id="toolkit-h">{t(ui.toolkitTitle)}</h2>
          <p>{t(ui.toolkitLead)}</p>
        </div>

        <div className="matrix reveal">
          <table>
            <caption className="mono" style={{ textTransform: 'none', letterSpacing: '0.04em' }}>
              {t(ui.toolkitLegend)}
            </caption>
            <thead>
              <tr>
                <th scope="col">{t(ui.colCapability)}</th>
                {columns.map((c) => (
                  <th scope="col" key={c.id} title={t(c.name)}>
                    {c.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {toolkit.map((group) => (
                <Fragment key={group.group.en}>
                  <tr className="grp">
                    <td colSpan={columns.length + 1}>{t(group.group)}</td>
                  </tr>
                  {group.items.map((item) => (
                    <tr className="cap" key={item.name}>
                      <th scope="row" style={{ fontWeight: 400 }}>
                        <span className="cap__name">{item.name}</span>
                        <br />
                        <span className="cap__note">{t(item.note)}</span>
                      </th>
                      {columns.map((c) => {
                        const on = item.used.includes(c.id);
                        return (
                          <td className="cell" key={c.id}>
                            <span className={`dot${on ? ' dot--on' : ''}`} aria-hidden="true" />
                            <span className="visually-hidden">
                              {on ? t(ui.usedIn) : t(ui.notUsedIn)} {t(c.name)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
