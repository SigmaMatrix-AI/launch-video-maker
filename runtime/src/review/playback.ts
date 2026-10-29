import { chromium } from "playwright";
import type { FilmServer } from "../server.js";
import type { PlaybackTrace } from "./types.js";
/** Technical playback evidence only; never asserts perceptual viewing or listening. */
export async function recordPlayback(
  server: FilmServer,
  signal?: AbortSignal,
): Promise<PlaybackTrace> {
  signal?.throwIfAborted();
  const startedAt = Date.now(),
    trace: PlaybackTrace = {
      completed: false,
      samples: [],
      errors: [],
      elapsedMs: 0,
    };
  const f = server.prepared.film,
    timeout = Math.max(
      30000,
      ((f.durationInFrames * f.fps.den) / f.fps.num) * 3000 + 10000,
    );
  const browser = await chromium.launch({ headless: true });
  const abort = () => {
    void browser.close();
  };
  signal?.addEventListener("abort", abort, { once: true });
  const deadline = setTimeout(abort, timeout);
  try {
    signal?.throwIfAborted();
    await server.assertVersion();
    const page = await browser.newPage();
    page.on("pageerror", (e) => trace.errors.push(String(e)));
    page.on("requestfailed", (r) =>
      trace.errors.push(
        `Request failed: ${r.url()}: ${r.failure()?.errorText}`,
      ),
    );
    page.on("response", (r) => {
      if (r.status() >= 400 && !r.url().endsWith("/favicon.ico"))
        trace.errors.push(`HTTP ${r.status()}: ${r.url()}`);
    });
    await page.goto(server.url);
    await page.waitForFunction(() =>
      Boolean((window as any).__LVM__?.ready || (window as any).__LVM__?.error),
    );
    const initial = await page.evaluate(() => {
      const w = window as any;
      w.__reviewStarted = false;
      setInterval(() => {
        if (w.__LVM__.state().playing) w.__reviewStarted = true;
      }, 5);
      return w.__LVM__.state();
    });
    if (initial.frame !== 0) throw Error("Playback did not start at frame 0");
    trace.samples.push({
      elapsedMs: Date.now() - startedAt,
      frame: initial.frame,
      playing: initial.playing,
    });
    await page.click("#play");
    while (Date.now() - startedAt < timeout) {
      signal?.throwIfAborted();
      await page.waitForTimeout(100);
      const s = await page.evaluate(() => ({
        ...(window as any).__LVM__.state(),
        started: (window as any).__reviewStarted,
        error: (window as any).__LVM__.error,
      }));
      trace.samples.push({
        elapsedMs: Date.now() - startedAt,
        frame: s.frame,
        playing: s.playing,
      });
      if (s.error) throw Error(s.error);
      if (trace.errors.length) break;
      if (s.started && !s.playing) {
        if (s.frame === f.durationInFrames - 1) trace.completed = true;
        else trace.errors.push(`Playback stopped early at frame ${s.frame}`);
        break;
      }
    }
    if (!trace.completed && !trace.errors.length)
      trace.errors.push("Playback timeout");
    await server.assertVersion();
  } catch (e) {
    signal?.throwIfAborted();
    trace.errors.push(String(e));
    trace.completed = false;
  } finally {
    clearTimeout(deadline);
    signal?.removeEventListener("abort", abort);
    await browser.close();
    trace.elapsedMs = Date.now() - startedAt;
  }
  if (trace.errors.length) trace.completed = false;
  return trace;
}
