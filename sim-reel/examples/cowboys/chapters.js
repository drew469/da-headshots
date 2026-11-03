/* ===================== chapters (Cowboys) ===================== */
const NL=ab=>`logos/nfl-${ab.toLowerCase()==="oak"?"lv":ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const NAVY='#003594', DB='#2F6BD8', SIL='#B0B7BC';
const CUT=[0, C(8)-.05, C(15)-.05, C(19)-.05, C(24)-.05, C(31)-.05, C(35)-.05, C(41)-.05, CX8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','Every team gets a score.','it’s called Elo · like a chess rating'],
 ['02','Replay every season.','every game at its real odds · real playoff rules'],
 ['03','Is it honest?','14,413 NFL games · 1966–2025'],
 ['04','100,000 histories.','playoff trips per 30 seasons'],
 ['05','NFC title games.','appearances per 30-season history'],
 ['06','Where it breaks.','all 18 Cowboys playoff games since 1996'],
 ['07','The divisional round.','every Cowboys trip since 1996'],
 ['08','The verdict.','']];
const chs=document.getElementById('chs');
const prg=document.getElementById('prog'); for(let i=0;i<8;i++){const x=document.createElement('i');prg.appendChild(x);}
const CH=[]; for(let i=0;i<CUT.length;i++){const d=div('ch','',chs);CH.push(d);
  if(HDR[i]){const h=div('hdr',`<div class="n">${HDR[i][0]}</div><div class="t">${HDR[i][1]}</div><div class="s">${HDR[i][2]}</div>`,d);d._h=h;}
  const s=sv('svg',{width:1080,height:1920,viewBox:'0 0 1080 1920',style:'position:absolute;left:0;top:0'});d.appendChild(s);d._svg=s;}
CUT.slice(1).forEach(c=>{sfx(c-.18,'whip',.55);});
const hdrIn=(k,t)=>fadeUp(CH[k]._h,t,CUT[k]+.05,.3);
const YRS=DATA.yr.map(x=>x[0]);
const REALPO=new Set(DATA.realpo);
function tiles(parent,x0,y0,cw=96,ch=60){const T=[];YRS.forEach((y,i)=>{const d=div('abs osw','',parent,{left:(x0+(i%10)*cw)+'px',top:(y0+Math.floor(i/10)*ch)+'px',width:(cw-8)+'px',height:(ch-8)+'px',borderRadius:'10px',background:'#1A1A20',fontSize:'26px',display:'flex',alignItems:'center',justifyContent:'center',color:'#8E8E96'}); d.textContent="’"+String(y).slice(2); T.push(d);});return T;}
/* football icon */
function football(parent,x,y,s=1,fill='#7A4A22'){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  const b=sv('ellipse',{rx:38,ry:22,fill,stroke:'#050506','stroke-width':3},g);
  sv('line',{x1:-14,x2:14,y1:0,y2:0,stroke:'#fff','stroke-width':3},g);
  for(let i=-2;i<=2;i++)sv('line',{x1:i*6,x2:i*6,y1:-6,y2:6,stroke:'#fff','stroke-width':2.5},g);
  sv('path',{d:'M-30,-12 Q-26,0 -30,12',stroke:'#fff','stroke-width':2.5,fill:'none'},g); sv('path',{d:'M30,-12 Q26,0 30,12',stroke:'#fff','stroke-width':2.5,fill:'none'},g);
  g._b=b; return g;}

/* ---------- 0 HOOK ---------- */
const H=CH[0], Hs=H._svg;
const hCirc=div('abs','',H,{left:'300px',top:'700px',width:'660px',height:'660px',borderRadius:'50%',background:NAVY,boxShadow:`inset 0 0 0 12px ${SIL}`});
const hWm=div('abs','',H,{left:'420px',top:'820px',width:'420px',height:'420px',background:`url(${NL('dal')}) center/contain no-repeat`,opacity:.18});
const hSt=div('abs','',H,{left:'360px',top:'650px',width:'600px',height:'715px',background:'url(img/st_dak.png) center bottom/contain no-repeat'});
const h1=div('abs big','DALLAS COWBOYS:<br><span class="cy">30 YEARS.</span>',H,{left:'54px',top:'292px',fontSize:'118px'});
const h1s=div('abs osw','no NFC Championship Game since <span class="cy">1995</span>',H,{left:'58px',top:'545px',fontSize:'40px'});
const hDal=div('abs','',H,{left:'50px',top:'740px'}); hDal.innerHTML=nlH('dal',200);
const hMk=div('abs mk cy','last one: ’95',H,{left:'40px',top:'975px',fontSize:'56px'});
const hNF=div('abs','',H,{left:'60px',top:'1100px'}); hNF.innerHTML='<div class="big rd" style="font-size:110px;line-height:1">0</div><div class="osw" style="font-size:26px;letter-spacing:2px">NFC TITLE<br>GAMES SINCE</div>';
// B: I simulated
const hB=div('abs big','I SIMULATED<br>30 SEASONS<br><span class="cy">100,000 TIMES.</span>',H,{left:'54px',top:'292px',fontSize:'112px'});
const tB=tiles(H,60,740,96,104);
const hBk=div('abs','',H,{left:'60px',top:'1070px'}); hBk.innerHTML=`<span class="osw" style="font-size:28px;display:inline-flex;gap:30px;align-items:center"><span><span style="display:inline-block;width:26px;height:26px;background:${DB};border-radius:6px;vertical-align:middle"></span> REAL PLAYOFF TRIPS</span></span>`;
// C: 2.6%
const hC=div('abs big cy','2.6%',H,{left:'54px',top:'300px',fontSize:'280px'});
const hCs=div('abs osw','of simulated histories: <span class="rd">0 NFC title games</span>',H,{left:'60px',top:'610px',fontSize:'40px'});
const fbG=sv('g',{},Hs); const FB=[]; for(let i=0;i<38;i++){const x=140+(i%8)*114, y=760+Math.floor(i/8)*110; FB.push(football(fbG,x,y,1.05));}
const hC1=div('pill','≈ 1 IN 38',H,{left:'700px',top:'1262px',background:'var(--rd)',color:'#fff',fontSize:'50px'});
// D: cursed or just bad
const hD=div('abs big','CURSED…',H,{left:'54px',top:'300px',fontSize:'170px'});
const hD2=div('abs big','…OR JUST <span class="rd">BAD?</span>',H,{left:'54px',top:'480px',fontSize:'130px'});
const hDj=div('abs','',H,{left:'330px',top:'680px',width:'680px',height:'760px',background:'url(img/st_dak.png) center bottom/contain no-repeat'});
const hDl=div('abs','',H,{left:'60px',top:'760px'}); hDl.innerHTML=nlH('dal',220);
function rHook(t){
  const a=t<C(2)-.05; show([hCirc,hWm,hSt,h1,h1s,hDal,hMk,hNF],a);
  if(a){const pc=back(prog(t,.02,.42)); hCirc.style.transform=`scale(${Math.max(0,pc)})`; hWm.style.transform=hCirc.style.transform; hWm.style.opacity=.18*prog(t,.2,.5);
    const ps=eOut(prog(t,.12,.6)); hSt.style.transform=`translateY(${(1-ps)*420}px) scale(${1+t*.012})`; hSt.style.opacity=ps>0?1:0;
    fadeUp(h1,t,.05,.3,40); fadeUp(h1s,t,C(1)+.2,.3); popIn(hDal,t,.6,{from:.3}); popIn(hMk,t,C(1)+.9,{from:1.3}); hMk.style.transform+=' rotate(-7deg)'; popIn(hNF,t,WT('years',C(1))-.05,{from:1.5});}
  const b=t>=C(2)-.05&&t<C(4)-.05; show([hB,hBk,...tB],b);
  if(b){fadeUp(hB,t,C(2)-.05,.3); tB.forEach((d,i)=>{popIn(d,t,C(2)+.2+i*.03,{from:.3}); const lit=t>=C(3)+.2+i*.02&&REALPO.has(YRS[i]); d.style.background=lit?DB:'#1A1A20'; d.style.color=lit?'#fff':'#8E8E96';});
    fadeUp(hBk,t,C(3)+.4);}
  const c=t>=C(4)-.05&&t<C(6)-.05; show([hC,hCs,hC1],c); fbG.style.display=c?'inline':'none';
  if(c){popIn(hC,t,C(4)-.05,{from:1.2}); hC.textContent=(2.6*eOut(prog(t,C(4),C(4)+.8))).toFixed(1)+'%'; fadeUp(hCs,t,C(4)+.25);
    FB.forEach((f,i)=>{const p=back(prog(t,C(4)+.1+i*.02,C(4)+.35+i*.02)); f.setAttribute('opacity',p>0?1:0); const x=140+(i%8)*114, y=760+Math.floor(i/8)*110;
      const red=i===37&&t>=C(5)+.2; const s=1.05*Math.max(0,p)*(red?1+.35*(1-eOut(prog(t,C(5)+.2,C(5)+.5))):1); set(f,{transform:`translate(${x} ${y}) scale(${s})`});
      set(f._b,{fill:red?'#FF4B3E':(t>=C(5)+.2?'#3A3A44':'#7A4A22')});});
    hC1.style.display=t>=C(5)+.6?'block':'none'; popIn(hC1,t,C(5)+.6,{from:1.5});}
  const d=t>=C(6)-.05; show([hD,hDl,hDj],d); show([hD2],d&&t>=WT('just',C(6))-.05);
  if(d){popIn(hD,t,C(6)-.05,{from:1.15}); popIn(hD2,t,WT('just',C(6))-.05,{from:1.3}); popIn(hDl,t,C(6)+.2,{from:.3});
    const ps=eOut(prog(t,C(6)+.1,C(6)+.5)); hDj.style.transform=`translateX(${(1-ps)*600}px) scale(${1+(t-C(6))*.012})`;
    H.style.transform=`scale(${1+Math.max(0,t-C(7))*.01})`;}
}
sfx(.05,'whoosh',.5); sfx(.25,'thump',.6); sfx(.6,'pop',.45); sfx(WT('years',C(1))-.05,'thump',.7); sfx(C(1)+.9,'pop',.4);
sfx(C(2)-.05,'whoosh',.5); for(let i=0;i<12;i++)sfx(C(2)+.2+i*.08,'click',.2); sfx(C(3)+.2,'ding',.3);
sfx(C(4)-.05,'thump',.7); for(let i=0;i<14;i++)sfx(C(4)+.1+i*.05,'click',.18); sfx(C(5)+.2,'thump',.8); sfx(C(5)+.6,'pop',.5);
sfx(C(6)-.05,'whoosh',.45); sfx(WT('just',C(6))-.05,'thump',.8); sfx(C(7),'riser',.25,1.2);

/* ---------- 1 ELO ---------- */
const E1=CH[1], S1=E1._svg; const yr=DATA.yr;
const cx0=130,cx1=960,cy0=1250,cy1=640,ymn=1300,ymx=1750;
const ex=i=>cx0+i*(cx1-cx0)/(yr.length-1), ey=e=>cy0-(e-ymn)/(ymx-ymn)*(cy0-cy1);
const ax1=sv('g',{},S1);
[1400,1500,1600,1700].forEach(v=>{sv('line',{x1:cx0,x2:cx1,y1:ey(v),y2:ey(v),stroke:'#1E1E24','stroke-width':2},ax1);const tx=sv('text',{x:cx0-14,y:ey(v)+8,'text-anchor':'end','font-size':24,fill:'#6A6A72'},ax1);tx.textContent=v;});
[1996,2002,2009,2016,2025].forEach(y=>{const i=YRS.indexOf(y);const tx=sv('text',{x:ex(i),y:cy0+44,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax1);tx.textContent=y;});
const eLab=div('abs osw',`${nlH('dal',84)} <span style="vertical-align:middle">COWBOYS · TEAM RATING BY SEASON</span>`,E1,{left:'120px',top:'520px',fontSize:'34px',letterSpacing:'1.5px'});
const eline=sv('path',{fill:'none',stroke:DB,'stroke-width':8,'stroke-linecap':'round','stroke-linejoin':'round'},S1);
const edot=sv('circle',{r:12,fill:'#fff'},S1);
const pUp=div('pill','WIN → ▲',E1,{left:'130px',top:'1320px',background:'var(--cy)',color:'#050506',fontSize:'36px'});
const pDn=div('pill','LOSE → ▼',E1,{left:'420px',top:'1320px',background:'var(--rd)',color:'#fff',fontSize:'36px'});
const i02=YRS.indexOf(2002), i09=YRS.indexOf(2009);
const low=sv('circle',{cx:ex(i02),cy:ey(yr[i02][1]),r:22,fill:'none',stroke:'#FF4B3E','stroke-width':6},S1);
const lowT=div('abs','',E1,{left:(ex(i02)+40)+'px',top:(ey(yr[i02][1])-40)+'px',width:'300px',textAlign:'left'}); lowT.innerHTML='<div class="big rd" style="font-size:80px">5-11</div><div class="osw" style="font-size:26px">2002 · ROCK BOTTOM</div>';
const hi=sv('circle',{cx:ex(i09),cy:ey(yr[i09][1]),r:22,fill:'none',stroke:'#0CF5F9','stroke-width':6},S1);
const hiT=div('abs','',E1,{left:(ex(i09)-300)+'px',top:(ey(yr[i09][1])-100)+'px',width:'270px',textAlign:'right'}); hiT.innerHTML='<div class="big cy" style="font-size:64px">PEAK ’09</div>';
const romo=div('abs','',E1,{left:'650px',top:'930px',width:'400px',height:'500px',background:'url(img/st_romo.png) center bottom/contain no-repeat'});
const romoT=div('pill','TONY ROMO',E1,{left:'740px',top:'1370px',background:NAVY,color:'#fff',fontSize:'34px',border:`3px solid ${SIL}`});
function linePts(p){const n=Math.max(1,Math.floor(p*(yr.length-1))); let d=''; for(let i=0;i<=n;i++)d+=(i?'L':'M')+ex(i)+','+ey(yr[i][1]); return {d,i:n};}
function rElo(t){hdrIn(1,t); fadeUp(eLab,t,CUT[1]+.15); set(ax1,{opacity:prog(t,CUT[1]+.1,CUT[1]+.4)});
  const lp=linePts(eIO(prog(t,C(9),C(12)-.2))); set(eline,{d:lp.d}); set(edot,{cx:ex(lp.i),cy:ey(yr[lp.i][1])});
  show([pUp],t>=C(10)-.05&&t<C(12)); popIn(pUp,t,C(10)-.05,{from:.5}); show([pDn],t>=C(11)-.05&&t<C(12)); popIn(pDn,t,C(11)-.05,{from:.5});
  low.style.display=t>=C(12)?'inline':'none'; set(low,{r:22+10*(1-eOut(prog(t,C(12),C(12)+.3)))}); {const tl=WTs('two',C(12))-.05; show([lowT],t>=tl); popIn(lowT,t,tl,{from:1.4});}
  hi.style.display=t>=C(13)?'inline':'none'; set(hi,{r:22+10*(1-eOut(prog(t,C(13),C(13)+.3)))}); show([hiT],t>=C(14)-.05); popIn(hiT,t,C(14)-.05,{from:1.3});
  const tr=WTs('Tony',C(14),'tony'); show([romo,romoT],t>=tr-.1); {const p=eOut(prog(t,tr-.1,tr+.25)); romo.style.transform=`translateY(${(1-p)*520}px)`;} popIn(romoT,t,tr+.2,{from:1.4});
  E1.style.transform=`scale(${1+(t-CUT[1])*.002})`;}
sfx(C(9),'riser',.3,2); sfx(C(10)-.05,'pop',.5); sfx(C(11)-.05,'pop',.5); sfx(C(12),'thump',.6); sfx(C(13),'ding',.35); sfx(C(14)-.05,'thump',.6);

/* ---------- 2 REPLAY ---------- */
const E2=CH[2];
const t2=tiles(E2,60,560,96,100);
const tick=div('abs','',E2,{left:'60px',right:'60px',top:'900px'});
const leg=div('abs','',E2,{left:'60px',top:'1150px'}); leg.innerHTML=`<span class="osw" style="font-size:28px;display:inline-flex;gap:30px;align-items:center"><span><span style="display:inline-block;width:26px;height:26px;background:${DB};border-radius:6px;vertical-align:middle"></span> MADE PLAYOFFS</span><span><span style="display:inline-block;width:26px;height:26px;background:#1A1A20;border-radius:6px;vertical-align:middle"></span> MISSED</span></span>`;
const OPPS=['PHI','NYG','WSH','SF','GB','SEA','NO','LAR','MIN','CHI','ATL','TB','DET','ARI','CAR'];
function rRep(t){hdrIn(2,t);
  const R=rng(Math.floor((t-CUT[2])*6)+3);
  t2.forEach((d,i)=>{popIn(d,t,CUT[2]+.15+i*.02,{from:.3}); const lit=t>=C(17)-.05&&R()<.5; d.style.background=lit?DB:'#1A1A20'; d.style.color=lit?'#fff':'#8E8E96';});
  const on=t>=C(15)+.4; tick.style.display=on?'block':'none';
  if(on){const k=Math.floor((t-C(15))*7), o=OPPS[k%OPPS.length], p=35+((k*37)%45);
    tick.innerHTML=`<div style="display:flex;align-items:center;gap:22px;background:#101014;border:3px solid #26262C;border-radius:18px;padding:18px 28px">${nlH('dal',110)}<span class="big mut" style="font-size:60px">VS</span>${nlH(o,110)}<div style="margin-left:auto;text-align:right"><div class="osw mut" style="font-size:24px;letter-spacing:2px">REAL ODDS</div><div class="big cy" style="font-size:90px">${p}%</div></div></div>`;}
  show([leg],t>=C(17)-.05); fadeUp(leg,t,C(17)-.05);
  E2.style.transform=`scale(${1+(t-CUT[2])*.002})`;}
for(let i=0;i<24;i++)sfx(C(15)+.4+i/7,'click',.15); sfx(C(17)-.05,'whoosh',.4); sfx(C(18),'pop',.4);

/* ---------- 3 HONEST ---------- */
const E3=CH[3], S3=E3._svg;
const px=v=>160+(v-.5)/.45*800, py=v=>1330-(v-.5)/.45*720;
const ax3=sv('g',{},S3);
[.5,.6,.7,.8,.9].forEach(v=>{sv('line',{x1:px(.5),x2:px(.95),y1:py(v),y2:py(v),stroke:'#1E1E24','stroke-width':2},ax3);
  const a=sv('text',{x:px(.5)-14,y:py(v)+8,'text-anchor':'end','font-size':24,fill:'#6A6A72'},ax3); a.textContent=Math.round(v*100)+'%';
  sv('line',{y1:py(.5),y2:py(.95),x1:px(v),x2:px(v),stroke:'#1E1E24','stroke-width':2},ax3);
  const b=sv('text',{x:px(v),y:py(.5)+36,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax3); b.textContent=Math.round(v*100)+'%';});
const xl=sv('text',{x:px(.95),y:py(.5)+74,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax3); xl.textContent='WHAT THE MODEL SAID →';
const yl=sv('text',{x:px(.5)-10,y:py(.95)-22,'font-size':24,fill:'#8E8E96'},ax3); yl.textContent='↑ HOW OFTEN THE FAVORITE WON';
sv('line',{x1:px(.5),y1:py(.5),x2:px(.95),y2:py(.95),stroke:'#fff','stroke-width':3,'stroke-dasharray':'10 9'},ax3);
const CD=DATA.cal.map(([m,a,n])=>({m,a,n,c:sv('circle',{cx:px(m),cy:py(a),r:0,fill:'#0CF5F9',opacity:.92},S3)}));
const c65=div('abs','',E3,{left:'440px',top:'1060px'}); c65.innerHTML='<div class="osw" style="font-size:36px;background:#0E0E12;border:3px solid #0CF5F9;border-radius:16px;padding:10px 20px">SAID <span class="cy">65%</span> → WON <span class="cy">64%</span></div>';
const n14=div('abs','',E3,{left:'600px',top:'540px',textAlign:'right',width:'420px'}); n14.innerHTML='<div class="big cy" style="font-size:100px">14,413</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">NFL GAMES CHECKED</div>';
function rHon(t){hdrIn(3,t); set(ax3,{opacity:prog(t,CUT[3]+.1,CUT[3]+.4)});
  show([n14],t>=C(20)-.05); popIn(n14,t,C(20)-.05,{from:.6}); if(t>=C(20)-.05){n14.querySelector('.big').textContent=Math.round(14413*eOut(prog(t,C(20),C(20)+1.2))).toLocaleString('en-US');}
  CD.forEach((d,i)=>{const p=back(prog(t,C(20)+.4+i*.15,C(20)+.7+i*.15)); set(d.c,{r:Math.max(0,p)*(12+Math.sqrt(d.n)*.5)}); if(i==1&&t>=C(22))set(d.c,{fill:'#fff'});});
  show([c65],t>=C(22)); popIn(c65,t,C(22),{from:.5});
  E3.style.transform=`scale(${1+(t-CUT[3])*.0015})`;}
for(let i=0;i<5;i++)sfx(C(20)+.4+i*.15,'pop',.3); sfx(C(22),'ding',.3); sfx(C(23),'ding',.3);

/* ---------- 4 PLAYOFF TRIPS ---------- */
const E4=CH[4], S4=E4._svg; const AP=DATA.apps;
const bx0=110,bx1=980,by0=1260,bh=520, mx=Math.max(...AP);
const BAR4=AP.map((v,i)=>({v,i,r:sv('rect',{x:bx0+i*(bx1-bx0)/AP.length+2,width:(bx1-bx0)/AP.length-4,y:by0,height:0,rx:4,fill:'#3A3A44'},S4)}));
const ax4=sv('g',{},S4); [0,5,10,13,20,25].forEach(v=>{const tx=sv('text',{x:bx0+(v+.5)*(bx1-bx0)/AP.length,y:by0+40,'text-anchor':'middle','font-size':24,fill:v==13?'#0CF5F9':'#6A6A72'},ax4);tx.textContent=v;});
const xl4=sv('text',{x:bx1,y:by0+80,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax4); xl4.textContent='PLAYOFF TRIPS IN 30 SEASONS →';
const cnt4=div('abs','',E4,{left:'60px',top:'540px'}); cnt4.innerHTML='<div class="big cy" style="font-size:90px">0</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">SIMULATED HISTORIES</div>';
const avg4=div('abs','',E4,{left:'640px',top:'540px',textAlign:'right',width:'380px'}); avg4.innerHTML='<div class="osw mut" style="font-size:26px;letter-spacing:2px">AVERAGE</div><div class="big" style="font-size:110px">~15</div>';
const real4=sv('g',{},S4); const rx4=bx0+13.5*(bx1-bx0)/AP.length; sv('line',{x1:rx4,x2:rx4,y1:by0,y2:by0-bh-20,stroke:'#0CF5F9','stroke-width':6},real4);
const real4T=div('abs','',E4,{left:(rx4-290)+'px',top:'690px',width:'270px'}); real4T.innerHTML=`<div style="display:flex;align-items:center;gap:12px;justify-content:flex-end"><div style="text-align:right"><div class="osw mut" style="font-size:24px;letter-spacing:2px">REAL LIFE</div><div class="big cy" style="font-size:90px">13</div></div>${nlH('dal',80)}</div>`;
const st4=div('pill','PRETTY CLOSE',E4,{left:'360px',top:'1340px',background:'var(--cy)',color:'#050506',fontSize:'40px'});
function rApp(t){hdrIn(4,t); set(ax4,{opacity:prog(t,CUT[4]+.1,CUT[4]+.4)});
  const g=eOut(prog(t,C(25)-.3,C(26)+.3));
  BAR4.forEach(b=>{const h=b.v/mx*bh*g; set(b.r,{y:by0-h,height:h,fill:b.i==13&&t>=C(29)-.05?'#0CF5F9':'#3A3A44'});});
  fadeUp(cnt4,t,CUT[4]+.2); cnt4.querySelector('.big').textContent=Math.round(1e5*g).toLocaleString('en-US');
  const tf=WTs('fifteen',C(27),'15'); avg4.style.display=t>=tf-.05?'block':'none'; popIn(avg4,t,tf-.05,{from:1.3});
  real4.style.display=t>=C(29)-.05?'inline':'none'; set(real4,{opacity:prog(t,C(29)-.05,C(29)+.15)}); show([real4T],t>=C(29)-.05); popIn(real4T,t,C(29)-.05,{from:1.4});
  show([st4],t>=C(30)-.05); popIn(st4,t,C(30)-.05,{from:1.5});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
sfx(C(25)-.3,'riser',.35,1.5); sfx(WTs('fifteen',C(27),'15')-.05,'thump',.6); sfx(C(29)-.05,'thump',.75); sfx(C(30)-.05,'ding',.35);

/* ---------- 5 NFC TITLE GAMES ---------- */
const E5=CH[5], S5=E5._svg; const CG=DATA.ccg.slice(0,7).concat([DATA.ccg.slice(7).reduce((a,b)=>a+b,0)]);
const sx0=100,sw=110,sy0=1250,sh=520, smx=Math.max(...CG);
const BAR5=CG.map((v,i)=>{const g=sv('g',{},S5); const r=sv('rect',{x:sx0+i*sw+8,width:sw-16,y:sy0,height:0,rx:8,fill:'#3A3A44'},g);
  const lb=sv('text',{x:sx0+i*sw+sw/2,y:sy0+46,'text-anchor':'middle','font-size':34,fill:'#fff',style:'font-family:Anton'},g); lb.textContent=i==7?'7+':i;
  const pc=sv('text',{x:sx0+i*sw+sw/2,y:sy0-20,'text-anchor':'middle','font-size':30,fill:'#fff'},g); return {g,r,pc,v,i};});
const xl5=sv('text',{x:sx0+8*sw,y:sy0+90,'text-anchor':'end','font-size':24,fill:'#8E8E96'},S5); xl5.textContent='NFC TITLE GAMES IN 30 SEASONS →';
const avg5=div('abs','',E5,{left:'60px',top:'540px'}); avg5.innerHTML='<div class="osw mut" style="font-size:26px;letter-spacing:2px">AVERAGE HISTORY</div><div class="big" style="font-size:110px">3.2 <span class="osw mut" style="font-size:34px">TITLE GAMES</span></div>';
const z5=div('abs','',E5,{left:'590px',top:'540px',width:'430px',textAlign:'right'}); z5.innerHTML='<div class="osw mut" style="font-size:26px;letter-spacing:2px">ZERO TITLE GAMES</div><div class="big rd" style="font-size:110px">2.6%</div>';
const zl5=div('abs','',E5,{left:(sx0-10)+'px',top:'1020px',width:(sw+20)+'px',textAlign:'center'}); zl5.innerHTML=`${nlH('dal',100)}<div class="osw rd" style="font-size:22px;letter-spacing:1px">REAL LIFE ↓</div>`;
const m5=div('pill','ABOUT 1 IN 38',E5,{left:'640px',top:'720px',background:'var(--rd)',color:'#fff',fontSize:'46px'});
function rSB(t){hdrIn(5,t);
  BAR5.forEach(b=>{const g=eOut(prog(t,C(31)+.1+b.i*.08,C(31)+.6+b.i*.08)); const h=b.v/smx*sh*g; set(b.r,{y:sy0-h,height:h,fill:b.i==0&&t>=C(33)-.05?'#FF4B3E':(b.i==3&&t>=C(32)?'#5A5A66':'#3A3A44')}); set(b.pc,{y:sy0-h-16,opacity:g}); b.pc.textContent=(100*b.v/1e5).toFixed(b.v<1e4?1:0)+'%';});
  const t3=WTs('three',C(32),'3'); avg5.style.display=t>=t3-.05?'block':'none'; popIn(avg5,t,t3-.05,{from:1.2});
  show([z5,zl5],t>=C(33)-.05); popIn(z5,t,C(33)-.05,{from:1.3}); popIn(zl5,t,C(33)+.3,{from:.4,y:-40});
  show([m5],t>=C(34)-.05); popIn(m5,t,C(34)-.05,{from:1.6});
  E5.style.transform=`scale(${1+(t-CUT[5])*.0015})`;}
for(let i=0;i<8;i++)sfx(C(31)+.1+i*.08,'pop',.25); sfx(WTs('three',C(32),'3')-.05,'thump',.5); sfx(C(33)-.05,'thump',.8); sfx(C(33)+.3,'pop',.4); sfx(C(34)-.05,'thump',.75);

/* ---------- 6 WHERE IT BREAKS ---------- */
const E6=CH[6]; const PO=DATA.po;
const WALL=PO.map((g,i)=>{const d=div('abs','',E6,{left:(60+(i%6)*162)+'px',top:(540+Math.floor(i/6)*178)+'px',width:'150px',height:'166px',borderRadius:'16px',background:'#101014',boxSizing:'border-box',border:'4px solid #26262C',textAlign:'center'});
  d.innerHTML=`<div class="osw mut" style="font-size:20px;margin-top:6px">’${String(g.s).slice(2)} · ${Math.round(g.p*100)}%</div><img src="${NL(g.o)}" style="width:76px;height:76px;object-fit:contain"><div class="big" style="font-size:34px">${g.w?'W':'L'} ${g.sc}</div>`; return {d,g};});
const exp6=div('abs','',E6,{left:'60px',top:'1100px'}); exp6.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">SHOULD HAVE WON</div><div class="big cy" style="font-size:150px">9.5</div>';
const act6=div('abs','',E6,{left:'440px',top:'1100px'}); act6.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">ACTUALLY WON</div><div class="big rd" style="font-size:150px">5</div>';
const rec6=div('abs','',E6,{left:'720px',top:'1100px',width:'300px',textAlign:'right'}); rec6.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">PLAYOFF RECORD</div><div class="big" style="font-size:150px">5-13</div>';
function rBest(t){hdrIn(6,t);
  WALL.forEach((w,i)=>{const t0=C(37)-.2+i*.07; show([w.d],t>=t0); popIn(w.d,t,t0,{from:.4}); const col=t>=C(37)+1.6?(w.g.w?'#0CF5F9':'#FF4B3E'):'#26262C'; w.d.style.borderColor=col;});
  const tn=WTs('nine',C(38),'9'); exp6.style.display=t>=tn-.05?'block':'none'; popIn(exp6,t,tn-.05,{from:1.4});
  const tf=WTs('five',C(40),'5'); act6.style.display=t>=tf-.05?'block':'none'; popIn(act6,t,tf-.05,{from:1.5});
  show([rec6],t>=tf+.5); popIn(rec6,t,tf+.5,{from:1.4});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0015})`;}
