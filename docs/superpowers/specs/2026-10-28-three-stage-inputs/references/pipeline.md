# From product to film

The entire video serves product promotion. Understand the product before deciding how to film it; proceed autonomously and continually refine the concept while watching drafts.

## 1. Understand the product and find a change worth showing

Visit product pages to identify core selling points, must-show features, and brand character.
### Product + Launch
- Product: what it does, for whom, category, what it replaces.
- Feature: what exactly is it, what problem does it solve, up to 3 benefits.
- Slogan: the best sentence to represent the product.
- Product access: necessary screenshots, fullpage 2X screeshot, per-element cutout.
- CTA

### Brand kit
- Palette and Material: primary color, theme color (accompaniment color); role (canvas, ink, primary, accents),light or dark
- Logo: logo mark , logos
- Motion: easing personality (precise vs bouncy), speed
- Tone: Brand tone: modern, retro, minimalist, etc.
- Visual style: icons, shapes, illustration, signature motifs

Briefly record these answers, asset paths, sources, and usage grounds in `records/brief.md` so later production and review can find them; do not create a separate table for every question.
Missing brand data → use neutral defaults and say so. Missing product facts → ask; never invent them.

Condense the core promise into one sentence: whom it helps, and what it improves. Find one real input→key operation→result that proves it; organize multiple features around this value.

## 2. Form the director's concept

Use the production standards in SKILL.md and [eval.md](eval.md) to choose a story, visual character, and memorable image for this product. Start from `style.md` in `styles/`, a reference film, or your own design; reference specific composition, motion, or material techniques, and clarify the fidelity scope requested by the user.

Open with a familiar difficulty, unexpected result, or desirable experience that makes target users feel “this is relevant to me.” Build anticipation around the key demonstration and deliver the promised value, making the product's before/after difference clear. End with a next step suited to its current release status, such as trying it or joining a waitlist. Narrative order is flexible.

For films with music, select an available, usable track matching the product early. Listen for buildup, progression, climax, and ending, and place the strongest product result appropriately. For silent requests, establish rhythm through visual changes and readable holds.

Use a brief storyboard to explain what viewers should understand in each section, what they actually see, its connection to the next section, approximate duration, and sound relationships. Carry one representative case through the film, cover required items, and allow time to read visuals and let results settle. First create the key visual or a short motion study to verify assets, composition, and action, then expand to the whole film.

## 3. Build a watchable draft

Create an independent project in `films/<project-id>/` or the user's chosen location, following [tech.md](tech.md). Keep actual source, assets, and dependencies in the project; do not modify the template itself or implicitly depend on other film directories.

Collect missing states or high-resolution assets per shot. First combine story, main actions, connections, and music into a complete moving draft, then refine pressing, following, snapping, glyphs, materials, and sound. The draft may inform storyboard changes; there is no need to document every parameter first.

`records/direction.md` stores key creative decisions; `records/storyboard.md` stores actual shot order, frame ranges, assets, and sound anchors. Records support continuation and inspection, with length proportional to film complexity. Runtime tools read these three record files by default; when merging or renaming them, specify locations in `records/review-context.json`, as described in tech.md.

## 4. Watch, listen, and polish

Watch and listen to the whole film following [eval.md](eval.md), recording specific issues: whether operations are understandable, whether the subject only enters as whole pages and switches pages, whether focal points compete, whether text can be read completely, and whether motion aligns with sound. Fix product communication and editing before details.

For every issue, record its time, observed behavior, correction, and rewatch condition. After fixing, rewatch the section, surrounding transitions, and whole film; update affected mixes. Complete independent review under [quality assurance](tech.md#quality-assurance), honestly retaining unverified items.

## 5. Delivery and continuation

Provide the project, check status, and local preview according to SKILL.md's delivery agreement. Verify the current service URL, playback, and asset readiness, keep the service running, and provide a clickable link. Generate MP4 only after an explicit export request, then inspect the actual output.

Continue from current work and user feedback, updating only affected decisions, shots, and assets; previously confirmed requirements remain valid. After project changes, update preview and check evidence rather than carrying over old passing conclusions.
