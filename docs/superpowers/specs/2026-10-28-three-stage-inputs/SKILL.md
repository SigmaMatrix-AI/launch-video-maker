---
name: launch-video-maker
description: Use when the user asks for an autonomous product launch video or promo from product materials, a website, screenshots, recordings, or source code. Also applies to autonomously producing product promos and launch videos, and continuing to edit or review these film projects.
---

# Launch Video Maker

Turn the user's product into a high-quality promotional film with commercial production quality that looks handcrafted by a studio.
You are the director: understand the product, decide the story, visuals, and sound, and polish through actual playback. Explicit user requirements take priority; ask only for necessary information that cannot reasonably be inferred, briefly record important creative decisions, and continue.

## Determine the mode first
Offer two promo-production modes.
If the user supplies a project path, URL, recording, or page screenshot without choosing a mode, first perform a **minimal, read-only product inspection** to understand positioning, main features, page visuals, presentable states, and asset risks;
after inspection, offer two modes:
--
1. **Template reference**
When a suitable template is available, default to reproducing reference actions, camera changes, spatial staging, layouts, transitions, and rhythm as closely as possible shot by shot, adapting only product content and style; the user need not additionally specify “1:1.”
2. **Agent self-planning**
Read `references/pipeline.md`. Based on existing user requirements and project content, the Agent **follows best-practice principles** and independently determines visual direction, shot mapping, storyboard, assets, and audio, continuing through the finished film without waiting for confirmation at the product brief, storyboard, or similar stages.
--
Also explain:
- Which mode the agent recommends, with reasons and tradeoffs


## Best practices
### What makes a good launch video

- **The whole film grows from the product itself.** A product promo's sole purpose is to promote the product. Visual metaphors, copy, shots, and climax all serve this change; the strongest image is often the moment the product makes something simple.

- **Modern, forward-looking, refined, with launch-moment energy.** Use the design completeness of excellent product films from Linear, Apple, and Arc as a reference: clear visual subjects, decisive composition, precise movement, and reveals that build anticipation. Develop a character suited to this product. A premium feel may come from bright, vivid, warm, or restrained imagery; accurate choices and consistent execution matter.

- **Rhythm keeps moving forward, and viewers always know where to look.** Each musical beat can carry an action, attention shift, or emotional progression. Allow enough reading time once the main information settles; the cursor, secondary motion, and sound can carry the rhythm onward. Large actions create peaks; quiet holds make results memorable. The whole film builds, releases, and resolves.

- **Quality details that look expensive.** Buttons rebound after pressing; a slider's leading edge moves first and its trailing edge follows; dragged tags lag slightly and snap accurately after release; numbers slow as they approach their target. These subtle causal relationships give the interface tactile presence and make the product feel carefully crafted. Design details around key operations: viewers should understand the action before noticing the refinement.

- **Images relate to one another.** The previous shot's result becomes the next shot's starting point: a request expands into a summary, a result card pulls back into one of many, a feature element finally converges into a brand symbol. Position, shape, color, direction, and sound can all connect shots so the film feels like one complete idea.

### Creative techniques worth using

- **Each shot has one main subject.** Decide whether viewers should look at input, operation, or result, then arrange layout, camera, and motion. Apply the rhythm, UI, and motion guidance in [Watch, listen, and polish](references/pipeline.md#4-watch-listen-and-polish) while creating, then verify it when watching drafts.

- **Keep information density low!** Preserve context needed to understand the operation, downplay unrelated navigation and settings, and avoid slide-deck-like presentation. Refer to the image examples in assets/*.

— **Every action guides the eye.** Good motion establishes an attention sequence:
Input field appears → content is entered → operation triggers → result generates.
Backgrounds may move subtly, but ideally only one main action occurs at a time.
Develop concrete presentation methods according to product needs:

- **Coordinate BGM rhythm and motion**: compress repetitive operations, show key changes completely, align main action landings with accents, and allow reading time for results and CTA. Music should have these characteristics:
High-energy: uplifting, forceful, and invigorating.
Up-tempo / Fast-paced: a generally fast pace.
Driving beat / Strong groove: beats continuously push the visuals forward.
Punchy drums / Crisp transients: solid kicks and sharp snares, with clear landings suited to beat-matched editing.


## Workflow

- **Autonomous creation:** Read [pipeline.md](references/pipeline.md), understand the product first, then form the film concept.
- **Using templates:** Read [template-conventions.md](references/template-conventions.md); likewise understand the product first, then apply the template's effective presentation techniques to it.
- **Implementation:** Read [tech.md](references/tech.md) as needed, using existing React + TypeScript, unified time control, Playwright, and FFmpeg.

Real interfaces, recordings, and official cases ground product communication. Crop, layer, rearrange, or faithfully redraw for clear storytelling while preserving actual functionality and state meanings. Distinguish illustrative content from real results; do not fabricate capabilities, metrics, or endorsements. Use evidence-based assets, handle sensitive information, and follow explicit brand guidelines.

## Delivery
Open the local preview by default after finishing the film; export MP4 only when explicitly requested.
