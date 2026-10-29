# Implementation and quality assurance

Read the relevant section for the current task. Use the existing React + TypeScript, unified frame control, Playwright, and FFmpeg stack; see [README](../README.md) for installation, and [core.ts](../runtime/src/core.ts), [react.tsx](../runtime/src/react.tsx), and [CLI](../runtime/src/cli.ts) for exact interfaces.

## seek(t): the same image at any given time

`seek(t)` describes the convention of time-driven visuals, with t measured in seconds; it is not a new function added to the current runtime. The existing entry point is React `Frame({frame})`, with `secondsAt(film, frame)` converting frames to time. Preview and export share these calculations, assets, and audio timeline.

The image is a function of current time, inputs, configuration, and a fixed seed. Jumping to a frame, reversing to it, or playing from the start produces the same result. Animation must not depend on accumulated state, wall-clock time, unseeded randomness, autonomous CSS animation, or timers. Scenes use half-open frame ranges `[start,end)`; local frame is `frame - start`. Explicitly arrange layers and duration for overlapping transitions.

```tsx
import React from 'react';
import {defineFilm, secondsAt, interpolate} from '@launch-video-maker/runtime';
import {AssetImage} from '@launch-video-maker/runtime/react';

export const film = defineFilm({
  width: 1920, height: 1080, fps: {num: 30, den: 1},
  durationInFrames: 300, seed: 1,
  scenes: [{id: 'hero', start: 0, end: 300}],
  assets: [{id: 'logo', kind: 'image', src: 'brand-kit/logo.png'}],
  audio: [], markers: {reveal: 30}
});
export default function Frame({frame}: {frame: number}) {
  const t = secondsAt(film, frame);
  return <AssetImage asset="logo" style={{opacity: interpolate(t, [0, .3], [0, 1])}} />;
}
```

## Springs, popovers, and continuous morphing

Evaluate closed-form springs at a given time so random-access frames reproduce the same motion. The following is an underdamped unit-step example starting at rest: `omega` determines response speed, and `zeta` determines damping, with `0 < zeta < 1`. Damping near 1 suits slight overshoot; adjust parameters against the actual visuals.

```js
function spring(t, omega = 18, zeta = .82) {
  if (t <= 0) return 0;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * omega * t) *
    (Math.cos(wd * t) + zeta * omega / wd * Math.sin(wd * t));
}
// Pseudocode: calculate every value from the current t; never accumulate per frame.
const p = spring(t - openAt);
scale = lerp(.94, 1, p);
y = lerp(12, 0, p);
opacity = clamp((t - openAt) / .12, 0, 1);
```

Expand popovers from the trigger location or button center with an appropriate `transform-origin`; choreograph the overlay, container, and text separately. The container creates readable space first, then the text enters; on closing, the text exits before the container retracts. Brief blur can hand off content, but settled text stays sharp. Check intermediate frames for overlapping old and new text.

Sliders or capsules can offset the timing of leading and trailing edges to create stretching and catch-up. During dragging, cursor position directly determines object position; on release, continue from the release position and velocity rather than jumping to a preset starting point. Do not apply the zero-initial-velocity step response above directly to a release with velocity: retain a release state derivable from time, then solve the spring response with initial displacement and velocity.

When morphing across scenes, carry through the subject's geometry and motion direction while content enters and exits independently. Every interpolation needs explicit start and settle times. To settle near an accent, start earlier, watch, and calibrate; do not mistake the start for the landing point.

## 3D camera and clarity

Organize space before the camera: where is the subject, how far away are background and supporting layers, and what will movement reveal? Modest perspective and layered parallax can establish depth; return dense text to a clear, stable angle for reading. Prepare screen close-up assets for their final enlarged size.

```text
# Conceptual pseudocode; matrices and interpolation are implemented by the project
subject = modelTransform(t)
cameraPosition = orbit(target, radius(t), yaw(t), pitch(t))
view = inverse(lookAt(cameraPosition, target, up))
clipPosition = projection * view * subject * localPosition
```

