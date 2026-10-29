# Website Exploration, Breathing Room, and Text Motion: Design Agreement

Status: implemented at the user's request, reviewed locally, then authorized by the user for commit and push. Behavioral and technical checks have run; normal-speed perception, listening, and real transfer effects have not passed acceptance. See the [validation record](../../validation/research-motion-language-results.md).

Companion plan: [implementation plan](../plans/2026-10-28-research-motion-language.md). Retains valid stage boundaries from the [three-stage design agreement](2026-10-28-three-stage-skill-design.md), explicitly relaxing its default “one example throughout the whole film” wording.

## 1. Problems and Goals

After running two demos, the user reported: website exploration stopped at the hero; animation lacked changes in speed/time allocation, breathing room, and rhythm (later clarified as “constant speed,” not a rejection of fast actions); independent text shots worked but their expressive potential was underused. This round aims to give agents sufficient evidence before production, concrete choices during production, and actual playback validation, reducing blind rework after a whole film is complete.

The three problems form one production chain: website research supplies content/assets → story determines what to say → step three arranges time, attention, and text expression → eval localizes specific gaps. Keep three stages without another user-approval stage.

Success criteria:

- Research discovers topic-relevant content beyond the hero and identifies assets, evidence, and gaps.
- Feature tours, single-feature launches, result showcases, and a continuous example are all valid scripts; no forced complex story.
- Step three arranges action speed, reading holds, and passage emphasis at different scales.
- Text motion relates to meaning, emphasis, and the next shot; Chinese uses semantic grouping first.
- New rules produce observable real production behavior and playable passages; complete documents, technical tests, or self-scores do not establish aesthetic improvement.

## 2. Known Project Facts and Evidence Boundaries

- Worktree: `/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`; branch: `codex/three-stage-skill-plan`; planning HEAD: `10c34014b4ff469d98ac4a31c90e65234cf08b5e`, pushed to origin.
- The worktree has a pre-existing user rename in `SKILL.md`: `launch-video-maker-control` / control group. Preserve it without renaming during this planning round.
- Installed control skill points to this worktree; original `launch-video-maker` points to `/Users/mac/Documents/repo/launch-video-maker`. Active-rule edits affect subsequent control tasks; record versions during implementation rather than claiming they are not yet effective.
- `references/pipeline.md` currently calls formal preparation “minimal product research”; `eval.md` and `tech.md` already discuss settling, holds, emphasis, and independent text. The main gaps are production decisions and concrete examples.
- `capturePage` in `runtime/src/tools.ts` supports full-page screenshots and preparation callbacks, not automatic navigation, research, or interaction discovery. Improve usage workflow first, without building a crawler.
- Runtime supports frame-based computation, markers, local sampling, and existing `review-context.json`. No new timeline, player, scoring schema, or record database is needed.
- The two demos were not located during design; implementation found current versions and retained isolated copies. See validation records for provenance/evidence limits. The small behavioral baseline did not reproduce shallow exploration; do not present inferred causes as reproduced findings.
- Old `films/three-stage-proof/` illustrates methods only; it cannot replace the two real demos or serve as an “expensive-looking” quality standard.

## 3. Approaches and This Round's Choice

| Approach | Benefit | Cost / limitation |
| --- | --- | --- |
| Add workflow and text rules only | Few changes, easy maintenance | Agents may understand principles yet generate the same fast slide-ins; no shared motion reference |
| Strengthen workflow + a few runnable Good / Bad cases | Research, production choices, and review correspond; implementation passages are reusable | Requires making/viewing cases and validating transfer with real demos |

This spec chooses the second. After discussing approaches, the user requested a spec and plan; implementation counts, file divisions, and experimental arrangements below are labeled design decisions, not falsely attributed as individual user mandates.

This round does not build a general animation-component platform, introduce automatic whole-site crawling, add automatic aesthetic scores, or import the full React Bits dependency. Existing template arrangement and runtime core retain their responsibilities.

## 4. Global Constraints

