import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const steps = [
  {
    number: "01",
    title: "startup introductions",
    body: "Selected founders briefly introduce their startup and share the specific challenge they are currently hoping to refine together with the room.",
  },
  {
    number: "02",
    title: "the challenge",
    body: "Founders present 1–3 questions, decisions, or problems they are working through — positioning, pricing, product direction, growth, partnerships.",
  },
  {
    number: "03",
    title: "room discussion",
    body: "Participants contribute ideas, experiences, perspectives, and feedback through moderated conversation. The focus is on collaboration, not criticism.",
  },
  {
    number: "04",
    title: "clarity & next steps",
    body: "Founders leave with fresh perspectives, a stronger sense of direction, and concrete, actionable ideas that are genuinely worth testing next.",
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full px-6 py-28 md:py-40">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="font-body text-xs uppercase tracking-[0.4em] text-wine"
            style={revealStyle(inView, 0)}
          >
            02 / how it works
          </p>

          <h2
            className="mt-8 font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">real startups.</span>
            <span className="block">real challenges.</span>
            <span className="block italic text-wine">real conversations.</span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Each session brings together 3–5 selected startups and around 30
            participants for an evening of collaborative refinement.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20 md:mt-28">
          {/* Desktop horizontal line */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px md:block">
            <div className="h-px w-full bg-wine/10" />
            <div
              className="absolute left-0 top-0 h-px origin-left bg-wine/50"
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.4s cubic-bezier(0.2,0.7,0.2,1) 0.2s",
              }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="pointer-events-none absolute bottom-0 left-8 top-9 w-px md:hidden">
            <div className="h-full w-px bg-wine/10" />
            <div
              className="absolute left-0 top-0 w-px origin-top bg-wine/50"
              style={{
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 1.4s cubic-bezier(0.2,0.7,0.2,1) 0.2s",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex pl-20 md:pl-0"
                style={revealStyle(inView, 0.4 + i * 0.15)}
              >
                {/* Node dot */}
                <span className="absolute left-[30px] top-[26px] h-3 w-3 -translate-x-1/2 rounded-full border border-wine/40 bg-cream md:left-9 md:top-[26px]" />

                <div className="group flex h-full w-full flex-col rounded-3xl border border-wine/10 bg-cream/70 p-7 shadow-[0_18px_48px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/30 hover:shadow-[0_26px_60px_-26px_color-mix(in_oklab,var(--wine)_50%,transparent)]">
                  <span className="font-display text-4xl font-semibold text-wine/30 transition-colors duration-300 group-hover:text-wine/60 md:text-5xl">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-deep-wine md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65 md:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting statement */}
        <p
          className="mx-auto mt-24 max-w-none text-center font-display text-2xl leading-snug text-deep-wine md:mt-32 md:text-4xl"
          style={revealStyle(inView, 0.4 + steps.length * 0.15 + 0.1)}
        >
          <span className="md:whitespace-nowrap">
            Nobody comes to Winestorming with the answers.
          </span>
          <br />
          <span className="italic text-wine">That’s the point.</span>
        </p>
      </div>
    </section>
  );
}
