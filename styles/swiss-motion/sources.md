# Sources and extraction scope

The user requested extracting swiss-motion from lemo-opuscar. Source directory: /Users/mac/Documents/repo/lemo-opuscar/styles/swiss-motion/.

- STYLE.md: primary source; retains reusable rules for the grid, single font, single signal color, precise beat placement, and exceptional elements.
- poster.jpg: inspected in full to verify solid paper colors, type weight/scale, whitespace, shapes, and explanatory lines. Original dimensions: 1920×1080.
- DEMO.md: used only to identify example-specific story and parameters; does not reuse Five Rules for a Poster, the concert poster, original credits, or the five-rule narrative.
- demo/ease.js and demo/main.js: used only to verify easing, beats, and font loading; no source code or font files were copied.

No finished swiss-motion video was found locally. Motion was therefore not observed in video; temporal behavior in the specification comes from the source text selected by the user (requested), with source code used only to corroborate its implementation meaning. The poster itself cannot establish motion characteristics.

Retains the source document's 1920×1080 canvas, 12 columns, approximately 96px margins, and 24px gutters/baselines. 120 BPM is only an implementation starting point used in the source demo and is explicitly marked as a suggestion in the new style rather than fixed into it. The default red palette and Archivo font come from options provided in the source document.

Source differences: the poster contains both a red circle and red thin lines, whereas STYLE.md assigns the signal color to a single main element; this extraction follows the reusable document rule. The source main.js also loads two decorative fonts to demonstrate font selection; this extraction follows the final single neo-grotesque family rule. The original 1.8-second hold requirement applies to captions; here it is a conservative default for main reading text in silent validation, not timing observed from the poster.

Music, voiceover, and mixing workflows are not extracted; only their significance for visual rhythm is retained. Solid colors and text express the style without extra material implementation attachments. Film-production instructions in the reference documents are not instructions for this task.

Validation subject: a reading schedule accommodates an impromptu reading while other entries stay orderly. New content may continue to use spreads, broad modules, and technical annotations without reproducing the original example poster. The video tests style, not finished-film narrative quality.

## Repository import record

Imported from the local style library on 2026-10-27, without rewriting the style.md body. The cover [cover.jpg](cover.jpg) was copied from `swiss-motion/proof/round-1/frames/f05.jpg`, an existing demo still; the source directory had no separate cover file. Only style Markdown, source notes, and the cover were included; the demo engine and fonts were not migrated. The source library remains intact.
