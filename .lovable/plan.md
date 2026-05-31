## Goal

Make the Concept section feel composed instead of scattered. Right now the title/description sit on the far left while the two lists float on the far right with a large empty gap between them, and the list type is so large that items wrap unevenly.

## Changes (all in `src/components/ConceptSection.tsx`)

1. **Smaller, tighter list type** — drop "what it isn't" / "what it is" items from `text-xl md:text-2xl` to roughly `text-base md:text-lg`, and the labels from `text-lg md:text-xl` to `text-sm md:text-base`. Smaller type keeps each item on one line so the rows line up cleanly.

2. **Pull the two lists together** — reduce the gap between "what it isn't" and "what it is" so they read as one paired unit rather than two stranded columns. Keep the thin wine divider between them.

3. **Align the columns to a shared top edge** — switch the outer grid from `md:items-center` to `md:items-start` so the headline and the lists start on the same baseline, giving the section a clear top alignment.

4. **Rebalance the grid** — give the left (title + description) column a bit more room and the right (lists) column slightly less, so the lists sit closer to center instead of pinned to the far right edge.

## Result

A balanced two-column block: title + short description on the left, a compact aligned "what it isn't / what it is" pair on the right, with consistent top alignment and no oversized wrapping text.
