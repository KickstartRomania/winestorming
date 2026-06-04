import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const seats = [
  {
    label: "bring a challenge",
    body: "Apply as a startup and bring 1–3 questions, decisions, or problems you’d like the room to help refine.",
    tags: ["positioning", "pricing", "product", "growth", "partnerships"],
    cta: "Apply as a startup",
    href: "#apply",
    primary: true,
  },
  {
    label: "help shape solutions",
    body: "Join the room, contribute ideas and perspectives, and participate in real startup conversations.",
    tags: ["feedback", "strategy", "product thinking", "creativity", "founder discussions"],
    cta: "Join as a participant",
    href: "https://luma.com/event/evt-66JTb6qzo1hSvnc",
    lumaEventId: "evt-66JTb6qzo1hSvnc",
    primary: false,
  },
];

export function ChooseYourSeatSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">every great conversation</span>
            <span className="block">needs both sides.</span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Some people bring challenges. Others bring perspectives. Winestorming
            works because both are in the room.
          </p>
        </div>

        {/* Seat cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {seats.map((seat, i) => (
            <div
              key={seat.label}
              className="group flex flex-col rounded-3xl border border-wine/15 bg-cream/70 p-8 shadow-[0_18px_48px_-30px_color-mix(in_oklab,var(--wine)_35%,transparent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-wine/40 hover:shadow-[0_30px_70px_-26px_color-mix(in_oklab,var(--wine)_55%,transparent)] md:p-12"
              style={revealStyle(inView, 0.36 + i * 0.16)}
            >
              <span
                aria-hidden
                className="h-px w-12 bg-wine/50 transition-all duration-300 group-hover:w-20 group-hover:bg-wine"
              />
              <h3 className="mt-7 font-display text-3xl text-deep-wine md:text-4xl">
                {seat.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-charcoal/70 md:text-lg">
                {seat.body}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {seat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-wine/15 bg-wine/5 px-4 py-1.5 font-body text-xs uppercase tracking-[0.12em] text-wine/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <a
                  href={seat.href}
                  data-luma-action={seat.lumaEventId ? "checkout" : undefined}
                  data-luma-event-id={seat.lumaEventId}
                  className={
                    seat.primary
                      ? "group/cta inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--wine)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-wine hover:shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--wine)_70%,transparent)]"
                      : "group/cta inline-flex items-center gap-2 rounded-full border border-wine/30 px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-wine transition-all duration-300 hover:-translate-y-0.5 hover:border-wine/60 hover:bg-wine/5"
                  }
                >
                  {seat.cta}
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
