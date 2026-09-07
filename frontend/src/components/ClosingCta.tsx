import Link from "next/link";
import { site } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-mist-300/10 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-violet-600/15 blur-[110px]" />
      <div className="container-page relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl text-mist-100 sm:text-5xl">
            Seats are limited. <span className="italic shimmer-text">Save yours.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-mist-500">
            Registration takes under two minutes. You can register for the hackathon separately
            once your team is set.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={site.registerUrl} className="btn-primary">
              Register to attend
            </Link>
            <Link href={site.hackathonUrl} className="btn-secondary">
              Register for the hackathon
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
