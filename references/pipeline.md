# Autonomous design: direction → story → craft

This page is for agent-planned design. For the template route, follow the [Template workflow](template-conventions.md). See [Stage deliverables](stage-deliverables.md) for record examples and the [Good / Bad criteria](eval.md) for visual and motion judgments.

## Preparation: product research

Follow [Product research](product-research.md) to understand the website's main sections and relevant entry points, then explore feature pages, examples, and demos for candidate content. Reuse existing materials when they are sufficient or the task is limited to local materials. Identify the audience, candidate content, required elements, and CTA. Record evidence of capabilities, usable assets/states, and gaps, distinguishing official statements, direct observations, and inferences. Research should find relevant illustrations, outputs, and scenarios as well as first-screen screenshots; do not treat editing that compresses waiting time as performance evidence.

Collect the logo, explicit brand requirements, aspect ratio, target duration, language, and sound requirements. If brand data is missing, use neutral defaults and explain them; verify or ask about missing product facts rather than inventing them. Write brief conclusions in `records/brief.md`. This prepares stage one and does not add another user gate; reuse valid existing research.

## 1. Set the direction: three options, one choice

**Inputs:** Product brief, real assets, and explicit brand/reference requirements.

Choose the same representative content for A/B/C mockups, keeping copy, functionality, and aspect ratio comparable. The three directions must differ meaningfully in typography/layout, visual language, materials, or spatial organization, rather than just changing colors or using different stories. You may start from actual resources or reference methods in `styles/`.

Use available tools to generate mockups, screenshots, or static designs, prioritizing available product assets. Create only representative visuals sufficient to judge the tone, not three full films, complete storyboards, or detailed motion systems. Identify missing assets and implementation risks, and avoid promising effects you cannot deliver.

**Deliverables:** Three viewable mockups, one sentence explaining each difference, and a recommendation with reasons; record them in `records/direction.md`. Suggested paths: `assets/directions/a.png`, `b.png`, and `c.png`.

**Confirmation:** Move to stage two after the user selects a direction. If none works, revise the candidates based on specific feedback and remain in stage one. If explicit authorization to choose already exists, record the agent's choice and the user's exact authorization, then continue; silence must not default to B.

## 2. Set the story: what the video says

**Inputs:** The selected direction and its decision basis, product facts, and required elements.

Write `records/script.md`: the opening hook, core content and order, results the viewer will see, and what they should remember or do at the end. Use feature names to organize a tour, or choose a single-feature launch, output showcase, or continuing example according to the user's intent. Specify main copy, emphasis words, optional voiceover, and visual facts; do not invent features to serve the story. If topic selection raises new questions, research only the relevant parts.

In `records/storyboard.md`, map the story using segment IDs, content purpose, sketches or visual descriptions, and approximate duration. Low-fidelity diagrams and placeholder assets are acceptable; rough timing is only for checking the story's scope. Mark missing assets without making polished UI a prerequisite for content confirmation.

**Deliverables:** One complete story script and rough storyboard so the user can judge content, order, and required elements. Final UI, shot transitions, exact frame ranges, musical timing, and a playable animated preview are not required.

**Confirmation:** Move to stage three after the user accepts the current content version; revise only the affected segments. Reuse an already supplied and confirmed script directly. If the user explicitly delegates the decision, record that and continue. A request to "hurry up and give me a draft" still follows this stage's deliverable definition.

## 3. Refine the craft: implement, watch, refine locally

**Inputs:** Valid direction and story decisions. Preserve the main story in `script.md`; use the same segment IDs to add focus, subject changes, shot continuity, actual time/frame ranges, assets, and sound to `storyboard.md`.

1. **Make the expression work first.** Use E01–E10 in [eval.md](eval.md) to design standalone text shots, real product actions, and object continuity. Implement in a separate `films/<project-id>/` project, keeping assets and dependencies inside it without modifying the template itself. You may refine representative segments before expanding to the full film; this is a production strategy, not a fourth mandatory approval gate.
2. **Arrange timing and expression.** Follow [Motion language](motion-language.md) to vary emphasis at the action, shot, and full-film levels. Briefly record rhythm intent, key landing points, reading windows, and the next shot's continuity for important segments. Choose grouped reveals, keyword replacement, focus, or handoff into the product according to the text's meaning. Run only relevant examples as needed rather than collecting effects. Enlarge the current task area of the UI and check presses, tracking, snapping, and settling. Fast motion, constant speed, stillness, and hard cuts each have uses; avoid one speed or easing throughout, or slowing everything globally.
3. **Arrange rhythm and sound.** Compress repetitive processes, show key changes in full, and reserve emphasis for core results. Music intensity follows the selected direction: high energy is a possible style, not a quality threshold, and cuts need not hit every beat. Choose audio with an established basis for use and listen to it; update the mix when timing changes. Keep silent tasks silent.
4. **Watch, listen, fix, and rewatch.** Watch the current version in full at normal speed; if it has sound, listen to the actual mix. Use stills for layout and continuous windows for motion and seams. Each round, choose the issues that most affect the viewing experience and record "range + observation + case ID + change + rewatch condition." Fix product facts, required elements, slide-like subject presentation, attention, and reading before materials and micro-motion. After a local fix, rewatch that segment and adjacent seams; rewatch the full film before delivery, and recheck sound after timing changes.
5. **Independent review and delivery.** Have a reviewer who did not participate in production examine the current version under the [Technical evaluation protocol](tech.md#quality-assurance). The seven-dimension threshold does not certify that it "looks expensive"; mark missing viewing, listening, or independent review as unverified. Provide a verified working local preview, project, and check status, and incorporate the user's specific feedback. Inspect the actual MP4 after an explicit export request.

Stage-three review context must include `script.md` through the existing `reference` role; see [Record integration](stage-deliverables.md#integration-with-existing-review). Older projects without a script should continue using the existing brief/storyboard; do not fabricate historical confirmation.

## Continuation and cost control

Read the current direction, script, storyboard, and user feedback first, then determine the scope:

| Situation | Next step |
| --- | --- |
| No direction selected | Stage one; produce only what is needed for the choice |
| Direction valid, story awaiting confirmation | Stage two; refine only the story/rough storyboard |
| Direction and story valid; only UI, buttons, transitions, or rhythm change | Stage three; make local changes and rewatch affected areas |
| Product storyline or required content changes | Return to affected story segments; keep the direction if still valid |
| Overall tone changes | Return to stage one; reuse product facts and story that remain valid |
| A draft exists without confirmation evidence | Perform explicitly authorized local changes and record the confirmation gap; further expansion requires the relevant decision or delegated authority |
| The user explicitly delegates direction/script decisions to the agent | Choose within the authorization, record, and continue without repeated approval requests |

Redo only affected assets and segments rather than rereading every reference, rewriting the whole film, or rerendering verified content each round. Follow the user's budget limits. Record actual token usage only when available; otherwise record generation and rework counts. If a revision round does not improve the main gap, or remaining differences are matters of preference, show specific clips and alternative changes for the user to decide, avoiding unlimited autonomous polishing.
