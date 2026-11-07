import json, numpy as np
J=json.load(open('comps.json')); C=J['C']; T=J['T']
def wts(t,cs): return np.array([np.exp(-abs(np.log(c['r3']/t['r3']))/0.3)*np.exp(-abs(np.log(c['cy']/t['cy']))/0.4)*np.exp(-abs(c['age']-t['age'])/1.5) for c in cs])
def simulate(t,comps,n,rng):
    w=wts(t,comps); w/=w.sum(); k=rng.choice(len(comps),n,p=w); Y=np.zeros(n); TD=np.zeros(n); NS=np.zeros(n,int); B=np.zeros(n)
    tdr=t.get('ctd',1)/t['cy']
    for j,c in enumerate(comps):
        ii=np.where(k==j)[0]
        if len(ii)==0 or not c['fut']: continue
        r=(t['r3']/c['r3'])**0.5; f=np.array(c['fut'],float)
        crate=max(c['futtd'],1)/max(c['futy'],1); q=(tdr/crate)**0.5
        noise=np.exp(rng.normal(0,.3,(len(ii),len(f)))); y=f[None,:,1]*r*noise
        Y[ii]=y.sum(1); B[ii]=y.max(1); TD[ii]=rng.poisson(np.maximum(f[None,:,2]*r*q*noise,0)).sum(1); NS[ii]=(f[:,0]>0).sum()
    return Y,TD,NS,B
rng=np.random.default_rng(12); N=100_000
Y,TD,NS,B=simulate(T,C,N,rng); cy=T['cy']+Y; ct=T['ctd']+TD
res=dict(N=N,med_y=float(np.median(cy)),p25=float(np.percentile(cy,25)),p75=float(np.percentile(cy,75)),med_td=float(np.median(ct)),med_more=float(np.median(NS)),
 p_real=float((cy>4284).mean()),p14k=float((cy>=14000).mean()),p15k=float((cy>=15000).mean()),p_fitz=float((cy>17492).mean()),p_rice=float((cy>22895).mean()),p10k=float((cy>=10000).mean()),p12k=float((cy>=12000).mean()),p_ab=float((cy>12291).mean()),p_megatron=float((cy>11619).mean()),
 p_1000=float((B>=1000).mean()),p_zero=float((NS==0).mean()),hist=np.histogram(cy,bins=np.arange(0,20001,1000))[0].tolist())
print(json.dumps({k:v for k,v in res.items() if k!='hist'},indent=1)); print(res['hist'])
pct=[]
for j,c in enumerate(C):
    O=[x for i,x in enumerate(C) if i!=j]; a,_,_,_=simulate(c,O,20000,np.random.default_rng(j)); pct.append(float((a<c['futy']).mean()+.5*(a==c['futy']).mean()))
pct=np.array(pct); res['pct']=pct.round(3).tolist(); print('LOO middle',((pct>.25)&(pct<.75)).sum(),'of',len(pct),'low',(pct<=.25).sum(),'high',(pct>=.75).sum())
json.dump(res,open('sim.json','w'))
