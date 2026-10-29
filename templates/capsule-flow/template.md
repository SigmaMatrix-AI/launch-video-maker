# Capsule Flow — From an idea to a finished film (82.05s)

This film introduces a product through a complete creation process: click the entry point, enter a request, reference materials, generate structure, choose visuals, refine content, show results, and finally reveal the brand. It suits creative tools, AI products, and workflow software with clear inputs, a process, and presentable outputs. **TapVid is only the bundled runnable example, not the template's name or scope limit.**

The key reference is **how the same object connects one shot to the next**: a category capsule becomes the entry point; a pullback from giant input text reveals the full capsule; the capsule expands into an input interface; scattered cards settle into a gallery; a creation symbol introduces the result; and a frosted brand button leads into the launch finale. This is more than placing successive feature screenshots into one panel.

- Specifications: 1920×1080, 30000/1001 fps, 2459 frames, approximately 82.05s.
- Implementation: React / TypeScript / SVG, driven by a unified frame clock; [film.tsx](film.tsx) is the entry.
- Reuse: preserve actions, camera work, spatial relationships, composition, and rhythm by default, adapting only product content and style. Base removals and changes on product facts, user requests, or specifications, following [template adaptation conventions](../../references/template-conventions.md).
- The product name, URL, green palette, finger logo, airplane symbol, screenshots, cases, and copy are all example content. The target product need not use the same brand color, icons, or feature names.

## 1. Understand the whole film first

**Rhythmic structure**: minimal entry and category words → accelerated click and giant input text → pull back and expand the input interface → generate structure → scattered cards gather into a results wall → refine content and express the brand → inspiration and editing → creation transition and result playback → rapid use-case cuts → quiet brand landing.

Large text, UI detail close-ups, wide views, dense content walls, and real results alternate. Whitespace supports reading and anticipation; large-scale motion adds emphasis; highly saturated stages create periodic peaks.

### Chapter overview

Frame ranges use actual output `[start,end)`; seconds are approximate. Components still use source time, mapped through `src/timeline.ts`; do not directly overwrite internal anchors with output seconds.

| Section | Output seconds / frame range | What the audience sees and understands | Content needed before production | Main source |
| --- | --- | --- | --- | --- |
| 1 Entry and request | 0–9.41 / 0–282 | Category cube flips, entry enlarges and is clicked, menu selection, passing symbol, giant task text | Short capability words, entry, task, feature evidence | Opening / Prompt |
| 2 Input to structure | 9.41–17.82 / 282–534 | Pull back to full capsule, expand into input interface, place materials, create, reveal full outline | Real input, parameters, and output from the same case | Generate |
| 3 Selection and results | 17.82–24.26 / 534–727 | Title contracts, entry is clicked, scattered cards gather into a 4×3 gallery | 12 distinct results and their sources | StyleScene |
| 4 Content and brand | 24.26–43.51 / 727–1304 | Content generation, detail enlargement, forms, and real settings interface | Actual content and evidence of standards-related capabilities | ScriptVoice |
| 5 Revision and editing | 43.51–50.65 / 1304–1518 | Prompt revision and real editing state | Revision request, before/after states | Workflow / EditScene |
| 6 Inspiration and refinement | 50.65–61.63 / 1518–1847 | Content wall, hero asset, refinement view | Case collection, high-resolution assets, feature evidence | Workflow / ShowcaseScene |
| 7 Creation and result | 61.63–71.14 / 1847–2132 | Create button, matching-shape symbol transition, real result | Creation action, result video | Workflow / ResultScene |
| 8 Uses and finale | 71.14–82.05 / 2132–2459 | Frosted brand button, rapid use-case cuts, logo and CTA | Positioning, uses, mark, CTA | Finale |

This is a reference narrative, not a required feature checklist. If the product lacks scripting, brand settings, or video output, adapt or remove entire units using real capabilities; do not merely change titles while retaining false operational implications.

## 2. Actions, spatial staging, and adaptation priorities by section

Compare anticipation, peak, settling, and connection to the next shot, not just settled screenshots.

