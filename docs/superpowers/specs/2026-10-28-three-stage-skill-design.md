# Autonomous Design in Three Steps: Design Agreement

Status: implemented under this agreement in an independent worktree; see the [validation record](../../validation/three-stage-skill-results.md) for validation scope. Installation has not been switched and nothing has been published.

## Goal and Confirmed Direction

Address the problem of spending many tokens producing a full film that remains unsatisfactory and looks like a slide deck. Split autonomous design into:

1. **Set the tone**: present 3 distinct visual styleframes using the same representative content for the user to choose a direction.
2. **Set the story**: provide a story script and simple rough storyboard to confirm what the video says.
3. **Refine the finish**: polish UI, shot connections, rhythm, motion, and sound within the confirmed story and direction until quality is accepted.

Step two is not motion validation or finish acceptance. Low-fidelity images, placeholder assets, and approximate durations are allowed; final UI, frame-by-frame timing, transitions, and music synchronization are not required. Step three may refine a representative passage before expanding to the whole film, but this is an internal strategy, not a mandatory fourth user approval gate.

The user's additional default creative rule: **Good: titles and text appear in independent shots with highlighted words or motion; Bad: side-by-side or vertically stacked titles and illustrations that look like a slide deck.** This rule applies to autonomous promotional expression; it does not remove titles or labels inside real product UI. Template replication explicitly requiring preservation of the arrangement follows the user's specified scope.

Success criteria: users can assess tone, story, and production finish separately; failures surface early; changes can be tied to shots and concrete issues. Saving tokens and increasing preference are goals; do not claim a specific saving percentage or guaranteed reference quality without a comparison experiment.

## Approaches Discussed and Selected

- Original continuous workflow: produce a full motion draft before review. Highly autonomous, but direction/content errors emerge too late.
- Move a motion sample into step two: exposes motion problems, but the user explicitly stated that step two should confirm the story script.
- **Choose three steps**: select visuals, confirm the story, then concentrate production and refinement in step three. Retain two creative decision points, reduce repeated confirmations, and keep confirmed requirements in effect.

Apply the new default only to the agent-planned route. The template reference route retains its existing replication scope and arrangement, without mandatory competing directions; fix only cross-document conflicts.

## Baseline and Boundaries

The worktree is based on `b7b61fc11fad63adc7fcceca82611b05b3df1b71`. During discussion, the original directory had uncommitted changes, notably untracked `references/eval.md`. Planning inputs are saved in the [working-directory snapshot](2026-10-28-three-stage-inputs/manifest.json) to establish the version discussed; merge file by file during implementation without overwriting others' new work.

Original directory: `/Users/mac/Documents/repo/launch-video-maker`. Installed skill `/Users/mac/.agents/skills/launch-video-maker` is a symlink to that original directory; worktree changes do not take effect automatically. Tests must explicitly read the worktree skill; this round does not switch installation, commit original-directory changes, or migrate style deletions/image changes.

Continue using React + TypeScript, unified frame control, Playwright, FFmpeg, and Node.js 24+. Do not rebuild the runtime, player, or scoring engine, or add a workflow database or mandatory JSON state machine. Provide local preview by default; generate the user's MP4 only on explicit export request.

## Three-Stage Contract

| Stage | Inputs and outputs | User confirmation point | Work outside this stage |
| --- | --- | --- | --- |
| 1 Set the tone | Minimal read-only product research; `records/brief.md`; A/B/C styleframes for the same key content; `records/direction.md` records differences, asset provenance, feasibility, and selection | User selects or explicitly delegates selection; if all three disappoint, revise candidates based on feedback | Three complete films, three full storyboards, detailed motion system |
| 2 Set the story | Selected direction; `records/script.md` explains opening, problem, product intervention, result, memorable point/CTA; `records/storyboard.md` maps sketches or picture descriptions to story passages | User confirms content, order, and must-show items; reuse an already supplied and confirmed script | UI refinement, shot-connection acceptance, exact frame ranges, mandatory motion sample |
| 3 Refine the finish | Expand the confirmed storyboard with actions, focus, connections, timing, and sound; implement playable work and diagnose revisions using cases | Continue absorbing feedback; confirm satisfaction before delivery without requesting permission for each technical change | Unilaterally rewriting confirmed stories or presenting a visual-scope pass as full audiovisual acceptance |

The three directions must differ materially in typography, visual language, materials, or spatial organization, not merely color or story content. Styleframes should use available product assets where possible and identify risks from assets that cannot be delivered. Choose generation methods from available tools; no dedicated stage-one renderer is necessary.

`records/direction.md` contains candidates, selection, current version, and confirmation basis; `records/script.md` contains the content version and confirmation basis; `records/storyboard.md` preserves passage IDs, adding production details in step three instead of overwriting the confirmed script. Record the actual confirmation wording or explicit user instruction; do not fabricate times, approvals, or default choices.

On continuation, read records and current feedback first. Single-shot visual feedback stays in step three; content changes return only to the affected part of step two; only an overall tone change returns to step one. Silence is not approval. If the user explicitly says “You decide; finish it directly,” choose within that authorization and record the decision without requesting confirmation again.

## Quality Standards Led by Cases

The opening of `references/eval.md` presents Good / Bad comparisons. Every case has a stable ID, expressive purpose, Bad, Good, key judgment, and reference evidence or a “suggested example” label. Cases explain principles; they do not require every film to use the same technique. Minimum content:

