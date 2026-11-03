"""Super Bowl LI from 28-3: drive-by-drive Monte Carlo built from every NFL drive 2009-2025."""
import numpy as np, pandas as pd, json, numba as nb, sys
D=pd.read_parquet('drives.parquet')
RES={'Touchdown':0,'Field goal':1,'Punt':2,'Turnover':3,'Turnover on downs':4,'Missed field goal':5,'End of half':6,'Opp touchdown':7,'Safety':8}
D=D[D.res.notna()].copy(); D['r']=D.res.map(RES).astype(int)
D['pts']=np.select([D.r==0,D.r==1,D.r==7,D.r==8],[7,3,-7,-2],0)
# fallback next start by result
fb=D.groupby('r').nstart.median(); D['nstart']=D.nstart.fillna(D.r.map(fb)).fillna(75)

def sbk(d): return np.select([d>=9,d>=1,d==0,d>=-8,d>=-16],[0,1,2,3,4],5)
def tbk(t): return np.select([t>900,t>300,t>120],[0,1,2],3)
def fbk(s): return np.select([s>=80,s>=70,s>=50],[0,1,2],3)
H=D[(D.qtr>=3)&(D.qtr<=4)].copy()
H['cell']=sbk(H['diff'])*16+tbk(H.t0)*4+fbk(H.start)
H=H.sort_values('cell').reset_index(drop=True)
cnt=np.bincount(H.cell,minlength=96); off=np.concatenate([[0],np.cumsum(cnt)])
print('min cell count',cnt.min(), 'cells<50:',(cnt<50).sum())
R_=H.r.values.astype(np.int64); DUR=H.dur.values.astype(np.float64); NS=H.nstart.values.astype(np.float64); P=H.pts.values.astype(np.float64)

# ---- team strength 2016 (regular season, all drives) ----
S=D[(D.season==2016)&(D.stype=='REG')]
lg=S.pts.mean()
offp=S.groupby('off').pts.mean()/lg; defp=S.groupby('def').pts.mean()/lg
print('2016 league PPD %.2f'%lg, 'NE off %.2f def %.2f | ATL off %.2f def %.2f'%(offp.NE,defp.NE,offp.ATL,defp.ATL))
allp=D.pts.values
def lam_for(r):
    lo,hi=-1,1
    for _ in range(60):
        m=(lo+hi)/2; w=np.exp(m*allp); v=(allp*w).sum()/w.sum()/allp.mean()
        lo,hi=(m,hi) if v<r else (lo,m)
    return (lo+hi)/2
def cumw(lam):
    w=np.exp(lam*P); c=np.empty_like(w)
    for k in range(96):
        a,b=off[k],off[k+1]
        if b>a: c[a:b]=np.cumsum(w[a:b])
    return c
rNE=offp.NE*defp.ATL; rATL=offp.ATL*defp.NE
lNE,lATL=lam_for(rNE),lam_for(rATL)
print('target ratios NE %.2f ATL %.2f  lambdas %.3f %.3f'%(rNE,rATL,lNE,lATL))
CW=np.stack([cumw(0.0),cumw(lNE),cumw(lATL)])

@nb.njit(cache=True)
def cellof(diff,t,s):
    sb=0 if diff>=9 else 1 if diff>=1 else 2 if diff==0 else 3 if diff>=-8 else 4 if diff>=-16 else 5
    tb=0 if t>900 else 1 if t>300 else 2 if t>120 else 3
    fb=0 if s>=80 else 1 if s>=70 else 2 if s>=50 else 3
    return sb*16+tb*4+fb
@nb.njit(cache=True)
def draw(c,cw,off):
    a,b=off[c],off[c+1]; u=np.random.random()*cw[b-1]
    lo,hi=a,b-1
    while lo<hi:
        m=(lo+hi)//2
        if cw[m]<u: lo=m+1
        else: hi=m
    return lo
