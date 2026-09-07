import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-mist-300/10 bg-ink-900/40">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/qiskit_white.svg`}
              alt="Qiskit pictogram"
              width={28}
              height={28}
            />
            <span className="font-display text-lg text-mist-100">Qiskit Fall Fest &middot; {site.org}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-mist-500">
            {site.description}
          </p>
          <p className="mt-6 font-mono text-xs text-mist-500">{site.dates}</p>
          <p className="font-mono text-xs text-mist-500">{site.location}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-mist-300 hover:text-mist-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Take part</p>
          <ul className="space-y-3">
            <li>
              <Link href={site.registerUrl} className="text-sm text-mist-300 hover:text-mist-100">
                Register to attend
              </Link>
            </li>
            <li>
              <Link href={site.hackathonUrl} className="text-sm text-mist-300 hover:text-mist-100">
                Hackathon sign-up
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.socials.email}`} className="text-sm text-mist-300 hover:text-mist-100">
                Contact organizers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-3">
            <li>
              <a href={site.socials.github} className="text-sm text-mist-300 hover:text-mist-100">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.socials.instagram} className="text-sm text-mist-300 hover:text-mist-100">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.socials.linkedin} className="text-sm text-mist-300 hover:text-mist-100">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist-300/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-mist-500">
            &copy; {new Date().getFullYear()} {site.orgFull}. Built by students, for students.
          </p>
          <div className="flex items-center gap-2 opacity-80">
            <span className="font-mono text-[0.65rem] text-mist-500">In partnership with</span>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ibm_quantum_logotype_rev.png`}
              alt="IBM Quantum"
              width={100}
              height={20}
              className="h-4 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
