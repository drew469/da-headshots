/* ===================== chapters (Antonio Brown · best behavior) — premium v2 ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nba-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const GOLD='#FFB612';
const GW='#FFC72C', GB='#1D428A', CW='#860038', CG='#FDBB30';
const K={sim:CT('I replayed the 2016'),
  c1:CT('The Warriors went 73-9'), led:CT('Then they led'), home:CT('with two of the last'),
  c2:CT('Teams up 3-1 win'), hap:CT("It's happened almost"), only:CT('Only 15 teams'),
  c3:CT('Before Game 5'), hi:CT("That's the highest"), cle:CT('Cleveland was'), g5:CT('26% chance in Game 5'), g6:CT('53% at home'), g7:CT('and 26% in Game 7'),
  c4:CT('Is it honest'), exp:CT('It expected about'), were:CT('There were 13'), gen:CT('So if anything'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c6:CT('So I replayed Games'), back:CT('The Cavs come back about'), r28:CT("That's 1 in 28"),
  c7:CT("But it's not even"), c68:CT('The 1968 Celtics'), sx:CT("this year's Sixers"),
  c8:CT("Here's why it's still"), nt:CT('No team rated'), fin:CT("It's the only one ever"), okc:CT('And two weeks earlier'), v1:CT("So it wasn't the unluckiest"), v2:CT('It was the biggest choke ever')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.cta-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','73-9. Up 3-1.','2016 NBA Finals · Warriors vs. Cavaliers'],
 ['02','History says it’s over.','every 3-1 lead in NBA history'],
 ['03','The odds.','FiveThirtyEight Elo before Game 5 · Cavs win chance'],
 ['04','Is it honest?','every 3-1 lead through 2025'],
 null,
 ['05','100,000 replays.','Games 5, 6 and 7'],
 ['06','The longest shots.','least likely 3-1 comebacks'],
 ['07','The verdict.','']];
const AY=['rgba(255,199,44,.30)','rgba(255,199,44,.5)','#FFC72C'], AW=['rgba(134,0,56,.45)','rgba(134,0,56,.55)','#FF4B6E'], AC=['rgba(12,245,249,.22)','rgba(12,245,249,.45)','#0CF5F9'];
const ACC=[AY,AY,AC,AC,AC,AC,AW,AW,AY];
/* ---------- premium background ---------- */
const stage=document.getElementById('stage');
const BG=document.createElement('div'); BG.id='bg'; stage.insertBefore(BG,stage.firstChild);
BG.innerHTML='<div class="base"></div><div class="glowA"></div><div class="glowB"></div>';
const BEAMS=[0,1,2].map(i=>{const b=div('beam','',BG,{left:[90,520,860][i]+'px'});return b;});
const gridS=sv('svg',{class:'grid',width:1080,height:1920,viewBox:'0 0 1080 1920'}); BG.appendChild(gridS);
for(let i=0;i<=12;i++){const x=-600+i*190; sv('line',{x1:540,y1:1040,x2:x,y2:1920,stroke:'rgba(255,255,255,.05)','stroke-width':2},gridS);}
const HL=[]; for(let j=0;j<8;j++){HL.push(sv('line',{x1:0,x2:1080,y1:0,y2:0,stroke:'rgba(255,255,255,.05)','stroke-width':2},gridS));}
const DUST=[]; {const R=rng(7); for(let i=0;i<26;i++){const d=div('dust','',BG,{}); DUST.push({d,x:R()*1080,y:R()*1920,s:1.5+R()*3.5,v:6+R()*18,o:.08+R()*.22});}}
const sweep=div('','',stage); sweep.id='sweep';
const rootS=document.documentElement.style;
function bgfx(t,k){const a=ACC[k]; rootS.setProperty('--acc-a',a[0]); rootS.setProperty('--acc-g',a[1]); rootS.setProperty('--acc',a[2]);
  BEAMS.forEach((b,i)=>{b.style.transform=`rotate(${[-24,8,30][i]+Math.sin(t*.35+i*2)*6}deg)`; b.style.opacity=.55+.45*Math.sin(t*.5+i);});
  HL.forEach((l,j)=>{const q=((j/8)+(t*.05))%1, y=1040+Math.pow(q,2.2)*900; set(l,{y1:y,y2:y,opacity:q});});
  DUST.forEach(p=>{const y=(p.y-t*p.v)%1920; p.d.style.left=(p.x+Math.sin(t*.4+p.y)*12)+'px'; p.d.style.top=(y<0?y+1920:y)+'px'; p.d.style.width=p.d.style.height=p.s+'px'; p.d.style.opacity=p.o;});
  BG.querySelector('.glowA').style.transform=`translate(${Math.sin(t*.2)*40}px,${Math.cos(t*.17)*30}px)`;
  let sw=-1; CUT.slice(1).forEach(c=>{if(t>=c-.2&&t<c+.25)sw=(t-c+.2)/.45;}); sweep.style.display=sw>=0?'block':'none'; if(sw>=0)sweep.style.left=(-500+sw*1900)+'px';}

