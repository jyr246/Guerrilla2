'use strict';
const $=i=>document.getElementById(i),cv=$('c'),g=cv.getContext('2d'),menu=$('menu');
const T=32,N=100,W=N*T,HOLD=3600,RIFT={x:W/2,y:W/2,r:90};
const RN=Object.fromEntries(['w','f','g','s'].map(k=>[k,`<img class="ri" src="assets/r_${k}.png">`])),NC={w:'#1f5a22',f:'#c83a4a',g:'#e8c020',s:'#9a9aa5'};
const U={vil:{n:'Aldeano',hp:40,atk:3,rng:16,sp:1.2,cost:{f:50},r:7},
 sol:{n:'Soldado',hp:90,atk:9,rng:16,sp:1.1,cost:{f:60,g:20},r:8},
 arc:{n:'Arquero',hp:50,atk:6,rng:110,sp:1.1,cost:{w:40,g:40},r:7},
 cab:{n:'Caballero',hp:120,atk:12,rng:16,sp:1.9,cost:{f:80,g:60},r:9},
 cha:{n:'Chamán',hp:40,atk:0,rng:0,sp:1.1,cost:{f:40,g:60},r:7}};
const B={tc:{hp:1500,s:3,pop:5,i:'🏰'},bar:{hp:700,s:2,cost:{w:100,s:50},i:'⚔️'},house:{hp:250,s:1,pop:5,cost:{w:30},i:'🏠'},
 tem:{hp:500,s:2,cost:{w:120,g:50},i:'⛪'},unv:{hp:600,s:2,cost:{w:150,g:100},i:'🎓',ag:1},cas:{hp:2200,s:3,cost:{w:200,s:250,g:100},i:'🏯',ag:2}};
let AC=null,MUTE=0;
const SN={hit:[180,.06,'square',.04],spawn:[520,.1,'sine',.08],done:[392,.25,'triangle',.1],age:[660,.5,'triangle',.12],rift:[880,.3,'sine',.1],heal:[700,.08,'sine',.03],horn:[130,.9,'sawtooth',.1],err:[160,.12,'square',.05],sel:[600,.05,'sine',.04],win:[784,.8,'triangle',.15],lose:[110,.8,'sawtooth',.12],click:[440,.04,'square',.04]};
const initAudio=()=>{if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(_){}AC&&AC.state=='suspended'&&AC.resume()};
function snd(n){if(!AC||MUTE)return;const T0=AC.currentTime;if(T0-(LT[n]||0)<.05)return;LT[n]=T0;if(NZ[n]){const[f,d,v,ty]=NZ[n];nz(f,d,v,ty);return}const[f,d,t,v]=SN[n],o=AC.createOscillator(),gn=AC.createGain(),c=AC.currentTime;
 o.type=t;o.frequency.value=f;gn.gain.setValueAtTime(v,c);gn.gain.exponentialRampToValueAtTime(.0001,c+d);o.connect(gn);gn.connect(AC.destination);o.start();o.stop(c+d)}
const LT={},NZ={clash:[3200,.07,.07,'highpass'],arrow:[1800,.18,.05,'bandpass'],thud:[140,.3,.12,'lowpass'],crash:[90,.9,.2,'lowpass']};
let NB=null,MU=1,nt=0,mi=3,bs=0,amb=null,ag=null,af=null;
function nz(f,d,v,ty,t0){const c=t0||AC.currentTime;if(!NB){NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),gn=AC.createGain();s.buffer=NB;fl.type=ty;fl.frequency.value=f;gn.gain.setValueAtTime(v,c);gn.gain.exponentialRampToValueAtTime(.0001,c+d);s.connect(fl);fl.connect(gn);gn.connect(AC.destination);s.start(c,Math.random());s.stop(c+d)}
function nt_(f,t,d,ty,v){const o=AC.createOscillator(),gn=AC.createGain();o.type=ty;o.frequency.value=f;gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(v,t+.03);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(AC.destination);o.start(t);o.stop(t+d+.05)}
function civSnd(ci){if(!AC||MUTE||(LT.civ||0)>AC.currentTime-.4)return;LT.civ=AC.currentTime;const c=CS[ci],t=AC.currentTime;c.p.forEach((iv,i)=>nt_(c.f*2**(iv/12),t+i*.11,.28,c.t,.07))}
// música procedural (calma en exploración, tambores y ritmo en batalla) y ambiente por mapa
const SC=[0,2,3,5,7,9,10,12],ROOT=[146.8,130.8,123.5,138.6,110,146.8,116.5,123.5];
function music(){if(!AC||!MU||MUTE)return;const t=AC.currentTime,war=S&&!S.over&&S.t-S.lb<700,bt=war?.2:.5,r=ROOT[MAP]*(war?.84:1);if(nt<t)nt=t+.05;
 while(nt<t+.5){const b=bs++%16;
  if(b%8==0)nt_(r/2,nt,bt*8,'sine',.09),nt_(r/2*1.5,nt,bt*8,'sine',.04);
  if(war){if(b%2==0){const o=AC.createOscillator(),gn=AC.createGain();o.frequency.setValueAtTime(110,nt);o.frequency.exponentialRampToValueAtTime(40,nt+.15);gn.gain.setValueAtTime(.18,nt);gn.gain.exponentialRampToValueAtTime(.0001,nt+.2);o.connect(gn);gn.connect(AC.destination);o.start(nt);o.stop(nt+.22)}if(b%4==3)nz(900,.05,.04,'highpass',nt)}
  if(Math.random()<(war?.7:.4)){mi=Math.max(0,Math.min(14,mi+(Math.random()*5|0)-2));nt_(r*2**(SC[mi%8]/12+(mi/8|0)),nt,bt*(war?1.5:3),war?'sawtooth':'triangle',war?.025:.04)}
  nt+=bt}}
