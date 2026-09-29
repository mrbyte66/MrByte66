"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Loss-surface motif: f(x, z) with hills and one deep valley. */
function loss(x: number, z: number): number {
  const g = (cx: number, cz: number, s: number, a: number) =>
    a * Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / s);
  return (
    g(0, 0, 8, 3.2) +
    g(-3.5, 2.5, 3, 1.8) +
    g(3.2, -2.8, 2.5, 2.2) +
    g(1.5, 3.5, 1.2, 1.0) -
    g(-0.8, -1.2, 2.0, 2.6) +
    0.15 * Math.sin(x * 1.3) * Math.cos(z * 1.1)
  );
}

function gradient(x: number, z: number): [number, number] {
  const e = 0.001;
  return [
    (loss(x + e, z) - loss(x - e, z)) / (2 * e),
    (loss(x, z + e) - loss(x, z - e)) / (2 * e),
  ];
}

/* Numerically descend from a high point → the optimizer's trail. */
function descentPath(steps: number): THREE.Vector3[] {
  let x = 5.5;
  let z = 5.0;
  const lr = 0.35;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < steps; i++) {
    const [gx, gz] = gradient(x, z);
    x -= lr * gx;
    z -= lr * gz;
    pts.push(new THREE.Vector3(x, loss(x, z) + 0.07, z));
  }
  return pts;
}

const TRAIL_STEPS = 160;

export function LossLandscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudIterRef = useRef<HTMLSpanElement>(null);
  const hudLossRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
    } catch {
      wrap.style.display = "none";
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05070d, 18, 46);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);

    /* Surface */
    const SEG = coarse ? 80 : 140;
    const SIZE = 20;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    let minH = Infinity;
    let maxH = -Infinity;
    const heights: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const h = loss(pos.getX(i), pos.getZ(i));
      heights.push(h);
      if (h < minH) {
        minH = h;
      }
      if (h > maxH) {
        maxH = h;
      }
    }
    const low = new THREE.Color("#123a8f");
    const mid = new THREE.Color("#155e9e");
    const high = new THREE.Color("#67e8f9");
    const colors = new Float32Array(pos.count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const h = heights[i];
      pos.setY(i, h);
      const t = (h - minH) / Math.max(0.001, maxH - minH);
      if (t < 0.5) {
        tmp.copy(low).lerp(mid, t * 2);
      } else {
        tmp.copy(mid).lerp(high, (t - 0.5) * 2);
      }
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const surface = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ vertexColors: true }),
    );
    scene.add(surface);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.07,
      }),
    );
    scene.add(wire);

    /* Descent trail */
    const trail = descentPath(TRAIL_STEPS);
    const trailGeo = new THREE.BufferGeometry().setFromPoints(trail);
    const trailLine = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.9,
      }),
    );
    scene.add(trailLine);

    /* Traveler marker */
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfcd34d }),
    );
    scene.add(marker);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.25,
      }),
    );
    scene.add(halo);

    /* Stars */
    const starCount = coarse ? 250 : 500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 1] = Math.random() * 30 - 2;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.06,
          transparent: true,
          opacity: 0.6,
        }),
      ),
    );

    /* Camera journey: overview → swoop into the valley. */
    const end = trail[TRAIL_STEPS - 1];
    const camCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(11, 10, 13),
      new THREE.Vector3(5.5, 6.2, 6.5),
      new THREE.Vector3(1.2, 3.6, 2.2),
      new THREE.Vector3(end.x + 1.4, end.y + 1.7, end.z + 1.6),
    ]);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    const camPos = new THREE.Vector3();
    const lookAt = new THREE.Vector3();
    let smooth = -1;

    function scrollTarget(): number {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        return 0;
      }
      return Math.min(1, Math.max(0, window.scrollY / max));
    }

    function render(progress: number) {
      camCurve.getPoint(progress, camPos);
      camera.position.copy(camPos);
      const ahead = Math.min(1, progress + 0.05);
      const ti = Math.min(
        TRAIL_STEPS - 1,
        Math.floor(ahead * (TRAIL_STEPS - 1)),
      );
      lookAt.copy(trail[ti]);
      camera.lookAt(lookAt);
      marker.position.copy(trail[Math.floor(progress * (TRAIL_STEPS - 1))]);
      halo.position.copy(marker.position);
      const pulse = 1 + 0.25 * Math.sin(performance.now() / 300);
      halo.scale.setScalar(pulse);

      if (hudIterRef.current && hudLossRef.current && hudBarRef.current) {
        const iter = Math.floor(progress * (TRAIL_STEPS - 1));
        hudIterRef.current.textContent = `iter ${iter}/${TRAIL_STEPS - 1}`;
        hudLossRef.current.textContent = `loss ${trail[iter].y.toFixed(3)} ↓`;
        hudBarRef.current.style.transform = `scaleX(${progress})`;
      }
      renderer.render(scene, camera);
    }

    if (reduced) {
      render(0.3);
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    function tick() {
      const target = scrollTarget();
      smooth = smooth < 0 ? target : smooth + (target - smooth) * 0.055;
      render(smooth);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      geo.dispose();
      trailGeo.dispose();
      starGeo.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full"
      />
      <div className="fixed bottom-5 left-6 z-10 hidden font-mono text-[11px] text-sky-200/70 sm:block">
        <div className="flex items-center gap-3">
          <span>gradient descent</span>
          <span ref={hudIterRef}>iter 0/159</span>
          <span ref={hudLossRef}>loss —</span>
        </div>
        <div className="mt-2 h-px w-44 bg-white/10">
          <div
            ref={hudBarRef}
            className="h-px w-full origin-left bg-amber-300/80"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
