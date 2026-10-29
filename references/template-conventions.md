# Tell this product's story with a template

A template provides designed motion, spatial relationships, and rhythm. The whole film still serves the current product: understand its users, uses, and value first, then decide which template techniques help viewers understand and remember it.

This route does not require three competing directions or story approval. Reuse [Product research](product-research.md) and the applicable production standards in [eval.md](eval.md); the autonomous route's E10 default text composition and motion examples do not override the agreed template layout, motion, or timing.

## 1. Understand the product first

Visit product pages, documentation, actual interfaces, or source code to understand the main relevant capabilities and available assets, then verify the chosen topic. Choose a feature tour, single feature, or continuing example according to user goals and the template arrangement. When showing operations, preserve the real relationship between inputs, actions, and results. Identify the audience, value, required content, and evidence; save relevant screenshots, recordings, illustrations, and outputs with their sources. Collect the logo, theme colors, and brand guidelines, and clarify aspect ratio, duration, language, audio, and delivery requirements.

Briefly record product findings, asset paths, sources, and the basis for use in `records/brief.md`. Reuse valid existing product research; sample features, metrics, and customer relationships in the template cannot substitute for product facts.

## 2. Understand what makes the template compelling

Read the candidate `templates/<id>/template.md`, watch available sample films, then read the source for the segments you will use. Observe how the subject appears, changes, and settles; how shots reveal information; how music drives the sequence; and how one segment becomes the next segment's starting point. Distinguish observations of the original film from approximations in the current source.

Choose a template based on product assets and the promotional storyline. For example, "one output pulls back into a wall" can express scale, while "an input container expands into a workspace" can express the move from intent to execution. In template reference mode, when a suitable template exists, preserve as much of the full arrangement as possible by default, adapting only content and style; if the user explicitly wants only certain segments, local techniques, or a particular finish, work within that scope.

Preserve composition, motion, shots, and rhythm within the agreed scope, including title-and-image layouts from the reference. If product truth, readability, or target specifications require adjustments, explain the specific conflict and smallest tradeoff. Do not break apart or redesign shots that must be preserved on the grounds of "avoiding slides."

## 3. Put the product into motion and narrative

Find real content for the chosen segments: which input triggers a change, which result deserves enlargement, and which output can carry the climax. Preserve the template's strongest motion relationships while replacing product copy, UI, logos, and examples. Within the permitted adaptation scope, adjust sound, layout, click targets, camera, and readable holds. For strict replication, preserve the agreed arrangement and timing, and separately identify conflicts where content cannot fit.

`styles/<id>/style.md` can inspire typography, color, materials, and motion character; read only the resources needed, with no requirement for standardized fields or a switcher. Unify the directing approach around the product and reference, respecting explicit fidelity constraints. Preserve real content and third-party marks, organizing colors by their background, emphasis, status, and transition roles.

Validate the most important motion segment using real assets before expanding to the full film. When shortening is allowed, choose segments with complete actions and continuity, then reorganize setup and closure. Let the final visuals prove the product's value rather than merely replacing titles and leaving the original product's story intact.

## 4. Implement, refine, and deliver

Save borrowed code, necessary assets, and sources in `films/<project-id>/` or the designated directory, retaining the reference version; do not write changes back to the template. Record the scope used and important tradeoffs in `records/direction.md`, and actual shots and timing in `records/storyboard.md`.

Implement and check according to [tech.md](tech.md). When watching the full film, judge both whether the product story works and whether the chosen motion retains its refinement; for explicit replication tasks, also align each segment with the reference. The template's previous acceptance does not mean the new content has passed. Preview and export follow the delivery agreement in SKILL.md.

## The template package itself

A template package retains `template.md`, runnable source, necessary assets, dependencies, and source documentation. Its entry point explains the film structure, compelling motion relationships, asset requirements, editing locations, run instructions, and known limitations. Code follows the deterministic timing conventions in tech.md; new templates must be run and verified, not claimed to work on screenshots alone.