const AMB=[['bird',700],['bird',500],['wind',1400],['wind',2600],['wind',350],['bird',600],['frog',420],['wind',2000]];
function ambTick(){if(!AC)return;const on=S&&!S.over&&menu.hidden&&!MUTE;
 if(!amb){amb=AC.createBufferSource();if(!NB)nz(1,.01,.0001,'lowpass');amb.buffer=NB;amb.loop=true;af=AC.createBiquadFilter();af.type='bandpass';ag=AC.createGain();ag.gain.value=0;amb.connect(af);af.connect(ag);ag.connect(AC.destination);amb.start()}
 const [ty,f]=AMB[MAP];af.frequency.value=ty=='wind'?f*(.8+.2*Math.sin(AC.currentTime/3)):300;ag.gain.value=on?(ty=='wind'?.05:.012):0;
 if(on&&Math.random()<.01){const t=AC.currentTime;if(ty=='bird')for(let i=0;i<3;i++)nt_(f*(1.5+Math.random()),t+i*.09,.08,'sine',.03);else if(ty=='frog'){nt_(f/3,t,.12,'square',.02);nt_(f/3.3,t+.14,.1,'square',.02)}}}
let S,terr,cam={x:0,y:0,z:.9},DIF=1,MSG='',MAP=0;const AGE=[{f:300,g:150},{f:600,g:400},{f:1000,g:700}],ERA=['Oscura','Feudal','Castillos','Imperial'];
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),civ=p=>CIVS[S.civ[p]];
const afford=(p,c)=>Object.entries(c||{}).every(([k,v])=>S.res[p][k]>=v);
const pay=(p,c)=>{for(const k in c)S.res[p][k]-=c[k]};
const pop=p=>S.u.filter(u=>u.p==p).length;
const cap=p=>S.b.filter(b=>b.p==p&&!b.bt).reduce((s,b)=>s+(B[b.k].pop||0),0);

const ud=(p,k)=>k=='uni'?{...UU[S.civ[p]],r:9}:k=='esp'?(u=>({...u,n:'Élite '+u.n,hp:u.hp*1.7,atk:u.atk*1.5,cost:{f:200,g:150},r:10}))(UU[S.civ[p]]):U[k];
const tcost=(p,t)=>({f:100+100*S.tc[p][t],g:80+80*S.tc[p][t]});
function tech(p,b,t){if(!b||b.bt||b.k!='unv'||S.tc[p][t]>=3||b.q.some(x=>x.k=='r'+t)||!afford(p,tcost(p,t)))return;pay(p,tcost(p,t));b.q.push({k:'r'+t,t:400})}
function mkU(p,k,x,y){const d=ud(p,k),c=civ(p),h=d.hp*(c.hp||1)*(1+.15*S.age[p])*(1+.1*S.tc[p].h);
 const u={p,k,x,y,r:d.r,hp:h,mh:h,atk:d.atk*(c.atk||1),rng:d.rng,sp:d.sp*(c.sp||1),sp0:d.sp*(c.sp||1),rt:null,hold:0,cd:0,carry:{t:'',n:0},gt:0,mv:null,tg:null,nd:null,ret:0};S.u.push(u);return u}
function mkB(p,k,x,y,bt=0){const d=B[k],b={p,k,x,y,r:d.s*T/2,hp:d.hp,mh:d.hp,q:[],bt,rf:0};S.b.push(b);return b}
const node=(t,x,y,a)=>S.n.push({t,x,y,r:10,amt:a});
function canPlace(k,x,y){const s=B[k].s*T/2;
 return x>s&&y>s&&x<W-s&&y<W-s&&S.b.every(b=>Math.max(Math.abs(b.x-x),Math.abs(b.y-y))>b.r+s)&&D({x,y},RIFT)>RIFT.r+s}
function place(p,k,x,y,bl){x=Math.round(x/16)*16;y=Math.round(y/16)*16;
 if((B[k].ag||0)>S.age[p]||!afford(p,B[k].cost)||!canPlace(k,x,y))return false;pay(p,B[k].cost);const b=mkB(p,k,x,y,({bar:500,tem:400,unv:600,cas:900})[k]||240);(bl||[]).forEach(u=>{u.bd=b;u.mv=null;u.tg=null});return true}
function train(p,b,k){if(b.bt||b.q.length>=5)return;if(!afford(p,ud(p,k).cost)){if(!p)snd('err');return}pay(p,ud(p,k).cost);b.q.push({k,t:150})}
function trainAge(p,b){if(!b||b.bt||S.age[p]>=3||b.q.some(x=>x.k=='age')||!afford(p,AGE[S.age[p]]))return;pay(p,AGE[S.age[p]]);b.q.push({k:'age',t:600})}
function nearNode(a,t){let r=null,bd=1e9;for(const n of S.n)if(n.t==t&&n.amt>0){const d=D(a,n);if(d<bd){bd=d;r=n}}return r}

function newGame(ci){mkTerrain(MAP);
 let ai;do ai=Math.random()*CIVS.length|0;while(ai==ci);
 S={lb:-9999,t:0,u:[],b:[],n:[],fx:[],sel:[],pl:null,civ:[ci,ai],hold:[0,0],over:0,sl:0,age:[0,0],tc:[{a:0,g:0,h:0},{a:0,g:0,h:0}],ac:0,pw:[0,0],rf:[],
  res:[{w:200,f:200,g:100,s:100},{w:200,f:200,g:100,s:100}]};
 const bases=[{x:9*T,y:9*T,s:1},{x:(N-10)*T,y:(N-10)*T,s:-1}];
 bases.forEach((p,i)=>{mkB(i,'tc',p.x,p.y);
  for(let k=0;k<3;k++)mkU(i,'vil',p.x+(k-1)*24,p.y+p.s*60);
  for(let k=0;k<5;k++)node('f',p.x+p.s*(90+k*14),p.y+p.s*(k*10-20),150);
  for(let k=0;k<10;k++)node('w',p.x+p.s*(40+Math.random()*90),p.y+p.s*(110+Math.random()*60),200);
  for(let k=0;k<4;k++){node('g',p.x+p.s*(150+k*14),p.y+p.s*60,700);node('s',p.x+p.s*(150+k*14),p.y+p.s*100,700)}});
 const rnd=(t,n,a,sp)=>{for(let c=0;c<n;c++){const cx=Math.random()*W,cy=Math.random()*W;
  if([...bases,RIFT].some(b=>Math.hypot(cx-b.x,cy-b.y)<170))continue;
  for(let k=0;k<a;k++)node(t,cx+(Math.random()-.5)*sp,cy+(Math.random()-.5)*sp,t=='w'?200:t=='f'?150:700)}};
 rnd('w',MAPS[MAP].w*2,9,110);rnd('g',MAPS[MAP].m*2,5,70);rnd('s',MAPS[MAP].m*2,5,70);rnd('f',16,4,60);
 for(let i=0,n=0;n<6&&i<700;i++){const q={x:250+Math.random()*(W-500),y:250+Math.random()*(W-500)},m={x:W-q.x,y:W-q.y};
  if([...bases,RIFT].some(b=>D(q,b)<(b.s?420:200)||D(m,b)<(b.s?420:200))||D(q,m)<200)continue;
  S.rf.push({x:q.x,y:q.y,r:14,mr:1},{x:m.x,y:m.y,r:14,mr:1});n++}
 cam.x=X(bases[0])-innerWidth/2/cam.z;cam.y=Y(bases[0])-innerHeight/2/cam.z;clamp();ex.fill(0);fog();
}

