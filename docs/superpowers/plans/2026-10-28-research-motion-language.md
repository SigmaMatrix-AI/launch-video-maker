# Research and Motion Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate website exploration, breathing room, and semantic text motion into the existing three-stage production process, validating the effects through a small set of runnable comparisons and observation of real demos.

**Architecture:** Primarily revise the skill's research and production guidance, adding research and motion guides read as needed and 5 groups of local method examples. Production records reuse brief/script/storyboard; review reuses reference documents, actionRanges, E01–E10, and seven-dimension scoring. The example generator calls the existing initProject without changing the runtime core or building a general motion platform.

**Tech Stack:** Markdown; existing React 19, TypeScript, Node.js 24+, Playwright, FFmpeg; Node test runner / tsx; no new runtime dependencies.

**Spec:** [Website exploration, breathing room, and text motion design agreement](../specs/2026-10-28-research-motion-language-design.md). Read the spec before executing. Implementation is already in the local working tree; behavioral and technical checks have run. Independent perception at normal speed, listening, and acceptance of transfer to real demos remain unverified; see the [Validation record](../../validation/research-motion-language-results.md). During implementation, commit steps were changed to local review checkpoints at the user's request. After review, the user separately authorized commit and push: consolidate this implementation into one commit while retaining the pre-existing Control rename and unrelated style locally. Checkpoint records below retain their status at implementation time.

## Global Constraints

- Preserve "3 visual mockups to set the direction → script and rough storyboard to set content → UI, transitions, rhythm, motion, and sound to refine the craft."
- Stage two does not require animated previews, final UI, exact frame ranges, musical timing, or rhythm acceptance.
- Feature names may organize the storyboard; one continuing example is optional, and the core demonstration's facts and assets need evidence.
- Explicit user authorization to choose/decide remains valid; silence is not approval, and local changes do not reopen unrelated stages.
- Template reference work follows the agreed composition, motion, and timing; research methods may be shared, but new text methods do not override templates by default.
- Keep React + TypeScript, unified frame control, Playwright, FFmpeg, and Node.js 24+; add no runtime dependencies and do not change the public runtime API, review schema, or seven-dimension thresholds.
- Visuals are determined by the current frame, inputs, assets, and a fixed seed; sequential playback, reverse playback, and random seek to the same frame must produce the same image.
- Deliver a local preview by default; generate a user-film MP4 only after an explicit export request.
- Preserve real asset sources, capabilities, and state meanings; record official copy claims, actual observations, and creative inferences separately.
- Do not substitute stills, playback logs, document checks, or scores for continuous viewing and listening; keep items unverified when evidence is missing.
- Preserve the pre-existing control-group name change in `SKILL.md`; do not modify the original working directory, installation links, or historical planning snapshots.

## Review Focus

1. A homepage has delayed sections, feature tabs, or relevant subpages: research must actually visit useful content, not treat a fullPage screenshot as exploration; restricted entry points must not be retried indefinitely (Task 1/2, B01/B02).
2. The user requests a feature tour or has an existing script: allow feature names to organize the storyboard, add no motion acceptance in stage two, and do not seek repeated approval after explicit delegation (Task 2/6, B03/B04).
3. Chinese, brand terms, numbers with units, and longer sentences: grouping preserves meaning, final text is readable, and method selection serves emphasis (Task 4/6, B05 and actual example observation).
4. Examples depend on the source repository, nondeterministic animation, or unfair comparisons: generated projects run independently, the same frame is reproducible, and Good / Bad share content and total duration (Task 3/4).
5. Template replication, old records, missing real demos, or missing audiovisual capabilities: retain template scope and existing context, report evidence gaps, and do not pretend quality work is complete (Task 5/6, B06/B07/B08).

---

## Worktree and baseline

