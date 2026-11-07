/* ===================== chapters (Patrick Mahomes · 7 rings) — premium v2 ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nfl-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const GOLD='#FFB612';
const KCR='#E31837', LG='#FFC93C';
const K={sim:CT('I simulated the rest'),
  c1:CT('Mahomes has 3 rings'), brady3:CT('Brady had 3'), won4:CT('then won 4 more'), needs:CT('So Mahomes needs'), acl:CT('torn ACL'),
  c2:CT("Here's how it works"), ranked:CT('I ranked every'), top3:CT('When a quarterback finishes'), out8:CT('Outside the top 8'),
  c3:CT('Then I followed'), names:CT('Peyton Manning'), after:CT('And I tracked'),
  c4:CT('Is it honest'), pred:CT('For those 12'), act:CT('They actually won'), low:CT('If anything'),
  cta:CT('If you want more'), fol:CT('follow Daily'),
  c6:CT('So I ran the rest'), never:CT('61% of the time'), to7:CT('He gets to 7'),
  c7:CT("But here's the thing"), r45:CT('The same model says'), beat:CT("He's already beaten"), bonus:CT('So I gave him'), r24:CT('He catches Brady about'),
  c8:CT("So Brady's 7"), need:CT('Mahomes would need'), poll:CT('Will he do it')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.cta-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','The ring count.','Brady 7 · Mahomes 3'],
 ['02','From ranking to rings.','QB value per dropback · every season since 1999'],
 ['03','12 real careers.','elite QBs who looked most like him through 29'],
 ['04','Is it honest?','what the model predicted for those 12 after 30'],
 null,
 ['05','100,000 careers.','extra rings for Mahomes after 30'],
 ['06','The twist.','he has already beaten the model once'],
 ['07','The verdict.','']];
const AR=['rgba(227,24,55,.40)','rgba(227,24,55,.5)','#FF3A55'], AG=['rgba(255,184,28,.30)','rgba(255,184,28,.5)','#FFC93C'], AC=['rgba(12,245,249,.22)','rgba(12,245,249,.45)','#0CF5F9'];
const ACC=[AR,AG,AC,AC,AC,AC,AG,AG,AR];
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


/* Lombardi trophy icon (SVG). mode: gold | ghost | cy */
function lomb(parent,x,y,s,mode){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  const gh=mode==='ghost', col=mode==='cy'?'#0CF5F9':LG, f=gh?'rgba(255,255,255,.04)':col, st=gh?'rgba(255,255,255,.35)':'#7A5200', dash=gh?'6 5':'none';
  sv('ellipse',{cx:0,cy:-44,rx:16,ry:25,transform:'rotate(-28 0 -44)',fill:f,stroke:st,'stroke-width':3,'stroke-dasharray':dash},g);
  if(!gh)sv('path',{d:'M-6,-58 L6,-30',stroke:'#7A5200','stroke-width':2.5},g);
  sv('path',{d:'M-5,-22 L5,-22 L13,38 L-13,38 Z',fill:f,stroke:st,'stroke-width':3,'stroke-dasharray':dash},g);
  sv('rect',{x:-22,y:38,width:44,height:14,rx:3,fill:gh?f:'#2A2A31',stroke:st,'stroke-width':3,'stroke-dasharray':dash},g);
  if(!gh)g.style.filter=`drop-shadow(0 0 12px ${mode==='cy'?'rgba(12,245,249,.6)':'rgba(255,201,60,.55)'})`;
  return g;}
const lpop=(g,t,t0,x,y,s)=>{const p=back(prog(t,t0,t0+.35)); set(g,{transform:`translate(${x} ${y}) scale(${Math.max(0,p)*s})`,opacity:t>=t0?1:0});};

