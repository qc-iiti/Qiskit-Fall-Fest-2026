import { decade } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function Decade() {
  return (
    <section id="decade" className="border-t border-mist-300/10 py-24">
      <div className="container-page grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">A DECADE OF QISKIT</p>
            <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">{decade.heading}</h2>
            <p className="mt-6 text-base leading-relaxed text-mist-300">{decade.body}</p>
          </div>
        </Reveal>

        <ol className="relative border-l border-mist-300/15 pl-8">
          {decade.milestones.map((milestone, i) => (
            <Reveal key={milestone.year} delay={i * 120} as="li" className="relative pb-10 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1 flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-bloom-500/60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-bloom-500" />
              </span>
              <p className="font-mono text-sm text-bloom-400">{milestone.year}</p>
              <p className="mt-1 text-base text-mist-300">{milestone.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
