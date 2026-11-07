/* ===================== chapters (Antonio Brown · best behavior) — premium v2 ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nba-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const GOLD='#FFB612';
const BR='#CE1141', GW='#FFC72C', GB='#1D428A';
const K={sim:CT('I simulated the series'),
  c1:CT('The Bulls went'), gsw:CT('The Warriors went 67'), po:CT('then 16-1'), cur:CT('in the playoffs with Curry'),
  c2:CT("You can't compare"), rules:CT('Different eras'), elo:CT('So I used Elo'), own:CT('It rates every team'), same:CT('land on the same'),
  c3:CT('After their title runs'), bf:CT('the Bulls finished'), wf:CT('The Warriors finished'), hi:CT('Two of the highest'),
  c4:CT('Is it honest'), tested:CT('I tested it'), when:CT('When it gives'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c6:CT('So I played the'), hc:CT('with the Bulls getting home'), ww:CT('The Warriors win'), bw:CT('The Bulls win'), w6:CT('The most common'), b7:CT('Next is Bulls'),
  c7:CT('And home court is everything'), take:CT('Take it away'), peak:CT('But compare both'), flips:CT('Bulls by a hair'),
  c8:CT('So the greatest debate'), poll:CT('Who are you taking')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.cta-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','Two dynasties.','1995–96 Bulls · 2016–17 Warriors'],
 ['02','Different eras.','so every team is rated against its own league'],
 ['03','One scale.','Elo after each title run · average team = 1500'],
 ['04','Is it honest?','463 playoff series since 1984'],
 null,
 ['05','100,000 series.','best of 7 · Bulls get home court'],
 ['06','Home court.','what flips the series'],
 ['07','The verdict.','']];
const AR=['rgba(206,17,65,.38)','rgba(206,17,65,.5)','#FF3A55'], AY=['rgba(255,199,44,.30)','rgba(255,199,44,.5)','#FFC72C'], AC=['rgba(12,245,249,.22)','rgba(12,245,249,.45)','#0CF5F9'];
const ACC=[AR,AR,AC,AY,AC,AC,AY,AR,AY];
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
const wmL=div('abs','',H,{left:'-80px',top:'700px',width:'620px',height:'620px',background:`url(${NL('chi')}) center/contain no-repeat`,opacity:.10});
const wmR=div('abs','',H,{left:'540px',top:'700px',width:'620px',height:'620px',background:`url(${NL('gs')}) center/contain no-repeat`,opacity:.10});
const mjH=div('hero','',H,{left:'-40px',top:'660px',width:'600px',height:'880px',backgroundImage:'url(img/mj_hero.png)'});
const scH=div('hero','',H,{left:'560px',top:'640px',width:'520px',height:'900px',backgroundImage:'url(img/sc_hero.png)'});
const h1=div('abs big',`WHO WINS:<br><span style="color:${BR}">THE ’96 BULLS</span><br>OR <span style="color:${GW}">THE ’17 WARRIORS?</span>`,H,{left:'54px',top:'270px',fontSize:'100px',lineHeight:'1.02',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const h3=div('abs big',`100,000 SERIES.<br><span style="color:${GW}">BEST OF 7.</span>`,H,{left:'54px',top:'270px',fontSize:'110px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const tL=div('abs','',H,Object.assign({left:'54px',top:'1330px'},tagS)); tL.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('chi',52)}<span class="big" style="font-size:40px">72-10</span></div>`;
const tR=div('abs','',H,Object.assign({left:'730px',top:'1330px'},tagS)); tR.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('gs',52)}<span class="big" style="font-size:40px">67-15</span></div>`;
const vs=div('abs big','VS',H,{zIndex:5,left:'478px',top:'1060px',fontSize:'110px',color:'#fff',textShadow:'0 0 40px rgba(255,255,255,.5)'});
function rHook(t){const p0=eOut(prog(t,.05,.6)),p1=eOut(prog(t,.2,.75));
  mjH.style.transform=`translateX(${-(1-p0)*320}px) scale(${1.02+t*.006})`; mjH.style.opacity=Math.min(1,p0*1.5);
  scH.style.transform=`translateX(${(1-p1)*320}px) scale(${1.02+t*.006})`; scH.style.opacity=Math.min(1,p1*1.5);
  show([h1],t<K.sim-.05); fadeUp(h1,t,.05,.35,40); show([h3],t>=K.sim-.05); popIn(h3,t,K.sim-.05,{from:1.04});
  show([tL,tR],t>=.9); popIn(tL,t,.9,{from:.85}); popIn(tR,t,1.1,{from:.85}); show([vs],t>=1.2); popIn(vs,t,1.2,{from:1.4});
  wmL.style.transform=wmR.style.transform=`scale(${1+t*.01})`; H.style.transform=`scale(${1+t*.004})`;}
sfx(.05,'whoosh',.5); sfx(.3,'thump',.7); sfx(.9,'pop',.4); sfx(1.1,'pop',.4); sfx(1.2,'thump',.6); sfx(K.sim-.05,'thump',.8);

/* ---------- 1 ROSTERS ---------- */
const E1=CH[1];
const team=(top,ab,col,rec,sub,faces)=>{const d=glass(E1,{left:'54px',top:top+'px',width:'972px',height:'330px',padding:'22px 28px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:18px">${nlH(ab,80)}<div style="flex:1"><div class="big" style="font-size:96px;line-height:1;color:${col}">${rec}</div><div class="osw mut" style="font-size:26px">${sub}</div></div></div><div class="fc" style="display:flex;gap:18px;margin-top:20px">${faces.map(([f,n])=>`<div style="text-align:center;opacity:0">${face(f,104,col)}<div class="big" style="font-size:22px;margin-top:4px">${n}</div></div>`).join('')}</div>`;
  d._f=[...d.querySelectorAll('.fc > div')]; return d;};
const tB=team(530,'chi',BR,'72-10','1995–96 · BEST RECORD AT THE TIME',[['mj.jpg','JORDAN'],['pippen.jpg','PIPPEN'],['rodman.jpg','RODMAN']]);
const tW=team(900,'gs',GW,'67-15','2016–17 · THEN 16-1 IN THE PLAYOFFS',[['curry.jpg','CURRY'],['durant.jpg','DURANT'],['klay.jpg','KLAY'],['draymond.jpg','DRAYMOND']]);
const BW_N=[['jordan',0],['pippen',0],['rodman',0]], GW_N=['curry','durant','klay','draymond'];
function rRost(t){hdrIn(1,t);
  popIn(tB,t,CUT[1]+.1,{from:.9}); tB._f.forEach((f,i)=>{const t0=WTs(BW_N[i][0],K.c1)-.05; f.style.opacity=t>=t0?1:0; f.style.transform=`scale(${.6+.4*back(prog(t,t0,t0+.3))})`;});
  show([tW],t>=K.gsw-.05); popIn(tW,t,K.gsw-.05,{from:.9}); tW._f.forEach((f,i)=>{const t0=WTs(GW_N[i],K.po)-.05; f.style.opacity=t>=t0?1:0; f.style.transform=`scale(${.6+.4*back(prog(t,t0,t0+.3))})`;});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0012})`;}
sfx(CUT[1]+.1,'pop',.4); BW_N.forEach(n=>sfx(WTs(n[0],K.c1)-.05,'click',.3)); sfx(K.gsw-.05,'pop',.4); GW_N.forEach(n=>sfx(WTs(n,K.po)-.05,'click',.3));

/* ---------- 2 ERAS ---------- */
const E2=CH[2];
const era=(left,yr,col,rows)=>{const d=glass(E2,{left:left+'px',top:'530px',width:'476px',height:'360px',padding:'22px 24px'});
  d.innerHTML=`<div class="big" style="font-size:80px;color:${col}">${yr}</div>`+rows.map(r=>`<div class="osw" style="font-size:28px;margin-top:14px">${r}</div>`).join(''); return d;};
const e96=era(54,'1996',BR,['HAND-CHECKING: LEGAL','ZONE DEFENSE: ILLEGAL','3-PT LINE: 22 FT']);
const e17=era(550,'2017',GW,['HAND-CHECKING: BANNED','ZONE DEFENSE: LEGAL','3-PT LINE: 23 FT 9 IN']);
const neq=div('abs big','≠',E2,{left:'500px',top:'640px',fontSize:'90px',color:'#FF4B3E'});
const eloC=glass(E2,{left:'54px',top:'930px',width:'972px',height:'360px',padding:'24px 28px'});
eloC.innerHTML=`<div class="osw mut" style="font-size:26px;letter-spacing:2px">THE FIX: ELO (FIVETHIRTYEIGHT)</div><div class="big" style="font-size:56px;line-height:1.1;margin-top:8px">EVERY TEAM RATED<br>VS. <span class="cy">ITS OWN LEAGUE</span></div><div style="display:flex;align-items:center;gap:20px;margin-top:22px"><span class="big" style="font-size:44px">AVERAGE TEAM =</span><span class="big cy num-glow" style="font-size:70px">1500</span></div>`;
function rEra(t){hdrIn(2,t);
  show([e96],t>=CUT[2]+.15); popIn(e96,t,CUT[2]+.15,{from:.9}); show([e17],t>=CUT[2]+.4); popIn(e17,t,CUT[2]+.4,{from:.9});
  show([neq],t>=K.rules-.05); popIn(neq,t,K.rules-.05,{from:1.5});
  show([eloC],t>=K.elo-.05); popIn(eloC,t,K.elo-.05,{from:.9}); eloC.classList.toggle('hot',t>=K.own);
  E2.style.transform=`scale(${1+(t-CUT[2])*.0012})`;}
sfx(CUT[2]+.15,'pop',.4); sfx(CUT[2]+.4,'pop',.4); sfx(K.rules-.05,'thump',.55); sfx(K.elo-.05,'whoosh',.4); sfx(K.own,'ding',.35);

/* ---------- 3 ONE SCALE ---------- */
const E3=CH[3], S3=E3._svg;
const X=e=>110+(e-1300)/600*860; const sy=1000;
sv('rect',{x:110,y:sy-8,width:860,height:16,rx:8,fill:'rgba(255,255,255,.12)'},S3);
const grad=sv('rect',{x:110,y:sy-8,width:0,height:16,rx:8,fill:'#0CF5F9'},S3);
[1300,1400,1500,1600,1700,1800,1900].forEach(e=>{sv('line',{x1:X(e),x2:X(e),y1:sy+14,y2:sy+30,stroke:'#6A6A72','stroke-width':3},S3); const tx=sv('text',{x:X(e),y:sy+64,'text-anchor':'middle','font-size':28,fill:'#8E8E96',style:'font-family:Anton'},S3); tx.textContent=e;});
const avgL=sv('text',{x:X(1500),y:sy-40,'text-anchor':'middle','font-size':26,fill:'#8E8E96'},S3); avgL.textContent='AVERAGE TEAM';
const mk=(e,col,ab,up)=>{const g=sv('g',{},S3); sv('line',{x1:X(e),x2:X(e),y1:sy-10,y2:up?sy-170:sy+180,stroke:col,'stroke-width':5},g); sv('circle',{cx:X(e),cy:sy,r:14,fill:col,stroke:'#fff','stroke-width':3},g); return g;};
const mB=mk(1823,BR,'chi',true), mW=mk(1846,GW,'gs',false);
const lbB=div('abs','',E3,{left:(X(1823)-330)+'px',top:'700px'}); lbB.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('chi',70)}<span class="big" style="font-size:80px;color:${BR}">1,823</span></div>`;
const lbW=div('abs','',E3,{left:(X(1846)-330)+'px',top:'1170px'}); lbW.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('gs',70)}<span class="big" style="font-size:80px;color:${GW}">1,846</span></div>`;
const hiP=div('pill','TWO OF THE HIGHEST RATINGS EVER',E3,{left:'150px',top:'560px',background:GW,color:'#050506',fontSize:'36px',boxShadow:'0 0 40px rgba(255,199,44,.5)'});
function rScale(t){hdrIn(3,t); set(grad,{width:860*eOut(prog(t,CUT[3]+.1,CUT[3]+.9))*0.9}); set(avgL,{opacity:t>=CUT[3]+.3?1:0});
  set(mB,{opacity:t>=K.bf+.3?1:0}); show([lbB],t>=K.bf+.3); popIn(lbB,t,K.bf+.3,{from:.8});
  set(mW,{opacity:t>=K.wf+.3?1:0}); show([lbW],t>=K.wf+.3); popIn(lbW,t,K.wf+.3,{from:.8});
  show([hiP],t>=K.hi-.05); popIn(hiP,t,K.hi-.05,{from:1.2});
  E3.style.transform=`scale(${1+(t-CUT[3])*.0015})`;}
sfx(CUT[3]+.1,'riser',.25,.8); sfx(K.bf+.3,'thump',.6); sfx(K.wf+.3,'thump',.6); sfx(K.hi-.05,'ding',.45);

/* ---------- 4 HONEST ---------- */
const E4=CH[4], S4=E4._svg;
const leg4=div('abs osw',legHTML,E4,{left:'54px',top:'560px',fontSize:'28px'});
const cnt4=glass(E4,{left:'54px',top:'620px',width:'972px',height:'150px',padding:'0 28px'});
cnt4.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;height:100%"><span class="big" style="font-size:96px" >463</span><span class="osw" style="font-size:30px;text-align:right">PLAYOFF SERIES<br><span class="mut">1984 – 2025</span></span></div>`;
const CB=calBars(E4,S4,[[55,52],[65,67],[75,80],[85,85],[94,96]],1290,400,0,t=>false);
function rHon(t){hdrIn(4,t); show([cnt4],t>=K.tested-.05); popIn(cnt4,t,K.tested-.05,{from:.9});
  show([leg4],false); CB.forEach((b,i)=>{b.upd(t-(K.when-.1)+0)}); 
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
for(let i=0;i<5;i++)sfx(K.when-.1+i*.15,'pop',.3); sfx(K.tested-.05,'thump',.5);
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
const E6=CH[6], S6=E6._svg;
const bar6=div('abs','',E6,{left:'54px',top:'560px',width:'972px',height:'260px'});
bar6.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:flex-end"><div>${nlH('gs',80)}<div class="big num" id="nW" style="font-size:96px;color:${GW};line-height:1">0</div></div><div style="text-align:right">${nlH('chi',80)}<div class="big num" id="nB" style="font-size:96px;color:${BR};line-height:1">0</div></div></div><div style="display:flex;height:40px;border-radius:20px;overflow:hidden;margin-top:16px;background:rgba(255,255,255,.08)"><div id="bW" style="width:0;background:linear-gradient(90deg,${GB},${GW})"></div><div style="flex:1"></div><div id="bB" style="width:0;background:linear-gradient(90deg,#7a0a25,${BR})"></div></div>`;
const nW=bar6.querySelector('#nW'), nB=bar6.querySelector('#nB'), bW=bar6.querySelector('#bW'), bB=bar6.querySelector('#bB');
const OUT=[['GSW IN 4',6.77,0],['GSW IN 5',11.04,0],['GSW IN 6',21.65,0],['GSW IN 7',12.81,0],['CHI IN 7',19.62,1],['CHI IN 6',10.63,1],['CHI IN 5',13.40,1],['CHI IN 4',4.08,1]];
const ox0=90, ow=112, oy0=1330, oh=360;
const OB=OUT.map(([n,p,b],i)=>{const x=ox0+i*ow; const r=sv('rect',{x:x+10,width:ow-20,y:oy0,height:0,rx:8,fill:b?'rgba(206,17,65,.55)':'rgba(255,199,44,.45)'},S6);
  const l=sv('text',{x:x+ow/2,y:oy0+34,'text-anchor':'middle','font-size':24,fill:'#fff',style:'font-family:Anton'},S6); l.textContent=n.split(' IN ')[1];
  const v=sv('text',{x:x+ow/2,y:oy0,'text-anchor':'middle','font-size':24,fill:'#fff',style:'font-family:Anton'},S6); v.textContent=p.toFixed(0)+'%';
  return {r,v,p,b,i};});
const gl=sv('text',{x:ox0+2*ow,y:oy0+72,'text-anchor':'middle','font-size':26,fill:GW,style:'font-family:Anton'},S6); gl.textContent='WARRIORS IN…';
const bl=sv('text',{x:ox0+6*ow,y:oy0+72,'text-anchor':'middle','font-size':26,fill:'#FF3A55',style:'font-family:Anton'},S6); bl.textContent='…BULLS IN';
function rRun(t){hdrIn(6,t); popIn(bar6,t,CUT[6]+.15,{from:.95});
  const gw=eOut(prog(t,K.ww,K.ww+1.6)), gb=eOut(prog(t,K.bw,K.bw+1.6));
  nW.textContent=Math.round(52274*gw).toLocaleString('en-US'); nB.textContent=Math.round(47726*gb).toLocaleString('en-US');
  bW.style.width=(52.274*gw)+'%'; bB.style.width=(47.726*gb)+'%';
  const on=t>=K.w6-.3; S6.style.display=on?'block':'none';
  OB.forEach(o=>{const g=eOut(prog(t,K.w6-.3+o.i*.06,K.w6+.3+o.i*.06)); const h=o.p/22*oh*g; const hl=(o.i===2&&t>=K.w6+.3)||(o.i===4&&t>=K.b7-.05);
    set(o.r,{y:oy0-h,height:h,fill:hl?(o.b?BR:GW):(o.b?'rgba(206,17,65,.4)':'rgba(255,199,44,.3)')}); set(o.v,{y:oy0-h-10,opacity:g>.9?1:0});});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0012})`;}
sfx(CUT[6]+.15,'pop',.4); sfx(K.ww,'riser',.3,1.5); sfx(K.ww+1.6,'ding',.4); sfx(K.bw,'riser',.3,1.5); sfx(K.bw+1.6,'ding',.4); sfx(K.w6+.3,'thump',.5); sfx(K.b7-.05,'thump',.5);

/* ---------- 7 HOME COURT ---------- */
const E7=CH[7];
const HR=[['BULLS WITH HOME COURT',47.7,CUT[7]+.2],['BULLS WITHOUT IT',38.7,K.take+.6],['AT THEIR PEAKS (BULLS HOME)',51.1,K.flips-.1]];
const HRR=HR.map(([a,p,t0],i)=>{const d=glass(E7,{left:'54px',top:(560+i*250)+'px',width:'972px',height:'220px',padding:'24px 28px'});
  d.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><span class="big" style="font-size:44px">${a}</span><span class="big" style="font-size:80px;color:${i===1?'#FF4B3E':(i===2?'#0CF5F9':'#fff')}">${Math.round(p)}%</span></div><div style="height:30px;border-radius:15px;background:rgba(255,255,255,.08);margin-top:18px;position:relative;overflow:hidden"><div class="bar" style="position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#7a0a25,${BR})"></div><div style="position:absolute;left:50%;top:-4px;bottom:-4px;width:4px;background:#fff"></div></div>`;
  d._b=d.querySelector('.bar'); d._p=p; d._t=t0; d._i=i; return d;});
