/* ===================== chapters (Antonio Brown · best behavior) — premium v2 ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nba-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const GOLD='#FFB612';
const BR='#CE1141', SP='#C4CED4';
const K={cmp:CT('I compared that season'),
  c1:CT('Every season gets'), pts:CT('in scoring per'), usg:CT('First in usage'), oimp:CT('First in offensive'), r26:CT('26th out of'), def:CT('And on defense'), stl:CT('steals and defensive'),
  c2:CT('To find his twin'), n:CT('11,262 seasons.'), min:CT('Every player with'), win:CT('Smallest distance'),
  c3:CT('Here they all are'), mid:CT("Jordan's in the middle"), closer:CT('The closer a dot'),
  c4:CT('Is it honest'), own:CT("Jordan's own seasons should"), y97:CT('His 1997 season'), out:CT('So I took his'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c6:CT('Here are the five'), p5:CT('#5, Paul George'), p4:CT('#4, Terrell'), p3:CT('#3, Clyde'), p2:CT('#2, Kobe'), p1:CT('And #1'),
  c7:CT('Kawhi Leonard, 2017'), nob:CT("seasons, nobody's closer"), x45:CT("He's 4.5"), same:CT('Same defensive impact'), split:CT('Where they split'), ft:CT('Kawhi got to the free-throw'), prot:CT('Jordan protected'),
  c8:CT("But here's the crazy"), seven:CT('7 of the 10'), c92:CT('And his 2017 is closer'), poll:CT('Who should I run next')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.cta-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','14 numbers.','each ranked vs. players from the same season'],
 ['02','Nearest neighbor.','distance across all 14 numbers'],
 ['03','One map.','every season since 1980 · 1,000+ minutes'],
 ['04','Is it honest?','Jordan’s own seasons'],
 null,
 ['05','The 5 closest.','to 1995-96 Michael Jordan'],
 ['06','Same fingerprint.','Jordan ’96 vs. his twin'],
 ['07','The crazy part.','']];
const AR=['rgba(206,17,65,.38)','rgba(206,17,65,.5)','#FF3A55'], AS=['rgba(196,206,212,.25)','rgba(196,206,212,.45)','#E2E8EC'], AC=['rgba(12,245,249,.22)','rgba(12,245,249,.45)','#0CF5F9'];
const ACC=[AR,AR,AC,AC,AC,AC,AR,AS,AS];
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
const MET=[['pts100','Points / 100 poss'],['ts','True shooting'],['usg','Usage rate'],['ftr','Free-throw rate'],['3par','3-pt attempt rate'],['ast','Assist rate'],['tov','Ball security'],['orb','Off. rebounds'],['drb','Def. rebounds'],['blk','Block rate'],['stl','Steal rate'],['dimp','Defensive impact'],['oimp','Offensive impact'],['ftp','Free-throw %']];
const KW={pts100:98.6,ts:89.7,usg:97.5,ftr:87.9,'3par':39.9,ast:75.9,tov:79.8,orb:54.3,drb:59.2,blk:68.8,stl:96.1,dimp:96.5,oimp:98.9,ftp:93.4};
function sliders(E,top,withK){const rows=MET.map(([k,l],i)=>{const d=div('abs','',E,{left:'54px',top:(top+i*56)+'px',width:'972px',height:'50px',borderRadius:'12px'});
  d.innerHTML=`<div style="display:flex;align-items:center;height:100%;padding:0 14px"><span class="osw" style="font-size:26px;width:330px">${l}</span><div style="flex:1;height:8px;border-radius:4px;background:rgba(255,255,255,.12);position:relative"><div class="dj" style="position:absolute;top:-9px;width:26px;height:26px;border-radius:50%;background:${BR};border:3px solid #fff;left:0;box-shadow:0 0 14px rgba(206,17,65,.8)"></div>${withK?`<div class="dk" style="position:absolute;top:-9px;width:26px;height:26px;border-radius:50%;background:${SP};border:3px solid #111;left:0"></div>`:''}</div><span class="big pv" style="font-size:28px;width:90px;text-align:right"></span></div>`;
  d._j=d.querySelector('.dj'); d._k=d.querySelector('.dk'); d._v=d.querySelector('.pv'); d._key=k; return d;}); return rows;}
const setHL=(d,on,col)=>{d.style.background=on?`linear-gradient(90deg,${col||'rgba(255,201,60,.22)'},rgba(255,255,255,.03))`:'transparent'; d.style.boxShadow=on?'inset 0 0 0 2px rgba(255,201,60,.5)':'none';};

/* ---------- 0 HOOK ---------- */
const H=CH[0];
const wm=div('abs','',H,{left:'150px',top:'640px',width:'780px',height:'780px',background:`url(${NL('chi')}) center/contain no-repeat`,opacity:.09});
const mjH=div('hero','',H,{left:'-40px',top:'680px',width:'620px',height:'860px',backgroundImage:'url(img/mj_hero.png)',webkitMaskImage:'linear-gradient(90deg,transparent 0%,#000 16%),linear-gradient(180deg,#000 78%,transparent 100%)',webkitMaskComposite:'source-in'});
const mys=div('abs','',H,{left:'600px',top:'760px',width:'420px',height:'560px',borderRadius:'30px',border:'4px dashed rgba(255,255,255,.4)',background:'rgba(255,255,255,.04)',display:'flex',alignItems:'center',justifyContent:'center'});
mys.innerHTML='<span class="big" style="font-size:260px;color:rgba(255,255,255,.85);text-shadow:0 0 50px rgba(12,245,249,.5)">?</span>';
const h1=div('abs big',`WHO IS <span style="color:${BR}">1995-96</span><br>MICHAEL JORDAN’S<br><span class="cy">STATISTICAL TWIN?</span>`,H,{left:'54px',top:'270px',fontSize:'98px',lineHeight:'1.03',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const chips=['72-10','4TH MVP','4TH RING'].map((s,i)=>div('abs','',H,Object.assign({left:(54+i*250)+'px',top:'1340px'},tagS)));
chips.forEach((c,i)=>{c.innerHTML=`<span class="big" style="font-size:38px">${['72 WINS','4TH MVP','4TH RING'][i]}</span>`;});
const h3=div('abs big',`11,262 SEASONS.<br><span class="cy">ONE TWIN.</span>`,H,{left:'54px',top:'270px',fontSize:'110px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
function rHook(t){const p0=eOut(prog(t,.05,.6)),p1=eOut(prog(t,.3,.85));
  mjH.style.transform=`translateX(${-(1-p0)*320}px) scale(${1.02+t*.006})`; mjH.style.opacity=Math.min(1,p0*1.5);
  mys.style.transform=`translateX(${(1-p1)*300}px) scale(${1+.02*Math.sin(t*3)})`; mys.style.opacity=p1;
  show([h1],t<K.cmp-.05); fadeUp(h1,t,.05,.35,40); show([h3],t>=K.cmp-.05); popIn(h3,t,K.cmp-.05,{from:1.04});
  const tc=[WTs('72',2),WTs('fourth',4),WTs('ring',6)];
  chips.forEach((c,i)=>{show([c],t>=tc[i]-.05); popIn(c,t,tc[i]-.05,{from:1.2});});
  wm.style.transform=`scale(${1+t*.01})`; H.style.transform=`scale(${1+t*.004})`;}
sfx(.05,'whoosh',.5); sfx(.3,'thump',.7); sfx(.6,'pop',.4); [WTs('72',2),WTs('fourth',4),WTs('ring',6)].forEach(x=>sfx(x-.05,'pop',.4)); sfx(K.cmp-.05,'thump',.8);

/* ---------- 1 FOURTEEN NUMBERS ---------- */
const E1=CH[1];
const S1R=sliders(E1,520,false);
const b26=div('pill','#26 OF 11,275 SEASONS EVER',E1,{left:'420px',top:'1312px',background:'#FFC93C',color:'#050506',fontSize:'32px'});
const HL1={pts100:K.pts,usg:K.usg,oimp:K.oimp,stl:K.stl,dimp:K.stl};
function rNum(t){hdrIn(1,t);
  S1R.forEach((d,i)=>{const t0=CUT[1]+.2+i*.07; show([d],t>=t0); fadeUp(d,t,t0,.25,16); const v=DATA.mj[d._key]; const g=eOut(prog(t,K.c1+1.5+i*.05,K.c1+2.3+i*.05));
    d._j.style.left=`calc(${v*g}% - 13px)`; d._v.textContent=g>.95?Math.round(v)+'':'';
    const h=HL1[d._key]; setHL(d,h&&t>=h-.05);});
  show([b26],t>=K.r26-.05); popIn(b26,t,K.r26-.05,{from:1.2});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0012})`;}
for(let i=0;i<14;i+=2)sfx(CUT[1]+.2+i*.07,'click',.15); [K.pts,K.usg,K.oimp,K.stl].forEach(x=>sfx(x-.05,'pop',.35)); sfx(K.r26-.05,'ding',.45);

/* ---------- 2 NEAREST NEIGHBOR ---------- */
const E2=CH[2];
const fml=glass(E2,{left:'54px',top:'540px',width:'972px',height:'230px',padding:'24px 28px',textAlign:'center'});
fml.innerHTML=`<div class="osw mut" style="font-size:26px;letter-spacing:2px">DISTANCE TO ’96 JORDAN</div><div class="big" style="font-size:76px;margin-top:10px">√ Σ ( <span style="color:${BR}">JORDAN</span> − <span class="cy">X</span> )²</div>`;
const cnt=glass(E2,{left:'54px',top:'800px',width:'972px',height:'230px',padding:'24px 28px'}); cnt.classList.add('kpi');
cnt.innerHTML=`<div class="big cy num-glow" style="font-size:130px;line-height:1" id="cn">0</div><div class="osw" style="font-size:30px">SEASONS · <span class="mut">1,000+ MINUTES · 1980–2026</span></div>`;
const cn=cnt.querySelector('#cn');
const winP=div('pill','SMALLEST DISTANCE WINS',E2,{left:'260px',top:'1080px',background:'#0CF5F9',color:'#050506',fontSize:'40px',boxShadow:'0 0 40px rgba(12,245,249,.5)'});
function rNN(t){hdrIn(2,t); popIn(fml,t,CUT[2]+.15,{from:.9});
  show([cnt],t>=K.n-.6); popIn(cnt,t,K.n-.6,{from:.9}); cn.textContent=Math.round(11262*eOut(prog(t,K.n-.5,K.n+1.6))).toLocaleString('en-US');
  show([winP],t>=K.win-.05); popIn(winP,t,K.win-.05,{from:1.3});
  E2.style.transform=`scale(${1+(t-CUT[2])*.0012})`;}
sfx(CUT[2]+.15,'pop',.4); sfx(K.n-.6,'riser',.3,2); sfx(K.win-.05,'thump',.75);

/* ---------- 3 MAP ---------- */
const E3=CH[3], S3=E3._svg;
const MC={x:540,y:950}, MR=t=>Math.min(430,t*2.3);
[50,100,150].forEach(r=>{sv('circle',{cx:MC.x,cy:MC.y,r:MR(r),fill:'none',stroke:'rgba(255,255,255,.12)','stroke-width':2,'stroke-dasharray':'6 8'},S3);});
const MD=DATA.dots.map(([d,a,mp],i)=>{const r=MR(d); const b=Math.max(.12,1-d/170);
  return {c:sv('circle',{cx:MC.x+r*Math.cos(a),cy:MC.y+r*Math.sin(a),r:0,fill:`rgba(12,245,249,${b.toFixed(2)})`},S3),d,sz:2+mp/3200*5,i};});
const ctr=div('abs','',E3,{left:(MC.x-60)+'px',top:(MC.y-60)+'px'}); ctr.innerHTML=face('mj.jpg',120,BR);
const mapL=div('abs osw mut','BRIGHTER = CLOSER TO ’96 JORDAN',E3,{left:'0',right:'0',textAlign:'center',top:'1420px',fontSize:'26px'});
function rMap(t){hdrIn(3,t);
  MD.forEach(m=>{const t0=CUT[3]+.2+(m.d/250)*2.2; const g=eOut(prog(t,t0,t0+.4)); set(m.c,{r:m.sz*g});});
  show([ctr],t>=K.mid-.05); popIn(ctr,t,K.mid-.05,{from:.4});
  show([mapL],t>=K.closer); fadeUp(mapL,t,K.closer);
  E3.style.transform=`scale(${1+(t-CUT[3])*.002})`;}
sfx(CUT[3]+.2,'riser',.3,2.2); sfx(K.mid-.05,'thump',.65);

/* ---------- 4 HONEST ---------- */
const E4=CH[4];
const OWN=[['1996-97',30.5],['1990-91',35.4],['1991-92',38.2]];
const OR=OWN.map(([s,d],i)=>{const g=glass(E4,{left:'54px',top:(560+i*170)+'px',width:'972px',height:'150px',padding:'0 28px'});
  g.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%">${face('mj.jpg',100,BR)}<div style="flex:1"><div class="big" style="font-size:52px">JORDAN ${s}</div><div class="osw mut" style="font-size:24px">DISTANCE</div></div><span class="big" style="font-size:72px">${d}</span></div><div class="strike" style="position:absolute;left:20px;right:20px;top:50%;height:8px;background:#FF4B3E;border-radius:4px;transform-origin:0 50%;transform:scaleX(0)"></div>`; g._s=g.querySelector('.strike'); return g;});
const ok4=div('pill','HIS OWN SEASONS LAND CLOSEST ✓',E4,{left:'170px',top:'1100px',background:'#2BE38B',color:'#050506',fontSize:'36px'});
const out4=div('pill','REMOVED FROM THE SEARCH',E4,{left:'260px',top:'1190px',background:'#FF4B3E',color:'#fff',fontSize:'36px'});
function rHon(t){hdrIn(4,t);
  OR.forEach((g,i)=>{const t0=K.own+.4+i*.25; show([g],t>=t0); popIn(g,t,t0,{from:.9}); g.classList.toggle('hot',i===0&&t>=K.y97-.05); g._s.style.transform=`scaleX(${eOut(prog(t,K.out+.2+i*.12,K.out+.6+i*.12))})`; g.style.opacity=t>=K.out+.8?.5:1;});
  show([ok4],t>=WTs('they',K.own+1)-.05); popIn(ok4,t,WTs('they',K.own+1)-.05,{from:1.2});
  show([out4],t>=K.out-.05); popIn(out4,t,K.out-.05,{from:1.2});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
OWN.forEach((_,i)=>sfx(K.own+.4+i*.25,'pop',.3)); sfx(K.y97-.05,'ding',.4); sfx(K.out-.05,'thump',.65);
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


/* ---------- 6 COUNTDOWN ---------- */
const E6=CH[6];
const CD=[['#5','PAUL GEORGE','2018-19 · THUNDER','paul-george.jpg','okc',50.0,K.p5],['#4','TERRELL BRANDON','1995-96 · CAVALIERS','terrell-brandon.jpg','cle',49.5,K.p4],['#3','CLYDE DREXLER','1994-95 · BLAZERS/ROCKETS','clyde-drexler.jpg','hou',42.4,K.p3],['#2','KOBE BRYANT','2002-03 · LAKERS','kobe.jpg','lal',42.2,K.p2],['#1','???','','',null,null,K.p1]];
const CDR=CD.map(([n,a,b,f,ab,d,t0],i)=>{const g=glass(E6,{left:'54px',top:(530+i*172)+'px',width:'972px',height:'156px',padding:'0 24px'});
  g.innerHTML=`<div style="display:flex;align-items:center;gap:20px;height:100%"><span class="big" style="font-size:56px;width:80px;color:${i===4?'#0CF5F9':'#8E8E96'}">${n}</span>${f?face(f,110,'rgba(255,255,255,.4)'):`<span style="display:inline-block;width:110px;height:110px;border-radius:50%;border:4px dashed #0CF5F9;text-align:center" class="big cy"><span style="font-size:70px;line-height:104px">?</span></span>`}<div style="flex:1"><div class="big" style="font-size:46px">${a}</div><div class="osw mut" style="font-size:22px">${b}</div></div>${ab?nlH(ab,70):''}${d?`<span class="big" style="font-size:44px;width:120px;text-align:right">${d}</span>`:''}</div>`; g._t=t0; g._i=i; return g;});
const dl6=div('abs osw mut','DISTANCE →',E6,{right:'64px',top:'500px',fontSize:'22px'});
function rCnt(t){hdrIn(6,t); show([dl6],t>=K.p5); 
  CDR.forEach(g=>{show([g],t>=g._t-.05); popIn(g,t,g._t-.05,{from:.9,y:20}); if(g._i===4){g.classList.toggle('hot',t>=g._t); g.style.transform+=` scale(${1+.015*Math.sin((t-g._t)*8)})`;}});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0012})`;}
CD.forEach(c=>sfx(c[6]-.05,'thump',.5)); sfx(K.p1-.05,'riser',.35,1.3);

/* ---------- 7 REVEAL + FINGERPRINT ---------- */
const E7=CH[7];
const kwH=div('hero','',E7,{left:'480px',top:'560px',width:'600px',height:'900px',backgroundImage:'url(img/kawhi_hero.png)'});
const kwT=div('abs','',E7,{left:'54px',top:'560px',width:'560px'});
kwT.innerHTML=`<div class="osw mut" style="font-size:28px;letter-spacing:2px">#1 OF 11,262 SEASONS</div><div class="big" style="font-size:120px;line-height:.95">KAWHI<br>LEONARD</div><div class="big" style="font-size:56px;color:${SP}">2016-17 · SPURS</div>`;
const x45=glass(E7,{left:'54px',top:'1000px',width:'500px',padding:'18px 24px'}); x45.classList.add('hot');
x45.innerHTML=`<div class="big cy num-glow" style="font-size:100px;line-height:1">4.5×</div><div class="osw" style="font-size:26px">CLOSER THAN A TYPICAL SEASON</div>`;
const leg7=div('abs osw','',E7,{left:'54px',top:'500px',fontSize:'26px'}); leg7.innerHTML=`<span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:${BR};border:2px solid #fff"></span> JORDAN ’96 &nbsp;&nbsp; <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:${SP};border:2px solid #111"></span> KAWHI ’17`;
const S7R=sliders(E7,550,true);
const HL7={dimp:[K.same,K.split],ftr:[K.ft,K.prot],blk:[K.ft+.6,K.prot],tov:[K.prot,1e9]};
const dbpm=div('pill','BOTH +2.2',E7,{left:'720px',top:'1360px',background:'#FFC93C',color:'#050506',fontSize:'34px'});
function rRev(t){hdrIn(7,t); const A=t<K.same-.05;
  show([kwH,kwT,x45],A); if(A){const p=eOut(prog(t,K.c7-.05,K.c7+.5)); kwH.style.transform=`translateX(${(1-p)*400}px) scale(${1.02+(t-K.c7)*.006})`; kwH.style.opacity=p; popIn(kwT,t,K.c7-.05,{from:1.08}); show([x45],t>=K.x45-.05); popIn(x45,t,K.x45-.05,{from:.85});}
  E7._h.style.display=A?'none':'block'; show([leg7],!A);
  S7R.forEach((d,i)=>{show([d],!A); if(A)return; const g=eOut(prog(t,K.same-.05+i*.04,K.same+.6+i*.04)); d._j.style.left=`calc(${DATA.mj[d._key]*g}% - 13px)`; d._k.style.left=`calc(${KW[d._key]*g}% - 13px)`; d._v.textContent='';
    const h=HL7[d._key]; setHL(d,h&&t>=h[0]-.05&&t<h[1]);});
  show([dbpm],!A&&t<K.split); popIn(dbpm,t,K.same+.4,{from:1.2});
  E7.style.transform=`scale(${1+(t-CUT[7])*.0012})`;}
sfx(K.c7-.05,'thump',.85); sfx(K.c7,'sparkle',.4); sfx(K.x45-.05,'pop',.45); sfx(K.same-.05,'whoosh',.4); sfx(K.ft,'pop',.35); sfx(K.prot-.05,'pop',.35);

/* ---------- 8 TWIST ---------- */
const E8=CH[8];
const TOP=DATA.top.map(([s,p,tm,d],i)=>{const kw=p==='Kawhi Leonard'; const g=glass(E8,{left:(54+(i%5)*196)+'px',top:(560+Math.floor(i/5)*250)+'px',width:'184px',height:'230px',textAlign:'center',paddingTop:'14px'});
  g.innerHTML=`<div class="osw mut" style="font-size:22px">#${i+1}</div>${face(kw?'kawhi.jpg':(p==='Kobe Bryant'?'kobe.jpg':'clyde-drexler.jpg'),100,kw?SP:'rgba(255,255,255,.3)')}<div class="big" style="font-size:24px;margin-top:6px">${p.split(' ')[1].toUpperCase()}</div><div class="osw mut" style="font-size:22px">’${String(s-1).slice(2)}-${String(s).slice(2)}</div>`; g._kw=kw; return g;});
const sv7=div('abs big','7 OF THE 10 CLOSEST: <span style="color:'+SP+'">KAWHI</span>',E8,{left:'0',right:'0',textAlign:'center',top:'1080px',fontSize:'64px'});
const cmp8=glass(E8,{left:'54px',top:'560px',width:'972px',height:'420px',padding:'26px 30px'});
cmp8.innerHTML=`<div class="osw mut" style="font-size:26px;letter-spacing:2px">DISTANCE TO ’96 JORDAN (SMALLER = CLOSER)</div>`+[['kawhi.jpg','KAWHI LEONARD ’16-17',37.8,SP],['mj.jpg','MICHAEL JORDAN ’91-92',38.2,BR]].map(([f,n,d,c])=>`<div style="display:flex;align-items:center;gap:18px;margin-top:26px">${face(f,100,c)}<div style="flex:1"><div class="big" style="font-size:38px">${n}</div><div style="height:30px;border-radius:15px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:6px"><div class="bar" data-x="${d}" style="height:100%;width:0;background:${c}"></div></div></div><span class="big" style="font-size:70px;width:150px;text-align:right">${d}</span></div>`).join('');
const BB8=[...cmp8.querySelectorAll('.bar')];
const poll=glass(E8,{left:'110px',top:'600px',width:'860px',padding:'44px'});
poll.innerHTML=`<div style="text-align:center">${face('mj.jpg',150,BR)}</div><div class="big" style="font-size:80px;text-align:center;margin-top:16px">WHO’S NEXT?</div><div class="opt big" style="margin-top:24px;font-size:52px;text-align:center;border-radius:60px;padding:14px 0;background:#0CF5F9;color:#050506">DROP A NAME 👇</div>`;
function rTw(t){hdrIn(8,t); const P1=t<K.c92-.05, P3=t>=K.poll-.05;
  TOP.forEach((g,i)=>{show([g],P1&&t>=K.c8+.2+i*.08); popIn(g,t,K.c8+.2+i*.08,{from:.7}); g.classList.toggle('hot',g._kw&&t>=K.seven); g.style.opacity=(!g._kw&&t>=K.seven)?.45:1;});
  show([sv7],P1&&t>=K.seven); popIn(sv7,t,K.seven,{from:1.1});
  show([cmp8],!P1&&!P3); popIn(cmp8,t,K.c92-.05,{from:.9}); BB8.forEach((b,i)=>{b.style.width=(eOut(prog(t,K.c92+.3+i*.4,K.c92+1+i*.4))*(+b.dataset.x)/40*100)+'%';});
  E8._h.style.display=P3?'none':'block';
  show([poll],P3); popIn(poll,t,K.poll-.05,{from:.85});
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
for(let i=0;i<10;i++)sfx(K.c8+.2+i*.08,'click',.2); sfx(K.seven,'thump',.75); sfx(K.c92-.05,'whoosh',.45); sfx(K.c92+.3,'pop',.4); sfx(K.c92+.7,'pop',.4); sfx(K.poll-.05,'thump',.6); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rNum,rNN,rMap,rHon,rCta,rCnt,rRev,rTw];
