import { useEffect, useRef, useState } from 'react';

/** Tracks the user's motion preference and reacts if they change it mid-session. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * One observer for the whole document instead of one per element.
 * Elements opt in with `data-reveal`; the class is added once and the element
 * is unobserved, so nothing keeps running after it has been seen.
 */
export function useRevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Returns the id of the section currently occupying the reading position. */
export function useActiveSection(ids: readonly string[]): { active: string; progress: number } {
  const [active, setActive] = useState(ids[0] ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = ids[0] ?? '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return { active, progress };
}

/** True while the element is anywhere near the viewport — used to pause offscreen work. */
export function useNearViewport<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => setNear(entries[0]?.isIntersecting ?? true), {
      rootMargin: '200px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, near };
}
