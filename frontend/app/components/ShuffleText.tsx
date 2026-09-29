"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_/[]{}=+*^?#";

/** LISA-style letter shuffle: glyphs settle into the final text. */
export function ShuffleText({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let frame = 0;
    const total = text.length * 3 + 18;
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame / total) * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " " || i < settled) {
            s += text[i];
          } else {
            s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setOut(s);
        if (frame >= total) {
          window.clearInterval(interval);
          setOut(text);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  return <span className={className}>{out}</span>;
}
