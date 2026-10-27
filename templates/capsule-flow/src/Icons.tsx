import React from 'react';
export function Hand({x,y,size=156,angle=-12,press=0}:{x:number;y:number;size?:number;angle?:number;press?:number}){
 return <svg width={size} height={size*1.22} viewBox="0 0 100 122" style={{position:'absolute',left:x-size*.33,top:y,overflow:'visible',transformOrigin:'33% 8%',transform:`rotate(${angle}deg) scale(${1-.1*press})`,filter:'drop-shadow(-15px 22px 15px #30364c3c)'}}>
 <path d="M36 10C36 1 51 1 52 10L53 46C56 37 67 38 69 45C72 36 83 39 85 46C90 40 99 44 99 53L99 79C99 89 92 98 89 104L89 116L77 116L72 108L68 118L42 118L41 109C25 99 14 87 9 75C6 67 12 59 20 62L34 73Z" fill="#fff" stroke="#111" strokeWidth="5.5" strokeLinejoin="round"/>
 <path d="M57 69V91M69 69V91M81 69V91" fill="none" stroke="#111" strokeWidth="5"/>
 </svg>;
}
export function MenuIcon({kind}:{kind:string}){
 const color=kind==='vids'?'#9337e8':kind==='docs'?'#4b86f5':kind==='sheets'?'#5ab65d':'#eab73f';
 if(['vids','docs','sheets','slides'].includes(kind))return <svg width="110" height="110" viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="11" fill={color}/>{kind==='vids'?<path d="M31 24L77 50L31 76Z" fill="white"/>:kind==='docs'?<path d="M24 27H77M24 49H77M24 71H65" stroke="white" strokeWidth="9"/>:kind==='sheets'?<path d="M37 14V86M15 42H86" stroke="white" strokeWidth="9"/>:<rect x="21" y="27" width="59" height="44" fill="none" stroke="white" strokeWidth="8"/>}</svg>;
 return <svg width="112" height="112" viewBox="0 0 100 100" fill="none" stroke="#494c4b" strokeWidth="8" strokeLinejoin="round">{kind==='folder'?<path d="M6 15H37L49 25H94V85H6Z" fill="#494c4b"/>:kind==='folder-upload'?<><path d="M6 20H37L49 30H94V85H6Z"/><path d="M56 76V43M40 59L56 43L71 59"/></>:kind==='file'?<><path d="M18 4H60L88 31V94H18Z"/><path d="M60 4V31H88M52 83V49M36 65L52 49L68 65"/></>:<><rect x="10" y="5" width="80" height="90" rx="5"/><path d="M11 81H90"/>{kind==='shared'?<><circle cx="34" cy="38" r="6" fill="#494c4b"/><circle cx="66" cy="38" r="6" fill="#494c4b"/><path d="M24 66V60Q34 49 44 60V66M55 66V60Q65 49 75 60V66"/></>:<path d="M30 61L22 49L42 21H56L76 51L69 62ZM32 49H66M42 21L62 61M56 21L30 61" strokeWidth="5" fill="#494c4b"/>}</>}</svg>;
}
