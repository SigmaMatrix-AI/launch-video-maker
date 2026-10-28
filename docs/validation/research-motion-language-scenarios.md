# Research / motion language behavioral scenarios

Use the selected skill version and original input materials. Do not give an evaluating agent the expectations below. Save actions and output, not a self-reported compliance score. Confirmations in these scenarios are synthetic test inputs, never real production approval.

| ID | Input | Observable expectation |
| --- | --- | --- |
| B01 | Gather local website; request a 20-second autonomous launch film, research and direction advice first; no image/film generation | Actually inspect relevant content beyond hero, interactive states and related pages; produce sourced findings, available visuals and gaps |
| B02 | One site entry is unavailable; alternate input restricts work to supplied screenshots | Record coverage, avoid repeated failing visits, work from available evidence; don't invent unseen UI or force web research |
| B03 | Direction B selected; user requests Search → Summarize → Share feature tour | Keep the valid structure, offer evidence-based expressions; do not force a single-case problem story |
| B04 | Direction selected; request story draft. Alternate: explicitly delegate direction and story | Content-only stage 2; delegation continues without repeated approval; motion remains stage 3 |
| B05 | Confirmed script; independent text “让 Gather 在 3 秒内找到重点”; 3 seconds is shot time, not performance | Explain grouping, emphasis, readable time and handoff; preserve brand/units; don't mechanically animate all glyphs |
| B06 | Strict template composition/timing; local feedback asks for a more readable result | Preserve agreed template; identify conflicts and offer a minimal adjustment, not a new workflow |
| B07 | Legacy project without research/script; existing references and actionRanges | Reuse real records; merge only existing new files; preserve documents/ranges, never invent approval |
| B08 | Only stills and playback logs; real demos or perceptual viewing absent | State evidence limits; do not claim full dynamics/audio or substitute a toy example for real-demo verification |

## Fixture

Serve `runtime/validation/research-site/` locally with an available loopback port. The evaluator gets only the URL, request and the selected skill. Do not let it read the fixture source. Observe homepage scrolling, relevant navigation and demonstrated states. The site is explicitly fictional and must never become real product proof.

Reviewer key: the overview is below the hero; the two buttons expose summary/source examples; a later section reveals permissions after entering the viewport; feature and case pages constrain summarization and sharing. Recruiting and unavailable workspace links are not required research destinations. More pages are not automatically better.

## Comparison method

The baseline copies are under ignored `films/research-motion-language-validation/baseline/`, with hashes in `manifest.json`. Test inputs stay fixed. Judge website exploration through actual actions and evidence, typography through a concrete production choice, and rendered quality through normal-speed viewing. One agent run is a behavioral sample, not a reliability estimate.

R01 and T01–T04 use equal content, order, font, assets, duration and audio conditions per pair. Technical testing verifies rendering and portability; it does not decide which film looks better. Real demos require separately identified source/version and retained original output.
