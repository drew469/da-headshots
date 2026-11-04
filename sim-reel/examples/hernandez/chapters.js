/* ===================== chapters (Aaron Hernandez · the career he didn't play) ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nfl-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const NAVY='#002244', NRED='#C60C30';
const K={sim:CT('I simulated the rest'), six:CT('In 1 of every 6,'), five:CT('Only 5 tight'), show:CT('Let me show'),
  c1:CT('His career ended in June'), arr:CT('when he was arrested'), never:CT('never played another'),
  c2:CT('But look at'), thr:CT('Through age 22'), since:CT('Since 1999'), gronk:CT('Even Gronk'),
  c3:CT('So I found'), names:CT('Witten, Gates'), fizz:CT('fizzled'), finley:CT('like Jermichael'), every:CT('Every simulated'),
  c4:CT('Is the model'), test:CT('I tested'), eleven:CT('11 landed'), expect:CT('almost exactly'),
  c5:CT('So I ran his'), typ:CT('The typical'), td49:CT('49 touchdowns'), good:CT('A really good career'),
  c6:CT('the ceiling is wild'), one6:CT('In 1 of every 6 careers'), club:CT('joins the 10,000'), p2:CT('In about 2%'), rec:CT('Gates\' record'),
  c7:CT('Patriots won 3'), contract:CT('while his contract'),
  c8:CT('So most likely'), best:CT('In his best'), stop:CT('it all stopped'), poll:CT('Hall of Famer,')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.c5-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','The career that stopped.','New England Patriots · 2010–2012'],
 ['02','Look at what he had.','TE receiving yards through age 22 · since 1999'],
 ['03','23 real careers.','the tight ends who looked most like him early'],
 ['04','Is it honest?','predicting each of the 23 from the other 22'],
 ['05','100,000 careers.','career receiving yards · every simulation'],
 ['06','The ceiling.','the 10,000-yard club'],
 ['07','The rings.','Patriots titles while his contract would have run'],
 ['08','The verdict.','']];
const chs=document.getElementById('chs');
const prg=document.getElementById('prog'); for(let i=0;i<8;i++){const x=document.createElement('i');prg.appendChild(x);}
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
function lombardi(parent,x,y,s=1){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  sv('path',{d:'M-46,150 L46,150 L38,118 L-38,118 Z',fill:'#8A8F98',stroke:'#050506','stroke-width':3},g);
  sv('path',{d:'M-14,118 L14,118 L6,20 L-6,20 Z',fill:'#D9DCE1',stroke:'#050506','stroke-width':3},g);
  const f=football(g,0,-10,1.2,'#D9DCE1'); set(f,{transform:'translate(0 -6) rotate(-35) scale(1.25)'}); return g;}

/* ---------- 0 HOOK ---------- */
const H=CH[0], Hs=H._svg;
const hCirc=div('abs','',H,{left:'330px',top:'760px',width:'640px',height:'640px',borderRadius:'50%',background:NAVY,boxShadow:`inset 0 0 0 12px ${NRED}`});
const hWm=div('abs','',H,{left:'440px',top:'870px',width:'420px',height:'420px',background:`url(${NL('ne')}) center/contain no-repeat`,opacity:.16});
const hSt=div('abs','',H,{left:'350px',top:'690px',width:'600px',height:'720px',background:'url(img/st_ah.png) center bottom/contain no-repeat'});
const h1=div('abs big','AARON HERNANDEZ:<br><span class="cy">CAREER OVER AT 23.</span>',H,{left:'54px',top:'292px',fontSize:'104px'});
const h1s=div('abs osw','what if he played the <span class="cy">whole thing?</span>',H,{left:'58px',top:'530px',fontSize:'40px'});
const hNe=div('abs','',H,{left:'50px',top:'800px'}); hNe.innerHTML=nlH('ne',180);
const hSt3=div('abs','',H,{left:'60px',top:'1020px'}); hSt3.innerHTML='<div class="big" style="font-size:92px;line-height:1">1,956</div><div class="osw" style="font-size:26px;letter-spacing:2px">REC YDS · 3 SEASONS</div>';
const hB=div('abs big','I SIMULATED<br>THE REST OF IT<br><span class="cy">100,000 TIMES.</span>',H,{left:'54px',top:'292px',fontSize:'112px'});
const hC=div('abs big cy','1 IN 6',H,{left:'54px',top:'300px',fontSize:'240px'});
const hCs=div('abs osw','of simulated careers: <span class="cy">10,000+ receiving yards</span>',H,{left:'60px',top:'560px',fontSize:'40px'});
const fbG=sv('g',{},Hs); const FB=[]; for(let i=0;i<6;i++){FB.push(football(fbG,170+i*148,760,1.7));}
const hClub=div('abs','',H,{left:'60px',top:'900px',width:'960px'});
hClub.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px;margin-bottom:14px">THE 10,000-YARD TIGHT END CLUB</div>'+[['TONY GONZALEZ','kc'],['JASON WITTEN','dal'],['TRAVIS KELCE','kc'],['ANTONIO GATES','lac'],['SHANNON SHARPE','den']].map(([n,ab])=>`<div class="club" style="display:flex;align-items:center;gap:18px;margin-top:10px">${nlH(ab,64)}<span class="big" style="font-size:54px">${n}</span></div>`).join('');
const CLUB=[...hClub.querySelectorAll('.club')];
function rHook(t){
  const a=t<K.sim-.05; show([h1,h1s,hNe,hSt3],a); show([hCirc,hWm,hSt],t<K.six-.05);
  {const pc=back(prog(t,.02,.42)); hCirc.style.transform=`scale(${Math.max(0,pc)})`; hWm.style.transform=hCirc.style.transform; hWm.style.opacity=.16*prog(t,.2,.5);
    const ps=eOut(prog(t,.12,.6)); hSt.style.transform=`translateY(${(1-ps)*420}px) scale(${1+t*.008})`; hSt.style.opacity=ps>0?1:0;}
  if(a){fadeUp(h1,t,.05,.3,40); fadeUp(h1s,t,1.2,.3); popIn(hNe,t,.6,{from:.3}); popIn(hSt3,t,1.8,{from:1.4});}
  const b=t>=K.sim-.05&&t<K.six-.05; show([hB],b); if(b)fadeUp(hB,t,K.sim-.05,.3);
  const c=t>=K.six-.05&&t<K.five-.05; show([hC,hCs],c); fbG.style.display=c?'inline':'none';
  if(c){popIn(hC,t,K.six-.05,{from:1.2}); fadeUp(hCs,t,K.six+.3);
    FB.forEach((f,i)=>{const p=back(prog(t,K.six+.1+i*.08,K.six+.4+i*.08)); const hit=i==5&&t>=WTs('10000',K.six,'ten'); set(f,{transform:`translate(${170+i*148} 760) scale(${1.7*Math.max(0,p)*(hit?1.15:1)})`}); set(f._b,{fill:hit?'#0CF5F9':(t>=WTs('ten',K.six)?'#3A3A44':'#7A4A22')});});}
  const d=t>=K.five-.05; show([hC,hCs].concat([]),c||d); if(d){hC.style.display='block'; hCs.style.display='block';}
  show([hClub],d); if(d){CLUB.forEach((r,i)=>popIn(r,t,K.five+.2+i*.18,{from:.5,y:20})); H.style.transform=`scale(${1+Math.max(0,t-K.show)*.005})`;}
}
sfx(.05,'whoosh',.5); sfx(.25,'thump',.6); sfx(.6,'pop',.45); sfx(1.8,'thump',.55);
sfx(K.sim-.05,'whoosh',.5); sfx(K.six-.05,'thump',.75); for(let i=0;i<6;i++)sfx(K.six+.1+i*.08,'pop',.25); sfx(WTs('ten',K.six),'ding',.45);
for(let i=0;i<5;i++)sfx(K.five+.2+i*.18,'click',.3); sfx(K.show,'riser',.25,1.2);

