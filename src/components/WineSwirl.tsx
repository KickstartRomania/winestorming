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
        {/* Wine glass */}
        <img
          src={glass}
          alt=""
          className="relative z-10 h-[260px] w-auto md:h-[340px] select-none"
          style={{ animation: "ws-fade-up 1s ease-out both" }}
        />

        {/* soft wine-tinted glow behind the glass */}
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
