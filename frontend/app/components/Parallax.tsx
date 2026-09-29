"use client";

import { useEffect, useRef } from "react";

/** Scroll parallax: layer drifts vertically at a fraction of scroll speed. */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let raf = 0;
    function update() {
      raf = 0;
      const rect = el!.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el!.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
    function onScroll() {
      if (raf === 0) {
        raf = requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) {
        cancelAnimationFrame(raf);
      }
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
