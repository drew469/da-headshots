import json, numpy as np
C=[c for c in json.load(open('comps.json')) if c['name']!='Tony Gonzalez']  # his pre-1999 stats are missing from the data
w=np.array([c['w'] for c in C]); w/=w.sum()
AHY,AHTD,AHYPG=1956,18,51.47; AHR=AHTD/AHY
rng=np.random.default_rng(81); N=100_000
k=rng.choice(len(C),N,p=w)
Y=np.zeros(N); TD=np.zeros(N,int); SE=np.zeros(N,int); BEST=np.zeros(N)
for j,c in enumerate(C):
    ii=np.where(k==j)[0]; n=len(ii)
    if n==0 or not c['fut']: SE[ii]=0; continue
    r=(AHYPG/c['cypg'])**0.5
    crate=max(c['futtd'],1)/max(c['futy'],1); q=(AHR/crate)**0.5
    f=np.array(c['fut'])  # games, yards, tds
    noise=np.exp(rng.normal(0,.12,(n,len(f))))
    yy=f[None,:,1]*r*noise
    tt=rng.poisson(np.maximum(f[None,:,2]*r*q*noise,0))
    Y[ii]=yy.sum(1); TD[ii]=tt.sum(1); SE[ii]=len(f); BEST[ii]=yy.max(1)
cy=AHY+Y; ct=AHTD+TD
res=dict(N=N,med_y=float(np.median(cy)),mean_y=float(cy.mean()),p25=float(np.percentile(cy,25)),p75=float(np.percentile(cy,75)),
 med_td=float(np.median(ct)),mean_td=float(ct.mean()),
 p10k=float((cy>=10000).mean()),p_gronk=float((cy>9286).mean()),p_td_gates=float((ct>116).mean()),p_td_gronk=float((ct>92).mean()),
 p1000=float((BEST>=1000).mean()), seasons_med=float(np.median(SE)+3),
 hist_y=np.histogram(cy,bins=np.arange(0,17001,1000))[0].tolist(), comps=[[c['name'],round(float(x),3)] for c,x in zip(C,w)])
print(json.dumps({k_:v for k_,v in res.items() if k_ not in('comps',)},indent=1))
json.dump(res,open('sim.json','w'))
