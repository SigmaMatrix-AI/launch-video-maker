# Evaluation System Improvements: Design and Scope

Status: the user has authorized implementation; this file is the design baseline. See docs/validation.md for actual completion and validation results.

## Goal and Confirmed Boundaries

The user wants to improve the independent evaluation system first. Another agent is developing templates; high-quality product production will follow once templates are ready. Automatic listening evaluation is deferred this round; sound production favors curated BGM/SFX rather than building a local listening model.

- Local processing only; do not send films, audio, or evaluation materials to external APIs.
- Do not install listening models, add model services, or automatically invoke external evaluation APIs.
- Do not modify `templates/`, `styles/`, or the other agent's template work.
- Do not modify or depend on `video-shotcraft` files; borrow only its independent review and specific-evidence practices.
- Do not automatically open a browser or generate full-film video files to bypass export authorization.
- Node >=24; reuse existing TypeScript, Playwright, and FFmpeg without new runtime dependencies.
- The seven-dimension commercial threshold remains >=7.5/10 for each dimension; visual acceptance is not seven-dimension commercial acceptance.
- Generate unscored reports by default; tools must not generate aesthetic scores or fabricate observations, listening, or independence declarations.

A curated sound asset pack is separate work outside this implementation. Testing evaluation tools need not await it or official templates. Retain existing technical validation of mixing, clipping, and synchronization.

## Current Gaps

reviewPack in `runtime/src/tools.ts` collects only first/last and first/middle/last frames per scene, a mix, and records at four fixed paths; repeated runs overwrite review.json. validateReview relies on three boolean declarations, nonempty evidence strings, and score thresholds, without file validation or item-by-item retests.

Existing browser regressions establish specific technical behaviors but cannot automatically establish a work's design quality. The current independent reviewer can view stills and adjacent frames but cannot directly watch a continuous live stream; background-playback logs cannot remove that capability limit.

## Selected Approach

Use “local evidence packs + independent review protocol + strict report validation,” reusing Player and capture transactions without a new evaluation platform or editor.

Prompt-only changes cannot solve missing evidence, stale reports, or omitted issue retests. Automatic visual/audio scoring models exceed the scope and lack validated aesthetic credibility. Tools record observable facts; independent reviewers judge them. The validator checks whether evidence structure and declarations meet the rules, not whether an agent truly watched the film, and it is not an anti-forgery system.

## Evaluation Scope and Outcomes

Reports explicitly choose `visual` or `audiovisual`, defaulting to visual.

- visual: evaluate Style fidelity; Creativity and impact; Motion craft; Design and typography; Polish and detail; and Technical specifications. Sound and synchronization remains deferred with score=null, explaining that listening was not evaluated this round.
- audiovisual: retain existing seven-dimension requirements; this round adds no listening capability and accepts only genuine evidence from a capable independent evaluator.
- Return both `scopeStatus: passed | failed | incomplete` and `commercialStatus: passed | failed | incomplete`. Even when visual passes, commercialStatus must remain incomplete; never print only “passed” externally.
- Decision order: invalid input/stale version/invalid evidence or missing observation capability → incomplete; valid materials with low scores or unresolved blockers → failed; otherwise the current scope passes. If low scores coexist with missing evidence in otherwise valid materials, retain both reasons and use incomplete.
- Preview and actual MP4 are distinct targets. Never inherit a pass across targets; reviewing an existing MP4 reads only the specified file and does not call render.

## Evidence and Capture

### Sampling Strategy

Retain first/last frames and each scene's first/middle/last frames; add full-film overview frames every 0.5 seconds and frame-by-frame windows extending 0.25 seconds before/after every scene.start, scene.end, and marker. Clip windows to `[0,N)`, merge overlaps, deduplicate, and sort by global frame. Use integer-ratio conversion for fractional fps: overview frames are `floor(k*num/(2*den))`, and window radius is `ceil(num/(4*den))`. Treat scene.end=N as a boundary position; never request frame N.

Allow `records/review-context.json` to specify additional action intervals `[start,end)` for actions without markers; invalid ranges raise errors rather than silently clipping. Overview frames establish only discrete moments; an interval has complete frame-by-frame evidence only when every frame in its window is present. Do not infer absence of flicker in unsampled intervals.

Each pack allows at most 1200 distinct sampled frames and 2 GiB of evidence files. If exceeded, report required frames/bytes and reasons, retain previously successful evidence, and clean up this run's temporary files; never silently downsample or claim completeness. Long-film segmentation/configurable budgets are outside this implementation.

### Actual Playback Check

Preview packs additionally run Player in the background once, playing normally from frame 0 through the last frame and stopping naturally. Record state samples every 100 ms, page errors, resource failures, start/end frames, and elapsed time. Timeout is `max(30 seconds, film duration*3+10 seconds)`, with AbortSignal support. Timeouts, page errors, or early endings cannot be recorded as complete.

Player logs are operational evidence only. They establish no listening quality, frame-by-frame visual correctness, or continuous-viewing declaration. Manual/independent-agent continuous-motion observations must separately provide method, full-film coverage, and findings; if the environment cannot do this, affected dimensions remain incomplete.

