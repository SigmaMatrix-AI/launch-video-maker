import React from 'react';

export const ink = '#f2f4ec';
export const accent = '#baf568';
export const muted = '#91a39b';
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const progress = (frame: number, start: number, end: number) => clamp((frame - start) / (end - start));
export const out = (p: number) => 1 - Math.pow(1 - clamp(p), 3);
export const smooth = (p: number) => {const t = clamp(p); return t * t * (3 - 2 * t);};
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

export function Stage({children}: {children: React.ReactNode}) {
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden', color: ink,
    background: 'radial-gradient(ellipse at 50% 30%, #213b33 0%, #0c1916 70%)',
    fontFamily: '"Study Sans"', fontWeight: 400, fontSynthesis: 'none'}}>{children}</div>;
}

export function Center({children, style}: {children: React.ReactNode; style?: React.CSSProperties}) {
  return <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>{children}</div>;
}

export function Kicker({children}: {children: React.ReactNode}) {
  return <div data-readable style={{position: 'absolute', left: 120, top: 80, fontSize: 24, letterSpacing: 4, color: muted}}>{children}</div>;
}

export function Panel({children, style}: {children: React.ReactNode; style?: React.CSSProperties}) {
  return <div style={{border: '1px solid #6b87744a', borderRadius: 32, background: '#1d3028',
    boxShadow: '0 40px 120px #0006', padding: 50, ...style}}>{children}</div>;
}
