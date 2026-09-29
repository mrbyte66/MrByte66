export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-8 font-mono text-xs tracking-[0.3em] whitespace-nowrap text-faint"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