@nb.njit(cache=True)
def conv(diff_after6):
    # trailing/leading 2-pt chart (2016-era): go for 2 at these margins after the 6
    d=diff_after6
    if d==-2 or d==-5 or d==-10 or d==-11 or d==1 or d==5 or d==-13:
        return 2 if np.random.random()<0.48 else 0
    return 1 if np.random.random()<0.94 else 0
@nb.njit(cache=True)
def game(t,sc0,sc1,pos,start,tid0,tid1,CW,off,R_,DUR,NS,P,out):
    # team 0 = NE, team 1 = ATL; tid = which tilt row each team's offense uses
    sc=np.array([sc0,sc1]); tid=np.array([tid0,tid1]); nd=np.zeros(2,np.int64); np0=np.zeros(2,np.int64)
    convs=0
    while t>0:
        diff=sc[pos]-sc[1-pos]
        i=draw(cellof(diff,t,start),CW[tid[pos]],off)
        r=R_[i]; dur=DUR[i]; nd[pos]+=1
        if dur>t: break
        t-=dur
        if r==0:
            x=conv(sc[pos]+6-sc[1-pos]); sc[pos]+=6+x
            if x==2: convs+=1
            np0[pos]+=1
        elif r==1: sc[pos]+=3; np0[pos]+=1
        elif r==7: sc[1-pos]+=7
        elif r==8: sc[1-pos]+=2
        start=NS[i]
        if r==7: start=75.0
        else: pos=1-pos
    out[2]=sc[0]; out[3]=sc[1]; out[4]=nd[0]; out[5]=nd[1]; out[6]=convs; out[7]=np0[0]; out[8]=np0[1]
    if sc[0]!=sc[1]:
        out[0]=0 if sc[0]>sc[1] else 1; out[1]=0; return
    # overtime (2016 playoff rules): coin flip, first-possession TD wins, FG gives other team a possession
    out[1]=1; pos=0 if np.random.random()<.5 else 1; out[9]=pos; first=True; lead=-1; start=75.0
    while True:
        i=draw(cellof(0,600,start),CW[tid[pos]],off); r=R_[i]
        if r==0: out[0]=pos; return
        if r==7 or r==8: out[0]=1-pos; return
        if r==1:
            if first: lead=pos
            else: out[0]=pos; return
        if not first and lead>=0 and lead!=pos: out[0]=lead; return
        if first and r!=1: first=False
        elif first and r==1: first=False
        start=NS[i]; pos=1-pos
@nb.njit(cache=True)
def run(N,t,sc0,sc1,pos,start,tid0,tid1,CW,off,R_,DUR,NS,P,seed):
    np.random.seed(seed); O=np.zeros((N,10))
    for k in range(N): game(t,sc0,sc1,pos,start,tid0,tid1,CW,off,R_,DUR,NS,P,O[k])
    return O

if __name__=='__main__':
    # 28-3, NE ball at own 25 after touchback, 8:31 left in Q3 -> 1411 s remaining
    N=100_000
    O=run(N,1411.0,3,28,0,75.0,1,2,CW,off,R_,DUR,NS,P,51)
    ne=(O[:,0]==0)
    G=run(N,1411.0,3,28,0,75.0,0,0,CW,off,R_,DUR,NS,P,52)  # league-average teams
    res=dict(N=N,ne_wins=int(ne.sum()),ne_pct=float(ne.mean()),ot=int(O[:,1].sum()),ne_wins_ot=int((ne&(O[:,1]==1)).sum()),
             generic_ne_pct=float((G[:,0]==0).mean()),
             ne_pts_reg=np.bincount((O[:,2]-3).astype(int)).tolist(), atl_pts_reg=np.bincount((O[:,3]-28).astype(int)).tolist(),
             ne_ge25=float(((O[:,2]-3)>=25).mean()), atl_0=float(((O[:,3]-28)==0).mean()),
             reg_tie_or_win=float(((O[:,2])>=O[:,3]).mean()))
    print(json.dumps({k:v for k,v in res.items() if 'pts' not in k},indent=1))
    json.dump(res,open('sim.json','w'))
