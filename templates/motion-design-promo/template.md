# Motion Design Promo — 20-second reference template

This template is a freely adaptable React reference project: kinetic typography → product ensemble → case-study cards → audience → search action → brand finale. It suits creative tools, design services, portfolios, curated products, and case-driven short launch videos. For products that need complex operational steps explained, replace the case-study section with real pages or recordings rather than using product/people collages as feature evidence.

## Baseline and runtime boundaries

- Six scenes and fourteen internal actions, with a total duration of 20 seconds.
- 1280×720, 60 fps, 1200 frames, 20 seconds; the internal CSS stage stays at 1920×1080 and scales to output dimensions. The original composition uses 960×540 logical coordinates and cqw/cqh; only 16:9 is supported by default.
- A Runtime 0.1.0 snapshot is included for independent operation. Node 24+, FFmpeg/ffprobe, and pinned-version Chromium are external runtime requirements.
- Global frame time is `frame/60`, with half-open scene intervals `[start,end)`. To preserve original export sampling, visual time passed to each board is `(localFrame+0.5)/60`; music still starts at 0. This is an explicit visual sampling offset, not an additional playback clock.
- Preserves original quintic easing, font metrics, card paths, perspective, segment weights, and scene hard cuts. The only JSX text-font selection addition is font families distinguished by weight; the TSX entry handles runtime wiring. Animations were not rewritten and no SFX were added.

## Scenes and actions

| Time / global frames | Scene and internal actions | Space and rhythm | Source |
| --- | --- | --- | --- |
| 0–3.75s / 0–225 | Intro01: Idea01 0–45; Transform02 45–120; Outcome03 120–180; Bridge04 180–225 | Large text scales and settles with trails; character-by-character reveal then shrink; result words expand into three lines; linking words scale away | `src/boards/Intro01.jsx` |
| 3.75–6s / 225–360 | Portfolio02 / Portfolio05 | Products push in from the perimeter and scale into place; promise text shrinks away and short words settle; retains adaptive layout for six products | `src/boards/Portfolio02.jsx` |
| 6–9.25s / 360–555 | Showcase03: Value06 360–420; Showcase07 420–555 | After the value title card, cards fly in from below with rotation, perspective, and overlap; the last becomes the main card while others recede | `src/boards/Showcase03.jsx` |
| 9.25–13.25s / 555–795 | Audience04: Explain08 555–675; Audience09 675–795 | Broad text movement connects to an ensemble entrance of six people/cases, conveying reach and audience | `src/boards/Audience04.jsx` |
| 13.25–18s / 795–1080 | Conversion05: Invite10 795–825; Action11 825–855; Search12 855–1005; Book13 1005–1080 | Two brief emphatic title cards; search box returns from an enlarged offset position, query text reveals, cursor moves to the button and clicks; CTA settles | `src/boards/Conversion05.jsx` |
| 18–20s / 1080–1200 | Brand06 / Brand14 | Brand graphic scales to a finish and holds; background returns to white | `src/boards/Brand06.jsx` |

Scene intervals are in `src/content.json`, action anchors in film.tsx markers, and internal duration ratios in each board's `Sequence.parts`. Changing an outer duration proportionally scales all internal actions in that scene. The current soundtrack is an existing 120 BPM instrumental master, using its full 20 seconds directly. There is no narration or TTS, and individual scene MP3s are not layered in, to avoid encoding delays and seams.

## Assets and initial collection

| Segment | Quantity and format | Suggested resolution / visual role |
| --- | --- | --- |
| Opening | 4 short copy segments | Single-line layout; check readability after compression for longer phrases; never silently fall back to original product claims |
| Product ensemble | art1–art6 required, art7–art9 optional; PNG/JPG | Prefer ≥1024px square images; entrance scale is approximately 2.35× with peripheral movement, so do not collect only for the final small-card size |
| Case showcase | project1–project3 required, project4–project5 optional | Landscape approximately 1.6:1, preferably ≥1600×1000; final main card at original 720p is approximately 816×509px; the last valid slot becomes the main card |
| Audience ensemble | 6 image slots | Prefer ≥1024px square images; may become customer categories, teams, or use cases; fictional people must not appear as real customer testimonials |
| Conversion | invitation/action/query/cta copy | Search box is a generic conceptual component; if depicting a real product action, replace it with real evidence and adjust click positions |
| Ending | 1 transparent brand PNG | Prefer ≥1024px for clarity when enlarged; check transparent margins and visual center |

