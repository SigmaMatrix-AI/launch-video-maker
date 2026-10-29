# Website Research, Rhythm, and Text Expression: Implementation Validation

Status: implementation and local behavioral/technical checks are complete; **normal-speed impressions, sound, and actual transfer effects remain unverified**. Implementation was first retained on `codex/three-stage-skill-plan` for local review; the user subsequently explicitly authorized commit and push. This commit excludes the local Control rename, generated media, and styles added by other tasks.

## Version and Scope

- Worktree: `/Users/mac/.codex/worktrees/three-stage-skill-plan/launch-video-maker`.
- Base HEAD: `10c34014b4ff469d98ac4a31c90e65234cf08b5e`; preserve the existing `launch-video-maker-control` name/title.
- Original rules and hashes: [baseline/manifest.json](../../films/research-motion-language-validation/baseline/manifest.json). New hashes are in local `implementation-manifest.json`; environment: Node 24.17.0.
- Changes cover skill guidance, 5 method-case pairs, the generator, website fixture, and validation documents. Runtime core, review schema, dependencies, and seven-dimension thresholds are unchanged.
- The installed control skill points at this worktree, so rule changes affect subsequent control tasks; installation links and the original repository were not modified.

## Behavioral Observations

Test agents read original/new rules from isolated contexts, receiving only the task and site URL, without fixture source, validation criteria, or the other agent's answers. Raw records: [baseline-response](../../films/research-motion-language-validation/baseline-response.md), [updated-response](../../films/research-motion-language-validation/updated-response.md), and their evidence directories. The site is a fictional research fixture, not a product case.

| Scenario | Actual observation | Conclusion scope |
| --- | --- | --- |
| B01 Formal research | Both versions inspected content below the homepage hero, feature/case pages, summary/source states, and the delayed permissions block; the new version saved 10 screenshots and 6 page-text files and visited the 404 only once | The new version meets requirements; **the old version also browsed thoroughly, so the small fixture did not reproduce stopping at the hero and cannot establish improved reliability** |
| B02 Restricted scope | The new version actually recorded the workspace 404; short responses respected supplied-material-only restrictions and recorded uncovered areas | No invented real interactions; the restricted-material branch is response-level evidence |
| B03 Feature tour | The new version preserved “Search → Summarize → Share,” without requiring a character subplot | Feature-name structure is valid; one example supports concrete demonstration rather than mandatory story form |
| B04 Stages/authorization | Story stage supplies only script, sketches, and approximate durations; a separate delegated scenario explicitly chooses direction/story and continues | No advance motion gate; this test did not actually produce a full film |
| B05 Semantic text | Gather stays intact; phrase grouping lands emphasis on “key points,” distinguishing shot duration from product performance | Behavioral explanation complies; timing choices were not presented as accepted readability |
| B06 Strict template | Preserve agreed layout/timing; reduce information within constraints or identify conflicts | Response-level observation; the template was not remade |
| B07 Legacy records | Response requires merging reference while preserving actionRanges; separately verified with actual readReviewContext | Old configuration remains readable; merge new records once present without inventing historical approval |
| B08 Evidence gaps | Stills/logs establish only corresponding technical facts; full dynamics and sound stay unverified | No self-reported “premium feel passed” |

The fixture initially had a string-escaping error; after fixing it, the original-version test agent reloaded, clicked, and verified both states and the delayed block. This was a fixture defect, not a skill failure. The new version corrected one out-of-bounds scroll coordinate without affecting final coverage.

## Technical Validation and Image Inspection

| Check | Result |
| --- | --- |
| `npm run build` | Passed; runtime core unchanged afterward |
| `npx tsx --test --test-concurrency=1 runtime/test/motion-studies.test.ts` | 5/5 passed, 0 skipped; covers unknown inputs creating no directory, existing directories not overwritten, standalone operation with runtime copied outside the repository, random/reverse frame access for 5 pairs × 2 versions, final text, and stable reading frames |
| Case-generator TypeScript check | `npx tsc --noEmit --jsx react-jsx --module NodeNext --moduleResolution NodeNext --target ES2023 --skipLibCheck --strict --types node examples/motion-language/create-study.ts` passed |
| review-pack / review-schema / review-check | 20/20 passed, 0 skipped |
| Context-merge smoke | Actually called readReviewContext; retained notes, default brief/direction/storyboard, and `[30,45)`; added script/research after creation |
| Font | Local Noto Sans SC 700 subset, 44,220 bytes; provenance, SHA, and OFL saved alongside the asset; requested glyphs and all 58 Chinese/punctuation glyphs actually used by cases/mixed text are in cmap |
| Five sets of keyframes | Inspected each set; no obvious missing glyphs, final clipping, or T04 query-object ghosting. Mask clipping during T02 scrolling is intentional motion; the final longest word is complete |
| Mixed-text probe | An isolated copy additionally used “Gather's 12 source materials, / become / 3 key points.” to check brand/number-unit grouping and final layout; not a product-capability claim |
| Document links / worktree | 79 local links exist; git diff --check passed; staging empty, HEAD unchanged |
| Normal speed / hearing | **Unverified**; screenshots and PNG equality cannot establish breathing room, naturalness, or sound synchronization |