- Preserve “3 styleframes set tone → script and rough storyboard set content → UI, connections, rhythm, motion, and sound refine the finish.”
- Step two requires no motion sample, final UI, precise frame ranges, music synchronization, or rhythm acceptance.
- Feature names may organize storyboards; a continuous example is optional. Core demonstrations need factual and asset evidence.
- Explicit delegated selection/decisions remain authorized; silence is not approval; local edits do not reopen unrelated stages.
- Template reference honors agreed composition, actions, and timing; research methods may be shared, but new text methods do not forcibly override templates.
- Retain React + TypeScript, unified frame control, Playwright, FFmpeg, Node.js 24+; add no runtime dependencies or changes to public runtime API, review schema, or seven-dimension thresholds.
- Current frame, inputs, assets, and fixed seed determine the image; forward playback, backward access, and random seek to the same frame yield the same image.
- Deliver local preview by default; generate the user's film MP4 only on explicit export request.
- Preserve real asset provenance and the meaning of capabilities/states; record official copy, actual observations, and creative inferences separately.
- Stills, playback logs, document checks, and scores cannot replace continuous viewing/listening; missing evidence remains unverified.
- Preserve the existing control-group rename in `SKILL.md`; do not modify the original working directory, installation links, or historical planning snapshots.

## 5. Placement Within Three Stages

| Position | Necessary decision | Record |
| --- | --- | --- |
| Route selection | Quick read-only check for suitable templates, assets, and constraints | Existing entry; a quick check is not completed formal research |
| Before step one | Understand the product broadly, choose candidate content, find usable assets | Research summary/evidence table in `records/brief.md` |
| Step one | Generate three static directions from identical evidence-backed representative content; describe motion character | `records/direction.md`; stills do not prove motion effects |
| Step two | Choose story organization; confirm content, order, key words, and must-show items | `records/script.md` and rough `storyboard.md`; add topic-driven research |
| Step three | Arrange time, attention, text methods, object continuity, and sound | Add production details to the same `storyboard.md`; capture by shot as needed |
| Review | Judge current images/context, localize issues, and fix locally | Existing review pack/check; E01–E10 and case IDs |

## 6. Website Exploration: Overview First, Then Topic-Driven Depth

### 6.1 Browsing Strategy

1. Read main homepage sections, navigation, and product entry points; scroll to later sections and inspect tabs, carousels, or collapsed content that affect understanding. Actual browsing, static screenshots, and page text establish different things.
2. Inventory candidate content/assets, then open related feature, case, documentation, or official demo pages. Prioritize questions that change the topic or visuals instead of mechanically traversing every page.
3. Distinguish capability descriptions from visible states: marketing copy supports “the official site describes it this way,” but alone cannot establish operational detail or performance. Keep unobserved interactions as gaps; when needed, choose an evidence-backed result showcase or label an illustration.
4. After choosing content, collect only needed screenshots, recordings, states, and resolution. Reuse valid research; without a website, or when restricted to supplied materials, work from existing inputs without forcing web access.

### 6.2 Minimal Outputs and Stop Conditions

Record audience, candidate topics, brand requirements, and a short evidence table in `brief.md`:

| Content / use | Source page or local material | Evidence type and observed content | Capturable assets / states | Gaps |
| --- | --- | --- | --- | --- |
| Search | Real URL or file path | Separately label official description / observed demo / inference | Actually available input, results, highlights, etc. | Missing states or resolution |

This table illustrates fields, not proof that any particular product supports search. Complex research may use `records/research.md`, leaving conclusions/links in brief; do not add a mandatory file by default. Store assets inside the film project with provenance and necessary capture states/times; do not repeatedly load whole-site text into context.

Completion conditions: understand major relevant capabilities and asset locations; chosen content has locatable evidence; key expression has usable assets or explicit alternatives; unresolved questions will not force invention of features or a change to the selected main thread. No fixed page-count target.

For login restrictions, page errors, or inaccessible key assets, record covered/uncovered scope and use available materials to advance independent work. Never fill gaps in core facts by guessing. Stop repeatedly visiting the same failed entry.

## 7. Breathing Room: Timing at Three Scales

| Scale | Choice | Good | Bad |
| --- | --- | --- | --- |
| Action | How initiation, progression, and settling reflect the object's role | Brief click, expansive panel movement, stable result | Identical fast easing for all objects |
| Shot | When attention passes and key content becomes readable | Give the result reading space after the main action | Introduce the next focus before the previous reading task ends |
| Whole film | Which passages compress, expand, or resolve | Compact operations, result showcases, and ending have different weight | Equal-length page changes or uniform slowdown |

