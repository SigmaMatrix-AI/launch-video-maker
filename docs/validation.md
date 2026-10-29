# Validation guide

Run checks from the repository root after installing the tools in [Runtime setup](../references/runtime-setup.md).

```sh
npm run build
npm test
# Optional 60-second encoded audio/video synchronization probe:
npm run test:long
```

The default suite covers frame addressing, browser readiness and cancellation, media decoding and mixing, actual encoding, review evidence checks, and independently installed projects. The long synchronization probe is opt-in. Technical checks do not establish visual quality, actual listening, or independent commercial acceptance; follow [Quality assurance](../references/tech.md#quality-assurance) for those checks.

## Motion-language studies

```sh
npx tsx --test runtime/test/motion-studies.test.ts
```

These tests cover the five Good / Bad case pairs, standalone generation, random/reverse frame access, local fonts, final copy, and stable reading frames. They do not certify normal-speed readability, rhythm, or a premium feel. Run the [editable examples](../examples/motion-language/README.md) and assess actual playback when selecting a technique.

## Template checks

Run these from the corresponding template directory:

| Template | Checks |
| --- | --- |
| [Product Launch Lavender](../templates/product-launch-lavender/template.md) | `node scripts/check-showcase.mjs`, `node scripts/check-star.ts`, `npm run validate`; add `-- --full` for all 930 frames |
| [Motion Design Promo](../templates/motion-design-promo/template.md) | `npm run validate`; add `-- --full` for all 1200 frames |
| [Capsule Flow](../templates/capsule-flow/template.md) | `npm run prepare`, sample the documented continuity frames with `npm run still`, then check playback |

Keep the retained source manifests, license notes, template validation summaries, and regression baselines. In particular, Lavender's `records/runtime-full.json` is read by its validator. Write new inspection PNGs and reports under `.lvm/validation/`; do not add them to `records/` by default. Repeated captures and logs cannot replace full viewing/listening, and export requires the user's request.

Historical implementation plans, skill snapshots, experiment transcripts, and superseded inspection artifacts remain available in Git history. They are not additional skill entry points or current acceptance results.
