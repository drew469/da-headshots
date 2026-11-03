/* ===================== chapters (Super Bowl LI · 28-3) ===================== */
const CI=s=>{const i=CUES.findIndex(c=>c.text.toLowerCase().includes(s.toLowerCase())); if(i<0)throw new Error('cue not found: '+s); return i;};
const CT=s=>C(CI(s));
const WTs=(w,after,alt)=>{const f=x=>WORDS.find(y=>y.w.toLowerCase().replace(/[^a-z0-9]/g,'').startsWith(x.toLowerCase())&&y.a>=after); const r=f(w)||(alt&&f(alt)); return r?r.a:after;};
const NL=ab=>`logos/nfl-${ab.toLowerCase()}.png`;
const nlH=(ab,sz)=>`<img class="lg" src="${NL(ab)}" style="width:${sz}px;height:${sz}px">`;
const NAVY='#002244', NRED='#C60C30', ARED='#A71930';
const K={sim:CT('I simulated it'), win:CT('The Patriots win just'), one:CT('About 1 in'), show:CT('Let me show'),
  c1:CT('First, I pulled'), more:CT('More than'), each:CT('Each one'),
  c2:CT('Then I adjusted'), fal:CT('The Falcons had'), pats:CT('allowed the fewest'),
  c3:CT('Is the model'), test:CT('I tested'), gave:CT('When it gave'),
  c4:CT('So I started'), won:CT('Patriots won 1,834'), avg:CT('With two average'),
  c5:CT('real history'), since:CT('Since 2009,'), three:CT('3 came back'),
  c6:CT('who made it'), sc25:CT('scored 25 straight'), only6:CT('Only 6%'), zero:CT('scored zero'), p13:CT('13%'),
  c7:CT('killer moment'), up8:CT('Atlanta was up'), sack:CT('Then a sack'), drove:CT('Brady drove'),
  c8:CT("Patriots' half"), door:CT("It's the greatest"), poll:CT('Comeback or choke')};
const CUT=[0,K.c1-.05,K.c2-.05,K.c3-.05,K.c4-.05,K.c5-.05,K.c6-.05,K.c7-.05,K.c8-.05];
const END=CUES[CUES.length-1].b+1.1;
const T={end:END};
const HDR=[null,
 ['01','Every drive since 2009.','sorted by score · clock · field position'],
 ['02','Adjust for the teams.','2016 regular season'],
 ['03','Is it honest?','3,000 real game situations · 2009–2025'],
 ['04','100,000 replays.','from 28-3 · 8:31 left in the 3rd'],
 ['05','Real history agrees.','down 25+ in the second half · since 2009'],
 ['06','Who made it happen?','points scored after 28-3 · rest of regulation'],
 ['07','The killer moment.','Patriots’ win chance at every real possession'],
 ['08','The verdict.','']];
const chs=document.getElementById('chs');
const prg=document.getElementById('prog'); for(let i=0;i<8;i++){const x=document.createElement('i');prg.appendChild(x);}
const CH=[]; for(let i=0;i<CUT.length;i++){const d=div('ch','',chs);CH.push(d);
  if(HDR[i]){const h=div('hdr',`<div class="n">${HDR[i][0]}</div><div class="t">${HDR[i][1]}</div><div class="s">${HDR[i][2]}</div>`,d);d._h=h;}
  const s=sv('svg',{width:1080,height:1920,viewBox:'0 0 1080 1920',style:'position:absolute;left:0;top:0'});d.appendChild(s);d._svg=s;}
CUT.slice(1).forEach(c=>{sfx(c-.18,'whip',.55);});
const hdrIn=(k,t)=>fadeUp(CH[k]._h,t,CUT[k]+.05,.3);
function football(parent,x,y,s=1,fill='#7A4A22'){const g=sv('g',{transform:`translate(${x} ${y}) scale(${s})`},parent);
  const b=sv('ellipse',{rx:38,ry:22,fill,stroke:'#050506','stroke-width':3},g);
  sv('line',{x1:-14,x2:14,y1:0,y2:0,stroke:'#fff','stroke-width':3},g);
  for(let i=-2;i<=2;i++)sv('line',{x1:i*6,x2:i*6,y1:-6,y2:6,stroke:'#fff','stroke-width':2.5},g);
  sv('path',{d:'M-30,-12 Q-26,0 -30,12',stroke:'#fff','stroke-width':2.5,fill:'none'},g); sv('path',{d:'M30,-12 Q26,0 30,12',stroke:'#fff','stroke-width':2.5,fill:'none'},g);
  g._b=b; return g;}
