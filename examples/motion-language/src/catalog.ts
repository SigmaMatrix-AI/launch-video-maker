import type {StudyDefinition} from './types.js';
import {Rhythm} from './rhythm.js';
import {TextReveal} from './text-reveal.js';
import {TextReplace} from './text-replace.js';
import {TextFocus} from './text-focus.js';
import {TextHandoff} from './text-handoff.js';

export const studies: Record<string, StudyDefinition> = {
  R01: {id: 'R01', durationInFrames: 270, markers: {select: 76, reveal: 191, read: 240}, Frame: Rhythm},
  T01: {id: 'T01', durationInFrames: 180, markers: {phrase: 36, emphasis: 66, read: 150}, Frame: TextReveal},
  T02: {id: 'T02', durationInFrames: 210, markers: {first: 30, swap: 80, longest: 112, read: 190}, Frame: TextReplace},
  T03: {id: 'T03', durationInFrames: 180, markers: {first: 24, transfer: 52, read: 150}, Frame: TextFocus},
  T04: {id: 'T04', durationInFrames: 210, markers: {title: 36, transfer: 82, result: 136, read: 190}, Frame: TextHandoff},
};

export function resolveStudy(id: string): StudyDefinition {
  if (!Object.hasOwn(studies, id)) throw Error(`Unknown case: ${id}`);
  return studies[id];
}
