import { useEffect, useRef } from 'react';
export default function StarConstellation(){
const canvasRef=useRef(null);
useEffect(()=>{

const c=canvasRef.current;if(!c)return;const g=c.getContext('2d');if(!g)return;const motion=matchMedia('(prefers-reduced-motion: reduce)');let reduced=motion.matches;
let w,h,stars=[],dust=[],edges=new Map(),p={x:0,y:0,on:false},pulse=null,raf=0,last=0,seed=317,beacon=-1,beaconAlpha=0,shineStart=-10000;
function rand(){seed=seed*16807%2147483647;return(seed-1)/2147483646}
function wake(){if(!raf&&!document.hidden)raf=requestAnimationFrame(draw)}
function resize(){const b=c.getBoundingClientRect();w=b.width;h=b.height;const d=Math.min(devicePixelRatio||1,2);c.width=w*d;c.height=h*d;g.setTransform(d,0,0,d,0,0);seed=317;stars=[];dust=[];edges.clear();pulse=null;beacon=-1;beaconAlpha=0;const cols=Math.max(4,Math.round(w/85)),rows=Math.round(h/80);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)stars.push({x:(x+.2+rand()*.6)*w/cols,y:(y+.2+rand()*.6)*h/rows,r:2+rand()*3,base:.23+rand()*.28,a:0});for(let i=0;i<w*h/1200;i++)dust.push({x:rand()*w,y:rand()*h,r:.3+rand()*.5,a:.10+rand()*.19});wake()}
function star(s,r,color,a){g.shadowColor=color;g.shadowBlur=a>.45?12:3;g.globalAlpha=a;g.fillStyle=color;g.beginPath();g.moveTo(s.x,s.y-r);g.lineTo(s.x+r*.16,s.y-r*.16);g.lineTo(s.x+r*.8,s.y);g.lineTo(s.x+r*.16,s.y+r*.16);g.lineTo(s.x,s.y+r);g.lineTo(s.x-r*.16,s.y+r*.16);g.lineTo(s.x-r*.8,s.y);g.lineTo(s.x-r*.16,s.y-r*.16);g.closePath();g.fill();g.shadowBlur=0;if(a>.48){g.globalAlpha=a*.85;g.fillStyle='#fff9e9';g.beginPath();g.arc(s.x,s.y,Math.max(.65,r*.12),0,Math.PI*2);g.fill()}}
function draw(now){raf=0;let moving=false;const dt=Math.min(40,now-(last||now));last=now;const ease=reduced?1:1-Math.exp(-dt/150),radius=Math.min(165,w*.45);const near=p.on?stars.map((s,i)=>({i,d:Math.hypot(s.x-p.x,s.y-p.y)})).filter(s=>s.d<radius).sort((a,b)=>a.d-b.d).slice(0,5):[],wanted=new Set();
if(near.length>1){const joined=[near[0].i],rest=near.slice(1).map(s=>s.i);while(rest.length){let best=null;for(const a of joined)for(const b of rest){const d=Math.hypot(stars[a].x-stars[b].x,stars[a].y-stars[b].y);if(!best||d<best.d)best={a,b,d}}if(best.d<150){const key=[best.a,best.b].sort((a,b)=>a-b).join('-');wanted.add(key);if(!edges.has(key))edges.set(key,{a:best.a,b:best.b,v:0})}joined.push(best.b);rest.splice(rest.indexOf(best.b),1)}}
g.globalAlpha=1;g.fillStyle='#070609';g.fillRect(0,0,w,h);const wash=g.createRadialGradient(w*.8,h*.8,0,w*.8,h*.8,w*.7);wash.addColorStop(0,'rgba(117,13,35,.10)');wash.addColorStop(1,'rgba(7,6,9,0)');g.fillStyle=wash;g.fillRect(0,0,w,h);for(const s of dust){g.globalAlpha=s.a;g.fillStyle='#fff0d6';g.beginPath();g.arc(s.x,s.y,s.r,0,Math.PI*2);g.fill()}
for(const[key,e]of edges){const target=wanted.has(key)?.45:0;e.v+=(target-e.v)*ease;if(Math.abs(target-e.v)>.005)moving=true;if(!target&&e.v<.005){edges.delete(key);continue}g.globalAlpha=e.v;g.strokeStyle='#f52d49';g.shadowColor='#ed193d';g.shadowBlur=7;g.lineWidth=1.05;g.beginPath();g.moveTo(stars[e.a].x,stars[e.a].y);g.lineTo(stars[e.b].x,stars[e.b].y);g.stroke();g.shadowBlur=0}
for(const s of stars){const target=p.on?Math.max(0,1-Math.hypot(s.x-p.x,s.y-p.y)/radius):0;s.a+=(target-s.a)*ease;if(Math.abs(target-s.a)>.005)moving=true;const elapsed=(now-shineStart)/1000;const glint=!reduced&&elapsed>=0&&elapsed<2.4?Math.pow(Math.max(0,Math.sin(elapsed*2.7-s.x*.012)),10)*s.a:0;if(p.on&&elapsed<2.4&&!reduced)moving=true;star(s,s.r*(1+s.a*.7+glint*.65),'#fff0d6',Math.min(1,s.base+(.9-s.base)*s.a+glint*.25));if(glint>.05){g.globalAlpha=glint*.4;g.strokeStyle='#fff5df';g.lineWidth=.55;g.beginPath();g.moveTo(s.x-s.r*2.5,s.y);g.lineTo(s.x+s.r*2.5,s.y);g.moveTo(s.x,s.y-s.r*3);g.lineTo(s.x,s.y+s.r*3);g.stroke()}}
if(near.length){beacon=near[0].i}const targetBeacon=near.length?1:0;beaconAlpha+=(targetBeacon-beaconAlpha)*ease;if(Math.abs(targetBeacon-beaconAlpha)>.005)moving=true;if(beacon>=0&&stars[beacon]){const b=stars[beacon];g.globalAlpha=beaconAlpha;const halo=g.createRadialGradient(b.x,b.y,0,b.x,b.y,38);halo.addColorStop(0,'rgba(255,83,100,.27)');halo.addColorStop(.3,'rgba(232,35,67,.12)');halo.addColorStop(1,'rgba(232,35,67,0)');g.fillStyle=halo;g.fillRect(b.x-38,b.y-38,76,76);star(b,b.r+7,'#f52d49',beaconAlpha*.95);g.globalAlpha=beaconAlpha*.16;g.strokeStyle='#fff0d6';g.lineWidth=.6;g.setLineDash([1,7]);g.beginPath();g.arc(b.x,b.y,25,0,Math.PI*2);g.stroke();g.setLineDash([])}if(pulse){const t=(now-pulse.time)/1500;if(t<1){moving=true;const s=stars[pulse.i];if(!reduced){g.globalAlpha=(1-t)*.4;g.strokeStyle='#fff0d6';g.lineWidth=.7;g.setLineDash([2,6]);g.beginPath();g.arc(s.x,s.y,12+t*90,0,Math.PI*2);g.stroke();g.setLineDash([])}star(s,s.r+Math.sin(Math.PI*t)*(reduced?4:14),'#f52d49',1-t*.5)}else pulse=null}g.globalAlpha=1;if(moving)wake()}
function locate(e){if(!p.on||performance.now()-shineStart>2400)shineStart=performance.now();const b=c.getBoundingClientRect();p={x:e.clientX-b.left,y:e.clientY-b.top,on:true};wake()}
const leave=()=>{p.on=false;wake()};
let touchTimer;
const release=e=>{if(e.pointerType==='touch'){clearTimeout(touchTimer);touchTimer=setTimeout(leave,1400)}};
const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else{last=0;wake()}};
const motionChange=()=>{reduced=motion.matches;wake()};
window.addEventListener('pointermove',locate,{passive:true});
window.addEventListener('pointerdown',locate,{passive:true});
window.addEventListener('pointerup',release,{passive:true});
document.documentElement.addEventListener('pointerleave',leave);
window.addEventListener('blur',leave);
document.addEventListener('visibilitychange',visibility);
motion.addEventListener('change',motionChange);
const observer=new ResizeObserver(resize);observer.observe(c);
return()=>{cancelAnimationFrame(raf);clearTimeout(touchTimer);observer.disconnect();window.removeEventListener('pointermove',locate);window.removeEventListener('pointerdown',locate);window.removeEventListener('pointerup',release);document.documentElement.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',motionChange)};
},[]);
return <canvas ref={canvasRef} aria-hidden="true" style={{display:'block',width:'100%',height:'100%',pointerEvents:'none'}} />;
}
