# Asset sources

Official TapVid assets were collected from https://tapvid.ai. [downloads.json](research/downloads.json) preserves original URLs, filenames, and titles; [demo-capture.json](research/demo-capture.json) preserves screenshot states and geometry. The raw public-site inventory is retained in [inventory.json](research/inventory.json).

- `media/case-0…11.jpg`: full-resolution official featured-example thumbnails for the gallery and inspiration montage. They imply neither customer endorsement nor a connection to the illustrative product-brief.pdf.
- `media/brand.png` and `media/fix.png`: official homepage feature illustrations, not recorded account use.
- `media/demo-*.png`: public homepage interactive-preview screenshots, with capture state, viewport, scale, and timestamps recorded above. No credentials or user content.
- `media/input-source.png`: frame at 4.5s from https://tapvid.ai/videos/landing-tob-many-ways.mp4 (1280×720, 24fps, 42.875s, no audio). The original video and exploratory cuts are not distributed.
- `media/showcase.mp4`: source interval [2,9.5) of https://tapvid.ai/images/landing-tob/demo/render/lifespan-final.mp4 (1280×720, 30fps, original 44.5s), at 1× with audio removed. The same official Lifespan example appears in the outline/script/edit screenshots; it is not a generated result of the illustrative product-launch prompt.
- `audio/capsule-flow-bgm-edit.wav`: edited background music. The reference mix had its spoken interval patched with another part of the same music; [audio-edit.json](../records/audio-edit.json) records that operation. [bgm-rework.json](../records/bgm-rework.json) records the pitch-preserving timing, EQ, gain, fade, source hash, and output encoding. Intermediate WAVs and analysis logs remain in Git history. Subjective listening remains unverified; this provenance does not establish public-use or redistribution permission.

The neutral PDF/DOC/IMG/LINK graphics and composer are illustrative reconstructions. Logos and font provenance are documented in [brand sources](../brand-kit/sources.md). Only current film assets and necessary provenance are shipped.
