import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const outcomes = [
  {
    index: "01",
    title: "ideas get clearer",
    body: "Founders often discover what matters most simply by explaining it to the room.",
  },
  {
    index: "02",
    title: "assumptions get challenged",
    body: "Fresh perspectives reveal blind spots and alternative ways of thinking.",
  },
  {
    index: "03",
    title: "better questions emerge",
    body: "The goal isn’t finding perfect answers. It’s finding more useful questions.",
  },
  {
    index: "04",
    title: "conversations continue",
    body: "The most valuable discussions rarely end when the event does.",
  },
];

export function OutcomesSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">nobody leaves</span>
            <span className="block italic text-wine">
              with the same perspective.
            </span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Every session is different, but certain things tend to happen when
            smart people gather around real challenges.
          </p>
        </div>

        {/* Outcomes */}
        <div className="relative mx-auto mt-14 max-w-4xl md:mt-16">
          {/* Central connecting line */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block">
            <div className="h-full w-px bg-wine/10" />
            <div
              className="absolute left-0 top-0 w-px origin-top bg-wine/40"
              style={{
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 2s cubic-bezier(0.2,0.7,0.2,1) 0.3s",
              }}
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-6">
            {outcomes.map((outcome, i) => {
              const alignRight = i % 2 === 1;
              return (
                <div
                  key={outcome.index}
                  className={`relative flex ${
                    alignRight ? "md:justify-end" : "md:justify-start"
                  }`}
                  style={revealStyle(inView, 0.4 + i * 0.18)}
                >
                  {/* Node dot */}
                  <span className="absolute left-1/2 top-3 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-wine/40 bg-cream md:block" />

                  <div
                    className={`md:w-[44%] ${
                      alignRight ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="font-display text-sm font-semibold tracking-[0.2em] text-wine/50">
                      {outcome.index}
                    </span>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-deep-wine md:text-3xl">
                      {outcome.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-charcoal/70 md:text-base">
                      {outcome.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
