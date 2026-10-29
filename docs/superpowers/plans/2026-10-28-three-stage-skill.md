# Three-Stage Launch Video Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Change autonomous design to “choose tone from 3 styleframes → confirm content through a story script and simple storyboard → continually refine UI, camera, rhythm, and motion,” using Good / Bad cases to guide creation/review and reduce rework caused by discovering a wrong direction after completing the film.

**Architecture:** Primarily restructure skill documents while retaining runtime, template execution, and seven-dimension review. The entry keeps only mode selection, three-stage boundaries, and on-demand links; workflow documents define stage deliveries and continuation; eval begins with case comparisons, with prose explaining principles and minimum requirements. Preserve selections, scripts, and versions in existing Markdown production records without a new state machine.

**Tech Stack:** Markdown skill; existing React + TypeScript, Playwright, FFmpeg; Node.js 24+. Runtime changes are limited to possible documentation guidance in review handoff, without new dependencies/APIs/scoring fields.

**Spec:** [Three-step autonomous design agreement](../specs/2026-10-28-three-stage-skill-design.md). Read the spec and plan before implementation; input snapshots are not an already-implemented new skill.

## Global Constraints

- Step two is not motion validation or finish acceptance.
- The user's additional default creative rule: **Good: titles and text appear in independent shots with highlighted words or motion; Bad: side-by-side or vertically stacked titles and illustrations that resemble a slide deck.**
- Apply the new default only to the agent-planned route. Template reference retains its existing replication scope/arrangement without mandatory three-direction pitches; fix only cross-document conflicts.
- Silence is not approval. When the user explicitly says “You decide; finish it directly,” choose within authorization and record decisions without asking again.
- Continue React + TypeScript, unified frame control, Playwright, FFmpeg, Node.js 24+.
- Do not rebuild runtime, player, or scoring engine, or add workflow databases or mandatory JSON state machines.
- Provide local preview by default; generate user MP4 only after an explicit export request.
- Retain seven-dimension scores with a 7.5-per-dimension threshold, authenticity/readability/asset requirements, and unverified status for insufficient evidence.
- The user authorized implementation. See the [validation record](../../validation/three-stage-skill-results.md) for completion/evidence scope; installation switching and publication remain excluded.

## Review Focus

1. Time pressure skips direction/story confirmation: S1/S2 must stop at the correct stage, while explicitly delegated S3 continues (Tasks 1/2).
2. Misreading “avoid slide decks” as banning all UI titles or holds: S4 retains real interface labels and readable results while promotional titles have independent shots (Tasks 1/3).
3. Losing or fabricating confirmations on continuation: S5 local feedback changes only affected shots; do not infer confirmation without approval records (Tasks 1/2/4).
4. Autonomous rules intrude into template replication: S6 honors existing composition/timing without forcing three additional proposals (Tasks 1/2).
5. Calling sampled frames, technical passes, or 7.5 “expensive/audiovisually passed”: S7 states actual observation scope; S8 does not fabricate missing reference evidence (Tasks 1/3/5).

---

## Worktree and Planning Baseline

- Planned worktree: `/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`.
- Branch: `codex/three-stage-skill-plan`; starting point: `b7b61fc11fad63adc7fcceca82611b05b3df1b71`.
- Original working directory has uncommitted changes; snapshot directory is `docs/superpowers/specs/2026-10-28-three-stage-inputs/`, with source paths and SHA-256 in `manifest.json`.
- Snapshots establish planning inputs only. Compare worktree, snapshot, and latest mainline file by file; do not copy the old directory wholesale or include style deletions, image edits, or other parallel work.
- Installed entry `/Users/mac/.agents/skills/launch-video-maker` points to the original directory. For new-version validation, provide the agent with the worktree's absolute `SKILL.md` path; this plan does not switch installation or publish.
- Existing `runtime/src/project.ts` creates `brief.md`, `direction.md`, and `storyboard.md`; `readReviewContext(project)` already supports additional Markdown with role `reference`. Use this extension point for new `script.md`.
- The original directory has a one-line uncommitted handoff change in `runtime/src/review/pack.ts`, saved as snapshot `review-handoff-existing.patch`. Merge its intent in Task 4 without overwriting the whole file.

## File Responsibilities

