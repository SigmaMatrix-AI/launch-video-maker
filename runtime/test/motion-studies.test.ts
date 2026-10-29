import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile, rm, access, readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createStudy} from '../../examples/motion-language/create-study.js';
import {studies} from '../../examples/motion-language/src/catalog.js';
import {startServer} from '../src/server.js';
import {openCapture} from '../src/renderer.js';
import {run} from '../src/process.js';

test('all five documented studies can be selected', () => {
  assert.deepEqual(Object.keys(studies).sort(), ['R01', 'T01', 'T02', 'T03', 'T04']);
});

test('unknown case and variant do not create a target', async () => {
  const root = await mkdtemp(join(tmpdir(), 'lvm-study-invalid-'));
  try {
    for (const options of [{caseId: 'missing', variant: 'good'}, {caseId: 'R01', variant: 'typo'}]) {
      const target = join(root, 'must-not-exist');
      await assert.rejects(createStudy(target, options as any), /Unknown case|variant/);
      await assert.rejects(access(target), /ENOENT/);
    }
  } finally { await rm(root, {recursive: true, force: true}); }
});

test('existing target is preserved', async () => {
  const root = await mkdtemp(join(tmpdir(), 'lvm-study-existing-'));
  try {
    await writeFile(join(root, 'keep.txt'), 'user data');
    await assert.rejects(createStudy(root, {caseId: 'R01', variant: 'good'}), /exists/);
    assert.equal(await readFile(join(root, 'keep.txt'), 'utf8'), 'user data');
    assert.deepEqual(await readdir(root), ['keep.txt']);
  } finally { await rm(root, {recursive: true, force: true}); }
});

test('generated study runs outside the repository using its own runtime and assets', {timeout: 180000}, async () => {
  const root = await mkdtemp(join(tmpdir(), 'lvm-study-portable-'));
  try {
    const project = await createStudy(join(root, 'film'), {caseId: 'R01', variant: 'good'});
    await run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], {cwd: project});
    // Invoke the copied runtime in a child process: root aliases must not mask missing assets/imports.
    await run(process.execPath, ['node_modules/@launch-video-maker/runtime/runtime/dist/cli.js', 'prepare'], {cwd: project});
    await run(process.execPath, ['node_modules/@launch-video-maker/runtime/runtime/dist/cli.js', 'still', '269', join(root, 'last.png')], {cwd: project});
    assert.ok((await readFile(join(root, 'last.png'))).length > 1000);
    const pkg = JSON.parse(await readFile(join(project, 'package.json'), 'utf8'));
    assert.match(pkg.dependencies['@launch-video-maker/runtime'], /^file:vendor\//);
    assert.equal(JSON.parse(await readFile(join(project, 'brand-kit/sources.json'), 'utf8')).kind, 'fictional-method-study');
  } finally { await rm(root, {recursive: true, force: true}); }
});

test('every comparison is reproducible after random and reverse seek with stable local fonts', {timeout: 240000}, async () => {
  const root = await mkdtemp(join(tmpdir(), 'lvm-study-seek-'));
  try {
    const project = await createStudy(join(root, 'film'), {caseId: 'R01', variant: 'good'});
    for (const study of Object.values(studies)) {
      let expected: unknown;
      for (const variant of ['good', 'bad'] as const) {
        await writeFile(join(project, 'study-config.ts'), `export const caseId = '${study.id}';\nexport const variant = '${variant}' as const;\n`);
        const server = await startServer(project);
        const capture = await openCapture(server);
        try {
          const film = server.prepared.film;
          const signature = {width: film.width, height: film.height, fps: film.fps, duration: film.durationInFrames, assets: film.assets, audio: film.audio};
          if (expected) assert.deepEqual(signature, expected); else expected = signature;
          const frames = [...new Set([0, ...Object.values(film.markers), film.durationInFrames - 1])];
          const samples = new Map<number, Buffer>();
          for (const frame of frames) samples.set(frame, await capture.frame(frame));
          for (const frame of [...frames].reverse()) assert.deepEqual(await capture.frame(frame), samples.get(frame), `${study.id}/${variant} frame ${frame}`);
          for (const frame of [frames[1], frames.at(-1)!, 0, frames[1]]) assert.deepEqual(await capture.frame(frame), samples.get(frame));
          if (study.id === 'T04' && variant === 'good') {
            for (const frame of [60, 90, 120]) {
              await capture.frame(frame);
              assert.equal(await capture.page.locator('[data-query]').count(), 1, 'handoff keeps one text object');
            }
          }
          await capture.frame(film.durationInFrames - 1);
          const state = await capture.page.evaluate(() => ({
            fontReady: document.fonts.check('64px "Study Sans"', 'Document insights'),
            text: document.querySelector('#stage')?.textContent,
            overflow: [...document.querySelectorAll('[data-readable]')].filter(node => {
              const r = node.getBoundingClientRect(); const s = getComputedStyle(node);
              return Number(s.opacity) > 0.9 && (r.left < 0 || r.right > 1921 || r.top < 0 || r.bottom > 1081);
            }).length,
          }));
          assert.equal(state.fontReady, true);
          assert.equal(state.overflow, 0, `${study.id}/${variant} readable text outside frame`);
          assert.ok(state.text?.trim());
          const finalText: Record<string, string> = {R01: 'Launch date pending', T01: 'clear insights', T02: 'creations', T03: 'results', T04: 'Launch plan'};
          assert.ok(state.text?.includes(finalText[study.id]), `${study.id} final content`);
          if (variant === 'good') {
            const before = await capture.frame(film.durationInFrames - 10);
            assert.deepEqual(before, await capture.frame(film.durationInFrames - 1), `${study.id} final reading hold`);
          }
        } finally { await capture.close(); await server.close(); }
      }
    }
  } finally { await rm(root, {recursive: true, force: true}); }
});
