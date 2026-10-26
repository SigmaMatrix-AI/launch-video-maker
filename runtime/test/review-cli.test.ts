import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  access,
} from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { writeReviewFixture, withFilm } from "./review-fixtures.js";
import { contentVersion } from "../src/prepare.js";
import { runtimeFingerprint, sha256File } from "../src/review/files.js";
const cli = resolve("runtime/dist/cli.js");
export function invoke(cwd: string, args: string[]) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>(
    (yes, no) => {
      const c = spawn(process.execPath, [cli, ...args], {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let stdout = "",
        stderr = "";
      c.stdout.on("data", (b) => (stdout += b));
      c.stderr.on("data", (b) => (stderr += b));
      c.on("error", no);
      c.on("close", (code) => yes({ code, stdout, stderr }));
    },
  );
}
export async function bindFixture(reportPath: string, project: string) {
  const mfile = join(dirname(reportPath), "manifest.json"),
    m = JSON.parse(await readFile(mfile, "utf8")),
    r = JSON.parse(await readFile(reportPath, "utf8"));
  m.target = {
    kind: "preview",
    version: await contentVersion(project),
    runtimeHash: await runtimeFingerprint(),
  };
  r.target = m.target;
  await writeFile(mfile, JSON.stringify(m));
  r.manifestSha256 = await sha256File(mfile);
  await writeFile(reportPath, JSON.stringify(r));
}
test("default pack is visual and unscored", () =>
  withFilm(async (_, dir) => {
    const r = await invoke(dir, ["review-pack", ".lvm/review"]);
    assert.equal(r.code, 0, r.stderr);
    const p = JSON.parse(r.stdout);
    const report = JSON.parse(await readFile(p.reportPath, "utf8"));
    assert.equal(report.scope, "visual");
    assert.equal(report.reviewer.independent, false);
    assert.ok(Object.values(report.scores).every((s: any) => s.score === null));
  }));
test("check exit codes are scoped and require no browser or preparation", async () => {
  const dir = await mkdtemp(join(process.cwd(), ".lvm-test-cli-"));
  try {
    const { reportPath } = await writeReviewFixture(join(dir, ".lvm/bundle"));
    await bindFixture(reportPath, dir);
    let r = await invoke(dir, ["review-check", reportPath]);
    assert.equal(r.code, 0, r.stderr + r.stdout);
    assert.equal(JSON.parse(r.stdout).commercialStatus, "incomplete");
    const report = JSON.parse(await readFile(reportPath, "utf8"));
    report.scores["设计与排版"].score = 7.49;
    await writeFile(reportPath, JSON.stringify(report));
    r = await invoke(dir, ["review-check", reportPath]);
    assert.equal(r.code, 1);
    report.observations = [];
    await writeFile(reportPath, JSON.stringify(report));
    r = await invoke(dir, ["review-check", reportPath]);
    assert.equal(r.code, 2);
    assert.equal(JSON.parse(r.stdout).scopeStatus, "incomplete");
    await assert.rejects(access(join(dir, ".lvm/vite")));
    assert.equal(
      (await invoke(dir, ["review-check", reportPath, "--bogus"])).code,
      1,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test("unknown scope missing values and absent MP4 fail without exporting", () =>
  withFilm(async (_, dir) => {
    for (const args of [
      ["review-pack", ".lvm/review", "--scope", "foo"],
      ["review-pack", ".lvm/review", "--mp4"],
      ["review-pack", ".lvm/review", "--mp4", "absent.mp4"],
    ])
      assert.notEqual((await invoke(dir, args)).code, 0);
    await assert.rejects(access(join(dir, "exports")));
  }));
import { startServer } from "../src/server.js";
import { testFinding } from "./review-fixtures.js";
import { run } from "../src/process.js";
test("actual repair loop preserves issue and requires new evidence", () =>
  withFilm(async (server, dir) => {
    const old = JSON.parse(
        (await invoke(dir, ["review-pack", ".lvm/review"])).stdout,
      ),
      r = JSON.parse(await readFile(old.reportPath, "utf8"));
    r.findings = [
      {
        ...testFinding(),
        dimension: "动效工艺",
        description: "Known fixture alternates red and blue on adjacent frames",
        range: { start: 0, end: 6 },
      },
    ];
    await writeFile(old.reportPath, JSON.stringify(r));
    await server.close();
    await writeFile(
      join(dir, "film.tsx"),
      (await readFile(join(dir, "film.tsx"), "utf8")).replace(
        "frame%2?'red':'blue'",
        "'blue'",
      ),
    );
    const next = JSON.parse(
        (
          await invoke(dir, [
            "review-pack",
            ".lvm/review",
            "--previous",
            old.reportPath,
          ])
        ).stdout,
      ),
      draft = JSON.parse(await readFile(next.reportPath, "utf8"));
    assert.equal(draft.scores["动效工艺"].score, null);
    assert.deepEqual(draft.observations, []);
    assert.equal(draft.findings[0].id, r.findings[0].id);
    assert.equal(draft.findings[0].state, "open");
    const manifest = JSON.parse(await readFile(next.manifestPath, "utf8"));
    draft.reviewer = {
      id: "synthetic-gate-only",
      independent: true,
      capabilities: { continuousVisual: true, audio: false },
    };
    const frameIds = manifest.files
      .filter((e) => e.kind === "frame")
      .map((e) => e.id);
    draft.observations = [
      {
        mode: "continuous-playback",
        range: { start: 0, end: 6 },
        evidenceIds: frameIds,
        method: "Synthetic gate only",
        notes: "Not real commercial viewing",
      },
      {
        mode: "sequence",
        range: { start: 0, end: 6 },
        evidenceIds: frameIds,
        method: "Synthetic gate only",
        notes: "Known corrected fixture",
      },
    ];
    for (const [name, score] of Object.entries(draft.scores))
      if (name !== "声音与同步")
        Object.assign(score as any, {
          state: "rated",
          score: 8,
          reason: "Synthetic gate test",
          evidenceIds: frameIds,
        });
    draft.findings = [];
    await writeFile(next.reportPath, JSON.stringify(draft));
    assert.equal(
      (await invoke(dir, ["review-check", next.reportPath])).code,
      2,
    );
    draft.findings = [
      {
        ...r.findings[0],
        state: "resolved",
        resolution: "Synthetic check of uniform blue frame output",
        evidenceIds: frameIds,
      },
    ];
    await writeFile(next.reportPath, JSON.stringify(draft));
    const result = await invoke(dir, ["review-check", next.reportPath]);
    assert.equal(result.code, 0, result.stdout + result.stderr);
    assert.equal(JSON.parse(result.stdout).commercialStatus, "incomplete");
    await assert.rejects(access(join(dir, "exports")));
  }));
test("actual MP4 tampering invalidates target binding", () =>
  withFilm(async (_, dir) => {
    const file = join(dir, ".lvm/existing.mp4");
    await run("ffmpeg", [
      "-v",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=blue:s=64x36:r=30:d=0.2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      file,
    ]);
    const packed = await invoke(dir, [
      "review-pack",
      ".lvm/review",
      "--mp4",
      file,
    ]);
    assert.equal(packed.code, 0, packed.stderr);
    const p = JSON.parse(packed.stdout);
    await writeFile(file, "modified MP4");
    const checked = await invoke(dir, ["review-check", p.reportPath]);
    assert.equal(checked.code, 2);
    assert.ok(
      JSON.parse(checked.stdout).reasons.some((e) => e.code === "mp4-changed"),
    );
  }));

test("clean preserves default custom and nested review judgments", () =>
  withFilm(async (server, dir) => {
    const packed = await invoke(dir, ["review-pack", ".lvm/review"]);
    assert.equal(packed.code, 0, packed.stderr);
    const bundle = JSON.parse(packed.stdout);
    const report = JSON.parse(await readFile(bundle.reportPath, "utf8"));
    report.reviewer.id = "handwritten-judgment";
    await writeFile(bundle.reportPath, JSON.stringify(report));
    const custom = join(dir, ".lvm/custom-qa/round-1");
    await mkdir(custom, { recursive: true });
    await writeFile(
      join(custom, "review.json"),
      "irreplaceable custom judgment",
    );
    const nested = join(server.prepared.cache, "nested-review");
    await mkdir(nested);
    await writeFile(join(nested, "review.json"), "nested judgment");
    await mkdir(join(dir, ".lvm/vite"), { recursive: true });
    await writeFile(join(dir, ".lvm/vite/cache.txt"), "rebuildable");
    await server.close();
    const result = await invoke(dir, ["clean"]);
    assert.equal(result.code, 0, result.stderr);
    assert.equal(
      JSON.parse(await readFile(bundle.reportPath, "utf8")).reviewer.id,
      "handwritten-judgment",
    );
    assert.equal(
      await readFile(join(custom, "review.json"), "utf8"),
      "irreplaceable custom judgment",
    );
    assert.equal(
      await readFile(join(nested, "review.json"), "utf8"),
      "nested judgment",
    );
    await assert.rejects(access(join(dir, ".lvm/vite")));
  }));
