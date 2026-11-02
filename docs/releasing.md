# Release packaging

Run from a Git checkout with Python 3 available:

```sh
npm run test:release
npm run package:release
# Optional stricter growth budget:
npm run package:release -- --max-bytes 90000000
```

The command creates `dist/launch-video-maker.zip`, with a single
`launch-video-maker/` directory containing `SKILL.md` and its resources. Both the
sum of uncompressed file sizes and the actual ZIP must be strictly below
100,000,000 bytes. A failed build leaves an existing archive unchanged: always
check the exit code before uploading. `dist/` is ignored by Git.

The package reflects the current working tree, including new non-ignored files
and excluding deleted files; it does not require a commit. Candidates come from
`git ls-files --cached --others --exclude-standard`. Only the root metadata files (including `LICENSE` and `THIRD_PARTY_NOTICES.md`)
and `assets`, `styles`, `templates`, `references`, `examples`, `runtime`, `docs`,
and `scripts` directories are eligible. Local dependencies, render caches,
exports, and symlinks cannot enter the package. Review new files in those
eligible directories before building.

`assets/gallery/` remains in the repository but is excluded from the release.
Both READMEs use remote GitHub gallery links. `.gitattributes` also excludes the
gallery from `git archive` snapshots, but a normal folder ZIP does not honor
these rules. Use the release command for a size-checked package. A Git clone
still contains gallery and repository history; the size figures apply to the
release payload, not a clone.

## Lossless resource formats

- 41 static PNG resources use lossless WebP at the original dimensions, including
  alpha. Encoding: `cwebp -lossless -z 6 -exact -metadata all input.png -o output.webp`.
- The Motion Design Promo logo retains its original PNG. Its lossless WebP
  has identical FFmpeg RGBA values, but Chromium decodes its alpha differently;
  retaining PNG preserves the original rendered ending.
- Capsule Flow and Motion Design Promo integer PCM audio use FLAC:
  `ffmpeg -i input.wav -c:a flac -compression_level 8 output.flac`.
- Product Launch Lavender's 32-bit float PCM uses WavPack:
  `ffmpeg -i input.wav -c:a wavpack output.wv`. Converting that floating-point
  source to FLAC does not preserve every sample.
- The runtime decodes source audio with FFmpeg to 48 kHz stereo float PCM and
  serves the resulting `mix.wav` to the player. No browser WavPack playback is
  required. FFmpeg must include the FLAC and WavPack decoders.

[asset-compression.json](asset-compression.json) maps all 45 original resources
to their packaged replacements, with original and replacement SHA-256 hashes.
The original files are recoverable at its `baselineCommit`. Original source
manifests and historical approval/hash snapshots retain their provenance;
`packagedPath` / `packagedSha256` or `packagedAssets` identify current assets.
Historical approval records are not rewritten as new approvals.

For further changes, compare all decoded image RGBA bytes and source audio
float samples against the originals. Compare template keyframe captures and
complete mixed audio before and after the change, and run the template
validation scripts plus the root build/test suite. Encoding identity alone is
not a replacement for checking browser rendering and asset loading.

The [compression verification record](compression-validation.json) contains the
72 matching template keyframe hashes and three matching complete mixed-audio
hashes from the before/after check, plus the build-time test results.
