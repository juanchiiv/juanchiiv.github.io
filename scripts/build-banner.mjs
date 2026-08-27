/**
 * Builds the LinkedIn cover photo (1584×396).
 *
 * Two constraints shape the layout:
 *  - The profile picture overlaps the bottom-left, so roughly the first 380px
 *    and the lower band on that side are kept empty on purpose.
 *  - LinkedIn crops the sides on narrow screens, so nothing that matters is
 *    allowed near the left or right edge.
 *
 * Run with: npm run banner   (needs sharp: npm i --no-save sharp)
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1584;
const H = 396;

const BG = '#0a0b0d';
const PANEL = '#0f1114';
const TEXT = '#e9ebee';
const MUTED = '#9ba2ac';
const SIGNAL = '#c8f751';
const FLOW = '#6ea3ff';

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Consolas', 'Courier New', monospace";

const ES = {
  eyebrow: 'FULL STACK DEVELOPER',
  headline: 'De la idea al sistema.',
  tiers: ['INTERFAZ', 'APP', 'LÓGICA', 'DATOS'],
};
const EN = {
  eyebrow: 'FULL STACK DEVELOPER',
  headline: 'From idea to system.',
  tiers: ['INTERFACE', 'APP', 'LOGIC', 'DATA'],
};

const lang = process.argv[2] === 'en' ? EN : ES;
const outFile = process.argv[2] === 'en' ? 'public/linkedin-banner-en.png' : 'public/linkedin-banner.png';

/**
 * The hero diagram turned on its side: the stack reads left to right and
 * funnels from many interface nodes down to a single database.
 */
function diagram() {
  const cols = [
    { x: 960, n: 3 },
    { x: 1110, n: 2 },
    { x: 1265, n: 2 },
    { x: 1410, n: 1 },
  ];
  const midY = 190;
  const gap = 58;

  const pos = cols.map((c) =>
    Array.from({ length: c.n }, (_, i) => midY + (i - (c.n - 1) / 2) * gap),
  );

  let out = '';

  // Edges
  for (let i = 0; i < cols.length - 1; i++) {
    for (const ay of pos[i]) {
      for (const by of pos[i + 1]) {
        out += `<line x1="${cols[i].x}" y1="${ay}" x2="${cols[i + 1].x}" y2="${by}" stroke="#a0b4d2" stroke-opacity="0.15" stroke-width="1"/>`;
      }
    }
  }

  // One path lit up, top interface node down to the database
  const path = [pos[0][0], pos[1][0], pos[2][0], pos[3][0]];
  for (let i = 0; i < path.length - 1; i++) {
    out += `<line x1="${cols[i].x}" y1="${path[i]}" x2="${cols[i + 1].x}" y2="${path[i + 1]}" stroke="${FLOW}" stroke-opacity="0.8" stroke-width="1.8"/>`;
  }

  // Nodes
  cols.forEach((c, i) => {
    pos[i].forEach((y) => {
      const lit = path[i] === y;
      const r = i === cols.length - 1 ? 11 : 8;
      if (lit) out += `<circle cx="${c.x}" cy="${y}" r="${r + 8}" fill="${SIGNAL}" fill-opacity="0.1"/>`;
      out += `<circle cx="${c.x}" cy="${y}" r="${r}" fill="${PANEL}" stroke="${lit ? SIGNAL : '#a0b4d2'}" stroke-opacity="${lit ? 1 : 0.42}" stroke-width="1.8"/>`;
    });
  });

  // Packet on the first leg
  out += `<circle cx="${(cols[0].x + cols[1].x) / 2}" cy="${(path[0] + path[1]) / 2}" r="5" fill="${FLOW}"/>`;

  // Tier labels, on one baseline under the diagram
  cols.forEach((c, i) => {
    out += `<text x="${c.x}" y="310" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.8" fill="#656c76">${lang.tiers[i]}</text>`;
  });

  return out;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="66" height="66" patternUnits="userSpaceOnUse">
      <path d="M66 0H0V66" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
      <stop offset="30%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="gridmask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridmask)"/>

  ${diagram()}

  <!-- Text block starts past the profile picture -->
  <circle cx="436" cy="146" r="5" fill="${SIGNAL}"/>
  <text x="454" y="152" font-family="${MONO}" font-size="16" letter-spacing="3.2" fill="${SIGNAL}">${lang.eyebrow}</text>

  <text x="432" y="228" font-family="${FONT}" font-size="52" font-weight="600" letter-spacing="-1.6" fill="${TEXT}">${lang.headline}</text>

  <line x1="434" y1="266" x2="434" y2="304" stroke="#2a3038"/>
  <text x="454" y="292" font-family="${MONO}" font-size="17" letter-spacing="1.2" fill="${MUTED}">juanchiiv.github.io</text>
</svg>`;

writeFileSync('scripts/banner.svg', svg);

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .png({ compressionLevel: 9, palette: true })
  .toFile(outFile);

console.log(outFile, 'written');
