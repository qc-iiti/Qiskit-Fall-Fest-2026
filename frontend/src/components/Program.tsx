"use client";

import { useState } from "react";
import { program, type ProgramSession } from "@/data/content";
import Reveal from "@/components/Reveal";

const trackColor: Record<ProgramSession["track"], string> = {
  Workshop: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  Talk: "text-bloom-400 border-bloom-400/30 bg-bloom-400/10",
  Interactive: "text-dawn-400 border-dawn-400/30 bg-dawn-400/10",
  Ceremony: "text-mist-300 border-mist-300/30 bg-mist-300/10",
  Challenge: "text-ember-400 border-ember-400/30 bg-ember-400/10",
};

export default function Program() {
  const [activeDay, setActiveDay] = useState(0);
  const day = program[activeDay];

  return (
    <section id="program" className="border-t border-mist-300/10 py-24">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">SCHEDULE</p>
              <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">
                Three days, one program
              </h2>
            </div>

            <div className="flex gap-2">
              {program.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(i)}
                  className={`rounded-full px-5 py-2.5 font-mono text-xs transition-all duration-300 ${
                    activeDay === i
                      ? "scale-105 bg-bloom-500 text-ink-950 shadow-[0_6px_20px_-6px_rgba(255,79,160,0.6)]"
                      : "border border-mist-300/20 text-mist-300 hover:border-mist-300/50 hover:-translate-y-0.5"
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div key={activeDay} className="animate-fade-up">
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs text-mist-500">{day.date}</p>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2.5 py-0.5 font-mono text-[0.6rem] text-violet-400">
              {day.mode}
            </span>
            {day.tentative && (
              <span className="flex items-center gap-1.5 rounded-full border border-dawn-400/30 bg-dawn-400/10 px-2.5 py-0.5 font-mono text-[0.6rem] text-dawn-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-dawn-400" />
                TENTATIVE - full timings soon
              </span>
            )}
          </div>

          <div className="mt-8 divide-y divide-mist-300/10 rounded-2xl border border-mist-300/10">
            {day.sessions.map((session, i) => (
              <div
                key={session.title}
                style={{ animationDelay: `${i * 70}ms` }}
                className="flex animate-fade-up flex-col gap-3 p-6 transition-colors duration-200 hover:bg-mist-100/[0.03] sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="w-32 shrink-0 font-mono text-sm text-mist-500">
                  {session.time ?? "\u2014"}
                </span>
                <span className="flex-1 text-base text-mist-100">{session.title}</span>
                <span
                  className={`w-fit shrink-0 rounded-full border px-3 py-1 font-mono text-[0.65rem] ${trackColor[session.track]}`}
                >
                  {session.track}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
