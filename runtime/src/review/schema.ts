import { defineFilm } from "../core.js";
import {
  dimensions,
  type ReviewManifest,
  type ReviewReport,
  type ReviewScope,
  type FrameRange,
} from "./types.js";
type Parsed<T> = { ok: true; value: T } | { ok: false; errors: string[] };
const object = (x: any) =>
  x !== null && typeof x === "object" && !Array.isArray(x);
const str = (x: any) => typeof x === "string";
const strings = (x: any) => Array.isArray(x) && x.every(str);
const hash = (x: any) => str(x) && /^[a-f0-9]{64}$/.test(x);
const int = (x: any) => Number.isSafeInteger(x) && x >= 0;
const range = (x: any) =>
  object(x) && int(x.start) && int(x.end) && x.start < x.end;
const target = (x: any) =>
  object(x) &&
  str(x.version) &&
  x.version.length > 0 &&
  (x.kind === "preview"
    ? hash(x.runtimeHash)
    : x.kind === "mp4" && str(x.file) && x.file.length > 0 && hash(x.sha256));
const unique = (items: any[]) =>
  new Set(items.map((x) => x?.id)).size === items.length;
/** Parsing is structural. File identity and coverage are checked separately. */
export function parseReport(input: unknown): Parsed<ReviewReport> {
  const x = input as any,
    errors: string[] = [];
  const check = (valid: any, path: string) => {
    if (!valid) errors.push(path);
  };
  if (!object(x)) return { ok: false, errors: ["report must be an object"] };
  check(x.schemaVersion === 2, "schemaVersion");
  check(["visual", "audiovisual"].includes(x.scope), "scope");
  check(target(x.target), "target");
  check(hash(x.manifestSha256), "manifestSha256");
  check(
    object(x.reviewer) &&
      (x.reviewer.id === null || str(x.reviewer.id)) &&
      typeof x.reviewer.independent === "boolean" &&
      object(x.reviewer.capabilities) &&
      ["continuousVisual", "audio"].every(
        (k) => typeof x.reviewer.capabilities[k] === "boolean",
      ),
    "reviewer",
  );
  check(Array.isArray(x.observations), "observations");
  if (Array.isArray(x.observations))
    x.observations.forEach((o: any, i: number) =>
      check(
        object(o) &&
          ["static", "sequence", "continuous-playback", "listening"].includes(
            o.mode,
          ) &&
          range(o.range) &&
          strings(o.evidenceIds) &&
          str(o.method) &&
          str(o.notes),
        `observations[${i}]`,
      ),
    );
  check(object(x.scores), "scores");
  for (const n of dimensions) {
    const s = x.scores?.[n];
    check(
      object(s) &&
        ["rated", "unverified", "deferred"].includes(s.state) &&
        (s.score === null ||
          (typeof s.score === "number" &&
            Number.isFinite(s.score) &&
            s.score >= 0 &&
            s.score <= 10)) &&
        str(s.reason) &&
        strings(s.evidenceIds),
      `scores.${n}`,
    );
  }
  check(Array.isArray(x.findings), "findings");
  if (Array.isArray(x.findings)) {
    check(unique(x.findings), "findings.id duplicate");
    x.findings.forEach((f: any, i: number) =>
      check(
        object(f) &&
          str(f.id) &&
          f.id.trim() &&
          dimensions.includes(f.dimension) &&
          ["blocking", "advisory"].includes(f.severity) &&
          (f.sceneId === null || str(f.sceneId)) &&
          (f.range === null || range(f.range)) &&
          str(f.description) &&
          str(f.fixTarget) &&
          strings(f.evidenceIds) &&
          ["open", "resolved", "not-reproduced"].includes(f.state) &&
          (f.resolution === null || str(f.resolution)),
        `findings[${i}]`,
      ),
    );
  }
  return errors.length ? { ok: false, errors } : { ok: true, value: x };
}
export function parseManifest(input: unknown): Parsed<ReviewManifest> {
  const x = input as any,
    errors: string[] = [];
  const check = (v: any, p: string) => {
    if (!v) errors.push(p);
  };
  if (!object(x)) return { ok: false, errors: ["manifest must be an object"] };
  check(x.schemaVersion === 2, "schemaVersion");
  check(target(x.target), "target");
  check(
    str(x.createdAt) && Number.isFinite(Date.parse(x.createdAt)),
    "createdAt",
  );
  check(object(x.tools), "tools");
  try {
    if (
      !object(x.film) ||
      !Array.isArray(x.film.assets) ||
      !Array.isArray(x.film.audio) ||
      !Array.isArray(x.film.scenes) ||
      !object(x.film.markers)
    )
      throw Error();
    defineFilm(x.film);
  } catch {
    errors.push("film");
  }
  check(
    object(x.sampling) &&
      Array.isArray(x.sampling.frames) &&
      x.sampling.frames.every(int) &&
      Array.isArray(x.sampling.overviewFrames) &&
      x.sampling.overviewFrames.every(int) &&
      Array.isArray(x.sampling.windows) &&
      x.sampling.windows.every(range),
    "sampling",
  );
  check(strings(x.missingContext), "missingContext");
  check(Array.isArray(x.files), "files");
  if (Array.isArray(x.files)) {
    check(unique(x.files), "files.id duplicate");
    x.files.forEach((f: any, i: number) =>
      check(
        object(f) &&
          str(f.id) &&
          f.id.trim() &&
          str(f.path) &&
          f.path.trim() &&
          ["frame", "context", "mix", "playback", "probe", "history"].includes(
            f.kind,
          ) &&
          hash(f.sha256) &&
          int(f.bytes) &&
          (f.frame === undefined || int(f.frame)) &&
          (f.range === undefined || range(f.range)),
        `files[${i}]`,
      ),
    );
  }
  if (x.previous !== undefined)
    check(
      object(x.previous) &&
        str(x.previous.reportEvidenceId) &&
        str(x.previous.manifestEvidenceId),
      "previous",
    );
  return errors.length ? { ok: false, errors } : { ok: true, value: x };
}
export function createDraft(
  manifest: ReviewManifest,
  manifestSha256: string,
  scope: ReviewScope,
): ReviewReport {
  return {
    schemaVersion: 2,
    scope,
    target: manifest.target,
    manifestSha256,
    reviewer: {
      id: null,
      independent: false,
      capabilities: { continuousVisual: false, audio: false },
    },
    observations: [],
    scores: Object.fromEntries(
      dimensions.map((n) => [
        n,
        {
          state:
            scope === "visual" && n === "Sound and synchronization"
              ? "deferred"
              : "unverified",
          score: null,
          reason:
            scope === "visual" && n === "Sound and synchronization"
              ? "Listening deferred for this visual review."
              : "Not reviewed.",
          evidenceIds: [],
        },
      ]),
    ) as unknown as ReviewReport["scores"],
    findings: [],
  };
}
export const isFrameRange = (x: unknown): x is FrameRange => range(x);
