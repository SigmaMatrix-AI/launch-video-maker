# Good / Bad: from changing slides to video expression

During creation, choose techniques suited to the current content; in stage three, use actual playback to identify gaps. Case IDs stay stable so feedback can cite them for local changes. Every film need not use all ten techniques. Start with E10 for text and layout, and E01–E03 for motion and continuity.

## Ten observable quality criteria

| ID / goal | Good | Bad | Key judgment |
| --- | --- | --- | --- |
| E01 Subject action | Select feedback → merge entries → prioritize; operations produce new states | The screenshot stays unchanged while only background glows, particles, or whole-image zoom move | Without decoration, does the subject still communicate change? |
| E02 Object continuity | The selected card remains recognizable and becomes the next shot's subject | Each shot clears the screen and generates a different set of elements | Can you identify the same object or its result across shots? |
| E03 Attention handoff | Input field → control → result become the focus in sequence | Title, cursor, UI, and background all compete through movement | Is it clear where to look right now? |
| E04 UI task focus | Enlarge the row being selected while retaining context needed to understand the operation | A complete admin screenshot sits beside a small explanatory paragraph | Can the key operation and result be understood without pausing? |
| E05 Purposeful camera | Push in to show an operation; pull back to reveal the result within a complete work | Every segment rotates, tilts, or zooms without changing the information | What does the camera move reveal? |
| E06 Motion that lands | Brief press, drag tracking the pointer, snap after release, and precisely settled result | Every element uses the same slide/spring and keeps wobbling after landing | Do the start, progression, and finish suit the object's role? |
| E07 Varied rhythm | Compress secondary actions, show key changes fully, and hold results until readable | Equal-length page changes or constant fast cuts without landing points | Does the key content receive more attention and time? |
| E08 Core reveal | Reserve the largest scale and strongest change for the key result | Every small icon and title acts like a climax | Which change will the viewer remember? |
| E09 Purposeful holds | Results, brand, and CTA remain stable, leaving room for understanding and memory | Text and cards keep floating to maintain "energy" | Does stillness help understanding rather than stall? |
| E10 Text in its own shot | **Titles and text appear in their own shots, with highlighted words or motion** | **Titles and accompanying images sit side by side or above and below each other, like a slide deck** | Does text have its own visual expression rather than continually narrating an accompanying image? |

E10 is the default promotional expression rule for autonomous design. For example, first show "One piece of content, many languages" on its own, emphasize "one / many" semantically, and enter the product demo after the text settles and can be read. Keep necessary headers, navigation, buttons, and language labels within real UI; do not accidentally remove product information or require every character to bounce. Follow the agreement for templates whose compositions must be preserved; specific user requirements take priority.

These Good / Bad examples are production guidance and counterexamples, not requirements every reference asset must satisfy individually. Stillness, hard cuts, and fades can all work; the problem is repeated page changes throughout the film without subject changes. Adding springs to every element is not a remedy.

Choose techniques using [Motion language](motion-language.md): compare E06/E07/E09 with R01, E03/E10 with T01–T03, and E02/E10 with T04. The examples' good/bad variants are design comparisons to observe, not automatic scores. Breathing room depends on speed changes, attention, and reading allocation; neither fast nor constant-speed motion is inherently a failure.

Check research sufficiency separately through [Product evidence and usable assets](product-research.md); it adds no aesthetic score. Organizing a storyboard by feature names is valid. Problems arise when every feature repeats the same entrance, or specific visuals lack factual evidence.

## Visual and animation references

The following images and sequence collages are stored in the repository's `assets/`. Open the relevant image for the current design problem: single frames show composition, negative space, and materials; sequences within a shot show subject changes; collages across scenes show compositional variety and visual consistency.

