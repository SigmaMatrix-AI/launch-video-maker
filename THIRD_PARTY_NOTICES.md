# Third-party notices

Project-authored source code and documentation are licensed under [Apache-2.0](LICENSE). Third-party software, fonts, music, screenshots, recordings, illustrations, logos, and other brand assets retain their own terms. The Apache license does not grant rights to third-party material or trademarks. Maintainer-owned materials are identified separately below and do not require third-party permission.

This inventory covers files tracked in this repository as reviewed on **2026-11-02**. Generated projects under `films/`, local caches, and deleted files in Git history are outside the current-file inventory. Source attribution, file hashes, and public website availability do not establish redistribution permission. Entries marked **permission pending** identify gaps in the retained records; this notice does not supply the missing permission.

## Font test fixture

The browser font-readiness test uses one unchanged Inter Regular font (23,804 bytes). It is a technical fixture, not a bundled production font library.

| File | Copyright and version evidence | License supplied with the file |
| --- | --- | --- |
| `runtime/test/fixtures/fonts/Inter-400.woff2` | Copyright 2016 The Inter Project Authors; version 4.001 | [Inter-OFL.txt](runtime/test/fixtures/fonts/Inter-OFL.txt), from [Inter v4.1](https://github.com/rsms/inter/blob/v4.1/LICENSE.txt) |

Keep the copyright and SIL Open Font License 1.1 notice with the font when redistributing it. The font remains under OFL, not Apache-2.0.

### System font references

Some files name platform fonts without bundling their binaries:

| File | References |
| --- | --- |
| `assets/tapvid-cta.svg` | Arial, PingFang SC, Microsoft YaHei |
| `runtime/web/index.html` | `-apple-system`, BlinkMacSystemFont, Segoe UI |
| `styles/bold-pulse/style.md` | Arial Black as a suggested fallback |

These references do not make those platform fonts open source or authorize copying their files into the repository. For a fully bundled font setup, use an appropriately licensed OFL family such as Inter or Noto Sans SC and check layout after substitution. Microsoft's distinction between rendered graphics and redistribution of Windows font files is documented in its [font licensing FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq). Other families suggested in style guides, including Manrope and Archivo, are not bundled here.

## SaaS demo and brand assets

Product and company names identify the demonstrated products; inclusion does not imply endorsement. Website captures may contain photographs, artwork, customer material, or other components with separate rights. No website-wide redistribution grant is recorded for the following demo assets. **Permission pending** means the maintainer needs a suitable grant or a replacement before presenting these assets as freely reusable material.

| Files | Recorded source and use | Status |
| --- | --- | --- |
| `assets/gallery/photoroom-promo.webp` | Photoroom concept demo, derived from `photoroom-promo-v3.mp4`; source hash and segment in [gallery sources](assets/gallery/sources.json) | Permission pending for underlying UI, brand, photographs, and other demo content; exact capture/license record is not retained |
| `assets/gallery/canva-launch.webp` | Canva concept demo, derived from `canva-launch-final.mp4`; same source register | Permission pending for underlying UI, brand, and demo content |
| `assets/gallery/tapvid-launch.webp` | TapVid concept demo, derived from `tapvid-pipeline-test-01-1080p.mp4`; same source register | Permission pending; the source-video record alone does not establish rights to every embedded item |
| `assets/tapvid-cta.svg` | Repository promotional banner referring to TapVid | Project-authored SVG markup follows the project license; the product identity and any brand elements are not a trademark grant |

If the maintainer controls a listed product's assets, record that authority and its scope, including whether others may redistribute the raw files and modify them. Do not assume ownership of third-party examples merely because they appear on that product's website. The animated previews above contain no audio; licensing their visuals does not establish rights to the source videos' music.

## Third-party visual references

The reference images below support composition and motion study. That intended use does not, by itself, establish permission to redistribute the images or the underlying films.

| Files | Recorded origin | Status |
| --- | --- | --- |
| `assets/references/apple-software-family-video-reference-storyboard-lossless.webp`, `assets/references/langease-multilingual-video-reference-storyboard-lossless.webp`, `assets/references/msportal-ai-product-video-reference-storyboard-lossless.webp`, `assets/references/teamble-ai-feedback-video-reference-storyboard-lossless.webp` | Reference screenshots/collages, identified in [the reference guide](references/eval.md) as Apple, LangEase, MSPortal.ai, and Teamble material | Permission pending; original publication URLs, creators, and redistribution grants are not fully recorded |
| `assets/references/headline-reveal-and-surrounding-cards-sequence-lossless.webp`, `assets/references/intro-blue-gradient-title.webp`, `assets/references/showcase-cards-around-headline.webp` | Composition references described in the same guide | Source identity and permission pending |
| `assets/motion/c01-langease-progress-to-completion.webp`, `assets/motion/c02-langease-list-to-multilingual-cards.webp` | Animated excerpts from `Best SaaS Product Launch Ad Video.mp4`; source hash and timestamps in [motion sources](assets/motion/sources.json) | Permission pending; the retained filename is not a license |
| `assets/motion/c03-google-vids-attachment-to-outline.webp`, `assets/motion/c04-google-vids-search-to-canvas.webp` | Animated excerpts from `Introducing Google Vids`; source filename, hash, and timestamps in the same register | Permission pending for the video frames and included material |

## Project-owned materials

The maintainer owns the following materials. They are not third-party assets awaiting permission. Style documentation is covered by the project's Apache-2.0 license; the posters and covers are project-owned artwork.

| Files | Ownership and provenance |
| --- | --- |
| `styles/apple-liquid-glass/poster.webp`, `styles/bold-pulse/poster.webp`, `styles/interface-theatre/poster.webp`, `styles/soft-relief/poster.webp` | Maintainer-owned style posters |
| `styles/swiss-motion/cover.jpg`, `styles/swiss-motion/style.md` | Maintainer-owned cover and style text |
| `styles/tapvid-playful-pop/cover.webp`, `styles/tapvid-playful-pop/style.md` | Maintainer-owned cover and style text |

## Generated examples

| File | Provenance and boundary |
| --- | --- |
| `assets/gallery/product-launch-lavender.webp` | The animation shows fictional Forma UI mocks generated with OpenAI image generation. It is illustrative content, not captured SaaS pages or customer evidence. The video source, hash, segment, and content provenance are recorded in [gallery sources](assets/gallery/sources.json). No separate third-party stock license is recorded for the mocks. The preview contains no audio. |

## Software dependencies

React, React DOM, Vite, and tsx retain their MIT licenses. Playwright and TypeScript retain Apache-2.0. Their package distributions and lockfiles identify versions and upstream licenses; transitive dependencies retain their own notices. This repository's project license does not replace them. FFmpeg and Chromium are installed separately, and their binaries are not included in this repository's tracked files.

## Completing the pending records

For each pending third-party asset, retain its repository path, creator/rights holder, original source, exact license or permission evidence, permitted redistribution/modification scope, required attribution, and hash. Confirm the grant or replace/remove the asset before treating it as cleared for public redistribution. Keep this notice and applicable license texts with any distribution containing the corresponding third-party material.
