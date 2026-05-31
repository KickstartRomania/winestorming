/**
 * Decorative continuation of the hero wine-swirl visual language.
 * Subtle, low-opacity, with a very gentle idle drift. No particles or smoke.
 */
export function SwirlMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      style={{ overflow: "visible", animation: "ws-idle 14s ease-in-out infinite" }}
    >
      <defs>
        <linearGradient id="concept-swirl" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--wine)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--rose)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--wine)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M200 60
           C 150 90, 250 120, 240 160
           C 232 196, 160 200, 158 158
           C 156 116, 250 110, 268 168
           C 288 232, 180 268, 140 232
           C 104 200, 150 150, 210 168
           C 270 186, 280 250, 232 286
           C 192 316, 132 300, 128 256"
        fill="none"
        stroke="url(#concept-swirl)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
