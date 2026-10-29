# Tell this product's story with a template

A template provides designed motion, spatial relationships, and rhythm. The whole film still serves the current product: understand its users, uses, and value first, then decide which template techniques help viewers understand and remember it.

Use the [production workflow](pipeline.md) for product research and [eval.md](eval.md) for UI, motion, editing, and acceptance; apply them within the agreed template adaptation scope without adding production stages.

## 1. Understand the product first

Visit product pages, documents, actual interfaces, or source code to reconstruct a real input→key operation→result usage path. Identify the main audience, core value, required content, and available evidence; simultaneously save real screenshots, recordings, and representative cases with sources. Collect the logo, theme color, and explicit brand guidelines, and establish aspect ratio, duration, language, audio, and delivery requirements.

Briefly record product findings, asset paths, sources, and the basis for use in `records/brief.md`. Reuse valid existing product research; sample features, metrics, and customer relationships in the template cannot substitute for product facts.

## 2. Understand what makes the template compelling

Read the candidate `templates/<id>/template.md`, watch available sample films, then read the source for the segments you will use. Observe how the subject appears, changes, and settles; how shots reveal information; how music drives the sequence; and how one segment becomes the next segment's starting point. Distinguish observations of the original film from approximations in the current source.

Choose a template based on product asset types and the main promotional story. For example, “one result pulls back into a wall” conveys scale, while “an input container expands into a workspace” conveys intent becoming execution. Use the whole template, complete sections, or local techniques; a texture-only reference does not automatically expand into shot-by-shot replication.

When users explicitly request replication, original-film sequencing, or content-only replacement, retain composition, action, camera work, and rhythm within the agreed scope. Explain tradeoffs when product truth, readability, or target specifications genuinely require changes. Without a specified fidelity scope, independently choose the approach that best expresses the product.

## 3. Put the product into motion and narrative

Find real content for the chosen segments: which input triggers a change, which result deserves enlargement, and which output can carry the climax. Preserve the template's strongest motion relationships while replacing product copy, UI, logos, and examples. Within the permitted adaptation scope, adjust sound, layout, click targets, camera, and readable holds. For strict replication, preserve the agreed arrangement and timing, and separately identify conflicts where content cannot fit.

`styles/<id>/style.md` can inspire typography, color, materials, and motion character; read only the resources needed, with no requirement for standardized fields or a switcher. Unify the directing approach around the product and reference, respecting explicit fidelity constraints. Preserve real content and third-party marks, organizing colors by their background, emphasis, status, and transition roles.

Validate the most important motion segment using real assets before expanding to the full film. When shortening is allowed, choose segments with complete actions and continuity, then reorganize setup and closure. Let the final visuals prove the product's value rather than merely replacing titles and leaving the original product's story intact.

## 4. Implement, refine, and deliver

Save borrowed code, necessary assets, and sources in `films/<project-id>/` or the designated directory, retaining the reference version; do not write changes back to the template. Record the scope used and important tradeoffs in `records/direction.md`, and actual shots and timing in `records/storyboard.md`.

Implement and check according to [tech.md](tech.md). When watching the full film, judge both whether the product story works and whether the chosen motion retains its refinement; for explicit replication tasks, also align each segment with the reference. The template's previous acceptance does not mean the new content has passed. Preview and export follow the delivery agreement in SKILL.md.

## The template package itself

A template package retains `template.md`, runnable source, necessary assets, dependencies, and source documentation. Its entry point explains the film structure, compelling motion relationships, asset requirements, editing locations, run instructions, and known limitations. Code follows the deterministic timing conventions in tech.md; new templates must be run and verified, not claimed to work on screenshots alone.
