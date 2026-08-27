/**
 * Builds the Open Graph preview card (1200×630) shown when the site is shared
 * on LinkedIn, WhatsApp or Slack.
 *
 * It reuses the site's own language: near-black ground, engineering grid, the
 * lime signal colour, and the layered request/response diagram from the hero.
 *
 * Run with: npm run og   (needs sharp, installed on demand — see the script)
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;

const BG = '#0a0b0d';
const PANEL = '#0f1114';
const LINE = '#2a3038';
const TEXT = '#e9ebee';
const MUTED = '#9ba2ac';
const SIGNAL = '#c8f751';
const FLOW = '#6ea3ff';

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Consolas', 'Courier New', monospace";

/** The hero diagram, reduced to four tiers of nodes with one live path through it. */
function diagram() {
  const tiers = [
    { y: 168, n: 4, label: 'INTERFACE' },
    { y: 288, n: 3, label: 'APPLICATION' },
    { y: 408, n: 3, label: 'LOGIC' },
    { y: 520, n: 2, label: 'DATA' },
  ];
  const left = 812;
  const right = 1128;
  const span = right - left;

  const pos = tiers.map((t) =>
    Array.from({ length: t.n }, (_, i) => (t.n === 1 ? left + span / 2 : left + (span * i) / (t.n - 1))),
  );

  let out = '';

  // Tier rules and labels
  tiers.forEach((t) => {
    out += `<line x1="${left - 28}" y1="${t.y}" x2="${right + 16}" y2="${t.y}" stroke="#ffffff" stroke-opacity="0.05"/>`;
    out += `<text x="${left - 26}" y="${t.y + 4}" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="1.6" fill="#656c76">${t.label}</text>`;
  });

  // Edges between consecutive tiers
  for (let i = 0; i < tiers.length - 1; i++) {
    for (const ax of pos[i]) {
      for (const bx of pos[i + 1]) {
        out += `<line x1="${ax}" y1="${tiers[i].y}" x2="${bx}" y2="${tiers[i + 1].y}" stroke="#a0b4d2" stroke-opacity="0.13" stroke-width="1"/>`;
      }
    }
  }

  // One highlighted path: a request going down and the response coming back.
  const path = [pos[0][1], pos[1][1], pos[2][0], pos[3][0]];
  for (let i = 0; i < path.length - 1; i++) {
    out += `<line x1="${path[i]}" y1="${tiers[i].y}" x2="${path[i + 1]}" y2="${tiers[i + 1].y}" stroke="${FLOW}" stroke-opacity="0.75" stroke-width="1.6"/>`;
  }

  // Nodes
  tiers.forEach((t, i) => {
    pos[i].forEach((x) => {
      const onPath = path[i] === x;
      const r = i === tiers.length - 1 ? 9 : 7;
      out += `<circle cx="${x}" cy="${t.y}" r="${r + (onPath ? 7 : 0)}" fill="${SIGNAL}" fill-opacity="${onPath ? 0.1 : 0}"/>`;
      out += `<circle cx="${x}" cy="${t.y}" r="${r}" fill="${PANEL}" stroke="${onPath ? SIGNAL : '#a0b4d2'}" stroke-opacity="${onPath ? 1 : 0.4}" stroke-width="1.6"/>`;
    });
  });

  // The packet travelling the path
  const mx = (path[1] + path[2]) / 2;
  const my = (tiers[1].y + tiers[2].y) / 2;
  out += `<circle cx="${mx}" cy="${my}" r="5" fill="${FLOW}"/>`;

  return out;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="76" height="76" patternUnits="userSpaceOnUse">
      <path d="M76 0H0V76" fill="none" stroke="#ffffff" stroke-opacity="0.028" stroke-width="1"/>
    </pattern>
    <radialGradient id="fade" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="75%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridmask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridmask)"/>

  ${diagram()}

  <!-- Eyebrow -->
  <circle cx="76" cy="150" r="5" fill="${SIGNAL}"/>
  <text x="94" y="156" font-family="${MONO}" font-size="17" letter-spacing="3.4" fill="${SIGNAL}">FULL STACK DEVELOPER</text>

  <!-- Name -->
  <text x="72" y="272" font-family="${FONT}" font-size="82" font-weight="600" letter-spacing="-2.6" fill="${TEXT}">Juan Diego</text>
  <text x="72" y="360" font-family="${FONT}" font-size="82" font-weight="600" letter-spacing="-2.6" fill="${TEXT}">Vidal Peirano</text>

  <!-- Supporting line -->
  <text x="72" y="424" font-family="${FONT}" font-size="27" fill="${MUTED}">Backend, bases de datos e interfaz.</text>
  <text x="72" y="462" font-family="${FONT}" font-size="27" fill="${MUTED}">De la idea al sistema.</text>

  <!-- Footer -->
  <line x1="72" y1="520" x2="640" y2="520" stroke="${LINE}"/>
  <text x="72" y="562" font-family="${MONO}" font-size="19" letter-spacing="1.2" fill="${SIGNAL}">juanchiiv.github.io</text>
  <text x="72" y="562" font-family="${MONO}" font-size="19" letter-spacing="1.2" fill="#656c76" text-anchor="end" transform="translate(640,0)">Lobería, Buenos Aires</text>
</svg>`;

writeFileSync('scripts/og.svg', svg);

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/og.png');

console.log('public/og.png written');
