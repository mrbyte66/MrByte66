"use client";

import { useRef } from "react";

/**
 * Mouse-parallax 3D scene. Layers with `data-depth` translate in
 * screen space while the whole stage rotates slightly in 3D.
 */
export function Scene3D({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  function handleMove(event: React.MouseEvent) {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    if (rafRef.current !== 0) {
      return;
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (!stageRef.current) {
        return;
      }
      stageRef.current.style.setProperty("--rx", `${(-ny * 10).toFixed(2)}deg`);
      stageRef.current.style.setProperty("--ry", `${(nx * 14).toFixed(2)}deg`);
      stageRef.current
        .querySelectorAll<HTMLElement>("[data-depth]")
        .forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? "0");
          layer.style.setProperty("--px", `${(nx * depth).toFixed(1)}px`);
          layer.style.setProperty("--py", `${(ny * depth).toFixed(1)}px`);
        });
    });
  }

  function handleLeave() {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    stage.style.setProperty("--rx", "0deg");
    stage.style.setProperty("--ry", "0deg");
    stage.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      layer.style.setProperty("--px", "0px");
      layer.style.setProperty("--py", "0px");
    });
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="scene"
    >
      {children}
    </div>
  );
}
