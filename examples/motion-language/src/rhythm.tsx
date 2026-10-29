import React from 'react';
import type {StudyProps} from './types.js';
import {Stage, Center, Kicker, Panel, accent, muted, progress, out} from './shared.js';

// Same content and 270 frames. Only the time allocation and motion change.
export function Rhythm({frame, variant}: StudyProps) {
  const good = variant === 'good';
  const second = good ? 54 : 90;
  const third = good ? 144 : 180;
  const phase = frame < second ? 0 : frame < third ? 1 : 2;
  const local = frame - [0, second, third][phase];
  const entrance = good ? out(progress(local, 0, phase === 2 ? 34 : 18)) : progress(local, 0, 7);
  const selection = good ? out(progress(local, 16, 26)) : progress(local, 0, 7);
  const resultAt = good ? 32 : 70;
  const result = good ? out(progress(local, resultAt, resultAt + 15)) : progress(local, resultAt, resultAt + 7);
  return <Stage><Kicker>GATHER / 3 STEPS</Kicker><Center>
    <div style={{opacity: entrance, transform: `translateY(${(1 - entrance) * 80}px)`, width: 1100}}>
      {phase === 0 && <div data-readable style={{fontSize: 112, textAlign: 'center'}}>Find <span style={{color: accent}}>documents</span></div>}
      {phase === 1 && <Panel><div data-readable style={{fontSize: 32, color: muted, marginBottom: 34}}>Select documents</div>
        {['Launch plan', 'Design review'].map(text => <div key={text} style={{display: 'flex', gap: 26, padding: '22px 0', alignItems: 'center'}}>
          <div style={{width: 36, height: 36, border: `2px solid ${accent}`, borderRadius: 10, background: `rgba(186,245,104,${selection})`, transform: `scale(${1 - Math.sin(selection * Math.PI) * .15})`}} />
          <span data-readable style={{fontSize: 46}}>{text}</span>
        </div>)}
        <div data-readable style={{color: accent, fontSize: 26, marginTop: 26, opacity: selection}}>2 documents selected</div>
      </Panel>}
      {phase === 2 && <Panel style={{borderColor: '#baf56888'}}><div data-readable style={{fontSize: 34, color: accent}}>Summary</div>
        <div style={{opacity: result, transform: `translateY(${(1 - result) * 28}px)`, marginTop: 30}}>
          <div data-readable style={{fontSize: 60, lineHeight: 1.65}}>Design is complete.<br />Launch date pending.</div>
          <div data-readable style={{fontSize: 25, color: muted, marginTop: 30}}>Sources: Launch plan · Design review</div>
        </div>
      </Panel>}
    </div>
  </Center></Stage>;
}