- Continue in `/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`, branch `codex/three-stage-skill-plan`; planning HEAD is `10c34014b4ff469d98ac4a31c90e65234cf08b5e`.
- Before implementation, recheck `git status --short --branch`, HEAD, installation links, and concurrent changes; preserve the current uncommitted control name. At the user's request, do not stage or commit this round; retain the existing rename and body changes in the working tree for review.
- `/Users/mac/.agents/skills/launch-video-maker-control` points to this worktree, so rule changes affect subsequent use; tests must record the version or hash of the files used. The original skill points to the original repository and is outside this plan's scope.
- Use the saved pre-execution rule copy as a read-only behavioral baseline. Save it in ignored `films/research-motion-language-validation/baseline/`; do not create historical snapshots containing SKILL.md under discoverable skill paths.
- Two real demos have been located and isolated copies created; see the validation record for versions, paths, and local comparison scope. Copies come from currently available versions and cannot be treated as the originals from the user's initial feedback.
- By default, one implementer completes the sequence to avoid simultaneous edits to references; use isolated context for independent behavioral or perceptual review when needed. This is a cost recommendation, not evidence that the user has selected an execution approach.

## File and interface assignments

| Area | Files | Responsibility |
| --- | --- | --- |
| Research | `references/product-research.md` (new) | Browsing, evidence, stopping conditions, and restricted situations |
| Workflow | `SKILL.md`, `references/pipeline.md`, `references/template-conventions.md` | Entry points, stage boundaries, feature tours, and template scope |
| Motion methods | `references/motion-language.md` (new) | Timing at three scales, text choices, and R01/T01–T04 cards |
| Example entry points | `examples/motion-language/{README.md,create-study.ts,film.tsx}` (new) | Generate one example group using the existing player |
| Example source | `examples/motion-language/src/{types.ts,catalog.ts,shared.tsx,rhythm.tsx,text-reveal.tsx,text-replace.tsx,text-focus.tsx,text-handoff.tsx}` (new) | Metadata, minimal shared styles, and 5 visual groups; no general DSL |
| Font sources | `examples/motion-language/assets/`, `SOURCES.md` (add according to selected assets) | Only redistributable fonts covering the example glyphs, with sources |
| Records / review | `references/{stage-deliverables,eval,tech}.md`, `README.md` | Record examples, example navigation, compatibility, and validation scope |
| Research fixture | `runtime/validation/research-site/{index.html,features.html,case.html}` (new) | Small local test website, not product assets |
| Technical validation | `runtime/test/motion-studies.test.ts` (new) | Generator, random-access capture, independent assets, and necessary browser regression |
| Behavior / results | `docs/validation/research-motion-language-{scenarios,results}.md` (new) | Fixed inputs, actual behavior, media evidence, and unverified items |

Changes to `runtime/src/*`, existing templates/styles, package dependencies, or the review schema are not planned. If implementation requires exceeding this scope, first explain the specific blocker and smallest alternative; do not expand silently.

## Task 1: Fix behavioral scenarios and real baselines

**Files:** Create `docs/validation/research-motion-language-scenarios.md`, `docs/validation/research-motion-language-results.md`, `runtime/validation/research-site/{index.html,features.html,case.html}`; local only `films/research-motion-language-validation/`.

**Interfaces:** Consume the spec and pre-execution rule version; produce fixed inputs B01–B08, baseline responses/browsing evidence, and real-demo discovery results. Subsequently retest only failures and scenarios related to changes, without repeatedly generating full films.

| ID | Input | Required observation |
| --- | --- | --- |
| B01 | Product homepage with only a slogan above the fold; assets, tabs, and relevant subpages below | Actually browse lower sections and relevant entry points to obtain evidence, assets, and gaps useful for topic selection |
| B02 | Some pages are inaccessible; in another variant, the user limits work to provided materials | Clarify coverage and continue independent work; no repeated failures, fabrication, or mandatory website research |
| B03 | The user requests a "search → summarize → share" feature tour | Keep the reasonable content structure and choose expressive methods without forcing a single-example problem story |
| B04 | Direction selected and script requested; in another variant, explicit authority to choose and decide already exists | Stage two delivers only content; the authorized variant proceeds autonomously; timing and motion stay in stage three |
| B05 | Standalone Chinese copy mixed with brand terms and numbers with units | Semantic grouping, clear emphasis, and readable holds, without mechanical character animation or collecting every effect |
| B06 | Strict template replication; local feedback only asks for a more readable result | Preserve agreed composition and arrangement, identify conflicts and make minimal adjustments, without reopening direction/story |
| B07 | An old project has no research/script, and configuration already contains reference and actionRanges | Preserve existing context without fabricating research/approval; merge configuration when adding files that exist |
| B08 | Only stills/playback logs are available, and the two real demos are unavailable | Do not claim complete motion/sound observation or pass off old illustrative films as validation of transfer to real demos |

