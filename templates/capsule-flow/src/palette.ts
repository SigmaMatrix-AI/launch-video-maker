// Shared approved TapVid gradient; use alpha for subtle surfaces, not different hues.
export const brandGreen='#78d701';
export const leafGreen='#529d30';
export const brandInk='#183b10';
export const brandGradient=(angle:number=112,alpha:string='')=>`linear-gradient(${angle}deg,${brandGreen}${alpha} 0%,${leafGreen}${alpha} 50%,${brandGreen}${alpha} 100%)`;
export const brandGlow=`radial-gradient(ellipse at 85% 35%,${brandGreen}25 0%,transparent 50%),radial-gradient(ellipse at 10% 85%,${leafGreen}20 0%,transparent 65%),radial-gradient(ellipse at 70% 0%,${brandGreen}18 0%,transparent 65%),#fdfdfd`;
