import {W,H,STATIONS} from './config.js';
import {makeState,tick,start} from './state.js';
import {makeInput} from './input.js';
import {interact} from './stations.js';
import {draw} from './render.js';
import {stageShot} from './shots.js';
import {makeAudio} from './audio.js';
const canvas=document.getElementById('game'),status=document.getElementById('status');const input=makeInput(canvas),sound=makeAudio();const params=new URLSearchParams(location.search);const seedNum=Number.parseInt(params.get('seed')||'1',10);const seed=Number.isFinite(seedNum)?seedNum:1;const s=makeState(seed);window.__gameState=s;let last=performance.now();
if(params.has('shot'))stageShot(s,params.get('shot'));
function announce(){status.textContent=`${s.screen}. Score ${s.score}. ${s.orders.length} tickets. ${s.hearts} hearts.`}
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
if(!params.has('shot')){
const ticketX=input.ticket();if(ticketX!==null){const n=s.orders.length,tw=Math.min(286,(1208-14*Math.max(0,n-1))/Math.max(1,n));const i=Math.max(0,Math.min(n-1,Math.floor((ticketX-36)/(tw+14))));if(s.orders[i])s.orders.unshift(...s.orders.splice(i,1))}const selected=input.station();if(selected){s.station=selected;const st=STATIONS.find(x=>x.id===selected);s.cook.x=st.x;s.cook.y=510}
if(input.pause()&&s.screen==='play')s.screen='paused';else if(input.pause()&&s.screen==='paused')s.screen='play';
if(input.action()){if(s.screen==='title'||s.screen==='over'||s.screen==='won'){start(s);sound('start')}else if(s.screen==='paused')s.screen='play';else if(s.screen==='play')interact(s,sound)}
if(s.screen==='play'){let dx=0,dy=0;if(input.held('a')||input.held('arrowleft'))dx=-1;if(input.held('d')||input.held('arrowright'))dx=1;if(input.held('w')||input.held('arrowup'))dy=-1;if(input.held('s')||input.held('arrowdown'))dy=1;s.cook.x=Math.max(35,Math.min(1050,s.cook.x+dx*340*dt));s.cook.y=Math.max(420,Math.min(550,s.cook.y+dy*240*dt));const near=STATIONS.reduce((a,b)=>Math.abs(b.x-s.cook.x)<Math.abs(a.x-s.cook.x)?b:a,STATIONS[0]);if(Math.abs(near.x-s.cook.x)<82)s.station=near.id;tick(s,dt)}
announce();}
draw(canvas,s);if(params.has('shot'))window.__shotReady=true;requestAnimationFrame(frame)}requestAnimationFrame(frame);
