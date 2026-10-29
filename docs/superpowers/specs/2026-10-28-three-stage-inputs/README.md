# Launch Video Maker

An Agent skill for autonomous product promo video production. Understand the product first, then build story, shots, and sound around its value. SKILL.md describes launch-film aesthetic goals, microinteractions, and dynamic storytelling techniques; both autonomous creation and template production start from the real product.

The runtime uses **React + TypeScript, unified frame control, Playwright, and FFmpeg**, without Remotion. Preview and export share scene source, assets, and premixed audio; Player is only for viewing and inspection.

## Status

The runnable development runtime provides project initialization, asset preparation, play/pause/frame stepping/scrubbing, still capture, MP4 encoding, page capture, audio analysis, and review evidence bundles. Runtime technical validation, style validation, and commercial film acceptance are distinct levels; passing tests does not establish commercial design quality.

Built-in reference templates provide reusable React projects; [Motion Design Promo](templates/motion-design-promo/template.md) supplies kinetic typography and case showcasing while preserving its existing 20-second rhythm. [Capsule Flow](templates/capsule-flow/template.md) provides the revised 82-second capsule-to-composer promo with plane transitions and a frosted logo button. Discover official styles in `styles/`; `runtime/validation/` and legacy `tests/fixtures/styles/` serve development validation only and are excluded from official template selection. User films all go in Git-ignored `films/`.

## Installation and quick start

Supported target: macOS Apple Silicon, Node.js 24+, npm, FFmpeg, and ffprobe (with libx264/AAC). Other platforms have not been accepted. FFmpeg is an external system tool; setup does not automatically install system software.

```bash
git clone https://github.com/SigmaMatrix-AI/launch-video-maker.git
cd launch-video-maker
npm ci
npm run build
node runtime/dist/cli.js doctor
npx playwright install chromium
node runtime/dist/cli.js init films/my-film
cd films/my-film
npm ci
npm run setup
npm run prepare
```

`init` generates project source, `brand-kit/`, production records, a runtime package snapshot in `vendor/`, and a dependency lockfile. The project can still install and run independently after moving, without the original skill directory; dependency and Chromium installation require network access. Place generated projects in `films/` by default, not official templates/styles directories.

The generated project's `prepare` is also an npm lifecycle script, so ordinary `npm ci` / `npm install` automatically prepares media. For dependency installation only, use `npm ci --ignore-scripts`, then explicitly run `npm run prepare`; projects with media require FFmpeg first.

The Agent starts from [SKILL.md](SKILL.md). The [production workflow](references/pipeline.md) covers autonomous creation, and the [template workflow](references/template-conventions.md) covers template production. The [technical guide](references/tech.md) provides implementation, audio, and rendering methods; [production and acceptance standards](references/eval.md) check product demonstrations, UI, motion, editing, and final output.

## Commands and delivery behavior

Invoke these commands through `npx lvm` inside a film project:

| Command | Purpose |
| --- | --- |
| `doctor` / `setup` | Check environment / install project dependencies and pinned Chromium |
| `prepare` | Validate configuration, prepare media, compile shared 48 kHz stereo mix |
| `preview` | Start preview in the background without opening a browser or displaying the address |
| `preview --open` | Open the browser when the user requests preview |
| `still 42 /path/frame.png` | Capture the specified frame after assets are ready, without MP4 |
| `render /path/film.mp4` | Explicitly export H264/AAC MP4; refuse to overwrite existing files |
| `inspect /path/film.mp4` | Inspect actual encoding specifications and frame count |
| `capture URL /path/assets [selectors...]` | 2× page screenshots, element screenshots, positions, and sources |
| `analyze-audio /path/music.wav` | Waveform windows, peaks, energy, and transient candidates as JSON |
| `review-pack .lvm/review` | Create a unique evidence bundle: action/transition frames, mix, playback records, context, and unscored report |
| `review-check /absolute/bundle/review.json` | Verify version, file evidence, scope thresholds, and issue-by-issue retesting |
| `clean` | Clear known decoding/Vite caches; preserve evaluation records and stop preview first |

