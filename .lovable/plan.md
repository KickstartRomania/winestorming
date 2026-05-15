# Pour & Settle Hero Animation

Replace the current `WineSwirl` SVG swirl with a single cinematic "pour" gesture: a thin dark wine stream falls from above into the glass, fills the bowl partway, ripples once, and settles. Headline clarifies as the liquid stills.

## Concept timeline (~4.5s total)

```
0.0s  Glass fades up into position (existing ws-fade-up)
0.8s  Thin wine stream begins falling from top of hero into glass rim
1.4s  Stream hits glass — small splash highlight
1.4s–3.0s  Wine level inside bowl rises from 0 → ~55% fill
3.0s  Stream tapers off and disappears
3.0s–3.6s  Surface ripples once (subtle elliptical wave), then flattens
3.4s  Headline begins ws-clarify (blur → sharp)
4.2s  Subline clarifies
4.6s  CTA + tagline fade up
loop  Wine surface gently breathes (very subtle 6s ease-in-out)
```

## Implementation

### Component: `src/components/WinePour.tsx` (replaces `WineSwirl.tsx`)

Structure:
- Wrapper div with mouse parallax (keep existing `--mx`/`--my` logic, reduced amplitude to ~3px since motion is more contained).
- Glass `<img>` (existing transparent PNG) as the visual anchor — `z-10`.
- An SVG layered behind the glass front but in front of glass interior, containing:
  1. **Stream**: a vertical `<rect>` (or thin `<path>`) ~2px wide, wine-colored gradient (opaque top → slightly translucent bottom). Positioned from the top of the hero down to the glass rim. Animated with `clip-path: inset(top% 0 bottom% 0)` keyframes so it appears to fall, then taper.
  2. **Splash**: tiny SVG arc near the rim, opacity pulse at the moment of impact (1.4s).
  3. **Wine fill**: an SVG `<path>` shaped like the inside of the glass bowl (bowl-shaped trapezoid/curve), masked by a horizontal line that animates from bottom → 55% height. Use a `<clipPath>` with an animated `<rect y>` to reveal the wine shape from the bottom up.
  4. **Surface ellipse**: a thin ellipse at the top of the wine fill, wine-colored with a slightly lighter highlight stroke. After fill completes, animate `transform: scaleY()` once (1 → 1.15 → 0.95 → 1) over 600ms to simulate a single ripple, then enter a slow infinite breathe (scaleY 1 ↔ 1.02, 6s).

The exact bowl path needs to be matched to the logo PNG's interior. I'll calibrate by overlaying the SVG on the glass image and tweaking control points until the wine sits naturally inside the bowl with no overflow.

### Keyframes added to `src/styles.css`

```css
@keyframes ws-pour-stream {
  0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
  10%  { opacity: 1; }
  20%  { clip-path: inset(0 0 0 0); }    /* fully drawn, hitting rim */
  70%  { clip-path: inset(0 0 0 0); opacity: 1; }
  90%  { clip-path: inset(100% 0 0 0); opacity: 0.6; } /* tapers from top */
  100% { opacity: 0; }
}

@keyframes ws-pour-fill {
  0%   { transform: translateY(100%); }
  100% { transform: translateY(45%); }   /* settles ~55% full */
}

@keyframes ws-ripple {
  0%   { transform: scaleY(1); }
  30%  { transform: scaleY(1.18); }
  60%  { transform: scaleY(0.92); }
  100% { transform: scaleY(1); }
}

@keyframes ws-surface-breathe {
  0%, 100% { transform: scaleY(1); }
  50%      { transform: scaleY(1.025); }
}

@keyframes ws-splash {
  0%, 100% { opacity: 0; transform: scale(0.6); }
  50%      { opacity: 0.7; transform: scale(1.1); }
}
```

Existing `ws-clarify`, `ws-clarify-sub`, `ws-fade-up`, `ws-trail` stay. Remove `ws-draw` and `ws-breathe` (no longer used).

### `src/routes/index.tsx`

- Swap `<WineSwirl />` for `<WinePour />`.
- Re-time the text reveals to land just after the ripple settles:
  - Headline `ws-clarify` delay: **3.4s**
  - Subline `ws-clarify-sub` delay: **4.2s**
  - CTA `ws-fade-up` delay: **4.6s**
  - Tagline `ws-fade-up` delay: **5.0s**
- Glass keeps its `ws-fade-up` 1s entry.

### What stays / goes
- Keep: layout, typography, colors, CTA, mouse parallax wrapper, soft warm wine trail glow under the hero (just retime to peak around the ripple).
- Remove: all SVG swirl paths, stroke-dash draw animations, rotational breathe.

## Notes
- All motion is one continuous gesture: drop in → fill → settle → headline clarifies. Reads as "an idea poured in and refined."
- No particles, no smoke, no random motion. Single deterministic timeline.
- After-ripple breathe is so subtle it reads as "alive" rather than "animated."
- Reduced-motion: I'll add a `@media (prefers-reduced-motion: reduce)` block that skips the pour and shows the glass already-filled with text already clear.
