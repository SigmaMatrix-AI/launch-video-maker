import React from 'react';
import type {StudyProps} from './types.js';
import {Stage, Center, Kicker, accent, progress, out} from './shared.js';

const words = ['文档', '演示作品', '作品'];
export function TextReplace({frame, variant}: StudyProps) {
  const index = Math.min(2, Math.floor(frame / 70));
  const p = out(progress(frame - index * 70, 0, 22));
  const good = variant === 'good';
  return <Stage><Kicker>GATHER / TEXT</Kicker><Center style={{flexDirection: 'column', gap: 18}}>
    <div style={{opacity: good ? 1 : p, transform: good ? undefined : `translateY(${(1 - p) * 90}px)`, textAlign: 'center'}}>
      <div data-readable style={{fontSize: 76, marginBottom: 30}}>把想法变成</div>
      <div style={{height: 190, width: 850, overflow: 'hidden', position: 'relative', fontSize: 142, lineHeight: '190px', color: accent}}>
        {good && index > 0 && p < 1 && <div style={{position: 'absolute', inset: 0, transform: `translateY(${-p * 190}px)`}}>{words[index - 1]}</div>}
        <div data-readable data-swap style={{position: 'absolute', inset: 0,
          transform: good ? `translateY(${(1 - p) * 190}px)` : undefined}}>{words[index]}</div>
      </div>
    </div>
  </Center></Stage>;
}
