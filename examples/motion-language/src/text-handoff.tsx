import React from 'react';
import type {StudyProps} from './types.js';
import {Stage, Kicker, accent, muted, progress, smooth, out, lerp} from './shared.js';

export function TextHandoff({frame, variant}: StudyProps) {
  const good = variant === 'good';
  const move = smooth(progress(frame, 52, 104));
  const ui = out(progress(frame, good ? 78 : 86, good ? 112 : 95));
  const result = out(progress(frame, 116, 144));
  const title = out(progress(frame, 0, 22));
  const badVisible = frame < 70 ? title : frame < 86 ? 0 : ui;
  const p = good ? move : frame < 86 ? 0 : 1;
  return <Stage><Kicker>GATHER / SEARCH</Kicker>
    <div style={{position: 'absolute', left: 220, right: 220, top: 260, bottom: 150, borderRadius: 38,
      background: '#20342c', border: '1px solid #baf56844', boxShadow: '0 40px 100px #0005', opacity: ui,
      transform: `translateY(${good ? 0 : (1 - ui) * 70}px)`}}>
      <div style={{position: 'absolute', left: 38, right: 38, top: 28, height: 96, borderRadius: 18, background: '#10231a', border: '1px solid #baf56888'}} />
      <div style={{position: 'absolute', top: 178, left: 58, right: 58, opacity: result, transform: `translateY(${(1 - result) * 30}px)`}}>
        {['Launch plan', 'Design review'].map((text, i) => <div key={text} style={{padding: '24px 0', borderBottom: '1px solid #ffffff18'}}>
          <div data-readable style={{fontSize: 46, color: i ? undefined : accent}}>{text}</div>
          <div data-readable style={{fontSize: 25, color: muted, marginTop: 14}}>{i ? 'Design is complete' : 'Launch date pending'}</div>
        </div>)}
      </div>
    </div>
    {/* One object, one coordinate path: never render a second query underneath. */}
    <div data-query data-readable style={{position: 'absolute', left: lerp(960, 300, p), top: lerp(470, 306, p),
      fontSize: lerp(132, 44, p), lineHeight: 1.3, whiteSpace: 'nowrap', color: accent,
      opacity: good ? title : badVisible, transform: `translateX(${-50 * (1 - p)}%)`}}>Launch plan</div>
  </Stage>;
}
