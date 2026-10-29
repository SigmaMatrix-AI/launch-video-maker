# Three-Stage Skill Validation Record

Status: implementation and validation within this round's scope are complete; full normal-speed perceptual viewing remains unverified. Tests use `codex/three-stage-skill-plan`, starting at `b7b61fc`; the original installation was not switched. See [fixed inputs and assessment](three-stage-skill-scenarios.md). All approvals are simulated and were not entered into real films.

## Old-Version Behavioral Baseline

On 2026-10-28, independent fresh-context agent `/root/baseline_behavior` read the working-directory snapshot from planning, without new rules, design documents, or expected answers. It separately answered nine independent inputs within one call (S5 has two variants). This tests short decision responses, not end-to-end production.

| Scenario | Assessment | Actual response evidence and meaning |
| --- | --- | --- |
| S1 | fail | “Then develop a complete draft of approximately 25 seconds, without waiting for direction or script confirmation.” No three-direction choice was produced. |
| S2 | fail | “Do not stop because the story is unconfirmed.” Delivered a playable full-film draft; story and production were not yet separated. |
| S3 | pass | Autonomously completed direction, story, and full film without repeated confirmation or claiming the user personally selected it. |
| S4 | partial | Proposed focus handoffs, language labels, and result holds, but did not require independent promotional text shots; this does not establish that an incorrect layout was generated. |
| S5a | pass | Tightened only the 8–10-second button, preserving direction/script, reviewing seams, and updating evidence. |
| S5b | partial | Explicit that local revision is not full-film acceptance; no fabricated confirmation, but no explicit record of missing direction/story approval. |
| S6 | pass | Preserved headline-and-image layout, shot duration, and agreed arrangement; readability conflicts explained separately. |
| S7 | pass | “We cannot yet claim a complete pass… sampled stills and technical logs have not verified continuous action and actual sound.” |
| S8 | pass | Explicitly reported unreadable originals, used notes only as motion ideas pending verification, and continued reference-independent work. |

Address actual gaps: replace S1/S2 with clearly conditional stage contracts; add E10 and actionable text-shot examples for S4; record confirmation status and local authorization for S5b. S3/S5a/S6/S7/S8 are regression behaviors to preserve, not invented old-version failures.

Complete raw responses are in local ignored experiment directory `films/three-stage-proof/validation/baseline-responses.md`, not portable repository evidence; the table retains reviewable actual quotations. The test agent generated no media and inspected no real user film.

## New-Version Retest

Stage retest agent `/root/stage_behavior` used identical inputs and read only the new entry/workflow/deliverable/template documents, without expected answers. S1/S2/S3/S5a/S5b/S6 all passed: S1 explicitly stated “three styleframes… this round stops at stage one”; S2 marked “script awaiting confirmation” and delivered low-fidelity storyboards; S3 continued under delegated authorization, marking choices as agent decisions; S5a changed only the button; S5b stated “this local revision does not require filling approval gaps first, nor does it authorize further full-film development”; S6 retained specified template layout and duration.

The single retest showed no ambiguous stage-boundary behavior, so it did not trigger five old/new wording microtests each; this does not establish stability across runs. Raw responses are in ignored `films/three-stage-proof/validation/stage-responses.md`. Final behavioral agent `/root/final_behavior` read all relevant new documents and the same scenarios, without expected answers. S1/S2/S3/S4/S5a/S5b/S6/S7/S8 all passed (actual responses manually read individually):

| Scenario | Observable new-version behavior |
| --- | --- |
| S1 | Three directions, same content, stop at selection; explicitly no development of three films. |
| S2 | Deliver script and rough storyboard pending content confirmation, without motion samples or frame-level timing. |
| S3 | Choose/decide under recorded authorization, continue production, and do not export MP4 without permission. |
| S4 | Independent text emphasizes “one/many,” then enters UI, retaining necessary labels and result holds. |
| S5a | Locate the button with E06, make a local edit, and check seams/sound without reopening the story. |
| S5b | “An initial draft exists; direction/script confirmation evidence is missing; only the button edit is authorized this round,” while proceeding with local work. |
| S6 | Retain the template's headline-and-image layout, actions, and durations without imposing three stages. |
| S7 | Insufficient evidence for either “overall pass” or “expensive”; list actual gaps. |
| S8 | Use sourced written notes, mark unseen material unverified, and continue current-stage deliverables. |

Raw responses are in ignored `films/three-stage-proof/validation/final-responses.md`. This is one response per scenario, with independent inputs in a single call, not nine independent end-to-end productions; passing counts cannot estimate real production success rates.

## Reference Case Checks

Re-viewed four 4 fps sequences and extracted 16 frames again from original MP4s: LangEase at 10.25/11.25/12.5/13.25 and 15.25/16.75/17.75/18.75 seconds; Vids at 10.75/12.5/13.5/15.5 and 56.5/58.5/59.5/61 seconds. Visually checked the four sets' ending frames and temporal samples, supporting descriptions of progress completion, selected-card continuity, a request becoming an outline, and an asset entering the canvas.

No complete normal-speed viewing or listening to the references occurred; subtle easing, audiovisual synchronization, and full rhythm remain uncertified, and references have no preassigned scores. New sampled frames are in ignored `films/three-stage-proof/validation/reference-frames/`; originals remain only in the user's Downloads and were not copied into the repository.

## Technical and Visual Validation