### 1. Entry → menu → giant input text

- A fixed phrase and category capsule sit horizontally; the central word flips as a cube while fine lines move around it. Side text retreats, the capsule becomes the entry, and the pointer presses and releases.
- The menu moves vertically to hit its target; the creation graphic grows and sweeps past with an offset before yielding to oversized task input. Semantic emphasis uses a gradient; supporting words stay dark gray.
- New product: replace category, entry, menu, and task; recalculate text width, typing slices, cursor, and framing together. Replace the graphic with the product's creation symbol while preserving the shape connection from control to transition.

### 2. Request → input interface → structure

- Continue from the previous shot's final frame: first pull back from text close-up to the full capsule, then continuously change the same shell's height, corner radius, and surface. Do not cut directly to a different UI.
- Material tags settle above the body text; bottom parameters and creation controls appear. A click leads into the Creating push transition, then pulls back to the full structure.
- New product: URL is only this example; use supported files or other actual inputs. Input, prompt, and structure must belong to the same case; recalculate controls, clicks, and reading time after changing content.

### 3. Title → scattered cards → gallery

- Giant text contracts and the entry is clicked; cards gather from the sides, foreground, and background, retaining differences in rotation, size, and occlusion, then settle into a 4×3 grid.
- The current version moves directly from gallery to content refinement, without a bottom playback bar or three separate zoom shots.
- New product: use real results with varied subjects and palettes; update grid and trajectories when counts change, and use high-resolution sources for cards near the camera.

### 4. Content → brand expression

- Large text contracts into an operational prompt; a content panel generates and pushes into a detail view. Form changes and real settings interfaces follow one another to convey content flexibility.
- Keep slogan text and stage clear, without waveforms. ScriptVoice is a legacy filename and does not require the target product to have audio features.
- New product: show real generation, settings, or standards capabilities. Adapt the narrative when features are absent; do not use example interfaces to make false claims.

### 5. Revision → edited result

- A specific revision request introduces the real interface; close and wide views show where changes occur.
- New product: prepare before/after states from one case, ensuring the request matches the change; source-drawn UI must reflect real functionality and layout.

### 6. Content wall → inspiration and refinement

- Content in multiple sizes spreads out, followed by a hero asset and refinement interface; preserve object identity, proportions, and spatial paths.
- New product: prepare wall assets and near-camera hero assets at appropriate separate resolutions; retain real content's original colors.

### 7. Creation → result

- Emphasize the creation symbol in a dark control; a matching-shape symbol brings in the result. There is no recording countdown and no implication that a person is necessarily being recorded.
- New product: the result may be a design, dashboard, generated content, or another real output; the current person video is only an example. Clearly label standalone cases and do not claim they were actually generated from the previously demonstrated input.

### 8. Brand button → rapid use-case cuts → finale

- A frosted button with large rounded corners uses a pale surface, white highlighted edge, soft shadow, and centered complete logo. It compresses slightly on click, and a ripple introduces a short positioning phrase.
- Uses appear first on a light background, then enter a high-energy stage, before returning to the logo and CTA.
- New product: replace the full logo, uses, and positioning while retaining native proportions. Do not apply short-word timing directly to long sentences or inherit the example's features or release status.

## 3. Preproduction asset list

First establish “selling point → evidence → usable visual → corresponding section.” Collect initial real content during research so storyboards do not fill with fake assets.

| Material | Current example / location | What to prepare for a new product |
| --- | --- | --- |
| Product identity | TapVid name, logo, finger, URL, category words | Target logo, theme color, positioning, uses, CTA |
| Input and structure | URL card, prompt, outline screenshot | Real input, parameters, output structure from the same case |
| Content and editing | demo-script, demo-edit, brand, fix | Feature screenshots, revision states, body copy; remove/adapt if capabilities are absent |
| Work selection | case-0 through case-11 | 12 real results, at least 960×540; higher resolution for close-ups |
| Result | showcase.mp4 | Approximately 7.5-second result; example is 1280×720, prefer 1080p or higher replacements |
| Fonts | GoogleSans-Regular.ttf | Available fonts required by the style; recalculate widths, wrapping, and cursor |
| Sound | Reference BGM, no voiceover | Task-specified or licensed sound; remove tracks for silent tasks |

