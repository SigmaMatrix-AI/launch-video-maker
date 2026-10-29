import { test } from "node:test";
import assert from "node:assert/strict";
import { planSamples, ratesEquivalent } from "../src/review/sampling.js";
import { makeManifest } from "./review-fixtures.js";
test("single frame and end boundary", () => {
  const s = planSamples({
    ...makeManifest().film,
    durationInFrames: 1,
    scenes: [],
  });
  assert.deepEqual(s.frames, [0]);
  assert.deepEqual(s.windows, [{ start: 0, end: 1 }]);
});
test("fractional overview", () => {
  assert.deepEqual(
    planSamples({ ...makeManifest().film, fps: { num: 30000, den: 1001 } })
      .overviewFrames,
    [0, 14, 29, 44, 59],
  );
});
test("overlapping scenes merge dense windows", () => {
  const s = planSamples({
    ...makeManifest().film,
    scenes: [
      { id: "a", start: 0, end: 40 },
      { id: "b", start: 30, end: 60 },
    ],
  });
  assert.deepEqual(s.windows, [
    { start: 0, end: 9 },
    { start: 22, end: 49 },
    { start: 52, end: 60 },
  ]);
  for (const w of s.windows)
    for (let i = w.start; i < w.end; i++) assert.ok(s.frames.includes(i));
  assert.equal(new Set(s.frames).size, s.frames.length);
  assert.ok(s.frames.every((f) => f >= 0 && f < 60));
});
test("explicit action ranges reject overflow", () =>
  assert.throws(
    () => planSamples(makeManifest().film, [{ start: 58, end: 61 }]),
    /range/i,
  ));
test("budget never silently thins", () =>
  assert.throws(
    () =>
      planSamples({ ...makeManifest().film, durationInFrames: 1201 }, [
        { start: 0, end: 1201 },
      ]),
    /1200/,
  ));

test("frame rates compare exact rational values", () => {
  assert.equal(ratesEquivalent("30/1", { num: 60, den: 2 }), true);
  assert.equal(ratesEquivalent("30000/1001", { num: 60000, den: 2002 }), true);
  assert.equal(ratesEquivalent("30/1", { num: 30000, den: 1001 }), false);
  assert.equal(ratesEquivalent("0/0", { num: 30, den: 1 }), false);
});
