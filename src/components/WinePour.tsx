export function WinePour() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
      aria-hidden="true"
    >
      <svg
        width="420"
        height="560"
        viewBox="0 0 420 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block overflow-visible"
      >
        <defs>
          <clipPath id="bowlClip">
            <path d="M120 180 C120 280, 160 340, 210 340 C260 340, 300 280, 300 180 Z" />
          </clipPath>

          <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--deep-wine)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--deep-wine)" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="wineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--wine)" />
            <stop offset="100%" stopColor="var(--deep-wine)" />
          </linearGradient>

          <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--charcoal)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--charcoal)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--charcoal)" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--deep-wine)" />
            <stop offset="50%" stopColor="#3a1820" />
            <stop offset="100%" stopColor="var(--deep-wine)" />
          </linearGradient>
        </defs>

        {/* === Bottle === */}
        <g className="wp-bottle">
          {/* Body + neck — spout tip at (210, 80) */}
          <path
            d="M204 80 L204 42 C204 32, 188 28, 188 18 L188 -18 C188 -25, 232 -25, 232 -18 L232 18 C232 28, 216 32, 216 42 L216 80 Z"
            fill="url(#bottleBody)"
            stroke="var(--charcoal)"
            strokeOpacity="0.45"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* Foil on neck */}
          <rect
            x="202"
            y="48"
            width="16"
            height="26"
            fill="var(--wine)"
            opacity="0.95"
          />
          {/* Label */}
          <rect
            x="186"
            y="-4"
            width="48"
            height="16"
            fill="var(--cream)"
            opacity="0.92"
          />
          <rect
            x="192"
            y="1"
            width="36"
            height="1.5"
            fill="var(--wine)"
            opacity="0.7"
          />
          <rect
            x="198"
            y="6"
            width="24"
            height="1"
            fill="var(--charcoal)"
            opacity="0.4"
          />
          {/* Spout opening shadow */}
          <ellipse cx="210" cy="80" rx="6.5" ry="1.5" fill="var(--charcoal)" opacity="0.7" />
          {/* Highlight */}
          <path
            d="M191 -10 C190 20, 192 50, 200 78"
            stroke="var(--cream)"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* === Pour Stream === */}
        <g className="wp-stream">
          <rect
            x="207"
            y="80"
            width="6"
            height="105"
            rx="3"
            fill="url(#streamGrad)"
          />
        </g>

        {/* === Glass === */}
        <g className="wp-glass">
          <path
            d="M120 180 C120 280, 160 340, 210 340 C260 340, 300 280, 300 180"
            stroke="url(#glassEdge)"
            strokeWidth="2.25"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse
            cx="210"
            cy="180"
            rx="90"
            ry="8"
            stroke="url(#glassEdge)"
            strokeWidth="2.25"
            fill="none"
          />
          <line
            x1="210"
            y1="340"
            x2="210"
            y2="470"
            stroke="var(--charcoal)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
          <ellipse
            cx="210"
            cy="472"
            rx="55"
            ry="6"
            stroke="var(--charcoal)"
            strokeOpacity="0.45"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M138 200 C140 260, 165 315, 195 330"
            stroke="var(--cream)"
            strokeOpacity="0.55"
            strokeWidth="1"
            fill="none"
          />

          <g clipPath="url(#bowlClip)">
            <rect
              className="wp-fill"
              x="100"
              y="340"
              width="220"
              height="200"
              fill="url(#wineFill)"
            />
            <ellipse
              className="wp-ripple"
              cx="210"
              cy="0"
              rx="80"
              ry="3"
              fill="var(--rose)"
              fillOpacity="0.55"
            />
            <ellipse
              className="wp-shine"
              cx="185"
              cy="0"
              rx="28"
              ry="1.5"
              fill="var(--cream)"
              fillOpacity="0.35"
            />
          </g>
        </g>

        <circle className="wp-splash" cx="210" cy="200" r="2" fill="var(--wine)" />
      </svg>
    </div>
  );
}
