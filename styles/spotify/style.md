# Design — TapVid · Bold Pulse（Shopify）

---

## Visual Style

A loud, high-energy beat-sync system in the Spotify hype idiom (Wrapped, drops, new-release ads) — built for maximum impact, where oversized ultra-bold type and saturated colour-blocks hit hard and fast on the music. The core is maximum contrast: bright Spotify Green (#1DB954) and white on a near-black ground (#121212), with bold saturated colour-blocks that hard-cut between scenes — flat, graphic, and punchy, with no gradients, no shadows, and no subtlety. Type is the hero: ultra-bold UPPERCASE in the heaviest weights, oversized and often filling or cropping past the frame, with kinetic motion as the signature — words bounce, scale-punch, and pulse in time with the beat. Compositions are flat full-frame colour fields — a single bold block per cut with giant type and high-contrast duotone or cutout imagery (album art, artist, product) — no depth, the energy coming entirely from contrast, scale, and rhythm. The edit is the design: everything is locked to the beat — explosive type slam-ins, hard colour-block cuts, the occasional strobe — fast, relentless, and energetic, with Spotify Green recurring as the through-line so it always reads as one hyped, unified piece.

## Core Palette

### Colors

| Role | Name | Hex | Usage Rule |
|------|------|-----|------------|
| Primary | Spotify Green | #1DB954 | Signature accent — energy, key type, green colour-blocks; the brand's core hit |
| Secondary | Off-Black | #121212 | Near-black ground and dark colour-blocks |
| Accent | Bright Pop | rotating | Saturated brights used as fast-cutting colour-blocks and accents (see Bold Block Set) |
| Background | Near-Black | #121212 | Default ground — maximum contrast against green and white; cuts to colour-blocks |
| Surface | Colour Block | full-frame | The "surface" is whatever full-bleed colour field is on screen (green / black / white / one bright) |
| Text Primary | White | #FFFFFF | Ultra-bold uppercase type on dark or on a colour-block |
| Text Secondary | Light Gray | #B3B3B3 | Supporting text *(default — Spotify's muted gray)* |
| Emphasis | Green / Invert | #1DB954 | Focal hit — green type, or a hard invert (black-on-green, green-on-black, white-on-bright) |

### Bold Block Set

The full-frame colours that hard-cut on the beat (one per block, never blended):

| Name | Hex |
|------|------|
| Spotify Green | #1DB954 |
| Off-Black | #121212 |
| White | #FFFFFF |
| Hot Magenta | #FF4691 *(default)* |
| Electric Blue | #2D46B9 *(default)* |
| Bright Yellow | #FFD23F *(default)* |
| Vivid Orange | #FF6437 *(default)* |

*Green + near-black + white are the high-contrast core (your brief). The saturated brights are on-brand defaults for the "colour-block fast cuts" — adjust or trim the set freely; use one bright per block, never muddy combinations.*

### Palette Rules

- Maximum contrast always — green or white on near-black, or hard inverts; never low-contrast or muted combinations.
- One bright per colour-block; blocks fast-cut on the beat (green / black / white / a single bright) — never blend, never gradient.
- Spotify Green (#1DB954) is the through-line — the one colour that recurs across every cut.
- No soft shadows, no gradients, no subtlety — the energy is flat, saturated, and high-contrast.

## Typography System

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Headline | Bold Grotesque, UPPERCASE *(choose a face)* | 80–200px | 800–900 Black | Oversized ultra-bold uppercase — fills the frame; the main visual |
| Body | Bold Grotesque | 24–36px | 600–700 | Short punchy copy (minimal — hype is headline-led) |
| Caption | Grotesque | 16–20px | 500–600 | Labels, tags |
| Data / Number | Bold Grotesque | 120–300px | 800–900 Black | Giant stats — stream counts, dates, "#1"; Wrapped-style hero numbers |
| Emphasis | Bold Grotesque | inherits line | 900 / green | Hit words — green fill or invert, even heavier |

*All UPPERCASE, heaviest weights, tight tracking and leading. Spotify's Circular is proprietary — choose a heavy geometric grotesque (a Circular-like face, or a free bold grotesque) and supply its `.woff2` files in `fonts/`. Sizes are @1080p defaults — scale to canvas, and let type crop past the frame edges for impact.*

### Typography Rules

- Ultra-bold, UPPERCASE, oversized — type is the hero and often fills or crops past the frame; tight tracking, tight leading.
- Heaviest weights (800–900 Black); minimal copy — say it in a few big words.
- Left-aligned or centred for maximum punch; type can run edge-to-edge.
- Fallback stack: [bold grotesque] → "Arial Black", system-ui, sans-serif. *Ensure the chosen face's `.woff2` files are present in `fonts/`, or it falls back to the above.*

### Text Animation

- Kinetic type is the signature: words bounce, scale-punch, and pulse in time with the beat — every accent lands on a beat.
- Explosive entrance: type slams in (fast scale-up with overshoot, or an instant snap) on the beat — never a gentle fade.
- Words and lines cut, swap, or jump per beat; per-word and per-letter kinetic motion is encouraged here (the opposite of the calmer presets).

## Environment Grammar

- **Space Construction:** Flat, full-frame colour fields — each scene is a single bold colour-block (green, near-black, white, or one bright) with oversized type and/or imagery cropped hard against it. No perspective; the look is graphic and flat.
- **Depth Logic:** None — deliberately flat. Punch comes from contrast, scale, and the beat, not from layering or shadow. Imagery (album art, artist, product) sits flat on the block, often as a high-contrast duotone or a hard cutout.
- **Environment Variants:** Every cut can change the block colour and the type, but the system stays flat and high-contrast — Spotify Green recurs, type stays ultra-bold uppercase, and everything cuts on the beat with no easing into new looks.

## Motion Language

### Easing Principles

Fast and punchy — snappy ease-out, hard overshoots, and hard cuts on the beat. Motion is percussive and energetic, never smooth; everything is timed to the music. *(No slow eases — the opposite of the premium presets.)*

### Entry and Exit Patterns

Type and elements slam in — explosive scale-up with overshoot, or an instant snap on the beat. Colour-blocks hard-cut (no transition) between beats. Exits are fast — a cut, or a quick scale-out. Kinetic type pulses and bounces to the beat between hits.

### Timing Defaults

*Everything is beat-locked; the values below are short defaults — tighten to the track's BPM.*

| Action | Default Duration | Easing |
|--------|-----------------|--------|
| Colour-block cut | instant (on beat) | — |
| Type slam-in | 150–300ms *(default)* | ease-out + overshoot |
| Kinetic pulse / bounce | per beat *(default)* | snappy |
| Element exit | 100–250ms *(default)* | ease-in / cut |
| Hold (between beats) | beat-length (short) | — |

### Motion Principles

Everything hits on the beat — colour-block cuts, type slams, and kinetic pulses are all locked to the music. Motion is fast, percussive, and high-energy; nothing eases slowly and nothing idles. The rhythm of the edit IS the design — cut hard, hit hard, keep the energy relentless.

## Transition Vocabulary

### Beat Cut (signature)
- **How it works:** A hard cut to a new colour-block or scene, exactly on the beat — no blend.
- **When to use:** The default — every major transition lands on a beat.
- **Duration:** instant
- **Example:** Cutting from a green block to a black block on the downbeat.

### Colour-Block Swipe
- **How it works:** A bold colour-block wipes fast across the frame to reveal the next scene.
- **When to use:** A punchy transition between beats when a hard cut isn't enough.
- **Duration:** 150–300ms
- **Example:** A green block swiping over to reveal the next stat.

### Type Slam
- **How it works:** Oversized type explodes in (scale-up + overshoot) on the beat, becoming the scene.
- **When to use:** Introducing a hit word, name, or number.
- **Duration:** 150–300ms
- **Example:** An artist name slamming onto a black frame on the drop.

### Strobe / Flash
- **How it works:** A rapid 1–2 frame flash (white or green) punctuates a beat between cuts.
- **When to use:** Accenting a big hit or drop — use sparingly.
- **Duration:** 1–2 frames
- **Example:** A white flash on the bass drop before the next block.

### Transition Rules
- Everything cuts on the beat — transitions are locked to the music.
- Hard cuts and fast wipes only; no slow fades or dissolves (they kill the energy).
- Spotify Green recurs through the cuts as the through-line; one bright per block, never blended.
