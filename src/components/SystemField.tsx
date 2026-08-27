import { useEffect, useRef } from 'react';
import { useNearViewport, useReducedMotion } from '../hooks';
import { useLang } from '../i18n';
import { ui } from '../i18n/ui';

/**
 * The hero visualisation: a request entering at the interface, descending through
 * the application and business rules to the data layer, and a response coming back.
 *
 * It is not decoration — it is the concept of the site drawn once. The cursor
 * energises whatever part of the stack it is closest to, which is the only
 * interaction: no particles, no parallax, nothing that competes with the words.
 */

interface Node {
  x: number;
  y: number;
  r: number;
  tier: number;
  /** 0..1 excitation, decays every frame. */
  heat: number;
}

interface Packet {
  path: number[];
  leg: number;
  t: number;
  speed: number;
  /** true = request travelling down, false = response coming back up. */
  down: boolean;
}

const TIER_LABELS = {
  en: ['INTERFACE', 'APPLICATION', 'BUSINESS LOGIC', 'DATA'],
  es: ['INTERFAZ', 'APLICACIÓN', 'LÓGICA DE NEGOCIO', 'DATOS'],
};
const WIDE_COUNTS = [4, 3, 3, 2];
const NARROW_COUNTS = [3, 2, 2, 2];

export default function SystemField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: hostRef, near } = useNearViewport<HTMLDivElement>();
  const reduced = useReducedMotion();
  const { lang, t } = useLang();
  const TIERS = TIER_LABELS[lang];

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let packets: Packet[] = [];
    const pointer = { x: -999, y: -999, active: false };
    let raf = 0;
    let last = 0;

    const css = getComputedStyle(document.documentElement);
    const flow = css.getPropertyValue('--flow').trim() || '#6ea3ff';
    const signal = css.getPropertyValue('--signal').trim() || '#c8f751';

    function layout() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const counts = width < 420 ? NARROW_COUNTS : WIDE_COUNTS;
      const padX = Math.max(38, width * 0.14);
      const top = height * 0.16;
      const bottom = height * 0.86;
      const gap = (bottom - top) / (counts.length - 1);

      nodes = [];
      counts.forEach((count, tier) => {
        const span = width - padX * 2;
        for (let i = 0; i < count; i++) {
          const t = count === 1 ? 0.5 : i / (count - 1);
          nodes.push({
            x: padX + span * t,
            y: top + gap * tier,
            r: tier === counts.length - 1 ? 7 : 5.5,
            tier,
            heat: 0,
          });
        }
      });

      // Fully connect each tier to the next: the stack is the message.
      edges = [];
      for (let tier = 0; tier < counts.length - 1; tier++) {
        const from = nodes.map((n, i) => ({ n, i })).filter((e) => e.n.tier === tier);
        const to = nodes.map((n, i) => ({ n, i })).filter((e) => e.n.tier === tier + 1);
        for (const a of from) for (const b of to) edges.push([a.i, b.i]);
      }
    }

    function spawn() {
      const path: number[] = [];
      for (let tier = 0; tier < TIERS.length; tier++) {
        const options = nodes.map((n, i) => ({ n, i })).filter((e) => e.n.tier === tier);
        path.push(options[Math.floor(Math.random() * options.length)]!.i);
      }
      packets.push({ path, leg: 0, t: 0, speed: 0.55 + Math.random() * 0.5, down: true });
    }

    function drawFrame(dt: number) {
      ctx!.clearRect(0, 0, width, height);

      // Tier rules and labels — the layers of the stack, stated plainly.
      ctx!.font = '8px "JetBrains Mono", monospace';
      ctx!.textBaseline = 'middle';
      for (let tier = 0; tier < TIERS.length; tier++) {
        const y = nodes.find((n) => n.tier === tier)?.y ?? 0;
        ctx!.strokeStyle = 'rgba(255,255,255,0.045)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(14, y);
        ctx!.lineTo(width - 14, y);
        ctx!.stroke();

        ctx!.fillStyle = 'rgba(255,255,255,0.26)';
        ctx!.textAlign = 'left';
        ctx!.fillText(TIERS[tier]!, 14, y - 13);
      }

      // Edges, brightened where the cursor is.
      for (const [ai, bi] of edges) {
        const a = nodes[ai]!;
        const b = nodes[bi]!;
        const glow = Math.max(a.heat, b.heat);
        ctx!.strokeStyle = `rgba(160,180,210,${0.06 + glow * 0.28})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Packets.
      for (const p of packets) {
        const from = nodes[p.path[p.leg]!]!;
        const to = nodes[p.path[p.leg + (p.down ? 1 : -1)]!]!;
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        const colour = p.down ? flow : signal;

        ctx!.beginPath();
        ctx!.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx!.fillStyle = colour;
        ctx!.fill();

        // A short trail back along the leg it is travelling.
        const grad = ctx!.createLinearGradient(from.x, from.y, x, y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, colour);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.2;
        ctx!.globalAlpha = 0.5;
        ctx!.beginPath();
        ctx!.moveTo(from.x + (x - from.x) * 0.6, from.y + (y - from.y) * 0.6);
        ctx!.lineTo(x, y);
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      }

      // Nodes on top.
      for (const n of nodes) {
        if (n.heat > 0.02) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r + 6 + n.heat * 7, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(200,247,81,${n.heat * 0.1})`;
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = '#0f1114';
        ctx!.fill();
        ctx!.strokeStyle =
          n.heat > 0.05 ? `rgba(200,247,81,${0.35 + n.heat * 0.65})` : 'rgba(160,180,210,0.32)';
        ctx!.lineWidth = 1.2;
        ctx!.stroke();

        if (n.tier === TIERS.length - 1) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx!.fillStyle = 'rgba(110,163,255,0.75)';
          ctx!.fill();
        }
      }

      void dt;
    }

    function step(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Heat: rises near the cursor, decays everywhere.
      for (const n of nodes) {
        if (pointer.active) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          const target = Math.max(0, 1 - d / 120);
          if (target > n.heat) n.heat += (target - n.heat) * 0.25;
        }
        n.heat *= 0.94;
      }

      // Advance packets along their leg; reverse at the bottom, retire at the top.
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]!;
        p.t += p.speed * dt;
        if (p.t >= 1) {
          p.t = 0;
          const arrivedAt = p.path[p.leg + (p.down ? 1 : -1)]!;
          nodes[arrivedAt]!.heat = Math.max(nodes[arrivedAt]!.heat, 0.55);
          p.leg += p.down ? 1 : -1;
          if (p.down && p.leg >= p.path.length - 1) p.down = false;
          else if (!p.down && p.leg <= 0) packets.splice(i, 1);
        }
      }

      if (packets.length < (width < 420 ? 2 : 4) && Math.random() < 0.02) spawn();

      drawFrame(dt);
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else if (near && !reduced) start();
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) drawFrame(0);
    });

    layout();

    if (reduced) {
      // A single static frame: the same diagram, holding still.
      packets = [];
      nodes.filter((n) => n.tier === 0 || n.tier === TIERS.length - 1).forEach((n) => (n.heat = 0.3));
      drawFrame(0);
    } else if (near) {
      spawn();
      start();
    }

    ro.observe(host);
    document.addEventListener('visibilitychange', onVisibility);
    if (!coarse && !reduced) {
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [near, reduced, hostRef, TIERS]);

  return (
    <div className="hero__stage" ref={hostRef}>
      <canvas ref={canvasRef} role="img" aria-label={t(ui.heroDiagramAlt)} />
      <span className="hero__corner hero__corner--tl" />
      <span className="hero__corner hero__corner--tr" />
      <span className="hero__corner hero__corner--bl" />
      <span className="hero__corner hero__corner--br" />
      <div className="hero__stage-label" aria-hidden="true">
        <span>
          <b>▾</b> {t(ui.request)}
        </span>
        <span>{t(ui.response)} <b>▴</b></span>
      </div>
    </div>
  );
}