/* ---------- 0 HOOK ---------- */
const H=CH[0];
const hWm=div('abs','',H,{left:'150px',top:'640px',width:'780px',height:'780px',background:`url(${NL('kc')}) center/contain no-repeat`,opacity:.08});
const pmH=div('hero','',H,{left:'-40px',top:'660px',width:'620px',height:'860px',backgroundImage:'url(img/pm_hero.png)'});
const tbH=div('hero','',H,{left:'520px',top:'800px',width:'600px',height:'680px',backgroundImage:'url(img/tb_hero.png)'});
const h1=div('abs big','WILL <span class="gold">PATRICK MAHOMES</span><br>EVER CATCH<br><span style="color:'+LG+'">TOM BRADY’S 7 RINGS?</span>',H,{left:'54px',top:'270px',fontSize:'100px',lineHeight:'1.02',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const h3=div('abs big','100,000 SIMULATIONS.<br><span style="color:'+LG+'">THE REST OF HIS CAREER.</span>',H,{left:'54px',top:'270px',fontSize:'92px',textShadow:'0 8px 40px rgba(0,0,0,.7)'});
const tagP=glass(H,{left:'54px',top:'1300px',padding:'12px 22px'}); tagP.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('kc',50)}<span class="big" style="font-size:40px">3 RINGS</span></div>`;
const tagB=glass(H,{left:'720px',top:'1300px',padding:'12px 22px'}); tagB.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH('ne',44)}${nlH('tb',44)}<span class="big" style="font-size:40px;color:${LG}">7 RINGS</span></div>`;
const vs0=div('abs big','VS',H,{left:'500px',top:'1310px',fontSize:'56px',color:'#fff',textShadow:'0 0 30px rgba(255,255,255,.5)'});
function rHook(t){
  const p0=eOut(prog(t,.05,.6)), p1=eOut(prog(t,.25,.8));
  pmH.style.transform=`translateX(${-(1-p0)*320}px) scale(${1.02+t*.006})`; pmH.style.opacity=Math.min(1,p0*1.5);
  tbH.style.transform=`translateX(${(1-p1)*320}px) scale(${1.02+t*.006})`; tbH.style.opacity=Math.min(1,p1*1.5);
  hWm.style.transform=`scale(${1+t*.01})`;
  show([h1],t<K.sim-.05); fadeUp(h1,t,.05,.35,40);
  show([h3],t>=K.sim-.05); popIn(h3,t,K.sim-.05,{from:1.04});
  show([tagP,tagB,vs0],t>=.9); popIn(tagP,t,.9,{from:.85}); popIn(tagB,t,1.1,{from:.85}); popIn(vs0,t,1.0,{from:1.2});
  H.style.transform=`scale(${1+t*.004})`;}
sfx(.05,'whoosh',.5); sfx(.3,'thump',.7); sfx(.9,'pop',.4); sfx(1.1,'pop',.4); sfx(K.sim-.05,'thump',.8);

/* ---------- 1 RING COUNT ---------- */
const E1=CH[1], S1=E1._svg;
const cB=glass(E1,{left:'54px',top:'520px',width:'972px',height:'330px',padding:'22px 28px'});
cB.innerHTML=`<div style="display:flex;align-items:center;gap:18px">${face('tom-brady-patriots.jpg',90,LG)}<div class="big" style="font-size:54px">TOM BRADY</div><div style="flex:1"></div><div class="big" style="font-size:80px;color:${LG}">7</div></div>`;
const cM=glass(E1,{left:'54px',top:'880px',width:'972px',height:'330px',padding:'22px 28px'});
cM.innerHTML=`<div style="display:flex;align-items:center;gap:18px">${face('patrick-mahomes.png',90,KCR)}<div class="big" style="font-size:54px">PATRICK MAHOMES</div><div style="flex:1"></div><div class="big" style="font-size:80px;color:${LG}">3</div></div>`;
const LX=i=>150+i*130;
const TB=[...Array(7)].map((_,i)=>lomb(S1,LX(i),760,1,'gold'));
const tbL=[sv('text',{x:(LX(0)+LX(2))/2,y:840,'text-anchor':'middle','font-size':26,fill:'#8E8E96'},S1),sv('text',{x:(LX(3)+LX(6))/2,y:840,'text-anchor':'middle','font-size':26,fill:LG},S1)];
tbL[0].textContent='BY AGE 27'; tbL[1].textContent='AFTER TURNING 30';
const PM=[...Array(7)].map((_,i)=>lomb(S1,LX(i),1120,1,i<3?'gold':'ghost'));
const need=div('pill','NEEDS 4 MORE',E1,{left:'560px',top:'1135px',background:LG,color:'#050506',fontSize:'36px',boxShadow:'0 0 40px rgba(255,201,60,.5)'});
const acl=glass(E1,{left:'54px',top:'1240px',width:'972px',height:'110px',padding:'0 28px'}); acl.classList.add('cold');
acl.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;height:100%"><span class="big rd" style="font-size:52px">TORN ACL</span><span class="osw mut" style="font-size:28px">WEEK 15, 2025 · BACK FOR 2026</span></div>`;
function rRings(t){hdrIn(1,t);
  show([cM],true); popIn(cM,t,CUT[1]+.15,{from:.9});
  PM.forEach((g,i)=>lpop(g,t,i<3?CUT[1]+.35+i*.15:K.needs+i*.1-.3,LX(i),1120,1));
  show([cB],t>=K.brady3-.05); popIn(cB,t,K.brady3-.05,{from:.9});
  TB.forEach((g,i)=>lpop(g,t,i<3?K.brady3+.2+i*.15:WTs('4',K.won4)+(i-3)*.15,LX(i),760,1));
  set(tbL[0],{opacity:t>=K.brady3+.5?1:0}); set(tbL[1],{opacity:t>=K.won4+.3?1:0});
  show([need],t>=K.needs-.05); popIn(need,t,K.needs-.05,{from:1.2});
  show([acl],t>=K.acl-.05); popIn(acl,t,K.acl-.05,{from:.9});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0012})`;}
[0,1,2].forEach(i=>sfx(CUT[1]+.35+i*.15,'pop',.35)); [0,1,2].forEach(i=>sfx(K.brady3+.2+i*.15,'pop',.35)); [3,4,5,6].forEach(i=>sfx(WTs('4',K.won4)+(i-3)*.15,'ding',.3)); sfx(K.needs-.05,'thump',.6); sfx(K.acl-.05,'thump',.75);

/* ---------- 2 TIERS ---------- */
const E2=CH[2];
const RK=[[2018,1],[2019,2],[2020,2],[2021,2],[2022,1],[2023,6],[2024,10],[2025,9]];
const rkL=div('abs osw mut','MAHOMES’ RANK EACH SEASON',E2,{left:'54px',top:'530px',fontSize:'26px',letterSpacing:'2px'});
const RKC=RK.map(([y,r],i)=>{const d=glass(E2,{left:(54+i*122)+'px',top:'575px',width:'110px',height:'120px',textAlign:'center',paddingTop:'10px'}); d.innerHTML=`<div class="big" style="font-size:52px;${r<=3?'color:#0CF5F9':''}">#${r}</div><div class="osw mut" style="font-size:22px">’${String(y).slice(2)}</div>`; d._top=r<=3; return d;});
const TR=[['TOP 3','1 IN 9',.111,K.top3],['4TH–8TH','1 IN 23',.044,K.out8],['9TH–16TH','1 IN 31',.032,K.out8+.25],['17TH+','1 IN 66',.015,K.out8+.5]];
const trL=div('abs osw mut','CHANCE HIS TEAM WINS THE SUPER BOWL THAT YEAR',E2,{left:'54px',top:'740px',fontSize:'26px',letterSpacing:'1px'});
const TRR=TR.map(([a,b,p,t0],i)=>{const d=glass(E2,{left:'54px',top:(790+i*140)+'px',width:'972px',height:'122px',padding:'0 26px'});
  d.innerHTML=`<div style="display:flex;align-items:center;height:100%;gap:20px"><span class="big" style="font-size:44px;width:230px">${a}</span><div style="flex:1;height:34px;border-radius:17px;background:rgba(255,255,255,.06);overflow:hidden"><div class="bar" style="height:100%;width:0;border-radius:17px;background:${i?'rgba(255,255,255,.45)':'linear-gradient(90deg,#0CF5F9,#7FFBFD)'};box-shadow:${i?'none':'0 0 24px rgba(12,245,249,.6)'}"></div></div><span class="big" style="font-size:54px;width:230px;text-align:right;${i?'':'color:#0CF5F9'}">${b}</span></div>`;
  d._b=d.querySelector('.bar'); d._p=p; d._t=t0; return d;});