const board=(ne,atl,clk,sz=1)=>`<div style="display:flex;align-items:center;gap:${22*sz}px;background:#101014;border:4px solid #26262C;border-radius:22px;padding:${16*sz}px ${26*sz}px">${nlH('atl',110*sz)}<span class="big rd" style="font-size:${120*sz}px">${atl}</span><span class="big mut" style="font-size:${70*sz}px">–</span><span class="big" style="font-size:${120*sz}px">${ne}</span>${nlH('ne',110*sz)}<div style="margin-left:auto;text-align:right"><div class="osw mut" style="font-size:${24*sz}px;letter-spacing:2px">SUPER BOWL LI</div><div class="big cy" style="font-size:${56*sz}px">${clk}</div></div></div>`;

/* ---------- 0 HOOK ---------- */
const H=CH[0], Hs=H._svg;
const hCirc=div('abs','',H,{left:'330px',top:'760px',width:'640px',height:'640px',borderRadius:'50%',background:NAVY,boxShadow:`inset 0 0 0 12px ${NRED}`});
const hWm=div('abs','',H,{left:'440px',top:'870px',width:'420px',height:'420px',background:`url(${NL('ne')}) center/contain no-repeat`,opacity:.16});
const hSt=div('abs','',H,{left:'360px',top:'700px',width:'600px',height:'720px',background:'url(img/st_brady_ne_full.png) center bottom/contain no-repeat'});
const h1=div('abs big','28-3:<br>GREATEST COMEBACK<br><span class="rd">OR BIGGEST CHOKE?</span>',H,{left:'54px',top:'292px',fontSize:'96px'});
const hAtl=div('abs','',H,{left:'50px',top:'800px'}); hAtl.innerHTML=nlH('atl',180);
const hMk=div('abs mk cy','Super Bowl LI',H,{left:'40px',top:'1010px',fontSize:'52px'});
const hSc=div('abs','',H,{left:'60px',top:'1120px'}); hSc.innerHTML='<div class="big" style="font-size:100px;line-height:1"><span class="rd">28</span>-3</div><div class="osw" style="font-size:26px;letter-spacing:2px">8:31 LEFT · 3RD QTR</div>';
const hB=div('abs big','I SIMULATED IT<br><span class="cy">100,000 TIMES.</span>',H,{left:'54px',top:'292px',fontSize:'112px'});
const hBb=div('abs','',H,{left:'60px',top:'560px',width:'960px'}); hBb.innerHTML=board(3,28,'8:31 3Q');
const hC=div('abs big cy','1.8%',H,{left:'54px',top:'300px',fontSize:'280px'});
const hCs=div('abs osw','of simulations: <span class="cy">the Patriots win</span>',H,{left:'60px',top:'610px',fontSize:'40px'});
const fbG=sv('g',{},Hs); const FB=[]; for(let i=0;i<55;i++){const x=120+(i%9)*105, y=740+Math.floor(i/9)*92; FB.push(football(fbG,x,y,.95));}
const hC1=div('pill','≈ 1 IN 55',H,{left:'700px',top:'1330px',background:'var(--cy)',color:'#050506',fontSize:'50px'});
function rHook(t){
  const a=t<K.sim-.05; show([h1,hAtl,hMk,hSc],a); show([hCirc,hWm,hSt],t<K.win-.05);
  if(a){const pc=back(prog(t,.02,.42)); hCirc.style.transform=`scale(${Math.max(0,pc)})`; hWm.style.transform=hCirc.style.transform; hWm.style.opacity=.16*prog(t,.2,.5);
    const ps=eOut(prog(t,.12,.6)); hSt.style.transform=`translateY(${(1-ps)*420}px) scale(${1+t*.012})`; hSt.style.opacity=ps>0?1:0;
    fadeUp(h1,t,.05,.3,40); popIn(hAtl,t,.6,{from:.3}); popIn(hMk,t,1.1,{from:1.3}); hMk.style.transform+=' rotate(-7deg)'; popIn(hSc,t,1.5,{from:1.4});}
  const b=t>=K.sim-.05&&t<K.win-.05; show([hB,hBb],b);
  if(b){fadeUp(hB,t,K.sim-.05,.3); popIn(hBb,t,K.sim+.3,{from:.6});
    const n=Math.floor((t-K.sim)*9); hBb.querySelector('.cy').textContent=['8:31 3Q','SIM #'+(1+n*4711%99999).toLocaleString('en-US')][n>0?1:0];}
  const c=t>=K.win-.05; show([hC,hCs,hC1],c); fbG.style.display=c?'inline':'none';
  if(c){popIn(hC,t,K.win-.05,{from:1.2}); hC.textContent=(1.8*eOut(prog(t,K.win,K.win+.9))).toFixed(1)+'%'; fadeUp(hCs,t,K.win+.25);
    FB.forEach((f,i)=>{const p=back(prog(t,K.win+.1+i*.015,K.win+.35+i*.015)); const x=120+(i%9)*105, y=740+Math.floor(i/9)*92;
      const hit=i===54&&t>=K.one; const s=.95*Math.max(0,p)*(hit?1+.4*(1-eOut(prog(t,K.one,K.one+.35))):1); set(f,{transform:`translate(${x} ${y}) scale(${s})`,opacity:p>0?1:0});
      set(f._b,{fill:hit?'#0CF5F9':(t>=K.one?'#3A3A44':'#7A4A22')});});
    hC1.style.display=t>=K.one+.3?'block':'none'; popIn(hC1,t,K.one+.3,{from:1.5});
    H.style.transform=`scale(${1+Math.max(0,t-K.show)*.005})`;}
}
sfx(.05,'whoosh',.5); sfx(.25,'thump',.6); sfx(.6,'pop',.45); sfx(1.1,'pop',.4); sfx(1.5,'thump',.6);
sfx(K.sim-.05,'whoosh',.5); for(let i=0;i<14;i++)sfx(K.sim+.3+i*.11,'click',.15);
sfx(K.win-.05,'thump',.75); for(let i=0;i<16;i++)sfx(K.win+.1+i*.05,'click',.16); sfx(K.one,'ding',.45); sfx(K.one+.3,'pop',.5); sfx(K.show,'riser',.25,1.2);