- [x] **Step 1: Save the pre-execution rule version and worktree state.** Save copies and hashes of referenced files in the local-only baseline directory; state sources and observation scope in results.
- [x] **Step 2: Build a small research fixture.** The index shows only a slogan above the fold, with candidate features and tabs later; real clicks reveal tab content. The features page provides details and a case entry point; the case page offers a usable result. Include one unrelated entry point and one explicitly failing entry point to test selective exploration. Label fixture content fictional and keep it small.
- [x] **Step 3: Write B01–B08 inputs and criteria.** Reserve the website fixture's answers and actual paths for the reviewer; the agent under test receives only the URL, task, and specified skill version and must not read fixture source. Do not judge a pass merely from keywords appearing in the response.
- [x] **Step 4: Start the fixture and run short old-version baselines for B01/B03/B04/B05.** From the repository root, run `python3 -m http.server 8765 --bind 127.0.0.1 --directory runtime/validation/research-site`; if the port is occupied, use an available port and record the actual URL. Save browsing/interaction and response evidence; do not generate full films this round, and honestly mark failures that were not reproduced.
- [x] **Step 5: Find the two real demos.** Record paths, official websites, scripts, and playable original entry points; do not modify original projects. If they cannot be located, mark real transfer as awaiting input and continue other tasks.
- [x] **Step 6: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** Fixed inputs and observation criteria are reusable; baseline conclusions have actual evidence; real demos are clearly distinguished from the old toy proof.

## Task 2: Integrate formal research and allow more script structures

**Files:** Create `references/product-research.md`; modify product/story sections in `SKILL.md`, `references/pipeline.md`, `references/template-conventions.md`, and `references/tech.md`; update results.

**Interfaces:** Consume B01–B04 and spec §5–6; produce an evidence table in the brief with "content/use, source, evidence type, asset/state, gap" and a judgment of research sufficiency. Keep the existing Markdown record format.

- [x] **Step 1: Write the research guide.** Explain whole-product exploration → candidate deep dives → targeted capture after selection; cover tabs/delayed content, relevant subpages, source type, stopping conditions, and failing entry points. Do not replace sufficiency judgments with fixed page or screenshot counts.
- [x] **Step 2: Change entry points in SKILL and pipeline.** Route selection may use a quick inspection, followed by formal research before stage one; reuse valid assets/research. Do not turn research into a new user approval stage.
- [x] **Step 3: Align all active story constraints.** Distinguish continuing examples, feature tours, single-feature launches, and output showcases in pipeline, tech, and template guidance; retain factual/visible-evidence baselines. Check `rg -n 'same|example|minimum|feature names|feature name' SKILL.md references README.md` and manually verify meaning rather than replacing keywords indiscriminately.
- [x] **Step 4: Retest B01–B04.** Compare actual browsing behavior and generated content, ensuring new rules do not cause unlimited exploration, reject scripts organized by feature names, or polish prematurely; continue when explicit delegated authority exists.
- [x] **Step 5: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** The brief can drive representative visuals and topic selection, and research can finish; feature tours are valid, and original three-stage approval/authorization boundaries remain unchanged.

## Task 3: Build a runnable example entry point and R01 rhythm comparison

**Files:** Create `README.md`, `SOURCES.md`, `create-study.ts`, `film.tsx`, `src/{types,catalog}.ts`, `src/{shared,rhythm}.tsx`, and required font assets in the example directory; create `runtime/test/motion-studies.test.ts`.

