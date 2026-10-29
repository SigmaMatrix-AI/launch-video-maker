# Launch Video Maker Development Plan

Confirmed: autonomous decisions; show previews and export only on request; React/TypeScript + unified frame control + Playwright/FFmpeg; macOS first. Keep templates and official styles as empty directories. A style usually has only a free-form style.md; a demo is an optional application reference, need not run independently, and does not require porting its entire engine. Keep the brand kit inside the film project.

## Task 1: Standalone Project and Frame Runtime Core
A single packageable runtime, with doctor/init/setup; projects carry the vendor runtime tgz and lockfile. defineFilm, rational frame rates, half-open scene intervals, deterministic randomness and interpolation; frame requests carry a version and ID, with an asset-readiness handshake. Test boundaries, random frame access, faulty assets, and portable installation.

## Task 2: Player and Media
Playback, pause, scrubbing, frame stepping, and audio auditioning, without an editor. Explicit readiness for React commits, fonts, images, and asynchronous tasks. FFmpeg predecoding; map VFR through normalized PTS coverage intervals, with explicit out-of-range policies. Cache by input content/parameters, cancel stale requests, and pause audio and video together while buffering. Do not open a browser by default.

## Task 3: Shared Audio
Trimming, gain envelopes, fades, explicit looping and insufficient-duration policies, with scene/action-relative anchors. One 48k stereo PCM premix shared by preview and encoding; speed resampling changes pitch. Detect clipping and avoid implicit amix normalization. Verify seek, version invalidation, mixed sample rates, endings, and long-duration synchronization.

## Task 4: Rendering and Inspection
prepare/preview/still/render/inspect; serial set-ready-validate-screenshot transactions lock the version. Exactly N frames; H264/yuv420p/AAC MP4, configurable and defaulting to 1080p30. Export only through explicit render; clean up failures without overwriting previous results. Inspect actual output frame count/audio/specifications, with probe synchronization error no greater than one frame.

## Task 5: Production Tools and Review
capture provides high-resolution pages, elements, coordinates, and provenance, with extensible project interaction scripts. analyze-audio provides waveforms/peaks/transient candidates/energy for agent calibration through listening. review-pack collects the brief, brand, direction, storyboard, version, stills, mix, and technical evidence. An independent subagent actually watches motion and listens; passing requires each of seven dimensions ≥7.5, with no blockers or missing evidence.

## Task 6: Style/Product Acceptance and Documentation
Make a new 10–15-second validation film from each of the two initial styles, without replicating the demos' narratives. Independent product production requires real product materials; mark it incomplete when these are missing. Relocate projects, clear dependencies/isolate the browser cache, and reinstall. README describes current tools; SKILL keeps long-term behavioral rules.

## Validation Layers and References
Do not assign commercial aesthetic scores to technical fixtures; style validation films validate a direction; only complete real-product films receive full seven-dimension commercial acceptance. Verify first/last/boundary/random reverse frames, 24/30/60/fractional fps, landscape/portrait, failed assets, VFR/nonzero PTS, audio envelopes/loops/seek, 60-second synchronization, standalone installation, and no automatic browser/MP4.

Draw on video-shotcraft for product evidence, brand grounding, styleframes/short motion validation, high-resolution real interfaces and layout capture, action buildup/development/transition/resolution, early rhythm planning, and specific evidence review. Faithful UI redraws are allowed; invented functionality is forbidden. Do not modify or depend on original project files.

## Execution and Delivery
Record RED→GREEN and stage commits by task; preserve the user's untracked examples. Finish with independent code review. Do not conflate source completion, passing technical tests, and passing commercial review. By default, do not publish, push, or commit generated caches or MP4 files.
