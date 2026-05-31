import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

export function ConceptSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full px-6 py-28 md:py-40">
      <div ref={ref} className="mx-auto max-w-6xl">
        <p
          className="font-body text-xs uppercase tracking-[0.4em] text-wine"
          style={revealStyle(inView, 0)}
        >
          01 / concept
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 md:items-start">
          {/* Left column — headline */}
          <h2
            className="font-display text-4xl font-semibold leading-[1.1] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            not a pitch night.
            <br />
            a <span className="italic text-wine">refinement room.</span>
          </h2>

          {/* Right column — body */}
          <div className="md:pt-3" style={revealStyle(inView, 0.24)}>
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 md:text-lg">
              Winestorming is a collaborative startup discussion format where
              founders openly share real challenges and participants help refine
              ideas, decisions, and next steps through conversation.
            </p>
          </div>
        </div>

        {/* Comparison card */}
        <div
          className="rounded-3xl border border-wine/10 bg-cream/70 p-8 shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm md:p-14"
          style={revealStyle(inView, 0.42)}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-xl italic text-charcoal/60 md:text-2xl">
                what it isn’t
              </h3>
              <ul className="mt-6 space-y-4">
                {["startup competition", "investor pitch event", "networking mixer"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-base text-charcoal/55 md:text-lg"
                    >
                      <span className="h-px w-5 bg-charcoal/30" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="md:border-l md:border-wine/10 md:pl-10">
              <h3 className="font-display text-xl italic text-wine md:text-2xl">
                what it is
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  "collaborative discussion",
                  "founder thinking in public",
                  "collective refinement",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-deep-wine md:text-lg"
                  >
                    <span className="h-px w-5 bg-wine/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Closing takeaway */}
        <p
          className="mx-auto mt-20 max-w-2xl text-center font-display text-2xl leading-snug text-deep-wine md:text-4xl"
          style={revealStyle(inView, 0.54)}
        >
          Most startup events showcase answers.
          <br />
          <span className="italic text-wine">
            Winestorming explores the questions.
          </span>
        </p>
      </div>
    </section>
  );
}