/* ---------- 1 DRIVES ---------- */
const E1=CH[1], S1=E1._svg;
const n1=div('abs','',E1,{left:'60px',top:'540px'}); n1.innerHTML='<div class="big cy" style="font-size:150px">0</div><div class="osw mut" style="font-size:28px;letter-spacing:2px">REAL NFL DRIVES · 2009–2025</div>';
// field
const fx0=80,fx1=1000,fy0=880,fy1=1180; const fld=sv('g',{},S1);
sv('rect',{x:fx0,y:fy0,width:fx1-fx0,height:fy1-fy0,rx:16,fill:'#0F2A18',stroke:'#2D5A3A','stroke-width':4},fld);
for(let i=1;i<10;i++){const x=fx0+i*(fx1-fx0)/10; sv('line',{x1:x,x2:x,y1:fy0,y2:fy1,stroke:'#2D5A3A','stroke-width':3},fld); const tx=sv('text',{x,y:fy1-14,'text-anchor':'middle','font-size':22,fill:'#4F7F5C'},fld); tx.textContent=i<=5?i*10:(10-i)*10;}
const darr=sv('path',{fill:'none',stroke:'#0CF5F9','stroke-width':8,'stroke-linecap':'round'},S1); const dball=football(S1,0,0,.8);
const CHIPS=['SCORE','CLOCK','FIELD POSITION'].map((s,i)=>div('pill',s,E1,{left:[60,300,540][i]+'px',top:'1250px',background:'#16161B',color:'#fff',border:'3px solid #0CF5F9',fontSize:'36px'}));
function rDrv(t){hdrIn(1,t);
  fadeUp(n1,t,CUT[1]+.15); n1.querySelector('.big').textContent=Math.round(104557*eOut(prog(t,K.more-.2,K.more+1.2))).toLocaleString('en-US');
  set(fld,{opacity:prog(t,CUT[1]+.2,CUT[1]+.5)});
  const k=Math.floor((t-CUT[1])/1.1), q=((t-CUT[1])%1.1)/1.1, R=rng(k+5); const s0=.1+R()*.35, len=.15+R()*.5, y=fy0+60+R()*(fy1-fy0-140);
  const xa=fx0+s0*(fx1-fx0), xb=xa+len*eOut(clamp(q*1.4))*(fx1-fx0); set(darr,{d:`M${xa},${y} L${Math.min(xb,fx1-20)},${y}`}); set(dball,{transform:`translate(${Math.min(xb,fx1-20)} ${y}) scale(.8)`});
  const ws=[WTs('score',K.each),WTs('clock',K.each),WTs('where',K.each)];
  CHIPS.forEach((c,i)=>{show([c],t>=ws[i]-.05); popIn(c,t,ws[i]-.05,{from:1.4});});
  E1.style.transform=`scale(${1+(t-CUT[1])*.002})`;}
sfx(K.more-.2,'riser',.3,1.4); for(let i=0;i<5;i++)sfx(CUT[1]+i*1.1,'whoosh',.18); ['score','clock','where'].forEach(w=>sfx(WTs(w,K.each)-.05,'pop',.5));