/* ---------- 1 STOPPED ---------- */
const E1=CH[1], S1=E1._svg;
const yrs=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
const tx0=110,tw=68,ty0=1150,th=420,ymx=1000;
const BAR1=yrs.map((y,i)=>{const s=DATA.seasons.find(x=>x[0]==y); const r=sv('rect',{x:tx0+i*tw+6,width:tw-12,y:ty0,height:0,rx:6,fill:s?'#0CF5F9':'none',stroke:s?'none':'#3A3A44','stroke-width':3,'stroke-dasharray':s?'':'8 7'},S1);
  const l=sv('text',{x:tx0+i*tw+tw/2,y:ty0+38,'text-anchor':'middle','font-size':22,fill:'#6A6A72'},S1); l.textContent="’"+String(y).slice(2);
  const v=sv('text',{x:tx0+i*tw+tw/2,y:ty0-14,'text-anchor':'middle','font-size':26,fill:s?'#fff':'#55555F'},S1); v.textContent=s?s[1]:'?'; return {r,v,s,i};});
const yl1=sv('text',{x:tx0,y:ty0-th-40,'font-size':24,fill:'#8E8E96'},S1); yl1.textContent='REC YARDS BY SEASON';
const stamp1=div('abs big rd','CAREER ENDED<br>JUNE 2013',E1,{left:'420px',top:'820px',fontSize:'70px',background:'rgba(5,5,6,.85)',textAlign:'center',border:'6px solid #FF4B3E',padding:'6px 18px',borderRadius:'12px',transformOrigin:'50% 50%'});
const nv1=div('pill','NEVER PLAYED ANOTHER DOWN',E1,{left:'210px',top:'1260px',background:'#fff',color:'#050506',fontSize:'40px'});
const ah1=div('abs','',E1,{left:'60px',top:'520px'}); ah1.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${nlH('ne',90)}<div><div class="big" style="font-size:56px">AARON HERNANDEZ · TE</div><div class="osw mut" style="font-size:26px">3 SEASONS · 1,956 YDS · 18 TD</div></div></div>`;
function rStop(t){hdrIn(1,t); fadeUp(ah1,t,CUT[1]+.15);
  BAR1.forEach(b=>{if(b.s){const g=eOut(prog(t,CUT[1]+.2+b.i*.15,CUT[1]+.6+b.i*.15)); const h=b.s[1]/ymx*th*g; set(b.r,{y:ty0-h,height:h}); set(b.v,{y:ty0-h-14,opacity:g});}
    else{const on=t>=K.arr+.6+(b.i-3)*.06; const h=th*.55; set(b.r,{y:ty0-h,height:h,opacity:on?1:0}); set(b.v,{y:ty0-h-14,opacity:on?1:0});}});
  show([stamp1],t>=K.arr-.05); popIn(stamp1,t,K.arr-.05,{from:1.6}); stamp1.style.transform+=' rotate(-6deg)';
  show([nv1],t>=K.never-.05); popIn(nv1,t,K.never-.05,{from:1.4});
  E1.style.transform=`scale(${1+(t-CUT[1])*.0015})`;}
for(let i=0;i<3;i++)sfx(CUT[1]+.2+i*.15,'pop',.35); sfx(K.arr-.05,'thump',.85); for(let i=0;i<10;i++)sfx(K.arr+.6+i*.06,'click',.15); sfx(K.never-.05,'thump',.5);

/* ---------- 2 TALENT ---------- */
const E2=CH[2];
const LB=DATA.young.map(([n,y,ab],i)=>{const me=n=='Aaron Hernandez', gr=n=='Rob Gronkowski';
  const d=div('abs','',E2,{left:'60px',top:(560+i*150)+'px',width:'960px'});
  d.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${nlH(ab,84)}<div style="flex:1"><div class="osw" style="font-size:30px;${me?'color:#0CF5F9':gr?'color:#fff':'color:#8E8E96'}">${n.toUpperCase()}</div><div style="display:flex;align-items:center;gap:14px"><span class="bar" style="height:40px;border-radius:8px;display:inline-block;background:${me?'#0CF5F9':gr?'#fff':'#3A3A44'}"></span><span class="big" style="font-size:44px">${y.toLocaleString('en-US')}</span></div></div></div>`; d._b=d.querySelector('.bar'); d._y=y; d._me=me; d._gr=gr; return d;});
