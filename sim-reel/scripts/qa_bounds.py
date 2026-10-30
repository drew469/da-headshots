"""Scan every 0.2s: flag any visible element that leaves the safe frame (x 24..1056, y 130..1700) or collides with the caption block."""
import pathlib, json
from playwright.sync_api import sync_playwright
JS = r"""
(t)=>{ render(t); const out=[]; const cap=document.getElementById('cap').getBoundingClientRect();
 const els=[...document.querySelectorAll('#chs .ch *')].filter(e=>{
   if(e.tagName==='svg'||e.tagName==='g'||e.tagName==='SPAN'&&e.closest('.opt'))return false;
   const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden')return false;
   let n=e; while(n&&n.id!=='stage'){const c=getComputedStyle(n); if(c.display==='none'||+c.opacity<0.05)return false; n=n.parentElement||n.parentNode;}
   if(e.getAttribute&&e.getAttribute('opacity')!==null&&+e.getAttribute('opacity')<0.05)return false;
   const hasText=(e.childNodes&&[...e.childNodes].some(c=>c.nodeType===3&&c.textContent.trim()))||e.tagName==='text'||e.tagName==='rect'||e.tagName==='circle'||e.classList.contains('card')||e.classList.contains('pill');
   return hasText; });
 for(const e of els){ let r=e.getBoundingClientRect(); if(r.width<1)continue;
   const tn=[...(e.childNodes||[])].filter(c=>c.nodeType===3&&c.textContent.trim());
   if(tn.length){ const rg=document.createRange(); let L=1e9,R=-1e9,T=1e9,B=-1e9; tn.forEach(n=>{rg.selectNodeContents(n); for(const q of rg.getClientRects()){L=Math.min(L,q.left);R=Math.max(R,q.right);T=Math.min(T,q.top);B=Math.max(B,q.bottom);}});
     if(R>L) r={left:L,right:R,top:T,bottom:B,width:R-L}; }
   const label=(e.textContent||e.tagName).trim().slice(0,40);
   if(r.left<22||r.right>1058) out.push(['X',label,Math.round(r.left),Math.round(r.right)]);
   if(r.top<128||r.bottom>1700) out.push(['Y',label,Math.round(r.top),Math.round(r.bottom)]);
   if(cap.height>0 && r.bottom>cap.top+4 && r.top<cap.bottom && r.right>cap.left && r.left<cap.right && e.tagName!=='rect' && e.tagName!=='circle') out.push(['CAP',label,Math.round(r.top),Math.round(r.bottom)]);
 } return out; }
"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    pg.goto(pathlib.Path(__import__('sys').argv[1] if len(__import__('sys').argv)>1 else 'scene.html').resolve().as_uri()); pg.wait_for_timeout(1500)
    END = pg.evaluate('T.end'); issues = {}
    t = 0.0
    while t < END:
        for kind, lab, a, bb in pg.evaluate(JS, t):
            key = (kind, lab); issues.setdefault(key, []).append((round(t, 1), a, bb))
        t += 0.2
    for (kind, lab), occ in sorted(issues.items(), key=lambda x: x[1][0][0]):
        print(f'{kind:3} {occ[0][0]:6}-{occ[-1][0]:6}s  n={len(occ):3}  {lab!r}  e.g. {occ[0][1:]}')
    print('total distinct issues:', len(issues))
    b.close()
