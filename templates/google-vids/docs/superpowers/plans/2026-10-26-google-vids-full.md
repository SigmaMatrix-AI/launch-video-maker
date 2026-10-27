# Google Vids full reference reconstruction

Goal: extend the user-approved opening into the complete 2,599-frame reference film, delivered as an editable launch-video-maker React project and local preview.

Architecture: deterministic React/SVG composition with one shared frame clock. Local image crops are limited to photographic content, avatars and template thumbnail artwork. Talking-head footage is a separate cropped, muted media asset. The original supplied audio mix is synchronized at source time zero. No full-reference video background.

Tech stack: React 19, TypeScript, launch-video-maker runtime 0.1.0, FFmpeg, Playwright.

Spec: 1920×1080; 30000/1001 fps; 2599 frames (86.7199667 seconds); sample opening retained; exact UI copy and approximate source camera/choreography; no MP4 export requested.

Global constraints: all assets local; no CSS autonomous animation; explicit media time from global frame; frame seek must be deterministic. Preserve the separate approved opening project.

Review focus: chapter continuity, frame/asset readiness, typography and composition against reference, editable UI versus media provenance, full playback and random-access equivalence. Independent reviewer must distinguish observable evidence from unavailable sound/dynamic judgment.

## Implementation
1. Extract full audio, source stills and cropped photographic/video media. Record provenance.
2. Add shared visual primitives and chapters: generation (9.4–17.8), styles (17.8–27), script/voices (27–46.2), collaboration (46.2–53.9), stock/editor (53.9–64.3), recorder (64.3–75.8), finale (75.8–86.72).
3. Register scene intervals, local media, continuous audio, and markers in film.tsx.
4. Prepare runtime; inspect reference/output keyframes and boundaries; fix observable discrepancies.
5. Validate all frame requests, random-access determinism, full playback, fonts, images, media and audio measurements.
6. Independent clean-context review, address concrete findings, document remaining limitations; open local preview.
