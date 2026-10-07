import Image from "next/image";
import { speakers } from "@/data/content";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
    </svg>
  );
}

export default function Speakers() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
          {speakers.map((speaker, i) => {
            const imageSrc = speaker.image
              ? `${basePath}${speaker.image.replace(/^\/public/, "")}`
              : null;

            return (
              <Reveal key={i} delay={i * 90} className="h-full">
                <TiltCard className="card-glow group relative flex h-full flex-col justify-between bg-ink-950 p-6">
                  <div>
                    {/* Avatar circle */}
                    {imageSrc ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-mist-300/20 bg-ink-900 transition-transform duration-500 group-hover:scale-105 [border-radius:50%]">
                        <Image
                          src={imageSrc}
                          alt={speaker.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover object-center [border-radius:50%]"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-bloom-500/30 font-display text-lg text-mist-100 transition-transform duration-500 group-hover:rotate-[360deg] [border-radius:50%]">
                        {speaker.org.slice(0, 1)}
                      </div>
                    )}

                    {/* Speaker name with LinkedIn icon */}
                    <div className="mt-5 flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg text-mist-100">{speaker.name}</h3>
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target={speaker.linkedin === "#" ? undefined : "_blank"}
                          rel={speaker.linkedin === "#" ? undefined : "noopener noreferrer"}
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-mist-300/10 bg-ink-900/60 text-mist-400 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/20 hover:text-mist-100 focus:outline-none focus:ring-1 focus:ring-violet-400"
                          aria-label={`${speaker.name} LinkedIn`}
                          title={`${speaker.name} LinkedIn`}
                        >
                          <LinkedInIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-mist-500">
                      {speaker.role} &middot; {speaker.org}
                    </p>
                  </div>

                  <p className="mt-4 font-mono text-[0.7rem] text-bloom-400">{speaker.topic}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

