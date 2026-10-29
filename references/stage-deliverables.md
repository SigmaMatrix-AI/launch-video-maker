# Minimum deliverables for the three stages

The following are **writing examples for the fictional product Feedback Flow, not confirmation by any real user**. These are Markdown production records, not a mandatory machine schema; keep them concise for the project's scale. See [pipeline.md](pipeline.md) for the workflow.

## Stage one: three images and a direction record

`records/brief.md` stores the audience, real task, required elements, CTA, brand requirements, asset paths, and sources. All three candidates show the same thing, such as "organizing scattered customer feedback into a priority list."

Before formal design, follow [Product research](product-research.md) to add a short evidence table: "content/use → source and type of observation → usable assets/states → gaps." For example, a candidate featuring "merge feedback" must point to an actual page or material and identify whether it shows a feature description, demo, or actual interaction. Record missing assets as gaps rather than inventing sources. Split longer research into `records/research.md` only if needed; a new file is not mandatory.

| Candidate | Image | Distinct design choices |
| --- | --- | --- |
| A Editorial layout | `assets/directions/a.png` | Light background, large type, and a clear grid emphasize the feedback content |
| B Precision workspace | `assets/directions/b.png` | Dark background, compact hierarchy, and one accent color focus attention on the selection |
| C Soft spatial layers | `assets/directions/c.png` | Cards with spatial depth and warm materials focus on the resulting organization |

These names are examples; the same three styles are not required each time. Add one sentence on each direction's tradeoffs and asset feasibility; do not produce three films at the mockup stage.

Example `records/direction.md`:

```markdown
# Direction v1
Candidates: A / B / C (image paths and a one-sentence difference)
Recommendation: B; reason: the key selected state is clearest.
Current selection: pending
Confirmation basis: none; awaiting the user's choice or authorization to choose.
Asset risk: only a low-resolution result-page screenshot is available; recapture in stage three.
```

Only after a real choice, update to `Selection: B; basis: the user said "Choose B"; applicable version: direction v1`. For explicit delegation, write `Agent selected B; basis: the user said "You decide the direction and script; finish it directly"`. Recommendations, silence, and simulated approval are not personal user choices; do not fabricate timestamps.

## Stage two: script and rough storyboard

Example `records/script.md`:

```markdown
# Script v2
Status: awaiting confirmation; direction: B / direction v1 (example only).
Opening: Scattered feedback. Focus on what matters.
Problem: Similar requests are scattered across multiple feedback entries, making it hard to decide what to do first.
Product action: Select related entries, merge them, then let the user adjust priorities.
Result: The same feedback becomes an ordered list; prove it with the real interface.
Ending: Feedback Flow; view the product demo.
Required: selection, merging, ordering; do not claim automated AI analysis or percentage savings.
Confirmation basis: none yet; this version confirms only content, order, and required elements.
```

Stage-two form of `records/storyboard.md`:

The case-based script above is only an example. A feature tour can use segments such as "search → summarize → share"; a single feature or output showcase also works. Confirm content and emphasis words at this stage, leaving specific text techniques and timing to stage three.

| Segment ID | Content purpose | Sketch / visual description | Approximate duration |
| --- | --- | --- | --- |
| S01 | Identify the problem | Standalone text: "Scattered feedback. Focus on what matters," with room to emphasize keywords | About 3 seconds |
| S02 | Show the product in action | Diagram marking the list, selected entries, and merged entry; the same feedback example | About 8 seconds |
| S03 | Prove the result | Sketch showing the priority list after the user sorts it | About 8 seconds |
| S04 | Remember the product and action | Product name and one CTA | About 4 seconds |

Approximate durations check story scope and may change. Drawings can be low fidelity; final layout, motion, seams, frame ranges, and musical timing are not required. Record the user's exact confirmation only after they accept script v2; for explicit delegation, record the authorization and agent decision. Filling in a template cannot create approval.

## Stage three: add production details to the same storyboard

Keep segment IDs and content purposes, adding production columns without overwriting the story in `script.md`. The following shows only the production layer for S02, not a required stage-two field:

| Segment ID | Focus / subject change | Continuity | Timing and assets | Sound / checks |
| --- | --- | --- | --- | --- |
| S02 | Feedback 17/23 selected → user merges → new entry retaining recognizable text | Enter the list after S01 text settles; the merged result becomes the item sorted in S03 | Fill in actual half-open frame range `[start,end)` and asset paths from the project; do not prefill here | Feedback matches press/merge landing points; result is readable; E01/E02/E03 |

Example revision record: `8.2–9.1s / Cut immediately after merging makes the source impossible to track / E02 / Keep the same entry text and color coding, and move it into the list / Rewatch this segment and adjacent seams; the object can be tracked at normal speed`.

For segments needing more detailed rhythm, one extra production note is enough: `S02 / Rhythm: brief selection, more spacious result reveal; landing point: merge complete; reading: allow comprehension time after the new entry becomes clear; continuity: the same entry moves into sorting.` A text segment can say `S01 / Group "Scattered feedback / Focus on what matters," emphasize "what matters," and enter the list after text settles and is readable; refer to T01, calibrating actual duration through playback.` See [Motion language](motion-language.md) for method selection; the same duration or action is not required in every shot.

`Selection B confirmed / script v2 awaiting confirmation` means stop in stage two; `direction v1 and script v2 confirmed / only fixing a button` means remain in stage three; `draft exists / confirmation evidence missing / this request authorizes only a button fix` means local revision does not expand into whole-film approval.

## Integration with existing review

The initialization tool creates `brief.md`, `direction.md`, and `storyboard.md`; create `script.md` as needed in stage two. Review collects the first three records by default; add the script to `records/review-context.json` through the existing `reference` role:

```json
{
  "documents": [{"role": "reference", "path": "records/script.md"}],
  "actionRanges": []
}
```

This is a minimal example for a new configuration. If a configuration exists, merge the script entry into `documents`, retaining existing entries and `actionRanges`; do not overwrite them with empty arrays. Add the script only if the file actually exists, and keep its path inside the film project. Brief/direction/storyboard records with their original names are still collected by default.

If research is extensive and `records/research.md` actually exists, also merge `{"role":"reference","path":"records/research.md"}`; short research in the brief needs no additional configuration. Motion decisions already in the storyboard are collected by default. Add important text replacement or handoff windows to `actionRanges` using actual global half-open frame ranges, keeping previous ranges and limiting sampling volume. Do not fabricate an older project's history using a "confirmed" template.

For older projects without a script, continue using the actual brief/storyboard instead of inventing a "confirmed script." Record a new story the next time it is actually confirmed. If records are renamed, point the appropriate role to the real path; see [tech.md](tech.md#using-the-existing-review-tools) for the full interface.