| ID | Topic | Good | Bad | Key judgment |
| --- | --- | --- | --- | --- |
| E01 | Subject action | A card is selected, content edited, or assets enter the work | Subject stays unchanged while background glows or screenshots continually scale | Does the action convey new information? |
| E02 | Continuity across shots | The object selected in one shot becomes the next shot's subject | Every shot clears everything and generates a different set of elements | Is the relationship between objects recognizable? |
| E03 | Attention | Focus passes through input → operation → result | Title, UI, cursor, and background compete in motion | Is it clear where to look now? |
| E04 | UI presentation | Enlarge the task area while retaining necessary context | A full admin screenshot with tiny explanatory copy | Can viewers understand the key operation without pausing? |
| E05 | Camera purpose | Push in for operations, pull out for results and context | Rotate, tilt, push and pull every piece of content alike | What does camera movement reveal? |
| E06 | Motion craft | Distinct initiation, development, and settling based on element roles | Every element uses the same slide/spring and keeps wobbling after settling | Can the action end precisely and leave a readable result? |
| E07 | Rhythm | Compress secondary actions, show key changes fully, allow result reading | Equal-length page changes or constant fast cuts without landing points | Does important content get enough time? |
| E08 | Visual emphasis | Reserve the strongest change for the main result | Every element is a climax | Is the key reveal memorable? |
| E09 | Holds | Results and CTA display steadily | Movement for its own sake, perpetually floating text | Does stillness help understanding and memory? |
| E10 | Independent text shots | Titles and text appear in their own shots with highlighted words or motion | Side-by-side or stacked titles and illustrations resemble a slide deck | Does text have its own visual expression rather than narrating an illustration? |

A concrete E10 good example: first show “One piece of content, many languages” as an independent text shot, emphasizing “one / many” semantically, then enter the product demonstration. Do not substitute repeated background decoration for text design, and do not require every word to bounce. This is the user's additional requirement, not a claimed verified finding from the references.

## Reference Evidence and Quality Levels

The user provided the references. Do not upload or publish the original videos or copy large videos into the repository; local paths support development observation and never become film runtime dependencies.

| Reference | Local file | Observed interval and purpose |
| --- | --- | --- |
| LangEase / Best SaaS Product Launch Ad Video | `/Users/mac/Downloads/Best SaaS Product Launch Ad Video.mp4` | Approximately 10–14 seconds: progress, completion, reveal; approximately 15–19 seconds: card list → selected card → multiple language versions |
| Introducing Google Vids | `/Users/mac/Downloads/YTDown.com_YouTube_Media_4SCjXcBeW1E_Introducing-Google-Vids_001_2160p.mp4` | Approximately 10–16 seconds: add a document to the request, generation, outline; approximately 55–62 seconds: asset search → selection → enters canvas |

Evidence scope: sparse full-film overview and 4 fps temporal samples of these four passages support object relationships, layout, and state sequences. Full normal-speed viewing/listening remains incomplete; do not certify subtle easing, audiovisual synchronization, complete rhythm, or preassign reference scores from this evidence. Recheck precise original timestamps when selecting case media. If references are missing, preserve written observations and provenance without fabricating thumbnails or claiming viewing, and do not block workflow-document work that does not depend on the originals.

Retain seven-dimension scoring and the 7.5-per-dimension threshold; authenticity/readability/asset requirements; and unverified status when evidence is insufficient. Distinguish basic competence, a cinematic rather than slide-like presentation, and finish approaching the references in case explanations. These levels add no numeric ratings and do not redefine 7.5 as “expensive.”

## Step-Three Iteration and Cost Control

Record each round's time interval, observable issue, case ID, corrective action, and re-viewing condition. Fix failures to execute the story, slide-like presentation, and attention conflicts before motion/material details. Choose the issue most affecting the experience, re-view the passage and neighboring seams, and recheck the mix after timing changes. Example: cutting to a new page immediately after selecting an asset breaks the object's relationship; use E02 to keep it recognizable as it enters the canvas.

Refining a representative passage first is a suggested strategy, not a new approval. Avoid producing three films at once, rewriting the full film each round, or rereading all references repeatedly. Record stage usage when real usage data is available; otherwise record production/rework counts without inventing token figures. If quality stalls, explain the specific remaining gap and request targeted feedback, rather than looping indefinitely or replacing user satisfaction with scores.

Music intensity serves the selected direction and story: retain the existing high-energy preference as a default candidate, without equating fast rhythm or cutting on every beat with sophistication. This is the plan's proposed organization, not a fact established by listening to the two references.

## Validation and Definition of Completion

Implementation must verify: no full-film development before direction selection; step two confirms only story; explicit delegated selection permits continuation; local step-three feedback does not reopen everything; template replication is not forcibly adapted by the new workflow; independent text shots appear in actual output; and missing audiovisual evidence never becomes a false pass.

Document-link and record-path checks establish only interface consistency. Behavioral validation needs agent-scenario records; visual validation needs a short passage on a new topic in step three showing independent text shots and continuous subject changes, compared with a Bad version. Without actual tests, do not claim the new skill improves finished-film quality or saves tokens.

The original planning phase completed the design agreement, implementation plan, and input snapshot. Subsequent implementation is confined to an independent worktree; installation switching and publishing are outside this scope, and visual comparisons are local test artifacts.
