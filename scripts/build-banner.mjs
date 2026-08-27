/**
 * Builds the LinkedIn cover photo (1584×396).
 *
 * Right side: keycaps that come apart as they travel left, leaving a green
 * glow in the space they vacate. Left side: the role, the stack as icons, and
 * the site.
 *
 * Two constraints shape the layout:
 *  - The profile picture overlaps the bottom-left, so that corner stays empty.
 *  - LinkedIn crops the sides on narrow screens, so nothing that matters sits
 *    near either edge.
 *
 * Icon paths come from `simple-icons`, installed on demand.
 * Run: npm i --no-save sharp simple-icons && npm run banner
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import * as si from 'simple-icons';

const W = 1584;
const H = 396;

const BG = '#0a0b0d';
const KEY_FILL = '#15181e';
const KEY_EDGE = '#333a44';
const MUTED = '#9ba2ac';
const DIM = '#656c76';
const SIGNAL = '#c8f751';

const MONO = "'Consolas', 'Courier New', monospace";

/** Deterministic PRNG so the scatter never changes between runs. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Keys are placed right to left; `t` is how far into the dissolve each one is. */
function keycaps() {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ','],
  ];
  const size = 44;
  const gap = 9;
  const rightEdge = 1462;
  const midY = 198;
  const rand = rng(20260827);

  let out = '';

  rows.forEach((row, r) => {
    const y0 = midY + (r - 1) * (size + gap) + r * 2;
    const rowShift = r * 14;

    row.forEach((label, i) => {
      const fromRight = row.length - 1 - i;
      const x0 = rightEdge - rowShift - (fromRight + 1) * (size + gap);
      const t = Math.min(1, Math.max(0, (1 - i / (row.length - 1)) * 1.28 - 0.06));

      if (t > 0.82) {
        for (let k = 0; k < 5; k++) {
          const sx = x0 - 30 + rand() * (size + 60);
          const sy = y0 - 16 + rand() * (size + 32);
          const sz = 3 + rand() * 5;
          out += `<rect x="${sx.toFixed(1)}" y="${sy.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" rx="1" fill="${SIGNAL}" fill-opacity="${(0.1 + rand() * 0.2).toFixed(2)}" transform="rotate(${(rand() * 90).toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)})"/>`;
        }
        return;
      }

      const drift = t * t;
      const dx = (rand() - 0.5) * 70 * drift;
      const dy = (rand() - 0.5) * 78 * drift;
      const rot = (rand() - 0.5) * 62 * drift;
      const opacity = 1 - t * 0.72;
      const cx = x0 + size / 2 + dx;
      const cy = y0 + size / 2 + dy;
      const edge = t > 0.35 ? SIGNAL : KEY_EDGE;
      const edgeOp = t > 0.35 ? 0.28 + t * 0.5 : 0.9;

      out += `<g transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})" opacity="${opacity.toFixed(2)}">`;
      out += `<rect x="${(x0 + dx).toFixed(1)}" y="${(y0 + dy).toFixed(1)}" width="${size}" height="${size}" rx="7" fill="${KEY_FILL}" stroke="${edge}" stroke-opacity="${edgeOp.toFixed(2)}" stroke-width="1.2"/>`;
      out += `<rect x="${(x0 + dx + 5).toFixed(1)}" y="${(y0 + dy + 4).toFixed(1)}" width="${size - 10}" height="${size - 12}" rx="4" fill="none" stroke="#ffffff" stroke-opacity="${(0.05 * (1 - t)).toFixed(3)}"/>`;
      out += `<text x="${(x0 + dx + size / 2).toFixed(1)}" y="${(y0 + dy + size / 2 + 5).toFixed(1)}" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${t > 0.35 ? SIGNAL : MUTED}" fill-opacity="${t > 0.35 ? 0.85 : 0.75}">${label}</text>`;
      out += `</g>`;
    });
  });

  return out;
}

/**
 * The stack, monochrome so the row reads as one object rather than a pile of
 * brand colours. Only what actually appears in the portfolio is listed.
 */
const STACK = ['siPhp', 'siLaravel', 'siPython', 'siDjango', 'siSpring', 'siReact', 'siMysql', 'siPostgresql', 'siMongodb', 'siDocker'];

function stackIcons(x, y, size = 32, step = 52) {
  let out = '';
  STACK.forEach((key, i) => {
    const icon = si[key];
    if (!icon) return;
    const scale = size / 24;
    const gx = x + i * step;
    out += `<g transform="translate(${gx} ${y}) scale(${scale.toFixed(4)})" opacity="0.8">`;
    out += `<title>${icon.title}</title>`;
    out += `<path d="${icon.path}" fill="#dfe3e8"/>`;
    out += `</g>`;
  });
  return out;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="g" width="66" height="66" patternUnits="userSpaceOnUse">
      <path d="M66 0H0V66" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
      <stop offset="26%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#f)"/></mask>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c8f751" stop-opacity="0.26"/>
      <stop offset="55%" stop-color="#7fd47a" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#c8f751" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#g)" mask="url(#m)"/>

  <!-- The space the keys vacated -->
  <ellipse cx="1090" cy="198" rx="240" ry="150" fill="url(#glow)"/>

  ${keycaps()}

  <!-- Role, stack, site -->
  <circle cx="424" cy="145" r="6" fill="${SIGNAL}"/>
  <text x="446" y="158" font-family="${MONO}" font-size="34" letter-spacing="4.4" fill="${SIGNAL}">FULL STACK DEVELOPER</text>

  ${stackIcons(446, 200)}

  <text x="446" y="288" font-family="${MONO}" font-size="17" letter-spacing="1.2" fill="${DIM}">juanchiiv.github.io</text>
</svg>`;

writeFileSync('scripts/banner.svg', svg);

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .png({ compressionLevel: 9 })
  .toFile('public/linkedin-banner.png');

console.log('public/linkedin-banner.png written');
