import React from 'react';
import type {StudyProps} from './types.js';
import {Stage, Center, Kicker, accent, muted, progress, smooth} from './shared.js';

export function TextFocus({frame, variant}: StudyProps) {
  // Good hands attention to the result once. Bad continues moving the same focus.
  const focus = variant === 'good' ? smooth(progress(frame, 38, 66)) : (1 - Math.cos(frame / 18)) / 2;
  return <Stage><Kicker>GATHER / TEXT</Kicker><Center style={{flexDirection: 'column', gap: 44, fontSize: 112}}>
    <div data-readable style={{color: focus < .5 ? accent : muted, filter: `blur(${focus * 3}px)`, opacity: 1 - focus * .45}}>更少操作。</div>
    <div data-readable style={{position: 'relative', color: accent, filter: `blur(${(1 - focus) * 3}px)`, opacity: .55 + focus * .45}}>更清晰的结果。
      <div style={{position: 'absolute', height: 8, bottom: -20, left: 0, right: 0, background: accent, transformOrigin: 'left', transform: `scaleX(${focus})`}} />
    </div>
  </Center></Stage>;
}