/* ---------- 2 TEAMS ---------- */
const E2=CH[2];
const tcard=(ab,col,big,lab,x)=>{const d=div('card','',E2,{left:x+'px',top:'560px',width:'470px',background:'#101014',border:`4px solid ${col}`,textAlign:'center'}); d.innerHTML=`${nlH(ab,170)}<div class="big" style="font-size:96px;margin-top:10px;color:${col==NAVY?'#fff':'#fff'}">${big}</div><div class="osw" style="font-size:30px;letter-spacing:1px;color:${col==NAVY?'#0CF5F9':'#FF4B3E'}">${lab}</div>`; return d;};
const cA=tcard('atl',ARED,'540 PTS','#1 OFFENSE IN FOOTBALL',55), cN=tcard('ne','#0CF5F9','250 PTS','FEWEST ALLOWED IN FOOTBALL',555);
const ryan=div('abs','',E2,{left:'60px',top:'930px',width:'440px',height:'500px',background:'url(img/st_ryan.png) center bottom/contain no-repeat'});
const brd2=div('abs','',E2,{left:'560px',top:'930px',width:'440px',height:'500px',background:'url(img/st_brady_ne_b.png) center bottom/contain no-repeat'});
function rTeam(t){hdrIn(2,t);
  show([cA,ryan],t>=K.fal-.05); popIn(cA,t,K.fal-.05,{from:.6}); {const p=eOut(prog(t,K.fal,K.fal+.4)); ryan.style.transform=`translateY(${(1-p)*500}px)`;}
  show([cN,brd2],t>=K.pats-.05); popIn(cN,t,K.pats-.05,{from:.6}); {const p=eOut(prog(t,K.pats,K.pats+.4)); brd2.style.transform=`translateY(${(1-p)*500}px)`;}
  E2.style.transform=`scale(${1+(t-CUT[2])*.002})`;}
sfx(K.fal-.05,'thump',.6); sfx(K.fal,'whoosh',.3); sfx(K.pats-.05,'thump',.6); sfx(K.pats,'whoosh',.3);

/* ---------- 3 HONEST ---------- */
const E3=CH[3], S3=E3._svg;
const px=v=>160+v*800, py=v=>1330-v*720;
const ax3=sv('g',{},S3);
[0,.2,.4,.6,.8,1].forEach(v=>{sv('line',{x1:px(0),x2:px(1),y1:py(v),y2:py(v),stroke:'#1E1E24','stroke-width':2},ax3);
  const a=sv('text',{x:px(0)-14,y:py(v)+8,'text-anchor':'end','font-size':24,fill:'#6A6A72'},ax3); a.textContent=Math.round(v*100)+'%';
  sv('line',{y1:py(0),y2:py(1),x1:px(v),x2:px(v),stroke:'#1E1E24','stroke-width':2},ax3);
  const b=sv('text',{x:px(v),y:py(0)+36,'text-anchor':'middle','font-size':24,fill:'#6A6A72'},ax3); b.textContent=Math.round(v*100)+'%';});
