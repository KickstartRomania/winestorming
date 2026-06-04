import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const cards = [
  {
    stat: "30",
    label: "participants",
    body: "Small enough for everyone to contribute. Large enough for diverse perspectives.",
  },
  {
    stat: "3–5",
    label: "startups",
    body: "A curated selection of founders willing to openly discuss real challenges.",
  },
  {
    stat: "one",
    label: "shared room",
    body: "No breakout sessions. No parallel tracks. One conversation everyone can be part of.",
  },
  {
    stat: "good",
    label: "wine",
    body: "A slower pace, a relaxed atmosphere, and space for better thinking.",
  },
];

export function ExperienceSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full overflow-hidden px-6 py-16 md:py-24">
      {/* Atmospheric swirl */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 flex h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 2.2s ease-out 0.4s",
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="h-full w-full"
          fill="none"
          style={{ animation: inView ? "ws-spin-slow 120s linear infinite" : undefined }}
        >
          <g stroke="var(--wine)" strokeWidth="1" opacity="0.08" fill="none">
            <ellipse cx="300" cy="300" rx="220" ry="120" />
            <ellipse cx="300" cy="300" rx="220" ry="120" transform="rotate(36 300 300)" />
            <ellipse cx="300" cy="300" rx="220" ry="120" transform="rotate(72 300 300)" />
            <ellipse cx="300" cy="300" rx="220" ry="120" transform="rotate(108 300 300)" />
            <ellipse cx="300" cy="300" rx="220" ry="120" transform="rotate(144 300 300)" />
            <circle cx="300" cy="300" r="70" />
          </g>
        </svg>
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">small room. good wine.</span>
            <span className="block italic text-wine">better conversations.</span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Winestorming is intentionally small. Around 30 people, 3–5 startups,
            and an evening built around thoughtful discussion instead of
            presentations.
          </p>
        </div>

        {/* Experience cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="group flex flex-col rounded-3xl border border-wine/10 bg-cream/70 p-8 shadow-[0_18px_48px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/30 hover:shadow-[0_26px_60px_-26px_color-mix(in_oklab,var(--wine)_50%,transparent)]"
              style={revealStyle(inView, 0.4 + i * 0.15)}
            >
              <span className="font-display text-4xl font-semibold text-wine md:text-5xl">
                {card.stat}
              </span>
              <h3 className="mt-2 font-display text-xl text-deep-wine md:text-2xl">
                {card.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/65 md:text-base">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