| File | Action | Responsibility |
| --- | --- | --- |
| `SKILL.md` | Modify | Triggers, two modes, three-stage entry, confirmation boundaries, preview/export agreement |
| `references/pipeline.md` | Rewrite | Three-stage actions, confirmation/continuation, step-three iteration order |
| `references/stage-deliverables.md` | Create | Minimal stage-output examples, record contents, review-context integration |
| `references/eval.md` | Create/restructure | 10 Good / Bad cases, reference anchors, minimum requirements, review writing; absent in baseline Git |
| `references/tech.md` | Modify | Retain technical/seven-dimension scoring, link case standards and new script context |
| `references/template-conventions.md` | Modify | Template-route boundaries to prevent accidental spread of three-stage requirements |
| `README.md` | Modify | Public workflow matches execution; on-demand reading navigation |
| `runtime/src/review/pack.ts` | Minimal edit | Handoff links eval cases and tech protocol, without changing evidence-pack mechanisms |
| `docs/validation/three-stage-skill-scenarios.md` | Create | Fixed inputs, scenario expectations, individual assessment basis |
| `docs/validation/three-stage-skill-results.md` | Create | Old/new behavior results, raw-evidence locations, observation limits, cost records |

No changes needed to `runtime/src/project.ts`, review schema/check, renderer, template source, or style packages. `stage-deliverables.md` provides production-record examples, not a new software protocol.

## Task 1: Establish Behavioral Baseline and Assessable Scenarios

**Files:**
- Create: `docs/validation/three-stage-skill-scenarios.md`
- Create: `docs/validation/three-stage-skill-results.md`
- Read: Snapshot `SKILL.md` / `references/*` and spec

**Interfaces:**
- Consumes: Design agreement and snapshot, without unfinished new rules.
- Produces: Fixed scenarios S1–S8, each recording input, actual output/action, expectation, judgment, evidence path, and observation limits for Tasks 2–5 retests.

- [x] **Step 1: Write S1–S8 scenarios and expectations.**

| ID | Input scenario | Checkable expectation |
| --- | --- | --- |
| S1 | Complete product materials, autonomous design requested, no direction selected | 3 visual directions for identical content; stop at selection; no complete film |
| S2 | User selected B and wants a draft quickly, but story unconfirmed | Deliver script and rough storyboard; final UI, exact frame intervals, and motion acceptance are not step-two conditions |
| S3 | User explicitly says “You decide the direction and script; finish it directly” | Choose within authorization and record it; no repeated confirmation or fabricated personal user selection |
| S4 | “One piece of content, many languages”; real UI has header, navigation, results | Independent promotional text shots emphasizing keywords; retain necessary UI labels and readable holds; reject default side-by-side/stacked title-and-image layouts |
| S5 | Confirmed direction/script; user only wants more precise button action | Stay in step three; do not remake directions/story; record changes and affected seams. Add a variant without confirmation records; do not infer approval |
| S6 | Explicit shot-by-shot template replication, replacing only product content | Honor arrangement, record authenticity/readability conflicts; no mandatory extra stages or removal of reference title layout |
| S7 | Only sampled stills and passing technical logs, no listening | No full motion/audiovisual pass, automatic high scores, or equating 7.5 with “expensive” |
| S8 | Two references unreadable on another machine | Report evidence gaps; use recorded written observations without inventing viewing, sound effects, or timestamps |

- [x] **Step 2: Run a short behavioral baseline on the current snapshot.** Use fresh-context agents for planning/selection/review responses only, without three films. Supply explicit test materials and simulated user dialogue; simulated confirmation exists only in tests, never real production records. Save actual responses and violations; do not report unobserved failures as reproduced.
- [x] **Step 3: Map findings to rules requiring changes.** The main known conflict is “do not wait for confirmation at storyboard or other stages”; judge other scenarios by actual behavior. Do not modify skill in this stage.
- [x] **Step 4: Commit validation materials.** `git add docs/validation/three-stage-skill-*.md`, message `test(skill): define three-stage workflow scenarios`. Keep large raw logs/generated media in ignored experiment directories; commit only concise evidence records.

**Acceptance:** S1–S8 have explicit expectations; baseline conclusions cite actual output rather than keyword searches as behavioral judgments.

## Task 2: Implement Three-Stage Workflow and Deliverables

**Files:**
- Modify: `SKILL.md`
- Modify: `references/pipeline.md`
- Create: `references/stage-deliverables.md`
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: S1/S2/S3/S5/S6 and spec stage contracts.
- Produces: Minimal forms for `records/brief.md`, `records/direction.md`, `records/script.md`, `records/storyboard.md`; direction/script record selection version and confirmation basis using existing Markdown formats.

- [x] **Step 1: Update entry.** Retain triggers/two modes; autonomous route explicitly becomes “3 styleframes → story confirmation → refinement.” Remove conflicting continuous-progression/no-confirmation wording; define autonomy as execution decisions within stages. Entry links deeper rules without repeating full eval.
- [x] **Step 2: Update pipeline.** Product research prepares stage one without another user gate. Clearly define each stage's inputs, outputs, confirmation point, allowed changes, and continuation routing. Step three owns UI, connections, rhythm, motion, and sound; step two does not require playback validation.
- [x] **Step 3: Write minimal output examples.**
  - Stage one: `assets/directions/a.png`, `b.png`, `c.png` and direction records; choose image/screenshot methods based on capabilities without a fixed generator. Same candidate content, visibly different designs.
  - Stage two: script includes at least “opening—problem—product intervention—result—ending”; storyboard columns: passage ID, content purpose, sketch/picture description, approximate duration. Duration only helps assess story scale.
  - Stage three: add focus, subject changes, connections, actual frame ranges/timing, and audio under the same storyboard passage IDs. Script preserves the confirmed content thread.
  - Provide short continuation examples such as “B confirmed / script v2 awaiting confirmation / user delegated selection,” without assuming real approvals.