**Interfaces:**

- `StudyVariant = 'good' | 'bad'`.
- Put `StudyDefinition = { id: string; durationInFrames: number; markers: Record<string, number>; Frame: React.ComponentType<{frame: number; variant: StudyVariant}> }` in `src/types.ts`.
- Put `studies: Record<string, StudyDefinition>` and `resolveStudy(id: string): StudyDefinition` in `src/catalog.ts`; throw for unknown IDs. Register R01 in this task; Task 4 adds T01–T04.
- Put `createStudy(target: string, options: {caseId: string; variant: StudyVariant}): Promise<string>` in `create-study.ts` with an explicit CLI main boundary; importing must not trigger generation. Locate example source using import.meta.url and create the target with the existing `initProject`.
- Generated `study-config.ts` exports only `caseId` and `variant`; entry point `film.tsx` exports standard `film` and default `Frame({frame})`, with 1920×1080 dimensions, 30 fps, and an empty audio array; duration/markers come from the example.

- [x] **Step 1: Write necessary behavioral tests and confirm failure.** Test `unknown_case_does_not_create_target`, `existing_target_is_preserved`, `generated_study_runs_with_only_local_sources`, and `same_frame_matches_after_random_and_reverse_seek`. Run `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts` and record failures due to missing functionality; do not mistake an incomplete environment for the expected red state.
- [x] **Step 2: Verify and select fonts.** First inspect existing repository fonts' sources and actual glyph coverage, choosing redistributable files covering example copy and copying them with their licenses/sources into example assets. Do not assume an existing Noto subset covers new copy. Actually check Chinese and mixed copy rather than only file existence.
- [x] **Step 3: Implement the generation entry point.** Validate case/variant before creating the target; use initProject to generate a runtime snapshot and installation metadata, copy example source, configuration, and assets, and write brief/direction/storyboard records stating the fictional example and its purpose. Report source/asset write failures without overwriting existing projects. The generator only prepares projects; it does not start the player, install extra dependencies, or export automatically.
- [x] **Step 4: Implement R01.** With the same content, font, and total duration, good arranges brief actions, a spacious result, and readable holds; bad shows equal-length fast entrances and competing reading demands. Suggested duration: 9 seconds. Specific values are experimental parameters recorded in metadata and documentation, not universal skill thresholds. Extract only actually repeated styles/pure time calculations into the shared layer.
- [x] **Step 5: Run technical tests to passing.** Use startServer/openCapture under the existing browser test pattern to compare keyframe PNG bytes before and after random/reverse seeking; check final semantic content and absence of asset errors. Copy the generated project to a temporary directory outside the repository, then install/prepare to verify no external source/font dependencies; do not copy node_modules or caches as portable assets.
- [ ] **Step 6: Play both R01 versions.** Generate into new directories under `films/research-motion-language-validation/studies/`, then install, prepare, and preview using the generated project's existing commands. Observe reading and attention at normal speed; tests prove only determinism and must not prejudge good as better. Record specific issues and fix locally. **Progress: both previews and keyframes have been generated; perception at normal speed remains unverified.**
- [x] **Step 7: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** One command generates a chosen example project; both variants share content and total duration; independent operation and random-access frame capture pass; perceptual conclusions have a clear observation scope.

## Task 4: Implement four semantic text comparisons and the motion guide

**Files:** Create `src/{text-reveal,text-replace,text-focus,text-handoff}.tsx`; update example `catalog.ts`, README, SOURCES, assets, and `runtime/test/motion-studies.test.ts`; create `references/motion-language.md`.

**Interfaces:** Retain Task 3's StudyDefinition/StudyVariant and generation entry point, adding T01–T04. The motion guide references these IDs as production entry points; E IDs remain defined by eval.

