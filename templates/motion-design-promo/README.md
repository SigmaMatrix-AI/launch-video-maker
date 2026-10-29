# Motion Design Promo

An independently installable 20-second / 1280×720 / 60 fps React template. Read [template.md](template.md) first to understand motion, assets, and product adaptation.

```sh
npm ci --ignore-scripts
npm run setup
npm run prepare
npm run validate
npm run validate -- --full
```

setup installs the pinned Chromium and checks FFmpeg. If the browser is already installed, prepare can run directly. validate does not generate video files; detailed reports and PNGs are in `.lvm/validation/`. Full checks read assets and capture screenshots frame by frame; duration varies with machine performance.

When the user requests viewing: `npm run preview -- --open`. For a specific frame: `npm run still -- 487 .lvm/frame-487.png`. Only when export is explicitly requested: `npm run render -- exports/motion-design-promo.mp4`.

The project includes a standalone runtime tarball and package-lock; npm ci still works after moving it outside the repository, without the original video project. Dependency downloads and Chromium installation require network access; visual and audio playback do not request external services.

JSX preserves the tuned source animation; film.tsx is the TypeScript integration layer. Runtime configuration is in film.tsx, content and asset mappings in src/content.json, fonts in src/fonts.json, and visual data in src/design.js. Run prepare again and restart the service after edits; validation outputs must not be written back to source directories.
