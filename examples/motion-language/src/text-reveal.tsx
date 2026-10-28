import React from 'react';
import type {StudyProps} from './types.js';
import {Stage, Center, Kicker, accent, progress, out} from './shared.js';

const lines = ['把复杂的资料，', '变成清晰的重点。'];
export function TextReveal({frame, variant}: StudyProps) {
  const good = variant === 'good';
  const phrase = (text: string, start: number, emphasis = false) => {
    const p = out(progress(frame, start, start + 24));
    return <span key={text} data-readable style={{display: 'inline-block', opacity: p, color: emphasis ? accent : undefined,
      transform: `translateY(${(1 - p) * 72}px)`, filter: `blur(${(1 - p) * 5}px)`}}>{text}</span>;
  };
  return <Stage><Kicker>GATHER / TEXT</Kicker><Center style={{flexDirection: 'column', gap: 32, fontSize: 110, lineHeight: 1.5}}>
    {good ? <>
      <div>{phrase(lines[0], 4)}</div>
      <div>{phrase('变成', 28)}{phrase('清晰的重点。', 48, true)}</div>
    </> : lines.map((line, row) => <div key={line}>{[...line].map((char, i) => {
      const p = progress(frame, (i + row * lines[0].length) * 6, (i + row * lines[0].length) * 6 + 18);
      return <span key={i} data-readable style={{display: 'inline-block', opacity: p,
        color: row === 1 && i >= 2 ? accent : undefined,
        transform: `translateY(${(1 - p) * 72 - Math.sin(p * Math.PI * 2) * 26}px)`}}>{char}</span>;
    })}</div>)}
  </Center></Stage>;
}
