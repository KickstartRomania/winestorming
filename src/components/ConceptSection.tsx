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
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[1.15fr_1fr] md:items-start"
      >
        {/* Left — title + description */}
        <div>
          <h2
            className="font-display text-4xl font-semibold leading-[1.1] text-deep-wine md:text-5xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">not a pitch night.</span>
            <span className="block">
              a <span className="italic text-wine">refinement room.</span>
            </span>
          </h2>

          <p
            className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Winestorming is where founders bring real startup challenges, and the
            room helps sharpen the next move.
          </p>
        </div>

        {/* Right — contrast lists */}
        <div className="grid grid-cols-2 gap-x-8 md:pt-2">
          {/* what it isn't */}
          <div style={revealStyle(inView, 0.4)}>
            <h3 className="font-display text-sm italic text-charcoal/45 md:text-base">
              what it isn’t
            </h3>
            <ul className="mt-4 space-y-2">
              {isnt.map((item) => (
                <li
                  key={item}
                  className="font-display text-base leading-snug text-charcoal/40 line-through decoration-charcoal/30 decoration-1 md:text-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* what it is */}
          <div
            className="border-l border-wine/15 pl-8"
            style={revealStyle(inView, 0.52)}
          >
            <h3 className="font-display text-sm italic text-wine md:text-base">
              what it is
            </h3>
            <ul className="mt-4 space-y-2">
              {is.map((item) => (
                <li
                  key={item}
                  className="font-display text-base leading-snug text-deep-wine md:text-lg"
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
