import { createFileRoute } from "@tanstack/react-router";
import { WinePour } from "@/components/WinePour";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Winestorming — Where ideas get refined" },
      {
        name: "description",
        content:
          "A curated idea discussion where great minds refine, challenge, and elevate ideas over wine.",
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

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end px-6 pb-24 pt-[480px] text-center md:pt-[540px]">
        <WinePour />

        <h1
          className="relative z-10 font-display text-4xl font-semibold leading-[1.05] text-deep-wine sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap"
          style={{ animation: "ws-clarify 1.6s cubic-bezier(0.2,0.7,0.2,1) 3.6s both" }}
        >
          Where ideas get{" "}
          <em className="font-display italic text-wine">refined.</em>
        </h1>

        <p
          className="relative z-10 mt-7 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
          style={{ animation: "ws-clarify-sub 1.4s ease-out 4.2s both" }}
        >
          A curated idea discussion where great minds refine, challenge, and
          elevate ideas — over a glass of wine.
        </p>

        <div
          className="relative z-10 mt-10"
          style={{ animation: "ws-fade-up 1s ease-out 4.8s both" }}
        >
          <a
            href="#join"
            className="group inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 font-body text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--wine)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--wine)_70%,transparent)] hover:bg-deep-wine"
          >
            Join the next session
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div
          className="relative z-10 mt-16 flex items-center gap-8 text-[11px] uppercase tracking-[0.32em] text-charcoal/45"
          style={{ animation: "ws-fade-up 1s ease-out 5.2s both" }}
        >
          <span>Curated</span>
          <span className="h-px w-6 bg-charcoal/20" />
          <span>Honest</span>
          <span className="h-px w-6 bg-charcoal/20" />
          <span>Refined</span>
        </div>
      </section>
    </main>
  );
}