function rTier(t){hdrIn(2,t);
  show([rkL],t>=K.ranked-.05); fadeUp(rkL,t,K.ranked-.05);
  RKC.forEach((d,i)=>{const t0=K.ranked+.1+i*.12; show([d],t>=t0); popIn(d,t,t0,{from:.8}); d.classList.toggle('hot',d._top&&t>=K.top3);});
  show([trL],t>=K.top3-.05); fadeUp(trL,t,K.top3-.05);
  TRR.forEach((d,i)=>{show([d],t>=d._t-.05); popIn(d,t,d._t-.05,{from:.9,y:20}); d._b.style.width=(eOut(prog(t,d._t+.1,d._t+.8))*d._p/.111*100)+'%'; d.classList.toggle('hot',i===0&&t>=K.top3+.6);});
  E2.style.transform=`scale(${1+(t-CUT[2])*.0012})`;}
RK.forEach((_,i)=>sfx(K.ranked+.1+i*.12,'click',.25)); TR.forEach(r=>sfx(r[3]-.05,'pop',.4)); sfx(K.top3+.6,'ding',.35);

/* ---------- 3 COMPS ---------- */
const E3=CH[3];
const QBS=[['Peyton Manning','ind','peyton-manning-colts.jpg','peyton'],['Drew Brees','no','drew-brees.png','drew'],['Aaron Rodgers','gb','aaron-rodgers.png','aaron'],['Philip Rivers','lac','','philip'],['Tom Brady','ne','tom-brady-patriots.jpg','brady'],
  ['Kurt Warner','ari','kurt-warner.jpg',''],['Ben Roethlisberger','pit','',''],['Tony Romo','dal','tony-romo.jpg',''],['Matt Ryan','atl','matt-ryan.jpg',''],['Russell Wilson','sea','russell-wilson.png',''],['Daunte Culpepper','min','',''],['Matt Hasselbeck','sea','','']];
