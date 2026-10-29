# Motion language: time, attention, and text

Read this page in stage three and choose techniques for the confirmed content. Stage one describes only the motion character; stage two confirms only copy, order, and emphasis. Examples are neither an extra approval step nor an effects checklist every film must complete. Continue recording quality issues with [E01–E10](eval.md).

## Arrange time before choosing curves

| Scale | Good | Bad | Production decision |
| --- | --- | --- | --- |
| Action | A brief click, a spacious panel expansion, and a precisely settled result | Every object moves at one constant speed or uses the same fast slide-in | How does the object start, progress, and slow down/settle? |
| Shot | Input, operation, and result hand off in sequence, with reading space for key content | A new focus arrives before the previous reading task ends | After which landing point can the viewer begin to understand? |
| Full film | Compact operations open into an output showcase, followed by a clear ending | One speed throughout, or every shot slows down together | Where is the emphasis, and which processes can be compressed? |

Breathing room involves time allocation, speed changes, and releasing attention. Fast motion can be forceful; constant-speed scans and steady movement also have uses. A particular curve is not inherently a defect. Judge the actual effect rather than substituting global slowdown or springs on every object for choreography.

For important segments, briefly record **rhythm intent, key landing points, reading windows, and continuity into the next shot** in `storyboard.md`. For example: "Compact operations, a spacious result; the summary finishes expanding at the landing point; allow comprehension time once the key points are clear; the same result moves into sharing." This is a production note, not a required table for every shot or a fixed entrance/hold/exit ratio.

Readable time begins when the key information is clearly presented; the first character's entrance does not make the whole sentence readable. Text length, type size, aspect ratio, and visual distractions affect the time needed. Letting the subject stop completely is valid; the background need not float continuously. For films with sound, incorporate musical phrases and audible landing points; silent examples support visual judgments only.

## Establish the text's expressive purpose first

Choose sentence meaning, emphasis words, and semantic groups before deciding on motion and its relationship to the next shot. For Chinese, prioritize phrase grouping and preserve the meaning of brand terms, numbers with units, and punctuation. A text shot usually needs only one main technique; keep a consistent character across the film and increase intensity for key reveals.

| Example | Useful for | Good / Bad | Adjustable elements / boundaries |
| --- | --- | --- | --- |
| [R01 Rhythm](../examples/motion-language/src/rhythm.tsx) | A result that must be understood after an operation | Brief action → spacious result → reading / equal-length segments, with a late result cut away too soon | Adjust action and reading allocation; do not treat example durations as universal standards |
| [T01 Semantic reveal](../examples/motion-language/src/text-reveal.tsx) | Building a sentence's meaning in layers | Progress through "Turn complex information / into / clear insights" / every character bounces at the same rhythm | Groups, intervals, movement, emphasis words; unsuitable for making viewers wait through long paragraphs character by character |
| [T02 Keyword replacement](../examples/motion-language/src/text-replace.tsx) | Expressing several choices within one sentence structure | Keep "Turn ideas into" and replace documents/presentations/creations / restart the whole sentence each time | A finite word sequence, width, transition and reading time; do not force it where change has no meaning |
| [T03 Focus on the key point](../examples/motion-language/src/text-focus.tsx) | Moving from setup to one key point | Focus has a direction and ends on the result / focus changes in an endless loop | Clarity, emphasis, final landing point; settled text must be readable, and blur must not conceal low resolution |
| [T04 Text handoff into the product](../examples/motion-language/src/text-handoff.tsx) | An object in the copy can naturally become product input or output | The same "launch plan" enters the search field / the title clears and the UI slides in independently | Object position and size, container reveal, and result timing; do not invent capabilities for continuity |

For the principles behind T01–T03, consult the official React Bits [Split Text](https://reactbits.dev/text-animations/split-text), [Rotating Text](https://reactbits.dev/text-animations/rotating-text), and [True Focus](https://reactbits.dev/text-animations/true-focus). The local implementation does not copy their code and computes from the current frame; webpage scroll, pointer, or wall-clock triggers cannot directly supply video time.

## Run only the comparisons you need

From the repository root, after installing dependencies and building, run:

```bash
npx tsx examples/motion-language/create-study.ts films/t01-good --case T01 --variant good
cd films/t01-good
npm ci
npm run preview -- --open
```

For the other version, use a new directory and `--variant bad`. See the [Example guide](../examples/motion-language/README.md) for the full entry point and asset notes. Generated projects include editable source and local assets; do not rebuild the user's whole film to apply a technique. Check font glyph coverage when changing text.

Each pair shares copy, order, fonts, assets, aspect ratio, total duration, and silence; the variable is the technique's timing or expression. These are fictional method demonstrations, and `good` is a design-intent label, not certification that it "looks expensive." Bad is not a judgment of the original reference film. See the [Validation guide](../docs/validation.md#motion-language-studies) for the automated checks and their limits.

## Watch, fix, and rewatch

Watch at normal speed to judge whether there is time to read, whether the viewer knows where to look, and which change is remembered. Use stills for layout and continuous windows for text overlap, clipping, settling, and continuity. If only stills or technical playback logs were observed, keep rhythm perception unverified. Precise holds, easing, and sound in reference films require fresh continuous observation; they cannot be inferred from old extracted frames.

Record local issues as "range + observation + E number/method ID + change + rewatch condition," for example: `4.1–5.0s / Replacement word changes before it can be read / E09/T02 / Preserve the sentence body and delay the next word / Every keyword can be read during normal playback`. Revise the current segment and both adjacent seams, and recheck the mix if sound is present; rewatch the full film before delivery. For strict template replication, follow the agreed scope first.
