# Google Vids — full React reconstruction

Complete 86.719967-second timeline of the supplied Introducing Google Vids reference: 2,599 frames, 1920×1080, exact 30000/1001 fps. Native React/SVG scenes with launch-video-maker's vendored runtime. Original English copy and synchronized reference audio are retained. The separately approved opening study is preserved locally under ../../films/google-vids-opening (not distributed with the template).

## Preview

```sh
npm ci
npm run preview -- --open
```

Node 24+, FFmpeg/ffprobe and the runtime's Playwright Chromium are required. Dependencies and lockfile are included. No final-film MP4 export has been requested or produced; short MP4 files under assets/media are cropped source footage used inside the editable scene.

## Editing map

| File | Content |
| --- | --- |
| film.tsx | Film settings, eight chapters, audio, assets and action markers |
| src/Opening.tsx / Prompt.tsx | Approved opening, app menu, play ribbon, prompt typing |
| src/Generate.tsx | Floating documents, attachment, creation pill, outline rows |
| src/StyleScene.tsx | Style selection and three editable full-size designs |
| src/ScriptVoice.tsx | Script typing, voice chooser, gradient shapes and waveform |
| src/Collaborate.tsx | Comment cards, collaborative slide and selection bounds |
| src/MediaScene.tsx / Editor.tsx | Stock search, image grid, editor UI, slide and timeline |
| src/RecordScene.tsx | Record controls, countdown, presenter media and camera push |
| src/Finale.tsx | Play pulse, use-case titles, app grid, Google Vids / Workspace |
| src/ui.tsx / Icons.tsx / motion.ts | Shared SVG geometry, typography, cursor and interpolation |
| assets/media | Photographs, avatars, reference thumbnail artwork and cropped presenter video |
| records/media-provenance.json | Source times, crops and media limitations |
| .lvm/qa | Rebuildable capture, technical validation and independent review evidence |

The entire chronology is implemented, with editable text/UI/animation. Photographs, faces and small template thumbnails are raster media. This is a code reconstruction, with approximations in pointer shape, detailed editor icons, motion blur, camera curves and some transition timing; it is not a pixel-identical copy. The solar poster retains embedded reference pointers/play icon, and the tiny presenter thumbnail holds during the final push toward Play. Full independent perceptual audio/motion acceptance is separate from technical validation.


Agent entrypoint: [template.md](template.md). Create derived user films under `../../films/<project-id>/`; keep this template unchanged during production. Local `.lvm/` evidence and `node_modules/` are ignored; source, required media, lockfile and the pinned runtime archive are included.
