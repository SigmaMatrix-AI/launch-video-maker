# Development Acceptance Record

Date: 2026-10-26. Corresponds to the [development plan](plans/2026-10-26-launch-video-maker.md). This record separates technical operation, style validation, and commercial film evaluation; passing tests does not stand in for work quality.

## Current Conclusion

Development implementations and automated technical checks for Tasks 1–5 are complete. Task 6's two style validation projects, TapVid product project, and standalone installation validation are complete; **full commercial audiovisual acceptance remains incomplete; the seven dimensions are not marked passed**. Official `templates/` and `styles/` are empty; films and test fixtures do not enter the reference-template directory.

Default behavior follows the agreement: internal checks use background browsers; no local service was automatically shown; none of the three production projects exported an MP4. Encoding tests use temporary technical fixtures that are cleaned up afterward.

## Reproducible Technical Validation

Prerequisites: install Node, FFmpeg, and Chromium following README, and build the runtime first.

```bash
npm run build
npm test
npm run test:long
```

Local environment: macOS arm64, Node 24.17.0, npm 11.13.0, FFmpeg/ffprobe 8.1.2, Playwright 1.64.1, Chromium revision 1248 / 156.0.8078.4. npm packages and Chromium have pinned versions; FFmpeg is an external tool whose version is retained in doctor/export records.

| Check | Result and evidence scope |
| --- | --- |
| TypeScript build | Passed |
| Default suite | 70 tests: 69 passed, 0 failed, 1 skipped (explicitly enabled long-film test) |
| 60-second encoded synchronization | Separate run passed 1/1; 1800 frames, with known visual flashes and audio pulses at start/middle/end differing by no more than one frame |
| Frame determinism | Random and reverse captures match; out-of-range frames, missing assets, and stale content versions are rejected |
| Readiness and cancellation | Commit only after async drawing/images/fonts finish; preserve the old picture during preparation; stale seek and delayed audio decoding cannot restart old playback |
| Playback synchronization | Preview scheduling error within two frames against the actual audio output clock; simple scenes do not repeatedly restart audio sources; pausing and scrubbing stop residual playback |
| Media | Actual VFR, nonzero source PTS, end policies; animated images rejected; source-asset and production-record changes invalidate the version; decoding budget enforced during writes, with failed caches removed |
| Video prefetch | Prefetch only the next two decoded frames; source code limits speculative image handles to six; current frame still passes decode-readiness checks |
| Audio | Normalize 22.05/44.1 kHz sources to 48 kHz stereo; envelopes, trims, loops, insufficient-duration policies, clipping rejection; 2× speed produces the corresponding pitch change |
| Actual MP4 | 24/60/30000÷1001 fps, portrait, exact frame counts, H264/yuv420p/AAC; failed sidecar leaves no finished film; competing writes do not overwrite existing files |
| Capture and review | High-resolution pages/element positions/provenance, lazy-loaded images; transient candidates; missing evidence, stale versions, low scores, or blockers cannot pass review |
| Standalone installation | Relocate a project, reinstall and capture using only the vendor package and lockfile; additionally complete setup and TapVid capture with an isolated Chromium cache |

The default suite runs test files serially to avoid contention among npm installation, FFmpeg, and browsers. Debugging revealed variable headless-browser audio-device startup latency: 1.1 seconds of wall-clock time does not mean 1.1 seconds of sound has been output. Playback tests therefore check actual device timestamps and audio-source startup counts rather than passing off wall-clock frame counts as audiovisual synchronization. Encoded synchronization has a separate known-signal test.

The long-film test passed before the final video-prefetch change; subsequent changes affected only VideoFrame image prefetch and caching, and the long-film probe contains no video assets. That change passed new video tests and the complete default suite; this record does not falsely claim the long-film test was rerun.

## Independent Code Review and Fixes

A reviewer uninvolved in implementation completed the overall verification. The following issues have failure reproductions and post-fix regression checks:

- Video changes inside brand-kit did not enter the content version; project input content is now hashed, including production records.
- Old playback requests canceled a new seek or incorrectly resumed after initial audio decoding; added playback-session generation checks.
- Loading state appeared before the next frame was ready; changed to background preparation and atomic visible-view switching.
- Animated GIFs were accepted as stills; frame-count checks now reject autonomous animation.
- Failed publication of films and reports left remnants or overwrote competing writes; prepare on the target volume, use non-overwriting atomic links, and roll back only our own reports.
- The disk budget was checked only after all video decoding; changed to streaming PNG parsing, checks before each frame write, and cleanup of incomplete directories.