// ---------- niebla de guerra y minimapa ----------
const fogC=document.createElement('canvas');fogC.width=fogC.height=N;
const fg=fogC.getContext('2d'),fi=fg.createImageData(N,N),ex=new Uint8Array(N*N),vs=new Uint8Array(N*N);
const vis=e=>vs[Math.min(N-1,e.y/T|0)*N+Math.min(N-1,e.x/T|0)];
const MM=()=>({x:innerWidth-102,y:74,s:96});
function fog(){vs.fill(0);
 const mark=(x,y,r)=>{const cx=x/T|0,cy=y/T|0;for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const X=cx+i,Y=cy+j;if(X>=0&&Y>=0&&X<N&&Y<N&&i*i+j*j<=r*r)vs[Y*N+X]=ex[Y*N+X]=1}};
 S.u.forEach(u=>u.p||mark(u.x,u.y,7));S.b.forEach(b=>b.p||mark(b.x,b.y,9));
 for(let i=0;i<N*N;i++)fi.data[i*4+3]=vs[i]?0:ex[i]?140:255;
 fg.putImageData(fi,0,0)}

// ---------- lógica ----------
function mvTo(a,x,y,s){const dx=x-a.x,dy=y-a.y,d=Math.hypot(dx,dy);if(d>s){a.x+=dx/d*s;a.y+=dy/d*s}return d}
function gather(a){const m=civ(a.p).gm||{};
 if(a.ret||a.carry.n>=10||(!a.nd&&a.carry.n)){
  let tc=null,bd=1e9;for(const b of S.b)if(b.p==a.p&&b.k=='tc'){const d=D(a,b);if(d<bd){bd=d;tc=b}}
  if(!tc)return;
  if(bd<=tc.r+12){S.res[a.p][a.carry.t]+=a.carry.n;a.carry.n=0;a.ret=0}else mvTo(a,tc.x,tc.y,a.sp);
  return}
 if(!a.nd)return;
 if(a.nd.amt<=0){a.nd=nearNode(a,a.nd.t);if(!a.nd){a.ret=a.carry.n>0?1:0;return}}
 if(D(a,a.nd)<=a.nd.r+10){
  if(a.carry.n&&a.carry.t!=a.nd.t)a.carry.n=0;
  a.gt+=(m[a.nd.t]||1)*(1+.05*S.pw[a.p])*(1+.1*S.tc[a.p].g);
  if(a.gt>=30){a.gt=0;a.carry.t=a.nd.t;a.carry.n++;a.nd.amt--;if(a.carry.n>=10)a.ret=1}
 }else mvTo(a,a.nd.x,a.nd.y,a.sp)}
function shaman(a){
 if(a.mv){if(mvTo(a,a.mv.x,a.mv.y,a.sp)<4)a.mv=null;return}
 if(a.hold){let t=null,bd=1e9;for(const b of S.b)if(b.p==a.p&&b.k=='tem'&&!b.bt){const d=D(a,b);if(d<bd){bd=d;t=b}}
  if(!t)return;if(bd<=t.r+12){t.rf++;a.hold=0;a.sp=a.sp0;if(!a.p)snd('rift')}else mvTo(a,t.x,t.y,a.sp);return}
 if(a.rt){if(!S.rf.includes(a.rt)){a.rt=null;return}
  if(D(a,a.rt)<=a.rt.r+10){S.rf=S.rf.filter(r=>r!=a.rt);a.hold=1;a.rt=null;a.sp=a.sp0*.7;if(!a.p)snd('rift')}else mvTo(a,a.rt.x,a.rt.y,a.sp);return}
 heal(a)}
function heal(a){let t=null,bd=220;
 for(const u of S.u)if(u.p==a.p&&u.hp<u.mh&&u.k!='vil'&&u.k!='cha'){const d=D(a,u);if(d<bd){bd=d;t=u}}
 if(!t)return;if(bd>80){mvTo(a,t.x,t.y,a.sp);return}
 if(!a.cd){a.cd=30;t.hp=Math.min(t.mh,t.hp+3);S.fx.push({a:{x:a.x,y:a.y},b:{x:t.x,y:t.y},t:8,c:'#6f6'});if(!a.p)snd('heal')}}
function build(a){const b=a.bd;if(!b||b.hp<=0||!b.bt){a.bd=null;return}
 if(D(a,b)<=b.r+14){if(--b.bt<=0){b.bt=0;a.bd=null;if(!b.p)snd('done')}}else mvTo(a,b.x,b.y,a.sp)}
function stepU(a){
 if(a.cd>0)a.cd--;
 if(a.k=='cha'){shaman(a);return}
 if(a.tg&&a.tg.hp<=0)a.tg=null;
 if(a.tg){if(D(a,a.tg)-(a.tg.r||0)<=a.rng){
   if(!a.cd){a.cd=50;a.tg.hp-=a.atk*(1+.15*S.age[a.p])*(1+.05*S.pw[a.p])*(1+.1*S.tc[a.p].a);S.fx.push({a:{x:a.x,y:a.y},b:{x:a.tg.x,y:a.tg.y},t:6});if((a.p==0||a.tg.p==0)&&S.t-S.sl>5){S.sl=S.t;S.t-S.lb>900&&snd('horn');S.lb=S.t;snd(a.rng>30?'arrow':'clash')}}
  }else mvTo(a,a.tg.x,a.tg.y,a.sp);return}
 if(a.mv){if(mvTo(a,a.mv.x,a.mv.y,a.sp)<4)a.mv=null;return}
 if(a.k=='vil'){if(a.bd)build(a);else gather(a);return}
 let best=null,bd=180;for(const e of[...S.u,...S.b])if(e.p!=a.p){const d=D(a,e);if(d<bd){bd=d;best=e}}a.tg=best}
