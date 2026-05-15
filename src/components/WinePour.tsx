import { useEffect, useRef } from "react";
import glass from "@/assets/winestorming-glass.png";

/**
 * Pour & Settle hero animation.
 * A thin stream of wine falls from above into the glass, fills the bowl partway,
 * ripples once, and settles. The wine surface then breathes very subtly.
 *
 * The SVG overlay shares the same viewBox (280x446) as the glass PNG so the
 * stream and fill align with the bowl interior.
 */
export function WinePour() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 3;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Bowl interior geometry (calibrated against the glass PNG, viewBox 280x446)
  // Rim opening sits around y≈90, widest bowl x≈70..210, lower bowl narrows by y≈300.
  const rimY = 95;
  const rimX = 140;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[8%] flex justify-center"
      style={{
        transform: "translate(var(--mx,0), var(--my,0))",
        transition: "transform 0.25s ease-out",
      }}
    >
      <div className="relative h-[260px] w-auto md:h-[340px]">
        {/* Wine fill + ripple — sits BEHIND the glass so the rim/edges read on top */}
        <svg
          viewBox="0 0 280 446"
          className="absolute inset-0 h-full w-auto"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="wp-wine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.95" />
              <stop offset="60%" stopColor="var(--wine)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--deep-wine)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="wp-stream" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--wine)" stopOpacity="0" />
              <stop offset="20%" stopColor="var(--wine)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--deep-wine)" stopOpacity="1" />
            </linearGradient>
            {/* Bowl-shaped clip so wine never overflows the glass interior */}
            <clipPath id="wp-bowl">
              <path
                d="M 78 95
                   C 70 140, 68 200, 90 250
                   C 110 290, 170 290, 190 250
                   C 212 200, 210 140, 202 95
                   Z"
              />
            </clipPath>
          </defs>

          {/* Wine body inside the bowl — translateY animates from below up to ~55% fill */}
          <g clipPath="url(#wp-bowl)">
            <g
              style={{
                transformOrigin: "140px 290px",
                animation:
                  "wp-fill 1.6s cubic-bezier(0.33, 1, 0.68, 1) 1.4s both",
              }}
            >
              <rect x="60" y="90" width="160" height="220" fill="url(#wp-wine)" />
              {/* Surface highlight ellipse — sits at the top of the wine body */}
              <g
                style={{
                  transformOrigin: "140px 90px",
                  animation:
                    "wp-ripple 0.7s cubic-bezier(0.4, 0, 0.2, 1) 3.0s 1, wp-surface-breathe 6s ease-in-out 3.7s infinite",
                }}
              >
                <ellipse
                  cx="140"
                  cy="90"
                  rx="62"
                  ry="6"
                  fill="color-mix(in oklab, var(--rose) 70%, white 10%)"
                  opacity="0.85"
                />
                <ellipse
                  cx="140"
                  cy="89"
                  rx="58"
                  ry="2.5"
                  fill="white"
                  opacity="0.18"
                />
              </g>
            </g>
          </g>
        </svg>

        {/* Glass on top */}
        <img
          src={glass}
          alt=""
          className="relative z-10 h-full w-auto select-none"
          style={{ animation: "ws-fade-up 1s ease-out both" }}
        />

        {/* Falling stream — long thin path from far above the hero down to the rim */}
        <svg
          viewBox="0 0 280 446"
          className="pointer-events-none absolute left-0 top-0 h-full w-auto"
          style={{ overflow: "visible" }}
        >
          <rect
            x={rimX - 1}
            y={-600}
            width="2"
            height={600 + rimY}
            fill="url(#wp-stream)"
            style={{ animation: "wp-stream 2.4s cubic-bezier(0.55,0,0.45,1) 0.8s both" }}
          />
          {/* Splash flash at the moment of impact */}
          <ellipse
            cx={rimX}
            cy={rimY + 4}
            rx="14"
            ry="3"
            fill="color-mix(in oklab, var(--rose) 60%, white 20%)"
            style={{ animation: "wp-splash 0.55s ease-out 1.4s both" }}
          />
        </svg>

        {/* Soft warm glow under the glass */}
        <div
          className="absolute left-1/2 top-[88%] h-[120px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--wine) 22%, transparent), color-mix(in oklab, var(--rose) 8%, transparent) 50%, transparent 75%)",
            animation: "ws-trail 3s ease-out 2.8s both",
          }}
        />
      </div>
    </div>
  );
}