Practical production also exposed and fixed SVG MIME, duplicate contexts in public React helpers, lazy-load capture waits, Playwright CLI path resolution, and peak deviations from mono mixing during audio analysis.

## Style and Product Projects

Local delivery is in the repository's sibling `launch-video-maker-output/2026-10-26/`. Each project contains a standalone runtime package, lockfile, source, local assets, brand kit, production records, and `.lvm/review/` evidence. Generated content is not committed to the skill repository.

| Project | Content | Review status |
| --- | --- | --- |
| `styles/dark-keynote/` | 12 seconds, 24 fps; single accent color, dark grid, rolling numbers and holds | Fixed highlight rectangle and scattered accents; observed stills and complete background-playback state; continuous audiovisual review incomplete |
| `styles/living-screencast/` | 12 seconds, 30 fps; faithfully redrawn runtime controls, DOM anchors, pixel character and tracking camera | Fixed timecode clipping and overlapping captions; continuous audiovisual review incomplete |
| `tapvid/` | 24 seconds, 1080p30; based on user-confirmed tapvid.ai, including input, editing, Brand Kit and CTA | Checked official claims and Logo/font/illustration provenance; independent background playback traversed 720 frames without errors; commercial review not passed |

The user's two initial styles were used only as documentation and asset inputs: demos were not run as templates, and their original dependencies were neither repaired nor ported. Both films have new narratives and source code. No voiceover was provided, so speech production or word-level synchronization validation is not claimed.

TapVid uses public marketing illustrations from the official site, with records explaining that these are not certified footage of actual product operations. No performance, customer, or pricing promises were invented, and no paid generation or publication was invoked. Current design recommendations still include making “materials → finished work” or “before → after” more concretely visible, strengthening brand-element continuity and memorable motion.

Independent reviewer capability limits: it can inspect screenshots, adjacent frames, background-playback state, and audio data, but cannot actually hear sound or directly observe a continuous live stream. The seven dimensions therefore remain unscored and cannot pass the ≥7.5 threshold. Each project's `independent-review.md` preserves detailed observations and limits; `review.json` remains incomplete.

Measured loudness: Dark Keynote −14.2 LUFS / −2.9 dBTP, Living Screencast −14.0 LUFS / −1.5 dBTP, TapVid −19.8 LUFS / −5.9 dBTP. These are measurements, not listening judgments. TapVid's loudness target requires listening, not simply adding gain toward full scale.

After the final runtime video-prefetch addition, all three projects reinstalled the package, checked source hashes, and regenerated keyframe and mix evidence; film content was unchanged, and none of the three has VideoFrame inputs. Independent reports retain their original review versions, with a separate packaging-update record; producer retesting is not presented as a new independent commercial pass.

## Implementation Tradeoffs and Follow-Up Work

- Video initially decodes the entire imported segment, with a default total budget of 2 GiB; trim long screen recordings first. Segment-level decoding optimization is deferred.
- Recheck project hashes before and after each capture to prioritize preventing mixed versions; hashing performance for projects with large assets can still improve.
- Generated projects use the npm script name `prepare`, so ordinary installation triggers the lifecycle; for dependency-only installation, use `npm ci --ignore-scripts`, then prepare explicitly. A future rename of the user command could remove implicit preparation.
- setup installs pinned Chromium, not system FFmpeg automatically. Other operating systems have not passed acceptance.
- Native browser caches and decoders are browser-managed; the six-handle limit applies to runtime-held speculative images, not a hard page-memory cap.
- Continuing commercial acceptance requires an independent evaluator capable of actual continuous viewing and listening, plus TapVid design refinements and loudness decisions. If the user requests export, review the actual MP4 rather than substituting conclusions from the preview project.

## Preview Fixes After User Playback Feedback

Actual user playback exposed severe flickering and version errors. Previous checks that “frame states are traversable” did not establish display stability; this round adds actual pixel regressions rather than using old test conclusions to conceal the problem.

