import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, readdir, symlink } from "node:fs/promises";
import { join } from "node:path";
import { buildReviewPack } from "../src/review/pack.js";
import { verifyEvidence, sha256File } from "../src/review/files.js";
import { withFilm } from "./review-fixtures.js";
import { contentVersion } from "../src/prepare.js";
import { run } from "../src/process.js";
test("pack never overwrites reports and accepts Markdown brand context", () =>
  withFilm(async (server, dir) => {
    const parent = join(dir, ".lvm/review");
    const a = await buildReviewPack(server, parent);
    await writeFile(a.reportPath, "hand written");
    const b = await buildReviewPack(server, parent);
    assert.notEqual(a.directory, b.directory);
    assert.equal(await readFile(a.reportPath, "utf8"), "hand written");
    const m = JSON.parse(await readFile(b.manifestPath, "utf8"));
    assert.ok(!m.missingContext.includes("brand"));
    assert.deepEqual(await verifyEvidence(b.directory, m.files), []);
    await writeFile(
      join(b.directory, m.files.find((f) => f.kind === "frame").path),
      "corrupt",
    );
    assert.ok((await verifyEvidence(b.directory, m.files)).length > 0);
  }));
test("source output and escaping context paths are rejected", () =>
  withFilm(async (server, dir) => {
    const before = await contentVersion(dir);
    await assert.rejects(
      buildReviewPack(server, join(dir, "records/review")),
      /outside|\.lvm|source/i,
    );
    assert.equal(await contentVersion(dir), before);
    await writeFile(
      join(dir, "records/review-context.json"),
      JSON.stringify({
        documents: [{ role: "reference", path: "../secret.md" }],
        actionRanges: [],
      }),
    );
    await assert.rejects(
      buildReviewPack(server, join(dir, ".lvm/review")),
      /path|inside|changed/i,
    );
  }));
test("symlink evidence and context paths are rejected", () =>
  withFilm(async (server, dir) => {
    await symlink(join(dir, "records/brief.md"), join(dir, "linked.md"));
    await assert.rejects(
      buildReviewPack(server, join(dir, ".lvm/review")),
      /symlink/i,
    );
  }));
test("interrupted pack and byte budget leave no published or partial bundle", () =>
  withFilm(async (server, dir) => {
    const parent = join(dir, ".lvm/review");
    await assert.rejects(
      buildReviewPack(server, parent, { signal: AbortSignal.abort() }),
      /abort/i,
    );
    await assert.rejects(
      buildReviewPack(server, parent, {}, { maxBytes: 50 }),
      /budget/i,
    );
    assert.deepEqual(await readdir(parent), []);
  }));
test("source changed during capture invalidates bundle", () =>
  withFilm(async (server, dir) => {
    const assertOriginal = server.assertVersion;
    let calls = 0;
    server.assertVersion = async () => {
      if (++calls === 3)
        await writeFile(
          join(dir, "film.tsx"),
          (await readFile(join(dir, "film.tsx"), "utf8")) + "\n// changed",
        );
      await assertOriginal();
    };
    await assert.rejects(
      buildReviewPack(server, join(dir, ".lvm/review")),
      /changed/i,
    );
    assert.deepEqual(await readdir(join(dir, ".lvm/review")), []);
  }));
test("captures actual existing MP4 without rendering a new video", () =>
  withFilm(async (server, dir) => {
    const file = join(dir, ".lvm/existing.mp4");
    await run("ffmpeg", [
      "-v",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=green:s=64x36:r=30:d=0.2",
      "-f",
      "lavfi",
      "-i",
      "anullsrc=r=48000:cl=stereo",
      "-t",
      "0.2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      file,
    ]);
    const hash = await sha256File(file);
    const bundle = await buildReviewPack(server, join(dir, ".lvm/review"), {
      mp4: file,
    });
    const m = JSON.parse(await readFile(bundle.manifestPath, "utf8"));
    assert.equal(m.target.sha256, hash);
    assert.equal(await sha256File(file), hash);
    assert.equal(m.files.filter((f) => f.kind === "frame").length, 6);
    assert.ok(m.files.some((f) => f.kind === "mix"));
    assert.deepEqual(await verifyEvidence(bundle.directory, m.files), []);
  }));
