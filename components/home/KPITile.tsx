'use client';

import { useEffect, useRef, useState } from 'react';

type KPITileProps = {
  /** Display value, e.g. "2M+", "10K+", "100s", "2K". */
  value: string;
  /** Caption under the number. */
  label: string;
};

/** Parse "2M+" → { count: 2, suffix: "M+" }, "100s" → { count: 100, suffix: "s" }. */
function parseValue(value: string): { count: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match?.[1]) return { count: 0, suffix: value };
  return { count: Number(match[1]), suffix: match[2] ?? '' };
}

/**
 * Animated counter — eased tick-up from 0 to target when scrolled into view.
 * Runs once, never repeats. Respects prefers-reduced-motion (stays static).
 * SSR renders the final value, so non-JS readers see the real number.
 */
export function KPITile({ value, label }: KPITileProps) {
  const { count, suffix } = parseValue(value);
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || animatedRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        observer.disconnect();

        const duration = 1100;
        const start = performance.now();
        function tick(now: number) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - p) ** 3;
          const v = count * eased;
          // Big numbers (>=10) round to integer. Whole single-digit targets
          // floor to integer (cleaner ramp). Fractional targets (e.g. 1.5)
          // use toFixed(1) so the ramp shows the partial value, not jumps.
          let formatted: string;
          if (count >= 10) {
            formatted = Math.round(v).toString();
          } else if (Number.isInteger(count)) {
            formatted = Math.floor(v).toString();
          } else {
            formatted = v.toFixed(1);
          }
          setDisplay(`${formatted}${suffix}`);
          if (p < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(`${count}${suffix}`);
          }
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [count, suffix]);

  return (
    <div className="kpi-tile">
      <div className="kpi-value" ref={ref}>
        {display}
      </div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}
