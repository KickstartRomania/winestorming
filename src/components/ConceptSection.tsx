import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const isnt = ["startup competition", "investor pitch event", "networking mixer"];
const is = [
  "collaborative discussion",
  "founder thinking in public",
  "collective refinement",
];

export function ConceptSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Headline + intro — baseline aligned at the bottom */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 md:items-end">
          <h2
            className="font-display text-4xl font-semibold leading-[1.1] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block whitespace-nowrap">not a pitch night.</span>
            <span className="block whitespace-nowrap">
              a <span className="italic text-wine">refinement room.</span>
            </span>
          </h2>

          <p
            className="max-w-md text-base leading-relaxed text-charcoal/70 md:pb-2 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Winestorming is where founders bring real startup challenges, and the
            room helps sharpen the next move.
          </p>
        </div>

        {/* Contrast — editorial, no card */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 border-t border-wine/15 pt-12 md:mt-20 md:grid-cols-2 md:gap-x-20 md:pt-16">
          {/* what it isn't */}
          <div style={revealStyle(inView, 0.4)}>
            <h3 className="font-display text-xl italic text-charcoal/45 md:text-2xl">
              what it isn’t
            </h3>
            <ul className="mt-7 space-y-3">
              {isnt.map((item) => (
                <li
                  key={item}
                  className="font-display text-2xl leading-snug text-charcoal/40 line-through decoration-charcoal/30 decoration-1 md:text-3xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* what it is */}
          <div
            className="md:border-l md:border-wine/15 md:pl-20"
            style={revealStyle(inView, 0.52)}
          >
            <h3 className="font-display text-xl italic text-wine md:text-2xl">
              what it is
            </h3>
            <ul className="mt-7 space-y-3">
              {is.map((item) => (
                <li
                  key={item}
                  className="font-display text-2xl leading-snug text-deep-wine md:text-3xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
