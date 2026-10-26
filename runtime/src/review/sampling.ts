import { defineFilm, type Film } from "../core.js";
import type { FrameRange, SamplingPlan } from "./types.js";
import { isFrameRange } from "./schema.js";
export const MAX_REVIEW_FRAMES = 1200;
export function planSamples(
  film: Film,
  actionRanges: FrameRange[] = [],
): SamplingPlan {
  defineFilm(film);
  const n = film.durationInFrames,
    { num, den } = film.fps,
    r = Math.ceil(num / (4 * den));
  for (const w of actionRanges)
    if (!isFrameRange(w) || w.end > n) throw Error("Invalid action range");
  const overview = new Set([0, n - 1]);
  for (let k = 0; ; k++) {
    const f = Math.floor((k * num) / (2 * den));
    if (f >= n) break;
    overview.add(f);
    if (overview.size > MAX_REVIEW_FRAMES)
      throw Error(`Review requires more than ${MAX_REVIEW_FRAMES} frames`);
  }
  const boundaries = [
    0,
    n,
    ...film.scenes.flatMap((s) => [s.start, s.end]),
    ...Object.values(film.markers),
  ];
  const raw = [
    ...boundaries.map((b) => ({
      start: Math.max(0, b - r),
      end: Math.min(n, b + r + 1),
    })),
    ...actionRanges,
  ].sort((a, b) => a.start - b.start);
  const windows: FrameRange[] = [];
  for (const w of raw) {
    const last = windows.at(-1);
    if (last && w.start <= last.end) last.end = Math.max(last.end, w.end);
    else windows.push({ ...w });
  }
  const frames = new Set(overview);
  for (const s of film.scenes) {
    frames.add(s.start);
    frames.add(Math.floor((s.start + s.end - 1) / 2));
    frames.add(s.end - 1);
  }
  for (const w of windows) {
    if (w.end - w.start > MAX_REVIEW_FRAMES)
      throw Error(
        `Review window requires ${w.end - w.start} frames; limit ${MAX_REVIEW_FRAMES}`,
      );
    for (let f = w.start; f < w.end; f++) frames.add(f);
  }
  if (frames.size > MAX_REVIEW_FRAMES)
    throw Error(
      `Review requires ${frames.size} frames; limit ${MAX_REVIEW_FRAMES}`,
    );
  return {
    frames: [...frames].sort((a, b) => a - b),
    windows,
    overviewFrames: [...overview].sort((a, b) => a - b),
  };
}

/** Compare exact rates without assuming ffprobe preserves the input fraction. */
export function ratesEquivalent(
  actual: string,
  expected: { num: number; den: number },
): boolean {
  if (typeof actual !== "string" || !/^\d+\/\d+$/.test(actual)) return false;
  const [num, den] = actual.split("/").map(BigInt);
  return (
    num > 0n &&
    den > 0n &&
    num * BigInt(expected.den) === den * BigInt(expected.num)
  );
}
