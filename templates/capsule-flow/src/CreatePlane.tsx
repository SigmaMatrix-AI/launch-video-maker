import React from 'react';
// Vector reconstruction of the user's TapVid create/send icon: rounded nose, two wings and tail notch.
// Shared by the creation button and the large transition silhouettes.
export const createPlanePath='M8 4 Q3 2 5 8 L18 40 L43 50 L18 60 L5 92 Q3 98 8 96 L95 54 Q103 50 95 46 Z';
export function CreatePlane({size=64,fill='currentColor'}:{size?:number;fill?:string}){
 return <svg width={size} height={size} viewBox="0 0 100 100" style={{display:'block',flexShrink:0}} aria-hidden="true"><path d={createPlanePath} fill={fill}/></svg>;
}
