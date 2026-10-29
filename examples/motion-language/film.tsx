import React from 'react';
import {defineFilm} from '@launch-video-maker/runtime';
import {caseId, variant} from './study-config.js';
import {resolveStudy} from './src/catalog.js';

const study = resolveStudy(caseId);
export const film = defineFilm({
  width: 1920, height: 1080, fps: {num: 30, den: 1}, durationInFrames: study.durationInFrames,
  seed: 7, scenes: [{id: study.id, start: 0, end: study.durationInFrames}],
  assets: [{id: 'study-font', kind: 'font', family: 'Study Sans', src: 'assets/NotoSansSC-Study-700.ttf'}],
  audio: [], markers: study.markers,
});

export default function Frame({frame}: {frame: number}) {
  return <study.Frame frame={frame} variant={variant} />;
}
