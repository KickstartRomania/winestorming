import { useEffect, useRef } from "react";

export function WineSwirl() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 8;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 6;
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
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center"
    >
      {/* subtle wine-tinted trail */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[88%] max-w-[1100px] rounded-full blur-3xl origin-left"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--wine) 22%, transparent), color-mix(in oklab, var(--rose) 14%, transparent) 55%, transparent)",
          animation: "ws-trail 3.4s ease-out 1.6s both",
        }}
      />
      <svg
        ref={ref}
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        style={{
          transform: "translate(var(--mx,0), var(--my,0))",
          transition: "transform 0.2s ease-out",
        }}
      >
        <defs>
          <linearGradient id="ws-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--wine)" stopOpacity="0.9" />
            <stop offset="55%" stopColor="var(--rose)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--wine)" stopOpacity="0.5" />
          </linearGradient>
          <filter id="ws-soft">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* main swirl: emerges from glass (left of center) and expands across */}
        <g
          style={{
            transformOrigin: "600px 300px",
            animation: "ws-breathe 9s ease-in-out 5.5s infinite",
          }}
        >
          <path
            d="M 320 300
               C 320 230, 420 220, 460 280
               C 500 340, 420 380, 380 340
               C 350 310, 380 270, 430 290
               C 520 320, 620 260, 720 300
               C 830 345, 940 280, 1020 310
               C 1080 332, 1110 305, 1120 295"
            fill="none"
            stroke="url(#ws-stroke)"
            strokeWidth="1.6"
            strokeLinecap="round"
            filter="url(#ws-soft)"
            style={{
              strokeDasharray: 1800,
              strokeDashoffset: 1800,
              animation: "ws-draw 3.4s cubic-bezier(0.65,0,0.35,1) 0.8s forwards",
            }}
          />
          {/* secondary refining arc */}
          <path
            d="M 360 320 C 460 360, 620 320, 780 340 C 920 357, 1040 330, 1100 320"
            fill="none"
            stroke="url(#ws-stroke)"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.55"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: "ws-draw 3s cubic-bezier(0.65,0,0.35,1) 1.4s forwards",
            }}
          />
        </g>
      </svg>
    </div>
  );
}
