# Motion Design Promo migration

User-approved scope: add `templates/motion-design-promo/`, preserve the established 20-second animation and rhythm, document reuse, and verify the unified runtime. No MP4 export or source-project mutation.

Implementation: retain the six source JSX boards and Design data; use a typed film entry for integer frames, declared local assets, per-weight font aliases, explicit SVG background readiness, and one shared 20-second music event. The current source props and six-images export are the material baseline. Preserve source frame-center visual sampling while runtime/audio remain zero-based.

Validation: fail before a film entry exists; then check the six scene intervals and fourteen action boundaries, all 1200 frames, repeat/reverse seeks, shared PCM sample equality, Player play/pause/seek/resume, TypeScript compilation, a fresh install outside the repository, same-frame reference comparison, and independent read-only review. Runtime verification is separate from commercial visual/listening approval. Record results in `docs/validation-motion-design-promo.md`.
