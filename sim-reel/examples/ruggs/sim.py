import json, numpy as np
C=json.load(open('comps.json')); w=np.array([c['w'] for c in C]); w/=w.sum()
RY,RYPG=921,46.05; N=100_000; rng=np.random.default_rng(12)
def simulate(base_ypg,comps,w,n,rng):
    k=rng.choice(len(comps),n,p=w); F5=np.zeros(n); CAR=np.zeros(n); BEST=np.zeros(n); NS=np.zeros(n,int)
    for j,c in enumerate(comps):
        ii=np.where(k==j)[0]
        if len(ii)==0 or not c['fut']: continue
        r=(base_ypg/c['ypg'])**0.5; f=np.array(c['fut'])[:,1]
        y=f[None,:]*r*np.exp(rng.normal(0,.12,(len(ii),len(f))))
        F5[ii]=y[:,:3].sum(1); CAR[ii]=y.sum(1); BEST[ii]=y.max(1); NS[ii]=len(f)
    return F5,CAR,BEST,NS
F5,CAR,BEST,NS=simulate(RYPG,C,w,N,rng)
f5=RY+F5; car=RY+CAR
res=dict(N=N,f5_med=float(np.median(f5)),car_med=float(np.median(car)),p_jj=float((f5>7432).mean()),p_lamb=float((f5>6339).mean()),p_jeudy=float((f5>4282).mean()),
 p1000=float((BEST>=1000).mean()),p1300=float((BEST>=1300).mean()),seasons_med=float(np.median(NS)+2),p_out3=float((NS<=1).mean()),
 hist_f5=np.histogram(f5,bins=np.arange(0,9001,500))[0].tolist(),comps=[[c['name'],c['dy'],c['pick'],round(c['f3']),round(c['futy']),c['nseas']] for c in C],w=[round(float(x),4) for x in w])
print(json.dumps({k:v for k,v in res.items() if k not in('comps','w','hist_f5')},indent=1)); print(res['hist_f5'])
# leave-one-out on first-5-season totals
pct=[]
for j,c in enumerate(C):
    O=[x for i,x in enumerate(C) if i!=j]; ww=np.array([x['w'] for x in O]); ww/=ww.sum()
    a,_,_,_=simulate(c['ypg'],O,ww,20000,np.random.default_rng(j)); pct.append(float((a<c['f3']).mean()+.5*(a==c['f3']).mean()))
pct=np.array(pct); res['pct']=pct.round(3).tolist(); print('middle half',((pct>.25)&(pct<.75)).sum(),'of',len(pct),'low',(pct<=.25).sum(),'high',(pct>=.75).sum())
json.dump(res,open('sim.json','w'))
