import type { Metadata } from "next";
import HackathonForm from "@/components/HackathonForm";
import Reveal from "@/components/Reveal";
import { hackathonInfo, hackathonRules, site } from "@/data/content";

export const metadata: Metadata = {
  title: `Hackathon - ${site.name}`,
  description: "Register your team for the Qiskit Fall Fest 2026 hackathon.",
};

export default function HackathonPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 animate-blob rounded-full bg-violet-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 animate-blob rounded-full bg-bloom-600/15 blur-[100px] [animation-delay:3s]" />

      <div className="container-page relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">THE HACKATHON</p>
            <h1 className="font-display text-4xl text-mist-100 sm:text-5xl">
              Register your team
            </h1>
            <p className="mt-4 text-base leading-relaxed text-mist-500">
              Solo or in a team of up to four. Tell us who&rsquo;s hacking and we&rsquo;ll take it
              from there - the challenge details drop once you&rsquo;re registered.
            </p>

            <div className="mt-10 card p-6">
              <p className="font-mono text-[0.65rem] text-dawn-400">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-dawn-400 align-middle" />
                {hackathonInfo.status.toUpperCase()}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">{hackathonInfo.body}</p>
              <div className="mt-5 flex items-baseline gap-2 border-t border-mist-300/10 pt-5">
                <span className="font-display text-3xl bg-gradient-to-r from-violet-400 via-bloom-400 to-dawn-400 bg-clip-text text-transparent">
                  {hackathonInfo.prizePool}
                </span>
                <span className="text-xs text-mist-500">prize pool - {hackathonInfo.prizeNote}</span>
              </div>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">RULES</p>
              <ul className="space-y-3">
                {hackathonRules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-sm text-mist-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bloom-500" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <HackathonForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
