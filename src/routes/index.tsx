import { createFileRoute } from "@tanstack/react-router";
import { WineSwirl } from "@/components/WineSwirl";
import { ConceptSection } from "@/components/ConceptSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhyItWorksSection } from "@/components/WhyItWorksSection";
import { ChooseYourSeatSection } from "@/components/ChooseYourSeatSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { OutcomesSection } from "@/components/OutcomesSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Winestorming — Where ideas get refined" },
      {
        name: "description",
        content:
          "A curated idea discussion where great minds refine, challenge, and elevate ideas over wine.",
      },
      { property: "og:title", content: "Winestorming — Where ideas get refined" },
      {
        property: "og:description",
        content:
          "Curated conversations that refine ideas. Smart. Honest. Refined.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2 font-display text-sm tracking-[0.4em] text-deep-wine/70 uppercase">
        winestorming
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end px-6 pb-24 pt-[420px] text-center md:pt-[480px]">
        <WineSwirl />

        <h1
          className="relative z-10 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-deep-wine md:text-7xl"
          style={{ animation: "ws-clarify 1.6s cubic-bezier(0.2,0.7,0.2,1) 2.8s both" }}
        >
          Where ideas get{" "}
          <em className="font-display italic text-wine">refined.</em>
        </h1>

        <p
          className="relative z-10 mt-7 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
          style={{ animation: "ws-clarify-sub 1.4s ease-out 3.6s both" }}
        >
          A collaborative startup discussion night where founders openly share
          real challenges and participants help shape better solutions.
        </p>

        <div
          className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animation: "ws-fade-up 1s ease-out 4.2s both" }}
        >
          <a
            href="#apply"
            className="group inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--wine)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--wine)_70%,transparent)] hover:bg-deep-wine"
          >
            Apply as a startup
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#join"
            className="group inline-flex items-center gap-2 rounded-full border border-wine/30 px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-wine transition-all duration-300 hover:-translate-y-0.5 hover:border-wine/60 hover:bg-wine/5"
          >
            Join as a participant
          </a>
        </div>

      </section>

      <ConceptSection />
      <HowItWorksSection />
      <WhyItWorksSection />
      <ChooseYourSeatSection />
      <ExperienceSection />
    </main>
  );
}