RED records precede implementation: the generator module was initially missing; before adding text cases, the directory matrix lacked T01–T04. After GREEN, full runtime checks were not repeated merely to accumulate tests. Detailed logs are in `.superpowers/sdd/2026-10-28-research-motion-language/`.

## Transfer Preparation for Two Real Demos

Original projects are read-only. Copies and film.tsx SHA values are in [real-demos/manifest.json](../../films/research-motion-language-validation/real-demos/manifest.json); each demo has baseline, timing-only rhythm, and combined timing-plus-text versions. Copies use the **currently available versions**, not confirmed versions from the initial feedback; modifications from other tasks cannot be counted as this round's gains.

| Demo | Source and website check | Local comparison |
| --- | --- | --- |
| Canva | Source task “Create a Canva launch promo”; original project `/Users/mac/Documents/Codex/2026-10-28/launch-video-maker-canva-https-www/outputs/canva-film`. Existing records already contain official feature evidence; this round rechecked page text for [Magic Layers](https://www.canva.com/magic-layers/) / [Magic Resize](https://www.canva.com/pro/magic-resize/) | “One idea. Every format.” at 16–19s, preserving surrounding product scenes; timing version changes only this passage's time mapping, then text version reveals Every / format in groups |
| CuFlow | Source task “Create a Cuflow launch video”; original project `/Users/mac/Documents/Codex/2026-10-28/launch-video-maker-control-users-mac/outputs/cuflow-film`. This round rechecked [official site](https://www.cuflow.ai/) text; existing brief already covers Tutor/FlowNote and material organization, and the current project includes later illustration iterations | Opening at 0–3s and following document scene; timing version changes only internal opening progression, then text version reduces introductory emphasis after the key point appears |

Website checks this round compared page text with existing records rather than repeating comprehensive real-site interaction capture. There is no evidence that the new rules found previously omitted usable assets in these two current versions; improved asset selection is not claimed.

All three versions preserve script, assets, direction, total frame count, and soundtrack; local changes appear in each copy's `migration-study.md`. Seams and keyframes were inspected: Canva grouping changes are visible at 16.83s; CuFlow shifts emphasis to line two after about 1.33s. Timing-only differences are small, **insufficient for judging naturalness from stills**. An unchanged soundtrack does not establish audiovisual synchronization; independent normal-speed comparison and listening remain incomplete. No user MP4 was exported this round.

## Local Review Entry Points

- [Motion guide](../../references/motion-language.md), [product research guide](../../references/product-research.md), [case source and run commands](../../examples/motion-language/README.md).
- All local preview URLs, project paths, versions, and sampled frames: [preview-manifest.json](../../films/research-motion-language-validation/preview-manifest.json). Restart ended preview processes following the case instructions.
- Keyframe collections are in `films/research-motion-language-validation/contact/`; they help inspect layouts but cannot replace normal-speed playback.
- Independent code review: complete; Critical 0, Important 0, Minor 1, ready for local review. The minor issue is that `runtime/test/motion-studies.test.ts` does not directly assert text fits its mask container on the longest word's settled frame. Current source/keyframes show no clipping, but future narrowing may evade detection. Recorded for follow-up under this round's review process without expanding implementation scope. This does not replace audiovisual acceptance.

Cost record: 3 main original-version scenarios, the same new-version scenarios plus 6 short boundary responses; 10 method-comparison projects, 1 mixed-text probe, 6 real-demo copies; 92 main preview keyframes saved plus 4 mixed-text frames. No new full-film video generated; token usage unavailable, so no savings percentage inferred.

Remaining acceptance: compare the 5 case pairs at normal speed; blind-view adjacent passages from both real demos and listen; if needed, revise locally and review again. Implementation is reviewable, but actual transfer completion or an “expensive” feel cannot yet be claimed.

## Implementation Tradeoffs

- At the user's request, planned commits became local checkpoints retaining worktree, evidence, and ledger; there is no Git commit backup, so avoid cleaning uncommitted files afterward.
- Reused the existing isolated worktree and dependencies, running only relevant technical validation; did not recertify every unchanged runtime capability, and full-runtime/export conclusions are outside this result.
- The old version performed well on the small fixture, while current real demos include other tasks' iterations; no fix rate, real-site research reliability, or finish improvement is claimed. These benefits still need actual-use validation.
- Subsequent feedback preserves useful fast/constant-speed motion, mainly improving arrangement, landing points, and reading windows—not slowing everything uniformly or forbidding a curve.
- This round's tool evidence cannot certify continuous audiovisual perception; related acceptance remains incomplete, and unobserved rhythm, reading-comfort, or audiovisual synchronization issues may remain. An unchanged soundtrack does not eliminate this risk.

## Fix for Duplicate Local Skill Entry

The test baseline was saved in a subdirectory of the installed control skill as `baseline/SKILL.md`, causing discovery as another same-name entry. This was an oversight when saving the snapshot. It is now renamed `baseline/skill-baseline.md`, with manifest paths updated and original SHA-256 preserved; historical behavioral reports are unchanged. Verified that only the root SKILL.md with `name: launch-video-maker-control` remains under that installation directory; official skill content is unchanged. Immediate refresh of the app's candidate list was not verified through the UI.
