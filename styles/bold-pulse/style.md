# Bold Pulse

---

## Visual Style

A high-energy system for music releases and product announcements, where oversized ultra-bold type and saturated colour blocks move to the beat. The core is maximum contrast: vivid green (#1DB954) and white on a near-black ground (#121212), with hard cuts between flat, full-frame colour fields. Use no gradients or shadows. Type is the main subject: heavy uppercase words fill or crop past the frame, then bounce, scale, and pulse with the music. Duotone or cutout imagery supports the headline without adding perspective or depth. Connect scenes through a recurring accent colour, percussive type entrances, and fast cuts. Adapt the accent and imagery to the product's own identity.

## Core Palette

### Colors

| Role | Name | Hex | Usage Rule |
|------|------|-----|------------|
| Primary | Pulse Green | #1DB954 | Default recurring accent for key type and green colour blocks; adapt to the product palette |
| Secondary | Off-Black | #121212 | Near-black ground and dark colour-blocks |
| Accent | Bright Pop | rotating | Saturated brights used as fast-cutting colour-blocks and accents (see Bold Block Set) |
| Background | Near-Black | #121212 | Default ground — maximum contrast against green and white; cuts to colour-blocks |
| Surface | Colour Block | full-frame | The "surface" is whatever full-bleed colour field is on screen (green / black / white / one bright) |
| Text Primary | White | #FFFFFF | Ultra-bold uppercase type on dark or on a colour-block |
| Text Secondary | Light Gray | #B3B3B3 | Supporting text on dark backgrounds |
| Emphasis | Green / Invert | #1DB954 | Focal hit — green type, or a hard invert (black-on-green, green-on-black, white-on-bright) |

### Bold Block Set

The full-frame colours that hard-cut on the beat (one per block, never blended):

| Name | Hex |
|------|------|
| Pulse Green | #1DB954 |
| Off-Black | #121212 |
| White | #FFFFFF |
| Hot Magenta | #FF4691 *(default)* |
| Electric Blue | #2D46B9 *(default)* |
| Bright Yellow | #FFD23F *(default)* |
| Vivid Orange | #FF6437 *(default)* |

*Green, near-black, and white form the default high-contrast core. Adjust the accent and saturated brights to the product palette; use one bright per block and keep the colours distinct.*

### Palette Rules

- Maximum contrast always — green or white on near-black, or hard inverts; never low-contrast or muted combinations.
- One bright per colour-block; blocks fast-cut on the beat (green / black / white / a single bright) — never blend, never gradient.
- Repeat Pulse Green (#1DB954), or the chosen product accent, across cuts to connect the sequence.
- No soft shadows, no gradients, no subtlety — the energy is flat, saturated, and high-contrast.

## Typography System

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Headline | Bold Grotesque, UPPERCASE *(choose a face)* | 80–200px | 800–900 Black | Oversized ultra-bold uppercase — fills the frame; the main visual |
| Body | Bold Grotesque | 24–36px | 600–700 | Short punchy copy (minimal — hype is headline-led) |
| Caption | Grotesque | 16–20px | 500–600 | Labels, tags |
| Data / Number | Bold Grotesque | 120–300px | 800–900 Black | Oversized numbers for verified metrics, dates, or release details |
| Emphasis | Bold Grotesque | inherits line | 900 / green | Hit words — green fill or invert, even heavier |

*Use uppercase, heavy weights, tight tracking, and tight leading. Choose a geometric grotesque with a license appropriate for the project, and supply its `.woff2` files and required license notices in `fonts/`. Sizes are defaults for a 1080p canvas; scale them to the output and allow deliberate cropping for emphasis.*

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
- **Environment Variants:** Every cut can change the block colour and the type, but the system stays flat and high-contrast. Repeat the chosen accent, keep type ultra-bold and uppercase, and cut on the beat.

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
- Repeat the chosen accent across cuts; use one bright colour per block, never blended.
