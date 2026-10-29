# Product Launch Lavender

**Final release: v1.0.0 · 2026-10-27 · The user approved the current local preview.**

A reusable React template for product launch videos: 31 seconds, 960 × 540, 30 fps, 930 frames. Suitable for SaaS, collaboration tools, analytics tools, and workflow products with multiple webpage interfaces. The example product Forma is fictional. The template runs independently.

The core is motion sequencing and breathing room: a page settles before expanding; one page shrinks into a card in an array, and rotation begins only after the other cards appear. The page selected by rotation connects continuously to the following page wall. Finally, circular petals converge into an interwoven floral mark and a long brand hold. Prioritize preserving these relationships when reusing.

## Final sequence

Times are in seconds; actions may cross scene boundaries used for indexing in film.tsx, so do not hard-cut by scene labels.

| Interval | Content and motion | Implementation entry |
| --- | --- | --- |
| 0–5.55 | Product Launch Video title and multipage opening, staggered expansion and hold | film.tsx, src/tracks.json, src/Headlines.tsx |
| 5.55–7.1 | Analytics page enters and settles for reading | src/ContinuousShowcase.tsx, src/ShowcaseMotion.ts |
| 7.1–10.8 | The same analytics page tilts to the front; two more pages then unfold; three layers drift slowly | Same as above |
| 10.8–14 | Three layers converge into the value showcase page, followed by title and subtitle | Same as above, src/Headlines.tsx |
| 14–16.05 | Workspace dissolves in and holds a 16:9 reading composition | Same as above |
| 16.05–17.25 | Workspace shrinks and moves into the seed position in the orbiting array | src/ShowcaseMotion.ts |
| 17.25–18.9 | Other cards appear first, then rotate together from 17.85 seconds; two central lines: Create. Connect. / Launch. | src/ContinuousShowcase.tsx, src/Headlines.tsx |
| 18.9–21.4 | Selected homepage expands; from 20.35 seconds it tilts, shrinks, and dissolves into the page wall | src/ShowcaseMotion.ts, src/IsometricWall.tsx |
| 20.35–24.95 | Tilted multicolumn page wall scrolls continuously; product slogan on the left; overlaps detail page from 24.65 seconds | src/IsometricWall.tsx, src/Headlines.tsx |
| 24.7–25.8 | Detail page holds briefly to prepare the brand finale | film.tsx, src/tracks.json |
| 25.8–31 | Circular petal masks converge into six groups of interwoven arcs forming a floral mark; brand wordmark appears and holds | src/star-trajectory.ts, src/Brand.tsx |

Final orbiting-array parameters: center (480,270), horizontal/vertical radii **380/215 px**, card width **250 px**, rotation **1.15 rad (approximately 66°)** over 17.85–18.9 seconds. Slight edge cropping is part of the approved composition. The seed-page entrance, array rotation, and selected-page exit share `orbitPose`; do not introduce separate inconsistent coordinates when editing.

## Initial assets and replacement mappings

Prepare four clear local 16:9 webpage screenshots, preferably at least 1600 × 900. Small interface text conveys visual texture; native headings carry the key selling points. The largest card in the continuous showcase is 800 px wide; earlier and later legacy trajectory sections still use a 960 × 540 asset canvas, so supply the same aspect ratio to avoid stretching.

| Local example | Product evidence purpose | screens keys in src/content.json |
| --- | --- | --- |
| assets/mock/hero.png | Homepage or core value overview | heroScreen, potentialScreen, featureMiddle, galleryScreen |
| assets/mock/dashboard.png | Main workspace and full operation view | overviewScreen, dashboardScreen, featureBack, pricingScreen |
| assets/mock/analytics.png | Results, outcomes, or analytics | capabilityScreen, featureFront, proofScreen, useCaseFive |
| assets/mock/workflow.png | Workflow or key feature details | integrationScreen, assistantScreen, detailScreen, workflowSide |

Retain all 16 mapping keys. Reuse four images or split them into more screenshots as appropriate for the product. Key names are legacy interfaces; pricingScreen, for example, need not show pricing. Some continuous shots directly use proofScreen, dashboardScreen, heroScreen, detailScreen, and overviewScreen; changing only legacy slots such as featureFront will not change these shots.

The current continuous cards and page wall use AssetImage. **This finalized version's reuse interface handles static images**; keep every screens.kind as image. Changing it to video alone does not establish screen-recording support throughout the film; implement video frame acquisition in these components and revalidate if recordings are required.

## Adapting to another product

1. Copy this directory to `films/<project-id>/` in the repository, excluding node_modules, .lvm, exports, and .git. Edit future works in the copy without writing back to the finalized template.
2. Place verified real pages in the copy's assets/ and update the corresponding screens.src in `src/content.json` using project-relative paths. Text, numbers, and people in the four Forma mocks are examples and cannot serve as evidence for the new product.
3. Edit copy: promoTitle is the opening positioning statement, valueTitle/valueSubtitle the value proposition, breadthTitle the central two-line phrase, workflowTitle the left slogan, and brandName the closing brand name. The current slogan is “Make room for your next big idea.” Retain short phrases and explicit line breaks; check occlusion, weight, and closing alignment for Chinese text or longer brand names.
4. Optionally change brandMark from null to a local transparent image path to replace the final interwoven floral mark. The petal-convergence path remains. Check sizing and combined centering at 27.1–31 seconds after replacing the symbol or wordmark.
5. palette provides color controls for native text, the stage, and the mark. Also inspect the continuous gradients in `src/Background.tsx` as needed; changing palette does not automatically replace every color field. Preserve real interface content and status colors without globally tinting screenshots.
6. Configure music in the music asset and audio timeline in film.tsx. Currently it uses the reference audio's first 31 seconds at gain 0.75, with no speed change or rearrangement; check trimming, gain, and cue placement when replacing the track.
7. Preserve “shrink to one card → others appear → rotate” and the dissolve into the page wall. When changing aspect ratio, rhythm, or shots, update motion coordinates, text areas, petal masks, and audio anchors together, and record the adaptation reason.

## Installation, checks, and preview

Run inside the copied project:

```sh
npm ci --ignore-scripts
npm run setup
npm run preview
```

Requires Node >=24, FFmpeg/ffprobe, and Playwright Chromium; the runtime snapshot, package-lock, and local assets are included. All visuals use a unified frame driver and support arbitrary seeking; Remotion is not used. Restart the preview after modifying source, assets, or project documents to avoid runtime content-version mismatches.

Original template regression checks:

```sh
node scripts/check-showcase.mjs
node scripts/check-star.ts
npm run validate -- --full
```

Besides execution, aspect ratio, audio, and repeated frame acquisition, `validate.mjs` compares hashes for frames 777–929 with the originally approved CTA in `records/runtime-full.json`. **This protects the original template; it is not a universal visual baseline for any new brand.** If the copy changes the ending, palette, or audio, first adjust its corresponding baseline/source-audio assertions, then establish the product's own baseline after human review. Do not overwrite this template's baseline or misreport expected differences as runtime failures.

Focus review on 6.5–8.5, 14–19.7, 20.35–21.4, and 24.65–27.6 seconds: no aspect-ratio stretching, jumps during card replacement, text occlusion, or broken transitions. Page-wall angle, speed, and spacing are in src/IsometricWall.tsx; petal trajectories retain the compatibility filename src/star-trajectory.ts.