Deliver a reviewed, previewable project by default. Show preview only on user request; run `render` only after the user is satisfied and requests export. Technical tests may generate fixture MP4s, but this does not authorize automatic export of user films.

Evaluation defaults to visual scope. See the [technical guide](references/tech.md#using-the-existing-review-tools) for full CLI parameters and report completion. A `review-check` exit code of 0 means only the current scope passed; a complete commercial conclusion remains incomplete for visual scope. Tools do not automatically score or claim to have watched/listened.

## Design principles

- **Grow from the product itself.** Both production routes first understand audience, task, input, and result, letting visuals prove value.
- **Director autonomy.** Aim for modern, refined films with launch energy, concretely designing rhythm, microinteractions, connections, and sound.
- **Use references well.** Templates offer motion and narrative techniques; styles offer visual inspiration. Determine usage scope from product and user requirements, retaining agreed choreography in explicit replication tasks.
- **Watch the result and polish.** Build a moving draft early, inspect readability, product communication, and audiovisual quality; technical success does not make a film excellent.

Film projects retain their own assets and dependencies. Deliver the project by default, with preview or export on user request; do not add an editor or publishing workflow.

## Development and validation

```bash
npm run build
npm test
LVM_LONG_TEST=1 npx tsx --test runtime/test/long-sync.test.ts
```

Tests run files sequentially by default to avoid resource competition between dependency installation and browser acceptance. Playback sync is compared against the audio-device output clock, allowing two frames of error within the preview scheduling window. Default tests cover real Chromium/FFmpeg, random and reverse frames, missing assets, audio envelopes/clipping, nonzero-PTS variable-frame-rate media, actual MP4, portable project installation, and review thresholds. The separately enabled 60-second test checks known visual flashes and audio pulses at the start, middle, and end.

When the two initial user-provided style packages are available locally, run `npx tsx runtime/validation/build-studies.ts /absolute/new/directory` to generate two new 12-second validation projects. This neither repairs, runs, nor ports original demos, and produces no MP4. See [validation records](docs/validation.md) for detailed status.

## Directories

```text
SKILL.md                 Aesthetic goals and creative techniques
references/              pipeline.md, template-conventions.md, tech.md, eval.md
templates/               Runnable reference templates and their adaptation guides
styles/                  Independent official style packages
films/                   User films and local experiments (Git-ignored)
runtime/src/             Packagable runtime core, media, audio, server, CLI
runtime/web/             Lightweight Player
runtime/test/            Technical tests
runtime/validation/      Development validation film source, not reference templates
docs/plans/              Development plans
```

Git does not track empty directories; they may be absent after cloning, which the Agent treats as no built-in references currently available.

## Limitations and troubleshooting

- Source or asset changes invalidate the current preview/capture version. Stop the service and run `prepare` / `preview` again to avoid combining old audio with new visuals.
- Video assets are predecoded to PNG; original PTS selects the frame covering the target time. The current implementation predecodes the entire imported clip; trim long sources first. See the runtime guide for cache limits and cleanup behavior.
- Audio speed changes use resampling and change pitch; pitch-preserving time stretch, TTS, ASR, music generation, and source separation are not provided.
- `inspect` is a technical probe, not a substitute for watching the film, listening, and independent aesthetic evaluation. `review-check` validates human report completeness but cannot establish that reviewers actually watched or listened.
- Fix original assets for font/image errors; do not conceal them with fixed waits or silent fallbacks. Run `doctor` to check tools; caches can be regenerated after `clean`.

## Contributions and licensing

Describe actual behavior changes, reproducible validation, and remaining limitations in submissions. Record sources and licenses for references and assets; do not commit generated caches or label unverified aesthetic outcomes “passed.”

This repository has not specified a license and provides no `LICENSE`. Third-party dependencies and referenced assets remain subject to their own licenses; do not assume this project uses MIT or Apache.


- [Product Launch Lavender](templates/product-launch-lavender/template.md): finalized v1.0.0; a 31-second lavender product launch template with continuous pages, an edge-reaching orbital array, an isometric page wall, and a circular interwoven floral mark.
