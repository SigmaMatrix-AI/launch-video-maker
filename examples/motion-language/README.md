# Motion language studies

Small, editable Good / Bad comparisons for choosing a motion method. These are not full-film templates or a premium-quality benchmark. Both variants use the same copy, assets, duration, dimensions and silence; compare them at normal speed before deciding which communicates better.

From the skill repository (Node.js 24+, installed dependencies, built runtime):

```bash
npm run build
npx tsx examples/motion-language/create-study.ts films/study-r01-good --case R01 --variant good
cd films/study-r01-good
npm ci
npm run preview -- --open
```

Use a new destination for `--variant bad`. The generator refuses existing directories and creates a self-contained film with a runtime snapshot, local fonts and source records. It does not open a preview or export MP4. As with `lvm init`, creating its lockfile needs the existing npm dependencies to be reachable/cached.

| Case | Purpose | Source |
| --- | --- | --- |
| R01 | Short action, expansive result, reading time | [rhythm.tsx](src/rhythm.tsx) |
| T01 | Reveal semantic groups, then a keyword | [text-reveal.tsx](src/text-reveal.tsx) |
| T02 | Keep the sentence, replace its variable | [text-replace.tsx](src/text-replace.tsx) |
| T03 | Transfer focus once and settle | [text-focus.tsx](src/text-focus.tsx) |
| T04 | Carry one text object into the product | [text-handoff.tsx](src/text-handoff.tsx) |

The frame entry is `film.tsx`; each scene is a pure function of frame and variant. The generated `study-config.ts` selects the case. Change copy and motion in the copied project, retaining the local assets and provenance. Review the font character coverage before adding new text. See [sources](SOURCES.md) and the skill's dynamic guide for scope and selection advice.
