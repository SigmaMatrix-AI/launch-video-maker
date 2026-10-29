# Swiss Motion Typography · Swiss Motion

Pure two-dimensional grid typography: paper, black text and shapes, pale gray supporting layers, and a single saturated signal color. Order comes from precise alignment, extreme scale contrasts, and placement on the beat; when an exception is needed, let only one element depart from the system.

## Paper and color

Use off-white #EAE9E5, paper white #FFFFFF, and ink black #111111 by default, with two or three light gray tones; red #E30613 is an option for the signal color. Orange, ultramarine, or green may suit the theme, but choose only one saturated color per work.
Concentrate the signal color on one main element; keep everything else in black, white, and gray. Black text may overprint the signal-color block. Pale gray blocks may sit behind black ones as a second information layer, without drop shadows or volumetric lighting.
Use clean solid fills and sharp edges throughout, without paper texture, grain, gradients, blur, glow, or skeuomorphic shadows. Merge adjacent grid cells of the same type into long strips, overlapping seams slightly to avoid thin white gaps.

## Grid and composition

Use a 1920×1080 reference canvas: 12 columns, approximately 96 px side margins, 24 px gutters, and a 24 px baseline interval; scale proportionally for other resolutions.
Place text, lines, and shapes on the same grid, leaving generous empty space. A two-page spread can explain the rule on the left and show the graphic on the right; this is a default option, not a fixed shot structure.
Content graphics may use a separate, coarser modular grid whose columns and rows have clear purposes. Use a few broad blocks to establish weight and a rhythm of lengths; avoid piling up thin strips that accidentally resemble a statistical chart. Read bars as data only when the content explicitly assigns quantitative meaning to them.
Contrast oversized numbers or headings with tiny technical annotations. Optically align large text to the left grid edge, correcting the glyph's left-side whitespace rather than merely aligning its text box. Small explanatory lines may sit in the footer or a corner, with a thin horizontal rule above.

## Type and text

Use a single neo-grotesque sans-serif family throughout, such as openly licensed versions of Archivo, Inter, Schibsted Grotesk, or Instrument Sans, with weights distinguishing hierarchy. Archivo is the default; load all required weights before rendering.
Left-align everything with a naturally ragged right edge; headings may be lowercase. At the reference size, text above 90 px can use approximately −2% tracking; technical annotations are approximately 19 px at medium weight, with an approximately 1 px rule above.
When captions are present, integrate them into the current composition at a column start, using a small pale gray lead-in and a larger bold main phrase rather than a separate bottom caption bar. Text rises through a clipping window from below the baseline and exits upward; schedule word-by-word reveals to the beat or actual speech timing when needed. Hold fully revealed captions for at least 1.8 seconds and through 0.6 seconds after speech ends. Without narration, also hold main reading text for at least 1.8 seconds (an inferred readability default).

## Motion and beats

Use only two curves: cubic-bezier(.7,0,.2,1) for precise placement, and linear motion for growing lines, scan lines, and exceptional elements. Do not use bounce, springs, or overshoot and rebound.
Set motion durations to whole beats or subdivisions of the chosen beat; start snapping motions early so they reach their target on the beat. Render every frame continuously rather than artificially lowering the motion update rate. Without an established rhythm, 120 BPM is a starting point for design, an implementation suggestion rather than a fixed style parameter.
Enter with wipes or clipped reveals, not fades; lines grow along their length, and numbers may rise in modular steps. For deletion, a thin line may sweep through the object before it compresses to its centerline, creating a “knife cut.”
For an “exception,” let the sole signal-color element leave the grid linearly without snapping; it may pause en route, or coordinate annotations may indicate the deviation. Other elements continue to obey the grid; when rearrangement is needed, settle them outward from the changed position in order of distance.

## Camera and boundaries

A fixed camera is the default option. When movement is needed, use the same two-dimensional transforms and precise easing to move one column or page on the beat, rotate 90° and settle, push into a module, or pull back to reveal a group of layouts in the same system. Add new labels only after rotation has finished and settled to avoid competing for attention. Use wipes, knife cuts, camera movement, or layout rearrangement for transitions.
This is a graphic design system in motion. Avoid launch-event gradients and device renders, lyric-style flying and spinning text, meaningless statistical bar charts, and piles of primary-color geometry. Do not copy the original example's concert poster, titles, credits, or historic poster composition.
