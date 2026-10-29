# Third-party notices

Project-authored source code and documentation are licensed under [Apache-2.0](LICENSE). Third-party software, fonts, music, screenshots, recordings, illustrations, logos, and other brand assets retain their own terms. The Apache license does not grant rights to third-party material or trademarks. Maintainer-owned materials are identified separately below and do not require third-party permission.

This inventory covers files tracked in this repository as reviewed on **2026-10-29**. Generated projects under `films/`, local caches, and deleted files in Git history are outside the current-file inventory. Source attribution, file hashes, and public website availability do not establish redistribution permission. Entries marked **permission pending** identify gaps in the retained records; this notice does not supply the missing permission.

## Fonts

All **12 bundled font files, across four families**, have SIL Open Font License 1.1 evidence from embedded metadata and official upstream notices. No bundled paid-only or proprietary font was identified. The font binaries have not been changed. Exact paths, SHA-256 hashes, embedded copyright/version strings, and license sources are recorded in [the font inventory](docs/font-licenses.json).

| Font and bundled files | Copyright and version evidence | License supplied with the files |
| --- | --- | --- |
| Google Sans: `templates/capsule-flow/brand-kit/GoogleSans-Regular.ttf` | Copyright 2025 The Google Sans Project Authors; version 13.002 | [GoogleSans-OFL.txt](templates/capsule-flow/brand-kit/GoogleSans-OFL.txt); [official Google Fonts notice](https://github.com/google/fonts/blob/main/ofl/googlesans/OFL.txt) |
| Inter: `templates/motion-design-promo/assets/fonts/Inter-*.woff2` (400 and 800; 2 files) | Copyright 2016 The Inter Project Authors; version 4.001 | [Inter-OFL.txt](templates/motion-design-promo/assets/fonts/Inter-OFL.txt), from [Inter v4.1](https://github.com/rsms/inter/blob/v4.1/LICENSE.txt) |
| Noto Sans SC: `templates/motion-design-promo/assets/fonts/NotoSansSC-*.woff2` (I18nA/B/C at 400 and 800; 6 files) | Copyright 2014–2021 Adobe, Reserved Font Name "Source"; version 2.004-H2 | [NotoSansSC-OFL.txt](templates/motion-design-promo/assets/fonts/NotoSansSC-OFL.txt); [official Google Fonts notice](https://github.com/google/fonts/blob/main/ofl/notosanssc/OFL.txt) |
| Noto Sans SC: `examples/motion-language/assets/NotoSansSC-Study-700.ttf` | Same copyright and version; Google Fonts text subset with its download request retained in [font-source.json](examples/motion-language/assets/font-source.json) | Existing [OFL.txt](examples/motion-language/assets/OFL.txt) |
| Plus Jakarta Sans: `templates/product-launch-lavender/assets/fonts/PlusJakartaSans-*.woff2` (600 and 800; 2 files) | Copyright 2020 The Plus Jakarta Sans Project Authors; version 2.071 | [PlusJakartaSans-OFL.txt](templates/product-launch-lavender/assets/fonts/PlusJakartaSans-OFL.txt); [official Google Fonts notice](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt) |

Google Sans is assessed here by the **actual bundled 2025 font**, not by older restrictions associated with Google branding fonts. Its embedded OFL URL and project identity agree with the current official OFL distribution. This does not grant rights to unrelated Google logos, Product Sans files, or other font versions.

Keep the applicable copyright and OFL notices with redistributed font files. Fonts remain under OFL, not Apache-2.0; follow the OFL conditions for modification and reserved names. Runtime family aliases are not evidence that the font binaries were renamed. A future replacement or newly generated subset should retain its own download URL, hash, and license.

### System font references

Some files name platform fonts without bundling their binaries:

| File | References |
| --- | --- |
| `assets/tapvid-cta.svg` | Arial, PingFang SC, Microsoft YaHei |
| `runtime/web/index.html` | `-apple-system`, BlinkMacSystemFont, Segoe UI |
| `styles/bold-pulse/style.md` | Arial Black as a suggested fallback |

These references do not make those platform fonts open source or authorize copying their files into the repository. For a fully bundled font setup, use an appropriately licensed OFL family such as the Inter/Noto Sans SC files above and check layout after substitution. Microsoft's distinction between rendered graphics and redistribution of Windows font files is documented in its [font licensing FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq). Other families suggested in style guides, including Manrope and Archivo, are not bundled here.

## SaaS demo and brand assets

Product and company names identify the demonstrated products; inclusion does not imply endorsement. Website captures may contain photographs, artwork, customer material, or other components with separate rights. No website-wide redistribution grant is recorded for the following demo assets. **Permission pending** means the maintainer needs a suitable grant or a replacement before presenting these assets as freely reusable material.

| Files | Recorded source and use | Status |
| --- | --- | --- |
| `assets/gallery/photoroom-promo.gif` | Photoroom concept demo, derived from `photoroom-promo-v3.mp4`; source hash and segment in [gallery sources](assets/gallery/sources.json) | Permission pending for underlying UI, brand, photographs, and other demo content; exact capture/license record is not retained |
| `assets/gallery/canva-launch.gif` | Canva concept demo, derived from `canva-launch-final.mp4`; same source register | Permission pending for underlying UI, brand, and demo content |
| `assets/gallery/tapvid-launch.gif` | TapVid concept demo, derived from `tapvid-pipeline-test-01-1080p.mp4`; same source register | Permission pending; the source-video record alone does not establish rights to every embedded item |
| `templates/capsule-flow/assets/media/case-*.jpg` (12 files) | TapVid homepage featured-example thumbnails; exact URLs and titles in [downloads.json](templates/capsule-flow/assets/research/downloads.json) | Permission pending; confirm rights to the featured examples as well as the website presentation |
| `templates/capsule-flow/assets/media/brand.png`, `templates/capsule-flow/assets/media/fix.png`, and `templates/capsule-flow/assets/media/demo-*.png` | TapVid homepage illustrations and interactive-preview screenshots; [capture records](templates/capsule-flow/assets/research/demo-capture.json) | Permission pending |
| `templates/capsule-flow/assets/media/input-source.png` | Frame at 4.5 s from [TapVid's landing video](https://tapvid.ai/videos/landing-tob-many-ways.mp4) | Permission pending |
| `templates/capsule-flow/assets/media/showcase.mp4` | Silent interval 2–9.5 s from [TapVid's Lifespan example](https://tapvid.ai/images/landing-tob/demo/render/lifespan-final.mp4) | Permission pending; it is a website example, not a result generated for this template |
| `templates/capsule-flow/brand-kit/logo.svg` | [TapVid logo](https://tapvid.ai/logo/logo-landscape.svg); [brand record](templates/capsule-flow/brand-kit/sources.json) | Brand asset; no trademark or general reuse license is granted here |
| `assets/tapvid-cta.svg` | Repository promotional banner referring to TapVid | Project-authored SVG markup follows the project license; the product identity and any brand elements are not a trademark grant |

If the maintainer controls a listed product's assets, record that authority and its scope, including whether others may redistribute the raw files and modify them. Do not assume ownership of third-party examples merely because they appear on that product's website. The GIF previews above contain no audio; licensing their visuals does not establish rights to the source videos' music.

## Third-party visual references

The reference images below support composition and motion study. That intended use does not, by itself, establish permission to redistribute the images or the underlying films.

| Files | Recorded origin | Status |
| --- | --- | --- |
| `assets/apple-software-family-video-reference-storyboard-lossless.png`, `assets/langease-multilingual-video-reference-storyboard-lossless.png`, `assets/msportal-ai-product-video-reference-storyboard-lossless.png`, `assets/teamble-ai-feedback-video-reference-storyboard-lossless.png` | Reference screenshots/collages, identified in [the reference guide](references/eval.md) as Apple, LangEase, MSPortal.ai, and Teamble material | Permission pending; original publication URLs, creators, and redistribution grants are not fully recorded |
| `assets/headline-reveal-and-surrounding-cards-sequence-lossless.png`, `assets/intro-blue-gradient-title.png`, `assets/showcase-cards-around-headline.png` | Composition references described in the same guide | Source identity and permission pending |
| `assets/motion/c01-langease-progress-to-completion.png`, `assets/motion/c02-langease-list-to-multilingual-cards.png` | Frames from `Best SaaS Product Launch Ad Video.mp4`; source hash and timestamps in [motion sources](assets/motion/sources.json) | Permission pending; the retained filename is not a license |
| `assets/motion/c03-google-vids-attachment-to-outline.png`, `assets/motion/c04-google-vids-search-to-canvas.png` | Frames from `Introducing Google Vids`; source filename, hash, and timestamps in the same register | Permission pending for the video frames and included material |

## Project-owned materials

The maintainer owns the following materials. They are not third-party assets awaiting permission. Style documentation and template code are covered by the project's Apache-2.0 license; the posters, covers, and cursor are project-owned artwork.

| Files | Ownership and provenance |
| --- | --- |
| `styles/apple-liquid-glass/poster.png`, `styles/bold-pulse/poster.png`, `styles/interface-theatre/poster.png`, `styles/soft-relief/poster.png` | Maintainer-owned style posters |
| `styles/swiss-motion/cover.jpg`, `styles/swiss-motion/style.md` | Maintainer-owned cover and style text |
| `styles/tapvid-playful-pop/cover.png`, `styles/tapvid-playful-pop/style.md` | Maintainer-owned cover and style text |
| `templates/capsule-flow/brand-kit/finger.svg` | Maintainer-owned cursor artwork |
| `templates/motion-design-promo/src/boards/*.jsx`, `templates/motion-design-promo/src/boards/*.json`, `templates/motion-design-promo/src/design.js` | Maintainer-owned template code licensed under Apache-2.0; file hashes are recorded in [the source manifest](templates/motion-design-promo/records/source-manifest.json) |

## Generated examples

| Files | Provenance and boundary |
| --- | --- |
| `templates/product-launch-lavender/assets/mock/*.png` and `assets/gallery/product-launch-lavender.gif` | The four fictional Forma UI mocks were generated with OpenAI image generation; see [the source manifest](templates/product-launch-lavender/records/source-manifest.json). The GIF depicts the template built with these mocks. They are illustrative content, not captured SaaS pages or customer evidence. The record does not identify a separate third-party stock license for these mocks. |
| `templates/motion-design-promo/assets/media/*.png` | Fictional SHIQU products, people, pages, and logo were recorded as generated image assets in [the source notes](templates/motion-design-promo/assets/sources.md); file hashes are retained in [the source manifest](templates/motion-design-promo/records/source-manifest.json). They do not represent real customers or product facts. |

## Music

All three bundled WAV files are **permission pending**. Their current metadata contains encoder information but no track title, composer, publisher, or license. Editing, shortening, changing gain, or removing speech does not supply the missing authorization.

| File | Duration and retained provenance | Required resolution |
| --- | --- | --- |
| `templates/capsule-flow/assets/audio/capsule-flow-bgm-edit.wav` | 82.048625 s; reference music edited for timing, EQ, gain, and speech removal. [Audio edit](templates/capsule-flow/records/audio-edit.json) and [BGM recipe](templates/capsule-flow/records/bgm-rework.json) retain source hashes and operations. | Identify the track and rights holder; obtain terms covering use in videos, modification, and distribution of the WAV with the template, or replace it |
| `templates/motion-design-promo/assets/audio/music-master.wav` | 20 s; derived from `original-music.wav` in the source project. [Source notes](templates/motion-design-promo/assets/sources.md) already record the missing music license. | Same; no public redistribution grant is retained |
| `templates/product-launch-lavender/assets/audio/reference.wav` | 31 s; reference WAV, played at gain 0.75. [Source manifest](templates/product-launch-lavender/records/source-manifest.json) records its use. | Same; no author, original download URL, or license is retained |

For replacements, choose music whose written terms cover both the rendered video and **redistribution of the audio file in an editable open-source template**. A license allowing a finished video may not allow shipping the raw track. Original music with an explicit grant or suitable CC0 material can simplify this; retain the actual grant, source, author, and file hash. A silent template is another option. Replacement requires checking timing and audio assertions; adding this notice does not alter or validate any soundtrack.

The Capsule Flow records state that intermediate/reference audio remains in Git history. Review that history separately before publishing an asset-cleared distribution; removing the current file would not remove historical copies.

## Software dependencies and runtime snapshots

React, React DOM, Vite, and tsx retain their MIT licenses. Playwright and TypeScript retain Apache-2.0. Their package distributions and lockfiles identify versions and upstream licenses; transitive dependencies retain their own notices. This repository's project license does not replace them. FFmpeg and Chromium are installed separately, and their binaries are not included in this repository's tracked files.

The three `templates/*/vendor/launch-video-maker-runtime-0.1.0.tgz` files are snapshots of this project's runtime, not third-party stock assets. The existing archives predate the explicit package license metadata and do not contain a LICENSE file. Include the project LICENSE when redistributing these snapshots independently, and add it inside the archives when repackaging them. This review does not rebuild the snapshots or change their pinned hashes.

## Completing the pending records

For each pending third-party asset, retain its repository path, creator/rights holder, original source, exact license or permission evidence, permitted redistribution/modification scope, required attribution, and hash. Confirm the grant or replace/remove the asset before treating it as cleared for public redistribution. Keep this notice and applicable license texts with any distribution containing the corresponding third-party material.