for(let i=0;i<18;i++)sfx(C(37)-.2+i*.07,'click',.22); sfx(C(37)+1.6,'zap',.3,.5); sfx(WTs('nine',C(38),'9')-.05,'thump',.6); sfx(WTs('five',C(40),'5')-.05,'thump',.85); sfx(WTs('five',C(40),'5')+.5,'pop',.4);

/* ---------- 7 DIVISIONAL ---------- */
const E7=CH[7]; const DV=PO.filter(g=>g.div);
const DC=DV.map((g,i)=>{const r=i<4?0:1, c=i<4?i:i-4, x0=r?60+120:60; const d=div('abs','',E7,{left:(x0+c*240)+'px',top:(540+r*250)+'px',width:'228px',height:'236px',borderRadius:'18px',background:'#101014',boxSizing:'border-box',border:'4px solid #FF4B3E',textAlign:'center'});
  d.innerHTML=`<div class="osw mut" style="font-size:24px;margin-top:8px">${g.s} · ${Math.round(g.p*100)}%</div><img src="${NL(g.o)}" style="width:104px;height:104px;object-fit:contain"><div class="big" style="font-size:44px"><span class="rd">L</span> ${g.sc}</div>`; return d;});
const s07=div('abs big rd','0-7',E7,{left:'380px',top:'1000px',fontSize:'180px',textShadow:'0 0 40px rgba(255,75,62,.5)'});
const e7=div('abs','',E7,{left:'60px',top:'1215px'}); e7.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">MODEL EXPECTED</div><div class="big cy" style="font-size:100px">3.3 WINS</div>';
const p7=div('abs','',E7,{left:'620px',top:'1215px',width:'400px',textAlign:'right'}); p7.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">CHANCE OF 0-7</div><div class="big" style="font-size:100px">~1%</div>';
// 2023 wild card
const card7=div('card','',E7,{left:'60px',top:'640px',width:'960px',background:'#101014',border:'4px solid #FF4B3E'});
card7.innerHTML=`<div class="osw mut" style="font-size:28px;letter-spacing:2px">2023 · WILD CARD ROUND · AT DALLAS</div><div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px">${nlH('gb',150)}<div class="big"><span class="rd" style="font-size:140px">48</span><span class="mut" style="font-size:80px"> – </span><span style="font-size:140px">32</span></div>${nlH('dal',150)}</div>`;
const r7=div('pill','12-5 · NO. 2 SEED',E7,{left:'60px',top:'540px',background:NAVY,color:'#fff',fontSize:'38px',border:`3px solid ${SIL}`});
const n7=div('pill','NEVER EVEN GOT THERE',E7,{left:'560px',top:'540px',background:'#fff',color:'#050506',fontSize:'34px'});
const f7=div('pill','72% FAVORITES vs A 7 SEED',E7,{left:'170px',top:'1010px',background:'var(--rd)',color:'#fff',fontSize:'42px'});
const g48=div('abs big rd','GAVE UP 48.',E7,{left:'60px',top:'1130px',fontSize:'150px'});
function rCurse(t){
  const a=t<C(I23)-.05; E7._h.style.display=a?'block':'none'; if(a)hdrIn(7,t);
  DC.forEach((d,i)=>{show([d],a&&t>=C(41)+.1+i*.1); popIn(d,t,C(41)+.1+i*.1,{from:.4});});
  show([s07],a&&t>=C(42)-.05); popIn(s07,t,C(42)-.05,{from:2}); s07.style.transform+=' rotate(-8deg)';
  const t3=WTs('three',C(43),'3'); show([e7],a&&t>=t3-.05); popIn(e7,t,t3-.05,{from:1.3});
  show([p7],a&&t>=C(45)-.05); popIn(p7,t,C(45)-.05,{from:1.1});
  show([card7],!a); popIn(card7,t,C(I23)-.05,{from:.7});
  show([r7],!a&&t>=C(I23)+.3); popIn(r7,t,C(I23)+.3,{from:1.3});
  const tn=WTs('never',C(I23),'never'); show([n7],!a&&t>=tn-.05); popIn(n7,t,tn-.05,{from:1.3});
  const tt=WTs('twelve',C(I23),'12'); r7.style.display=!a&&t>=Math.min(C(I23)+.3,tt)?'block':'none';
  const t72=WTs('seventy',C(I23),'72'); show([f7],!a&&t>=t72-.05); popIn(f7,t,t72-.05,{from:1.4});
  const t48=WTs('forty',C(I23),'48'); show([g48],!a&&t>=t48-.05); popIn(g48,t,t48-.05,{from:1.15});
  E7.style.transform=`scale(${1+(t-CUT[7])*.0015})`;}
