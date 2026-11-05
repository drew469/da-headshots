import json, numpy as np
C=json.load(open('comps.json')); w=np.array([c['w'] for c in C]); w/=w.sum()
LY,LTD,LYPG=23671,171,23671/86; LTDR=LTD/LY
def simulate(base_ypg,base_tdr,comps,w,n,rng):
    k=rng.choice(len(comps),n,p=w); Y=np.zeros(n); TD=np.zeros(n); NS=np.zeros(n,int); BEST=np.zeros(n)
    for j,c in enumerate(comps):
        ii=np.where(k==j)[0]
        if len(ii)==0 or not c['fut']: continue
        r=(base_ypg/c['cypg'])**0.5; f=np.array(c['fut'],float)
        crate=max(c['futtd'],1)/max(c['futy'],1); q=(base_tdr/crate)**0.5
        noise=np.exp(rng.normal(0,.10,(len(ii),len(f))))
        y=f[None,:,1]*r*noise; Y[ii]=y.sum(1); BEST[ii]=y.max(1)
        TD[ii]=rng.poisson(np.maximum(f[None,:,2]*r*q*noise,0)).sum(1); NS[ii]=(f[:,0]>0).sum()
    return Y,TD,NS,BEST
rng=np.random.default_rng(29); N=100_000
Y,TD,NS,BEST=simulate(LYPG,LTDR,C,w,N,rng)
cy=LY+Y; ct=LTD+TD
B={'Peyton Manning':71940,'Brett Favre':71838,'Philip Rivers':63440,'Ben Roethlisberger':64088,'Matt Ryan':62792,'Drew Brees':80358,'Tom Brady':89214}
res=dict(N=N,med_y=float(np.median(cy)),p25=float(np.percentile(cy,25)),p75=float(np.percentile(cy,75)),med_td=float(np.median(ct)),med_seasons=float(np.median(NS)),
 p50k=float((cy>=50000).mean()),p60k=float((cy>=60000).mean()),p_peyton=float((cy>71940).mean()),p_brees=float((cy>80358).mean()),p_brady=float((cy>89214).mean()),
 p_td_peyton=float((ct>539).mean()),p400td=float((ct>=400).mean()),p_out3=float((NS<=3).mean()),
 hist=np.histogram(cy,bins=np.arange(20000,100001,4000))[0].tolist(),comps=[[c['name'],c['season'],round(c['futy']),c['nseas']] for c in C],w=[round(float(x),4) for x in w])
print(json.dumps({k:v for k,v in res.items() if k not in('comps','w','hist')},indent=1)); print(res['hist'])
pct=[]
for j,c in enumerate(C):
    O=[x for i,x in enumerate(C) if i!=j]; ww=np.array([x['w'] for x in O]); ww/=ww.sum()
    a,_,_,_=simulate(c['cypg'],max(c['ctd'],1)/c['cy'],O,ww,20000,np.random.default_rng(j)); pct.append(float((a<c['futy']).mean()+.5*(a==c['futy']).mean()))
pct=np.array(pct); res['pct']=pct.round(3).tolist(); print('LOO middle half',((pct>.25)&(pct<.75)).sum(),'of',len(pct),'low',(pct<=.25).sum(),'high',(pct>=.75).sum())
json.dump(res,open('sim.json','w'))
