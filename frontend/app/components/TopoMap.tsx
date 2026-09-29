/* Server-rendered topographic contours of the loss surface (marching squares). */

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

function descentPoints(steps: number): [number, number][] {
  let x = 5.5;
  let z = 5.0;
  const lr = 0.35;
  const pts: [number, number][] = [[x, z]];
  for (let i = 0; i < steps; i++) {
    const [gx, gz] = gradient(x, z);
    x -= lr * gx;
    z -= lr * gz;
    pts.push([x, z]);
  }
  return pts;
}

const BOUND = 10;
const GRID = 100;
const LEVELS = 13;

function contours(): { d: string; t: number }[] {
  const n = GRID + 1;
  const vals: number[] = new Array(n * n);
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const x = -BOUND + (2 * BOUND * i) / GRID;
      const z = -BOUND + (2 * BOUND * j) / GRID;
      const v = loss(x, z);
      vals[j * n + i] = v;
      if (v < min) {
        min = v;
      }
      if (v > max) {
        max = v;
      }
    }
  }
  const paths: { d: string; t: number }[] = [];
  for (let l = 1; l <= LEVELS; l++) {
    const level = min + ((max - min) * l) / (LEVELS + 1);
    let d = "";
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const x0 = -BOUND + (2 * BOUND * i) / GRID;
        const z0 = -BOUND + (2 * BOUND * j) / GRID;
        const step = (2 * BOUND) / GRID;
        const a = vals[j * n + i] - level;
        const b = vals[j * n + i + 1] - level;
        const c = vals[(j + 1) * n + i + 1] - level;
        const e = vals[(j + 1) * n + i] - level;
        let idx = 0;
        if (a > 0) {
          idx |= 8;
        }
        if (b > 0) {
          idx |= 4;
        }
        if (c > 0) {
          idx |= 2;
        }
        if (e > 0) {
          idx |= 1;
        }
        if (idx === 0 || idx === 15) {
          continue;
        }
        const top: [number, number] = [x0 + (step * a) / (a - b), z0];
        const right: [number, number] = [x0 + step, z0 + (step * b) / (b - c)];
        const bottom: [number, number] = [x0 + (step * e) / (e - c), z0 + step];
        const left: [number, number] = [x0, z0 + (step * a) / (a - e)];
        const seg = (p: [number, number], q: [number, number]) =>
          `M${p[0].toFixed(2)},${p[1].toFixed(2)}L${q[0].toFixed(2)},${q[1].toFixed(2)}`;
        switch (idx) {
          case 1:
          case 14:
            d += seg(left, bottom);
            break;
          case 2:
          case 13:
            d += seg(bottom, right);
            break;
          case 3:
          case 12:
            d += seg(left, right);
            break;
          case 4:
          case 11:
            d += seg(top, right);
            break;
          case 5:
            d += seg(top, left) + seg(bottom, right);
            break;
          case 6:
          case 9:
            d += seg(top, bottom);
            break;
          case 7:
          case 8:
            d += seg(top, left);
            break;
          case 10:
            d += seg(top, right) + seg(left, bottom);
            break;
        }
      }
    }
    paths.push({ d, t: l / (LEVELS + 1) });
  }
  return paths;
}

export function TopoMap({ className = "" }: { className?: string }) {
  const paths = contours();
  const trail = descentPoints(120);
  const trailD =
    trail.map(([x, z], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${z.toFixed(2)}`).join("") + "";
  const [mx, mz] = trail[trail.length - 1];

  return (
    <svg
      viewBox="-10 -10 20 20"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="topo-fade" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="topo-mask">
          <rect x="-10" y="-10" width="20" height="20" fill="url(#topo-fade)" />
        </mask>
      </defs>
      <g mask="url(#topo-mask)" fill="none">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={i === paths.length - 1 ? "#5b9dff" : "#ffffff"}
            strokeOpacity={0.05 + p.t * 0.1}
            strokeWidth={i % 4 === 0 ? 0.035 : 0.02}
            className="topo-flow"
            style={{ animationDelay: `${(i % 5) * 0.6}s` }}
          />
        ))}
        <path
          d={trailD}
          stroke="#5b9dff"
          strokeWidth="0.07"
          strokeLinecap="round"
          strokeDasharray="0.5 0.35"
          className="topo-trail"
        />
        <circle cx={mx} cy={mz} r="0.22" fill="#5b9dff" className="topo-min" />
        <circle
          cx={mx}
          cy={mz}
          r="0.22"
          fill="none"
          stroke="#5b9dff"
          strokeWidth="0.05"
          className="topo-ring"
        />
      </g>
    </svg>
  );
}