| Reference asset | Techniques to learn from |
| --- | --- |
| [Headline reveal and surrounding card entrance (sequence reference)](../assets/headline-reveal-and-surrounding-cards-sequence-lossless.png) | Headline gradually appears → shrinks to the center → cards enter from screen edges → form a surrounding composition; observe attention handoff, scale changes, and central negative space. Cards may show products, outputs, or other assets, not only people |
| [Blue gradient opening](../assets/intro-blue-gradient-title.png) | Short headline, background depth, and generous negative space |
| [Output cards around copy](../assets/showcase-cards-around-headline.png) | Hierarchy between peripheral outputs and central copy, plus edge cropping |
| [Teamble multi-scene reference collage](../assets/teamble-ai-feedback-video-reference-storyboard-lossless.png) | Consistent pink/purple gradients, rounded corners, and cursor; varied compositions using large type, input fields, UI close-ups, and complete panels |
| [LangEase multilingual launch video reference collage](../assets/langease-multilingual-video-reference-storyboard-lossless.png) | Blue/white palette and light layering; composition of completion feedback, card lists and single-card close-ups, surrounding multilingual outputs, and language selection states |
| [Apple software family introduction reference collage](../assets/apple-software-family-video-reference-storyboard-lossless.png) | Colored spheres representing family members; scale contrasts between full interfaces and local cards, blurred-background focus, frosted layers, and visual emphasis in app selection and permission dialogs |
| [MSPortal.ai product introduction reference collage](../assets/msportal-ai-product-video-reference-storyboard-lossless.png) | Consistent teal gradients and thin borders; layered windows, tilted dashboards and integration marks, fanned course cards, workflow connections, and brand closing compositions |

Borrow layout, hierarchy, and object relationships from references, replacing content with evidenced assets from the current product. Surrounding cards might show features, work, or users; local emphasis might highlight selected entries, key actions, or result reveals.

Collages show selected screenshots in sequence, not complete storyboards or exact durations. Motion speed, easing, transition continuity, and audiovisual rhythm require separate observation of an accessible original video and cannot be inferred from collages.

## Motion case cards

Use these examples to design subject changes, attention handoffs, and shot continuity. Sequences extracted from the original videos are stored in `assets/motion/`; read from top to bottom, with dark gray strips marking original timestamps and frame numbers. Original resolution and visual content are retained; see the [Frame extraction record](../assets/motion/sources.json) for source filenames, frame rates, and sample positions.

C01–C02 come from **LangEase / Best SaaS Product Launch Ad Video**; C03–C04 come from **Introducing Google Vids**. Keyframes show the start, intermediate states, and result of an action; they are not full playback or listening. Counterexamples below are hypothetical comparisons, not flaws in the originals. When borrowing expressive techniques, keep features and content grounded in the current product.

### C01 · Progress becomes completion

[View the LangEase motion sequence: 10.500–13.500 seconds, 6 frames](../assets/motion/c01-langease-progress-to-completion.png)

- **Expressive goal:** Make "in progress → complete" a visible reveal.
- **Visual change:** A blue ribbon form extends from the device edge, followed by a progress bar and increasing number. At 100, the visual contracts into circular feedback showing Done, a checkmark, and confetti.
- **Technique to borrow:** Connect process and result through changes in shape and state, landing attention on completion feedback; maps to E01/E06/E08. Animated progress does not represent the current product's processing performance.
- **Counterexample:** One page says "fast processing" beside a device image, then another says "complete" beside a checkmark; only page changes, with no trackable process.

### C02 · Choose the subject from a list

[View the LangEase motion sequence: 15.233–19.000 seconds, 6 frames](../assets/motion/c02-langease-list-to-multilingual-cards.png)

- **Expressive goal:** Let viewers recognize the selected content and its relationship to multiple language versions.
- **Visual change:** Cards appear in a list; the pointer targets History Lecture, the card moves into the foreground and enlarges, then multiple cards with the same thumbnail surround Multiple Languages.
- **Technique to borrow:** Maintain object identity through thumbnail, text, and outline, moving from the whole list to one subject and then its multiple versions; maps to E02/E03/E05. Cards may contain work, products, or other outputs.
- **Counterexample:** The list clears and unrelated images appear with a "multiple languages" heading, leaving viewers unable to tell where the results came from.

### C03 · A request with source material generates an outline

[View the Google Vids motion sequence: 11.111–15.816 seconds, 4 frames](../assets/motion/c03-google-vids-attachment-to-outline.png)

- **Expressive goal:** Show "create a video from existing materials" as concrete input and output.
- **Visual change:** The pointer carries a Slides icon toward the request; the material becomes an attachment in the request, followed by Creating and then a multiline outline.
- **Technique to borrow:** Establish an understandable causal chain from attachment to request, processing state, and output, handing focus along the task steps; maps to E01/E03/E04.
- **Counterexample:** Show only "smart generation" and an editor, without showing materials entering or the result taking shape.