- [x] **Step 1: Extend the technical-check example matrix.** Extend determinism and local-resource checks to T01–T04 good/bad. For T02, focus on clipping of the longest replacement word and the ending state; for T03, check that final focus does not loop; for T04, check for duplicate text during handoff. Image equality proves same-frame reproduction; layout/meaning still require actual observation. Do not write easing unit tests that mirror the implementation.
- [x] **Step 2: Implement T01 semantic reveal.** Compare a clearly grouped short Chinese sentence in good with mechanical character-by-character entrances for the same sentence in bad; use mixed brand terms/numbers with units as another validation input. Preserve punctuation and brand integrity.
- [x] **Step 3: Implement T02 keyword replacement.** Both versions show the same finite word sequence; good retains the sentence body and gives replacements reading windows, while bad resets the entire sentence. Do not treat infinite looping or missing copy as a fair comparison.
- [x] **Step 4: Implement T03 focus on the key point.** Use the same copy and emphasis; good ultimately settles on a readable core word, while bad continually shifts focus within the same total duration. Keep complete ending content rather than creating differences through missing characters.
- [x] **Step 5: Implement T04 text handoff into the product.** Use the same explicitly fictional search example, with a text object entering the input field and leading into the result; bad clears the screen before the UI enters independently. Both versions retain the same meaning, order, and result assets; do not pass off invented UI as actual product functionality.
- [x] **Step 6: Write the motion guide.** Timing at three scales + 5 concise example cards + how to choose/adjust/stop. Record commands, source paths, variable parameters, reading/continuity, and unsuitable cases. Cite official sources when borrowing from React Bits, and check licenses if code is copied. Do not record precise holds or SFX conclusions without watching the original motion.
- [ ] **Step 7: Run technical tests and compare at normal speed.** Check Chinese at actual/target preview size for missing glyphs, phrasing, clipping, and holds; all 5 pairs share copy, assets, total duration, and sound conditions. Repeat local checks only for revised examples. **Progress: 5/5 technical checks passed, and keyframes and mixed-text layouts were viewed; perception at normal speed remains unverified.**
- [x] **Step 8: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** The agent can choose methods by meaning rather than extracting component names; all five groups have runnable entry points and source/observation notes, without claiming reference-film quality.

## Task 5: Integrate stage records and existing eval

**Files:** Modify `SKILL.md`, `references/{pipeline,stage-deliverables,eval,tech,template-conventions}.md`, and `README.md`; update results.

**Interfaces:** The brief holds research summaries, and the storyboard holds stage-three rhythm intent/landing points/reading/continuity. Optional research files use the existing `documents[].role = 'reference'`; actionRanges retain half-open frame ranges. No new machine schema.

- [x] **Step 1: Extend stage-deliverable examples.** Show a brief evidence table and timing/text decisions appended to the same segment ID; stage-two examples contain only content, emphasis words, and rough duration. Extensive research may move into research.md, but it is not required.
- [x] **Step 2: Integrate the motion guide in stage three.** Choose methods by content first, then create representative segments, watch, and expand locally. Stage one describes motion character only, without producing three sets of animation. Link entry points as needed rather than copying every card.
- [x] **Step 3: Connect eval.** Point E06/E07/E09 to R01, E03/E10 to text examples, and E02 to T04; retain E01–E10, seven-dimension scores, and factual/audiovisual baselines. Completed research is not a new aesthetic score. Clarify that one shared easing is not inherently wrong; judge actual motion and reading.
- [x] **Step 4: Write context-merge examples and verify B07.** Add a reference only after the new file exists, preserving script/other documents/actionRanges; older projects without new records continue to load normally. Do not add many markers for sampling; use existing actionRanges for key windows and respect the 1200-frame budget.
- [x] **Step 5: Check paths, template scope, and B04/B06/B08.** Existing `readReviewContext` tests cover the basic capability; do not add mirrored schema tests when interfaces are unchanged. If documentation examples need verification, call the actual function in a temporary project, retaining old entries and checking the result.
- [x] **Step 6: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** Research, production, and review have consistent entry points and reusable records, with template/old-project compatibility; do not increase routine context cost through repeated long prose.

## Task 6: Real transfer, independent observation, and delivery verification