for(let i=0;i<7;i++)sfx(C(41)+.1+i*.1,'pop',.3); sfx(C(42)-.05,'thump',.9); sfx(WTs('three',C(43),'3')-.05,'pop',.5); sfx(C(45)-.05,'ding',.4);
sfx(C(I23)-.05,'whoosh',.5); sfx(WTs('seventy',C(I23),'72')-.05,'thump',.6); sfx(WTs('forty',C(I23),'48')-.05,'thump',.9);

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const v1=div('abs big','',E8,{left:'60px',top:'540px',fontSize:'96px'}); v1.innerHTML='<span class="mut">JUST BAD?</span>';
const v1x=div('abs big rd','NO.',E8,{left:'60px',top:'650px',fontSize:'150px'});
const v2=div('abs big','',E8,{left:'60px',top:'840px',fontSize:'104px'}); v2.innerHTML='CLOSE.<br>THEN <span class="cy">GONE.</span>';
const dk8=div('abs','',E8,{left:'560px',top:'740px',width:'480px',height:'690px',background:'url(img/st_dak.png) center bottom/contain no-repeat'});
const poll=div('card','',E8,{left:'140px',top:'560px',width:'800px',background:'#0E0E12',border:'4px solid #26262C',padding:'40px 40px'});
poll.innerHTML=`<div style="text-align:center">${nlH('dal',170)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:10px">YOUR CALL · COMMENT BELOW</div>`+['BAD LUCK','JUST THE COWBOYS'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:66px;text-align:center;border-radius:60px;padding:12px 0;${i===0?'background:var(--cy);color:#050506':'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
const NB=CUES.length;
function rVer(t){hdrIn(8,t);
  const a=t<C(NB-2)-.05; show([v1,v1x,v2,dk8],a); E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v1,t,CX8-.05); const tj=WTs('just',CX8,'just'); v1x.style.display=t>=tj+.3?'block':'none'; popIn(v1x,t,tj+.3,{from:1.5});
    const tc=C(NB-4); v2.style.display=t>=tc-.05?'block':'none'; popIn(v2,t,tc-.05,{from:1.2});
    const p=eOut(prog(t,CX8+.2,CX8+.6)); dk8.style.transform=`translateX(${(1-p)*500}px)`;}
  show([poll],!a); if(!a){popIn(poll,t,C(NB-2)-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,[WT('Bad',C(NB-2)),WTs('just',C(NB-2),'just')][i]-.05,{from:.4})); poll.style.transform+=` scale(${1+(t-C(NB-2))*.006})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0015})`;}
sfx(CX8+.2,'whoosh',.3); sfx(WTs('just',CX8,'just')+.3,'thump',.7); sfx(C(NB-4)-.05,'thump',.8); sfx(C(NB-2)-.05,'whoosh',.5); sfx(WT('Bad',C(NB-2))-.05,'pop',.5); sfx(WTs('just',C(NB-2),'just')-.05,'pop',.5); sfx(C(NB-1),'sparkle',.4);