### C04 · An asset becomes part of the work

[View the Google Vids motion sequence: 56.557–61.228 seconds, 4 frames](../assets/motion/c04-google-vids-search-to-canvas.png)

- **Expressive goal:** Make it clear that the searched, selected, and ultimately used asset is the same one.
- **Visual change:** Landscape appears in the search field; the pointer selects a sunset rock-arch thumbnail in the result grid, which moves to the foreground and then appears on the editor canvas.
- **Technique to borrow:** Keep asset content recognizable, explain selection through local emphasis, and establish its destination through the full editor view; maps to E02/E04/E05.
- **Counterexample:** Cut straight from the asset list to an editor showing a different image, breaking the relationship between selection and result.

## From acceptable to reference-level finish

| Level | What must actually be observed |
| --- | --- |
| Basic acceptance | Accurate product facts, readable key text, reliable assets and playback, and complete required content. See tech.md for seven-dimension thresholds and evidence requirements. |
| Video expression | Subject states change, focus has an order, and objects connect across shots; actions and readable holds vary emphasis instead of repeating page changes. |
| Approaching the reference's finish | Building on the above, text, UI, camera, materials, motion, and sound express a consistent idea; key actions are precise, reveals carry weight, and seams withstand frame-by-frame checks. Corresponding evidence must be viewed; scores do not establish this automatically. |

These are diagnostic levels, not new rating fields, and a 7.5 in each dimension is not renamed "looks expensive." User preference and satisfaction still require user feedback.

## Local iteration examples

`08.2–09.1s / After asset selection, the screen clears before cutting to the editor, breaking object continuity / E02 / Keep the same thumbnail and color coding, move it onto the canvas, then reveal context / Rewatch this segment and both seams; the selected object can be tracked at normal speed.`

`00–02.5s / A title stays beside the screenshot, with both demanding simultaneous reading / E10+E03 / Highlight keywords in a standalone text shot, then enter the operation after reading / Keywords and operation are clear at normal speed, while real UI labels remain.`

Address facts, required elements, subject changes, attention, and reading before motion and material details. Keep evidence from the current round after changes; do not reuse the old version's pass result. The following production baselines and acceptance details are available as needed.

## 1. Product: prove value through action

- Open directly with a task, problem, or product result familiar to the target user. Long logo animations and generic slogans cannot substitute for product content.
- Choose a feature tour, single-feature launch, output showcase, or continuing example according to the task. Feature names may serve as segment titles; develop the core demonstration through evidenced actions, results, or assets. Do not label it slide-like merely for using feature names.
- Within an operation, keep the example, data, and objects consistent before and after the change so viewers understand what the product changed. Different feature segments need not share one example. Signal time jumps when compressing waits or omitting steps; editing speed is not product performance.
- Use key reveals to show product results: scattered sources form a summary, one request expands into a creation, or a local result pulls back into a complete project. Choose changes the product actually supports.
- End with the product name and one clear action: try it, join the waitlist, or learn more. Match the action to the current launch status and hold it long enough to read.
- Source product capabilities, metrics, customer relationships, and examples. Screenshots may be cropped, layered, or faithfully redrawn; actual functionality, state meanings, and third-party marks stay accurate.

## 2. Avoid a slide-deck feel: check what happens to the subject

Watch product demonstration segments consecutively and ask: Who is the subject? What changes? What carries into the next shot? If several consecutive feature segments can only be described as "this page appears, holds, and the next page appears," redesign subject actions and continuity.

| Observed symptom | Revision |
| --- | --- |
| Several consecutive segments consist of a title and feature card with only fades, slides, and exits | Choose a real task, turn the card's content into an actionable object, and show trigger, response, and result |
| The entire screenshot slowly enlarges without state changes or new information | Target a specific control or result and supply real interaction states; use zoom to clarify information |
| The subject is unchanged while only gradients, particles, glows, or background elements float | Return motion to the product subject; reduce background contrast and speed and retain a readable, still result |
| Every shot clears the screen and generates another group of elements from the center | Continue the same object's position, shape, or motion direction; expand the selected item into the next shot, or make a result the next operation's input |
| Every shot shares duration, entrance, and motion amplitude | Shorten repetitive operations, show key changes fully, extend result reading time, and alternate detail, overview, action, and holds |
| Three feature cards or a whole row of customer logos demand simultaneous reading | Present items by emphasis, one at a time; customer logos can take center stage on accents, with supporting shapes adapting to their proportions. Preserve correct proportions, required colors, and recognizable holds |

