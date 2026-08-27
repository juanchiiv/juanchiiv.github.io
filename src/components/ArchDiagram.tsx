import { useMemo } from 'react';
import type { Architecture } from '../data/types';
import { useLang, type Lang } from '../i18n';
import { ui } from '../i18n/ui';

/**
 * Architecture diagrams are generated from the same data that describes the system,
 * so they cannot drift from the prose next to them. Layers become rows, links become
 * curves, and only the edges touching the hardest node in the system are animated.
 */

const VB_W = 720;
const GUTTER = 58;
const PAD_R = 14;
const ROW_H = 78;
const PAD_T = 26;
const PAD_B = 22;

interface Placed {
  id: string;
  label: string;
  note?: string;
  hot?: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ArchDiagram({ arch, label }: { arch: Architecture; label: string }) {
  const { lang, t } = useLang();

  const { placed, rows, height, paths } = useMemo(() => layout(arch, lang), [arch, lang]);

  return (
    <figure className="arch">
      <div className="arch__head">
        <span>
          {t(ui.archLabel)} — {label}
        </span>
        <span>
          {arch.layers.length} {t(ui.archLayers)} · {placed.length} {t(ui.archComponents)}
        </span>
      </div>
      <p className="arch__hint">{t(ui.archScrollHint)}</p>
      <div className="arch__scroll">
        <svg viewBox={`0 0 ${VB_W} ${height}`} role="img" aria-label={`${t(ui.archAlt)}: ${t(arch.caption)}`}>
          {rows.map((row) => (
            <g key={row.tier + row.y}>
              <line x1={GUTTER - 12} y1={row.y} x2={VB_W - PAD_R} y2={row.y} stroke="rgba(255,255,255,0.03)" />
              <text className="arch__tier" x={4} y={row.y + 3}>
                {row.tier}
              </text>
            </g>
          ))}

          {paths.map((p) => (
            <path key={p.key} className={`arch__edge${p.live ? ' arch__edge--live' : ''}`} d={p.d} />
          ))}

          {placed.map((n) => (
            <g key={n.id} className={`arch__node${n.hot ? ' arch__node--hot' : ''}`}>
              <rect className="arch__node-box" x={n.x} y={n.y} width={n.w} height={n.h} rx={3} />
              <text className="arch__node-label" x={n.x + n.w / 2} y={n.note ? n.y + 15 : n.y + n.h / 2}>
                {n.label}
              </text>
              {n.note && (
                <text className="arch__node-note" x={n.x + n.w / 2} y={n.y + 29}>
                  {n.note}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="arch__caption">{t(arch.caption)}</figcaption>
    </figure>
  );
}

function layout(arch: Architecture, lang: Lang) {
  const contentW = VB_W - GUTTER - PAD_R;
  const map = new Map<string, Placed>();
  const rows: { tier: string; y: number }[] = [];

  arch.layers.forEach((layer, li) => {
    const y = PAD_T + li * ROW_H;
    rows.push({ tier: layer.tier[lang], y });

    const count = layer.nodes.length;
    const slot = contentW / count;
    const w = Math.min(154, slot - 10);
    const h = layer.nodes.some((n) => n.note) ? 40 : 30;

    layer.nodes.forEach((node, ni) => {
      const cx = GUTTER + slot * (ni + 0.5);
      map.set(node.id, {
        id: node.id,
        label: node.label[lang],
        note: node.note?.[lang],
        hot: node.hot,
        x: cx - w / 2,
        y: y - h / 2,
        w,
        h,
      });
    });
  });

  const paths = arch.links
    .map(([fromId, toId]) => {
      const a = map.get(fromId);
      const b = map.get(toId);
      if (!a || !b) return null;

      const ax = a.x + a.w / 2;
      const bx = b.x + b.w / 2;
      const down = a.y < b.y;
      const ay = down ? a.y + a.h : a.y;
      const by = down ? b.y : b.y + b.h;
      const dy = (by - ay) * 0.55;

      return {
        key: `${fromId}->${toId}`,
        d: `M ${ax} ${ay} C ${ax} ${ay + dy}, ${bx} ${by - dy}, ${bx} ${by}`,
        live: Boolean(a.hot || b.hot),
      };
    })
    .filter((p): p is { key: string; d: string; live: boolean } => p !== null);

  return {
    placed: Array.from(map.values()),
    rows,
    height: PAD_T + (arch.layers.length - 1) * ROW_H + PAD_B + 24,
    paths,
  };
}