CSS 3D can use parent perspective, a camera wrapper, and preserve-3d; an actual camera transform uses the inverse view matrix. Cursors, text, masks, and screenshot slices share spatial transforms to avoid drifting or misalignment during motion. Check clipping, z-order, backfaces, and perspective seams. Across shots, carry the handoff object's position, scale, and velocity naturally; for looping films, also check position and velocity at the start/end seam.

For blurry text, first check font readiness, source-image pixels, scaling, and rasterization. Use `will-change` cautiously on text layers that scale substantially, and confirm clarity in captured frames. Blur and depth of field guide attention; they cannot repair low-resolution assets.

## Assets and frame capture

Asset `src` paths are relative to the project root and support image/font/audio/video; fonts provide `family`. Save sources and the basis for use, keeping assets inside the project. Before screenshots, wait for an explicit page state and ready fonts and images. When layering, prepare a clean background plate and consistent crop coordinates to avoid leaving duplicate elements behind.

Use `AssetImage` or an img that waits for decoding. For Canvas/asynchronous drawing, use `useFrameTask(async signal => …)` and do not submit stale results after cancellation. For video, pass explicit source time in seconds to `VideoFrame`; map trimming and speed changes from project time. Capture VFR by source timestamps and choose error/hold/loop for out-of-range time. Current video predecoding has a 2 GiB limit, so trim long assets first; convert animated GIFs and similar formats to deterministic video assets first.

`capture` captures pages and elements; defaults are a 1440×900 CSS viewport at 2× pixels, with element bounds in viewport coordinates. Full-page camera motion requires conversion using scroll offsets, screenshot scale, and crop origin. Complex states can be manipulated through the preparation callback of `capturePage`; a screenshot does not automatically prove complete interaction.

## Music and sound effects

Listen for mood and structure before selecting music: how the setup builds, where the climax lands, and whether the ending resolves fully. Listen with the visuals. BPM and waveform peaks are only clues; transient candidates from `analyze-audio` are not necessarily musical beats. When the user requests silence, keep audio empty and ensure embedded media does not produce unexpected sound.

Major actions should respond to musical accents and sections. SFX should suit the action's material qualities, with different emphasis for pressing, dragging, revealing, and settling. For repeated sounds, vary tone, spacing, or loudness to avoid mechanical repetition. A sound file's attack peak may occur after its start; align the audible accent with visual contact or the landing point. Leave room for voiceover and key feedback, retaining sound tails and a resolved ending.

Current audio events require `id,asset,start,end`. Start/end use project frames and may be expressed as `{scene:'hero',offset:12}` or `{marker:'reveal',offset:0}`. `sourceStart/sourceEnd` use seconds; `gain` is linear gain; `fadeIn/fadeOut` and `envelope:[[localFrame,gain],…]` use project frames local to the event. Changing `speed` changes pitch. For insufficient source duration, explicitly set `shortage:'silence'` or select a suitable segment. `loop:true` loops at a hard boundary and needs a seamless source. Sound tails beyond end are clipped.

Sources mix into 48 kHz stereo `mix.wav`, shared by the Player and AAC encoder. Clipping causes preparation to be rejected; there is no automatic normalization. Prepare again after source, envelope, or timing changes. When visual duration changes, update scene/marker, then recheck affected sounds and the full film's musical structure.

## Preview and render

Before running, verify Node.js 24+, FFmpeg/ffprobe, Chromium, and runtime; see README for installation and initialization. Run the following commands inside the film project. Report missing tools honestly rather than expanding production into building a new rendering engine.

```bash
npx lvm doctor
npx lvm prepare
npx lvm preview                  # Internal checks; prints the actual URL
npx lvm still 42 /absolute/frame.png
npx lvm preview --open           # When the user requests a preview
npx lvm render /absolute/film.mp4 # After an explicit user request to export
npx lvm inspect /absolute/film.mp4
```

After source or asset changes, prepare again and restart the old service. When delivering a preview, read the actual URL from this run, verify readiness, playback/seek, and absence of asset errors, keep the service running, and provide a Markdown link. The service binds only to 127.0.0.1; remote environments require a verified accessible forwarding address. Do not present a remote localhost URL as usable by the user.

