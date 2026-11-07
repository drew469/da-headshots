/* ===================== chapters (Antonio Brown · best behavior) — premium v2 ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nfl-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const GOLD='#FFB612';
const OR='#FF3C00';
const K={sim:CT('I simulated his career'),
  c1:CT('In 2013'), led:CT('he led the NFL'), qb:CT('catching passes'),
  c2:CT('Then the suspensions'), missed:CT('He missed most'), fin:CT('He finished'),
  c3:CT('So I found'), names:CT('Mike Evans'), faded:CT('But also'), every:CT('Every simulated'),
  c4:CT('Is it honest'), pred:CT('I predicted'), seventeen:CT('29 landed'), target:CT('Exactly what'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c6:CT('The typical'), beats:CT('He beats'),
  c7:CT('the ceiling is wild'), cj:CT('In 1 of every 3'), club:CT('In 1 of every 7'), rice:CT('Jerry Rice?'),
  c8:CT('So the talent'), inst:CT('Instead'), poll:CT('Would a fully')};
K.on=WTs('on',WTs('stayed',.2)); K.fully=WTs('fully',K.sim);
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.cta-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','The 2013 season.','Cleveland Browns · age 22'],
 ['02','Then the suspensions.','2014–2022'],
 ['03','58 real careers.','WRs since 1999 who looked most like him at 22'],
 ['04','Is it honest?','predicting each of the 58 from the other 57'],
 null,
 ['05','100,000 careers.','career receiving yards · fully reinstated'],
 ['06','The ceiling.','where a full career lands all-time'],
 ['07','The verdict.','']];
const A1=['rgba(255,60,0,.40)','rgba(255,60,0,.5)',OR], A2=['rgba(255,75,62,.34)','rgba(255,75,62,.5)','#FF4B3E'], A3=['rgba(12,245,249,.22)','rgba(12,245,249,.45)','#0CF5F9'];
const ACC=[A1,A1,A2,A3,A3,A3,A1,A1,A1];
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


/* ---------- 0 HOOK ---------- */
const H=CH[0];
const hWm=div('abs','',H,{left:'160px',top:'640px',width:'760px',height:'760px',background:`url(${NL('cle')}) center/contain no-repeat`,opacity:.10});
const hRing=div('abs','',H,{left:'190px',top:'700px',width:'700px',height:'700px',borderRadius:'50%',border:'3px solid rgba(255,60,0,.35)',boxShadow:'0 0 80px rgba(255,60,0,.25), inset 0 0 80px rgba(255,60,0,.12)'});
const hHero=div('hero','',H,{left:'170px',top:'600px',width:'760px',height:'900px',backgroundImage:'url(img/jg_hero.png)'});
const h1=div('abs big','HOW GOOD WOULD<br><span class="gold">JOSH GORDON</span><br>HAVE BEEN…',H,{left:'54px',top:'280px',fontSize:'108px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const h2=div('abs big','IF HE JUST<br><span class="gold">STAYED ON THE FIELD?</span>',H,{left:'54px',top:'280px',fontSize:'110px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const h3=div('abs big','100,000 CAREERS.<br><span class="gold">FULLY REINSTATED.</span>',H,{left:'54px',top:'280px',fontSize:'110px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const stampR=div('abs big','REINSTATED ✓',H,{left:'560px',top:'1180px',fontSize:'58px',color:'#2BE38B',border:'6px solid #2BE38B',padding:'4px 16px',borderRadius:'12px',background:'rgba(5,5,6,.75)',boxShadow:'0 0 40px rgba(43,227,139,.4)'});
const hTag=glass(H,{left:'54px',top:'1350px',padding:'12px 22px'}); hTag.innerHTML=`<div style="display:flex;align-items:center;gap:14px">${nlH('cle',54)}<span class="osw" style="font-size:30px;letter-spacing:2px">WR · #12 · 2012–2022</span></div>`;
function rHook(t){
  const p0=eOut(prog(t,.05,.6)); hHero.style.transform=`translateX(${(1-p0)*300}px) scale(${1.02+t*.006})`; hHero.style.opacity=Math.min(1,p0*1.5);
  hRing.style.transform=`scale(${.6+.4*back(prog(t,.1,.6))}) rotate(${t*6}deg)`; hWm.style.transform=`scale(${1+t*.01})`;
  show([h1],t<K.on-.6); fadeUp(h1,t,.05,.35,40);
  show([h2],t>=K.on-.6&&t<K.sim-.05); popIn(h2,t,K.on-.6,{from:1.04});
  show([h3],t>=K.sim-.05); popIn(h3,t,K.sim-.05,{from:1.04});
  show([hTag],t>=.8&&t<K.sim-.05); fadeUp(hTag,t,.8,.3,20);
  show([stampR],t>=K.fully-.05); popIn(stampR,t,K.fully-.05,{from:1.6}); stampR.style.transform+=' rotate(-6deg)';
  H.style.transform=`scale(${1+t*.004})`;}
sfx(.05,'whoosh',.5); sfx(.3,'thump',.7); sfx(.8,'pop',.35); sfx(K.on-.6,'thump',.6); sfx(K.sim-.05,'thump',.75); sfx(K.fully-.05,'thump',.85); sfx(K.fully,'ding',.45);

/* ---------- 1 2013 ---------- */
const E1=CH[1];
const k1=glass(E1,{left:'54px',top:'520px',width:'972px',padding:'26px 30px'}); k1.classList.add('kpi');
k1.innerHTML=`<div style="display:flex;align-items:center;gap:26px">${face('josh-gordon.png',120,OR)}<div><div class="osw mut" style="font-size:26px;letter-spacing:2px">2013 RECEIVING YARDS · LED THE NFL</div><div class="big gold" style="font-size:130px;line-height:1">0</div></div></div>`;
const g14=div('pill','IN JUST 14 GAMES',E1,{left:'54px',top:'790px',background:OR,color:'#fff',fontSize:'38px',boxShadow:'0 0 40px rgba(255,60,0,.5)'});
const qbL=div('abs osw mut','',E1,{left:'54px',top:'900px',fontSize:'28px',letterSpacing:'2px'}); qbL.textContent='HIS QUARTERBACKS THAT YEAR';
const QB=['BRANDON WEEDEN','JASON CAMPBELL','BRIAN HOYER'].map((n,i)=>{const d=glass(E1,{left:'54px',top:(950+i*120)+'px',width:'972px',height:'104px',padding:'0 26px'}); d.innerHTML=`<div style="display:flex;align-items:center;gap:20px;height:100%">${nlH('cle',64)}<span class="big" style="font-size:52px">${n}</span></div>`; return d;});
const QW=['brandon','jason','brian'];
function rPrime(t){hdrIn(1,t); popIn(k1,t,CUT[1]+.15,{from:.9}); k1.querySelector('.big').textContent=Math.round(1646*eOut(prog(t,CUT[1]+.3,K.led+.8))).toLocaleString('en-US');
  const t14=WTs('just',K.led); show([g14],t>=t14-.05); popIn(g14,t,t14-.05,{from:1.4});
  show([qbL],t>=K.qb-.05); fadeUp(qbL,t,K.qb-.05);
  QB.forEach((d,i)=>{const t0=WTs(QW[i],K.qb)-.05; show([d],t>=t0); popIn(d,t,t0,{from:.85,y:20});});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0015})`;}
sfx(CUT[1]+.3,'riser',.25,1.2); sfx(WTs('just',K.led)-.05,'thump',.6); QW.forEach(w=>sfx(WTs(w,K.qb)-.05,'pop',.4));

/* ---------- 2 SUSPENSIONS ---------- */
const E2=CH[2], S2=E2._svg;
const sx0=80,sw=84,sy0=1180,sh=440,smx=1700;
const SB=DATA.seasons.map(([y,v,f],i)=>{const g=sv('g',{},S2);
  const r=sv('rect',{x:sx0+i*sw+8,width:sw-16,y:sy0,height:0,rx:8,fill:f?'rgba(255,75,62,.55)':'#FF7A3D'},g);
  const lb=sv('text',{x:sx0+i*sw+sw/2,y:sy0+36,'text-anchor':'middle','font-size':22,fill:'#8E8E96'},g); lb.textContent="’"+String(y).slice(2);
  const vt=sv('text',{x:sx0+i*sw+sw/2,y:sy0,'text-anchor':'middle','font-size':24,fill:'#fff'},g); vt.textContent=v?v:'0';
  const x=sv('text',{x:sx0+i*sw+sw/2,y:sy0-60,'text-anchor':'middle','font-size':34,fill:'#FF4B3E',style:'font-family:Anton'},g); x.textContent=f?'✕':'';
  return {r,vt,x,v,f,i};});
const susL=div('abs','',E2,{left:'54px',top:'560px'}); susL.innerHTML='<div class="osw" style="font-size:30px;letter-spacing:1px"><span style="display:inline-block;width:22px;height:22px;background:rgba(255,75,62,.75);border-radius:5px;vertical-align:middle"></span> SUSPENDED FOR ALL OR PART OF THE SEASON</div>';
const fin2=glass(E2,{left:'54px',top:'1270px',width:'972px',height:'140px',padding:'0 28px'}); fin2.classList.add('cold');
fin2.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;height:100%"><span class="osw" style="font-size:30px">HIS REAL CAREER</span><span class="big rd" style="font-size:96px">4,284 YDS</span></div>`;
function rSusp(t){hdrIn(2,t); fadeUp(susL,t,CUT[2]+.2);
  SB.forEach(b=>{const t0=b.i<2?CUT[2]+.2+b.i*.12:K.missed+(b.i-2)*.22; const g=eOut(prog(t,t0,t0+.4)); const h=Math.max(b.f?6:0,b.v/smx*sh)*g; set(b.r,{y:sy0-h,height:h}); set(b.vt,{y:sy0-h-12,opacity:g}); set(b.x,{opacity:b.f&&t>=t0+.2?1:0,y:sy0-Math.max(40,b.v/smx*sh)-50});});
  show([fin2],t>=K.fin-.05); popIn(fin2,t,K.fin-.05,{from:.85});
  E2.style.transform=`scale(${1+(t-CUT[2])*.0012})`;}
for(let i=2;i<9;i++)sfx(K.missed+(i-2)*.22,'thump',.35); sfx(K.fin-.05,'thump',.8);

/* ---------- 3 COMPS ---------- */
const E3=CH[3];
const FACE={'Mike Evans':'mike-evans.png','Julio Jones':'julio-jones.png','Odell Beckham':'odell-beckham-jr.png','DeAndre Hopkins':'deandre-hopkins.png','Kenny Britt':'kenny-britt.png','Hakeem Nicks':'hakeem-nicks.png'};
const STW={'Mike Evans':['mike',0],'Julio Jones':['julio',0],'Odell Beckham':['odell',0],'DeAndre Hopkins':['deandre',0],'Kenny Britt':['kenny',1],'Hakeem Nicks':['hakeem',1]};
const CMP=DATA.comps.map(([n,ab],i)=>{const d=glass(E3,{left:(54+(i%7)*140)+'px',top:(520+Math.floor(i/7)*90)+'px',width:'132px',height:'82px',textAlign:'center',paddingTop:'6px'});
  d.innerHTML=(FACE[n]?face(FACE[n],44,'rgba(255,255,255,.3)'):nlH(ab,40))+`<div class="big" style="font-size:17px;margin-top:2px;white-space:nowrap;overflow:hidden">${n.split(' ').slice(-1)[0].toUpperCase()}</div>`; d._n=n; return d;});
const pathL=div('abs osw','EACH SIM = ONE OF THESE <span class="cy">REAL CAREER PATHS</span>, SCALED TO HIS LEVEL',E3,{left:'54px',right:'54px',top:'1340px',fontSize:'26px',textAlign:'center'});
function rCmp(t){hdrIn(3,t);
  CMP.forEach((d,i)=>{const t0=CUT[3]+.2+i*.025; show([d],t>=t0); popIn(d,t,t0,{from:.6});
    const s=STW[d._n]; const on=!!s&&t>=WTs(s[0],s[1]?K.faded:K.names)-.05; d.classList.toggle('hot',on&&!s[1]); d.classList.toggle('cold',on&&!!s[1]); d.style.opacity=1;
    if(t>=K.every){const R=rng(Math.floor((t-K.every)*3)+11); d.style.opacity=R()<.3?1:.3;}});
  show([pathL],t>=K.every); fadeUp(pathL,t,K.every);
  E3.style.transform=`scale(${1+(t-CUT[3])*.001})`;}
for(let i=0;i<58;i+=2)sfx(CUT[3]+.2+i*.025,'click',.1); Object.entries(STW).forEach(([n,s])=>sfx(WTs(s[0],s[1]?K.faded:K.names)-.05,s[1]?'thump':'pop',.35)); sfx(K.every,'whoosh',.35);
/* ---------- 4 HONEST ---------- */
const E4=CH[4], S4=E4._svg;
const hx0=110,hx1=970,hy=1010; const hx=p=>hx0+p*(hx1-hx0);
sv('rect',{x:hx(.25),y:hy-160,width:hx(.75)-hx(.25),height:320,rx:18,fill:'rgba(12,245,249,.08)',stroke:'#0CF5F9','stroke-width':3,'stroke-dasharray':'10 8'},S4);
sv('line',{x1:hx0,x2:hx1,y1:hy,y2:hy,stroke:'rgba(255,255,255,.18)','stroke-width':4},S4);
[['0%',0],['25%',.25],['50%',.5],['75%',.75],['100%',1]].forEach(([s,p])=>{const a=sv('text',{x:hx(p),y:hy+210,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},S4);a.textContent=s;});
const mh=sv('text',{x:hx(.5),y:hy-180,'text-anchor':'middle','font-size':28,fill:'#0CF5F9'},S4); mh.textContent='MIDDLE HALF OF THE FORECAST';
const xl4=sv('text',{x:hx1,y:hy+250,'text-anchor':'end','font-size':24,fill:'#8E8E96'},S4); xl4.textContent='WHERE THE REAL CAREER LANDED →';
const DT=DATA.pct.map((p,i)=>{const inn=p>.25&&p<.75; const c=sv('circle',{cx:hx(Math.min(.99,Math.max(.01,p))),cy:hy+((i%8)-3.5)*36,r:0,fill:inn?'#0CF5F9':'#8E8E96',stroke:'#050506','stroke-width':3},S4); return {c,inn};});
const n4=div('abs','',E4,{left:'54px',top:'540px'}); n4.innerHTML='<div class="big cy num-glow" style="font-size:130px">29 <span class="mut" style="font-size:64px">OF 58</span></div><div class="osw mut" style="font-size:26px;letter-spacing:2px">LANDED IN THE MIDDLE HALF</div>';
const ex4=div('pill','EXACTLY AS EXPECTED ✓',E4,{left:'560px',top:'1310px',background:'#fff',color:'#050506',fontSize:'38px'});
function rHon(t){hdrIn(4,t);
  DT.forEach((d,i)=>{const p=back(prog(t,K.pred+.3+i*.03,K.pred+.6+i*.03)); set(d.c,{r:Math.max(0,p)*13, opacity:t>=K.seventeen&&!d.inn?.35:1});});
  show([n4],t>=K.seventeen-.05); popIn(n4,t,K.seventeen-.05,{from:1.3});
  show([ex4],t>=K.target-.05); popIn(ex4,t,K.target-.05,{from:1.4});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
for(let i=0;i<58;i+=2)sfx(K.pred+.3+i*.03,'click',.1); sfx(K.seventeen-.05,'thump',.7); sfx(K.target-.05,'ding',.4);
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


/* ---------- 6 RESULTS ---------- */
function mkHist(S){const HB=DATA.hist, mx=Math.max(...HB), x0=100,x1=990,y0=1230,h=430, bw=(x1-x0)/HB.length; const X=v=>x0+v/1000*bw;
  const defs=sv('defs',{},S); const g1=sv('linearGradient',{id:'hg'+S.id,x1:0,y1:0,x2:0,y2:1},defs); sv('stop',{offset:0,'stop-color':'#FF8A4D'},g1); sv('stop',{offset:1,'stop-color':'#B83000'},g1);
  const B=HB.map((v,i)=>({v,i,r:sv('rect',{x:x0+i*bw+3,width:bw-6,y:y0,height:0,rx:6,fill:'rgba(255,255,255,.14)'},S)}));
  const ax=sv('g',{},S); [0,5000,10000,15000,20000].forEach(k=>{const a=sv('text',{x:X(k),y:y0+38,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax);a.textContent=k?(k/1000)+'K':'0';});
  const xl=sv('text',{x:x1,y:y0+76,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax); xl.textContent='CAREER RECEIVING YARDS →';
  return {B,X,y0,h,mx,draw(p,hot){B.forEach(b=>{const hh=b.v/mx*h*p; set(b.r,{y:y0-hh,height:hh,fill:hot(b.i)?`url(#hg${S.id})`:'rgba(255,255,255,.14)'});});}};}
const E6=CH[6], S6=E6._svg; S6.id='s6'; const H6=mkHist(S6);
const typ6=glass(E6,{left:'54px',top:'520px',width:'972px',padding:'22px 28px'}); typ6.classList.add('kpi');
typ6.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:flex-end"><div><div class="osw mut" style="font-size:24px;letter-spacing:2px">TYPICAL REINSTATED CAREER</div><div class="big gold" style="font-size:96px;line-height:1">~10,000 YDS</div></div><div class="big" style="font-size:64px">59 TD</div></div>`;
const real6=sv('g',{},S6); const rx=H6.X(4284); sv('line',{x1:rx,x2:rx,y1:H6.y0,y2:H6.y0-H6.h-40,stroke:'#FF4B3E','stroke-width':5},real6);
const realT=div('abs','',E6,{left:(rx+12)+'px',top:'760px'}); realT.innerHTML='<div class="osw rd" style="font-size:24px">← HIS REAL CAREER · 4,284</div>';
const beat6=div('pill','BEATS IT IN 95% OF CAREERS',E6,{left:'210px',top:'1320px',background:OR,color:'#fff',fontSize:'40px',boxShadow:'0 0 40px rgba(255,60,0,.5)'});
function rRun(t){hdrIn(6,t);
  const g=eOut(prog(t,CUT[6]+.2,CUT[6]+1.2)); H6.draw(g,i=>t>=K.beats-.05&&i*1000>=4000);
  popIn(typ6,t,CUT[6]+.3,{from:.9});
  const on=t>=K.beats-.05; real6.style.display=on?'inline':'none'; show([realT],on); fadeUp(realT,t,K.beats-.05);
  show([beat6],t>=K.beats+.6); popIn(beat6,t,K.beats+.6,{from:1.3});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0015})`;}
sfx(CUT[6]+.2,'riser',.3,1); sfx(CUT[6]+.3,'pop',.4); sfx(K.beats-.05,'thump',.6); sfx(K.beats+.6,'ding',.4);

/* ---------- 7 CEILING ---------- */
const E7=CH[7];
const ROWS=[['calvin-johnson.jpg','PASSES CALVIN JOHNSON','11,619 CAREER YARDS','1 IN 3',K.cj,0],['','JOINS THE 15,000 CLUB','ONLY 5 RECEIVERS EVER','1 IN 7',K.club,0],['jerry-rice-hq.jpg','PASSES JERRY RICE','22,895 · #1 ALL-TIME','1 IN 900',K.rice,1]];
const RW=ROWS.map(([img,a,b,p,t0,red],i)=>{const d=glass(E7,{left:'54px',top:(560+i*250)+'px',width:'972px',height:'220px',padding:'0 30px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:26px;height:100%">${img?face(img,130,red?'#FF4B3E':OR):`<span class="big gold" style="font-size:70px;width:130px;text-align:center">15K</span>`}<div style="flex:1"><div class="big" style="font-size:50px">${a}</div><div class="osw mut" style="font-size:24px">${b}</div></div><span class="big ${red?'rd':'gold'}" style="font-size:${red?72:86}px;white-space:nowrap">${p}</span></div>`; d._t=t0; d._red=red; return d;});
function rCeil(t){hdrIn(7,t);
  RW.forEach((d,i)=>{show([d],t>=d._t-.05); popIn(d,t,d._t-.05,{from:.85,y:30}); d.classList.toggle(d._red?'cold':'hot',t>=d._t+.2);});
  E7.style.transform=`scale(${1+(t-CUT[7])*.0012})`;}
RW.forEach(d=>sfx(d._t-.05,'thump',.7));

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const v1=div('abs','',E8,{left:'54px',top:'540px',width:'972px'}); v1.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">THE TALENT</div><div class="big gold" style="font-size:100px">HALL OF FAME LEVEL.</div>';
const v2=div('abs','',E8,{left:'54px',top:'760px',width:'560px'}); v2.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">INSTEAD</div><div class="big rd" style="font-size:86px">THE BIGGEST WHAT-IF OF HIS ERA.</div>';
const jg8=div('hero','',E8,{left:'520px',top:'820px',width:'560px',height:'640px',backgroundImage:'url(img/jg_hero.png)'});
const poll=glass(E8,{left:'110px',top:'560px',width:'860px',padding:'40px'});
poll.innerHTML=`<div style="text-align:center">${face('josh-gordon.png',150,OR)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:14px">FULLY REINSTATED · COMMENT BELOW</div>`+['HALL OF FAMER','NO WAY'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:66px;text-align:center;border-radius:60px;padding:12px 0;${i===0?`background:${OR};color:#fff;box-shadow:0 0 40px rgba(255,60,0,.5)`:'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t);
  const a=t<K.poll-.05; show([v1,v2,jg8],a); E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v1,t,K.c8); show([v2],t>=K.inst-.05); popIn(v2,t,K.inst-.05,{from:1.04}); {const p=eOut(prog(t,K.c8+.2,K.c8+.7)); jg8.style.transform=`translateX(${(1-p)*400}px)`; jg8.style.opacity=p;}}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,K.poll+.3+i*.35,{from:.4})); poll.style.transform+=` scale(${1+(t-K.poll)*.005})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
sfx(K.c8,'whoosh',.3); sfx(K.inst-.05,'thump',.75); sfx(K.poll-.05,'whoosh',.5); sfx(K.poll+.3,'pop',.5); sfx(K.poll+.65,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rPrime,rSusp,rCmp,rHon,rCta,rRun,rCeil,rVer];
