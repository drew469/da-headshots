import json,numpy as np
from scipy.stats import norm
G=json.load(open('games.json'))
# margin = r[sa]-r[sb] + e ; r[1]=0 anchor
X=np.zeros((len(G),16)); y=np.zeros(len(G))
for i,g in enumerate(G):
    X[i,g['sa']-1]+=1; X[i,g['sb']-1]-=1; y[i]=g['pa']-g['pb']
Xr=X[:,1:]; beta,*_=np.linalg.lstsq(Xr,y,rcond=None)
r=np.r_[0,beta]; res=y-X@r; sig=res.std()
print('seed ratings (pts vs 1 seed):',np.round(r,1)); print('sigma',round(sig,2))
# calibration: predicted vs actual win prob by bucket
p=norm.cdf((X@r)/sig); w=(y>0).astype(float)
# orient to favorite
fav=np.where(p>=.5,p,1-p); fw=np.where(p>=.5,w,1-w)
for lo,hi in [(.5,.6),(.6,.7),(.7,.8),(.8,.9),(.9,.97),(.97,1)]:
    m=(fav>=lo)&(fav<hi); print(f'{lo:.2f}-{hi:.2f} n={m.sum():4d} model={fav[m].mean():.3f} actual={fw[m].mean():.3f}')
# matchup checks
def P(a,b): return norm.cdf((r[a-1]-r[b-1])/sig)
for a,b in [(16,1),(15,2),(14,3),(13,4),(12,5),(16,8),(16,9),(16,4),(16,5),(16,2),(16,3),(16,1)]:
    act=[g for g in G if {g['sa'],g['sb']}=={a,b}]
    wins=sum((g['sa']==a and g['pa']>g['pb']) or (g['sb']==a and g['pb']>g['pa']) for g in act)
    print(f'{a} vs {b}: model {P(a,b)*100:.2f}%  actual {wins}/{len(act)}')
json.dump(dict(r=list(r),sig=sig),open('model.json','w'))
