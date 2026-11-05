/* ===================== chapters (Andrew Luck · the career he walked away from) ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nfl-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const CB='#002C5F';
const K={sim:CT('I simulated the rest'), twelve:CT('In 1 of every 12,'), show:CT('Let me show'),
  c1:CT('Luck went first'), six:CT('In 6 seasons'), pro:CT('4 Pro'), worn:CT('worn down'),
  c2:CT('So I found'), names:CT('Stafford'), cam:CT('Cam Newton'), every:CT('Every simulated'),
  c3:CT('Is it honest'), pred:CT('I predicted'), four:CT('14 landed'), exact:CT('Exactly what'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c4:CT('So I ran his'), typ:CT('The typical'), half:CT('He clears'),
  c5:CT('the ceiling is wild'), pey:CT('In 1 of every 12 careers'), brady:CT('In about 1 in 27'),
  c6:CT('Meanwhile'), eleven:CT('started 11'),
  c7:CT('So the most likely'), best:CT('In his best'), walk:CT('Instead, he walked'), poll:CT('Was retiring')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.cta-.05,K.c4-.05,K.c5-.05,K.c6-.05,K.c7-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','The career he left.','Indianapolis Colts · 2012–2018'],
 ['02','28 real careers.','QBs since 1999 who looked most like him at 28'],
 ['03','Is it honest?','predicting each of the 28 from the other 27'],
 null,
 ['04','100,000 careers.','career passing yards · every simulation'],
 ['05','The ceiling.','the all-time passing list'],
 ['06','Meanwhile in Indy.','Colts starting QBs after Luck · 2019–2025'],
 ['07','The verdict.','']];
const chs=document.getElementById('chs');
const prg=document.getElementById('prog'); for(let i=0;i<7;i++){const x=document.createElement('i');prg.appendChild(x);}
const CH=[]; for(let i=0;i<CUT.length;i++){const d=div('ch','',chs);CH.push(d);
  if(HDR[i]){const h=div('hdr',`<div class="n">${HDR[i][0]}</div><div class="t">${HDR[i][1]}</div><div class="s">${HDR[i][2]}</div>`,d);d._h=h;}
  const s=sv('svg',{width:1080,height:1920,viewBox:'0 0 1080 1920',style:'position:absolute;left:0;top:0'});d.appendChild(s);d._svg=s;}
CUT.slice(1).forEach(c=>{sfx(c-.18,'whip',.55);});
const hdrIn=(k,t)=>fadeUp(CH[k]._h,t,CUT[k]+.05,.3);
const face=(img,sz,ring)=>`<span style="display:inline-block;width:${sz}px;height:${sz}px;border-radius:50%;overflow:hidden;border:5px solid ${ring};background:#1A1A20;vertical-align:middle"><img src="img/${img}" style="width:100%;height:100%;object-fit:cover;object-position:50% 20%"></span>`;
function football(parent,x,y,s=1,fill='#7A4A22'){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  const b=sv('ellipse',{rx:38,ry:22,fill,stroke:'#050506','stroke-width':3},g);
  sv('line',{x1:-14,x2:14,y1:0,y2:0,stroke:'#fff','stroke-width':3},g);
  for(let i=-2;i<=2;i++)sv('line',{x1:i*6,x2:i*6,y1:-6,y2:6,stroke:'#fff','stroke-width':2.5},g);
  g._b=b; return g;}

/* ---------- 0 HOOK ---------- */
const H=CH[0], Hs=H._svg;
const hCirc=div('abs','',H,{left:'330px',top:'760px',width:'640px',height:'640px',borderRadius:'50%',background:CB,boxShadow:'inset 0 0 0 12px #fff'});
const hWm=div('abs','',H,{left:'440px',top:'870px',width:'420px',height:'420px',background:`url(${NL('ind')}) center/contain no-repeat`,opacity:.16});
const hSt=div('abs','',H,{left:'350px',top:'690px',width:'600px',height:'720px',background:'url(img/st_luck.png) center bottom/contain no-repeat'});
const h1=div('abs big','ANDREW LUCK:<br><span class="cy">RETIRED AT 29.</span>',H,{left:'54px',top:'292px',fontSize:'110px'});
const h1s=div('abs osw','two weeks before the <span class="cy">2019 season</span>',H,{left:'58px',top:'540px',fontSize:'40px'});
const hInd=div('abs','',H,{left:'50px',top:'790px'}); hInd.innerHTML=nlH('ind',180);
const hSt3=div('abs','',H,{left:'60px',top:'1030px'}); hSt3.innerHTML='<div class="big" style="font-size:86px;line-height:1">#1</div><div class="osw" style="font-size:26px;letter-spacing:2px">OVERALL PICK · 2012</div>';
const hB=div('abs big','I SIMULATED<br>THE REST OF IT<br><span class="cy">100,000 TIMES.</span>',H,{left:'54px',top:'292px',fontSize:'112px'});
const hC=div('abs big cy','1 IN 12',H,{left:'54px',top:'290px',fontSize:'210px'});
const hCs=div('abs osw','of careers: he passes <span class="cy">Peyton Manning</span>',H,{left:'60px',top:'520px',fontSize:'42px'});
const fbG=sv('g',{},Hs); const FB=[]; for(let i=0;i<12;i++){FB.push(football(fbG,140+(i%6)*160,660+Math.floor(i/6)*90,1.25));}
const hPm=div('abs','',H,{left:'40px',top:'830px',width:'480px',height:'600px',background:'url(img/st_pm_colts.png) center bottom/contain no-repeat'});
const hPmL=div('pill','THE LEGEND HE REPLACED',H,{left:'60px',top:'1340px',background:'#fff',color:'#050506',fontSize:'34px'});
const hLk=div('abs','',H,{left:'560px',top:'830px',width:'480px',height:'600px',background:'url(img/st_luck.png) center bottom/contain no-repeat'});
function rHook(t){
  const a=t<K.sim-.05; show([h1,h1s,hInd,hSt3],a); show([hCirc,hWm,hSt],t<K.twelve-.05);
  {const pc=back(prog(t,.02,.42)); hCirc.style.transform=`scale(${Math.max(0,pc)})`; hWm.style.transform=hCirc.style.transform; hWm.style.opacity=.16*prog(t,.2,.5);
    const ps=eOut(prog(t,.12,.6)); hSt.style.transform=`translateY(${(1-ps)*420}px) scale(${1+t*.008})`; hSt.style.opacity=ps>0?1:0;}
  if(a){fadeUp(h1,t,.05,.3,40); fadeUp(h1s,t,WTs('two',0)-.05,.3); popIn(hInd,t,.6,{from:.3}); popIn(hSt3,t,1.6,{from:1.4});}
  const b=t>=K.sim-.05&&t<K.twelve-.05; show([hB],b); if(b)fadeUp(hB,t,K.sim-.05,.3);
  const c=t>=K.twelve-.05; show([hC,hCs,hPm,hLk],c); if(!c)hPmL.style.display='none'; fbG.style.display=c?'inline':'none';
  if(c){popIn(hC,t,K.twelve-.05,{from:1.2}); fadeUp(hCs,t,K.twelve+.3);
    FB.forEach((f,i)=>{const p=back(prog(t,K.twelve+.1+i*.05,K.twelve+.4+i*.05)); const hit=i==11&&t>=WTs('peyton',K.twelve); set(f,{transform:`translate(${140+(i%6)*160} ${660+Math.floor(i/6)*90}) scale(${1.25*Math.max(0,p)*(hit?1.15:1)})`}); set(f._b,{fill:hit?'#0CF5F9':(t>=WTs('peyton',K.twelve)?'#3A3A44':'#7A4A22')});});
    const tp=WTs('peyton',K.twelve); {const p=eOut(prog(t,tp-.1,tp+.3)); hPm.style.transform=`translateX(${-(1-p)*520}px)`; const q=eOut(prog(t,K.twelve,K.twelve+.4)); hLk.style.transform=`translateX(${(1-q)*520}px)`;}
    show([hPmL],c&&t>=WTs('legend',K.twelve)-.05); popIn(hPmL,t,WTs('legend',K.twelve)-.05,{from:1.3});
    H.style.transform=`scale(${1+Math.max(0,t-K.show)*.005})`;}
}
sfx(.05,'whoosh',.5); sfx(.25,'thump',.6); sfx(.6,'pop',.45); sfx(1.6,'thump',.55);
sfx(K.sim-.05,'whoosh',.5); sfx(K.twelve-.05,'thump',.75); for(let i=0;i<12;i++)sfx(K.twelve+.1+i*.05,'click',.18); sfx(WTs('peyton',K.twelve),'ding',.45); sfx(WTs('legend',K.twelve)-.05,'pop',.4); sfx(K.show,'riser',.25,1.2);

