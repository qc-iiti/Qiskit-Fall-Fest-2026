import Image from "next/image";
import Link from "next/link";
import { site, stats } from "@/data/content";
import QuantumField from "@/components/QuantumField";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-20">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] animate-blob rounded-full bg-violet-600/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[24rem] w-[24rem] animate-blob rounded-full bg-bloom-600/20 blur-[100px] [animation-delay:2s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-dawn-400/10 blur-[100px] [animation-delay:4s]" />

      <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <QuantumField />

      <div className="container-page relative grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bloom-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bloom-500" />
              </span>
              <span>QISKIT FALL FEST 2026</span>
              <span className="text-mist-300/30">/</span>
              <span>{site.org}</span>
              <span className="text-mist-300/30">/</span>
              <span>{site.dates}</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-5xl leading-[1.05] text-mist-100 sm:text-6xl lg:text-7xl">
              Where minds
              <br />
              <span className="italic shimmer-text">meet on the cloud.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-mist-300">
              {site.description}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={site.registerUrl} className="btn-primary">
                Register to attend
              </Link>
              <Link href={site.hackathonUrl} className="btn-secondary">
                Enter the hackathon
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl text-mist-100 transition-colors group-hover:text-bloom-400">
                    <AnimatedCounter value={stat.value} />
                  </dd>
                  <dd className="mt-1 font-mono text-[0.7rem] text-mist-500">{stat.label}</dd>
                  {"note" in stat && stat.note && (
                    <dd className="mt-0.5 max-w-[11rem] font-mono text-[0.6rem] leading-relaxed text-mist-500/70">
                      {stat.note}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
          <div className="absolute inset-6 animate-pulse-glow rounded-full bg-bloom-500/90" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-violet-400/30" />
          <div className="absolute inset-4 animate-spin-reverse rounded-full border border-dotted border-dawn-400/30" />
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/qiskit_black.svg`}
            alt="Qiskit pictogram"
            width={140}
            height={140}
            className="relative animate-float"
          />
          <span className="absolute left-[14%] top-[20%] font-mono text-sm text-ink-950">2026</span>
          <span className="absolute right-[14%] top-[20%] font-mono text-sm text-ink-950">2026</span>
          <div className="absolute -right-6 -top-6 h-16 w-16 animate-float rounded-full border border-violet-400/40 [animation-delay:1s] sm:-right-10 sm:-top-10 sm:h-24 sm:w-24" />
          <div className="absolute -bottom-4 -left-8 h-10 w-10 animate-float rounded-full bg-violet-500/30 blur-md [animation-delay:2s]" />
        </div>
      </div>
    </section>
  );
}
