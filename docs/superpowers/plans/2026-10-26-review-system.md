# Evaluation System Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a local film evaluation workflow with verifiable evidence, independent review, and item-by-item retesting, accurately distinguishing visual conclusions from full seven-dimension commercial conclusions.

**Architecture:** Extract evaluation logic from tools.ts into small review modules, reusing existing capture transactions, Player, and content versions. Evidence packs maintain a file index that prevents mixing; independent subagents supply judgments, and the validator checks scope, references, thresholds, and retest relationships. Do not implement automatic listening evaluation or replace continuous viewing with sampled frames.

**Tech Stack:** Node >=24, TypeScript, node:test + tsx, Playwright, FFmpeg/ffprobe; no new runtime dependencies.

**Spec:** [Evaluation design and scope](../specs/2026-10-26-review-system-design.md); existing baseline [quality assurance](../../../references/tech.md#quality-assurance), [technical conventions](../../../references/tech.md). Resolve conflicts using the approved design's scope distinctions without lowering seven-dimension commercial standards.

## Global Constraints

- Local processing only; do not send films, audio, or evaluation materials to external APIs.
- Do not install listening models, add model services, or automatically invoke external evaluation APIs.
- Do not modify `templates/`, `styles/`, or the other agent's template work.
- Do not modify or depend on `video-shotcraft` files; borrow only independent review and concrete-evidence practices.
- Do not automatically open browsers or generate full-film video files to bypass export authorization.
- Node >=24; reuse TypeScript, Playwright, and FFmpeg without new runtime dependencies.
- Seven-dimension commercial thresholds remain >=7.5/10 each; visual acceptance is not full commercial acceptance.
- Generate unscored reports by default; tools must not generate aesthetic scores or fabricate observation, listening, or independence declarations.

## Review Focus

1. Overlapping scenes, final-frame boundaries, and fractional fps must not cause out-of-range or duplicate captures; complete windows must not silently downsample (Task 2).
2. Same-version reruns, damaged evidence, runtime changes, and source changes during capture: retain old results and prevent mixing old/new evidence (Tasks 3–5).
3. In-pack path escapes, symlinks, missing Markdown brand records, and wrong-type input: explicit failure/incomplete rather than crashes or false passes (Tasks 1, 3, 5).
4. Background playback completion or a few captured frames cannot automatically become “independent agent watched continuously”; missing capability remains incomplete (Tasks 4–5).
5. Deleting old blockers after edits, citing only old evidence, or applying preview conclusions to a different MP4 must prevent acceptance (Tasks 5–7).

---

## File Responsibilities and Shared Interfaces

Create `runtime/src/review/`:

| File | Responsibility |
| --- | --- |
| types.ts | v2 manifest/report/result, dimension constants and data types |
| schema.ts | Structural validation of unknown input, returning data or field-path errors |
| sampling.ts | Pure functions: overview frames, frame-by-frame windows, and budgets |
| files.ts | Local path boundaries, streaming SHA-256, runtimeHash, index verification |
| pack.ts | Context snapshots, preview/existing MP4 evidence, unique-directory publication |
| playback.ts | Actual background playback and logs; no aesthetic conclusions |
| check.ts | Scope gates, file verification, observation coverage, historical retest validation |

Modify `runtime/src/tools.ts` (move reviewPack/validateReview out, retain capture/analyzeAudio) and `runtime/src/cli.ts` (command wiring). Do not refactor Player/renderer or add browser evaluation UI. Split tests into review-schema/sampling/pack/playback/check/cli.test.ts; put test builders in `runtime/test/review-fixtures.ts`, never templates.

Define shared types in Task 1; do not introduce synonymous fields later:

```ts
type ReviewScope = 'visual' | 'audiovisual';
type ReviewStatus = 'passed' | 'failed' | 'incomplete';
type FrameRange = {start:number; end:number}; // [start,end)
type Dimension = 'Style fidelity'|'Creativity and impact'|'Motion craft'|'Design and typography'|'Polish and detail'|'Sound and synchronization'|'Technical specifications';
type Evidence = {id:string; path:string; kind:'frame'|'context'|'mix'|'playback'|'probe'|'history'; sha256:string; bytes:number; frame?:number; range?:FrameRange};
type Target = {kind:'preview'; version:string; runtimeHash:string} | {kind:'mp4'; version:string; file:string; sha256:string};
type SamplingPlan = {frames:number[]; windows:FrameRange[]; overviewFrames:number[]};
type ReviewContext = {documents:{role:'brief'|'direction'|'storyboard'|'brand'|'reference'; path:string}[]; actionRanges:FrameRange[]};
type PlaybackTrace = {completed:boolean; samples:{elapsedMs:number; frame:number; playing:boolean}[]; errors:string[]; elapsedMs:number};
type Observation = {mode:'static'|'sequence'|'continuous-playback'|'listening'; range:FrameRange; evidenceIds:string[]; method:string; notes:string};
type Finding = {id:string; dimension:Dimension; severity:'blocking'|'advisory'; sceneId:string|null; range:FrameRange|null; description:string; fixTarget:string; evidenceIds:string[]; state:'open'|'resolved'|'not-reproduced'; resolution:string|null};
type Score = {state:'rated'|'unverified'|'deferred'; score:number|null; reason:string; evidenceIds:string[]};
type ReviewManifest = {schemaVersion:2; target:Target; film:Film; createdAt:string; tools:Record<string,unknown>; sampling:SamplingPlan; files:Evidence[]; missingContext:string[]; previous?:{reportEvidenceId:string; manifestEvidenceId:string}};
type ReviewReport = {schemaVersion:2; scope:ReviewScope; target:Target; manifestSha256:string; reviewer:{id:string|null; independent:boolean; capabilities:{continuousVisual:boolean; audio:boolean}}; observations:Observation[]; scores:Record<Dimension,Score>; findings:Finding[]};
type ReviewResult = {scope:ReviewScope|null; scopeStatus:ReviewStatus; commercialStatus:ReviewStatus; reasons:{code:string; path:string; message:string}[]};
type PackOptions = {scope?:ReviewScope; mp4?:string; previous?:string; signal?:AbortSignal};
type PackResult = {directory:string; manifestPath:string; reportPath:string};
```

Import Film from existing core.ts. Validate all populated intervals as integers with `0<=start<end<=N`; Finding.range=null is only for drafts awaiting relocation, and checkReview must classify it incomplete. Evidence IDs/issue IDs are unique; file paths are pack-relative. `Target.file` may point to a specified MP4 outside the project, is not resolved as an arbitrary evidence path, and is hashed separately during checking. Model or production copy does not enter runtime logic.

### Task 1: v2 Report Contract and Compatible Failure Behavior

**Files:** Create types.ts, schema.ts, runtime/test/review-schema.test.ts, runtime/test/review-fixtures.ts (in the directories above); do not modify CLI yet.

**Interfaces:** Produces `parseManifest(input:unknown): {ok:true; value:ReviewManifest}|{ok:false; errors:string[]}`, `parseReport(input:unknown): {ok:true; value:ReviewReport}|{ok:false; errors:string[]}`, and `createDraft(manifest:ReviewManifest, manifestSha256:string, scope:ReviewScope):ReviewReport`. Parsers enforce only structural/numeric constraints; later validators check file existence and frame upper bounds. Test helpers `makeManifest():ReviewManifest` and `makeReport():ReviewReport` return purely synthetic 60-frame, 30fps data for tests, never disguised as actual review.

- [x] **Step 1 — Write failing tests.** `reject malformed review inputs` asserts `parseReport(x).ok===false` for null, arrays, legacy objects, string evidenceIds, NaN/Infinity, string score “7.5,” and duplicate issue IDs; `draft never claims observation` asserts reviewer.id=null, independent=false, observations.length=0, all seven scores=null, and visual sound state=deferred; manifest tests duplicate evidence IDs and negative bytes.
- [x] **Step 2 — RED.** `npx tsx --test runtime/test/review-schema.test.ts`; expect FAIL from missing modules/exports.

  Core assertions: `assert.equal(parseReport(null).ok, false)`; `assert.equal(createDraft(makeManifest(), 'a'.repeat(64), 'visual').scores['Sound and synchronization'].score, null)`.
- [x] **Step 3 — Implement types, parsers, and draft.** schemaVersion is exactly 2; do not replace unknown validation with type assertions. Return field-path errors rather than throwing for ordinary bad data; do not automatically upgrade legacy formats.
- [x] **Step 4 — GREEN.** `npm run build && npx tsx --test runtime/test/review-schema.test.ts`; expect successful build and all PASS.
- [x] **Step 5 — Commit.** Stage only the four new files above; `git commit -m "feat(review): define versioned review contracts"`.

### Task 2: Explainable Overview Frames and Continuous Windows

**Files:** Create runtime/src/review/sampling.ts, runtime/test/review-sampling.test.ts.

**Interfaces:** Consumes Film, FrameRange, SamplingPlan; produces `planSamples(film:Film, actionRanges:FrameRange[]=[]):SamplingPlan`. Budget constant `MAX_REVIEW_FRAMES=1200`.

- [x] **Step 1 — Write failing tests.** `single frame and end boundary`: N=1 yields frames=[0], windows=[{start:0,end:1}]; `fractional overview`: 30000/1001, N=60, no scenes/markers yields overviewFrames=[0,14,29,44,59]; `overlapping scenes merge dense windows`: 30fps, scenes [0,40), [30,60) merge windows to [0,9), [22,49), [52,60), and every window frame is in frames; `explicit action ranges reject overflow`: [58,61) throws for N=60; `budget never silently thins`: explicit [0,1201) with N=1201 throws an error mentioning the 1200 budget.
- [x] **Step 2 — RED.** `npx tsx --test runtime/test/review-sampling.test.ts`; expect missing-module FAIL.

  Core assertion: `assert.deepEqual(planSamples({...makeManifest().film, durationInFrames:1, scenes:[], markers:{}}).frames, [0])`.
- [x] **Step 3 — Implement planSamples.** Use the spec's integer-ratio formulas; each boundary b has window `[max(0,b-r),min(N,b+r+1))`, so b=N retains the ending without sampling frame N. Merge adjacent/overlapping intervals, include first/last frames in overviewFrames, and budget after deduplication.
- [x] **Step 4 — GREEN.** `npm run build && npx tsx --test runtime/test/review-sampling.test.ts`; expect all PASS.
- [x] **Step 5 — Commit.** Stage both files; `git commit -m "feat(review): sample transitions and action windows"`.

### Task 3: Local Evidence Packs That Preserve History

**Files:** Create runtime/src/review/files.ts, pack.ts, runtime/test/review-pack.test.ts; extend fixture helpers as needed.

**Interfaces:** Consumes Tasks 1–2, FilmServer, openCapture(server), inspect(file), contentVersion(project). Produces `sha256File(file:string):Promise<string>`, `runtimeFingerprint():Promise<string>`, `verifyEvidence(directory:string, files:Evidence[]):Promise<string[]>`, `buildReviewPack(server:FilmServer, parent:string, options:PackOptions={}, limits:{maxBytes:number}={maxBytes:2*1024**3}):Promise<PackResult>`. Shared in files.ts: `resolveEvidencePath(directory:string, relativePath:string):Promise<string>`; in pack.ts: `readReviewContext(project:string):Promise<{context:ReviewContext; missing:string[]}>`. Task 4 integrates playback records; this task's packs may lack playback and remain incomplete.

- [x] **Step 1 — Write failing integration tests.** `pack never overwrites a report`: consecutive same-version packs have different paths, preserving manually edited first-report bytes; `brand Markdown is valid context`: with only sources.md, missingContext excludes brand; `source output path rejected`: parent=project/records/review throws without changing contentVersion; `escape and symlink rejected`: configured `../secret.md` and links outside the project both fail; `interrupted pack remains unpublished`: an already-canceled signal produces no successful directory and preserves existing-pack bytes; `captures actual MP4`: build from a test-generated six-frame MP4, obtaining frame evidence from decoded output, matching target/source SHA, leaving source unchanged, and never calling render.
- [x] **Step 2 — RED.** `npx tsx --test runtime/test/review-pack.test.ts`; expect missing-module FAIL.

  After the fixture prepares server and parent: `assert.notEqual((await buildReviewPack(server, parent)).directory, (await buildReviewPack(server, parent)).directory)`.
- [x] **Step 3 — Implement files.ts.** Stream SHA with Node; runtimeHash includes installed-package dist/web relative paths and content. verifyEvidence returns missing-file/hash/byte/illegal-path errors; use realpath for directory boundaries and reject indexed-file or parent-path symlink escapes. Do not describe hashes as authenticity signatures.
- [x] **Step 4 — Implement pack.ts.** Use mkdtemp temporary packs, random UUID success directories, and failure cleanup in finally; account for the 2 GiB budget before/after writes, cutting off over-budget FFmpeg pipe output rather than filling disk first. Preview reuses openCapture; MP4 uses ffprobe and sequential frame-number decoding, validates CFR/frame count/dimensions/fps, and selects original frames according to the plan without approximate seeking. Extract only images/mix from the specified existing MP4; do not package a new video. Check source-content/runtime or MP4 hashes at start/end; copy context into the pack. Reports cite the manifest file hash and leave scores empty. Initially handoff contains local file locations and capability limits; Task 6 adds complete review guidance.
- [x] **Step 5 — Add and run budget/change-interruption tests.** `byte budget cleanup` injects a small internal-test budget to trigger real output overflow, asserting no successful or temporary pack remains. The fourth limits parameter is for module testing only and must be a positive safe integer; CLI stays fixed at 2 GiB without a budget flag. `source changed during capture` edits film.tsx before frame two and asserts failure; `modified evidence detected` changes a PNG and asserts nonempty verifyEvidence results.
- [x] **Step 6 — GREEN.** `npm run build && npx tsx --test runtime/test/review-pack.test.ts`; expect all PASS.
- [x] **Step 7 — Commit.** Stage this task's source/tests; `git commit -m "feat(review): build immutable local evidence bundles"`.

### Task 4: Operational Evidence of Actual Background Playback

**Files:** Create runtime/src/review/playback.ts, runtime/test/review-playback.test.ts; modify review/pack.ts.

**Interfaces:** Consumes FilmServer, PlaybackTrace; produces `recordPlayback(server:FilmServer, signal?:AbortSignal):Promise<PlaybackTrace>`. Operational failure returns completed=false + errors; cancellation throws AbortError. pack indexes the trace as kind=playback without discarding other useful evidence if it fails.

- [x] **Step 1 — Write failing tests.** `real playback reaches final frame` asserts completed=true, first sample frame=0, last sample frame=59 and playing=false for a 60-frame/30fps project; `playback failure is not observation` injects page errors/early pause and asserts completed=false, nonempty errors, and draft.observations still empty; `cancel closes browser` asserts rejection and closed browser/page after cancellation. Inject early pauses through Playwright route with known test scripts, not an arbitrary page callback in the production API.
- [x] **Step 2 — RED.** `npx tsx --test runtime/test/review-playback.test.ts`; expect missing-module FAIL.

  For a normal 60-frame fixture: `const trace=await recordPlayback(server); assert.equal(trace.completed,true); assert.equal(trace.samples.at(-1)?.frame,59)`.
- [x] **Step 3 — Implement recordPlayback and integrate preview packs.** Use an independent headless page, existing #play and __LVM__.state(), and 100ms sampling; wait for explicit ready, capture frame-0 state, then play with the specified timeout. Check server.assertVersion, record pageerror, failed requests, and HTTP>=400; close the browser in finally. Temporary buffering must not be mistaken for completion; only natural stopping on the last frame is completed. MP4 packs do not run this Player check or fabricate an equivalent trace.
- [x] **Step 4 — GREEN.** `npm run build && npx tsx --test runtime/test/review-playback.test.ts runtime/test/review-pack.test.ts`; expect all PASS, indexed playback hashes, and nobody automatically marked as having watched.
- [x] **Step 5 — Commit.** Stage the three files; `git commit -m "feat(review): record actual preview playback evidence"`.

### Task 5: Evidence Gates, Scoped Outcomes, and Item-by-Item Retests

**Files:** Create runtime/src/review/check.ts, runtime/test/review-check.test.ts; modify review/pack.ts, review-fixtures.ts.

**Interfaces:** Consumes Tasks 1–4; produces `checkReview(reportPath:string, current:{version:string; runtimeHash:string}):Promise<ReviewResult>`. Report and manifest are in the same pack; read previous through manifest-declared history entries rather than trusting another report-supplied path. Test helper `writeReviewFixture(dir:string):Promise<{reportPath:string}>` creates only known synthetic evidence/declarations for gate testing.

- [x] **Step 1 — Write failing tests.** `visual pass is never commercial pass` asserts scopeStatus=passed, commercialStatus=incomplete for complete synthetic visual reports; `7.49 does not round to pass` asserts failed; `missing observation stays incomplete` removes continuous-playback or sets continuousVisual=false, remaining incomplete even with trace.completed=true; `legacy or malformed never crashes` returns incomplete and reasons for legacy, null, and bad JSON; `wrong binding rejects` changes any manifest/PNG/runtimeHash/MP4 binding and expects incomplete.
- [x] **Step 2 — RED.** `npx tsx --test runtime/test/review-check.test.ts`; expect missing-module FAIL.

  For a complete visual fixture (current matches its target): `const result=await checkReview(reportPath,current); assert.equal(result.scopeStatus,'passed'); assert.equal(result.commercialStatus,'incomplete')`.
- [x] **Step 3 — Implement checkReview.** Parse in spec order, require nonempty reviewer.id and independent=true, then verify current version/runtime/MP4, manifest hash, file index, context omissions, frame ranges, scene references, observation coverage, scores, and issues. sequence must belong to a complete sampled window; continuous-playback covers [0,N), includes specific method/notes, and cites current frame evidence; preview additionally requires a successful trace. audiovisual also requires audio capability and full-film listening observations citing the current mix; visual sound permits only deferred/null. Every dimension needs its own reason and valid evidenceIds. Preserve the statement that tools cannot certify capability declarations.
- [x] **Step 4 — Implement previous copying and new-report initialization.** buildReviewPack reads the old report and colocated manifest, validates structure/manifest hash first, and rejects inheritance across preview/mp4 target kinds; copy as history entries. The new report inherits only issue IDs, severity, descriptions/fix targets, resets state to open, and clears old evidenceIds. Out-of-duration ranges become range=null, sceneId=null for reviewer relocation; check returns incomplete instead of silently clipping old issues. Clear all scores/observations.
- [x] **Step 5 — Write and run failing retest cases.** `deleted blocker fails retest`: delete an old ID → incomplete; `lower severity cannot erase blocker`: change blocking to advisory → incomplete; `history evidence cannot close current issue`: cite only history → incomplete; `independent current evidence closes issue`: pass only with same ID, current evidence, resolution, and complete new observations; `new round clears ratings`: new-pack scores=null and observations empty. Initial-report resolved/not-reproduced also returns incomplete.
- [x] **Step 6 — GREEN.** `npm run build && npx tsx --test runtime/test/review-check.test.ts runtime/test/review-pack.test.ts`; expect all PASS.
- [x] **Step 7 — Commit.** Stage task files; `git commit -m "feat(review): enforce scoped evidence and retest gates"`.

### Task 6: CLI and Independent Subagent Handoff

**Files:** Modify runtime/src/cli.ts, runtime/src/tools.ts, runtime/test/tools.test.ts, review/pack.ts, references/review.md, references/runtime-usage.md, references/pipeline.md, SKILL.md, README.md; create references/reviewer-prompt.md, runtime/test/review-cli.test.ts.

**Interfaces:** CLI `review-pack <directory> [--scope visual|audiovisual] [--mp4 <existing-file>] [--previous <report.json>]` outputs PackResult; `review-check <report.json>` outputs ReviewResult, exiting 0 for current-scope passed, 1 for failed, 2 for incomplete, always including commercialStatus in JSON. Check with current project contentVersion/runtimeFingerprint without starting Vite or prepare. Old commands still run without extra flags, but new packs default to visual and use unique child directories; remove unpublished old validateReview/reviewPack functions rather than retain an entry that can falsely pass.

- [x] **Step 1 — Write failing CLI tests.** `default pack is visual and unscored` runs CLI and checks new-pack draft; `check exit codes are scoped` checks 0/1/2 and commercialStatus for three fixtures; `unknown scope and missing values fail` expects nonzero for `--scope foo` and valueless `--mp4`; `check has no browser or preparation side effect` checks a fixture without runnable film but with computable hash, creating no Vite/mix cache or browser; `existing MP4 only` fails for missing files without creating video output.
- [x] **Step 2 — RED.** `npm run build && npx tsx --test runtime/test/review-cli.test.ts`; expect FAIL because old CLI lacks flags/new structure.

  After collecting CLI exit code/stdout via Node spawn: `assert.equal(exitCode,0); assert.equal(JSON.parse(stdout).commercialStatus,'incomplete')`, only for a fully populated visual fixture.
- [x] **Step 3 — Wire CLI and move old logic.** Parse known flags precisely and reject duplicate/unknown values; place check before startServer and distinguish operational errors from evaluation results. Retain capture/analyzeAudio tests in tools tests, moving review tests into new files. Pack handoff lists target, capability boundaries, context/evidence entry points, report path, and review-check command without expected scores.
- [x] **Step 4 — Write reviewer-prompt and align standards.** Fixed sequence: capabilities → requirements/brand/direction → stills/continuous windows → actual motion viewing (declare only if possible) → six- or seven-dimension evidence scores → issues → retest. Give localizable issue examples, never “default score 8.” Instruct the main agent to use a fresh-context independent subagent; CLI does not dispatch models itself. SKILL retains seven-dimension commercial thresholds and default pending-review state, explaining separate visual review; README describes current capabilities/limits. Remove implications that “setting true completes evaluation.” Do not modify new template-agent content.
- [x] **Step 5 — GREEN.** `npm run build && npx tsx --test runtime/test/review-cli.test.ts runtime/test/tools.test.ts`; expect all PASS. Manually compare each item against the spec so documents never present scoped exit0 as commercial acceptance.
- [x] **Step 6 — Commit.** Stage listed files individually; `git commit -m "feat(review): expose scoped review workflow and reviewer handoff"`.

### Task 7: Standalone Installation and Fix/Retest Acceptance

**Files:** Modify runtime/test/portability.test.ts, runtime/test/review-cli.test.ts, docs/validation.md; put necessary dedicated test builders in review-fixtures.ts. No new templates or product films.

**Interfaces:** Consumes all new CLI, initProject, and the existing vendor installation path; no new production interfaces.

- [x] **Step 1 — Add end-to-end tests.** `review survives project move and isolated install` relocates a generated project, installs only through vendor, runs review-pack, and verifies readable relative evidence with no source-repository path dependency. `review repair loop` generates a test-fixture pack with a known boundary defect and a synthetic blocking report, fixes source → new --previous pack → verifies old scores are not inherited, deleted IDs fail, and new-evidence retests can satisfy scope gates. Assert no full-film MP4 appears anywhere in the flow; a separate existing-MP4 test uses only temporary test encoding and requires incomplete after tampering.
- [x] **Step 2 — Run targeted tests.** `npm run build && npx tsx --test --test-concurrency=1 runtime/test/review-cli.test.ts runtime/test/portability.test.ts`; record FAIL first if packaging omissions, absolute paths, or mixed versions emerge. Do not deliberately break implementation just to manufacture RED for a validation-only task.

  Relocated-project pack: `assert.deepEqual(await verifyEvidence(bundle.directory, manifest.files), [])`; post-fix draft: `assert.equal(report.scores['Motion craft'].score,null); assert.equal(report.observations.length,0)`.
- [x] **Step 3 — Fix actual failures.** Change only the responsible module, with a regression that reproduces the issue; do not use this to refactor Player, audio, or templates.
- [x] **Step 4 — Complete validation.** `npm run build && npm test`, all required cases PASS; existing explicit opt-in long-film tests may remain skipped. If renderer/audio/synchronization logic changes, additionally run `npm run test:long`; otherwise do not claim a rerun. Inspect git diff to ensure no template, style, or other-agent files are staged.
- [x] **Step 5 — Rehearse independent review workflow.** A fresh-context reviewer follows the new prompt on a technical fixture, declaring actual available capabilities; if continuous motion viewing is unavailable, retain incomplete to demonstrate honest limits. Synthetic scores in automated tests are not this review's results. If the user's selected execution method includes final independent code review, complete it here and fix substantive findings.
- [x] **Step 6 — Update acceptance records.** docs/validation.md records actual commands, test counts, audiovisual capability limits, and the distinction between gate tests and genuine review; completion does not rewrite the three old films' commercial status. List curated BGM/SFX as follow-up; product production awaits ready templates.
- [x] **Step 7 — Commit.** Stage task tests, actual fixes, and acceptance documents; `git commit -m "test(review): validate portable evidence and repair workflow"`. No automatic push.

## Self-Check Results and Execution Handoff

- Coverage: scope/contracts → Task 1; sampling → 2; context/files/MP4 → 3; background playback → 4; gates/retests → 5; independent review protocol → 6; standalone installation/closed loop → 7.
- Types: all tasks use the same Scope/Target/Range/Evidence fields; scopeStatus and commercialStatus never collapse into one passed value.
- All five Review Focus categories have assigned tests; “tool ran successfully” is not evidence of independent viewing or commercial quality.
- Deliberately excluded: listening models, automatic aesthetic scores, BGM/SFX packs, template/style creation, new editors, internal full-film video export, automatic film-content fixes, and automatic external-model dispatch.
- Native sequential implementation began under user authorization; completion is recorded in docs/validation.md. Execution rationale: shared manifest/evidence/retest interfaces are tightly coupled, so unified implementation better preserves consistency, followed by independent code review.