function rHome(t){hdrIn(7,t);
  HRR.forEach(d=>{show([d],t>=d._t-.05); popIn(d,t,d._t-.05,{from:.9,y:20}); d._b.style.width=(eOut(prog(t,d._t,d._t+.8))*d._p)+'%'; d.classList.toggle(d._i===1?'cold':'hot',d._i>0&&t>=d._t+.6);});
  E7.style.transform=`scale(${1+(t-CUT[7])*.0012})`;}
HR.forEach(r=>sfx(r[2]-.05,'thump',.55));

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const coin=div('abs','',E8,{left:'340px',top:'560px',width:'400px',height:'400px',borderRadius:'50%',background:`radial-gradient(circle at 35% 30%, #FFE08A, ${GW} 45%, #9C7A12)`,boxShadow:'0 0 80px rgba(255,199,44,.45), inset 0 0 0 10px rgba(255,255,255,.25)',display:'flex',alignItems:'center',justifyContent:'center'});
coin.innerHTML=`<img id="cf" src="${NL('chi')}" style="width:250px;height:250px;object-fit:contain">`;
const cf=coin.querySelector('#cf');
const cfT=div('abs big','BASICALLY A <span style="color:'+GW+'">COIN FLIP.</span>',E8,{left:'0',right:'0',textAlign:'center',top:'1040px',fontSize:'92px'});
const cfS=div('abs osw mut','52% WARRIORS · 48% BULLS',E8,{left:'0',right:'0',textAlign:'center',top:'1160px',fontSize:'36px'});
const poll=glass(E8,{left:'110px',top:'560px',width:'860px',padding:'40px'});
poll.innerHTML=`<div style="display:flex;justify-content:center;gap:30px">${face('mj.jpg',140,BR)}${face('curry.jpg',140,GW)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:14px">WHO ARE YOU TAKING?</div>`+["’96 BULLS","’17 WARRIORS"].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:62px;text-align:center;border-radius:60px;padding:12px 0;${i===0?`background:${BR};color:#fff;box-shadow:0 0 40px rgba(206,17,65,.5)`:`background:${GW};color:#050506`}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t); const a=t<K.poll-.05; show([coin,cfT,cfS],a); E8._h.style.display=a?'block':'none';
  if(a){popIn(coin,t,CUT[8]+.1,{from:.6}); const ang=(t-CUT[8])*540; coin.style.transform+=` rotateY(${ang}deg)`; cf.src=NL(Math.floor(((ang+90)%360)/180)?'gs':'chi');
    show([cfT],t>=WTs('coin',K.c8)-.1); popIn(cfT,t,WTs('coin',K.c8)-.1,{from:1.08}); show([cfS],t>=WTs('coin',K.c8)+.3); fadeUp(cfS,t,WTs('coin',K.c8)+.3);}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,K.poll+.3+i*.35,{from:.4}));}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
sfx(CUT[8]+.1,'whoosh',.45); sfx(WTs('coin',K.c8)-.1,'thump',.75); sfx(K.poll-.05,'whoosh',.5); sfx(K.poll+.3,'pop',.5); sfx(K.poll+.65,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rRost,rEra,rScale,rHon,rCta,rRun,rHome,rVer];
