import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

const faqs = [
  {
    q: "Do I need a startup to attend?",
    a: "No. Many participants join to contribute ideas, perspectives, and feedback.",
  },
  {
    q: "How are startups selected?",
    a: "We review all applications and select 3–5 startups that are open to discussion and have specific challenges the room can help refine.",
  },
  {
    q: "Can I attend if I’m not a founder?",
    a: "Absolutely. Some of the best insights come from people with different backgrounds and experiences.",
  },
  {
    q: "Do startups pitch?",
    a: "No. Founders briefly introduce their company and focus on the challenges they want help exploring.",
  },
  {
    q: "Do I need expertise to contribute?",
    a: "No. Curiosity, thoughtful questions, and different perspectives are often more valuable than expertise.",
  },
  {
    q: "Is there networking?",
    a: "Naturally, yes. But the focus is on conversation and collaboration rather than traditional networking.",
  },
];

export function FaqSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full px-6 py-16 md:py-24">
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Eyebrow + headline */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-body text-xs uppercase tracking-[0.4em] text-wine"
            style={revealStyle(inView, 0)}
          >
            09 / faq
          </p>

          <h2
            className="mt-8 font-display text-4xl font-semibold leading-[1.12] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.12)}
          >
            <span className="block">a few things people</span>
            <span className="block italic text-wine">usually ask.</span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            Everything you need to know before joining a Winestorming session.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-16 md:mt-20">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="border-b border-wine/10"
                style={revealStyle(inView, 0.32 + i * 0.08)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 md:py-7"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-xl transition-colors duration-300 md:text-2xl ${
                      isOpen ? "text-wine" : "text-deep-wine group-hover:text-wine"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    className={`relative flex h-6 w-6 flex-none items-center justify-center text-wine transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <span className="absolute h-px w-4 bg-current" />
                    <span className="absolute h-4 w-px bg-current" />
                  </span>
                </button>

                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pr-10 text-base leading-relaxed text-charcoal/70 md:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <p
          className="mx-auto mt-24 max-w-2xl text-center font-display text-2xl leading-snug text-deep-wine md:mt-32 md:text-4xl"
          style={revealStyle(inView, 0.4 + faqs.length * 0.08 + 0.15)}
        >
          The best way to understand Winestorming
          <br />
          <span className="italic text-wine">is to experience it.</span>
        </p>
      </div>
    </section>
  );
}
