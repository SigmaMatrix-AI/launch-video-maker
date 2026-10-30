# Asset sources and licenses

Motion Design Promo includes a 20-second React animation, fictional SHIQU example images, fonts, and a soundtrack. File provenance and SHA-256 hashes are recorded in the [source manifest](../records/source-manifest.json).

- Animation code: six scene components in `src/boards/` and shared design settings in `src/design.js`, covering fourteen actions. This code is owned by the project maintainer and licensed under Apache-2.0.
- Example images: AI-generated products, people, pages, and a logo for the fictional SHIQU brand. Replace them with assets for the target product; they do not establish real product capabilities or customer endorsements.
- Audio: `audio/music-master.wav`, 48 kHz stereo, 20 seconds, derived from `original-music.wav` by trimming and processing. Public-use and redistribution permission is not recorded. Obtain permission covering video use and distribution of the audio file with the template, or replace the soundtrack. The code and font licenses do not cover this music.
- Fonts: Inter 400/800 and Noto Sans SC Chinese fallback A/B/C 400/800, licensed under SIL OFL 1.1. Keep [Inter-OFL.txt](fonts/Inter-OFL.txt) and [NotoSansSC-OFL.txt](fonts/NotoSansSC-OFL.txt) with the corresponding files.
- Runtime: a standalone `@launch-video-maker/runtime` 0.1.0 snapshot, with dependency versions pinned in `package-lock.json`. Project-authored runtime code is Apache-2.0. The archive does not contain a LICENSE file; include the repository LICENSE when distributing it independently. Third-party dependencies retain their own terms.