**Files:** Update `docs/validation/research-motion-language-results.md`; real-demo copies, baseline/revised previews, and evidence remain local only, all under `films/research-motion-language-validation/` or a user-designated isolated directory.

**Interfaces:** Consume B01–B08, 5 example groups, and the two located real demos; produce version-bound results, specific improvements/regressions, costs, and unverified items. Do not write simulated scenario approval into real user records.

- [x] **Step 1: Run new-version behavioral checks B01–B08.** Use the same inputs and original materials; reviewers inspect actual visits/artifacts, without feeding rule text or expected answers to the agent under test. Decide corrections from actual failures rather than piling up rules without evidence.
- [x] **Step 2: Compare website research.** For both demos' original websites, use the same film goals to check what else the new version finds, what is worth showing, and whether asset choices change. This experiment does not automatically change the user's confirmed story.
- [ ] **Step 3: Compare rhythm and text.** For each demo, choose a representative segment containing both text and product demonstration. Preserve the original, and fix script, direction, assets, total duration, and audio tracks in the copy. First adjust only time allocation, then text expression on top of that version. If duration/copy must change, record it separately as an uncontrolled revision, not mixed into single-variable results. Recheck the mix when timing changes in films with sound. **Progress: original, timing-only, and timing-plus-text copies and keyframes have been generated for both demos; continuous viewing and audiovisual synchronization have not passed acceptance.**
- [ ] **Step 4: Independent observation.** Have a reviewer uninvolved in production watch original/revised versions and context at normal speed, initially without good/bad labels, then describe specific ranges with insufficient reading time, focus conflicts, mechanical motion, or improved continuity. Do not prefill scores. Revisit continuous windows as needed; conclusions about the full film require full viewing, and sound cannot be certified without audio observation capability. **Progress: local previews are available; this round's tools did not provide continuous audiovisual observation, and stills or code review cannot substitute.**
- [x] **Step 5: Handle input or observation gaps.** If neither demo can be obtained, retain "real transfer awaiting validation" and report only behavioral, technical, and example scope; do not mark the entire task complete. If one is available, validate that one and leave the other separately unverified. Do not expand into full-film generation merely to fill a quota.
- [x] **Step 6: Complete necessary technical verification.** Run `npm run build` and `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts`; if changes to record integration need regression checks, run `runtime/test/review-pack.test.ts runtime/test/review-schema.test.ts runtime/test/review-check.test.ts`. Do not repeat full checks that already passed if their source has not changed.
- [x] **Step 7: Verify final status and cost.** Run `git diff --check`; check links, active skill version, and preservation of the existing rename. Record actual tokens if available, plus browsing/generation/rework counts. Separately list behavioral, technical, perceptual, and real-transfer conclusions and unverified items; do not promise savings percentages.
- [x] **Step 8: Local review checkpoint.** Skip the originally planned commit under the user's latest request; relevant source, documents, and records remain in the working tree, unstaged, uncommitted, and unpushed.

**Acceptance:** Delivery can explain which changes have evidence and which still need validation; real transfer can be claimed complete only after observations of both real demos are complete. Rules and tests cannot replace the user's judgment of finish.

## Dependencies, incremental delivery, and self-check

Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6. Task 2 delivers the research workflow independently; Tasks 3/4 provide motion methods; Task 5 connects them; Task 6 validates the whole and transfer. Temporarily missing real demos do not block Tasks 2–5.

Coverage check at plan-writing time (does not indicate implementation completion):

- [x] Website overview/deep dives/stopping conditions/restricted materials → Tasks 1/2.
- [x] Valid feature tours, content-only stage two, authorization and template boundaries → Tasks 2/5/6.
- [x] Rhythm at three scales, semantic text, five fair comparison groups, readable Chinese → Tasks 3/4.
- [x] Frame determinism, independent generated-project assets, existing-record compatibility → Tasks 3/4/5.
- [x] Examples distinct from real demos, no false claims without audiovisual evidence, verifiable costs → Task 6.
- [x] No new runtime API/schema/dependencies; implementation and local validation status are recorded above, without substituting technical passes for perceptual acceptance.