function ai(){
 const tc=S.b.find(b=>b.p==1&&b.k=='tc');if(!tc)return;
 const r=S.res[1],bz=k=>S.b.some(b=>b.p==1&&b.k==k&&b.bt),vs=S.u.filter(u=>u.p==1&&u.k=='vil'),ar=S.u.filter(u=>u.p==1&&u.k!='vil'&&u.k!='cha');
 if(vs.length>=6&&ar.length>=3&&!tc.q.length)trainAge(1,tc);
 if(vs.length<[8,10,14][DIF])train(1,tc,'vil');
 vs.forEach(v=>{if(!v.nd&&!v.carry.n)v.nd=nearNode(v,'fwgffgw'[S.ac++%7])});
 if(!bz('house')&&pop(1)>=cap(1)-2)for(let k=0;k<8&&!place(1,'house',tc.x-100-Math.random()*120,tc.y-Math.random()*200+60,vs.slice(0,2));k++);
 const bar=S.b.find(b=>b.p==1&&b.k=='bar');
 if(!bar){if(!bz('bar'))for(let k=0;k<8&&!place(1,'bar',tc.x-120-Math.random()*80,tc.y-130+Math.random()*60,vs.slice(2,4));k++);}
 else if(bar.q.length<2&&(ar.length<4||vs.length<6||S.age[1]>1||(r.f>=AGE[S.age[1]].f+60&&r.g>=AGE[S.age[1]].g+40))){const ks=S.age[1]?['sol','arc','cab','uni']:['sol','arc'];train(1,bar,ks[Math.random()*ks.length|0])}
 if(!bz('tem')&&bar&&ar.length>=4&&vs.length>=8&&!S.b.some(b=>b.p==1&&b.k=='tem'))for(let k=0;k<8&&!place(1,'tem',tc.x-120-Math.random()*100,tc.y+60+Math.random()*100,vs.slice(4,6));k++);
 const tm=S.b.find(b=>b.p==1&&b.k=='tem'),ch=S.u.filter(u=>u.p==1&&u.k=='cha');
 if(tm&&S.rf.length>ch.length&&ch.length<2)train(1,tm,'cha');
 if(S.rf.length)ch.forEach(u=>{if(u.rt||u.hold||u.mv)return;let r=null,bd=1e9;for(const x of S.rf){const d=D(u,x);if(d<bd){bd=d;r=x}}u.rt=r});
 if(ar.length>=[12,9,7][DIF])ar.forEach(u=>{let best=null,bd=1e9;
  for(const e of[...S.u,...S.b])if(e.p==0){const d=D(u,e);if(d<bd){bd=d;best=e}}u.tg=best})}
function tick(){S.t++;
 for(const b of S.b){if(b.bt)continue;const q=b.q[0];
  if(q&&--q.t<=0){if(q.k=='age'){b.q.shift();S.age[b.p]++;if(!b.p)snd('age')}else if(q.k[0]=='r'){b.q.shift();S.tc[b.p][q.k[1]]++;if(!b.p)snd('done')}else if(pop(b.p)<cap(b.p)){b.q.shift();mkU(b.p,q.k,b.x+(Math.random()-.5)*60,b.y+b.r+14);if(!b.p)snd('spawn')}else q.t=0}}
 for(const b of S.b)if(!b.bt&&(b.k=='cas'||b.k=='tc')){if(b.cd>0)b.cd--;else{let t=null,bd=200;for(const u of S.u)if(u.p!=b.p){const d=D(b,u);if(d<bd){bd=d;t=u}}if(t){t.hp-=b.k=='cas'?10:5;b.cd=60;S.fx.push({a:b,b:t,t:6,c:'#fa6'})}}}
 S.u.forEach(stepU);
 S.fx=S.fx.filter(f=>--f.t>0);
 S.u.forEach(u=>{if(u.hp<=0&&u.hold)S.rf.push({x:u.x,y:u.y,r:14,mr:1})});
 S.b.forEach(b=>{for(let k=0;b.hp<=0&&k<b.rf;k++)S.rf.push({x:b.x+k*22-30,y:b.y+b.r+20,r:14,mr:1})});
 if(S.u.some(u=>u.hp<=0&&(!u.p||vis(u))))snd('thud');if(S.b.some(b=>b.hp<=0&&(!b.p||vis(b))))snd('crash');S.u=S.u.filter(u=>u.hp>0);S.b=S.b.filter(b=>b.hp>0);S.sel=S.sel.filter(s=>s.hp>0);
 S.pw=[0,1].map(p=>S.b.reduce((t,b)=>t+(b.p==p&&!b.bt?b.rf:0),0));
 if(S.t%60==0)S.n=S.n.filter(n=>n.amt>0);
 if(S.t%[200,120,70][DIF]==0)ai();if(S.t%6==0)fog();
 for(const p of[0,1]){const f=q=>S.u.filter(u=>u.p==q&&u.k!='vil'&&D(u,RIFT)<RIFT.r).length;
  if(f(p)&&!f(1-p))S.hold[p]++;else if(!f(p))S.hold[p]=Math.max(0,S.hold[p]-1)}
 const tc=p=>S.b.some(b=>b.p==p&&b.k=='tc');
 if(!tc(1)||S.hold[0]>=HOLD){S.over=1;snd('win');showMenu('🏆 ¡Victoria!')}
 else if(!tc(0)||S.hold[1]>=HOLD){S.over=1;snd('lose');showMenu('💀 Derrota')}}

// ---------- entrada táctil / ratón ----------
const P=new Map();let mvd=0,pd=0,lp,bx=null;
function clamp(){cam.z=Math.min(2,Math.max(.6,cam.z));const vw=innerWidth/cam.z,vh=innerHeight/cam.z,ax=-W/2-100,ay=-150;
 cam.x=Math.max(ax,Math.min(Math.max(ax,W/2+100-vw),cam.x));cam.y=Math.max(ay,Math.min(Math.max(ay,W/2+150-vh),cam.y))}
