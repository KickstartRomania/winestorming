import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/winestorming-logo.png";
import { WineSwirl } from "@/components/WineSwirl";

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
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <WineSwirl />

        <img
          src={logo}
          alt="Winestorming"
          className="relative z-10 h-20 w-auto md:h-24"
          style={{ animation: "ws-fade-up 0.9s ease-out both" }}
        />

        <h1
          className="relative z-10 mt-12 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-deep-wine md:text-7xl"
          style={{ animation: "ws-clarify 1.6s cubic-bezier(0.2,0.7,0.2,1) 2.6s both" }}
        >
          Where ideas get{" "}
          <em className="font-display italic text-wine">refined.</em>
        </h1>

        <p
          className="relative z-10 mt-7 max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg"
          style={{ animation: "ws-clarify-sub 1.4s ease-out 3.4s both" }}
        >
          A curated idea discussion where great minds refine, challenge, and
          elevate ideas — over a glass of wine.
        </p>

        <div
          className="relative z-10 mt-10"
          style={{ animation: "ws-fade-up 1s ease-out 4s both" }}
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
          style={{ animation: "ws-fade-up 1s ease-out 4.4s both" }}
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