Environment: Node 24.17.0, Playwright 1.64.1, Chromium 156.0.8078.4, FFmpeg/ffprobe 8.1.2, darwin/arm64. `npm ci` and initial `npm run build` passed. The record-integration smoke check actually called `readReviewContext(project)`: legacy projects without script retained default records; new configuration merged script and existing notes alongside brief/direction/storyboard/brand; `actionRanges: [{start:30,end:45}]` retained its on-disk value. Passed.

After editing handoff, `npm run build` passed again; `npx tsx --test --test-concurrency=1 runtime/test/review-pack.test.ts runtime/test/review-schema.test.ts runtime/test/review-check.test.ts` passed 20/20 with 0 skipped. Scope was relevant review regressions only, not full runtime reacceptance.

All 35 relative links/anchors in 7 active documents resolve, and code fences balance. `quick_validate.py` initially could not run because system Python lacked PyYAML; after installation in an ignored independent venv it returned `Skill is valid!`. System Python was not modified and no project dependency was added.

## Short Visual Comparison: Local Principle Validation

Local projects `films/three-stage-proof/good/` and `bad/` are both 1920×1080, 30 fps, 270 frames (9 seconds), using fictional Feedback Flow, identical feedback/results, colors, and fonts, with no sound or user MP4 export. Simulated direction/story confirmations appear only in these explicitly fictional test projects. Topic: “Turn scattered customer feedback into a prioritized list,” not proof of real product operation or performance.

| Comparison | Current content version | Local preview |
| --- | --- | --- |
| Good | `0663d55e83f7a36eb35d9e5ef95c3b8be73c979140db0eea748d39e03468392b` | http://127.0.0.1:56758 |
| Bad | `eff6c8c524ef09e6237ebba8694bcf32fb5822dec122b6b97fbd59c697be30f9` | http://127.0.0.1:52983 |

Preview services require running local processes; these ports were actual addresses for this run, and restarts require reading new addresses. Generated projects and media are Git-ignored and undeployed.

Actual checks: each version captured 18 overview frames and 31 continuous frames in the merge window `[132,163)`. Playwright drove Player from the start to frame 269 and stopped, without page/resource errors; current Good took 9114 ms and Bad 9147 ms. This establishes technical playback only, not normal-speed visual viewing.

The author visually inspected overviews, merge-window samples, and key images: Good opens with independent text, keyword highlights, and underline changes; #17 remains the main card, #23 merges, #31 becomes the second item, and the result holds. Bad has a left title/right list and replaces everything with the result at frame 135. E10 composition differences and E02 object paths have visual evidence.

Initial sampling found overlapping source/target card text at Good frame 159, with completion copy appearing too early. One local revision made source text exit first and target text change later, displaying “Merging” during movement. Recaptured the current Good version and rechecked the window; observed text overlap was eliminated, while Bad was not remade. The fixed sample does not claim complete authenticity evaluation of all product operations.

Evidence: `films/three-stage-proof/evidence/capture-report.json`, `good-contact.jpg`, `bad-contact.jpg`, `good-merge.jpg`, and raw PNGs in `good/` and `bad/`. No full-film normal-speed perceptual viewing or listening evidence exists; silence is a test condition, not a pass for “Sound and synchronization.” No high seven-dimension scores were entered, and review-check was not invoked to pass off a local test as full commercial acceptance.

Independent reviewer `/root/independent_review` viewed both overviews, merge windows, and full-resolution keyframes before reading production source/author notes. It found no substantive issues requiring fixes; E10 composition differences and E02 sampled object relationships were supported, and source text exited before overlap. It also read actual scenario responses, regression logs, and context-integration records without rerunning the full runtime suite. The complete raw report is local at `films/three-stage-proof/validation/independent-review.md`.

Explicit review limits: no normal-speed perceptual viewing, so full reading windows, fine easing, continuous tracking, and all seams cannot be certified; silent fictional samples do not establish sound synchronization, real product facts, MP4 output, or commercial quality; neither full reference was independently re-viewed; short scenarios do not establish multi-turn stability, user satisfaction, or token savings. All remain unverified rather than replaced with scores.

## Implementation Decisions and Retained Scope

- This round's “implement the plan” authorization covers planned documentation, validation, and local commits; planning-era “not implemented” tense was updated, without extending to installation switching, publishing, or merging.
- Documentation is validated through old/new behavioral responses; the runtime-layer change is only one handoff line, with planned related regressions. No mirrored text-string tests were added or complete runtime regression pass claimed. Uncovered risks retain their original acceptance scope.
- The independent reviewer and author have only sampled visual evidence. Retain local comparisons for user playback; do not call the sample a commercial-quality pass. Actual finished-film quality and usage benefits still require real projects.
- The installed entry still points at the original working directory; hashes of its six input documents match the planning snapshot. Delivery is on the worktree's local branch and does not automatically affect the installed skill.

## Cost and Limitations

No reliable token-usage data exists for this round, so no savings percentage is given. The baseline produced only text responses, not three complete films. This round generated two 9-second comparisons and one local Good revision. Only the affected version was resampled; no repeated full-film rendering or user-film export occurred. Without an end-to-end old/new token comparison, stable reference-quality full films are not established.

Wall-clock time from local-comparison creation to completed records was approximately 9.7 minutes, including capture, local revision, and waiting for independent review; this is neither pure generation time nor an old/new efficiency comparison.
