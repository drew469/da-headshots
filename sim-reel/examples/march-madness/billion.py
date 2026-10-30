import json,numpy as np,time
exec(open('sim.py').read().split('# ---- 1)')[0])
TOT=1_000_000_000  # tournaments; 4 sixteen seeds each
CH=50_000_000
cnt=dict(R64=0,R32=0,S16=0,E8=0,F4=0,NC=0,CH=0); t0=time.time()
champs=[]
for c in range(0,TOT*4,CH):
    n=CH
    t16=(R[15]+rng.standard_normal(n,dtype=np.float32)*TAU)
    t1=(R[0]+rng.standard_normal(n,dtype=np.float32)*TAU)
    w=(t16-t1+rng.standard_normal(n,dtype=np.float32)*SG)>0
    t=t16[w]; cnt['R64']+=n; 
    stages=[('R32',[8,9]),('S16',[5,12,4,13]),('E8',[6,11,3,14,7,10,2,15]),('F4',ORDER),('NC',ORDER*2)]
    cnt['R32']+=len(t)
    for name,seeds in stages:
        k=len(t)
        if k==0: break
        if name in('NC','CH'):
            # opponent = winner of 2 (or 4) regions
            nreg=len(seeds)//16
            a=pod(ORDER,k)
            for _ in range(nreg-1): a=play(*a,*pod(ORDER,k))
            os_,ot=a
        else:
            os_,ot=pod(seeds,k)
        w=(t-ot+rng.standard_normal(k)*SG)>0
        t=t[w]
        nxt={'R32':'S16','S16':'E8','E8':'F4','F4':'NC','NC':'CH'}[name]
        cnt[nxt]+=len(t)
    if c//CH%10==0: print(c//CH, cnt, round(time.time()-t0), flush=True)
print('FINAL',cnt)
json.dump(cnt,open('billion.json','w'))
