import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const details = [
  { label: "location", value: "Bucharest" },
  { label: "date", value: "18 June 2026" },
  { label: "capacity", value: "~30 participants" },
  { label: "startups", value: "3–5 selected startups" },
];

const options = [
  {
    label: "apply as a startup",
    body: "Bring your startup and 1–3 challenges you’d like the room to help refine.",
    cta: "Apply as a startup",
    href: "#apply",
    primary: false,
  },
  {
    label: "join as a participant",
    body: "Contribute ideas, perspectives, and feedback while taking part in real startup conversations.",
    cta: "Join as a participant",
    href: "https://luma.com/cll39l2p",
    external: true,
    primary: false,
  },
];

export function NextSessionSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section id="next-session" className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">join the next</span>
            <span className="block italic text-wine">winestorming.</span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            A curated evening of startup conversations, collaborative thinking,
            and thoughtful discussion.
          </p>
        </div>

        {/* Event details — open editorial layout */}
        <div
          className="mx-auto mt-16 max-w-4xl border-y border-wine/15 py-12 md:mt-20 md:py-16"
          style={revealStyle(inView, 0.36)}
        >
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 md:gap-y-0">
            {details.map((detail, i) => (
              <div
                key={detail.label}
                className={`px-4 text-center md:px-8 ${
                  i > 0 ? "md:border-l md:border-wine/15" : ""
                }`}
              >
                <p className="font-body text-xs uppercase tracking-[0.3em] text-wine">
                  {detail.label}
                </p>
                <p className="mt-3 font-display text-xl text-deep-wine md:text-2xl">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation options */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {options.map((option, i) => (
            <div
              key={option.label}
              className={
                option.primary
                  ? "group flex flex-col rounded-3xl bg-deep-wine p-8 shadow-[0_30px_70px_-26px_color-mix(in_oklab,var(--wine)_70%,transparent)] transition-all duration-300 hover:-translate-y-1.5 md:p-12"
                  : "group flex flex-col rounded-3xl border border-wine/25 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-wine/45 hover:bg-wine/[0.03] md:p-12"
              }
              style={revealStyle(inView, 0.5 + i * 0.16)}
            >
              <h3
                className={`font-display text-2xl md:text-3xl ${
                  option.primary ? "text-cream" : "text-deep-wine"
                }`}
              >
                {option.label}
              </h3>
              <p
                className={`mt-5 text-base leading-relaxed md:text-lg ${
                  option.primary ? "text-cream/75" : "text-charcoal/70"
                }`}
              >
                {option.body}
              </p>
              <div className="mt-auto pt-10">
                <a
                  href={option.href}
                  target={option.href?.startsWith("http") ? "_blank" : undefined}
                  rel={option.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={
                    option.primary
                      ? "group/cta inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-deep-wine shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream/90"
                      : "group/cta inline-flex items-center gap-2 rounded-full border border-wine/30 px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-wine transition-all duration-300 hover:-translate-y-0.5 hover:border-wine/60 hover:bg-wine/5"
                  }
                >
                  {option.cta}
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