const ring2=div('pill','ONLY 1 TE HAD MORE THAT YOUNG',E2,{left:'60px',top:'1340px',background:'var(--cy)',color:'#050506',fontSize:'38px'});
const gr2=div('pill','EVEN GRONK HAD FEWER',E2,{left:'60px',top:'1340px',background:'#fff',color:'#050506',fontSize:'38px'});
function rTal(t){hdrIn(2,t);
  LB.forEach((d,i)=>{const t0=K.thr+.2+i*.12; show([d],t>=t0); fadeUp(d,t,t0,.3,20); d._b.style.width=(600*d._y/2100*eOut(prog(t,t0,t0+.6)))+'px';
    d.style.opacity=t>=K.gronk-.05&&!(d._me||d._gr)?.35:d.style.opacity;});
  show([ring2],t>=K.since-.05&&t<K.gronk-.05); popIn(ring2,t,K.since-.05,{from:1.3});
  show([gr2],t>=K.gronk-.05); popIn(gr2,t,K.gronk-.05,{from:1.3});
  E2.style.transform=`scale(${1+(t-CUT[2])*.0015})`;}
for(let i=0;i<5;i++)sfx(K.thr+.2+i*.12,'pop',.3); sfx(K.since-.05,'thump',.6); sfx(K.gronk-.05,'thump',.6);