/* ---------- 1 CAREER ---------- */
const E1=CH[1], S1=E1._svg;
const lk1=div('abs','',E1,{left:'60px',top:'520px'}); lk1.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${face('andrew-luck.png',100,'#fff')}<div><div class="big" style="font-size:56px">ANDREW LUCK · QB</div><div class="osw mut" style="font-size:26px">STANFORD · #1 OVERALL, 2012</div></div></div>`;
const chip=(txt,sub,x)=>{const d=div('card','',E1,{left:x+'px',top:'660px',width:'300px',background:'#101014',border:'4px solid #0CF5F9',textAlign:'center'}); d.innerHTML=`<div class="big cy" style="font-size:76px">${txt}</div><div class="osw" style="font-size:24px">${sub}</div>`; return d;};
const cY=chip('23,671','PASSING YARDS',60), cT=chip('171','TOUCHDOWNS',390), cP=chip('4','PRO BOWLS',720);
const yrs=[2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
const tx0=105,tw=68,ty0=1250,th=260,ymx=5000;
const BAR1=yrs.map((y,i)=>{const s=DATA.seasons.find(x=>x[0]==y); const fut=y>=2019; const out=s&&s[1]==0;
  const r=sv('rect',{x:tx0+i*tw+6,width:tw-12,y:ty0,height:0,rx:6,fill:fut?'none':'#0CF5F9',stroke:fut?'#3A3A44':'none','stroke-width':3,'stroke-dasharray':fut?'8 7':''},S1);
  const l=sv('text',{x:tx0+i*tw+tw/2,y:ty0+36,'text-anchor':'middle','font-size':22,fill:'#6A6A72'},S1); l.textContent="’"+String(y).slice(2);
  const v=sv('text',{x:tx0+i*tw+tw/2,y:ty0-12,'text-anchor':'middle','font-size':out?20:22,fill:fut?'#55555F':out?'#FF4B3E':'#fff'},S1); v.textContent=fut?'?':out?'OUT':(s[1]/1000).toFixed(1)+'K'; return {r,v,s,i,fut,out};});
const stamp1=div('abs big rd','RETIRED<br>AUG 2019',E1,{left:'560px',top:'930px',fontSize:'64px',border:'6px solid #FF4B3E',padding:'6px 18px',borderRadius:'12px',background:'rgba(5,5,6,.88)',textAlign:'center'});
function rCar(t){hdrIn(1,t); fadeUp(lk1,t,CUT[1]+.15);
  [[cY,WTs('twentythree',K.six,'twenty')],[cT,WTs('one',WTs('yards',K.six))],[cP,K.pro]].forEach(([d,t0])=>{show([d],t>=t0-.05); popIn(d,t,t0-.05,{from:1.3});});
  BAR1.forEach(b=>{if(!b.fut){const g=eOut(prog(t,K.six+.2+b.i*.12,K.six+.6+b.i*.12)); const h=(b.out?0:b.s[1]/ymx*th)*g; set(b.r,{y:ty0-h,height:h}); set(b.v,{y:ty0-h-12,opacity:g});}
    else{const on=t>=K.worn+.6+(b.i-7)*.07; const h=th*.75; set(b.r,{y:ty0-h,height:h,opacity:on?1:0}); set(b.v,{y:ty0-h-12,opacity:on?1:0});}});
  show([stamp1],t>=WTs('walked',K.worn)-.05); popIn(stamp1,t,WTs('walked',K.worn)-.05,{from:1.5}); stamp1.style.transform+=' rotate(-5deg)';
  E1.style.transform=`scale(${1+(t-CUT[1])*.0015})`;}
for(let i=0;i<7;i++)sfx(K.six+.2+i*.12,'pop',.25); sfx(K.pro-.05,'pop',.45); sfx(WTs('walked',K.worn)-.05,'thump',.85);

/* ---------- 2 COMPS ---------- */
const E2=CH[2];
const FACE={'Matthew Stafford':'matthew-stafford.png','Matt Ryan':'matt-ryan.jpg','Aaron Rodgers':'aaron-rodgers.png','Drew Brees':'drew-brees.png','Tom Brady':'tom-brady.jpg','Cam Newton':'cam-newton.png','Sam Bradford':'sam-bradford.jpg'};
const STAR=['Matthew Stafford','Matt Ryan','Aaron Rodgers','Drew Brees','Tom Brady'], BUST=['Cam Newton','Sam Bradford'];
const STW=['stafford','matt','rodgers','brees','brady'], BUW=['cam','sam'];
const CMP=DATA.comps.map(([n,ab],i)=>{const d=div('abs','',E2,{left:(60+(i%4)*242)+'px',top:(540+Math.floor(i/4)*110)+'px',width:'230px',height:'100px',borderRadius:'14px',background:'#101014',boxSizing:'border-box',border:'3px solid #26262C',display:'flex',alignItems:'center',gap:'10px',padding:'0 10px'});
  d.innerHTML=(FACE[n]?face(FACE[n],66,'#26262C'):nlH(ab,58))+`<div class="big" style="font-size:30px;white-space:nowrap">${n.split(' ').slice(-1)[0].toUpperCase()}</div>`; d._n=n; return d;});
const pathL=div('abs','',E2,{left:'60px',top:'1320px',width:'960px'}); pathL.innerHTML='<div class="osw" style="font-size:30px;text-align:center">EACH SIM = ONE OF THESE <span class="cy">REAL CAREER PATHS</span>,<br>ADJUSTED TO HIS LEVEL · INJURIES INCLUDED</div>';
function rCmp(t){hdrIn(2,t);
  CMP.forEach((d,i)=>{const t0=CUT[2]+.2+i*.05; show([d],t>=t0); popIn(d,t,t0,{from:.5});
    const st=STAR.indexOf(d._n), bs=BUST.indexOf(d._n);
    const on=(st>=0&&t>=WTs(STW[st],K.names)-.05)||(bs>=0&&t>=WTs(BUW[bs],K.cam)-.05);
    d.style.borderColor=on?(st>=0?'#0CF5F9':'#FF4B3E'):'#26262C'; d.style.opacity=1;
    if(t>=K.every){const R=rng(Math.floor((t-K.every)*3)); d.style.opacity=R()<.3?1:.35;}});
  show([pathL],t>=K.every); fadeUp(pathL,t,K.every);
  E2.style.transform=`scale(${1+(t-CUT[2])*.001})`;}
for(let i=0;i<28;i++)sfx(CUT[2]+.2+i*.05,'click',.12); STW.forEach(w=>sfx(WTs(w,K.names)-.05,'pop',.35)); BUW.forEach(w=>sfx(WTs(w,K.cam)-.05,'thump',.45)); sfx(K.every,'whoosh',.35);

/* ---------- 3 HONEST ---------- */
const E3=CH[3], S3=E3._svg;
const hx0=110,hx1=970,hy=1000; const hx=p=>hx0+p*(hx1-hx0);
sv('rect',{x:hx(.25),y:hy-150,width:hx(.75)-hx(.25),height:300,rx:14,fill:'rgba(12,245,249,.10)',stroke:'#0CF5F9','stroke-width':3,'stroke-dasharray':'10 8'},S3);
sv('line',{x1:hx0,x2:hx1,y1:hy,y2:hy,stroke:'#3A3A44','stroke-width':4},S3);
[['0%',0],['25%',.25],['50%',.5],['75%',.75],['100%',1]].forEach(([s,p])=>{const a=sv('text',{x:hx(p),y:hy+200,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},S3);a.textContent=s;});
const mh=sv('text',{x:hx(.5),y:hy-170,'text-anchor':'middle','font-size':28,fill:'#0CF5F9'},S3); mh.textContent='MIDDLE HALF OF THE FORECAST';
const xl3=sv('text',{x:hx1,y:hy+240,'text-anchor':'end','font-size':24,fill:'#8E8E96'},S3); xl3.textContent='WHERE THE REAL CAREER LANDED →';
const DT=DATA.pct.map((p,i)=>{const inn=p>.25&&p<.75; const c=sv('circle',{cx:hx(Math.min(.99,Math.max(.01,p))),cy:hy+((i%6)-2.5)*44,r:0,fill:inn?'#0CF5F9':'#8E8E96',stroke:'#050506','stroke-width':3},S3); return {c,inn};});
const n3=div('abs','',E3,{left:'60px',top:'540px'}); n3.innerHTML='<div class="big cy" style="font-size:120px">14 <span class="mut" style="font-size:60px">OF 28</span></div><div class="osw mut" style="font-size:26px;letter-spacing:2px">LANDED IN THE MIDDLE HALF</div>';
const ex3=div('pill','EXPECTED: 14 ✓',E3,{left:'640px',top:'1300px',background:'#fff',color:'#050506',fontSize:'40px'});
function rHon(t){hdrIn(3,t);
  DT.forEach((d,i)=>{const p=back(prog(t,K.pred+.3+i*.06,K.pred+.6+i*.06)); set(d.c,{r:Math.max(0,p)*16, opacity:t>=K.four&&!d.inn?.35:1});});
  show([n3],t>=K.four-.05); popIn(n3,t,K.four-.05,{from:1.3});
  show([ex3],t>=K.exact-.05); popIn(ex3,t,K.exact-.05,{from:1.4});
  E3.style.transform=`scale(${1+(t-CUT[3])*.0015})`;}
for(let i=0;i<28;i++)sfx(K.pred+.3+i*.06,'click',.12); sfx(K.four-.05,'thump',.7); sfx(K.exact-.05,'ding',.4);

/* ---------- CTA (follow) ---------- */
const ECT=CH[4]; const tapT=K.fol+.3;
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
function rCta(t){const t0=CUT[4]; popIn(ph,t,t0+.05,{from:.85});
  const sc=prog(t,t0+.2,tapT-.25); const off=-Math.sin(sc*Math.PI)*300; scr.style.transform=`translateY(${off}px)`;
  const bx=200+12+19+112, by=290+12+291+20;
  const fp=eOut(prog(t,K.fol-.6,tapT)); const fx=lerp(860,bx,fp), fy=lerp(1250,by,fp)+(t>=tapT&&t<tapT+.15?10:0);
  fing.style.left=(fx-35)+'px'; fing.style.top=(fy-10)+'px'; fing.style.display=t>=K.fol-.6?'block':'none';
  fbtn.style.display=t>=tapT+.08?'flex':'none';
  ripple.style.display=t>=tapT&&t<tapT+.5?'block':'none'; const rp=prog(t,tapT,tapT+.5); ripple.style.left=(bx-60)+'px'; ripple.style.top=(by-60)+'px'; ripple.style.transform=`scale(${.4+rp*1.4})`; ripple.style.opacity=1-rp;
  show([ctaT],t>=tapT); popIn(ctaT,t,tapT,{from:1.3});
  ECT.style.transform=`scale(${1+(t-t0)*.004})`;}
sfx(CUT[4]+.05,'whoosh',.45); sfx(tapT,'click',.7); sfx(tapT+.05,'ding',.45); sfx(tapT+.1,'sparkle',.35);

/* ---------- 4/5 HISTOGRAM ---------- */
function mkHist(S){const HB=DATA.hist, mx=Math.max(...HB), x0=100,x1=990,y0=1200,h=440, bw=(x1-x0)/HB.length; const X=v=>x0+(v-20000)/4000*bw;
  const B=HB.map((v,i)=>({v,i,r:sv('rect',{x:x0+i*bw+2,width:bw-4,y:y0,height:0,rx:4,fill:'#3A3A44'},S)}));
  const ax=sv('g',{},S); [20000,40000,60000,80000,100000].forEach(k=>{const a=sv('text',{x:X(k),y:y0+38,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax);a.textContent=k/1000+'K';});
  const xl=sv('text',{x:x1,y:y0+76,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax); xl.textContent='CAREER PASSING YARDS →';
  return {B,x0,bw,y0,h,mx,X,draw(p,col){B.forEach(b=>{const hh=b.v/mx*h*p; set(b.r,{y:y0-hh,height:hh,fill:col(b.i)});});}};}
const E5=CH[5], S5=E5._svg; const H5=mkHist(S5);
const cnt5=div('abs','',E5,{left:'60px',top:'540px'}); cnt5.innerHTML='<div class="big" style="font-size:80px">0</div><div class="osw mut" style="font-size:24px;letter-spacing:2px">SIMULATED CAREERS</div>';
const typ5=div('abs','',E5,{left:'470px',top:'540px',width:'550px',textAlign:'right'}); typ5.innerHTML='<div class="osw mut" style="font-size:24px;letter-spacing:2px">TYPICAL FINISH</div><div class="big cy" style="font-size:84px">~50,000 YDS</div><div class="big" style="font-size:52px">~350 TD</div>';
const mline=sv('line',{x1:H5.X(DATA.med),x2:H5.X(DATA.med),y1:H5.y0,y2:H5.y0-H5.h-30,stroke:'#0CF5F9','stroke-width':5,'stroke-dasharray':'12 8'},S5);
const k5=div('pill','50,000+ YARDS: ABOUT HALF',E5,{left:'230px',top:'1320px',background:'var(--cy)',color:'#050506',fontSize:'40px'});
function rRun(t){hdrIn(5,t);
  const g=eOut(prog(t,K.c4+.3,K.typ)); H5.draw(g,i=>t>=K.half-.05&&20000+i*4000>=50000?'#0CF5F9':'#3A3A44'); cnt5.querySelector('.big').textContent=Math.round(1e5*g).toLocaleString('en-US'); fadeUp(cnt5,t,CUT[5]+.2);
  show([typ5],t>=K.typ+.3); popIn(typ5,t,K.typ+.3,{from:1.2}); mline.style.display=t>=K.typ+.3?'inline':'none';
  show([k5],t>=K.half-.05); popIn(k5,t,K.half-.05,{from:1.3});
  E5.style.transform=`scale(${1+(t-CUT[5])*.0015})`;}
sfx(K.c4+.3,'riser',.3,1.6); for(let i=0;i<14;i++)sfx(K.c4+.3+i*.12,'click',.12); sfx(K.typ+.3,'thump',.7); sfx(K.half-.05,'ding',.35);

const E6=CH[6], S6=E6._svg; const H6=mkHist(S6);
const MK=[['PEYTON MANNING',71940,'img/st_pm_colts.png','1 IN 12',K.pey],['TOM BRADY',89214,'img/st_brady_ne_full.png','1 IN 27',K.brady]].map(([n,v,img,p,t0],i)=>{
  const x=H6.X(v); const ln=sv('line',{x1:x,x2:x,y1:H6.y0,y2:H6.y0-H6.h-20,stroke:i?'#fff':'#0CF5F9','stroke-width':5},S6);
  const lab=div('abs','',E6,{left:(i?560:60)+'px',top:'500px',width:'470px',height:'260px'});
  lab.innerHTML=`<div style="position:absolute;left:0;top:0;width:200px;height:260px;background:url(${img}) center bottom/contain no-repeat"></div><div style="position:absolute;left:210px;top:30px"><div class="osw" style="font-size:30px;line-height:1.1">PASSES<br>${n}</div><div class="osw mut" style="font-size:24px">${v.toLocaleString('en-US')} YDS</div><div class="big ${i?'':'cy'}" style="font-size:96px">${p}</div></div>`;
  return {ln,lab,t0,i,v};});
function rCeil(t){hdrIn(6,t);
  H6.draw(eOut(prog(t,CUT[6]+.1,CUT[6]+.6)),i=>{const v=20000+i*4000; return t>=K.brady-.05&&v>=88000?'#fff':t>=K.pey-.05&&v>=72000?'#0CF5F9':'#3A3A44';});
  MK.forEach(m=>{const on=t>=m.t0-.05; m.ln.style.display=on?'inline':'none'; show([m.lab],on); popIn(m.lab,t,m.t0-.05,{from:1.2});});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0012})`;}
MK.forEach((m,i)=>sfx(m.t0-.05,'thump',.75)); sfx(K.pey+.3,'sparkle',.35);

/* ---------- 6 COLTS ---------- */
const E7=CH[7];
const big7=div('abs','',E7,{left:'60px',top:'520px'}); big7.innerHTML=`<div style="display:flex;align-items:center;gap:20px">${nlH('ind',130)}<div><div class="big cy" style="font-size:150px;line-height:1">0</div><div class="osw" style="font-size:28px;letter-spacing:2px">DIFFERENT STARTING QBs</div></div></div>`;
const QB=DATA.colts.map((n,i)=>{const d=div('abs','',E7,{left:(60+(i%2)*490)+'px',top:(760+Math.floor(i/2)*96)+'px',width:'470px',height:'84px',borderRadius:'14px',background:'#101014',border:`3px solid ${CB}`,boxSizing:'border-box',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'});
  d.innerHTML=`<span class="big mut" style="font-size:34px;min-width:52px;display:inline-block">${i+1}</span><span class="big" style="font-size:38px;white-space:nowrap">${n.toUpperCase()}</span>`; return d;});
function rColts(t){hdrIn(7,t); fadeUp(big7,t,CUT[7]+.1);
  const t0=K.c6+.3, dt=Math.max(.12,(K.eleven+.4-t0)/11);
  let n=0; QB.forEach((d,i)=>{const ti=t0+i*dt; show([d],t>=ti); popIn(d,t,ti,{from:.5}); if(t>=ti)n=i+1;});
  big7.querySelector('.cy').textContent=n;
  E7.style.transform=`scale(${1+(t-CUT[7])*.002})`;}
for(let i=0;i<11;i++)sfx(K.c6+.3+i*Math.max(.12,(K.eleven+.4-K.c6-.3)/11),'click',.3); sfx(K.eleven+.4,'thump',.7);

/* ---------- 7 VERDICT ---------- */
const E8=CH[8];
const v1=div('abs','',E8,{left:'60px',top:'540px',width:'960px'}); v1.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">MOST LIKELY</div><div class="big" style="font-size:90px">50,000-YARD PASSER.</div>';
const v2=div('abs','',E8,{left:'60px',top:'760px',width:'960px'}); v2.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">BEST 1 IN 12</div><div class="big cy" style="font-size:96px">ALL-TIME GREAT.</div>';
const v3=div('abs big rd','WALKED AWAY<br>AT 29.',E8,{left:'60px',top:'980px',fontSize:'110px'});
const lk8=div('abs','',E8,{left:'620px',top:'930px',width:'420px',height:'500px',background:'url(img/st_luck.png) center bottom/contain no-repeat'});
const poll=div('card','',E8,{left:'140px',top:'560px',width:'800px',background:'#0E0E12',border:'4px solid #26262C',padding:'40px 40px'});
poll.innerHTML=`<div style="text-align:center">${nlH('ind',150)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:10px">YOUR CALL · COMMENT BELOW</div>`+['RIGHT CALL','WRONG CALL'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:70px;text-align:center;border-radius:60px;padding:12px 0;${i===0?'background:var(--cy);color:#050506':'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t);
  const a=t<K.poll-.05; show([v1,v2,v3,lk8],a); E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v1,t,K.c7); show([v2],t>=K.best-.05); popIn(v2,t,K.best-.05,{from:1.2}); show([v3],t>=K.walk-.05); popIn(v3,t,K.walk-.05,{from:1.15});
    {const p=eOut(prog(t,K.c7+.2,K.c7+.6)); lk8.style.transform=`translateX(${(1-p)*480}px)`;}}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,K.poll+.25+i*.35,{from:.4})); poll.style.transform+=` scale(${1+(t-K.poll)*.006})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
sfx(K.c7,'whoosh',.3); sfx(K.best-.05,'thump',.6); sfx(K.walk-.05,'thump',.85); sfx(K.poll-.05,'whoosh',.5); sfx(K.poll+.25,'pop',.5); sfx(K.poll+.6,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rCar,rCmp,rHon,rCta,rRun,rCeil,rColts,rVer];
