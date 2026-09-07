import { site } from "@/data/content";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const pillars = [
  {
    title: "Learn by running circuits",
    body: "Every workshop ends with your code executing on real quantum hardware, not just simulators.",
    icon: "\u269B",
  },
  {
    title: "Meet people building this field",
    body: "Talks and office hours with researchers and engineers working in quantum computing today.",
    icon: "\u2727",
  },
  {
    title: "Ship something in the challenge",
    body: "The hackathon turns what you learn into a working project you can put on your resume.",
    icon: "\u25C8",
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-mist-300/10 py-24">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">ABOUT THE FEST</p>
            <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">
              A festival for people curious about quantum, not just people who already know it.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mist-300">
              {site.orgFull} runs Fall Fest as an on-ramp: a hybrid program that takes a complete
              beginner from &ldquo;what is a qubit&rdquo; to submitting a working project, alongside
              deeper sessions for people already writing quantum code.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-mist-300/10 bg-mist-300/10 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100} className="h-full">
              <TiltCard className="card-glow group h-full bg-ink-950 p-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-bloom-500/20 text-lg text-bloom-400 transition-transform duration-300 group-hover:scale-110">
                  {pillar.icon}
                </span>
                <h3 className="mt-5 font-display text-xl text-mist-100">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-500">{pillar.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
