"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
};

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const blobs: Blob[] = [
      { x: 0.2, y: 0.3, r: 0.45, dx: 0.00016, dy: 0.00011, color: "198, 241, 53" },
      { x: 0.85, y: 0.6, r: 0.5, dx: -0.00012, dy: 0.00015, color: "99, 102, 241" },
      { x: 0.6, y: 0.1, r: 0.35, dx: 0.0001, dy: -0.00013, color: "34, 211, 238" },
    ];

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const g = ctx!.createRadialGradient(
          b.x * w,
          b.y * h,
          0,
          b.x * w,
          b.y * h,
          b.r * Math.max(w, h),
        );
        g.addColorStop(0, `rgba(${b.color}, 0.14)`);
        g.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }
    }

    if (reduced) {
      draw();
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    function tick() {
      for (const b of blobs) {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -0.1 || b.x > 1.1) {
          b.dx *= -1;
        }
        if (b.y < -0.1 || b.y > 1.1) {
          b.dy *= -1;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
