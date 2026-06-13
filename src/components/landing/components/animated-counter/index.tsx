"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  value,
  suffix,
  durationMs = 900,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const start = performance.now();
    const from = 0;
    const to = value;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const next = Math.round(from + (to - from) * t);
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, durationMs]);

  return (
    <div ref={ref} className="text-4xl font-bold text-[#722F37]">
      {display}
      {suffix ?? ""}
    </div>
  );
}