Assets are registered in film.tsx. The logo reaches approximately 710×234, preferably vector; screenshots should be 1920px or wider, or captured at 2×. Prepare resolution for maximum visible size and inspect intermediate motion frames, not only the shrunken state.

## 4. Assign color roles instead of globally replacing the theme color

Distinguish “stage/interface,” “product identity,” “work content,” and “motion emphasis” before applying style. Color names below describe design roles, not existing configuration interfaces; the current source has no `brandColor` switch replacing all colors.

| Color role | Current example | New product and style |
| --- | --- | --- |
| Reading stage | White background, dark gray text, low-opacity green light | Retain hierarchy and whitespace; background and ink colors may change |
| Control surfaces | Pale entry; frosted gray-green/gray-blue, white edges and soft shadows | Preserve material and pressing behavior; do not simply fill with a solid brand color |
| Semantic emphasis | Bright green→leaf green→bright green | Example spectrum; may become a harmonious gradient |
| Motion and transitions | Creation-symbol band, Creating, forms | Retain direction, layers, and saturation rises/falls |
| Features and states | Real interface status colors | Respect target UI semantics without global tinting |
| Work content | Multicolor cases and real results | Preserve original colors; avoid fake monochromatic cases |
| Full-screen peaks | Highly saturated stages in rapid use-case cuts | Recolor to style while retaining periodic rhythmic changes |
| Brand identity | Example logo and product name | Replace with evidence-based target-brand elements |

src/palette.ts centralizes example gradients but is not the film's only color entry point. Frosted materials, feature states, and real content have separate roles. The template requires neither green nor airplane/finger brand imagery.

## 5. Product adaptation guide

### 1. Establish product and case before selecting sections

Read the official site, source, or available product; organize uses, audience, selling points, must-show features, and execution constraints while collecting real pages and good cases. Mark each chapter “retain / adapt with real functionality / remove” with evidence. Prioritize one understandable end-to-end case rather than splicing unrelated example inputs and results.

### 2. Create an independent film project

Copy required source, assets, `package.json`, lockfile, and `vendor/` into repository `films/<project-id>/`, which Git ignores. Exclude `node_modules/`, `.lvm/`, old exports, and old evaluation reports; the new film must not reference template paths at runtime. Record the reference version and borrowed intervals. The new film inherits neither template scores nor acceptance status.

### 3. Map each shot to its assets

Record “original section → new section → product fact → asset file → motion/framing → reason for adaptation” in the storyboard. Obtain high-resolution assets that will become shot subjects before animating, especially scattered foreground cards, gallery heroes, and real editing interfaces. Lock card count, slots, click coordinates, and camera endpoints only after assets are ready.

### 4. Replace content at source entry points while preserving motion relationships

| Editing entry | Replacements | Linked checks |
| --- | --- | --- |
| Opening / Prompt | Categories, entry, menu, task | Cube back, label handoffs, typing, cursor, framing |
| Generate | URL/attachments, parameters, prompt, outline | Continuous capsule dimensions, corners, and center; material placement and clicks |
| StyleScene | Title, entry, gallery | Scattered-card layers, grid, exit seams |
| ScriptVoice / Workflow | Script, brand, revisions, cases, results | Copy correspondence, screenshot crops, clicks, video frame acquisition |
| Finale | Mark, positioning, uses, CTA | Native proportions, material, pressing, reading hold |
| palette / CreatePlane | Gradients, creation graphic | Matching shapes across shots, original colors of real content |

There is no unified settings panel; copy is spread across components. After editing, search TapVid, tapvid.ai, old tasks, cases, and logo references, replacing or explaining each; editing film.tsx alone is insufficient.

### 5. Integrate style by color role

