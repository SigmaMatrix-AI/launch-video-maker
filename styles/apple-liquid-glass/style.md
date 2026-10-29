# Apple Spatial Clarity

A reusable interface language built from spacious editorial composition, continuous interaction and a restrained liquid-glass control layer. Layout, motion and liquid glass are requested core qualities. The rules below are an inferred web-friendly interpretation, informed by Apple's published material principles; they are not an official component specification or measured reconstruction.

## Content first, controls above

Use one dominant heading, one primary content focus and one obvious next action. Give the heading a short supporting sentence and let the content carry the visual interest. Keep a generous quiet margin around each group, with consistent alignment and more space between groups than within them. Large artwork or a purposeful visualization may occupy roughly half the composition; this is a default, not a required split-screen template.

Keep content on a stable, mostly opaque plane; reserve glass for floating navigation, toolbars and contextual controls. Cards are optional organizational containers, never a requirement to tile the whole screen. Group related metadata into compact rows with clear labels. Preserve hierarchy when content density increases by moving secondary details into progressive disclosure.

Use a warm white or very pale neutral base, near-black primary text and subdued gray secondary text. One restrained accent identifies selection and primary action. Richer colour belongs chiefly to meaningful imagery beneath the controls. A dark variant may invert the base and text, but must preserve readable separation.

## A thin optical surface

Glass must reveal recognisable underlying colour and softened shapes, with a thin bright rim, a subtle darker edge and a soft grounding shadow. Its centre remains relatively calm and clear; avoid uniformly milky rectangles, metallic chrome, neon outlines and decorative rainbow shine. Choose opacity according to background complexity so labels remain crisp. Glass is a foreground material, not a blur filter applied to the entire composition.

During a control's movement or expansion, shift a restrained edge highlight and slightly displace or magnify the backdrop near its boundary. This creates optical response rather than a static translucent card. A web rendering may approximate refraction with a locally transformed duplicate of the backdrop, clipped to the glass boundary; blur alone does not satisfy this rule. Keep text and icons outside distortion. This mechanism is an inferred implementation target, not a claim about Apple's renderer.

Use rounded capsules for short control groups and softly rounded rectangles for expanded contextual surfaces. Nested corners should visually share a centre and retain even padding. Radii, tint and shadow values are variable; dimensional restraint and separation are core.

## Typography that travels

Use open, neutral sans-serif letterforms with compact headings, readable body spacing and clear numerals. Font choices here are inferred substitutes, not identifications of Apple's proprietary typography.

| Role / script | Default and verified weights | Selection rationale |
|---|---|---|
| Latin headings, body, labels and numerals | Google font [Inter](https://fonts.google.com/specimen/Inter), upright 400, 500, 600 and 700; Latin coverage | Neutral forms and generous x-height; use 600 or 700 for the main heading, 400 for prose, 500 or 600 for controls. |
| Simplified Chinese headings, body and labels | Google font [Noto Sans SC](https://fonts.google.com/specimen/Noto+Sans+SC), upright 400, 500 and 600; Simplified Chinese coverage | Clear contemporary Chinese forms; use 600 for headings, 400 for prose and 500 for controls. Pair with Inter for Latin and numerals. |

Use Inter for Latin and numerals and Noto Sans SC for Simplified Chinese, with visibly distinct heading, body and label sizes. A useful default heading is 2.5–4 times body size; this ratio is chosen, not measured. Slightly tighten large Latin headings, leave Chinese tracking near normal, and avoid all-caps paragraphs. Keep meaningful heading line breaks and avoid orphaned short fragments. Other scripts require verified additional coverage rather than silent fallback.

## Motion communicates continuity

Every major transition must visibly originate from the control or content that triggered it and settle into a readable hold. A capsule can widen into a contextual panel, an active pill can glide between options, and a selected item can expand into detail while maintaining a shared spatial anchor. Preserve object identity through the transition instead of cutting between unrelated layouts.

Use quick initial response, gentle deceleration and at most one small settling correction; do not loop a bounce. Suggested interaction durations are 350–650 ms for expansion and 180–300 ms for selection feedback. These are inferred starting points, not observed timings. Secondary labels appear after enough space exists, and disappear before the container contracts. Never stretch text with the container.

Keep stable content still during control transitions, and allow at least one second of readable hold after a meaningful state change. Edge lighting follows interaction rather than running an endless shimmer. Do not use arbitrary camera fly-throughs or perpetual floating to manufacture luxury.

If reduced motion is requested, replace geometric travel and optical displacement with a short crossfade; if reduced transparency is requested, use an opaque tonal control surface with the same hierarchy. These conditional adaptations retain labels, selected state and function.

## Variation and native moves

The grammar supports a focused landing view, a media browser, a compact utility or a spacious dashboard. Subject, artwork, accent colour, language and content arrangement may vary. Keep a distinct content plane and a small number of floating control groups. Native moves include a toolbar becoming a popover, a selection pill sliding into place, and content detail emerging from its source. Use only the moves the task needs; no fixed narrative or device mockup is required.

The identity weakens when every block becomes glass, text becomes faint, shadows become heavy, corners lose consistent padding, or animation distracts from the selected state. No Apple logo, copied product screen or hardware frame is needed for recognition.
