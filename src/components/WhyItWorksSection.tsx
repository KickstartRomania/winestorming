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
    label: "real challenges",
    body: "Startups bring actual decisions they are struggling with, not polished presentations.",
  },
  {
    label: "diverse perspectives",
    body: "Every participant brings a different background, creating richer conversations and unexpected insights.",
  },
  {
    label: "collaborative thinking",
    body: "Ideas are explored together rather than judged from the audience.",
  },
  {
    label: "clarity over certainty",
    body: "The goal isn’t finding the perfect answer. It’s leaving with better questions and stronger next steps.",
  },
];

export function WhyItWorksSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full overflow-hidden px-6 py-28 md:py-40">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-body text-xs uppercase tracking-[0.4em] text-wine"
            style={revealStyle(inView, 0)}
          >
            03 / why it works
          </p>

          <h2
            className="mt-8 font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">most startup events</span>
            <span className="block">showcase answers.</span>
            <span className="mt-3 block italic text-wine">
              we explore questions.
            </span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Founders rarely need another room full of people telling them what to
            do. They need thoughtful questions, diverse perspectives, and honest
            conversations that help them see their challenges differently.
          </p>
        </div>

        {/* Main grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="group flex flex-col rounded-3xl border border-wine/10 bg-cream/70 p-8 shadow-[0_18px_48px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/30 hover:shadow-[0_26px_60px_-26px_color-mix(in_oklab,var(--wine)_50%,transparent)] md:p-10"
              style={revealStyle(inView, 0.4 + i * 0.15)}
            >
              <span
                aria-hidden
                className="h-px w-10 bg-wine/50 transition-all duration-300 group-hover:w-16 group-hover:bg-wine"
              />
              <h3 className="mt-6 font-display text-2xl text-deep-wine md:text-3xl">
                {card.label}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/65 md:text-lg">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <p
          className="mx-auto mt-24 max-w-2xl text-center font-display text-2xl leading-snug text-deep-wine md:mt-32 md:text-4xl"
          style={revealStyle(inView, 0.4 + cards.length * 0.15 + 0.1)}
        >
          Better conversations create better decisions.
          <br />
          <span className="italic text-wine">
            Better decisions create better startups.
          </span>
        </p>
      </div>
    </section>
  );
}
