"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export type GraphNode = {
  id: string;
  label: string;
  href: string;
  kind: "hub" | "article" | "project";
};

type SimNode = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pinned: boolean;
};

type Star = { x: number; y: number; r: number; tw: number };

const KIND_COLOR: Record<GraphNode["kind"], string> = {
  hub: "#38bdf8",
  article: "#7dd3fc",
  project: "#fbbf24",
};

export function Constellation({ nodes }: { nodes: GraphNode[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const routerRef = useRef(router);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current;
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
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

    let w = 0;
    let h = 0;
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

    /* Simulation nodes: hub pinned near center-left, others orbit out. */
    const sims: SimNode[] = nodes.map((n, i) => {
      const angle = (i / Math.max(1, nodes.length)) * Math.PI * 2 - Math.PI / 2;
      const rad = n.kind === "hub" ? 0 : Math.min(w, h) * 0.3;
      return {
        ...n,
        x: w / 2 + Math.cos(angle) * rad + (Math.random() - 0.5) * 40,
        y: h / 2 + Math.sin(angle) * rad + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
        r: n.kind === "hub" ? 10 : 6,
        pinned: n.kind === "hub",
      };
    });

    const hub = sims.find((s) => s.kind === "hub");
    const edges: [SimNode, SimNode][] = [];
    if (hub) {
      for (const s of sims) {
        if (s !== hub) {
          edges.push([hub, s]);
        }
      }
    }
    const chain = sims.filter((s) => s.kind !== "hub");
    for (let i = 1; i < chain.length; i++) {
      edges.push([chain[i - 1], chain[i]]);
    }

    const stars: Star[] = Array.from({ length: coarse ? 40 : 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      tw: Math.random() * Math.PI * 2,
    }));

    /* Interaction */
    let hovered: SimNode | null = null;
    let dragged: SimNode | null = null;
    let downX = 0;
    let downY = 0;
    let downTime = 0;

    function toLocal(event: MouseEvent | TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const t =
        "touches" in event && event.touches.length > 0
          ? event.touches[0]
          : (event as MouseEvent);
      return { x: (t as MouseEvent).clientX - rect.left, y: (t as MouseEvent).clientY - rect.top };
    }

    function pick(x: number, y: number): SimNode | null {
      for (let i = sims.length - 1; i >= 0; i--) {
        const s = sims[i];
        const dx = s.x - x;
        const dy = s.y - y;
        if (dx * dx + dy * dy < (s.r + 12) ** 2) {
          return s;
        }
      }
      return null;
    }

    function onDown(event: MouseEvent | TouchEvent) {
      const { x, y } = toLocal(event);
      downX = x;
      downY = y;
      downTime = performance.now();
      const hit = pick(x, y);
      if (hit && !hit.pinned) {
        dragged = hit;
      }
    }

    function onMove(event: MouseEvent | TouchEvent) {
      const { x, y } = toLocal(event);
      if (dragged) {
        dragged.x = x;
        dragged.y = y;
        dragged.vx = 0;
        dragged.vy = 0;
        return;
      }
      if (!coarse) {
        hovered = pick(x, y);
        canvas!.style.cursor = hovered ? "pointer" : "default";
      }
    }

    function onUp(event: MouseEvent | TouchEvent) {
      const { x, y } = toLocal(event);
      const moved = Math.hypot(x - downX, y - downY);
      const hit = pick(x, y);
      if (dragged) {
        dragged = null;
      }
      if (moved < 6 && performance.now() - downTime < 500 && hit && hit.kind !== "hub") {
        routerRef.current.push(hit.href);
      }
    }

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onMove, { passive: true });
    canvas.addEventListener("touchend", onUp);

    function step() {
      const cx = w / 2;
      const cy = h / 2;
      for (const s of sims) {
        if (s.pinned || s === dragged) {
          continue;
        }
        let fx = (cx - s.x) * 0.004;
        let fy = (cy - s.y) * 0.004;
        for (const o of sims) {
          if (o === s) {
            continue;
          }
          const dx = s.x - o.x;
          const dy = s.y - o.y;
          const d2 = Math.max(900, dx * dx + dy * dy);
          const f = 2600 / d2;
          fx += (dx / Math.sqrt(d2)) * f;
          fy += (dy / Math.sqrt(d2)) * f;
        }
        for (const [a, b] of edges) {
          if (a !== s && b !== s) {
            continue;
          }
          const o = a === s ? b : a;
          const dx = o.x - s.x;
          const dy = o.y - s.y;
          const d = Math.max(1, Math.hypot(dx, dy));
          const rest = 130;
          const f = (d - rest) * 0.006;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        }
        s.vx = (s.vx + fx) * 0.86;
        s.vy = (s.vy + fy) * 0.86;
        s.x += s.vx;
        s.y += s.vy;
      }
      if (hub) {
        hub.x += (cx - hub.x) * 0.1;
        hub.y += (cy - hub.y) * 0.1;
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const st of stars) {
        const a = 0.25 + 0.2 * Math.sin(time / 900 + st.tw);
        ctx!.fillStyle = `rgba(148, 197, 255, ${a.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      const active = new Set<SimNode>();
      if (hovered) {
        active.add(hovered);
        for (const [a, b] of edges) {
          if (a === hovered) {
            active.add(b);
          }
          if (b === hovered) {
            active.add(a);
          }
        }
      }
      for (const [a, b] of edges) {
        const hot = hovered && (a === hovered || b === hovered);
        ctx!.strokeStyle = hot
          ? "rgba(125, 211, 252, 0.55)"
          : "rgba(125, 211, 252, 0.16)";
        ctx!.lineWidth = hot ? 1.4 : 1;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      for (const s of sims) {
        const hot = hovered === s || active.has(s);
        const r = s.r + (hot ? 3 : 0);
        const glow = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
        const c = KIND_COLOR[s.kind];
        glow.addColorStop(0, s.kind === "hub" ? "rgba(56,189,248,0.5)" : "rgba(125,211,252,0.28)");
        glow.addColorStop(1, "rgba(125,211,252,0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = c;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx!.fill();
        if (s.kind === "hub" || hot) {
          ctx!.font = "600 11px 'JetBrains Mono', monospace";
          ctx!.fillStyle =
            s.kind === "hub" ? "rgba(242,245,249,0.95)" : "rgba(125,211,252,0.95)";
          ctx!.textAlign = "center";
          ctx!.fillText(s.label, s.x, s.y - r - 10);
        }
      }
    }

    if (reduced) {
      for (let i = 0; i < 200; i++) {
        step();
      }
      draw(0);
      return () => {
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        canvas.removeEventListener("touchstart", onDown);
        canvas.removeEventListener("touchmove", onMove);
        canvas.removeEventListener("touchend", onUp);
      };
    }

    let raf = 0;
    function tick(time: number) {
      step();
      draw(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onUp);
    };
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
    />
  );
}