/* ---------- 3 COMPS ---------- */
const E3=CH[3];
const FACE={'Jason Witten':'jason-witten.png','Antonio Gates':'antonio-gates.png','Rob Gronkowski':'rob-gronkowski.png','Travis Kelce':'travis-kelce.png','Jermichael Finley':'jermichael-finley.png','Jordan Reed':'jordan-reed.jpg'};
const STAR=['Jason Witten','Antonio Gates','Rob Gronkowski','Travis Kelce'], FIZ=['Jermichael Finley','Jordan Reed'];
const CMP=DATA.comps.map(([n,fy,ns,ab,p],i)=>{const d=div('abs','',E3,{left:(60+(i%4)*242)+'px',top:(540+Math.floor(i/4)*124)+'px',width:'230px',height:'112px',borderRadius:'14px',background:'#101014',boxSizing:'border-box',border:'3px solid #26262C',display:'flex',alignItems:'center',gap:'8px',padding:'0 10px'});
  d.innerHTML=(FACE[n]?face(FACE[n],72,'#26262C'):nlH(ab,64))+`<div><div class="big" style="font-size:30px;line-height:1.05;white-space:nowrap">${n.split(' ').slice(-1)[0].toUpperCase()}</div><div class="osw mut" style="font-size:17px;white-space:nowrap">${ns} MORE SEASONS</div></div>`; d._n=n; d._fy=fy; return d;});
const pathL=div('abs','',E3,{left:'60px',top:'1300px',width:'960px'}); pathL.innerHTML='<div class="osw" style="font-size:30px;text-align:center">EACH SIM = ONE OF THESE <span class="cy">REAL CAREER PATHS</span>,<br>SCALED TO HIS LEVEL · INJURIES · SLUMPS · RETIREMENT</div>';
function rCmp(t){hdrIn(3,t);
  CMP.forEach((d,i)=>{const t0=CUT[3]+.2+i*.06; show([d],t>=t0); popIn(d,t,t0,{from:.5});
    const st=STAR.indexOf(d._n), fz=FIZ.indexOf(d._n);
    const on=(st>=0&&t>=K.names+st*.6)||(fz>=0&&t>=K.finley+fz*1.1);
    d.style.borderColor=on?(st>=0?'#0CF5F9':'#FF4B3E'):'#26262C';
    if(t>=K.every){const R=rng(Math.floor((t-K.every)*3)); d.style.opacity=R()<.28?1:.35; if(Math.floor((t-K.every)*3)%23==i)d.style.borderColor='#0CF5F9';}});
  show([pathL],t>=K.every); fadeUp(pathL,t,K.every);
  E3.style.transform=`scale(${1+(t-CUT[3])*.001})`;}
for(let i=0;i<23;i++)sfx(CUT[3]+.2+i*.06,'click',.15); STAR.forEach((s,i)=>sfx(K.names+i*.6,'pop',.4)); FIZ.forEach((s,i)=>sfx(K.finley+i*1.1,'thump',.45)); sfx(K.every,'whoosh',.35);