const xl=sv('text',{x:px(1),y:py(0)+74,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax3); xl.textContent='WHAT THE SIM SAID →';
const yl=sv('text',{x:px(0)-10,y:py(1)-22,'font-size':24,fill:'#8E8E96'},ax3); yl.textContent='↑ HOW OFTEN THEY ACTUALLY WON';
sv('line',{x1:px(0),y1:py(0),x2:px(1),y2:py(1),stroke:'#fff','stroke-width':3,'stroke-dasharray':'10 9'},ax3);
const CD=DATA.cal.map(([m,a,n])=>({m,a,n,c:sv('circle',{cx:px(m),cy:py(a),r:0,fill:'#0CF5F9',opacity:.92},S3)}));
const c80=div('abs','',E3,{left:'180px',top:'700px'}); c80.innerHTML='<div class="osw" style="font-size:36px;background:#0E0E12;border:3px solid #0CF5F9;border-radius:16px;padding:10px 20px">SAID <span class="cy">80%</span> → WON <span class="cy">82%</span></div>';
const n3=div('abs','',E3,{left:'600px',top:'1000px',textAlign:'right',width:'400px'}); n3.innerHTML='<div class="big cy" style="font-size:100px">3,000</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">REAL GAME SITUATIONS</div>';
function rHon(t){hdrIn(3,t); set(ax3,{opacity:prog(t,CUT[3]+.1,CUT[3]+.4)});
  show([n3],t>=K.test-.05); popIn(n3,t,K.test-.05,{from:.6}); if(t>=K.test-.05){n3.querySelector('.big').textContent=Math.round(3000*eOut(prog(t,K.test,K.test+1))).toLocaleString('en-US');}
  CD.forEach((d,i)=>{const p=back(prog(t,K.test+.4+i*.15,K.test+.7+i*.15)); set(d.c,{r:Math.max(0,p)*(10+Math.sqrt(d.n)*.9)}); if(i==4&&t>=K.gave+.6)set(d.c,{fill:'#fff'});});
  show([c80],t>=K.gave+.6); popIn(c80,t,K.gave+.6,{from:.5});
  E3.style.transform=`scale(${1+(t-CUT[3])*.0015})`;}
for(let i=0;i<6;i++)sfx(K.test+.4+i*.15,'pop',.3); sfx(K.gave+.6,'ding',.35);

/* ---------- 4 100,000 REPLAYS ---------- */
const E4=CH[4], S4=E4._svg;
const b4=div('abs','',E4,{left:'60px',top:'540px',width:'960px'}); b4.innerHTML=board(3,28,'8:31 3Q',.8);
const cnt4=div('abs','',E4,{left:'60px',top:'760px'}); cnt4.innerHTML='<div class="big" style="font-size:90px">0</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">REPLAYS</div>';
const w4=div('abs','',E4,{left:'560px',top:'760px',width:'460px',textAlign:'right'}); w4.innerHTML=`<div class="osw mut" style="font-size:26px;letter-spacing:2px">PATRIOTS WIN</div><div class="big cy" style="font-size:90px">0</div>`;
const G4=sv('g',{},S4); const SQ=[]; for(let i=0;i<500;i++){const r=sv('rect',{x:80+(i%25)*37.6,y:950+Math.floor(i/25)*16.5,width:30,height:11,rx:3,fill:'#2A2A31'},G4);SQ.push(r);}
const HIT4=new Set([37,121,206,298,333,371,402,455,488]);
const bars4=div('abs','',E4,{left:'60px',top:'1290px',width:'960px'});
bars4.innerHTML=`<div class="osw" style="font-size:28px;display:flex;align-items:center;gap:16px"><span style="width:300px">THESE TWO TEAMS</span><span id="bA" style="height:34px;background:#0CF5F9;border-radius:6px;display:inline-block"></span><span class="cy">1.8%</span></div><div class="osw" style="font-size:28px;display:flex;align-items:center;gap:16px;margin-top:14px"><span style="width:300px" class="mut">TWO AVERAGE TEAMS</span><span id="bB" style="height:34px;background:#8E8E96;border-radius:6px;display:inline-block"></span><span class="mut">0.6%</span></div>`;
function rRun(t){hdrIn(4,t); fadeUp(b4,t,CUT[4]+.15);
  const g=eOut(prog(t,K.c4+1.2,K.won-.1)); show([cnt4,w4],t>=K.c4+.8); fadeUp(cnt4,t,K.c4+.8); fadeUp(w4,t,K.c4+.8);
  cnt4.querySelector('.big').textContent=Math.round(1e5*g).toLocaleString('en-US'); w4.querySelector('.big').textContent=Math.round(1834*g).toLocaleString('en-US');
  SQ.forEach((r,i)=>{const on=g*500>i; set(r,{fill:!on?'#1A1A20':HIT4.has(i)?'#0CF5F9':'#3A3A44'});});
  show([bars4],t>=K.avg-.05); fadeUp(bars4,t,K.avg-.05);
  bars4.querySelector('#bA').style.width=(560*eOut(prog(t,K.avg,K.avg+.5)))+'px'; bars4.querySelector('#bB').style.width=(560*.6/1.8*eOut(prog(t,K.avg+.4,K.avg+.9)))+'px';
  E4.style.transform=`scale(${1+(t-CUT[4])*.0015})`;}
sfx(K.c4+1.2,'riser',.35,2); for(let i=0;i<20;i++)sfx(K.c4+1.2+i*.12,'click',.12); sfx(K.won-.05,'thump',.75); sfx(K.avg,'pop',.4); sfx(K.avg+.4,'pop',.4);

/* ---------- 5 HISTORY ---------- */
const E5=CH[5], S5=E5._svg;
const n5=div('abs','',E5,{left:'60px',top:'540px'}); n5.innerHTML='<div class="big" style="font-size:120px">0</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">TIMES A TEAM TRAILED BY 25+</div>';
const DOT5=[]; for(let i=0;i<730;i++){const c=sv('circle',{cx:95+(i%30)*30.5,cy:760+Math.floor(i/30)*21.5,r:8,fill:'#2A2A31'},S5);DOT5.push(c);}
const HIT5=[[180,'ne','NE · SB LI'],[402,'ind','IND · 2013 PLAYOFFS'],[655,'min','MIN · 2022']];
const lab5=HIT5.map(([i,ab,s],k)=>div('abs','',E5,{left:[60,370,690][k]+'px',top:'1300px',width:'320px'}));
lab5.forEach((d,k)=>{d.innerHTML=`<div style="display:flex;align-items:center;gap:12px">${nlH(HIT5[k][1],70)}<span class="osw" style="font-size:26px">${HIT5[k][2]}</span></div>`;});
const w5=div('abs','',E5,{left:'600px',top:'540px',width:'420px',textAlign:'right'}); w5.innerHTML='<div class="big cy" style="font-size:120px">3</div><div class="osw mut" style="font-size:26px;letter-spacing:2px">CAME BACK TO WIN</div>';
function rHist(t){hdrIn(5,t);
  show([n5],t>=K.since-.05); fadeUp(n5,t,K.since-.05); const g=eOut(prog(t,K.since,WTs('seven',K.since,'730')+.6)); n5.querySelector('.big').textContent=Math.round(730*g);
  DOT5.forEach((c,i)=>{const on=g*730>i; const hit=HIT5.findIndex(h=>h[0]==i); const lit=hit>=0&&t>=K.three+hit*.18;
    set(c,{opacity:on?1:0,fill:lit?'#0CF5F9':(t>=K.three?'#26262C':'#3A3A44'),r:lit?8+8*(1-eOut(prog(t,K.three+hit*.18,K.three+hit*.18+.3)))+4:8});});
  show([w5],t>=K.three-.05); popIn(w5,t,K.three-.05,{from:1.4});
  lab5.forEach((d,k)=>{show([d],t>=K.three+.5+k*.25); popIn(d,t,K.three+.5+k*.25,{from:.5});});
  E5.style.transform=`scale(${1+(t-CUT[5])*.0015})`;}
sfx(K.since,'riser',.3,1.6); sfx(K.three-.05,'thump',.8); for(let k=0;k<3;k++)sfx(K.three+k*.18,'ding',.3);

/* ---------- 6 WHO MADE IT ---------- */
const E6=CH[6], S6=E6._svg;
function hist(parent,arr,x0,y0,w,h,hl,col){const n=31, mx=Math.max(...arr.slice(0,n)), bw=w/n, B=[];
  for(let i=0;i<n;i++){const v=arr[i]||0; B.push({v,i,r:sv('rect',{x:x0+i*bw+1,width:bw-2,y:y0,height:0,rx:2,fill:'#3A3A44'},parent)});}
  return {B,draw(p,on){B.forEach(b=>{const hh=b.v/mx*h*p; set(b.r,{y:y0-hh,height:hh,fill:on&&hl(b.i)?col:'#3A3A44'});});}};}
const ax6=sv('g',{},S6);
const HN=hist(S6,DATA.nepts,90,880,900,220,i=>i>=25,'#0CF5F9'), HA=hist(S6,DATA.atlpts,90,1300,900,220,i=>i==0,'#FF4B3E');
[[880,'PATRIOTS POINTS →'],[1300,'FALCONS POINTS →']].forEach(([y,s])=>{const tx=sv('text',{x:990,y:y+34,'text-anchor':'end','font-size':24,fill:'#8E8E96'},ax6);tx.textContent=s; [0,10,20,30].forEach(v=>{const a=sv('text',{x:90+(v+.5)*900/31,y:y+34,'text-anchor':'middle','font-size':22,fill:'#6A6A72'},ax6);a.textContent=v;});});
const l6a=div('abs','',E6,{left:'60px',top:'540px'}); l6a.innerHTML=`<div style="display:flex;align-items:center;gap:16px">${nlH('ne',90)}<div><div class="osw mut" style="font-size:24px;letter-spacing:2px">SCORE 25+ AFTER 28-3</div><div class="big cy" style="font-size:96px">6%</div></div></div>`;
const l6b=div('abs','',E6,{left:'560px',top:'1000px',width:'460px'}); l6b.innerHTML=`<div style="display:flex;align-items:center;gap:16px;justify-content:flex-end"><div style="text-align:right"><div class="osw mut" style="font-size:24px;letter-spacing:2px">SCORE ZERO AFTER 28-3</div><div class="big rd" style="font-size:96px">13%</div></div>${nlH('atl',90)}</div>`;
function rWho(t){hdrIn(6,t); set(ax6,{opacity:prog(t,CUT[6]+.1,CUT[6]+.4)});
  HN.draw(eOut(prog(t,K.sc25-.2,K.sc25+.5)),t>=K.only6-.05); HA.draw(eOut(prog(t,K.zero-.2,K.zero+.5)),t>=K.p13-.05);
  show([l6a],t>=K.only6-.05); popIn(l6a,t,K.only6-.05,{from:1.3});
  show([l6b],t>=K.p13-.05); popIn(l6b,t,K.p13-.05,{from:1.3});
  E6.style.transform=`scale(${1+(t-CUT[6])*.0015})`;}
sfx(K.sc25-.2,'riser',.25,.8); sfx(K.only6-.05,'thump',.7); sfx(K.zero-.2,'riser',.25,.8); sfx(K.p13-.05,'thump',.7);

/* ---------- 7 KILLER MOMENT ---------- */
const E7=CH[7], S7=E7._svg; const WP=DATA.wp.concat([['OT TD',-1,1]]);
const wx0=135,wx1=985,wy0=1180,wy1=620; const wx=i=>wx0+i*(wx1-wx0)/(WP.length-1), wy=v=>wy0-v*(wy0-wy1);
const ax7=sv('g',{},S7); [0,.25,.5,.75,1].forEach(v=>{sv('line',{x1:wx0,x2:wx1,y1:wy(v),y2:wy(v),stroke:'#1E1E24','stroke-width':2},ax7); const a=sv('text',{x:wx0-14,y:wy(v)+8,'text-anchor':'end','font-size':24,fill:'#6A6A72'},ax7); a.textContent=Math.round(v*100)+'%';});
['28-3','','','','28-12','','ATL @22','','28-28','OT'].forEach((s,i)=>{if(!s)return; const a=sv('text',{x:wx(i),y:wy0+40,'text-anchor':'middle','font-size':22,fill:i==6?'#FF4B3E':'#6A6A72'},ax7); a.textContent=s;});
const wl=sv('path',{fill:'none',stroke:'#0CF5F9','stroke-width':8,'stroke-linejoin':'round','stroke-linecap':'round'},S7); const wd=sv('circle',{r:12,fill:'#fff'},S7);
const atlRing=sv('circle',{cx:wx(6),cy:wy(WP[6][2]),r:22,fill:'none',stroke:'#FF4B3E','stroke-width':6},S7);
const atl93=div('abs','',E7,{left:(wx(6)-230)+'px',top:(wy(WP[6][2])-230)+'px',width:'300px',textAlign:'center'}); atl93.innerHTML=`${nlH('atl',80)}<div class="big rd" style="font-size:90px">93%</div><div class="osw" style="font-size:22px">ATLANTA TO WIN · UP 8 · AT NE 22</div>`;
const PL=['SACK −12','HOLDING','PUNT'].map((s,i)=>div('pill',s,E7,{left:(60+i*300)+'px',top:'1260px',background:'var(--rd)',color:'#fff',fontSize:'40px'}));
const br7=div('abs','',E7,{left:'175px',top:'540px',width:'400px',height:'540px',background:'url(img/st_brady_ne_full.png) center bottom/contain no-repeat'});
const PB=['91-YARD DRIVE · TIED','WON THE COIN TOSS','OT TOUCHDOWN'].map((s,i)=>div('pill',s,E7,{left:'60px',top:(1250+i*0)+'px',background:'var(--cy)',color:'#050506',fontSize:'40px'}));
function rKill(t){hdrIn(7,t); set(ax7,{opacity:prog(t,CUT[7]+.1,CUT[7]+.4)});
  const tdr=K.drove; const tco=WTs('coin',tdr), tnv=WTs('never',tdr);
  const pA=eIO(prog(t,CUT[7]+.3,K.up8+.2)); const nA=6*pA; // up to ATL@22
  const pB=prog(t,tdr,tnv+.4); const n=nA<6?nA:6+3*eIO(pB);
  let d=''; for(let i=0;i<=Math.floor(n);i++)d+=(i?'L':'M')+wx(i)+','+wy(WP[i][2]);
  const fi=Math.floor(n), fr=n-fi; let ex_=wx(fi), ey_=wy(WP[fi][2]); if(fi<WP.length-1&&fr>0){ex_=lerp(wx(fi),wx(fi+1),fr); ey_=lerp(wy(WP[fi][2]),wy(WP[fi+1][2]),fr); d+=`L${ex_},${ey_}`;}
  set(wl,{d}); set(wd,{cx:ex_,cy:ey_});
  const t93=WTs('ninety',K.up8,'93'); atlRing.style.display=t>=t93-.05?'inline':'none'; set(atlRing,{r:22+12*(1-eOut(prog(t,t93,t93+.3)))});
  show([atl93],t>=t93-.05&&t<tdr-.05); popIn(atl93,t,t93-.05,{from:1.4});
  const ws=[WTs('sack',K.sack),WTs('holding',K.sack),WTs('punt',K.sack)]; PL.forEach((p,i)=>{show([p],t>=ws[i]-.05&&t<tdr-.05); popIn(p,t,ws[i]-.05,{from:1.5});});
  show([br7],t>=tdr-.1); {const p=eOut(prog(t,tdr-.1,tdr+.3)); br7.style.transform=`translateX(${-(1-p)*500}px)`;}
  const wb=[tdr,tco-.05,tnv-.05]; PB.forEach((p,i)=>{show([p],t>=wb[i]&&(i==2||t<wb[i+1])); popIn(p,t,wb[i],{from:1.4});});
  E7.style.transform=`scale(${1+(t-CUT[7])*.0006})`;}
sfx(CUT[7]+.3,'riser',.25,2.5); sfx(WTs('ninety',K.up8,'93')-.05,'thump',.75); ['sack','holding','punt'].forEach(w=>sfx(WTs(w,K.sack)-.05,'thump',.6)); sfx(K.drove,'whoosh',.4); sfx(WTs('coin',K.drove)-.05,'pop',.5); sfx(WTs('never',K.drove)-.05,'ding',.5);

/* ---------- 8 VERDICT ---------- */
const E8=CH[8];
const v8=div('abs','',E8,{left:'60px',top:'560px',width:'960px'});
v8.innerHTML=`<div class="osw" style="font-size:34px;display:flex;align-items:center;gap:18px">${nlH('ne',90)}<span style="width:280px">THE COMEBACK</span><span id="vA" style="height:56px;background:#0CF5F9;border-radius:8px;display:inline-block"></span><span class="big cy" style="font-size:60px">6%</span></div>
<div class="osw" style="font-size:34px;display:flex;align-items:center;gap:18px;margin-top:26px">${nlH('atl',90)}<span style="width:280px">THE COLLAPSE</span><span id="vB" style="height:56px;background:#FF4B3E;border-radius:8px;display:inline-block"></span><span class="big rd" style="font-size:60px">13%</span></div>`;
const tw8=div('pill','2X AS RARE',E8,{left:'60px',top:'860px',background:'#fff',color:'#050506',fontSize:'50px'});
const g8=div('abs big','',E8,{left:'60px',top:'980px',fontSize:'96px'}); const bb8=div('abs','',E8,{left:'700px',top:'900px',width:'360px',height:'540px',background:'url(img/st_brady_ne_full.png) center bottom/contain no-repeat'}); g8.innerHTML='GREATEST<br><span class="cy">COMEBACK EVER.</span>';
const poll=div('card','',E8,{left:'140px',top:'560px',width:'800px',background:'#0E0E12',border:'4px solid #26262C',padding:'40px 40px'});
poll.innerHTML=`<div style="display:flex;justify-content:center;gap:40px">${nlH('ne',150)}${nlH('atl',150)}</div><div class="osw mut" style="font-size:28px;letter-spacing:3px;text-align:center;margin-top:10px">YOUR CALL · COMMENT BELOW</div>`+['COMEBACK','CHOKE'].map((s,i)=>`<div class="opt big" style="margin-top:24px;font-size:70px;text-align:center;border-radius:60px;padding:12px 0;${i===0?'background:var(--cy);color:#050506':'border:4px solid #FF4B3E;color:#FF4B3E'}">${s}</div>`).join('');
const OPT=[...poll.querySelectorAll('.opt')];
function rVer(t){hdrIn(8,t);
  const a=t<K.poll-.05; show([v8,tw8,g8,bb8],a); {const p=eOut(prog(t,K.c8+.3,K.c8+.7)); bb8.style.transform=`translateY(${(1-p)*560}px)`;} E8._h.style.display=a?'block':'none';
  if(a){fadeUp(v8,t,K.c8); v8.querySelector('#vA').style.width=(170*eOut(prog(t,K.c8+.2,K.c8+.7)))+'px'; v8.querySelector('#vB').style.width=(370*eOut(prog(t,K.c8+.6,K.c8+1.1)))+'px';
    const tt=WTs('twice',K.c8); show([tw8],t>=tt-.05); popIn(tw8,t,tt-.05,{from:1.5});
    show([g8],t>=K.door-.05); popIn(g8,t,K.door-.05,{from:1.04});}
  show([poll],!a); if(!a){popIn(poll,t,K.poll-.05,{from:.85}); OPT.forEach((o,i)=>popIn(o,t,[WTs('comeback',K.poll),WTs('choke',K.poll)][i]-.05,{from:.4})); poll.style.transform+=` scale(${1+(t-K.poll)*.006})`;}
  E8.style.transform=`scale(${1+(t-CUT[8])*.0015})`;}
sfx(K.c8+.2,'pop',.4); sfx(K.c8+.6,'pop',.4); sfx(WTs('twice',K.c8)-.05,'thump',.75); sfx(K.door-.05,'thump',.8); sfx(K.poll-.05,'whoosh',.5); sfx(WTs('comeback',K.poll)-.05,'pop',.5); sfx(WTs('choke',K.poll)-.05,'pop',.5); sfx(CUES[CUES.length-1].a,'sparkle',.4);
const RF=[rHook,rDrv,rTeam,rHon,rRun,rHist,rWho,rKill,rVer];