- Root cause one: macOS `.DS_Store` entered the project hash, while any file-watcher event permanently marked a version change. OS metadata is now excluded and actual content hashes determine changes; touching unchanged files does not invalidate the version, while real source edits still do.
- Root cause two: prepared frames used only `visibility:hidden`, which scene descendants could override with `visibility:visible`, overlaying unready frames on the current image. Opacity now isolates the entire preparation layer while retaining hidden/noninteractive states, switching only after full readiness.
- The preview UI now has a centered canvas, adaptive scaling, and an explicit control area; scaling does not alter exported images. Player CSS is scoped to its own UI to prevent hiding or rewriting semantic scene elements.
- Four new regressions failed first on the old implementation and then passed after fixes: metadata/touch, pending-readiness pixels for explicitly visible descendants, window resizing, and semantic-content consistency between preview/capture.
- Actual 24-second TapVid background playback reached frame 719 and stopped automatically; 120 Logo-region pixel samples matched, page errors were empty, static assets made only six requests, and the audio source started once. This verifies display stability and playback behavior, not commercial listening acceptance.

## Evaluation System v2 Validation

This round implements tooling and handoff for independent visual evaluation; the full seven-dimension commercial threshold is unchanged. Visual scope can pass independently, but commercialStatus always remains incomplete; listening evaluation is deferred, no listening model is installed, and no audiovisual content is sent to an external API. Curated BGM/SFX assets are a separate effort; product production awaits template readiness.

- New packs use unique directories, separately binding files, manifest, source version, runtime, and actual MP4; historical reports are not overwritten.
- Default capture includes an overview and continuous windows around scenes/markers; the budget is 1200 frames and 2 GiB, without silently reducing coverage. Actual background playback is recorded separately and cannot masquerade as continuous viewing.
- Dedicated gate tests cover missing context, missing observation capability, stale reports, damaged evidence, low scores, and unresolved blockers. Retesting cannot delete old issues, lower severity, cite only historical evidence, or inherit old scores.
- Existing MP4s are sampled read-only; file changes trigger mp4-changed. Preview checks do not automatically generate a full-film video.
- After project relocation, use only the vendor package to install, generate, and validate evidence packs; after actual source fixes, generate a new pack with --previous and verify cleared scores and item-by-item retests.
- Full technical suite: 70 tests, 69 passed, one explicit opt-in long-film test skipped. renderer, audio, and Player synchronization logic were unchanged; the 60-second synchronization test was not rerun, and its original record represents only that original run.
- TypeScript build, Markdown links, and skill-creator structural validation passed. Python validation used PyYAML in a temporary uv environment without new project dependencies. New review modules were formatted with Prettier for independent inspection.

Independent code review completed and found and fixed two Important issues: clean previously deleted unreconstructable handwritten review reports/retest history, and now clears only known caches while retaining default, custom, and nested review records; FPS was compared as a string, and now uses exact rational comparison so 60/2 equals 30/1. Both have failure reproductions and post-fix tests; the final full suite has 70 tests, 69 passed and 1 skipped, with no Critical or deferred Minor issues.

The independent reviewer actually inspected 12 technical-fixture frames one by one, recording still and full-window observations while declaring continuous visual/listening capabilities unavailable. Six dimensions remain unverified/null, sound deferred/null, CLI exits 2, and both scopeStatus and commercialStatus remain incomplete. This rehearsal used the review version before the final fixes; after runtime changes, its old pack was correctly marked runtime-changed, without carrying forward old conclusions as a pass for the new version.

Synthetic technical-fixture scores are used only for gate testing, not commercial film assessment; completion of the tools does not change the three original films' commercial status.

Execution tradeoffs and limitations in this round:

- Development used a sibling isolated worktree / codex/review-system to avoid concurrent template changes, at the cost of a separate merge back to the original branch.
- The same final independent reviewer also performed the technical-fixture handoff rehearsal to reduce repeated context; the rehearsal record was saved during final acceptance.
- Commercial film quality awaits production after templates are ready; current technical fixtures cannot establish commercial acceptance.
- Continuous motion viewing and listening remain unverified; the current environment still cannot claim full quality acceptance.
- Hashes detect accidental mixing/modification; they cannot authenticate reviewers or prevent deliberately rewriting evidence and hashes together.
- renderer/audio synchronization logic was unchanged, so long-film tests were not repeated; old long-film records do not certify future changes.
- No external models or new services were connected, and no product MP4 was exported; no additional external perceptual capability or finished-film conclusions were obtained.