const chs=document.getElementById('chs');
const prg=document.getElementById('prog'); for(let i=0;i<7;i++){const x=document.createElement('i');prg.appendChild(x);}
const CH=[]; for(let i=0;i<CUT.length;i++){const d=div('ch','',chs);CH.push(d);
  if(HDR[i]){const h=div('hdr',`<div class="n">${HDR[i][0]}</div><div class="t">${HDR[i][1]}</div><div class="s">${HDR[i][2]}</div>`,d);d._h=h;}
  const s=sv('svg',{width:1080,height:1920,viewBox:'0 0 1080 1920',style:'position:absolute;left:0;top:0'});d.appendChild(s);d._svg=s;}
CUT.slice(1).forEach(c=>{sfx(c-.18,'whip',.55);});
const hdrIn=(k,t)=>fadeUp(CH[k]._h,t,CUT[k]+.05,.3);
const face=(img,sz,ring)=>`<span style="display:inline-block;width:${sz}px;height:${sz}px;border-radius:50%;overflow:hidden;border:4px solid ${ring};background:#1A1A20;vertical-align:middle;box-shadow:0 8px 24px rgba(0,0,0,.5)"><img src="img/${img}" style="width:100%;height:100%;object-fit:cover;object-position:50% 20%"></span>`;
const glass=(parent,st)=>{const d=div('glass abs','',parent,st);return d;};

function trophyN(parent,x,y,s){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  sv('circle',{cx:0,cy:-52,r:20,fill:'#FFC93C',stroke:'#7A5200','stroke-width':3},g);
  sv('path',{d:'M-20,-52 Q0,-46 20,-52 M0,-72 L0,-32',stroke:'#7A5200','stroke-width':2.5,fill:'none'},g);
  sv('path',{d:'M-24,-30 L24,-30 L12,30 L-12,30 Z',fill:'#FFC93C',stroke:'#7A5200','stroke-width':3},g);
  sv('path',{d:'M-18,-22 L-6,22 M0,-30 L0,30 M18,-22 L6,22',stroke:'#C9961A','stroke-width':2},g);
  sv('rect',{x:-22,y:30,width:44,height:16,rx:3,fill:'#2A2A31',stroke:'#7A5200','stroke-width':3},g);
  g.style.filter='drop-shadow(0 0 12px rgba(255,201,60,.55))'; return g;}