The current renderer uses Playwright to drive the same entry point, capture frame by frame, and encode H.264/AAC with FFmpeg. Capture uses a serial acquire → screenshot → release transaction through `window.__LVM__`, checking frame/version/requestId and waiting for React, fonts, images, and the target video frame to be truly ready. A fixed sleep or a video seeked event alone cannot establish visual correctness. Concurrent captures use isolated instances.

Export exactly `durationInFrames` frames, from frame 0 to N−1; record dimensions, fps, codec, and audio specifications. Deliver the project by default; internal checks do not automatically export the full film. An explicit export request needs no further authorization. `render` refuses to overwrite existing files; use a new output path.

## Quality assurance

See [eval.md](eval.md) for production standards, slide-deck-like presentation diagnosis, issue logging, and rewatch methods. The technical evaluation interface and seven-dimension scoring agreement remain below; read both during independent review.

Before delivery, an independent reviewer who did not participate in production checks the current version. Provide user requirements, product evidence, direction, storyboard, and watchable output without desired scores. Use the following seven dimensions with concrete visual or audio evidence:

| Dimension | Basis for judgment |
| --- | --- |
| Style fidelity | Visual choices are consistent, serve the product's character, and meet explicit brand and reference requirements |
| Creativity and impact | Concrete changes make product value visible, with a memorable element specific to this product |
| Motion craft | Motion has cause, weight, and resolution; micro-interactions are precise; shots and transitions hand off naturally |
| Design and typography | Attention is clear, composition has hierarchy, and text is readable at actual playback size and within its hold time |
| Polish and detail | Glyphs, edges, materials, masks, lighting, and enlarged clarity stand up to inspection |
| Sound and synchronization | Music builds and resolves, SFX reinforce actions, and the mix has clear, synchronized layers |
| Technical specifications | Assets are complete, arbitrary frames reproduce consistently, and playback, dimensions, frame rate, and actual output meet requirements |

For template tasks, inspect the fidelity scope established in SKILL.md; align sections whose choreography must be preserved with the original film section by section. Prioritize factual errors, missing required content, exposed sensitive information, unreadable key text, missing assets, playback failures, and obvious audiovisual misalignment. Attractive images or scores cannot offset these issues.

Current tools retain a threshold of ≥7.5/10 in each of the seven dimensions. Scores are review records and do not prove quality on their own. If viewing or listening is unavailable, mark it unverified; do not infer viewing/listening from source code, playback logs, or waveforms. The actual MP4 also needs full playback, checking first/last frames, compression quality, audio tracks, and synchronization at the start, middle, and end; preview checks cannot replace this.

### Using the existing review tools

`npx lvm review-pack .lvm/review` creates an evidence bundle for a unique version, defaulting to visual scope. Use `--scope audiovisual` for full audiovisual review, `--mp4 /absolute/film.mp4` for an existing export, and `--previous /absolute/old/review.json` for a follow-up review. It does not automatically export or score.

By default, collect `records/{brief,direction,storyboard}.md` and brand-kit sources. Put custom files or action sampling ranges in `records/review-context.json`, for example `{"documents":[{"role":"direction","path":"records/concept.md"}],"actionRanges":[{"start":30,"end":45}]}`. Paths must stay within the project; each bundle is limited to 1200 frames and 2 GiB.

The reviewer reads the handoff, manifest, and blank review.json and declares their actual observation capabilities. Follow sampling to inspect the overview and continuous windows; enter sequence observations covering every evidenceId in each viewed window, continuous-playback covering the full film, and listening for audiovisual scope. Cite this round's evidenceIds, global half-open frame ranges, observable phenomena, and repair targets for every dimension score and issue. Fill in review.json only; do not alter the manifest or evidence. After fixes, create a new bundle, retain old issue IDs and severity, and use new evidence to fill in resolution status and resolution; do not inherit old scores.

Run `npx lvm review-check /absolute/bundle/review.json`: exit 0/1/2 means this round is passed/failed/incomplete. Also read scopeStatus and commercialStatus. In visual scope, sound stays deferred/null and full commercial status remains incomplete; for a silent film, state "Visual scope passed; silent as requested." The checker verifies relationships between the report and evidence; it cannot certify aesthetics or actual viewing behavior. If independent review is unavailable, honestly retain pending-review status.