The example uses **18 slots and 16 distinct images**: 6 products, 5 case slots (reusing 3 images), 6 people, and 1 logo. Maximum capacity is 21 slots. Example SHIQU is a fictional shopping platform; products, pages, people, and logo must all be replaced for the target product. First collect real assets proving product input → operation → output, then decide which sections to retain.

## Editing entry points for a new product

1. Copy the entire template to `films/<project-id>/` (excluding node_modules and .lvm), then edit the copy.
2. `src/content.json` is the actual current content interface: edit text in `data`, map slots to image ids in `media`, and map ids to project-local paths in `images`. Copy assets into assets; do not reference other projects or remote URLs.
3. Board JSON files retain field semantics and length guidance. `translate_only` is not mandatory policy in this skill; the Agent may rewrite all copy based on product evidence. These files do not drive runtime; content.json is authoritative for running content.
4. Replace SHIQU, example products/people, webpages, and brand image. Sections may be removed, reordered, or reused as a contiguous excerpt, but update start/end, total frames, markers, and audio events together. Do not change the timeline to the original reference's example_duration_ms in the JSON.
5. Scene layouts are in each board's local functions, with card-space parameters in `src/design.js`. Preserve motion relationships in selected sections rather than borrowing only colors and creating a different template. For long Chinese text, wide logos, or different screenshot ratios, inspect reveal, scale, crop, and final hold frame by frame.
6. Images use AssetImage and may retain original cloneElement style overrides. For video, explicitly map source time through runtime VideoFrame and declare out-of-range behavior; list source sound as separate audio events, and do not insert an autoplay video.

## Color, fonts, and texture

- White stages serve the opening and finale; pink→purple text gradients serve concept words; soft multicolor spatial fields serve product, case, audience, and conversion peaks. Keep grids low-opacity, with shadows/glow supporting the subject.
- `Design.palette.pink/purple` controls text and some controls; `palette.fields` contains original sampled color fields and **does not** automatically change with pink/purple. When changing style, handle fields, gradients, and shadows separately, preserving the multicolor sections' role rather than applying one theme color everywhere.
- Real product screenshots, people, and products are not globally tinted. Theme colors may serve as accents; explicit brand requirements take priority.
- `Design.metrics` contains glyph measurements for Inter and Chinese fallback; SVG full-string viewBox stays unchanged to avoid jumps during character-by-character reveals. Replacing a font requires rebuilding its metrics or adapting and verifying text layout; changing CSS font-family alone is insufficient.
- Eight font files are in `assets/fonts`. Runtime 0.1.0 lacks FontFace weight descriptors, so `src/fonts.json` registers separate aliases for 400/800. Type uses weight=400 and fontSynthesis=none with the correct physical font; semantic text weight still determines metrics and the font alias.
- Background Mesh is a pure-function SVG data URL; `useFrameTask` explicitly waits for decoding. This wait participates in the same frame handshake, with no fixed delay.

## Validation and known boundaries

For installation and commands, see [README](README.md); for this migration's evidence, see [runtime validation records](records/runtime-validation.md). `npm run validate -- --full` covers all 1200 frames, checking fourteen action transitions and backward/repeated frame acquisition. The default short check covers each section's start, end, and intermediate frames. Test caches reside only in `.lvm/validation`.

Visuals intentionally contain oversized text and edge cropping; do not arbitrarily turn them into static, fully visible centered text when adapting.

Asset loading, complete frame coverage, technical audio synchronization, and runtime portability validation do not establish commercial aesthetic acceptance for a new product; adaptation still requires real-time motion, listening, and independent evaluation. Do not generate MP4 unless export is requested.