In step three, add four short notes for key passages needing timing: rhythm intent, key landing point, effective reading window, and next-shot continuity. A paragraph is enough; do not require every shot to fill the same table.

Example: `Keep the opening compact and let the result breathe; the summary finishing its expansion is the landing point; allow comprehension time once the key summary is clear; the shared object carries into the next shot.` This example is not a fact about a product.

Judge reading windows from actual text volume, format, and focus; the whole sentence is not readable as soon as its first character starts entering, and all titles need not hold for the same number of seconds. Focus observation on key text clarity/stability without banning readable moving text.

Stillness, hard cuts, fades, and restrained background movement are all valid. Breathing room is not constant floating, global slowdown, or a fixed “enter—hold—exit” for every passage. With sound, arrange musical phrases, accents, and tails too; silent examples establish only visual rhythm.

## 8. Text Motion: Choose by Expressive Purpose

| ID | Purpose and method | Good | Bad | Related eval |
| --- | --- | --- | --- | --- |
| T01 | Semantic grouped reveal | Phrases build meaning sequentially; key words settle readably | Every Chinese character bounces mechanically at equal intervals | E03/E06/E10 |
| T02 | Keyword replacement | Preserve the sentence body and replace only changing words a limited number of times | The entire sentence continually rotates, repeatedly resetting reading | E03/E07/E09/E10 |
| T03 | Focus on key content | Clarity/emphasis follows meaning and finally rests on the point | Focus loops endlessly, leaving viewers unsure what to remember | E03/E09/E10 |
| T04 | Text enters the product | A copy object becomes input/result and carries into the next shot | Clear the title, then slide in an unrelated screenshot | E01/E02/E10 |
| R01 | Allocate time between action and reading | Alternate fast action and expansive results, leaving comprehension time in the same duration | Identical content enters quickly in equal-length passages, competing for reading | E03/E06/E07/E09 |

Choosing 5 initial case pairs is this design's scope decision; films need not use every method or a fixed number of text shots. T01–T03 may borrow expressive principles from React Bits; T04 is a cross-shot arrangement case, not a claimed ready-made React Bits component.

Each case card contains expressive purpose, Good / Bad symptoms, runnable entry, adjustable parameters, reading/continuity notes, unsuitable conditions, provenance, and actual observation scope. Read the short index first during creation and load relevant implementation only after selecting a method.

For Chinese, manually confirm semantic grouping by default; combine English, numbers, units, and brand terms by meaning. Do not pop punctuation in isolation or incorrectly split brands/real UI labels. Select a few methods consistent with the film's direction, reserving stronger changes for key passages.

React Bits references:

