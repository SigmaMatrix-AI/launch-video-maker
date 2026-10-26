import type { ReviewManifest, ReviewReport } from "../src/review/types.js";
export function makeManifest(): ReviewManifest {
  return {
    schemaVersion: 2,
    target: { kind: "preview", version: "v1", runtimeHash: "a".repeat(64) },
    film: {
      width: 64,
      height: 36,
      fps: { num: 30, den: 1 },
      durationInFrames: 60,
      seed: 1,
      scenes: [],
      markers: {},
      assets: [],
      audio: [],
    },
    createdAt: new Date().toISOString(),
    tools: {},
    sampling: {
      frames: [0, 59],
      overviewFrames: [0, 59],
      windows: [{ start: 0, end: 1 }],
    },
    files: [],
    missingContext: [],
  };
}
export function makeReport(): ReviewReport {
  return {
    schemaVersion: 2,
    scope: "visual",
    target: makeManifest().target,
    manifestSha256: "a".repeat(64),
    reviewer: {
      id: null,
      independent: false,
      capabilities: { continuousVisual: false, audio: false },
    },
    observations: [],
    scores: Object.fromEntries(
      [
        "风格还原",
        "创意与惊艳",
        "动效工艺",
        "设计与排版",
        "质感与细节",
        "声音与同步",
        "技术规格",
      ].map((n) => [
        n,
        {
          state: n === "声音与同步" ? "deferred" : "unverified",
          score: null,
          reason: "Not reviewed",
          evidenceIds: [],
        },
      ]),
    ) as ReviewReport["scores"],
    findings: [],
  };
}
export const filmSource = (n = 6) =>
  `import React from 'react';export const film={width:64,height:36,fps:{num:30,den:1},durationInFrames:${n},seed:1,scenes:[{id:'one',start:0,end:${n}}],markers:{},assets:[],audio:[]};export default function Frame({frame}){return <div style={{width:'100%',height:'100%',background:frame%2?'red':'blue'}}>{frame}</div>}`;
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { startServer } from "../src/server.js";
export async function withFilm(
  fn: (
    server: Awaited<ReturnType<typeof startServer>>,
    dir: string,
  ) => Promise<void>,
  n = 6,
) {
  const dir = await mkdtemp(join(process.cwd(), ".lvm-test-review-"));
  let server: Awaited<ReturnType<typeof startServer>> | undefined;
  try {
    await writeFile(join(dir, "film.tsx"), filmSource(n));
    await mkdir(join(dir, "records"));
    await mkdir(join(dir, "brand-kit"));
    for (const name of ["brief", "direction", "storyboard"])
      await writeFile(
        join(dir, "records", name + ".md"),
        "# " + name + "\nFixture facts and direction",
      );
    await writeFile(
      join(dir, "brand-kit/sources.md"),
      "# Brand sources\nFixture only",
    );
    server = await startServer(dir);
    await fn(server, dir);
  } finally {
    await server?.close();
    await rm(dir, { recursive: true, force: true });
  }
}
import { createDraft } from "../src/review/schema.js";
import { planSamples } from "../src/review/sampling.js";
import { sha256File } from "../src/review/files.js";
import type { Finding } from "../src/review/types.js";
/** Synthetic gates only: these assertions are not an actual film review. */
export async function writeReviewFixture(
  dir: string,
): Promise<{ reportPath: string }> {
  await mkdir(join(dir, "evidence"), { recursive: true });
  await mkdir(join(dir, "context"), { recursive: true });
  const m = makeManifest();
  m.sampling = planSamples(m.film);
  const add = async (
    id: string,
    path: string,
    kind: any,
    data: string,
    extra: any = {},
  ) => {
    await writeFile(join(dir, path), data);
    m.files.push({
      id,
      path,
      kind,
      sha256: await sha256File(join(dir, path)),
      bytes: Buffer.byteLength(data),
      ...extra,
    });
  };
  for (const f of m.sampling.frames)
    await add(
      "frame:" + f,
      `evidence/${f}.png`,
      "frame",
      "Synthetic frame " + f,
      { frame: f },
    );
  for (const role of ["brief", "direction", "storyboard", "brand"])
    await add(
      `context:${role}:0`,
      `context/${role}.md`,
      "context",
      "Synthetic " + role,
    );
  await add(
    "playback",
    "evidence/playback.json",
    "playback",
    JSON.stringify({
      completed: true,
      samples: [
        { elapsedMs: 0, frame: 0, playing: false },
        { elapsedMs: 2000, frame: 59, playing: false },
      ],
      errors: [],
      elapsedMs: 2000,
    }),
  );
  await writeFile(join(dir, "manifest.json"), JSON.stringify(m));
  const r = createDraft(
    m,
    await sha256File(join(dir, "manifest.json")),
    "visual",
  );
  r.reviewer = {
    id: "synthetic-reviewer",
    independent: true,
    capabilities: { continuousVisual: true, audio: false },
  };
  r.observations = [
    {
      mode: "continuous-playback",
      range: { start: 0, end: 60 },
      evidenceIds: ["frame:0", "frame:59"],
      method: "Synthetic test declaration",
      notes: "Synthetic gate test; not a real viewing",
    },
    ...m.sampling.windows.map((w) => ({
      mode: "sequence" as const,
      range: w,
      evidenceIds: m.files
        .filter(
          (e) => e.kind === "frame" && e.frame! >= w.start && e.frame! < w.end,
        )
        .map((e) => e.id),
      method: "Synthetic frame sequence",
      notes: "Known fixture",
    })),
  ];
  for (const [name, score] of Object.entries(r.scores))
    if (name !== "声音与同步")
      Object.assign(score, {
        state: "rated",
        score: 8,
        reason: "Synthetic assertion only",
        evidenceIds: ["frame:0"],
      });
  const reportPath = join(dir, "review.json");
  await writeFile(reportPath, JSON.stringify(r));
  return { reportPath };
}
export const testFinding = (): Finding => ({
  id: "layout-1",
  dimension: "设计与排版",
  severity: "blocking",
  sceneId: null,
  range: { start: 0, end: 2 },
  description: "Synthetic overlap",
  fixTarget: "Separate labels",
  evidenceIds: ["frame:0"],
  state: "open",
  resolution: null,
});