const tpop=(g,t,t0,x,y,s)=>{const p=back(prog(t,t0,t0+.35)); set(g,{transform:`translate(${x} ${y}) scale(${Math.max(0,p)*s})`,opacity:t>=t0?1:0});};
const tagS={zIndex:5,background:'rgba(8,8,12,.9)',border:'1.5px solid rgba(255,255,255,.2)',borderRadius:'22px',boxShadow:'0 18px 50px rgba(0,0,0,.6)',padding:'12px 22px'};
function calBars(E,S,CAL,y0,hgt,tStart,hide){const x0=130,w=170;
  return CAL.map(([p,a],i)=>{const x=x0+i*w;
    const rp=sv('rect',{x:x+20,width:56,y:y0,height:0,rx:6,fill:'rgba(255,255,255,.25)'},S);
    const ra=sv('rect',{x:x+82,width:56,y:y0,height:0,rx:6,fill:'#0CF5F9'},S);
    const lb=sv('text',{x:x+79,y:y0+40,'text-anchor':'middle','font-size':28,fill:'#fff',style:'font-family:Anton'},S); lb.textContent=p+'%';
    const va=sv('text',{x:x+110,y:y0,'text-anchor':'middle','font-size':24,fill:'#0CF5F9',style:'font-family:Anton'},S); va.textContent=a+'%';
    return {upd(t){const t0=tStart+i*.15; const g=eOut(prog(t,t0,t0+.5)); const v=!hide(t)&&t>=t0;
      set(rp,{y:y0-p/100*hgt*g,height:p/100*hgt*g,opacity:v?1:0}); set(ra,{y:y0-a/100*hgt*g,height:a/100*hgt*g,opacity:v?1:0}); set(lb,{opacity:v?1:0}); set(va,{y:y0-a/100*hgt*g-10,opacity:v&&g>.9?1:0});}};});}
const legHTML='<span style="display:inline-block;width:20px;height:20px;background:rgba(255,255,255,.35);border-radius:4px"></span> MODEL SAID &nbsp;&nbsp; <span style="display:inline-block;width:20px;height:20px;background:#0CF5F9;border-radius:4px"></span> ACTUALLY WON';

