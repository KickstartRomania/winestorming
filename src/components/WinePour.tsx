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
        className="block"
      >
        <defs>
          {/* Glass body — clip wine to bowl interior */}
          <clipPath id="bowlClip">
            <path d="M120 180 C120 280, 160 340, 210 340 C260 340, 300 280, 300 180 Z" />
          </clipPath>

          {/* Pour stream gradient — dark wine, slight taper */}
          <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--deep-wine)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--wine)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--deep-wine)" stopOpacity="1" />
          </linearGradient>

          {/* Wine fill gradient */}
          <linearGradient id="wineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--wine)" />
            <stop offset="100%" stopColor="var(--deep-wine)" />
          </linearGradient>

          {/* Glass highlight */}
          <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--charcoal)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--charcoal)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--charcoal)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* === Pour Stream === */}
        <g className="wp-stream">
          <rect
            x="207"
            y="0"
            width="6"
            height="200"
            rx="3"
            fill="url(#streamGrad)"
          />
        </g>

        {/* === Glass === */}
        <g className="wp-glass">
          {/* Bowl outline */}
          <path
            d="M120 180 C120 280, 160 340, 210 340 C260 340, 300 280, 300 180"
            stroke="url(#glassEdge)"
            strokeWidth="2.25"
            strokeLinecap="round"
            fill="none"
          />
          {/* Rim ellipse */}
          <ellipse
            cx="210"
            cy="180"
            rx="90"
            ry="8"
            stroke="url(#glassEdge)"
            strokeWidth="2.25"
            fill="none"
          />
          {/* Stem */}
          <line
            x1="210"
            y1="340"
            x2="210"
            y2="470"
            stroke="var(--charcoal)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
          {/* Foot */}
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
          {/* Subtle inner highlight */}
          <path
            d="M138 200 C140 260, 165 315, 195 330"
            stroke="var(--cream)"
            strokeOpacity="0.55"
            strokeWidth="1"
            fill="none"
          />

          {/* === Wine inside the bowl === */}
          <g clipPath="url(#bowlClip)">
            {/* The fill rises from below */}
            <rect
              className="wp-fill"
              x="100"
              y="340"
              width="220"
              height="200"
              fill="url(#wineFill)"
            />
            {/* Surface ripple band */}
            <ellipse
              className="wp-ripple"
              cx="210"
              cy="0"
              rx="80"
              ry="3"
              fill="var(--rose)"
              fillOpacity="0.55"
            />
            {/* Specular highlight on liquid */}
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

        {/* Splash dot at first contact */}
        <circle className="wp-splash" cx="210" cy="200" r="2" fill="var(--wine)" />
      </svg>
    </div>
  );
}