First preserve reference space and timing, then separately handle background, body text, gradients, controls, states, and brand placement as described above. Keep real cases' original colors. After changing fonts, check maximum text size, width, wrapping, and cursor shot by shot; do not evade giant-text composition by shrinking it or using a generic title panel.

### 6. Update every time anchor when changing duration

film.tsx receives output frames, maps them through toSourceFrame, then passes them into components. Source frames [727,808) and [2005,2064) are currently removed; internal actions still use source time.

- When modifying src/timeline.ts, also check total frames, chapters, routing, and markers.
- Adjust internal t/tr/p and absolute frame anchors as groups, not just the chapter table.
- Update media frame acquisition, trims, holds, and asset declarations.
- Update track endings, trims, gain, and fades; silent tasks use an empty audio track.
- Local-frame conversion must cover the entire action and media, followed by arbitrary-frame consistency verification.

### 7. Inspect each shot before delivery

Inspect at least anticipation, action peak, settling, and the next-section seam for each section, and watch continuous playback. Sample more densely for scattered cards, giant text, images entering the canvas, and person changes. After internal fixes, evaluate the current version according to [independent evaluation requirements](../../references/tech.md#quality-assurance). Deliver a previewable project by default; open preview when requested and generate MP4 only after explicit export requests.
## 6. Shared implementation and check priorities

| Entry | Purpose |
| --- | --- |
| film.tsx | Specifications, assets, tracks, chapters, routing, and markers |
| src/timeline.ts | Source/output frame mapping, removed sections, and total length |
| src/ui.tsx / motion.ts | Stage, panels, headings, interpolation, and easing |
| src/palette.ts | Example gradients and soft light |
| src/CreatePlane.tsx / Icons.tsx | Example creation symbol and pointer |

Key frames: 281/282 previous-shot continuity; 305/306 capsule transformation; 727 gallery cut; 1924 result seam; 2133–2191 frosted button; 2458 final frame. Cube text must not appear reversed, and labels must not ghost. Arbitrary-frame checks do not replace continuous motion and audio acceptance.

Pay particular attention during acceptance to:

- **Recognizable structure**: retain reference close/wide shots, object handoffs, spatial staging, and rhythm; preserving one line of copy or one set of easing functions is insufficient to call it a “replica.”
- **Credible product**: show concrete uses, real inputs/results, and key features; no fake cases, fake buttons, leftover original branding, or unverified feature implications.
- **Distinct color roles**: pale UI, semantic gradients, content colors, status colors, and full-screen peaks each appear appropriately; neither all-brand-color nor all-gray treatment.
- **Clarity in motion**: enlarged hero cards stay sharp; giant text is not accidentally cut off; necessary text has reading holds; real screenshots have no uniform filter.
- **Causal operations**: pointer lands on click targets, presses/releases give feedback, assets fly into correct slots, and storyboard changes do not suddenly hide or jump objects.
- **Continuity and technology**: no black flashes or missing layers at boundaries, consistent out-of-order frame acquisition, all assets ready; person videos do not conceal problems with unreasonable freezes. Check audiovisual sync separately when sound is present.
## 7. Running

Requires Node.js 24+, FFmpeg/ffprobe, and Playwright Chromium. The package pins runtime; on first use, run in this directory:

```sh
npm ci --ignore-scripts
npm run setup
npm run prepare
# Internal inspection of a specific frame, without film export; target must not already exist
npm run still -- 704 /tmp/capsule-flow-frame-704.png
# Open preview when the user requests it
npm run preview -- --open
# Run only after an explicit export request
npm run render -- exports/film.mp4
```

After changing source or assets, run prepare again and restart preview to avoid viewing an old content version. Follow the [runtime contract](../../references/tech.md) for installation and preview details. `.lvm/`, `node_modules/`, and `exports/` are locally generated content.

Verify source execution and film quality separately. See [validation.md](records/validation.md) for independent installation, preparation, and frame-sampling records, and [package-review.md](records/package-review.md) for package review. Full continuous motion and subjective listening review remain incomplete; new films inherit no old scores.