**Stillness does not mean slides.** Core results, key copy, brand, and CTA may hold steadily; a clear, recognizable logo group providing collective endorsement can also remain static. Hard cuts can omit repetitive processes, and fades can hand off content. The problem is repeated page changes throughout the film without product actions, state relationships, or rhythmic variety. Adding springs, rotation, or floating to everything is not a remedy. Preserve agreed template arrangements and fix content adaptation and readability first.

## 3. UI: one subject per shot

One subject means one visual focus: a sentence, an operation area, or a group of outputs. Other elements can exist without competing to be read simultaneously. Hand focus through "input field → operation → result" within a shot.

| Check | What to inspect and change |
| --- | --- |
| Information density | Remove navigation, settings, and paragraphs unrelated to the current task; retain context needed for orientation and understanding the operation, and enlarge the key area |
| Fonts and size | View key copy and UI labels at actual delivery size; also inspect a reduced preview for mobile delivery. Enlarge, shorten, or split unreadable content into shots rather than relying on pause-and-zoom |
| Composition | Establish the subject through size, position, contrast, and negative space. Titles, screenshots, and cards need not occupy the same position in every shot; supporting elements must not obstruct operation targets |
| Color and materials | Use neutrals for information and brand colors for actions and states, or equivalent hierarchy in the chosen style. Gradients, glass, and glows must not obscure text or product |
| Consistency | Check fonts, type scale, corner radii, shadows, spacing, icons, and motion character; keep the same component consistent across shots |
| Clarity | Inspect enlarged glyphs, fine lines, images, rounded corners, and mask edges; obtain high-resolution assets or fix rendering rather than concealing low resolution with blur |

Static references help judge hierarchy, negative space, and materials, but cannot prove motion quality. If the original video is unavailable, do not pretend timing has been evaluated.

## 4. Motion: trigger, response, settle

- **Attention order:** Input appears → input completes → operation triggers → result is generated. Emphasize one main action at a time, with a subdued background; do not introduce a new reading task before the previous one can be read.
- **Accurate causality:** The cursor targets the actual control before pressing, and feedback follows the trigger. Objects track the cursor during dragging and snap only after release. Check cursor position, hit areas, and state changes; do not show the result first and add a click afterward.
- **Continuous states:** A card expands into details, selected text enters an editor, or input extends into a result. Container outlines remain continuous during morphing; old content exits first, and new content enters in a readable form, avoiding overlapping or stretched text.
- **Resolved motion:** Buttons compress slightly and rebound, dragged labels lag a little, slider edges move at offset times, and numbers decelerate to settle. Choose details relevant to the operation and check for persistent wobble or value jumps after landing.

| Element | Motion character |
| --- | --- |
| Buttons, selection states, feedback | Brief, clear, promptly responsive |
| Panels, pages | Steady and directional, with trackable start and end points |
| Dragging, cards | Track the pointer, retain moderate inertia on release, and land accurately |
| Core outputs | More spacious movement, followed by a stable reveal |
| Background decoration | Slow and low contrast, avoiding competition with foreground actions |

- **Purposeful camera:** Push in for detail, pan to connect related areas, and pull back to reveal the whole. Prefer a stable camera during core operations; avoid moving camera, UI, and text simultaneously.
- **Credible space:** 3D perspective, cursor, screenshot slices, and masks share coordinate relationships. Check floating misalignment, intersections, clipping, and edge seams. Return text to a clear angle for reading.
- **Connected transitions:** Check position, scale, speed, and layers frame by frame around boundaries, then play at normal speed. Fix one-frame black flashes, subject jumps, cuts before settling, and truncated SFX; do not inspect only the two endpoint stills.

## 5. Editing and sound: leave time for emphasis

