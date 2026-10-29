# Neumorphism — Soft Relief Motion

A calm, tactile motion language in which information is molded into a continuous pale surface. It suits short explanations, product narratives and compact data stories. The identity lives in the relief, not in a particular dashboard or collection of controls.

## A continuous material

Keep the stage and all large relief faces the same solid pale blue-gray, default #e0e5ec. This is core, supported by repeated visual evidence. A warmer #f0f0f3 is a conditional whole-scene variation; do not use it to distinguish stacked cards. White is reserved for light and highlights, never a white panel. No black stages, background gradients, glass transparency, grain, metallic reflections or hard outlines.

Every raised form has a soft bright upper-left rim and a soft dark lower-right shadow. Recessed forms have dark inner upper-left edges and bright inner lower-right edges under the same fixed light. Treat these as two shading lobes of one upper-left illuminant, not two independently moving lights. The surface is matte and smooth, with no visible thickness sidewall. Geometry stays shallow and attached to the substrate; avoid floating clay objects.

Use rounded rectangles, capsules, circles and recessed tracks with consistent gentle curvature. These recurring forms are core vocabulary, but their count and arrangement are variable. Borders must not carry the relief illusion. An optional implementation starting point is an outer pair of +8,+8,16 dark #b8bcc2 and -8,-8,16 white; the inset equivalent produces a recess. These are reference CSS units, not measured video pixels. Scale the entire system together; a useful inferred radius is 1.5–3 times the shadow offset, with blur around twice the offset. Avoid shadows so broad they merge neighboring objects.

## Restrained signals and readable type

Use violet #6d5dfc as the default emphasis, with teal #4ecdc4 for positive state, coral #ff6b6b for attention and yellow #ffe66d only for small optional signals. Accent belongs to a word, icon, indicator or narrow progress fill, never a whole card or background. Limit a shot to one dominant accent and at most one semantic secondary accent by default. A small filled meter is a deliberate exception to the neutral-face rule, as seen in the reference components. Pair state color with text, a symbol or a changing value.

Use slate #4b5563 for important text and #6b7280 for supporting text. Keep captions readable instead of copying the reference's extremely faint small print. This increased text contrast is an inferred video adaptation; material contrast stays soft.

Typography is a clean, compact sans serif, with solid bold headlines, open counters, restrained tracking and unornamented labels. Font matches below are inferred selections, not identifications of the source font. Google Fonts metadata verifies the weights and scripts.

| Role | Default selection | Use and coverage |
|---|---|---|
| Latin headings, labels and numerals | Google font [Manrope](https://fonts.google.com/specimen/Manrope), normal 700 for headings, 600 for values, 400 for support | Latin coverage; the family has a 200–800 weight axis. Use tabular numerals where counters need fixed alignment. Its restrained geometric forms fit the rounded material without becoming playful. |
| Simplified Chinese headings and labels | Google font [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC), normal 700 for headings, 500 for labels, 400 for support | Simplified Chinese coverage and a 100–900 weight axis. Use Manrope for separate Latin/numeral runs. Do not let a silent fallback decide the Chinese appearance. |

Use one dominant heading, a compact explanatory line and a small number of large focal objects. As inferred video defaults, headings are about 2–3 times supporting text size; keep useful text within the central 84–88% of the frame. Prefer sentence case for information, with uppercase reserved for a short title or occasional locator. Never shrink an entire webpage grid into a film frame. Sparse left-title/right-object staging or a centered tactile diagram are alternative compositions, not mandatory layouts. Reflow for portrait work instead of cropping. Preserve room for the soft shadow around every form.

## Information becomes a physical state

Raised forms suggest available actions or discrete entities; recessed wells suggest stored content, tracks or activated states. A panel may contain a few controls, but avoid recursive card nesting. Use depth, position and size for hierarchy before adding color. A process can be told by a recess accepting a signal, a meter filling, or a selection pressing into the surface. Choose only controls or symbols that explain the subject; decorative fake dashboards are not the identity.

## Motion adapted for video

No motion was observed in the static references. The following are inferred video rules informed by the supplied written interaction descriptions; durations are chosen defaults, not measured footage.

Change a pressed element from raised to flat to recessed while keeping its position, footprint and label fixed. For release, reverse the depth sequence. Do not move, bounce or scale the button to imitate pressing. Blend outer shadows toward zero, then blend in inner shadows; avoid an abrupt outer/inset switch. Default depth changes take about 300 ms with smooth ease-in-out and no overshoot. An anticipation cue may first halve the outer shadow, echoing the written hover behavior, without making the control lift.

A recessed track stays fixed while its raised thumb slides within it; a dial rotates its indicator without rotating the light. Progress advances inside a recessed channel and stops cleanly at its stated value. The prohibition on button translation does not prohibit a thumb's functional travel. If an input well becomes active, make its inner shadow shallower rather than deeper. These conditional actions are alternatives; a video need not include every control.

Keep the camera frontal and stable by default so the subtle material change can be read. Reveal content by fading it in or growing relief from zero depth. Across shots, flatten relief into the same continuous surface before the next composition appears; an unobtrusive cut is also allowed. Do not use whip pans, orbiting lights, flying cards, spring motion or full-screen color wipes.

Use a clear action followed by a reading hold; avoid simultaneous unrelated movement. As a video default, allow at least one second to read a compact resulting state, longer for more text. Long meter changes may take 0.8–1.5 seconds; the 300 ms default applies to local state transitions, not an entire story. Timing and object count may vary with information density while the attached-surface behavior stays core. Audio is optional and must not be needed to understand the change.

## Variation without drift

Subject, language, aspect ratio, diagram structure and exact timing may change. Preserve continuous neutral material, fixed light, paired relief shading, roundness, sparse color and stable state changes. For reduced-motion playback, replace travel with a direct state change and a readable hold. Dense tables, photographic scenes and long paragraphs need separate editorial treatment; this style has only provisional support for those uses.