- [Split Text](https://reactbits.dev/text-animations/split-text): staggered character/word entry.
- [Rotating Text](https://reactbits.dev/text-animations/rotating-text): phrase rotation.
- [True Focus](https://reactbits.dev/text-animations/true-focus): changes in clarity between words.

Official descriptions on these pages have been read; this does not mean every interactive preview was observed or its code verified for direct film use. Implement needed principles with the existing frame system first; if borrowing source, check actual license/dependencies and record provenance, without scroll, pointer, timer, or wall-clock triggers.

## 9. Case Projects and Reference Films

Add `examples/motion-language/` as local method studies distinct from official film templates and runtime validation films. Track case source, short notes, and necessary distributable assets; generated projects, dependencies, screenshots, and review packs go in ignored `films/`.

Entry: `npx tsx examples/motion-language/create-study.ts <new-directory> --case R01 --variant good`, supporting R01/T01–T04 and good/bad. Reuse `initProject(target)` and copy the selected case's source/config/assets. Reject existing target directories; do not automatically preview, export, or modify templates. Then install, prepare, and preview with the generated project's existing commands.

Each Good / Bad pair has identical copy, content order, font, format, assets, total duration, and sound conditions, changing only the case's timing/expression method. Defaults: 1920×1080, 30 fps, silent, approximately 6–10 seconds—experimental specifications, not user-film constraints. Bad must also play correctly with correct text; do not manufacture advantages through broken assets.

Each case exposes the current-frame React image and Film metadata, without a general animation DSL. Use fonts with verified provenance/glyph coverage; generated projects copy required assets rather than reading the user's Downloads or another project at runtime. Original reference films need not be distributed with the repository.

The two user-approved references remain observation material:

- `/Users/mac/Downloads/Best SaaS Product Launch Ad Video.mp4`
- `/Users/mac/Downloads/YTDown.com_YouTube_Media_4SCjXcBeW1E_Introducing-Google-Vids_001_2160p.mp4`

Existing sampled frames support layout/object-relationship observations. Before extracting exact pauses, speed changes, or audiovisual relationships, continuously view the relevant passage and listen for sound judgments. Mark unverified if capability or originals are missing; continue original method cases, but do not present them as certification of reference motion.

## 10. File Responsibilities and Review Integration

| File | Responsibility this round |
| --- | --- |
| `SKILL.md` | Distinguish quick checks from formal research; link production methods; keep entry short |
| `references/pipeline.md` | Research placement, flexible script structure, step-three time/text choices |
| `references/product-research.md` (new) | Browsing, evidence table, stop conditions, restricted scenarios, research reuse |
| `references/motion-language.md` (new) | Three-scale rhythm, semantic text choices, R01/T01–T04 cards and on-demand entry |
| `references/stage-deliverables.md` | Brief evidence table, step-three production notes, optional research-file integration |
| `references/eval.md` | Retain E01–E10, connect cases/observation questions without copying production guidance |
| `references/tech.md` | Frame determinism, reading/action checks, flexible-script principles; retain minimum requirements and seven-dimension review |
| `references/template-conventions.md` / `README.md` | Update research links/capability descriptions while retaining template boundaries |
| `examples/motion-language/` (new) | 5 runnable pairs and locally reusable source |
| `docs/validation/research-motion-language-{scenarios,results}.md` (new) | Evidence summaries for behavior, cases, real demos, and cost |

Research summaries go in default-loaded brief; rhythm/text decisions go in default storyboard. If optional `records/research.md` exists, merge it into `review-context.json` with the existing `reference` role, preserving script, other documents, and actionRanges. Use existing actionRanges for text/handoff intervals needing dense observation rather than whole-film frame-by-frame sampling beyond the 1200-frame budget.

Website research checks preparation sufficiency and facts, not a new aesthetic dimension. Breathing room mainly maps to E03/E06/E07/E09; text to E02/E03/E10; seven-dimension scoring is unchanged. Review issues still record interval, symptom, case ID, corrective action, and re-view condition.

## 11. Validation, Cost, and Completion Boundaries

Separate acceptance:

1. **Behavior:** Compare old/new versions with identical input, observing actual browsing and production choices instead of merely asking agents whether they agree with rules. Use a small local website fixture to verify discovery beyond the hero, interactive regions, and related subpages; do not provide fixture source to the tested agent.
2. **Technical:** Check new cases for random/reverse frame consistency, settled text states, actual fonts/masks, and generated-project standalone operation. Tests establish only the corresponding technical properties.
3. **Perceptual:** Play identical-content Good / Bad pairs at normal speed, recording concrete differences in reading, attention, and continuity; the name “good” does not establish superiority.
4. **Real transfer:** Locate the user's two demos, preserve originals, and compare representative local passages. Separate website-research experiments from fixed-script rhythm/text experiments, then inspect combined effects. If demos are missing, finish the first three categories while real transfer remains unverified; do not substitute old illustrative samples.

Keep only short reusable conclusions in prose, storyboards, and assets; load research/motion guidance by stage; run only the needed case pair. Each round fixes the issue most affecting comprehension/impression, re-viewing affected passages/seams and reviewing the whole film before delivery. Recheck actual mixes when sound exists and timing changes. If one targeted revision round brings no improvement, record the specific disagreement and seek focused feedback rather than endlessly adding motion.

Record actual token data if available; otherwise browsing/generation/rework counts and elapsed time, without estimating savings percentages.

Report delivery status separately: rules/cases implemented; behavioral/technical results; perceptual observation scope; two real-demo comparisons. Without completed real transfer, do not claim all three quality problems solved. Implementation, installation switching, additional publication, and remote push are outside this documentation-only action.

## 12. Choices Left to the Implementer

Within these boundaries, the implementer selects curves, shot durations, letter spacing, colors, and emphasized words; calibrate parameters through actual playback. Cases are not mandatory art templates. First find real-demo paths and associated sites in existing project records; ask the user for paths only if they cannot be uniquely located. This affects only real-transfer validation, not independent workflow/case work.
