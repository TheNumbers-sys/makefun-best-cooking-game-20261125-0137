import {W,H,STATIONS} from './config.js';
const rnd=(c,x,y,w,h,r=12)=>{c.beginPath();c.roundRect(x,y,w,h,r)};
function text(c,str,x,y,size=16,color='#f8f0df',weight=700,align='left'){c.fillStyle=color;c.font=`${weight} ${size}px system-ui, sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillText(str,x,y)}
function panel(c,x,y,w,h,fill='#252532',stroke='#ffffff18',r=14){rnd(c,x,y,w,h,r);c.fillStyle=fill;c.fill();c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}
function heart(c,x,y,on){c.save();c.translate(x,y);c.scale(1.2,1.2);c.fillStyle=on?'#fa6f6c':'#514148';c.beginPath();c.moveTo(0,8);c.bezierCurveTo(-23,-6,-12,-20,0,-9);c.bezierCurveTo(12,-20,23,-6,0,8);c.fill();c.restore()}
function plate(c,x,y,color,label){c.fillStyle='#e8e3d7';c.beginPath();c.ellipse(x,y,54,25,0,0,Math.PI*2);c.fill();c.fillStyle='#fffaf0';c.beginPath();c.ellipse(x,y,43,18,0,0,Math.PI*2);c.fill();c.fillStyle=color;c.beginPath();c.ellipse(x,y,26,10,0,0,Math.PI*2);c.fill();text(c,label,x,y,9,'#362a2b',900,'center')}
function ticket(c,o,x,y,w){panel(c,x,y,w,119,'#fff7e8','#ffffff22',14);c.fillStyle=o.recipe.color;rnd(c,x,y,7,119,3);c.fill();text(c,String(o.id).padStart(2,'0'),x+22,y+21,13,'#8a7d6c',800);text(c,o.recipe.short,x+48,y+22,13,'#302c33',900);const ratio=Math.max(0,o.remaining/o.total),col=ratio<.28?'#e95f61':ratio<.55?'#e6a24d':'#66b88a';text(c,`${Math.ceil(o.remaining)}s`,x+w-18,y+22,13,col,900,'right');panel(c,x+18,y+39,w-36,6,'#e8ddcd','#00000000',4);panel(c,x+18,y+39,(w-36)*ratio,6,col,'#00000000',4);o.recipe.ingredients.forEach((it,i)=>{text(c,`${i+1}  ${it[0]}`,x+20+(i%2)*((w-32)/2),y+63+Math.floor(i/2)*22,11,'#70695f',650)});}
export function draw(canvas,s){const dpr=Math.min(2,devicePixelRatio||1),w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}const c=canvas.getContext('2d');c.setTransform(canvas.width/1280,0,0,canvas.height/800,0,0);c.clearRect(0,0,W,H);
const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#222633');bg.addColorStop(.52,'#313342');bg.addColorStop(1,'#1a1c27');c.fillStyle=bg;c.fillRect(0,0,W,H);
// warm tiled back wall
for(let y=181;y<490;y+=44)for(let x=(Math.floor(y/44)%2)*34;x<1280;x+=68){c.fillStyle='#ffffff06';c.fillRect(x,y,1,44);c.fillRect(x,y,68,1)}
// marquee
panel(c,35,26,390,94,'#3a2c32','#f0bf6b66',17);text(c,'SIZZLE',57,63,34,'#fff1d7',950);text(c,'& SERVE',231,63,34,'#ffbf68',950);text(c,'DINER  ·  EST. 1986',59,96,11,'#dba979',800);
// status strip
panel(c,449,28,391,88,'#292b38','#ffffff10',16);text(c,'DINNER RUSH',470,51,11,'#9a9aaa',800);text(c,'SHIFT',470,83,13,'#f0d4a9',800);const m=Math.floor(s.shift/60),sec=Math.floor(s.shift%60);text(c,`${m}:${String(sec).padStart(2,'0')}`,530,83,27,s.shift<20?'#ff7770':'#fff4dc',900);text(c,'SCORE',650,51,11,'#9a9aaa',800);text(c,String(s.score).padStart(5,'0'),650,83,25,'#f4c974',900);text(c,'COMBO',754,51,11,'#9a9aaa',800);text(c,`×${s.combo}`,755,83,25,'#83d5aa',900);
text(c,'HEARTS',1058,49,11,'#a5a2ad',800);for(let i=0;i<3;i++)heart(c,1090+i*40,85,i<s.hearts);
// tickets
text(c,'ORDER RAIL',38,152,12,'#d5a86a',900);text(c,'CLICK A TICKET TO FOCUS',1241,152,10,'#9594a1',700,'right');const gap=14,tw=Math.min(286,(1208-gap*Math.max(0,s.orders.length-1))/Math.max(1,s.orders.length));s.orders.forEach((o,i)=>ticket(c,o,36+i*(tw+gap),171,tw));
// room and decor
panel(c,27,317,1226,176,'#3b3438','#ffffff0c',14);text(c,'✦',80,352,24,'#f2ca79');text(c,'✦',1180,356,21,'#f2ca79');panel(c,82,348,128,100,'#242630','#dca36544',10);text(c,'HOT',146,376,15,'#f3be71',900,'center');text(c,'& FRESH',146,402,15,'#fff0d8',900,'center');text(c,'OPEN',146,429,10,'#83d5aa',900,'center');
// counter run
panel(c,32,472,1216,147,'#74564c','#ba9270',18);panel(c,32,472,1216,18,'#b98c66','#00000000',7);for(let x=49;x<1235;x+=34){c.fillStyle='#ffffff09';c.fillRect(x,493,2,111)}
// selected station highlights
STATIONS.forEach(st=>{const active=s.station===st.id;panel(c,st.x,452,155,141,active?'#4c4044':'#342e36',active?st.color+'aa':'#ffffff13',15);c.fillStyle=st.color;c.beginPath();c.arc(st.x+77,477,4,0,Math.PI*2);c.fill();text(c,st.icon,st.x+77,513,28,st.color,800,'center');text(c,st.name,st.x+77,541,11,'#fff2df',900,'center');panel(c,st.x+61,555,32,23,'#211f28','#ffffff17',7);text(c,st.hint,st.x+77,567,11,'#f6d18c',900,'center')});
// loose ingredients / board & appliances
s.inventory.forEach((n,i)=>{const x=196+(i%4)*48,y=424-Math.floor(i/4)*23;panel(c,x,y,43,25,'#efe4cb','#ffffff55',10);text(c,n.slice(0,7),x+21,y+13,8,'#554438',800,'center')});
// griddle glow
panel(c,553,408,132,49,'#27252c','#e9755677',12);c.fillStyle='#e6674788';c.beginPath();c.ellipse(619,432,43,10,0,0,Math.PI*2);c.fill();text(c,'HOT',619,432,10,'#ffe1ba',900,'center');
// board platter contents, active plate + ready plate
if(s.plate)plate(c,834,421,s.plate.recipe.color,s.plate.recipe.short.slice(0,8));else {plate(c,834,421,'#d9c19d','EMPTY')}
if(s.ready)plate(c,1111,421,s.ready.recipe.color,'READY');else plate(c,1111,421,'#80958a','PASS');
text(c,'INGREDIENTS',191,391,10,'#ecbe86',800);text(c,'GRIDDLE',584,391,10,'#ecbe86',800);text(c,'ASSEMBLY',786,391,10,'#ecbe86',800);text(c,'SERVE NOW',1069,391,10,'#ecbe86',800);
// cook character follows station
const px=s.cook.x+77,py=355+(s.cook.y-510)*.22;c.fillStyle='#e8aa88';c.beginPath();c.arc(px,py,18,0,Math.PI*2);c.fill();c.fillStyle='#392b31';c.beginPath();c.arc(px,py-6,19,Math.PI,Math.PI*2);c.fill();panel(c,px-28,py+17,56,61,'#e7dfd0','#ffffff40',18);c.fillStyle='#da6959';c.fillRect(px-24,py+35,48,7);c.fillStyle='#f2c975';c.beginPath();c.arc(px+8,py+45,4,0,Math.PI*2);c.fill();c.fillStyle='#2f2930';c.fillRect(px-20,py+76,15,22);c.fillRect(px+5,py+76,15,22);text(c,'CHEF',px,py+108,9,'#ffe3ba',900,'center');
// delivery tray at pass
panel(c,1038,463,180,25,'#c6a273','#e8c798',7);text(c,'PICKUP WINDOW',1128,475,9,'#45363a',900,'center');
// ingredients inventory strip and action cue
panel(c,35,648,873,105,'#252632','#ffffff12',16);text(c,'YOUR PREP',56,672,11,'#a6a3ad',900);const groups=[['PANTRY',s.inventory,'#efbd72'],['CHOPPED',s.chopped,'#83d1a1'],['COOKED',s.cooked,'#ed8b66']];groups.forEach((g,i)=>{const x=56+i*276;text(c,g[0],x,704,10,g[2],900);const items=g[1].length?g[1].slice(0,5):['—'];items.forEach((n,j)=>{panel(c,x+j*79,720,72,24,'#353440','#ffffff10',8);text(c,n,x+j*79+36,732,9,'#f2eadb',700,'center')})});
panel(c,925,648,320,105,'#252632','#ffffff12',16);text(c,'NEXT MOVE',946,674,11,'#a6a3ad',900);text(c,'1–5 station  ·  SPACE prep',946,702,12,'#f0d8b0',750);text(c,'WASD move  ·  P pause',946,727,12,'#c0bdc8',650);
if(s.toastTime>0){panel(c,397,286,486,56,'#fff1d8','#f0c270',17);text(c,s.toast,640,314,18,'#392c32',900,'center')}
if(s.screen==='title'||s.screen==='paused'||s.screen==='over'||s.screen==='won'){c.fillStyle='#11121bcc';c.fillRect(0,0,W,H);panel(c,305,170,670,470,'#302d3a','#f1c57688',26);text(c,s.screen==='title'?'YOUR LITTLE DINER, YOUR BIG NIGHT':s.screen==='paused'?'TAKE A BREATHER':s.screen==='won'?'SHIFT COMPLETE!':'KITCHEN CLOSED',640,239,29,'#fff0d6',950,'center');text(c,s.screen==='title'?'Every ticket is a tiny kitchen adventure.':s.screen==='won'?'You kept the rush smiling. Beautiful work, chef.':s.screen==='paused'?'The tickets can wait a moment.':'The rush got away from us. One more shift?',640,285,16,'#d0c8c9',600,'center');if(s.screen==='title'){['TAKE ingredients at Pantry','CHOP produce · GRILL the hot things','ASSEMBLE the ticket · SERVE at the pass','WASD / arrows move · 1–5 jump stations','SPACE / ENTER interact · click to move & prep'].forEach((t,i)=>{text(c,t,640,352+i*33,14,i===4?'#f4c779':'#f2eadf',700,'center')})}else{text(c,`FINAL SCORE  ${s.score}     ·     BEST COMBO  ×${s.combo}`,640,365,19,'#f4ca77',900,'center')}panel(c,474,512,332,63,'#e5a85b','#ffdda0',16);text(c,s.screen==='paused'?'RESUME   ·   SPACE':s.screen==='title'?'START SHIFT   ·   SPACE':'PLAY AGAIN   ·   SPACE',640,544,17,'#392c32',950,'center');text(c,'CLICK ANYWHERE TO START',640,607,10,'#aaa2aa',750,'center')}}