const QC=QBS.map(([n,ab,img,w],i)=>{const d=glass(E3,{left:(54+(i%3)*330)+'px',top:(520+Math.floor(i/3)*178)+'px',width:'312px',height:'160px',padding:'0 18px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:14px;height:100%">${img?face(img,84,'rgba(255,255,255,.3)'):`<span style="display:inline-block;width:84px;text-align:center">${nlH(ab,72)}</span>`}<div><div class="big" style="font-size:30px;line-height:1.05">${n.split(' ')[0].toUpperCase()}<br>${n.split(' ').slice(1).join(' ').toUpperCase()}</div><div style="margin-top:4px">${nlH(ab,34)}</div></div></div>`; d._w=w; return d;});
const a30=div('pill','TRACKED FROM AGE 30 ON →',E3,{left:'250px',top:'1260px',background:'#0CF5F9',color:'#050506',fontSize:'36px',boxShadow:'0 0 40px rgba(12,245,249,.45)'});
function rCmp(t){hdrIn(3,t);
  QC.forEach((d,i)=>{const t0=CUT[3]+.2+i*.08; show([d],t>=t0); popIn(d,t,t0,{from:.8}); d.classList.toggle('hot',!!d._w&&t>=WTs(d._w,K.names)-.05&&t<K.after);});
  show([a30],t>=K.after-.05); popIn(a30,t,K.after-.05,{from:1.2});
  E3.style.transform=`scale(${1+(t-CUT[3])*.001})`;}
QBS.forEach((q,i)=>{sfx(CUT[3]+.2+i*.08,'click',.15); if(q[3])sfx(WTs(q[3],K.names)-.05,'pop',.35);}); sfx(K.after-.05,'thump',.55);

/* ---------- 4 HONEST ---------- */
const E4=CH[4], S4=E4._svg;
const hP=glass(E4,{left:'54px',top:'560px',width:'972px',height:'300px',padding:'22px 28px'});
hP.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">MODEL PREDICTED (AFTER 30)</div><div class="big cy num-glow" style="font-size:96px;line-height:1">5 RINGS</div>';
const hA=glass(E4,{left:'54px',top:'900px',width:'972px',height:'300px',padding:'22px 28px'});
hA.innerHTML=`<div class="osw mut" style="font-size:28px;letter-spacing:2px">THEY ACTUALLY WON</div><div class="big" style="font-size:96px;line-height:1;color:${LG}">7 RINGS</div>`;
const LP=[...Array(5)].map((_,i)=>lomb(S4,520+i*100,760,.75,'cy'));
const LA=[...Array(7)].map((_,i)=>lomb(S4,420+i*92,1100,.75,'gold'));
const low4=div('pill','IF ANYTHING, IT RUNS LOW ✓',E4,{left:'230px',top:'1260px',background:'#fff',color:'#050506',fontSize:'40px'});
function rHon(t){hdrIn(4,t);
  show([hP],t>=K.pred-.05); popIn(hP,t,K.pred-.05,{from:.9});
  LP.forEach((g,i)=>lpop(g,t,WTs('predicted',K.pred)+.2+i*.12,520+i*100,760,.75));
  show([hA],t>=K.act-.05); popIn(hA,t,K.act-.05,{from:.9}); hA.classList.toggle('hot',t>=K.act+.6);
  LA.forEach((g,i)=>lpop(g,t,K.act+.1+i*.1,420+i*92,1100,.75));
  show([low4],t>=K.low-.05); popIn(low4,t,K.low-.05,{from:1.3});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
sfx(K.pred-.05,'pop',.4); for(let i=0;i<5;i++)sfx(WTs('predicted',K.pred)+.2+i*.12,'click',.25); sfx(K.act-.05,'thump',.6); for(let i=0;i<7;i++)sfx(K.act+.1+i*.1,'click',.25); sfx(K.low-.05,'ding',.45);
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
const DIST=[[60686,'+0','3 TOTAL'],[29340,'+1','4'],[8327,'+2','5'],[1444,'+3','6'],[203,'+4','7+']];
const k6=glass(E6,{left:'54px',top:'520px',width:'972px',padding:'22px 28px'}); k6.classList.add('kpi');
k6.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><div><div class="osw mut" style="font-size:24px;letter-spacing:2px">NEVER WINS ANOTHER RING</div><div class="big gold" style="font-size:110px;line-height:1">61%</div></div>${face('patrick-mahomes.png',130,KCR)}</div>`;
const bx0=110,bw6=180,by0=1240,bh6=380;
const DB=DIST.map(([n,a,b],i)=>{const x=bx0+i*bw6; const r=sv('rect',{x:x+14,width:bw6-28,y:by0,height:0,rx:10,fill:i?'rgba(255,255,255,.22)':'rgba(255,255,255,.55)'},S6);
  const v=sv('text',{x:x+bw6/2,y:by0,'text-anchor':'middle','font-size':30,fill:'#fff',style:'font-family:Anton'},S6); v.textContent=(n/1000).toFixed(n<1000?1:0)+'%';
  const l=sv('text',{x:x+bw6/2,y:by0+40,'text-anchor':'middle','font-size':30,fill:'#fff',style:'font-family:Anton'},S6); l.textContent=a;
  const l2=sv('text',{x:x+bw6/2,y:by0+72,'text-anchor':'middle','font-size':22,fill:'#8E8E96'},S6); l2.textContent=b+(i?' RINGS':'');
  return {r,v,n,i};});
DB[0].v.textContent='61%'; DB[4].v.textContent='0.2%';
const xl6=sv('text',{x:990,y:by0+110,'text-anchor':'end','font-size':24,fill:'#8E8E96'},S6); xl6.textContent='EXTRA RINGS AFTER 30 →';
const c500=glass(E6,{left:'600px',top:'760px',width:'426px',padding:'16px 22px'}); c500.classList.add('hot');
c500.innerHTML=`<div class="osw" style="font-size:24px;letter-spacing:1px">REACHES 7 · TIES BRADY</div><div class="big" style="font-size:78px;line-height:1;color:${LG}">1 IN 500</div>`;
const arr6=sv('path',{d:`M ${bx0+4*bw6+bw6/2} 1000 L ${bx0+4*bw6+bw6/2} ${by0-40}`,stroke:LG,'stroke-width':5,'marker-end':'',fill:'none','stroke-dasharray':'10 8'},S6);
function rRun(t){hdrIn(6,t);
  popIn(k6,t,K.never-.05,{from:.9}); show([k6],t>=K.never-.05);
  DB.forEach(b=>{const t0=CUT[6]+.2+b.i*.15; const g=eOut(prog(t,t0,t0+.6)); const h=Math.max(8,b.n/60686*bh6)*g;
    set(b.r,{y:by0-h,height:h,fill:b.i===4&&t>=K.to7-.05?LG:(b.i===0&&t>=K.never?'#FF4B3E':(b.i?'rgba(255,255,255,.22)':'rgba(255,255,255,.55)'))}); set(b.v,{y:by0-h-14,opacity:g});});
  show([c500],t>=K.to7-.05); popIn(c500,t,K.to7-.05,{from:.85}); set(arr6,{opacity:t>=K.to7+.1?1:0});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0015})`;}
DIST.forEach((_,i)=>sfx(CUT[6]+.2+i*.15,'pop',.3)); sfx(K.never-.05,'thump',.65); sfx(K.to7-.05,'ding',.5);

/* ---------- 7 TWIST ---------- */
const E7=CH[7], S7=E7._svg;
const t45=glass(E7,{left:'54px',top:'540px',width:'972px',height:'260px',padding:'22px 28px'});
t45.innerHTML=`<div style="display:flex;align-items:center;gap:22px;height:100%">${face('patrick-mahomes.png',130,KCR)}<div><div class="osw mut" style="font-size:26px;letter-spacing:1px">MODEL ODDS OF HIS FIRST 3 RINGS</div><div class="big" style="font-size:100px;line-height:1">1 IN 45</div></div></div>`;
const beat7=div('abs big','ALREADY BEAT IT ✓',E7,{left:'540px',top:'760px',fontSize:'50px',color:'#2BE38B',border:'6px solid #2BE38B',padding:'4px 16px',borderRadius:'12px',background:'rgba(5,5,6,.8)',boxShadow:'0 0 40px rgba(43,227,139,.4)'});
const bon=glass(E7,{left:'54px',top:'880px',width:'972px',height:'380px',padding:'24px 28px'});
bon.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${nlH('kc',64)}<span class="osw" style="font-size:30px;letter-spacing:1px">BONUS: CHIEFS-LEVEL ODDS EVERY YEAR</span></div><div style="display:flex;align-items:flex-end;gap:30px;margin-top:20px"><span class="big mut" style="font-size:64px;text-decoration:line-through;text-decoration-color:#FF4B3E;text-decoration-thickness:6px">1 IN 500</span><span class="big" style="font-size:60px">→</span><span class="big" style="font-size:130px;line-height:1;color:${LG}">1 IN 24</span></div><div class="osw mut" style="font-size:26px;margin-top:10px">CAREERS WHERE HE CATCHES BRADY</div>`;
const L7=[...Array(7)].map((_,i)=>lomb(S7,150+i*130,1340,.7,i<3?'gold':'gold'));
function rTw(t){hdrIn(7,t);
  show([t45],t>=K.r45-.05); popIn(t45,t,K.r45-.05,{from:.9});
  show([beat7],t>=K.beat-.05); popIn(beat7,t,K.beat-.05,{from:1.5}); beat7.style.transform+=' rotate(-5deg)';
  show([bon],t>=K.bonus-.05); popIn(bon,t,K.bonus-.05,{from:.9}); bon.classList.toggle('hot',t>=K.r24);
  L7.forEach((g,i)=>lpop(g,t,K.r24+.2+i*.1,150+i*130,1340,.7));
  E7.style.transform=`scale(${1+(t-CUT[7])*.0012})`;}
sfx(K.r45-.05,'pop',.45); sfx(K.beat-.05,'thump',.85); sfx(K.beat,'ding',.4); sfx(K.bonus-.05,'whoosh',.4); sfx(K.r24-.05,'thump',.7); for(let i=0;i<7;i++)sfx(K.r24+.2+i*.1,'click',.25);

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const v1=div('abs','',E8,{left:'54px',top:'540px',width:'600px'}); v1.innerHTML=`<div class="osw mut" style="font-size:28px;letter-spacing:2px">BRADY’S 7</div><div class="big" style="font-size:100px;line-height:1.02;color:${LG}">CLOSE TO UNTOUCHABLE.</div>`;
const v2=div('abs','',E8,{left:'54px',top:'930px',width:'520px'}); v2.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">MAHOMES WOULD NEED</div><div class="big gold" style="font-size:72px;line-height:1.05">THE GREATEST 30s IN NFL HISTORY.</div>';
const tb8=div('hero','',E8,{left:'560px',top:'720px',width:'560px',height:'640px',backgroundImage:'url(img/tb_hero.png)'});
const pm8=div('hero','',E8,{left:'520px',top:'640px',width:'560px',height:'780px',backgroundImage:'url(img/pm_hero.png)'});
const poll=glass(E8,{left:'110px',top:'560px',width:'860px',padding:'40px'});
poll.innerHTML=`<div style="text-align:center">${face('patrick-mahomes.png',150,KCR)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:14px">DOES HE GET TO 7? · COMMENT BELOW</div>`+['HE CATCHES BRADY','NEVER'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:62px;text-align:center;border-radius:60px;padding:12px 0;${i===0?`background:${KCR};color:#fff;box-shadow:0 0 40px rgba(227,24,55,.5)`:'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t);
  const a=t<K.poll-.05; show([v1,v2,tb8,pm8],a); E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v1,t,K.c8); show([v2],t>=K.need-.05); fadeUp(v2,t,K.need-.05);
    {const p=eOut(prog(t,K.c8+.2,K.c8+.7)); tb8.style.transform=`translateX(${(1-p)*400}px)`; tb8.style.opacity=t<K.need-.05?p:0;}
    {const p=eOut(prog(t,K.need-.05,K.need+.45)); pm8.style.transform=`translateX(${(1-p)*400}px)`; pm8.style.opacity=t>=K.need-.05?p:0;}}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,K.poll+.3+i*.35,{from:.4})); poll.style.transform+=` scale(${1+(t-K.poll)*.005})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
sfx(K.c8,'whoosh',.3); sfx(K.need-.05,'thump',.7); sfx(K.poll-.05,'whoosh',.5); sfx(K.poll+.3,'pop',.5); sfx(K.poll+.65,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rRings,rTier,rCmp,rHon,rCta,rRun,rTw,rVer];
