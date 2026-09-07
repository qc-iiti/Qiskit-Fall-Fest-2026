"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-mist-300/10 shadow-[0_8px_30px_-15px_rgba(108,76,224,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-bloom-500/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/qiskit_white.svg`}
              alt="Qiskit pictogram"
              width={34}
              height={34}
              className="relative transition-transform duration-300 group-hover:rotate-[20deg]"
            />
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[1rem] tracking-wide text-mist-500">{site.org}</span>
            <span className="font-mono text-[1rem] tracking-wide text-mist-100">Qiskit Fall Fest 26</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-mono text-s tracking-wide text-mist-300 transition-colors hover:text-mist-100"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-bloom-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={site.hackathonUrl} className="btn-secondary !px-5 !py-2.5 text-xs">
            Hackathon
          </Link>
          <Link href={site.registerUrl} className="btn-primary !px-5 !py-2.5 text-xs">
            Register
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mist-300/20 transition-colors hover:border-bloom-400/50 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-mist-100 transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-4 bg-mist-100 transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-mist-300/10 bg-ink-950/95 transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-mono text-sm text-mist-300 hover:bg-mist-100/5 hover:text-mist-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-6 pb-6">
            <Link href={site.hackathonUrl} className="btn-secondary w-full">
              Hackathon registration
            </Link>
            <Link href={site.registerUrl} className="btn-primary w-full">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
