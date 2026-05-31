## Goal

Make the section-ending statements feel intentional instead of repetitive. Right now all 8 sections end with the same kind of two-line aphorism, and the "questions vs. answers" / "through conversation" motifs recur across both headlines and closings. The fix: keep closings only where they add a distinct beat, and remove the redundant ones.

## Changes

Remove the closing aphorism from these sections (delete the trailing `<p>` block only — headline, supporting text, and cards stay untouched):

- **01 Concept** (`ConceptSection.tsx`) — closing "Most startup events showcase answers / Winestorming explores the questions" is nearly verbatim the headline of section 03, so drop it here.
- **04 Choose your seat** (`ChooseYourSeatSection.tsx`) — closing "The best ideas rarely emerge alone / through conversation" just restates the headline's "every conversation needs both sides."
- **07 Outcomes** (`OutcomesSection.tsx`) — closing "Clarity is rarely created alone / through conversation" echoes both the headline and section 04's closing.
- **08 Next Session** (`NextSessionSection.tsx`) — closing "Some people bring questions / Others help uncover better answers" dilutes the CTA; the conversion section should end on the action, not an aphorism.

Keep the closing aphorism (distinct, earns the flourish) on:

- **02 How it works** — "Nobody comes to Winestorming with the answers. / That's the point."
- **03 Why it works** — "Better conversations create better decisions. / Better decisions create better startups."
- **05 The experience** — "The goal isn't to impress the room. / The goal is to leave with a clearer perspective."
- **09 FAQ** — "The best way to understand Winestorming / is to experience it."

## Technical notes

- Each closing is a single `<p>` element near the end of its component, styled with `mx-auto mt-24 max-w-2xl text-center font-display ...` and a `revealStyle(...)` delay. Removing it is a clean deletion of that block.
- No layout breakage expected: each closing sits after the section's main content grid, so removing it just ends the section earlier. Vertical rhythm stays consistent because section padding (`py-16 md:py-24`) lives on the `<section>`, not the closing line.
- The `revealStyle` import and any other usages in each file remain in use (headline/supporting text still call it), so no unused-import cleanup is needed.

## Result

Closings drop from 8 to 4, appearing only at meaningful beats, and the duplicated questions/answers + conversation motifs are reduced — the page reads leaner and each remaining closing lands with more weight.