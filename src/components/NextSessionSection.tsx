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
  { label: "date", value: "Coming soon" },
  { label: "capacity", value: "~30 participants" },
  { label: "startups", value: "3–5 selected startups" },
];

const options = [
  {
    label: "apply as a startup",
    body: "Bring your startup and 1–3 challenges you’d like the room to help refine.",
    cta: "Apply as a startup",
    href: "#apply",
    primary: true,
  },
  {
    label: "join as a participant",
    body: "Contribute ideas, perspectives, and feedback while taking part in real startup conversations.",
    cta: "Join as a participant",
    href: "#join",
    primary: false,
  },
];

export function NextSessionSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section id="apply" className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-body text-xs uppercase tracking-[0.4em] text-wine"
            style={revealStyle(inView, 0)}
          >
            08 / next session
          </p>

          <h2
            className="mt-8 font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
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

        {/* Event details card */}
        <div
          className="mx-auto mt-16 max-w-4xl rounded-3xl border border-wine/15 bg-cream/70 p-10 shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm md:mt-20 md:p-16"
          style={revealStyle(inView, 0.36)}
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
            {details.map((detail) => (
              <div key={detail.label} className="text-center sm:text-left">
                <p className="font-body text-xs uppercase tracking-[0.3em] text-wine">
                  {detail.label}
                </p>
                <p className="mt-3 font-display text-2xl text-deep-wine md:text-3xl">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation options */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
          {options.map((option, i) => (
            <div
              key={option.label}
              className="group flex flex-col rounded-3xl border border-wine/15 bg-cream/70 p-8 shadow-[0_18px_48px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-wine/40 hover:shadow-[0_30px_70px_-26px_color-mix(in_oklab,var(--wine)_55%,transparent)] md:p-12"
              style={revealStyle(inView, 0.5 + i * 0.16)}
            >
              <h3 className="font-display text-2xl text-deep-wine md:text-3xl">
                {option.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-charcoal/70 md:text-lg">
                {option.body}
              </p>
              <div className="mt-auto pt-10">
                <a
                  href={option.href}
                  className={
                    option.primary
                      ? "group/cta inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--wine)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-wine hover:shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--wine)_70%,transparent)]"
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

        {/* Supporting statement */}
        <p
          className="mx-auto mt-24 max-w-2xl text-center font-display text-2xl leading-snug text-deep-wine md:mt-32 md:text-4xl"
          style={revealStyle(inView, 0.5 + options.length * 0.16 + 0.15)}
        >
          Some people bring questions.
          <br />
          <span className="italic text-wine">
            Others help uncover better answers.
          </span>
        </p>
      </div>
    </section>
  );
}