cv.onpointerdown=e=>{initAudio();P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(P.size==1)mvd=0;pd=0;clearTimeout(lp);if(P.size==1){const x=e.clientX,y=e.clientY;lp=setTimeout(()=>{if(P.size==1&&mvd<8){bx={x0:x,y0:y,x1:x,y1:y};navigator.vibrate&&navigator.vibrate(20)}},350)}cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{const o=P.get(e.pointerId);if(!o)return;const n={x:e.clientX,y:e.clientY};
if(bx){bx.x1=n.x;bx.y1=n.y;return}
 if(P.size==1){cam.x-=(n.x-o.x)/cam.z;cam.y-=(n.y-o.y)/cam.z;mvd+=Math.abs(n.x-o.x)+Math.abs(n.y-o.y)}
 else if(P.size==2){P.set(e.pointerId,n);const[a,b]=[...P.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(pd)cam.z*=d/pd;pd=d;mvd=99;clamp();return}
 P.set(e.pointerId,n);clamp()};
cv.onpointerup=cv.onpointercancel=e=>{clearTimeout(lp);if(bx){const r=bx;bx=null;if(S&&!S.over){const x0=Math.min(r.x0,r.x1),x1=Math.max(r.x0,r.x1),y0=Math.min(r.y0,r.y1),y1=Math.max(r.y0,r.y1),a=S.u.filter(u=>{const sx=(X(u)-cam.x)*cam.z,sy=(Y(u)-6-cam.y)*cam.z;return u.p===0&&sx>=x0&&sx<=x1&&sy>=y0&&sy<=y1}),m=a.filter(u=>u.k!='vil');if(a.length)S.sel=m.length?m:a}P.delete(e.pointerId);pd=0;return}
 if(P.size==1&&mvd<8&&e.type=='pointerup'&&S&&!S.over)tap(e.clientX,e.clientY);P.delete(e.pointerId);pd=0};
cv.onwheel=e=>{cam.z*=e.deltaY<0?1.1:.9;clamp()};
function at(w){
 for(const u of S.u)if(D(u,w)<u.r+8&&(u.p===0||vis(u)))return u;
 for(const b of S.b)if(Math.abs(b.x-w.x)<b.r&&Math.abs(b.y-w.y)<b.r&&(b.p===0||vis(b)))return b;
 for(const n of S.n)if(n.amt>0&&D(n,w)<n.r+8&&ex[(n.y/T|0)*N+(n.x/T|0)])return n;
 for(const r of S.rf)if(D(r,w)<r.r+10&&ex[(r.y/T|0)*N+(r.x/T|0)])return r}
function tap(px,py){
 const m=MM();if(px>=m.x&&px<=m.x+m.s&&py>=m.y&&py<=m.y+m.s/2){const k=m.s/W;cam.x=(px-m.x-m.s/2)/k-innerWidth/cam.z/2;cam.y=(py-m.y)/k-innerHeight/cam.z/2;clamp();return}
 const XX=cam.x+px/cam.z,YY=cam.y+py/cam.z,w={x:2*YY+XX,y:2*YY-XX};
 if(S.pl){const vb=S.sel.filter(u=>u.k=='vil'&&u.p===0);if(!vb.length){const v=S.u.find(u=>u.p===0&&u.k=='vil');if(v)vb.push(v)}
  if(place(0,S.pl,w.x,w.y,vb))S.pl=null;return}
 const e=at(w),me=S.sel.filter(s=>!B[s.k]&&s.p===0);
 if(e&&e.p===0){S.sel=[e];snd('sel');if(!B[e.k])civSnd(S.civ[0]);return}
 if(me.length){me.forEach(u=>u.bd=null);
  if(e&&e.p===1)me.forEach(u=>{u.tg=e;u.mv=null;u.nd=null});
  else if(e&&e.amt!==undefined)me.forEach(u=>{u.tg=null;u.mv=null;if(u.k=='vil'){u.nd=e;u.ret=0}else u.mv={x:e.x,y:e.y}});
  else if(e&&e.mr)me.forEach(u=>{u.tg=null;u.nd=null;u.ret=0;u.mv=null;if(u.k=='cha')u.rt=e;else u.mv={x:e.x,y:e.y}});
  else me.forEach((u,i)=>{u.tg=null;u.nd=null;u.ret=0;u.rt=null;u.mv={x:w.x+(i%4)*16-24,y:w.y+(i/4|0)*16}});
  return}
 S.sel=e?[e]:[]}

// ---------- interfaz ----------
const cost=c=>Object.entries(c).map(([k,v])=>RN[k]+v).join(' ');
const bt=(a,l,c)=>`<button data-a="${a}">${l}${c?`<small>${cost(c)}</small>`:''}</button>`;
let lt='',lb='';
function hud(){const r=S.res[0],pc=h=>Math.min(100,h/HOLD*100|0);
 const t=Object.keys(RN).map(k=>`<span>${RN[k]} ${r[k]|0}</span>`).join('')+`<span>👥 ${pop(0)}/${cap(0)}</span><span>🕰 ${ERA[S.age[0]]}</span><span>🔮 Tú ${S.pw[0]} · Rival ${S.pw[1]} · libres ${S.rf.length}</span><span>🌀 Tú ${pc(S.hold[0])}% · Rival ${pc(S.hold[1])}%</span>`;
 if(t!=lt)$('top').innerHTML=lt=t;
 const s=S.sel[0];let h='';
 if(s&&s.p===0&&s.bt)h+=`<span>🔨 en obra (necesita aldeanos)</span>`;
 if(s&&s.p===0&&!s.bt){
  if(s.k=='tc'){h+=bt('t:vil','Aldeano',U.vil.cost);if(S.age[0]<3&&!s.q.some(x=>x.k=='age'))h+=bt('a',ERA[S.age[0]+1],AGE[S.age[0]])}
  if(s.k=='bar')h+=bt('t:sol','Soldado',U.sol.cost)+bt('t:arc','Arquero',U.arc.cost)+(S.age[0]?bt('t:cab','Caballero',U.cab.cost)+bt('t:uni','★ '+UU[S.civ[0]].n,UU[S.civ[0]].cost):'');
  if(s.k=='tem')h+=bt('t:cha','Chamán',U.cha.cost)+`<span>🔮 ${s.rf}</span>`;
  if(s.k=='vil')h+=bt('b:house','Casa',B.house.cost)+bt('b:bar','Cuartel',B.bar.cost)+bt('b:tem','Iglesia',B.tem.cost)+(S.age[0]>=1?bt('b:unv','Universidad',B.unv.cost):'')+(S.age[0]>=2?bt('b:cas','Castillo',B.cas.cost):'');
  if(s.k=='unv')h+=[['a','⚔ Armas'],['g','⛏ Recolec.'],['h','🛡 Armadura']].map(([t,l])=>S.tc[0][t]<3?bt('r:'+t,l+' '+(S.tc[0][t]+1),tcost(0,t)):'').join('');
  if(s.k=='cas')h+=bt('t:esp','★★ Élite '+UU[S.civ[0]].n,ud(0,'esp').cost)+bt('t:uni','★ '+UU[S.civ[0]].n,UU[S.civ[0]].cost);
  if(s.q&&s.q.length)h+=`<span>⏳ ${s.q.length}</span>`}
 h+=bt('army','⚔ Ejército')+(S.u.some(u=>u.p==0&&u.k=='cha')?bt('sha','🔮 Chamanes'):'')+bt('idle','👷 Libres')+(S.pl?bt('x','✖ Cancelar'):'')+bt('music',MU?'🎵':'🔕')+bt('mute',MUTE?'🔇':'🔊')+bt('menu','☰ Menú');
 if(h!=lb)$('bot').innerHTML=lb=h}
$('bot').onclick=e=>{initAudio();snd('click');const a=e.target.closest('button')?.dataset.a;if(!a||!S)return;const[k,v]=a.split(':');
 if(k=='t')train(0,S.sel[0],v);
 else if(k=='a')trainAge(0,S.sel[0]);
 else if(k=='r')tech(0,S.sel[0],v);
 else if(k=='mute')MUTE=1-MUTE;
 else if(k=='music')MU=1-MU;
 else if(k=='menu'){S.over=1;showMenu()}
 else if(k=='b')S.pl=v;
 else if(k=='army')S.sel=S.u.filter(u=>u.p==0&&u.k!='vil'&&u.k!='cha');
 else if(k=='sha')S.sel=S.u.filter(u=>u.p==0&&u.k=='cha');
 else if(k=='idle')S.sel=S.u.filter(u=>u.p==0&&u.k=='vil'&&!u.nd&&!u.carry.n&&!u.mv);
 else S.pl=null};
function showMenu(msg=''){MSG=msg;menu.hidden=false;
 menu.innerHTML=`<img src="assets/titulo.png" style="max-width:240px;border-radius:10px"><h1>GUERRILLA</h1>${msg?`<h2>${msg}</h2>`:''}<p>${LORE}</p><p>Dificultad:</p><div id="dif">${['Fácil','Normal','Difícil'].map((n,i)=>`<button data-d="${i}" style="border-color:${i==DIF?'#c46bff':'#6b5a8e'}">${n}</button>`).join('')}</div><p>Mapa:</p><div id="dif" style="flex-wrap:wrap">${MAPS.map((n,i)=>`<button data-m="${i}" style="border-color:${i==MAP?'#c46bff':'#6b5a8e'}">${n.t?`<img src="assets/mapa_${n.t}.png" style="width:70px;height:62px;object-fit:cover;border-radius:4px">`:''}${n.n}</button>`).join('')}</div><p>Elige tu civilización:</p><div id="civs">${CIVS.map((c,i)=>`<button data-i="${i}" style="border-color:${c.c}">${CP[i]?`<img src="assets/civ_${CP[i]}.png" style="width:100%;border-radius:6px">`:''}<b>${c.n}</b><small>${c.b}</small></button>`).join('')}</div>`}
menu.onclick=e=>{initAudio();const b=e.target.closest('button');if(!b)return;if(b.dataset.d){DIF=+b.dataset.d;showMenu(MSG)}else if(b.dataset.m){MAP=+b.dataset.m;showMenu(MSG)}else{newGame(+b.dataset.i);menu.hidden=true;snd('horn');civSnd(S.civ[0])}};

// ---------- dibujo isométrico ----------
function mkTerrain(m=0){const M=MAPS[m];terr=document.createElement('canvas');terr.width=terr.height=W;const t=terr.getContext('2d');
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){t.fillStyle=Math.random()<.1?M.c:(x+y)%2?M.a:M.b;t.fillRect(x*T,y*T,T,T)}}
const ring=(x,y,r,c,w=2)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.arc(x,y,r,0,7);g.stroke()};
const IM={},img=n=>{if(!IM[n]){IM[n]=new Image();IM[n].src='assets/'+n+'.png'}const i=IM[n];return i.complete&&i.naturalWidth?i:null};
const BS={tc:'centro',bar:'cuartel',house:'casa',tem:'iglesia',cas:'castillo',unv:'universidad'},US={vil:'aldeano',sol:'infanteria',arc:'arquero',cab:'caballeria',cha:'chaman'},NI={w:'ter_arboles',f:'ter_campos',g:'r_g',s:'ter_rocas'},
 HER=['her_orco','her_elfo','her_elfo','her_enano','her_humano','her_humano','her_mago','her_mago','her_nomuerto','her_nomuerto','her_picaro'],
 UUS=['lanza','arquero','lanza','infanteria','caballeria','lanza','mago','brujo','brujo','adistancia','picaro'],
 CP=['orcos','elfos','altos','enanos','humanos','vikingos','magos','brujos','sectarios','muertos','picaros'],ES=[1,1,2,2,3,4,6,5,7];
