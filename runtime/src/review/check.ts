import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  dimensions,
  type ReviewResult,
  type FrameRange,
  type Observation,
  type ReviewReport,
} from "./types.js";
import { parseReport, parseManifest } from "./schema.js";
import { sha256File, resolveEvidencePath, verifyEvidence } from "./files.js";
import { planSamples, ratesEquivalent } from "./sampling.js";
export async function checkReview(
  reportPath: string,
  current: { version: string; runtimeHash: string },
): Promise<ReviewResult> {
  const result: ReviewResult = {
    scope: null,
    scopeStatus: "incomplete",
    commercialStatus: "incomplete",
    reasons: [],
  };
  let incomplete = false,
    failed = false;
  const issue = (code: string, path: string, message: string, fail = false) => {
    result.reasons.push({ code, path, message });
    if (fail) failed = true;
    else incomplete = true;
  };
  try {
    const raw = JSON.parse(await readFile(reportPath, "utf8"));
    if (raw?.schemaVersion !== 2) {
      issue(
        "legacy-report",
        "schemaVersion",
        "Generate a new v2 review pack; legacy reports cannot pass.",
      );
      return result;
    }
    const parsed = parseReport(raw);
    if (!parsed.ok) {
      for (const p of parsed.errors)
        issue("invalid-report", p, "Malformed review field");
      return result;
    }
    const r = parsed.value;
    result.scope = r.scope;
    const dir = dirname(reportPath),
      manifestFile = await resolveEvidencePath(dir, "manifest.json");
    if ((await sha256File(manifestFile)) !== r.manifestSha256)
      issue("manifest-changed", "manifestSha256", "Manifest identity mismatch");
    const parsedManifest = parseManifest(
      JSON.parse(await readFile(manifestFile, "utf8")),
    );
    if (!parsedManifest.ok) {
      for (const p of parsedManifest.errors)
        issue("invalid-manifest", p, "Malformed manifest field");
      return result;
    }
    const m = parsedManifest.value,
      n = m.film.durationInFrames;
    if (JSON.stringify(r.target) !== JSON.stringify(m.target))
      issue("target-mismatch", "target", "Report and manifest targets differ");
    if (m.target.version !== current.version)
      issue("stale-version", "target.version", "Project content changed");
    if (
      m.target.kind === "preview" &&
      m.target.runtimeHash !== current.runtimeHash
    )
      issue(
        "runtime-changed",
        "target.runtimeHash",
        "Installed runtime changed",
      );
    if (
      m.target.kind === "mp4" &&
      (await sha256File(m.target.file)) !== m.target.sha256
    )
      issue("mp4-changed", "target.sha256", "Actual MP4 changed");
    for (const e of await verifyEvidence(dir, m.files))
      issue("invalid-evidence", "files", e);
    if (new Set(m.files.map((e) => e.path)).size !== m.files.length)
      issue("duplicate-path", "files", "Evidence paths must be unique");
    const files = new Map(m.files.map((e) => [e.id, e])),
      frameFiles = m.files.filter((e) => e.kind === "frame");
    const frameMap = new Map(frameFiles.map((e) => [e.frame, e]));
    const validRange = (w: FrameRange | null) =>
      w !== null && w.start >= 0 && w.end <= n && w.start < w.end;
    const validIds = (ids: string[], kinds?: string[]) =>
      ids.length > 0 &&
      ids.every((id) => {
        const e = files.get(id);
        return Boolean(
          e && e.kind !== "history" && (!kinds || kinds.includes(e.kind)),
        );
      });
    const refs = (ids: string[], path: string, kinds?: string[]) => {
      if (!validIds(ids, kinds))
        issue(
          "missing-current-evidence",
          path,
          "Reference current bundle evidence of the required kind",
        );
    };
    if (m.missingContext.length)
      issue("missing-context", "missingContext", m.missingContext.join(", "));
    for (const role of ["brief", "direction", "storyboard", "brand"])
      if (
        !m.files.some(
          (e) => e.kind === "context" && e.id.startsWith(`context:${role}:`),
        )
      )
        issue("missing-context", "files", role);
    const required = planSamples(m.film);
    const actual = new Set(m.sampling.frames);
    if (
      actual.size !== m.sampling.frames.length ||
      actual.size > 1200 ||
      m.sampling.frames.some((f) => f >= n) ||
      required.frames.some((f) => !actual.has(f))
    )
      issue(
        "invalid-sampling",
        "sampling.frames",
        "Missing mandatory samples, duplicate or out-of-range frames",
      );
    if (
      frameMap.size !== frameFiles.length ||
      frameFiles.length !== actual.size ||
      frameFiles.some((e) => e.frame === undefined || !actual.has(e.frame))
    )
      issue(
        "missing-frame",
        "files",
        "Frame files must exactly match sampling plan",
      );
    for (const w of m.sampling.windows) {
      if (!validRange(w)) {
        issue("invalid-range", "sampling.windows", "Invalid sampling window");
        continue;
      }
      for (let f = w.start; f < w.end; f++)
        if (!frameMap.has(f)) {
          issue("incomplete-window", "sampling.windows", `Missing frame ${f}`);
          break;
        }
    }
    if (!r.reviewer.id?.trim() || r.reviewer.independent !== true)
      issue(
        "not-independent",
        "reviewer",
        "An identified independent reviewer is required",
      );
    if (!r.reviewer.capabilities.continuousVisual)
      issue(
        "no-dynamic-capability",
        "reviewer.capabilities",
        "Continuous visual observation unavailable",
      );
    const cover = (ranges: FrameRange[], start: number, end: number) => {
      let cursor = start;
      for (const w of [...ranges].sort((a, b) => a.start - b.start)) {
        if (w.end <= cursor) continue;
        if (w.start > cursor) break;
        cursor = w.end;
        if (cursor >= end) return true;
      }
      return false;
    };
    for (const [i, o] of r.observations.entries()) {
      if (!validRange(o.range) || !o.method.trim() || !o.notes.trim())
        issue(
          "invalid-observation",
          `observations[${i}]`,
          "Give an in-range observation, method and concrete notes",
        );
      refs(
        o.evidenceIds,
        `observations[${i}].evidenceIds`,
        o.mode === "listening" ? ["mix"] : ["frame"],
      );
      if (o.mode === "sequence") {
        if (
          !m.sampling.windows.some(
            (w) => o.range.start >= w.start && o.range.end <= w.end,
          )
        )
          issue(
            "outside-window",
            `observations[${i}]`,
            "Sequence must belong to a dense window",
          );
        const observed = new Set(
          o.evidenceIds.map((id) => files.get(id)?.frame),
        );
        for (let f = o.range.start; f < Math.min(o.range.end, n); f++)
          if (!observed.has(f)) {
            issue(
              "incomplete-sequence",
              `observations[${i}]`,
              `Frame ${f} not observed`,
            );
            break;
          }
      }
    }
    const observations = (mode: Observation["mode"]) =>
      r.observations.filter((o) => o.mode === mode);
    if (
      !cover(
        observations("continuous-playback").map((o) => o.range),
        0,
        n,
      )
    )
      issue(
        "no-continuous-viewing",
        "observations",
        "Full film continuous visual review is required; playback logs alone do not prove it",
      );
    for (const w of m.sampling.windows)
      if (
        !cover(
          observations("sequence").map((o) => o.range),
          w.start,
          w.end,
        )
      )
        issue(
          "unreviewed-window",
          "observations",
          `Sequence ${w.start}..${w.end} not reviewed`,
        );
    if (m.target.kind === "preview") {
      const e = m.files.find((e) => e.kind === "playback");
      if (!e)
        issue("missing-playback", "files", "Preview playback trace required");
      else {
        const t = JSON.parse(
          await readFile(await resolveEvidencePath(dir, e.path), "utf8"),
        );
        if (
          t.completed !== true ||
          !Array.isArray(t.errors) ||
          t.errors.length ||
          !Array.isArray(t.samples) ||
          !t.samples.length ||
          t.samples[0].frame !== 0 ||
          t.samples.at(-1).frame !== n - 1 ||
          t.samples.at(-1).playing !== false
        )
          issue(
            "playback-failed",
            "files",
            "Preview did not complete normally",
          );
      }
    } else {
      const e = m.files.find((e) => e.kind === "probe");
      if (!e) issue("missing-probe", "files", "Actual MP4 probe required");
      else {
        const p = JSON.parse(
          await readFile(await resolveEvidencePath(dir, e.path), "utf8"),
        );
        if (
          p.frames !== n ||
          p.width !== m.film.width ||
          p.height !== m.film.height ||
          !ratesEquivalent(p.fps, m.film.fps)
        )
          issue("wrong-spec", "files", "Actual MP4 specification mismatch");
      }
    }
    for (const name of dimensions) {
      const s = r.scores[name];
      if (r.scope === "visual" && name === "Sound and synchronization") {
        if (s.state !== "deferred" || s.score !== null)
          issue(
            "audio-not-deferred",
            `scores.${name}`,
            "Visual review must defer sound",
          );
        continue;
      }
      if (s.state !== "rated" || s.score === null || !s.reason.trim())
        issue("unrated", `scores.${name}`, "A justified score is required");
      else if (s.score < 7.5)
        issue("low-score", `scores.${name}`, `${s.score} is below 7.5`, true);
      refs(s.evidenceIds, `scores.${name}.evidenceIds`, [
        "frame",
        "probe",
        "playback",
        "mix",
      ]);
    }
    if (
      r.scope === "audiovisual" &&
      (!r.reviewer.capabilities.audio ||
        !cover(
          observations("listening").map((o) => o.range),
          0,
          n,
        ))
    )
      issue(
        "no-listening",
        "observations",
        "Full mixed audio must actually be heard",
      );
    let previous: ReviewReport | undefined;
    if (m.previous) {
      const a = files.get(m.previous.reportEvidenceId),
        b = files.get(m.previous.manifestEvidenceId);
      if (a?.kind !== "history" || b?.kind !== "history")
        issue("invalid-history", "previous", "History evidence missing");
      else {
        const p = parseReport(
            JSON.parse(
              await readFile(await resolveEvidencePath(dir, a.path), "utf8"),
            ),
          ),
          pm = parseManifest(
            JSON.parse(
              await readFile(await resolveEvidencePath(dir, b.path), "utf8"),
            ),
          );
        if (
          !p.ok ||
          !pm.ok ||
          p.value.manifestSha256 !== b.sha256 ||
          JSON.stringify(p.value.target) !== JSON.stringify(pm.value.target) ||
          p.value.target.kind !== m.target.kind
        )
          issue(
            "invalid-history",
            "previous",
            "Previous report/manifest binding invalid",
          );
        else previous = p.value;
      }
    }
    for (const old of previous?.findings ?? []) {
      const next = r.findings.find((f) => f.id === old.id);
      if (
        !next ||
        next.severity !== old.severity ||
        next.dimension !== old.dimension
      )
        issue(
          "lost-finding",
          "findings",
          `Preserve previous finding ${old.id} and severity/dimension`,
        );
    }
    for (const f of r.findings) {
      if (
        !validRange(f.range) ||
        !f.description.trim() ||
        !f.fixTarget.trim() ||
        (f.sceneId !== null && !m.film.scenes.some((s) => s.id === f.sceneId))
      )
        issue(
          "invalid-finding",
          `findings.${f.id}`,
          "Locate and describe the finding",
        );
      refs(f.evidenceIds, `findings.${f.id}.evidenceIds`);
      if (
        f.state !== "open" &&
        (!previous?.findings.some((old) => old.id === f.id) ||
          !f.resolution?.trim())
      )
        issue(
          "invalid-resolution",
          `findings.${f.id}`,
          "Resolution needs a previous issue and independent current-version evidence",
        );
      if (f.state === "open" && f.severity === "blocking")
        issue("open-blocker", `findings.${f.id}`, f.description, true);
    }
    result.scopeStatus = incomplete
      ? "incomplete"
      : failed
        ? "failed"
        : "passed";
    result.commercialStatus =
      r.scope === "visual" ? "incomplete" : result.scopeStatus;
    return result;
  } catch (e) {
    issue("unreadable-input", reportPath, String(e));
    return result;
  }
}
