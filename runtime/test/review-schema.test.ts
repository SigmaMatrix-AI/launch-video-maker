import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseManifest,
  parseReport,
  createDraft,
} from "../src/review/schema.js";
import { makeManifest, makeReport } from "./review-fixtures.js";
test("reject malformed review inputs", () => {
  for (const input of [
    null,
    [],
    {},
    "old",
    { ...makeReport(), schemaVersion: 1 },
  ])
    assert.equal(parseReport(input).ok, false);
  for (const value of [NaN, Infinity, "7.5"]) {
    const r = makeReport();
    r.scores["设计与排版"].score = value as any;
    assert.equal(parseReport(r).ok, false);
  }
  const r = makeReport();
  r.scores["风格还原"].evidenceIds = "frame" as any;
  assert.equal(parseReport(r).ok, false);
  const f = {
    id: "f",
    dimension: "设计与排版",
    severity: "blocking",
    sceneId: null,
    range: { start: 0, end: 1 },
    description: "bad",
    fixTarget: "fix",
    evidenceIds: [],
    state: "open",
    resolution: null,
  };
  assert.equal(parseReport({ ...makeReport(), findings: [f, f] }).ok, false);
});
test("draft never claims observation", () => {
  const r = createDraft(makeManifest(), "a".repeat(64), "visual");
  assert.equal(parseReport(r).ok, true);
  assert.equal(r.reviewer.id, null);
  assert.equal(r.reviewer.independent, false);
  assert.deepEqual(r.observations, []);
  assert.ok(Object.values(r.scores).every((s) => s.score === null));
  assert.equal(r.scores["声音与同步"].state, "deferred");
});
test("manifest rejects duplicate IDs and invalid sizes", () => {
  assert.equal(parseManifest(makeManifest()).ok, true);
  const e = {
    id: "x",
    path: "evidence/x.png",
    kind: "frame",
    sha256: "a".repeat(64),
    bytes: 1,
    frame: 0,
  };
  assert.equal(parseManifest({ ...makeManifest(), files: [e, e] }).ok, false);
  assert.equal(
    parseManifest({ ...makeManifest(), files: [{ ...e, bytes: -1 }] }).ok,
    false,
  );
});