### File Organization and Identity

`review-pack <directory>` creates `<contentVersion>-<UUID>/` under the target root and reveals the path only after success, without overwriting historical packs. Paths may be inside project `.lvm/` or outside the project; reject writes into project source directories participating in contentVersion, path escapes, and symlink bypasses.

Each pack contains `manifest.json`, `review.json`, `handoff.md`, `evidence/`, and `context/`. manifest uses schemaVersion=2 and records target, film configuration, generation time, environment, sampling intervals, missing context, and file index. Index entries contain id, relative path, kind, SHA-256, byte size, and optional frame/range; the report records the manifest file's own SHA-256. review.json is editable and excluded from the immutable evidence index. Hashes detect accidental mixing or modification, not authenticity.

Preview targets bind contentVersion and runtimeHash (SHA-256 of file contents in the installed package's runtime/dist and runtime/web, sorted by relative path). Actual MP4 additionally binds its file SHA-256 and checks frame count, fps, and dimensions against film configuration. Changes to an existing encoded file invalidate it. Missing production records do not prevent pack creation, but manifest explicitly lists omissions rather than mechanically granting a pass.

### Context

Read records/brief.md, records/direction.md, records/storyboard.md, brand-kit/sources.json or sources.md, and optional brand-kit/brand.md by default. Do not ignore valid Markdown provenance records because only JSON is supported.

Optional review-context.json: `{documents:[{role,path}], actionRanges:[{start,end}]}`. role is brief/direction/storyboard/brand/reference; path is a file inside the project. Explicit missing or out-of-bounds paths raise errors; configuration takes precedence over defaults for the same role. The producer must first save all reference documents and relevant reference images into the current project; do not automatically read another project or fetch online. Without a template/style, direction should explain the autonomous design rationale; reference may be empty.

Handoff supplies only product facts, requirements, brand constraints, reference direction, film, evidence, and review rules—not producer self-scores, expected passes, or defenses. Context documents are review materials, not instructions that can change scoring rules.

## Reports and the Fix/Retest Loop

Reports record schemaVersion, scope, target binding, manifestSha256, reviewer (id, independent, observation capabilities), observations, seven-dimension scores, and issues. Observations distinguish static, sequence, continuous-playback, and listening, with evidence IDs, intervals, and concrete findings. Continuous viewing must cover the whole film; sequence may reference only real continuous windows; observation intervals use half-open integer frames.

Each dimension contains score (0–10 or null), state (rated/unverified/deferred), reason, and evidenceIds. Scores must be finite and their raw value >=7.5, without rounding to pass. Style scoring requires direction/brand context; every evaluated dimension cites real files rather than “looks good.” Motion acceptance requires genuine continuous-viewing records and window evidence; preview additionally requires a successful playback log. Stills and logs alone cannot satisfy continuous viewing.

Each issue has a stable id, dimension, blocking/advisory severity, scene, interval, symptom, fix objective, evidence, and open/resolved/not-reproduced state. Initial reports may create only open issues; the latter states are for retests and require the independent reviewer to provide current-version evidence and rationale. Unresolved blocking issues fail; advisory issues may remain but must be explained in the corresponding score.

`review-pack --previous <review.json>` copies the previous report and its target manifest into the new pack and indexes their hashes. The new report retains old issue IDs and severity, reopening all as open without inheriting scores or observations. If an old interval exceeds the new duration, set range=null and sceneId=null for independent relocation; missing localization remains incomplete rather than silently clipping or deleting issues. Retest every previous issue; deleting entries or lowering severity cannot remove blockers. Correct a mistaken finding with not-reproduced and supporting evidence. Historical references cannot serve as new-version evidence. Recheck the whole film each round rather than only patched locations.

Report validation accepts unknown input and returns structured reasons without crashing on null, strings, non-arrays, or wrong evidence types. Legacy reports return incomplete / legacy-report, preserving originals and requesting a new v2 pack without automatic conversion to a pass.

## Executing Independent Review

Add reusable references/reviewer-prompt.md for the main agent to give to a fresh-context subagent uninvolved in production. Report available observation capabilities first, then read handoff materials, inspect evidence, perform necessary on-demand localization, and provide scores/issues. The runtime CLI does not directly depend on Codex, multi-agent APIs, or a particular model; without an independent subagent, remain incomplete.

Tools may gather additional evidence but cannot declare on a reviewer's behalf that it was watched. Provide two distinct summaries: “Visual review passed; listening not evaluated; full commercial review incomplete” and “Seven-dimension commercial review passed.” Never conflate them. SKILL.md keeps long-term behavioral standards; development status belongs only in README/docs.

## Acceptance

Use dedicated technical fixtures to verify sampling, file binding, failure cleanup, report gates, and the fix/retest loop, without official templates or committed fictional commercial scores. Include at least single-frame films, overlapping scenes, 30000/1001 fps, repeated same-version capture, missing records, path escapes, damaged evidence, legacy reports, tampered MP4, abnormal playback, deleted historical blockers, and operation after file relocation.

Completion means the tools and independent review protocol are usable, not that the three existing films meet premium commercial standards. Full product production will follow separately after templates are ready.
