# Runtime validation records

2026-10-27, macOS arm64, Node 24.17.0, FFmpeg 8.1.2, runtime 0.1.0, Playwright 1.64.1, Chromium 156.0.8078.4 / revision 1248.

## Checks performed and results

- The standalone runtime snapshot built successfully; film.tsx and its imported JSX passed TypeScript checking without emitted output.
- `npm run validate -- --full` succeeded: 1280×720 / 60fps / 1200 frames; all 1200 frames underwent acquire → React/font/image/background decoding → screenshot → release, with actual data-phase matching the specified frames for fourteen actions.
- Seventeen out-of-order/reverse samples produced byte-identical repeated results and matched corresponding sequentially captured frame PNG SHA-256 hashes.
- The shared mix and decoded 20-second master yielded **sample-for-sample identical** 48kHz stereo float PCM. Each channel has 960000 samples, peak 0.60067749, with no added clipping, time shift, envelope, or resampling speed change.
- Actual Player play → pause → seek to frame 900 → resume passed without page errors.
- The whole package was copied outside the repository; `npm ci --ignore-scripts` using the included tarball and lock, a 56-frame short check, reverse/repeat checks, PCM, and Player checks passed. Neither the original project nor the repository runtime path is needed; system FFmpeg and existing Chromium were not reinstalled.
- Same-frame comparison between the original current six-image video and all 1200 runtime frames: both resized to 480×270 with Pillow bicubic; mean RGB SSIM **0.99407246**, minimum **0.98778431** (frame 179), mean RGB MAE **0.45752/255**. PNGs are compared against a JPEG/H264-encoded baseline, so byte identity is not expected.
- Independent review found no P1/P2 migration issues. Font aliases are the only differences in the six JSX files; original motion parameters, +0.5-frame sampling, content, and asset mappings were verified consistent. P3 documentation links broken after standalone copying were replaced with package-local records.

## Evidence and reruns

- [runtime-full.json](runtime-full.json): full execution report, 1200 frame hashes, and implementation file hashes. The report was generated before adding validation records and fixing documentation links; `testedContentVersion` preserves the complete project version at that time, while `implementationFiles` independently constrains runtime source, assets, dependencies, and validation scripts. Documentation finishing does not change those implementation files.
- Historical reference comparison: 1200 frames against `shiqu-shopping-six-images.mp4` (SHA-256 `3e80496da36d4def7022c038d4fcf2e89b0087ea0fc2d79b0fc468f169f6b853`); the metrics above summarize the result. The per-frame report remains in Git history.
- [source-manifest.json](source-manifest.json): source file provenance and hashes.
- `npm run validate` reruns the 56-frame check; `npm run validate -- --full` reruns all 1200 frames. New reports and PNGs go to `.lvm/validation`, without overwriting historical evidence here. The latest run overwrites cached runtime.json; use this directory's full report to identify this 1200-frame evidence.
- The baseline video is not bundled. To recheck similarity, use `shiqu-shopping-six-images.mp4` with the SHA-256 specified above, decode to RGB, apply the same scaling to both sides, and compare identical frame numbers; do not substitute the 21.033-second reference film or old nine-image version.

## Scope

This is technical runtime acceptance for template migration; original assets, audio, and sequencing remain, and no new MP4 was generated. Frame-by-frame completeness, asset handshakes, timeline, PCM, and playback controls were checked, and sampled frame collages were visually consistent. Independent review did not actually watch motion or listen to audio, and does not claim a new seven-dimension commercial aesthetic/listening acceptance. Product adaptation and public release still follow the skill's independent evaluation and asset provenance requirements.