- Move quickly through repetitive input and secondary actions. Preserve the full causality of core changes, then hold results until key content can be read at normal speed. If repeated pauses are needed, simplify content or extend the hold.
- Place major reveals on musical sections or accents. Align audible press, snap, and landing accents with visual contact points; motion may need to start earlier to settle on the accent.
- A musical phrase can contain action followed by a hold; a cut on every beat is unnecessary. Reserve larger visual scale, greater motion amplitude, and richer sound layers for key reveals, reducing intensity elsewhere.
- Match effects to material and speed: short clicks for presses, passing sounds for movement, and light impacts for landings. Vary tone or intensity in consecutive actions rather than applying the same whoosh to every element.
- Listen to the actual mix of music, voiceover, and effects: voiceover is intelligible, feedback audible, and loudness free of sudden jumps, pops, and clipping. Check loudness and peaks against delivery requirements; if silence is requested, ensure all audio tracks are empty or muted.
- Music edits and loops have no audible breaks; end at a phrase resolution or with a complete fade, preserving tails. Prepare the mix again after visual timing changes and recheck synchronization at the start, middle, and end.
- Check the music's style, tempo, and arrangement against the [default BGM guidance](tech.md#music-and-sound-effects), or the user's explicit music requirements. Listen for tight pacing, forward momentum, and musical progression that support the selected direction and story while preserving readable holds. Cutting on every beat is unnecessary.

## 6. Technical: check the version being delivered

- **Assets:** Capture only after fonts, images, and target video frames load; no missing glyphs, placeholders, loading flashes, stale images, or dependencies on external absolute paths.
- **Time determinism:** Play sequentially, reverse, and seek in random order to start/end frames, motion peaks, and transition boundaries, then capture and compare. Object positions, text, images, and source video frames must match at the same frame.
- **Playback:** Check start, pause, resume, and seek without hangs, duplicate frames, or unexpected blanks; distinguish preview performance issues from actual rendering errors.
- **Export:** After the user requests MP4, inspect the actual file's dimensions, aspect ratio, frame rate, frame count, duration, codec, and audio tracks. The first frame is 0 and the last is N−1. Play the full export to inspect compressed text, gradients, opening/ending, and audiovisual synchronization at the start, middle, and end. A passing preview does not replace checking the export.

See [tech.md](tech.md) for specific capture, asset readiness, audio, and render conventions.

## 7. Record issues, fix, and rewatch

1. First watch and listen to the entire film at normal speed, then rewatch the core demonstration muted. Pause to inspect layout and step through frames to inspect motion and transitions. Mark each check separately as checked or unverified; screenshots, source code, and waveforms do not replace viewing and listening.
2. Record each issue as **time/frame range + observable phenomenon + case ID + change + rewatch condition**. For example: "08.2–09.1s, result text is still shrinking while the next title has entered; settle the result first and delay the title; at normal speed, the result can be read before attention shifts."
3. Fix product errors, missing key operations, slide-like subject presentation, attention conflicts, and reading problems before motion, material, and sound details. Rewatch the current segment, adjacent seams, and full film after changes; recheck the mix when audiovisual rhythm changes.
4. Before delivery, have an independent reviewer who did not participate in production inspect the current version. Use the [Existing review tools](tech.md#using-the-existing-review-tools) to record seven-dimension scores, evidence, and issues. Do not hide individual issues behind an average score or prefill expected scores.

The seven dimensions follow tech.md: Style fidelity; Creativity and impact; Motion craft; Design and typography; Polish and detail; Sound and synchronization; Technical specifications. A score below 7.5 means that dimension still has issues affecting viewing or understanding. Reaching 7.5 requires actual evidence from the current version and resolution of relevant mandatory fixes. Higher scores require specific evidence of performance beyond basic acceptance. Scores cannot prove that viewers will like the film or convert.

For product demos, separately verify that real examples and visible changes demonstrate the core value. A complete set of feature names and screenshots fails if the connection between key operations and results lacks evidence; tasks explicitly limited to brand teasers or static promotion are assessed within their agreed scope. False product information, sensitive information exposure, unreadable key text, asset/playback failures, obvious audiovisual misalignment, or missing required content cause failure. If viewing, listening, or independent-review evidence is missing, the conclusion is incomplete and must list the gaps. For silent films, identify visual scope and the silence requirement; films with sound cannot claim a full pass without listening. Passing technical tests proves only the corresponding technical checks.