/* ---------- 4 HONEST ---------- */
const E4=CH[4], S4=E4._svg;
const hx0=110,hx1=970,hy=1000;
const hx=p=>hx0+p*(hx1-hx0);
sv('rect',{x:hx(.25),y:hy-150,width:hx(.75)-hx(.25),height:300,rx:14,fill:'rgba(12,245,249,.10)',stroke:'#0CF5F9','stroke-width':3,'stroke-dasharray':'10 8'},S4);
sv('line',{x1:hx0,x2:hx1,y1:hy,y2:hy,stroke:'#3A3A44','stroke-width':4},S4);
[['0%',0],['25%',.25],['50%',.5],['75%',.75],['100%',1]].forEach(([s,p])=>{const a=sv('text',{x:hx(p),y:hy+200,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},S4);a.textContent=s;});
const mh=sv('text',{x:hx(.5),y:hy-170,'text-anchor':'middle','font-size':28,fill:'#0CF5F9'},S4); mh.textContent='MIDDLE HALF OF THE FORECAST';
const xl4=sv('text',{x:hx1,y:hy+240,'text-anchor':'end','font-size':24,fill:'#8E8E96'},S4); xl4.textContent='WHERE THE REAL CAREER LANDED →';
const DT=DATA.comps.map(([n,fy,ns,ab,p],i)=>{const inn=p>.25&&p<.75; const c=sv('circle',{cx:hx(p),cy:hy+((i%5)-2)*48,r:0,fill:inn?'#0CF5F9':'#8E8E96',stroke:'#050506','stroke-width':3},S4); return {c,inn};});
const n4=div('abs','',E4,{left:'60px',top:'540px'}); n4.innerHTML='<div class="big cy" style="font-size:120px">11 <span class="mut" style="font-size:60px">OF 23</span></div><div class="osw mut" style="font-size:26px;letter-spacing:2px">LANDED IN THE MIDDLE HALF</div>';
const ex4=div('pill','EXPECTED: ~11.5 ✓',E4,{left:'560px',top:'1300px',background:'#fff',color:'#050506',fontSize:'40px'});
function rHon(t){hdrIn(4,t);
  DT.forEach((d,i)=>{const p=back(prog(t,K.test+.4+i*.07,K.test+.7+i*.07)); set(d.c,{r:Math.max(0,p)*18, opacity:t>=K.eleven&&!d.inn?.35:1});});
  show([n4],t>=K.eleven-.05); popIn(n4,t,K.eleven-.05,{from:1.3});
  show([ex4],t>=K.expect-.05); popIn(ex4,t,K.expect-.05,{from:1.4});
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
for(let i=0;i<23;i++)sfx(K.test+.4+i*.07,'click',.15); sfx(K.eleven-.05,'thump',.7); sfx(K.expect-.05,'ding',.4);

/* ---------- 5 / 6 HISTOGRAM ---------- */
function mkHist(E,S){const HB=DATA.hist, mx=Math.max(...HB), x0=100,x1=990,y0=1200,h=480, bw=(x1-x0)/HB.length;
  const B=HB.map((v,i)=>({v,i,r:sv('rect',{x:x0+i*bw+2,width:bw-4,y:y0,height:0,rx:4,fill:'#3A3A44'},S)}));
  const ax=sv('g',{},S); [0,5,10,15].forEach(k=>{const a=sv('text',{x:x0+k*bw,y:y0+38,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax);a.textContent=k?k+'K':'0';});
  const xl=sv('text',{x:x1,y:y0+76,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax); xl.textContent='CAREER RECEIVING YARDS →';
  return {B,x0,bw,y0,h,mx,draw(p,col){B.forEach(b=>{const hh=b.v/mx*h*p; set(b.r,{y:y0-hh,height:hh,fill:col(b.i)});});}};}
const E5=CH[5], S5=E5._svg; const H5=mkHist(E5,S5);
const cnt5=div('abs','',E5,{left:'60px',top:'540px'}); cnt5.innerHTML='<div class="big" style="font-size:80px">0</div><div class="osw mut" style="font-size:24px;letter-spacing:2px">SIMULATED CAREERS</div>';
const typ5=div('abs','',E5,{left:'470px',top:'540px',width:'550px',textAlign:'right'}); typ5.innerHTML='<div class="osw mut" style="font-size:24px;letter-spacing:2px">TYPICAL CAREER</div><div class="big cy" style="font-size:80px">~6,000 YDS</div><div class="big" style="font-size:52px">49 TD · 10 SEASONS</div>';
const mline=sv('line',{x1:H5.x0+6*H5.bw,x2:H5.x0+6*H5.bw,y1:H5.y0,y2:H5.y0-H5.h-30,stroke:'#0CF5F9','stroke-width':5,'stroke-dasharray':'12 8'},S5);
const gd5=div('pill','A REALLY GOOD CAREER',E5,{left:'300px',top:'1320px',background:'var(--cy)',color:'#050506',fontSize:'40px'});
function rRun(t){hdrIn(5,t);
  const g=eOut(prog(t,K.c5+.3,K.typ)); H5.draw(g,()=> '#3A3A44'); cnt5.querySelector('.big').textContent=Math.round(1e5*g).toLocaleString('en-US'); fadeUp(cnt5,t,CUT[5]+.2);
  show([typ5],t>=K.typ+.4); popIn(typ5,t,K.typ+.4,{from:1.2}); mline.style.display=t>=K.typ+.4?'inline':'none';
  show([gd5],t>=K.good-.05); popIn(gd5,t,K.good-.05,{from:1.4});
  E5.style.transform=`scale(${1+(t-CUT[5])*.0015})`;}
sfx(K.c5+.3,'riser',.3,1.6); for(let i=0;i<14;i++)sfx(K.c5+.3+i*.12,'click',.12); sfx(K.typ+.4,'thump',.7); sfx(K.good-.05,'ding',.35);

const E6=CH[6], S6=E6._svg; const H6=mkHist(E6,S6);
const gl=H6.x0+9.286*H6.bw; const gline=sv('line',{x1:gl,x2:gl,y1:H6.y0,y2:H6.y0-H6.h-40,stroke:'#fff','stroke-width':5},S6);
const gT=div('abs','',E6,{left:(gl-330)+'px',top:'640px',width:'320px',textAlign:'right'}); gT.innerHTML=`<div style="display:flex;align-items:center;gap:10px;justify-content:flex-end"><div><div class="osw" style="font-size:24px">GRONK’S CAREER</div><div class="big" style="font-size:54px">9,286</div></div>${face('rob-gronkowski.png',80,'#fff')}</div>`;
const p6=div('abs','',E6,{left:'680px',top:'540px',width:'340px',textAlign:'right'}); p6.innerHTML='<div class="osw mut" style="font-size:24px;letter-spacing:2px">10,000+ YARDS</div><div class="big cy" style="font-size:110px">1 IN 6</div>';
const rec6=div('card','',E6,{left:'60px',top:'1305px',width:'960px',height:'124px',padding:'0 24px',background:'#101014',border:'4px solid #0CF5F9',display:'flex',alignItems:'center',gap:'20px'});
rec6.innerHTML=`<div style="display:flex;align-items:center;gap:20px;height:100%">${face('antonio-gates.png',80,'#0CF5F9')}<div style="flex:1"><div class="osw" style="font-size:28px;white-space:nowrap">BREAKS GATES’ TE RECORD · <span class="cy">116 TD</span></div></div><div class="big cy" style="font-size:80px">2%</div></div>`;
function rCeil(t){hdrIn(6,t);
  const hl=t>=K.club-.05; H6.draw(eOut(prog(t,CUT[6]+.1,CUT[6]+.6)),i=>hl&&i>=10?'#0CF5F9':'#3A3A44');
  show([p6],t>=K.one6-.05); popIn(p6,t,K.one6-.05,{from:1.3});
  const tg=WTs('gronk',K.one6,'grunt'); gline.style.display=t>=tg-.05?'inline':'none'; show([gT],t>=tg-.05); popIn(gT,t,tg-.05,{from:1.3});
  show([rec6],t>=K.p2-.05); popIn(rec6,t,K.p2-.05,{from:.7});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0015})`;}
sfx(K.one6-.05,'thump',.7); sfx(WTs('gronk',K.one6,'grunt')-.05,'pop',.5); sfx(K.club-.05,'sparkle',.4); sfx(K.p2-.05,'thump',.7);

/* ---------- 7 RINGS ---------- */
const E7=CH[7], S7=E7._svg;
const LT=[2014,2016,2018].map((y,i)=>{const g=lombardi(S7,250+i*290,800,1.5); const l=div('abs big','',E7,{left:(150+i*290)+'px',top:'1040px',width:'200px',textAlign:'center',fontSize:'56px'}); l.textContent=y+'';
  const s=div('abs osw mut','',E7,{left:(150+i*290)+'px',top:'1105px',width:'200px',textAlign:'center',fontSize:'22px'}); s.textContent='SEASON'; return {g,l,s,i};});
const ctr=div('abs','',E7,{left:'60px',top:'1200px',width:'960px'});
ctr.innerHTML=`<div class="osw mut" style="font-size:24px;letter-spacing:2px;margin-bottom:8px">HIS CONTRACT · SIGNED AUG 2012</div><div style="position:relative;height:56px;background:#16161B;border-radius:12px;overflow:hidden"><div id="cbar" style="position:absolute;left:0;top:0;bottom:0;background:${NAVY};border-right:6px solid #0CF5F9"></div><div class="osw" style="position:absolute;left:18px;top:10px;font-size:28px">2013 → 2018</div></div>`;
const ne7=div('abs','',E7,{left:'60px',top:'540px'}); ne7.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${nlH('ne',100)}<div class="big" style="font-size:72px">3 MORE <span class="cy">RINGS</span></div></div>`;
function rRing(t){hdrIn(7,t); fadeUp(ne7,t,CUT[7]+.2);
  LT.forEach(L=>{const t0=WTs('super',K.c7)-.2+L.i*.3; const p=back(prog(t,t0,t0+.35)); set(L.g,{transform:`translate(${250+L.i*290} 800) scale(${1.5*Math.max(0,p)})`}); show([L.l,L.s],t>=t0+.1); fadeUp(L.l,t,t0+.1);});
  show([ctr],t>=K.contract-.05); fadeUp(ctr,t,K.contract-.05); ctr.querySelector('#cbar').style.width=(100*eOut(prog(t,K.contract,K.contract+1.2)))+'%';
  E7.style.transform=`scale(${1+(t-CUT[7])*.002})`;}
for(let i=0;i<3;i++)sfx(WTs('super',K.c7)-.2+i*.3,'ding',.4); sfx(K.contract,'whoosh',.3);

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const v1=div('abs','',E8,{left:'60px',top:'540px',width:'960px'}); v1.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">MOST LIKELY</div><div class="big" style="font-size:96px">A REALLY GOOD TE.</div>';
const v2=div('abs','',E8,{left:'60px',top:'760px',width:'960px'}); v2.innerHTML='<div class="osw mut" style="font-size:28px;letter-spacing:2px">BEST 1 IN 6</div><div class="big cy" style="font-size:96px">HALL OF FAME TALK.</div>';
const v3=div('abs big rd','STOPPED AT 23.',E8,{left:'60px',top:'990px',fontSize:'120px'});
const ah8=div('abs','',E8,{left:'640px',top:'1000px',width:'400px',height:'440px',background:'url(img/st_ah.png) center bottom/contain no-repeat',opacity:.9});
const poll=div('card','',E8,{left:'140px',top:'560px',width:'800px',background:'#0E0E12',border:'4px solid #26262C',padding:'40px 40px'});
poll.innerHTML=`<div style="text-align:center">${nlH('ne',150)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:10px">YOUR CALL · COMMENT BELOW</div>`+['HALL OF FAMER','JUST GOOD'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:70px;text-align:center;border-radius:60px;padding:12px 0;${i===0?'background:var(--cy);color:#050506':'border:4px solid #fff'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t);
  const a=t<K.poll-.05; show([v1,v2,v3,ah8],a); E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v1,t,K.c8); show([v2],t>=K.best-.05); popIn(v2,t,K.best-.05,{from:1.2}); show([v3],t>=K.stop-.05); popIn(v3,t,K.stop-.05,{from:1.15});
    show([ah8],t>=K.c8+.2); {const p=eOut(prog(t,K.c8+.2,K.c8+.6)); ah8.style.transform=`translateX(${(1-p)*480}px)`;}}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,[WTs('hall',K.poll),WTs('just',K.poll)][i]-.05,{from:.4})); poll.style.transform+=` scale(${1+(t-K.poll)*.006})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0012})`;}
sfx(K.c8,'whoosh',.3); sfx(K.best-.05,'thump',.6); sfx(K.stop-.05,'thump',.85); sfx(K.poll-.05,'whoosh',.5); sfx(WTs('hall',K.poll)-.05,'pop',.5); sfx(WTs('just',K.poll)-.05,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rStop,rTal,rCmp,rHon,rRun,rCeil,rRing,rVer];
