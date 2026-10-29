# Design — TapVid · Playful Pop（Figma）

---

## Visual Style

A playful, friendly multicolour system in the Figma spirit — built for onboarding and approachable explainers, where bright shapes, icons, and sticker-style cutouts bounce onto a clean light stage like a joyful collage. The palette is Figma's bright brand set — red-orange #F24E1E, purple #A259FF, green #0ACF83, blue #1ABCFE — used boldly and flat against a clean white (or #F7F7F5) ground, with near-black ink for type; no gradients and no realistic shadows, only flat colour and the occasional sticker-style offset. Type is rounded and friendly — a soft sans in medium-to-bold weights with neutral tracking (approachable, not the tight editorial figmaSans) — set in ink or a bright pop colour, with words that bounce in playfully. Compositions are clean, flat collages — overlapping single-colour stickers, shapes, and icons arranged with generous space on the light ground, like sticky notes on a clean wall; layering gives a collage feel without true depth. The motion is the personality — everything is springy and bouncy, with icons and shapes scaling in on elastic overshoot and staggering into collages; the rhythm is light, brisk, and joyful, and the bounce never lets up.

## Core Palette

### Colors

| Role | Name | Hex | Usage Rule |
|------|------|-----|------------|
| Primary | Ink | #1E1E1E | Primary text and outlines — near-black on the light ground |
| Secondary | Muted Gray | #757575 | Secondary text and labels *(default)* |
| Accent | Figma Multicolour | #F24E1E / #A259FF / #0ACF83 / #1ABCFE | The four brand pops — used boldly across shapes, stickers, icons, and the occasional word |
| Background | Clean Light | #FFFFFF | Clean white ground (or #F7F7F5) — the calm stage the colour pops against |
| Surface | Soft Surface | #F7F7F5 | Faintly off-white cards / panels / sticker backings |
| Text Primary | Ink | #1E1E1E | Main text |
| Text Secondary | Muted Gray | #757575 | Captions, labels, sticker tags |
| Emphasis | Pop Colour | one of the four | A focal shape or word in one bright pop colour — a bouncy hit |

### Figma Pop Set

| Name | Hex |
|------|------|
| Red-Orange | #F24E1E |
| Purple | #A259FF |
| Green | #0ACF83 |
| Blue | #1ABCFE |
| Coral | #FF7262 *(Figma's 5th brand colour — off by default)* |

*The four brand colours pop against a clean white/light ground; near-black ink and gray for text. Use multiple pops freely (the playful multicolour look), but keep each shape/sticker a single flat colour — no gradients. Note: Figma's own marketing actually uses muted pastel "sticky-note" blocks (lime/lilac/cream/mint) on black-and-white; your brief calls for the brighter logo palette, so I've used the saturated set — say the word if you'd rather use Figma's pastels.*

### Palette Rules

