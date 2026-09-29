"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/** Static SVG face when WebGL is unavailable (e.g. older Safari). */
function StaticFace() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 120 110" className="h-3/4 w-3/4" aria-hidden="true">
        <rect x="14" y="8" width="92" height="72" rx="10" fill="#22252e" />
        <rect x="22" y="16" width="76" height="56" rx="5" fill="#0e1626" />
        <g fill="#7db4ff" className="static-blink">
          <circle cx="46" cy="40" r="6" />
          <circle cx="74" cy="40" r="6" />
        </g>
        <path
          d="M48,58 Q60,68 72,58"
          fill="none"
          stroke="#7db4ff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1="106" y1="30" x2="116" y2="30" stroke="#3a3f4c" strokeWidth="4" />
        <circle cx="117" cy="30" r="3.5" fill="#6fb3ff" />
        <rect x="48" y="80" width="24" height="22" rx="4" fill="#363b48" />
      </svg>
    </div>
  );
}

/** Floating procedural monitor-head android that tracks the cursor and nods on click. */
export function MonitorStage({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      if (!renderer.getContext()) {
        throw new Error("no webgl context");
      }
    } catch {
      setFailed(true);
      return;
    }

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0b, 6, 12);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0.05, 4.3);
    camera.lookAt(0, -0.02, 0);

    scene.add(new THREE.HemisphereLight(0xdfeaff, 0x1a1c22, 1.05));
    const key = new THREE.DirectionalLight(0xffd9b0, 1.6);
    key.position.set(2.2, 3, 3);
    scene.add(key);
    const rim = new THREE.PointLight(0x4d7fff, 14, 12);
    rim.position.set(-2.6, 1.4, -2.2);
    scene.add(rim);

    const disposables: { dispose(): void }[] = [];
    function track<T extends { dispose(): void }>(item: T): T {
      disposables.push(item);
      return item;
    }

    const bodyMat = track(
      new THREE.MeshStandardMaterial({ color: 0x363b48, metalness: 0.6, roughness: 0.45 }),
    );
    const shellMat = track(
      new THREE.MeshStandardMaterial({ color: 0x22252e, metalness: 0.45, roughness: 0.45 }),
    );
    const screenMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0e1626,
        emissive: 0x2a5db0,
        emissiveIntensity: 0.5,
        metalness: 0.1,
        roughness: 0.3,
      }),
    );
    const eyeMat = track(new THREE.MeshBasicMaterial({ color: 0x7db4ff }));
    const smileMat = track(
      new THREE.MeshBasicMaterial({ color: 0x7db4ff, transparent: true, opacity: 0.9 }),
    );
    const hairMat = track(
      new THREE.MeshStandardMaterial({ color: 0x353945, metalness: 0.6, roughness: 0.4 }),
    );
    const antennaMat = track(
      new THREE.MeshStandardMaterial({ color: 0x3a3f4c, metalness: 0.7, roughness: 0.35 }),
    );
    const tipMat = track(
      new THREE.MeshBasicMaterial({ color: 0x6fb3ff, transparent: true, opacity: 0.9 }),
    );
    const glowMat = track(
      new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: 0x3f6fff,
        depthWrite: false,
        opacity: 0.1,
        transparent: true,
      }),
    );

    const root = new THREE.Group();
    const torsoGroup = new THREE.Group();
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.72;
    root.add(torsoGroup, headGroup);
    scene.add(root);

    const torso = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.2, 0.5, 8, 24)), bodyMat);
    torso.position.y = -0.28;
    torsoGroup.add(torso);

    const shoulders = new THREE.Mesh(
      track(new THREE.CapsuleGeometry(0.075, 0.42, 6, 16)),
      bodyMat,
    );
    shoulders.rotation.z = Math.PI / 2;
    shoulders.position.y = 0.12;
    torsoGroup.add(shoulders);

    const neck = new THREE.Mesh(track(new THREE.CylinderGeometry(0.065, 0.08, 0.28, 20)), bodyMat);
    neck.position.y = 0.32;
    torsoGroup.add(neck);

    const collar = new THREE.Mesh(track(new THREE.TorusGeometry(0.09, 0.02, 10, 28)), hairMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.2;
    torsoGroup.add(collar);

    const hairGeo = track(new THREE.BoxGeometry(0.055, 0.5, 0.16));
    const hairL = new THREE.Mesh(hairGeo, hairMat);
    hairL.position.set(-0.33, 0.22, -0.06);
    hairL.rotation.set(0, 0.15, 0.08);
    const hairR = new THREE.Mesh(hairGeo, hairMat);
    hairR.position.set(0.33, 0.22, -0.06);
    hairR.rotation.set(0, -0.15, -0.08);
    torsoGroup.add(hairL, hairR);

    const shell = new THREE.Mesh(track(new RoundedBoxGeometry(0.74, 0.56, 0.5, 4, 0.07)), shellMat);
    headGroup.add(shell);

    const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(0.6, 0.42)), screenMat);
    screen.position.z = 0.252;
    headGroup.add(screen);

    const eyeGeo = track(new THREE.CircleGeometry(0.034, 24));
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.13, 0.05, 0.256);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.13, 0.05, 0.256);
    headGroup.add(eyeL, eyeR);

    /* Torus arc starts at +X, so 1.125PI centers a 0.75PI arc on the bottom for a smile. */
    const smile = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.065, 0.0075, 10, 32, Math.PI * 0.75)),
      smileMat,
    );
    smile.position.set(0, -0.1, 0.256);
    smile.rotation.z = Math.PI * 1.125;
    headGroup.add(smile);

    const rod = new THREE.Mesh(track(new THREE.CylinderGeometry(0.011, 0.011, 0.26, 12)), antennaMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(0.49, 0.14, 0);
    headGroup.add(rod);
    const mount = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 12)),
      antennaMat,
    );
    mount.rotation.z = Math.PI / 2;
    mount.position.set(0.37, 0.14, 0);
    headGroup.add(mount);
    const tip = new THREE.Mesh(track(new THREE.SphereGeometry(0.028, 16, 16)), tipMat);
    tip.position.set(0.63, 0.14, 0);
    headGroup.add(tip);

    const glow = new THREE.Mesh(track(new THREE.CircleGeometry(0.6, 48)), glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -0.98;
    scene.add(glow);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const disposeAll = () => {
      ro.disconnect();
      for (const item of disposables) {
        item.dispose();
      }
      renderer.dispose();
    };

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ro = new ResizeObserver(() => {
      resize();
      if (isReduced) {
        renderer.render(scene, camera);
      }
    });
    ro.observe(container);

    if (isReduced) {
      renderer.render(scene, camera);
      return disposeAll;
    }

    const mouse = { x: 0, y: 0 };
    let lastMouseMove = Number.NEGATIVE_INFINITY;
    let nodStart = Number.NEGATIVE_INFINITY;
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      lastMouseMove = performance.now();
    };
    const onClick = () => {
      nodStart = performance.now();
    };
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    const startT = performance.now();
    let raf = 0;
    let headBaseX = 0;
    let headBaseY = 0;
    let eyeOpen = 1;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const t = (now - startT) / 1000;

      /* Autonomous wander when the mouse is idle: motion is always visible. */
      const idle = now - lastMouseMove > 3000;
      const targetX = idle ? Math.sin(now / 2400) * 0.7 : mouse.x;
      const targetY = idle ? Math.cos(now / 3100) * 0.45 : mouse.y;

      headBaseY += (targetX * 0.55 - headBaseY) * 0.06;
      headBaseX += (targetY * 0.32 - headBaseX) * 0.06;
      const sinceNod = now - nodStart;
      const nod = sinceNod >= 0 && sinceNod <= 600 ? Math.sin((sinceNod / 600) * Math.PI) * 0.38 : 0;
      headGroup.rotation.y = headBaseY;
      headGroup.rotation.x = headBaseX + nod;

      eyeL.position.x = -0.13 + targetX * 0.055;
      eyeR.position.x = 0.13 + targetX * 0.055;
      eyeL.position.y = 0.05 - targetY * 0.04;
      eyeR.position.y = 0.05 - targetY * 0.04;
      const blinkTarget = t % 3.4 > 3.24 ? 0.08 : 1;
      eyeOpen += (blinkTarget - eyeOpen) * 0.55;
      eyeL.scale.y = eyeOpen;
      eyeR.scale.y = eyeOpen;
      smile.scale.setScalar(1 + nod * 0.4);

      root.position.y = Math.sin(t * 1.4) * 0.045;
      root.rotation.y = Math.sin(t * 0.6) * 0.02;
      torsoGroup.rotation.y = -headBaseY * 0.18;
      torsoGroup.rotation.z = Math.sin(t * 0.8) * 0.015;

      screenMat.emissiveIntensity = 0.5 + Math.sin(t * 7.3) * 0.03 + Math.sin(t * 17.7) * 0.02;
      tipMat.opacity = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 5));
      tip.scale.setScalar(1 + 0.15 * Math.sin(t * 5));
      glowMat.opacity = 0.09 + Math.sin(t * 1.4) * 0.015;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      disposeAll();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      {failed ? (
        <StaticFace />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      )}
    </div>
  );
}
