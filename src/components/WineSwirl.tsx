import { useEffect, useRef } from "react";
import glass from "@/assets/winestorming-glass.png";

export function WineSwirl() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 6;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 4;
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

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[8%] flex justify-center"
      style={{ transform: "translate(var(--mx,0), var(--my,0))", transition: "transform 0.25s ease-out" }}
    >
      <div className="relative">
        {/* Wine glass — origin of motion */}
        <img
          src={glass}
          alt=""
          className="relative z-10 h-[260px] w-auto md:h-[340px] select-none"
          style={{ animation: "ws-fade-up 1s ease-out both" }}
        />

        {/* SVG swirl emerging FROM the glass opening, expanding outward */}
        <svg
          viewBox="0 0 1400 700"
          className="pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[1400px] -translate-x-1/2 md:h-[520px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="ws-stroke" x1="0" x2="1" y1="0.5" y2="0.5">
              <stop offset="0%" stopColor="var(--wine)" stopOpacity="0.95" />
              <stop offset="50%" stopColor="var(--rose)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--wine)" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Main swirl: starts inside the glass (center top), spirals up and out across hero */}
          <g
            style={{
              transformOrigin: "700px 200px",
              animation: "ws-breathe 9s ease-in-out 5.5s infinite",
            }}
          >
            <path
              d="M 700 210
                 C 670 180, 730 150, 740 190
                 C 748 222, 690 232, 678 200
                 C 668 170, 720 150, 760 175
                 C 820 210, 760 270, 700 250
                 C 620 224, 560 280, 500 260
                 C 420 234, 340 280, 260 250
                 C 180 222, 120 250, 90 240"
              fill="none"
              stroke="url(#ws-stroke)"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{
                strokeDasharray: 1800,
                strokeDashoffset: 1800,
                animation: "ws-draw 3.2s cubic-bezier(0.65,0,0.35,1) 0.8s forwards",
              }}
            />
            <path
              d="M 700 210
                 C 760 230, 820 200, 900 230
                 C 1000 268, 1100 230, 1200 252
                 C 1280 268, 1320 245, 1340 240"
              fill="none"
              stroke="url(#ws-stroke)"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{
                strokeDasharray: 1200,
                strokeDashoffset: 1200,
                animation: "ws-draw 2.8s cubic-bezier(0.65,0,0.35,1) 1.2s forwards",
                transform: "scaleX(-1)",
                transformOrigin: "700px 0",
              }}
            />
            {/* refining secondary arc */}
            <path
              d="M 120 290 C 320 320, 560 290, 700 305 C 860 320, 1080 295, 1300 305"
              fill="none"
              stroke="url(#ws-stroke)"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.5"
              style={{
                strokeDasharray: 1400,
                strokeDashoffset: 1400,
                animation: "ws-draw 3s cubic-bezier(0.65,0,0.35,1) 1.8s forwards",
              }}
            />
          </g>
        </svg>

        {/* soft wine-tinted trail behind the swirl */}
        <div
          className="absolute left-1/2 top-[55%] h-[180px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--wine) 18%, transparent), color-mix(in oklab, var(--rose) 8%, transparent) 50%, transparent 75%)",
            animation: "ws-trail 3.4s ease-out 1.6s both",
          }}
        />
      </div>
    </div>
  );
}
