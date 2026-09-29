"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) {
      return;
    }
    let raf = 0;
    function update() {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar!.style.transform = `scaleX(${progress})`;
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
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
    />
  );
}