- [x] **Step 4: Retest S1/S2/S3/S5/S6 with identical inputs.** If stage-boundary wording is ambiguous, compare old/new short-response microtests at least 5 times each, manually reading every output; microtest only ambiguous inputs without repeated renders. Ensure confirmation statements match actual next actions.
- [x] **Step 5: Commit.** `git add SKILL.md references/pipeline.md references/stage-deliverables.md docs/validation/three-stage-skill-results.md`; `feat(skill): introduce three-stage autonomous design`.

**Acceptance:** Three directions do not become three full films; step two independently confirms “what to say”; explicit delegation avoids repeated confirmations; continuation reuses valid decisions.

## Task 3: Restructure eval Around Good / Bad Cases

**Files:**
- Create/Modify: `references/eval.md`
- Modify: `references/pipeline.md` (step-three review references only)
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: Spec E01–E10, verifiable observations of four reference passages, S4/S7/S8.
- Produces: Stable case IDs `E01`…`E10`; local-feedback format “time interval + symptom + case ID + corrective action + re-view condition.” Keep IDs stable for continuation references.

- [x] **Step 1: Preserve current eval minimum requirements individually.** Extract authenticity, key operations, readability, asset/playback failures, version evidence, listening, and independent-review requirements from the snapshot; a short case table must not overwrite them.
- [x] **Step 2: Put E01–E10 at the start of eval.** Each gives specific Good, Bad, and key judgment; do not replace observable facts with “more sophisticated/natural.” E10 preserves the user's independent-text-shot rule, distinguishes promotional titles from real UI labels, and makes template replication subject to agreed scope.
- [x] **Step 3: Add 4 written case cards.** Cover LangEase 10–14 / 15–19 seconds and Google Vids 10–16 / 55–62 seconds; each describes expressive purpose, object changes, benefit, and a written “bad alteration” counterexample. Bad is a hypothetical example, not an alleged original defect; recheck timestamps. Link authorized reference sources; without a distributable original URL, record local development provenance and availability limits, never invent web links or copy large MP4s.
- [x] **Step 4: Add quality-level and iteration examples.** Explain basic competence / cinematic presentation / reference finish without changing numeric thresholds. Step three fixes subject/information issues before local craft; retain legitimate uses of stillness, hard cuts, and similar methods.
- [x] **Step 5: Retest S4/S7/S8 and check four cards' evidence scope.** Agents should localize issues through cases and propose verifiable edits, without forcing every shot to morph or demanding continuous whole-film motion. Mark subtle easing/sound unverified if unobserved.
- [x] **Step 6: Commit.** `git add references/eval.md references/pipeline.md docs/validation/three-stage-skill-results.md`; `feat(skill): lead quality review with good bad examples`.

**Acceptance:** The table alone explains ten concrete gaps; deeper rules remain accessible; sampled frames do not support false sound/full-viewing claims.

## Task 4: Connect Production Records, Review Navigation, and Template Boundaries

**Files:**
- Modify: `references/stage-deliverables.md`
- Modify: `references/tech.md`
- Modify: `references/template-conventions.md`
- Modify: `README.md`
- Modify: `runtime/src/review/pack.ts` (handoff wording only)
- Update: `docs/validation/three-stage-skill-results.md`

**Interfaces:**
- Consumes: Three-stage outputs, E01–E10, existing `readReviewContext(project)` and `ReviewContext`.
- Produces: Context integration without interface changes: script enters review pack through existing `reference` role; direction/storyboard retain default collection paths.

