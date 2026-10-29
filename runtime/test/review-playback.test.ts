import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { recordPlayback } from "../src/review/playback.js";
import { withFilm } from "./review-fixtures.js";
test("real playback reaches final frame", () =>
  withFilm(async (server) => {
    const trace = await recordPlayback(server);
    assert.equal(trace.completed, true, JSON.stringify(trace));
    assert.equal(trace.samples[0].frame, 0);
    assert.equal(trace.samples.at(-1)?.frame, 59);
    assert.equal(trace.samples.at(-1)?.playing, false);
    assert.deepEqual(trace.errors, []);
  }, 60));
test("playback failure does not become an observation", () =>
  withFilm(async (server) => {
    const native = chromium.launch.bind(chromium);
    chromium.launch = async (...args) => {
      const b = await native(...args),
        newPage = b.newPage.bind(b);
      b.newPage = async (...a) => {
        const p = await newPage(...a);
        await p.addInitScript(() => {
          let started = false;
          setInterval(() => {
            if ((window as any).__LVM__?.state?.().playing) started = true;
            if (started) (window as any).__LVM__?.pause();
          }, 250);
        });
        return p;
      };
      return b;
    };
    try {
      const t = await recordPlayback(server);
      assert.equal(t.completed, false);
      assert.ok(t.errors.length);
    } finally {
      chromium.launch = native;
    }
  }, 60));
test("cancel closes playback browser", () =>
  withFilm(async (server) => {
    const control = new AbortController();
    const native = chromium.launch.bind(chromium);
    let browser: any;
    chromium.launch = async (...args) => {
      browser = await native(...args);
      return browser;
    };
    const timer = setTimeout(() => control.abort(), 500);
    try {
      await assert.rejects(recordPlayback(server, control.signal), /abort/i);
      assert.ok(!browser?.isConnected());
    } finally {
      clearTimeout(timer);
      chromium.launch = native;
    }
  }, 60));
