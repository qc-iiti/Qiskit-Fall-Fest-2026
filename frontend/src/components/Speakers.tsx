import { speakers } from "@/data/content";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export default function Speakers() {
  return (
    <section id="speakers" className="border-t border-mist-300/10 py-24">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-4">WHO&rsquo;S TALKING</p>
          <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">Speakers &amp; mentors</h2>
          <p className="mt-4 max-w-lg text-sm text-mist-500">
            Final lineup drops closer to the event. Here&rsquo;s the shape of who you&rsquo;ll hear from.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist-300/10 bg-mist-300/10 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, i) => (
            <Reveal key={i} delay={i * 90} className="h-full">
              <TiltCard className="card-glow group h-full bg-ink-950 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-bloom-500/30 font-display text-lg text-mist-100 transition-transform duration-500 group-hover:rotate-[360deg]">
                  {speaker.org.slice(0, 1)}
                </div>
                <h3 className="mt-5 font-display text-lg text-mist-100">{speaker.name}</h3>
                <p className="mt-1 text-sm text-mist-500">
                  {speaker.role} &middot; {speaker.org}
                </p>
                <p className="mt-3 font-mono text-[0.7rem] text-bloom-400">{speaker.topic}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