- Clean light ground (white or #F7F7F5); the four bright pops carry the energy against it.
- Each shape, sticker, or icon is a single flat colour — no gradients, no realistic shadows (only a flat sticker-style offset if any).
- Multiple colours can share a frame (playful multicolour), but keep them balanced and clean — never muddy.
- Near-black ink for type and outlines; the pops are for shapes, stickers, icons, and the occasional word.

## Typography System

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Headline | Rounded Sans *(choose a friendly face)* | 56–96px | 600–700 | Friendly bold headlines, slightly rounded; neutral tracking |
| Body | Rounded Sans | 18–22px | 400–500 | Approachable body copy |
| Caption | Rounded Sans | 14–16px | 500 | Labels, sticker tags |
| Data / Number | Rounded Sans | 80–160px | 700–800 | Big friendly numbers — playful hero figures |
| Emphasis | Rounded Sans | inherits line | 700, pop colour | A focal word in a bright pop colour, bouncy |

*The brief calls for a rounded, friendly sans (not Figma's editorial figmaSans, which uses tight negative tracking) — choose a soft/rounded geometric sans and supply its `.woff2` in `fonts/`. Keep weights medium-to-bold and approachable; tracking neutral, not tight. Sizes are @1080p defaults — scale to canvas.*

### Typography Rules

- Friendly and rounded — medium-to-bold weights, neutral tracking, generous and approachable (not tight or editorial).
- Type can be set in ink or in a bright pop colour for emphasis; headline words may bounce in individually.
- Left-aligned or centred; playful, not rigid.
- Fallback stack: [rounded sans] → "Nunito", system-ui, sans-serif. *Ensure the chosen face's `.woff2` files are present in `fonts/`, or it falls back to the above (Nunito is a free rounded, friendly sans).*

### Text Animation

- Words and headlines bounce in with spring/elastic easing — scale-up with overshoot and settle, in keeping with the bouncy motion; per-word bounce is encouraged. Exit by a quick scale-down or pop-out.

## Environment Grammar

- **Space Construction:** A clean, light stage (white or #F7F7F5) where bright shapes, icons, and sticker-style cutouts are arranged like a playful collage — sticky notes on a clean wall. Generous space, nothing crowded; the light ground keeps the multicolour from feeling chaotic.
- **Depth Logic:** Flat and clean — no realistic depth, no gradients. A sticker aesthetic may use a flat offset edge or a subtle flat drop to lift cutouts, but there are no soft, realistic shadows. Playful overlapping of stickers/shapes gives a collage feel without true depth.
- **Environment Variants:** The clean light ground and the four-colour pop palette stay constant; variation comes from which shapes, stickers, and icons are present, the colour mix, and density. The rounded friendly type and bouncy motion never change scene to scene.
- **Sticker & Shape Grammar:** Icons, shapes, and stickers are flat, single-colour, with rounded corners (Figma's pill / rounded vocabulary) — cut-out collage pieces that can overlap and bounce. Spread the four pops across them; keep each piece one flat colour. They bounce in with spring physics and arrange like a friendly collage (see Motion).

## Motion Language

### Easing Principles

Springy and bouncy — the default easing is a spring / elastic curve with overshoot and settle (an ease-out-back or true bounce). Motion is light, brisk, and playful; things pop and settle rather than glide.

### Entry and Exit Patterns

The signature move: icons, shapes, and stickers bounce in — scaling up from small with a spring overshoot, then settling, often arriving one after another to build a collage. Type bounces in per word. Exits are quick pops or scale-downs. A light secondary bounce or jiggle keeps things lively.

### Timing Defaults

| Action | Default Duration | Easing |
|--------|-----------------|--------|
| Bounce-in (shape / icon / sticker) | 0.4–0.7s *(default)* | spring / ease-out-back (overshoot) |
| Word bounce-in | 0.3–0.5s *(default)* | spring |
| Element exit (pop-out) | 0.2–0.4s *(default)* | ease-in / back |
| Stagger (collage build) | 60–120ms between items *(default)* | — |
| Hold | 1.5–3s *(default)* | — |

### Motion Principles

Motion is playful, light, and springy — everything bounces, pops, and settles with elastic overshoot. Build collages by staggering bouncy entrances; keep the rhythm brisk and friendly, never heavy or slow. The bounce is the personality — lean into spring physics.

## Transition Vocabulary

### Bounce-In (signature)
- **How it works:** A shape, icon, or sticker scales up from small with a spring overshoot and settles into place.
- **When to use:** The default entrance — bringing in any element, often staggered to build a collage.
- **Duration:** 0.4–0.7s, spring
- **Example:** A row of feature icons bouncing in one after another.

### Sticker Collage Build
- **How it works:** Multiple cut-out stickers and shapes bounce in in sequence, overlapping into a playful collage.
- **When to use:** Assembling a scene or illustrating a concept from parts.
- **Duration:** staggered (60–120ms apart)
- **Example:** An onboarding scene assembling from bouncing sticker shapes.

### Pop Swap
- **How it works:** One element pops out (scale-down) as the next pops in — a quick, bouncy swap.
- **When to use:** Switching between elements or scenes briskly.
- **Duration:** 0.3–0.5s
- **Example:** One illustration popping out as the next bounces in.

### Colour Wipe
- **How it works:** A bright pop-colour shape grows or wipes to transition to the next scene.
- **When to use:** A playful sectional change.
- **Duration:** 0.4–0.6s
- **Example:** A purple blob growing to fill the frame and reveal the next section.

### Transition Rules
- Lead with the bounce — entrances spring in with overshoot; keep it light and brisk.
- Build complex scenes by staggering bouncy collage pieces rather than dropping everything at once.
- Keep the clean light ground and the four-colour palette consistent; one flat colour per shape, no gradients.