const X=e=>(e.x-e.y)*.5,Y=e=>(e.x+e.y)*.25;
const sh=(c,k)=>'#'+[1,3,5].map(i=>Math.min(255,parseInt(c.substr(i,2),16)*k|0).toString(16).padStart(2,'0')).join('');
const hb=(x,y,w,f)=>{g.fillStyle='#000';g.fillRect(x-w/2,y,w,4);g.fillStyle='#4f4';g.fillRect(x-w/2,y,w*Math.max(0,f),4)};
const ell=(x,y,a,b,f)=>{g.beginPath();g.ellipse(x,y,a,b,0,0,7);f?g.fill():g.stroke()};
function dN(n,x,y){const im=img(NI[n.t]);if(im){const w=n.t=='w'?34:n.t=='f'?30:26,h=w*im.naturalHeight/im.naturalWidth;g.drawImage(im,x-w/2,y+4-h,w,h);return}

 if(n.t=='w'){g.fillStyle='#4a2f17';g.fillRect(x-2,y-10,4,12);g.fillStyle='#1f5a22';ell(x,y-14,9,9,1);g.fillStyle='#2f7d32';ell(x-3,y-17,5,5,1)}
 else if(n.t=='f'){g.fillStyle='#2f6b2a';ell(x,y-3,9,6,1);g.fillStyle='#c83a4a';for(let i=0;i<4;i++)ell(x-5+i*3.5,y-4+(i%2)*3,2,2,1)}
 else{g.fillStyle=NC[n.t];g.strokeStyle='#000';g.lineWidth=1;g.beginPath();g.moveTo(x-9,y);g.lineTo(x-5,y-10);g.lineTo(x+3,y-12);g.lineTo(x+9,y-3);g.lineTo(x+6,y+2);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.35)';ell(x-2,y-7,3,2,1)}}
function dR(r,x,y){const p=1+.2*Math.sin(S.t/12+r.x);g.fillStyle='rgba(196,107,255,.35)';ell(x,y-8,14*p,14*p,1);g.fillStyle='#e0b0ff';ell(x,y-8,6,6,1);ell(x,y,10,5,0)}
function dB(b,x,y){const r=b.r,h=b.k=='tc'?r*1.3:b.k=='house'?r*1.4:r*1.1,c=civ(b.p).c;g.globalAlpha=b.bt?.55:1;
 const im=img('ed_'+BS[b.k]);if(im){const w=r*2.7,hh=w*im.naturalHeight/im.naturalWidth,sl=S.sel.includes(b);
  g.fillStyle=c;g.globalAlpha*=.5;g.beginPath();g.moveTo(x-r,y);g.lineTo(x,y+r/2);g.lineTo(x+r,y);g.lineTo(x,y-r/2);g.closePath();g.fill();g.globalAlpha=b.bt?.55:1;
  if(sl){g.strokeStyle='#fff';g.lineWidth=2;g.stroke()}g.drawImage(im,x-w/2,y+r*.55-hh,w,hh);g.globalAlpha=1;
  if(b.hp<b.mh||sl||b.bt)hb(x,y+r*.55-hh-6,r*2,b.hp/b.mh);return}
 const poly=(q,f)=>{g.fillStyle=f;g.beginPath();q.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();g.strokeStyle='#000';g.lineWidth=1;g.stroke()};
 const gd=[[x-r,y],[x,y+r/2],[x+r,y],[x,y-r/2]];
 if(S.sel.includes(b)){poly(gd,'rgba(255,255,255,.25)');g.strokeStyle='#fff';g.lineWidth=2;g.stroke()}
 poly([[x-r,y],[x,y+r/2],[x,y+r/2-h],[x-r,y-h]],sh(c,.6));poly([[x,y+r/2],[x+r,y],[x+r,y-h],[x,y+r/2-h]],sh(c,.8));
 poly([[x-r,y-h],[x,y+r/2-h],[x+r,y-h],[x,y-r/2-h]],sh(c,1.05));
 if(b.k=='tc'||b.k=='bar'){g.fillStyle='#2a1a10';g.fillRect(x+r*.25,y+r*.1-h*.45,r*.3,h*.45)}
 g.textAlign='center';g.textBaseline='middle';g.font=Math.max(12,r*.9)+'px serif';g.fillStyle='#000';g.fillText(B[b.k].i,x,y-h);g.globalAlpha=1;
 if(b.hp<b.mh||S.sel.includes(b)||b.bt)hb(x,y-h-r*.7,r*2,b.hp/b.mh)}
function dU(u,x,y){const r=u.r,k=u.k,c=civ(u.p).c,by=k=='cab'?y-r*.7:y;
 const im=img(k=='esp'?HER[S.civ[u.p]]:'un_'+(k=='uni'?UUS[S.civ[u.p]]:US[k]));if(im){const q=k=='esp'?1.25:k=='uni'?1.1:1,hh=r*4.4*q,w=hh*im.naturalWidth/im.naturalHeight;
  g.fillStyle=c;g.globalAlpha=.75;ell(x,y,r*1.2,r*.6,1);g.globalAlpha=1;g.strokeStyle='#000';g.lineWidth=1;ell(x,y,r*1.2,r*.6,0);
  if(S.sel.includes(u)||u.hold){g.strokeStyle=u.hold?'#e0b0ff':'#fff';g.lineWidth=2;ell(x,y,r+6,(r+6)/2,0)}
  g.drawImage(im,x-w/2,y+3-hh,w,hh);if(k=='uni'||k=='esp'){g.fillStyle='#ffd23a';g.font='11px sans-serif';g.textAlign='center';g.fillText('★',x,y-hh-4)}
  if(u.hp<u.mh||S.sel.includes(u))hb(x,y-hh-(k=='uni'||k=='esp'?16:8),18,u.hp/u.mh);return}
 g.fillStyle='rgba(0,0,0,.35)';ell(x,y,r*1.1,r*.5,1);
 if(S.sel.includes(u)||u.hold){g.strokeStyle=u.hold?'#e0b0ff':'#fff';g.lineWidth=2;ell(x,y,r+4,(r+4)/2,0)}
 g.strokeStyle='#000';g.lineWidth=1;
 if(k=='cab'){g.fillStyle='#6b4a2a';ell(x,y-r*.5,r*1.4,r*.75,1);ell(x,y-r*.5,r*1.4,r*.75,0)}
 g.fillStyle=c;ell(x,by-r*.9,r*.7,r*1.05,1);ell(x,by-r*.9,r*.7,r*1.05,0);
 g.fillStyle='#f0c8a0';ell(x,by-r*2.1,r*.5,r*.5,1);ell(x,by-r*2.1,r*.5,r*.5,0);
 g.lineWidth=2;
 if(k=='sol'||k=='cab'||k=='uni'||k=='esp'){g.strokeStyle='#e8e8f0';g.beginPath();g.moveTo(x+r*.9,by-r*.2);g.lineTo(x+r*.9,by-r*2.1);g.stroke();if(k=='sol'){g.fillStyle='#8a6a3a';ell(x-r*.8,by-r*.9,r*.4,r*.6,1)}}
 else if(k=='arc'){g.strokeStyle='#8a5a2a';g.beginPath();g.arc(x+r*.8,by-r,r*.9,-1.2,1.2);g.stroke()}
 else if(k=='vil'){g.strokeStyle='#7a5a2a';g.beginPath();g.moveTo(x+r*.8,by-r*.2);g.lineTo(x+r*1.2,by-r*1.9);g.stroke()}
 else if(k=='cha'){g.strokeStyle='#7a5a2a';g.beginPath();g.moveTo(x+r*.9,by);g.lineTo(x+r*.9,by-r*2.4);g.stroke();g.fillStyle='#b0f';ell(x+r*.9,by-r*2.6,r*.4,r*.4,1)}
 if(k=='uni'||k=='esp'){g.fillStyle='#ffd23a';g.font='11px sans-serif';g.textAlign='center';g.fillText('★',x,by-r*3)}
 if(u.hp<u.mh||S.sel.includes(u))hb(x,by-r*3.4,18,u.hp/u.mh)}
function draw(){const d=devicePixelRatio||1,z=cam.z,sc=d*z;
 g.setTransform(1,0,0,1,0,0);g.fillStyle='#0b0814';g.fillRect(0,0,cv.width,cv.height);
 const iso=()=>g.setTransform(sc*.5,sc*.25,-sc*.5,sc*.25,-cam.x*sc,-cam.y*sc);
 iso();g.drawImage(terr,0,0);
 g.fillStyle='rgba(150,60,220,.28)';g.beginPath();g.arc(RIFT.x,RIFT.y,RIFT.r,0,7);g.fill();
 ring(RIFT.x,RIFT.y,RIFT.r*(.92+.08*Math.sin(S.t/20)),'#c46bff',3);
 g.setTransform(sc,0,0,sc,-cam.x*sc,-cam.y*sc);g.textAlign='center';g.textBaseline='middle';
 const L=[],xp=e=>ex[Math.min(N-1,e.y/T|0)*N+Math.min(N-1,e.x/T|0)];
 for(const n of S.n)if(n.amt>0&&xp(n))L.push(n);for(const r of S.rf)if(xp(r))L.push(r);
 for(const b of S.b)if(!b.p||vis(b))L.push(b);for(const u of S.u)if(!u.p||vis(u))L.push(u);
 L.sort((a,b)=>a.x+a.y-b.x-b.y);
 for(const e of L){const x=X(e),y=Y(e);if(e.mr)dR(e,x,y);else if(e.t)dN(e,x,y);else if(e.q)dB(e,x,y);else dU(e,x,y)}
 g.lineWidth=1.5;for(const f of S.fx){g.strokeStyle=f.c||'#ffd';g.beginPath();g.moveTo(X(f.a),Y(f.a)-8);g.lineTo(X(f.b),Y(f.b)-8);g.stroke()}
 iso();g.drawImage(fogC,0,0,W,W);
 // minimapa isométrico
 const m=MM(),k=m.s/W,mx=m.x+m.s/2;g.setTransform(d,0,0,d,0,0);g.fillStyle='rgba(10,8,20,.85)';g.fillRect(m.x,m.y,m.s,m.s/2);
 g.setTransform(d*k*.5,d*k*.25,-d*k*.5,d*k*.25,d*mx,d*m.y);g.fillStyle=MAPS[MAP].a;g.fillRect(0,0,W,W);
 g.setTransform(d,0,0,d,0,0);
 for(const e of[...S.b,...S.u])if(!e.p||vis(e)){g.fillStyle=civ(e.p).c;g.fillRect(mx+X(e)*k-1.5,m.y+Y(e)*k-1.5,3,3)}
 g.fillStyle='#e0b0ff';for(const r of S.rf)if(xp(r))g.fillRect(mx+X(r)*k-1.5,m.y+Y(r)*k-1.5,3,3);
 g.setTransform(d*k*.5,d*k*.25,-d*k*.5,d*k*.25,d*mx,d*m.y);g.drawImage(fogC,0,0,W,W);
 g.setTransform(d,0,0,d,0,0);g.strokeStyle='#fff';g.lineWidth=1;g.strokeRect(mx+cam.x*k,m.y+cam.y*k,innerWidth/z*k,innerHeight/z*k);g.strokeRect(m.x,m.y,m.s,m.s/2);if(bx){g.fillStyle='rgba(120,255,120,.15)';g.fillRect(bx.x0,bx.y0,bx.x1-bx.x0,bx.y1-bx.y0);g.strokeStyle='#8f8';g.strokeRect(bx.x0,bx.y0,bx.x1-bx.x0,bx.y1-bx.y0)}}

// ---------- intro con narrador ----------
function intro(){const o=document.createElement('div');o.id='intro';
 o.innerHTML='<svg id="crack" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="50,0 47,18 54,32 46,48 55,63 48,80 52,100" fill="none" stroke="#e0b0ff" stroke-width="1.2" style="filter:drop-shadow(0 0 3px #c46bff)"/></svg><div id="sub"><b style="font-size:32px;color:#c46bff">GUERRILLA</b><br>La Grieta del Mundo</div><button id="go">▶ Escuchar la historia</button><button id="skip">Saltar</button>';
 o.style.backgroundImage='linear-gradient(#0003,#07050dd0),url(assets/titulo.png)';document.body.appendChild(o);let i=0,dead=0,tm;const cl=['#3a5a2a','#2a5a4a','#3a1a5a','#5a1a8a','#6a2aa0','#5a2a2a','#4a3a1a','#6a1a1a','#7a0a0a'];
 const end=()=>{dead=1;clearTimeout(tm);try{speechSynthesis.cancel()}catch(_){}o.remove()};
 const next=()=>{if(dead)return;if(i>=INTRO.length)return end();const s=INTRO[i];$('sub').textContent=s;o.style.setProperty('--c',cl[i]);$('crack').style.opacity=0;o.style.backgroundImage=`linear-gradient(#0004,#07050dea),url(assets/escena${ES[i]}.png)`;i++;
  let f=0;const go=()=>{if(f||dead)return;f=1;clearTimeout(tm);setTimeout(next,600)};
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang='es-ES';u.rate=.92;u.pitch=.6;u.onend=go;u.onerror=go;speechSynthesis.speak(u)}catch(_){}
  tm=setTimeout(go,s.length*90+3000)};
 $('go').onclick=()=>{initAudio();$('go').remove();next()};$('skip').onclick=end}

// ---------- bucle ----------
function resize(){const d=devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;if(S)clamp()}
addEventListener('resize',resize);resize();mkTerrain(0);showMenu();intro();
let lastT=0,acc=0;
(function loop(t){requestAnimationFrame(loop);try{music();ambTick()}catch(_){}acc+=Math.min(100,t-lastT);lastT=t;
 if(S&&!S.over&&menu.hidden){while(acc>=16.67){tick();acc-=16.67}hud()}else acc=0;
 if(S)draw()})(0);
