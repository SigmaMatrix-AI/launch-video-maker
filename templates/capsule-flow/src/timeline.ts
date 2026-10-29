const F=(seconds:number)=>Math.ceil(seconds*30000/1001);
// Delete three style close-ups and the unused tail of the former countdown.
export const cuts:readonly (readonly [number,number])[]=[[F(24.25),F(26.95)],[F(66.9),F(68.85)]];
export const toOutputFrame=(source:number)=>source-cuts.reduce((sum,[a,b])=>sum+Math.max(0,Math.min(source,b)-a),0);
export const toSourceFrame=(output:number)=>{let source=output;for(const [a,b] of cuts)if(source>=a)source+=b-a;return source;};
export const durationInFrames=toOutputFrame(2599);
