"use client";

import { useState } from "react";
import { faqs } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-mist-300/10 py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">GOOD TO KNOW</p>
            <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">Questions, answered</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-mist-300/10 border-t border-mist-300/10">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q}>
                  <button
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-lg transition-colors ${isOpen ? "text-bloom-400" : "text-mist-100"}`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-2xl text-mist-500 transition-transform duration-300 ${isOpen ? "rotate-45 text-bloom-400" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-mist-500">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