/* ---------- 0 HOOK ---------- */
const H=CH[0];
const wm=div('abs','',H,{left:'150px',top:'660px',width:'780px',height:'780px',background:`url(${NL('gs')}) center/contain no-repeat`,opacity:.09});
const lbH=div('hero','',H,{left:'-30px',top:'720px',width:'560px',height:'820px',backgroundImage:'url(img/lbj_hero2.png)'});
const scH=div('hero','',H,{left:'560px',top:'660px',width:'520px',height:'880px',backgroundImage:'url(img/sc_hero.png)'});
const h1=div('abs big',`WAS BLOWING A <span style="color:${GW}">3-1 LEAD</span><br>THE BIGGEST CHOKE<br><span class="gold">IN NBA HISTORY?</span>`,H,{left:'54px',top:'270px',fontSize:'94px',lineHeight:'1.04',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const h3=div('abs big',`2016 FINALS.<br><span style="color:${GW}">REPLAYED 100,000 TIMES.</span>`,H,{left:'54px',top:'270px',fontSize:'92px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const big31=div('abs big','3-1',H,{zIndex:5,left:'380px',top:'1000px',fontSize:'200px',color:GW,textShadow:'0 0 60px rgba(255,199,44,.6), 0 10px 30px rgba(0,0,0,.8)'});
const tL=div('abs','',H,Object.assign({left:'54px',top:'1330px'},tagS)); tL.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('cle',52)}<span class="big" style="font-size:40px">CAVS</span></div>`;
const tR=div('abs','',H,Object.assign({left:'760px',top:'1330px'},tagS)); tR.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('gs',52)}<span class="big" style="font-size:40px">73-9</span></div>`;
function rHook(t){const p0=eOut(prog(t,.05,.6)),p1=eOut(prog(t,.2,.75));
  lbH.style.transform=`translateX(${-(1-p0)*320}px) scale(${1.02+t*.006})`; lbH.style.opacity=Math.min(1,p0*1.5);
  scH.style.transform=`translateX(${(1-p1)*320}px) scale(${1.02+t*.006})`; scH.style.opacity=Math.min(1,p1*1.5);
  show([h1],t<K.sim-.05); fadeUp(h1,t,.05,.35,40); show([h3],t>=K.sim-.05); popIn(h3,t,K.sim-.05,{from:1.04});
  show([big31],t>=.7); popIn(big31,t,.7,{from:1.3}); big31.style.transform+=' rotate(-6deg)';
  if(t>=K.sim){const k=prog(t,K.sim,K.sim+.25); big31.innerHTML=k<1?'3-1':'3-1 → ?';} else big31.innerHTML='3-1';
  show([tL,tR],t>=1.0); popIn(tL,t,1.0,{from:.85}); popIn(tR,t,1.2,{from:.85});
  wm.style.transform=`scale(${1+t*.01})`; H.style.transform=`scale(${1+t*.004})`;}
sfx(.05,'whoosh',.5); sfx(.3,'thump',.7); sfx(.7,'thump',.8); sfx(1.0,'pop',.4); sfx(1.2,'pop',.4); sfx(K.sim-.05,'thump',.8);

/* ---------- 1 SERIES ---------- */
const E1=CH[1];
const k1=glass(E1,{left:'54px',top:'530px',width:'972px',height:'210px',padding:'0 28px'}); k1.classList.add('kpi');
k1.innerHTML=`<div style="display:flex;align-items:center;gap:24px;height:100%">${nlH('gs',120)}<div><div class="big gold" style="font-size:120px;line-height:1">73-9</div><div class="osw mut" style="font-size:28px">BEST REGULAR SEASON EVER</div></div></div>`;
const GM=[['G1','gs','gs'],['G2','gs','gs'],['G3','cle','cle'],['G4','gs','cle'],['G5',null,'gs'],['G6',null,'cle'],['G7',null,'gs']];
const GMB=GM.map(([g,w,v],i)=>{const d=glass(E1,{left:(54+i*140)+'px',top:'800px',width:'128px',height:'200px',textAlign:'center',paddingTop:'12px'});
  d.innerHTML=`<div class="osw mut" style="font-size:26px">${g}</div>`+(w?`<img src="${NL(w)}" style="width:80px;height:80px;object-fit:contain;margin-top:8px">`:`<div class="big" style="font-size:80px;color:#fff;margin-top:2px">?</div>`)+`<div class="osw" style="font-size:20px;margin-top:6px;color:${v==='gs'?GW:'#8E8E96'}">@${v==='gs'?'GSW':'CLE'}</div>`; d._w=w; d._v=v; return d;});
const sc31=div('abs big','',E1,{left:'54px',top:'1060px',width:'972px',textAlign:'center',fontSize:'110px'}); sc31.innerHTML=`WARRIORS LEAD <span style="color:${GW}">3-1</span>`;
const homeP=div('pill','2 OF THE LAST 3 AT HOME',E1,{left:'280px',top:'1220px',background:GW,color:'#050506',fontSize:'38px'});
function rSer(t){hdrIn(1,t); popIn(k1,t,CUT[1]+.1,{from:.9});
  GMB.forEach((d,i)=>{const t0=i<4?K.led+.1+i*.2:K.home-.05+(i-4)*.15; show([d],t>=t0); popIn(d,t,t0,{from:.7}); d.classList.toggle('hot',!d._w&&d._v==='gs'&&t>=K.home+.3);});
  show([sc31],t>=K.led+.9); popIn(sc31,t,K.led+.9,{from:1.1}); show([homeP],t>=K.home+.3); popIn(homeP,t,K.home+.3,{from:1.2});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0012})`;}
sfx(CUT[1]+.1,'pop',.4); [0,1,2,3].forEach(i=>sfx(K.led+.1+i*.2,'click',.35)); sfx(K.led+.9,'thump',.7); sfx(K.home+.3,'ding',.35);

/* ---------- 2 HISTORY DOTS ---------- */
const E2=CH[2], S2=E2._svg;
const DOTS=[]; const R2=rng(31); const red=new Set(); while(red.size<15) red.add(Math.floor(R2()*288));
for(let i=0;i<288;i++){const c=sv('circle',{cx:110+(i%24)*37,cy:820+Math.floor(i/24)*37,r:0,fill:'rgba(255,255,255,.55)'},S2); DOTS.push(c);}
const k2=glass(E2,{left:'54px',top:'530px',width:'972px',height:'190px',padding:'0 28px'}); k2.classList.add('kpi');
k2.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;height:100%"><div><div class="osw mut" style="font-size:26px">TEAMS UP 3-1 WIN THE SERIES</div><div class="big gold" style="font-size:120px;line-height:1">95%</div></div><div class="big" style="font-size:44px;text-align:right" id="cnt2">0<br><span class="osw mut" style="font-size:24px">3-1 LEADS</span></div></div>`;
const cnt2=k2.querySelector('#cnt2');
const only=div('pill','ONLY 15 CAME BACK',E2,{left:'300px',top:'1290px',background:'#FF4B3E',color:'#fff',fontSize:'40px',boxShadow:'0 0 40px rgba(255,75,62,.5)'});
function rHist(t){hdrIn(2,t); popIn(k2,t,CUT[2]+.1,{from:.9});
  const g=prog(t,K.hap-.3,K.hap+1.2); const n=Math.floor(g*288); cnt2.innerHTML=`~${Math.round(g*300)}<br><span class="osw mut" style="font-size:24px">3-1 LEADS</span>`;
  DOTS.forEach((c,i)=>{const on=i<n; const r=red.has(i)&&t>=K.only-.05; set(c,{r:on?13:0,fill:r?'#FF4B3E':'rgba(255,255,255,.5)'}); c.style.filter=r?'drop-shadow(0 0 8px #FF4B3E)':'none';});
  show([only],t>=K.only+.2); popIn(only,t,K.only+.2,{from:1.2});
  E2.style.transform=`scale(${1+(t-CUT[2])*.0012})`;}
sfx(CUT[2]+.1,'pop',.4); sfx(K.hap-.3,'riser',.3,1.4); sfx(K.only-.05,'thump',.7); sfx(K.only+.2,'pop',.45);

/* ---------- 3 THE ODDS ---------- */
const E3=CH[3];
const eG=glass(E3,{left:'54px',top:'530px',width:'972px',height:'170px',padding:'0 28px'});
eG.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%">${nlH('gs',100)}<div style="flex:1"><div class="osw mut" style="font-size:24px">WARRIORS ELO BEFORE GAME 5</div><div class="big" style="font-size:84px;line-height:1;color:${GW}">1,798</div></div><span class="big" style="font-size:28px;line-height:1.15;text-align:right;color:#FF4B3E" id="hiT">HIGHEST EVER<br>TO BLOW 3-1</span></div>`;
const hiT=eG.querySelector('#hiT');
const eC=glass(E3,{left:'54px',top:'720px',width:'972px',height:'170px',padding:'0 28px'});
eC.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%">${nlH('cle',100)}<div><div class="osw mut" style="font-size:24px">CAVALIERS ELO</div><div class="big" style="font-size:84px;line-height:1;color:${CG}">1,717</div></div></div>`;
const GP=[['GAME 5','@ GOLDEN STATE',26,K.g5],['GAME 6','@ CLEVELAND',53,K.g6],['GAME 7','@ GOLDEN STATE',26,K.g7]];
const GPC=GP.map(([g,v,p,t0],i)=>{const d=glass(E3,{left:(54+i*330)+'px',top:'930px',width:'312px',height:'330px',textAlign:'center',paddingTop:'26px'});
  d.innerHTML=`<div class="big" style="font-size:44px">${g}</div><div class="osw mut" style="font-size:22px">${v}</div><div class="big" style="font-size:110px;color:${p>50?'#2BE38B':CG};margin-top:10px">${p}%</div><div class="osw mut" style="font-size:22px">CAVS WIN CHANCE</div>`; d._t=t0; return d;});
function rOdds(t){hdrIn(3,t); popIn(eG,t,CUT[3]+.1,{from:.9}); hiT.style.opacity=t>=K.hi-.05?1:0;
  eG.classList.toggle('hot',t>=K.hi&&t<K.cle);
  show([eC],t>=K.cle-.05); popIn(eC,t,K.cle-.05,{from:.9});
  GPC.forEach(d=>{show([d],t>=d._t-.05); popIn(d,t,d._t-.05,{from:.8});});
  E3.style.transform=`scale(${1+(t-CUT[3])*.0012})`;}
sfx(CUT[3]+.1,'pop',.4); sfx(K.hi-.05,'thump',.55); sfx(K.cle-.05,'pop',.45); GP.forEach(g=>sfx(g[3]-.05,'thump',.5));

/* ---------- 4 HONEST ---------- */
const E4=CH[4];
const hx=glass(E4,{left:'54px',top:'560px',width:'972px',height:'260px',padding:'24px 28px'});
hx.innerHTML=`<div class="osw mut" style="font-size:26px">MODEL EXPECTED (3-1 LEADS THROUGH 2025)</div><div style="display:flex;align-items:center;gap:20px;margin-top:10px"><span class="big cy num-glow" style="font-size:110px;width:200px">~20</span><div style="flex:1;height:44px;border-radius:22px;background:rgba(255,255,255,.08);overflow:hidden"><div class="bar" style="height:100%;width:0;background:#0CF5F9"></div></div></div><div class="osw mut" style="font-size:24px">COMEBACKS</div>`;
const ha=glass(E4,{left:'54px',top:'850px',width:'972px',height:'260px',padding:'24px 28px'});
ha.innerHTML=`<div class="osw mut" style="font-size:26px">ACTUAL COMEBACKS</div><div style="display:flex;align-items:center;gap:20px;margin-top:10px"><span class="big" style="font-size:110px;width:200px;color:${GW}">13</span><div style="flex:1;height:44px;border-radius:22px;background:rgba(255,255,255,.08);overflow:hidden"><div class="bar" style="height:100%;width:0;background:${GW}"></div></div></div><div class="osw mut" style="font-size:24px">COMEBACKS</div>`;
const gen=div('pill','IF ANYTHING, GENEROUS TO THE COMEBACK ✓',E4,{left:'90px',top:'1160px',background:'#fff',color:'#050506',fontSize:'34px'});
function rHon(t){hdrIn(4,t);
  show([hx],t>=K.exp-.05); popIn(hx,t,K.exp-.05,{from:.9}); hx.querySelector('.bar').style.width=(eOut(prog(t,K.exp,K.exp+.8))*100)+'%';
  show([ha],t>=K.were-.05); popIn(ha,t,K.were-.05,{from:.9}); ha.querySelector('.bar').style.width=(eOut(prog(t,K.were,K.were+.8))*65)+'%';
  show([gen],t>=K.gen-.05); popIn(gen,t,K.gen-.05,{from:1.2});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
sfx(K.exp-.05,'pop',.4); sfx(K.were-.05,'thump',.6); sfx(K.gen-.05,'ding',.4);
/* ---------- CTA (follow) ---------- */
const ECT=CH[5]; const tapT=K.fol+.3;
const ph=div('abs','',ECT,{left:'200px',top:'290px',width:'680px',height:'990px',background:'#111',borderRadius:'70px',border:'12px solid #2A2A31',boxSizing:'border-box',overflow:'hidden'});
const GRID='<div style="width:656px;height:199px;background:url(profile.png) 0 -263px/656px auto no-repeat;background-color:#fff"></div>';
ph.innerHTML=`<div class="scr" style="position:absolute;left:0;top:0;width:656px;background:#fff">
  <div style="height:70px;background:#fff"></div>
  <div style="position:relative;width:656px;height:266px;background:url(profile.png) -301px -35px/1247px auto no-repeat;background-color:#fff"></div>
  ${GRID.repeat(6)}</div>
  <div class="fbtn" style="position:absolute;left:19px;top:291px;width:225px;height:39px;border-radius:9px;background:#EFEFEF;color:#111;display:none;align-items:center;justify-content:center;font:700 22px Osw">FOLLOWING ✓</div>`;
const scr=ph.querySelector('.scr'), fbtn=ph.querySelector('.fbtn');
const fing=div('abs','',ECT,{left:'0',top:'0',width:'120px',height:'120px',fontSize:'110px',lineHeight:'1'}); fing.textContent='👆';
const ctaT=div('abs big','HIT <span class="cy">FOLLOW</span>',ECT,{left:'0',right:'0',top:'1300px',textAlign:'center',fontSize:'100px',display:'none'});
const ripple=div('abs','',ECT,{width:'120px',height:'120px',borderRadius:'50%',border:'8px solid #0CF5F9',display:'none'});
function rCta(t){const t0=CUT[5]; popIn(ph,t,t0+.05,{from:.85});
  const sc=prog(t,t0+.2,tapT-.25); const off=-Math.sin(sc*Math.PI)*300; scr.style.transform=`translateY(${off}px)`;
  const bx=200+12+19+112, by=290+12+291+20;
  const fp=eOut(prog(t,K.fol-.6,tapT)); const fx=lerp(860,bx,fp), fy=lerp(1250,by,fp)+(t>=tapT&&t<tapT+.15?10:0);
  fing.style.left=(fx-35)+'px'; fing.style.top=(fy-10)+'px'; fing.style.display=t>=K.fol-.6?'block':'none';
  fbtn.style.display=t>=tapT+.08?'flex':'none';
  ripple.style.display=t>=tapT&&t<tapT+.5?'block':'none'; const rp=prog(t,tapT,tapT+.5); ripple.style.left=(bx-60)+'px'; ripple.style.top=(by-60)+'px'; ripple.style.transform=`scale(${.4+rp*1.4})`; ripple.style.opacity=1-rp;
  show([ctaT],t>=tapT); popIn(ctaT,t,tapT,{from:1.3});
  ECT.style.transform=`scale(${1+(t-t0)*.004})`;}
sfx(CUT[5]+.05,'whoosh',.45); sfx(tapT,'click',.7); sfx(tapT+.05,'ding',.45); sfx(tapT+.1,'sparkle',.35);


/* ---------- 6 REPLAYS ---------- */
const E6=CH[6], S6=E6._svg;
const k6=glass(E6,{left:'54px',top:'530px',width:'972px',height:'230px',padding:'0 28px'}); k6.classList.add('kpi');
k6.innerHTML=`<div style="display:flex;align-items:center;gap:24px;height:100%">${nlH('cle',120)}<div><div class="osw mut" style="font-size:26px">CAVS COMEBACKS IN 100,000 REPLAYS</div><div class="big num" style="font-size:120px;line-height:1;color:${CG}" id="n6">0</div></div></div>`;
const n6=k6.querySelector('#n6');
const D28=[]; for(let i=0;i<28;i++){const c=sv('circle',{cx:150+(i%7)*130,cy:900+Math.floor(i/7)*110,r:0,fill:'rgba(255,255,255,.18)',stroke:'rgba(255,255,255,.35)','stroke-width':3},S6); D28.push(c);}
const r28=div('abs big','1 IN 28',E6,{left:'0',right:'0',textAlign:'center',top:'1300px',fontSize:'120px',color:CG,textShadow:'0 0 50px rgba(253,187,48,.5)'});
function rRep(t){hdrIn(6,t); popIn(k6,t,CUT[6]+.1,{from:.9}); n6.textContent=Math.round(3570*eOut(prog(t,K.back,K.back+1.6))).toLocaleString('en-US');
  D28.forEach((c,i)=>{const t0=K.back+.2+i*.04; const g=back(prog(t,t0,t0+.3)); const lit=i===13&&t>=K.r28-.05; set(c,{r:Math.max(0,g)*40,fill:lit?CW:'rgba(255,255,255,.12)',stroke:lit?CG:'rgba(255,255,255,.3)'}); c.style.filter=lit?'drop-shadow(0 0 20px #FDBB30)':'none';});
  show([r28],t>=K.r28-.05); popIn(r28,t,K.r28-.05,{from:1.2});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0012})`;}
sfx(CUT[6]+.1,'pop',.4); sfx(K.back,'riser',.3,1.5); for(let i=0;i<28;i+=2)sfx(K.back+.2+i*.04,'click',.12); sfx(K.r28-.05,'ding',.55);

/* ---------- 7 LONGEST SHOTS ---------- */
const E7=CH[7];
const LS=[['bos','1968 CELTICS','OVER THE 76ERS','1 IN 51',K.c68-.05,0],['phi','2026 SIXERS','OVER THE CELTICS','LONG SHOT*',K.sx-.05,0],[null,'2020 NUGGETS','OVER THE CLIPPERS','1 IN 32',K.sx+.35,0],['cle','2016 CAVS','OVER THE WARRIORS','1 IN 28',K.c7+.3,1]];
const LSR=LS.map(([ab,a,b,p,t0,me],i)=>{const d=glass(E7,{left:'54px',top:(540+i*190)+'px',width:'972px',height:'170px',padding:'0 28px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%">${ab?nlH(ab,90):'<span style="display:inline-block;width:90px;text-align:center" class="big mut">DEN</span>'}<div style="flex:1"><div class="big" style="font-size:52px">${a}</div><div class="osw mut" style="font-size:24px">${b}</div></div><span class="big" style="font-size:${p.length>8?48:70}px;${me?'color:'+CG:''}">${p}</span></div>`; d._t=t0; d._me=me; return d;});
const fn7=div('abs osw mut','*PRE-GAME BETTING LINES · NOT IN THE ELO DATA',E7,{left:'54px',top:'1320px',fontSize:'22px'});
function rLong(t){hdrIn(7,t);
  LSR.forEach((d,i)=>{show([d],t>=d._t); popIn(d,t,d._t,{from:.9,y:20}); d.classList.toggle('hot',d._me&&t>=d._t+.3);});
  show([fn7],t>=K.sx); fadeUp(fn7,t,K.sx);
  E7.style.transform=`scale(${1+(t-CUT[7])*.0012})`;}