- [x] **Step 1: Write review-context example.** `{"documents":[{"role":"reference","path":"records/script.md"}],"actionRanges":[]}`. Explain merging existing documents/actionRanges without overwriting user settings; script must exist before adding the entry. Legacy projects without script retain brief/storyboard, never fabricate a “confirmed script.”
- [x] **Step 2: Align README, tech, and template guidance.** Remove conflicts implying direct full-film autonomous progression; add two confirmation points only to the autonomous route. Unify preview/MP4 export rules. Do not make strong beats or cutting on every beat mandatory quality criteria for all styles.
- [x] **Step 3: Update handoff.** Point `runtime/src/review/pack.ts` handoff at `references/eval.md` case diagnosis and `references/tech.md` seven-dimension/evidence protocol. First check whether another branch already merged the existing one-line patch to avoid duplicates; preserve current evidence/scoring API.
- [x] **Step 4: Check links and record integration.** Check relative paths, heading anchors, and example paths individually; in an independent test film, use `readReviewContext(project)` to verify reference script coexists with three default records and existing actionRanges remains unchanged. String-presence tests alone cannot establish workflow success.
- [x] **Step 5: Run existing relevant regressions.** If the environment is uninstalled, use Node.js 24+, `npm ci`, then `npm run build`. Run `npx tsx --test --test-concurrency=1 runtime/test/review-pack.test.ts runtime/test/review-schema.test.ts runtime/test/review-check.test.ts`; expect all pass. Report real missing dependency/Chromium/FFmpeg issues before calling anything a product pass. Wording edits need no mirrored string tests.
- [x] **Step 6: Commit.** Explicitly stage this task's files; `docs(skill): align stage records and review guidance`.

**Acceptance:** Old/new projects retain existing review interfaces; stage-two script survives stage-three review; templates are not forcibly recreated.

## Task 5: Verify Cases Actually Change Production and Review Behavior

Executed; normal-speed perceptual viewing and sound certification remain unverified; see validation records. Completed steps do not signify commercial film quality acceptance.

**Files:**
- Update: `docs/validation/three-stage-skill-results.md`
- Local only: `films/three-stage-proof/` (generated content is Git-ignored)

**Interfaces:**
- Consumes: New skill, fixed test brief, explicitly simulated direction/story confirmations, E02/E10, existing preview tools.
- Produces: Behavioral retest report, actual playable-passage observations, and unverified items; no automatic deployment/publication.

- [x] **Step 1: Fully retest S1–S8.** Use identical materials with explicit worktree-skill references and preserve old/new differences. Never enter simulated confirmation into real work records.
- [x] **Step 2: Produce a short visual comparison.** Use the same test story, “Turn scattered customer feedback into a prioritized list,” ideally 6–10 seconds, including an independent text shot (keyword highlight/motion) and continuous transformation of one subject from input to result. Use identical-content “title-and-image + full-page replacement” as a low-cost Bad comparison. Keep copy, assets, and specs comparable; Bad is not another full film. Use independent preview projects without default user MP4 export.
- [x] **Step 3: Actually observe and record.** Check text readability/object tracking at normal speed and necessary seams frame by frame; listen whenever sound exists and is evaluated. Describe changes using E02/E10 without prefilled expected scores. Have an uninvolved reviewer inspect the current version; retain unverified conclusions if observation/independent review capability is absent.
- [x] **Step 4: Record costs and limits.** Enter tokens only from real usage; otherwise record generation/rework counts and actual elapsed time. Do not claim this sample establishes consistently reference-quality full films. Fix/retest only failed scenarios rather than repeating all production.
- [x] **Step 5: Complete delivery checks.** `git diff --check` should be silent; verify three stages, E01–E10, template boundaries, audiovisual evidence, and export rules are traceable to files. Do not rerun the full runtime suite once related regressions passed and code stayed unchanged. Deliver plan status, behavior results, and actual preview locations; installation path remains unchanged.
- [x] **Step 6: Commit validation records.** `git add docs/validation/three-stage-skill-results.md`; `test(skill): record three-stage workflow and visual validation`. Do not add generated samples, dependencies, or original reference MP4s to Git.

**Acceptance:** Records explain whether the workflow avoids crossing stages, produces independent text shots, and improves object continuity; explicitly retain unprovable areas rather than presenting “documents finished” as “quality solved.”

## Dependencies and Suggested Execution

Task 1 → Task 2 → Task 3 → Task 4 → Task 5. Workflow and cases are closely related; one implementer should complete them sequentially, using isolated agents for behavioral baseline/retests and final observations rather than assigning multiple writers to the same skill at once. This controls context costs and helps reveal rule conflicts.

## Plan Self-Check

- [x] All stages define inputs, outputs, and confirmation boundaries; step two did not become motion acceptance.
- [x] The user's independent-text-shot Good / Bad rule appears in E10, S4, and Task 5's actual sample.
- [x] New script uses existing reference role; runtime need not generate or infer confirmation.
- [x] Existing seven dimensions/evidence requirements remain, with reference observation scope and missing listening explicit.
- [x] Two modes and installed-skill path differences are documented; worktree planning does not change the original installation.
- [x] Uncommitted eval and related documents have input snapshots; unrelated style changes were excluded.
- [x] Tasks specify files, actions, and validation; mirrored skill-text tests are not treated as behavior tests.
- [x] Planning created only the plan and input snapshots; later implementation status follows task checkboxes and validation records.
