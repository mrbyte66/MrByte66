"use client";

import { useEffect, useState } from "react";

/** Typewriter line with blinking caret for the site persona. */
export function Typewriter({
  text,
  className = "",
  delay = 600,
  speed = 34,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = window.requestAnimationFrame(() => setCount(text.length));
      return () => window.cancelAnimationFrame(raf);
    }
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span className="type-caret">▌</span>
    </span>
  );
}
