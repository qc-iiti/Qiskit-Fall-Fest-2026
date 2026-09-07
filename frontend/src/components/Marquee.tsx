type MarqueeProps = {
  items: string[];
  repeat?: number;
};

export default function Marquee({ items, repeat = 2 }: MarqueeProps) {
  // Repeat the source list enough times that one "half" of the track is
  // guaranteed to be wider than any reasonable viewport. Then duplicate
  // that half once more so the two halves are identical and the
  // translateX(-50%) loop wraps with no visible seam or gap.
  const half = Array.from({ length: repeat }, () => items).flat();
  const loop = [...half, ...half];

  return (
    <div className="relative overflow-hidden border-y border-mist-300/10 bg-ink-950 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= half.length}
            className="flex items-center gap-10 font-mono text-xs tracking-wide text-mist-500"
          >
            {item}
            <span className="text-bloom-500">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}