LS.forEach(r=>sfx(r[4],'thump',.45));

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const CK=[['BEST TEAM EVER TO BLOW 3-1','1,798 ELO · NEXT HIGHEST 1,743',K.nt-.05],['ONLY 3-1 COMEBACK IN FINALS HISTORY','',K.fin-.05],['THEY’D JUST COME BACK FROM 3-1','VS. OKC, TWO WEEKS EARLIER',K.okc-.05]];
const CKR=CK.map(([a,b,t0],i)=>{const d=glass(E8,{left:'54px',top:(540+i*200)+'px',width:'972px',height:'180px',padding:'0 28px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%"><span class="big" style="font-size:80px;color:#2BE38B">✓</span><div><div class="big" style="font-size:44px">${a}</div><div class="osw mut" style="font-size:24px">${b}</div></div></div>`; d._t=t0; return d;});
const vtx=div('abs big',`NOT THE UNLUCKIEST.<br><span style="color:${GW}">THE BIGGEST CHOKE.</span>`,E8,{left:'54px',top:'1160px',fontSize:'84px',lineHeight:'1.05'});
const poll=glass(E8,{left:'110px',top:'560px',width:'860px',padding:'40px'});
poll.innerHTML=`<div style="display:flex;justify-content:center;gap:30px">${nlH('gs',140)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:14px">BIGGEST CHOKE IN NBA HISTORY?</div>`+['AGREE','NO WAY'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:66px;text-align:center;border-radius:60px;padding:12px 0;${i===0?`background:${GW};color:#050506;box-shadow:0 0 40px rgba(255,199,44,.5)`:'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t); const a=t<K.v2-.05; show([...CKR,vtx],a); E8._h.style.display=a?'block':'none';
  if(a){CKR.forEach(d=>{show([d],t>=d._t); popIn(d,t,d._t,{from:.9,y:20}); d.classList.toggle('hot',t>=d._t+.3);}); show([vtx],t>=K.v1-.05); popIn(vtx,t,K.v1-.05,{from:1.05});}
  show([poll],!a); if(!a){popIn(poll,t,K.v2-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,K.v2+.3+i*.35,{from:.4}));}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
CK.forEach(c=>sfx(c[2],'ding',.4)); sfx(K.v1-.05,'thump',.75); sfx(K.v2-.05,'whoosh',.5); sfx(K.v2+.3,'pop',.5); sfx(K.v2+.65,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rSer,rHist,rOdds,rHon,rCta,rRep,rLong,rVer];
