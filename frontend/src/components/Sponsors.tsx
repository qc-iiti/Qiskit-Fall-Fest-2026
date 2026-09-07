import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";

export default function Sponsors() {
  return (
    <section id="team" className="border-t border-mist-300/10 py-24">
      <Marquee items={["QISKIT FALL FEST 2026", "QC IITI", "IBM QUANTUM", "IIT INDORE"]} />

      <div className="container-page mt-24">
        <Reveal>
          <p className="eyebrow mb-4">BACKED BY</p>
          <h2 className="font-display text-4xl text-mist-100 sm:text-5xl">
            Partners &amp; organizers
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-wrap items-center gap-x-16 gap-y-10">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ibm_quantum_logotype_rev.png`}
              alt="IBM Quantum"
              width={220}
              height={44}
              className="h-9 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
            />
            <div className="flex items-center gap-3 opacity-90 transition-opacity hover:opacity-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/qiskit_white.svg`}
                alt="Qiskit"
                width={36}
                height={36}
              />
              <span className="font-mono text-sm text-mist-100">Qiskit</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16 rounded-2xl border border-mist-300/10 bg-ink-900/50 p-8 sm:p-10">
            <p className="max-w-2xl text-base leading-relaxed text-mist-300">
              Fall Fest is organized end-to-end by QC IITI, the Quantum Computing Club at IIT
              Indore, run as an official IBM Quantum community event, with mentors drawn from our
              research group and industry partners.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
