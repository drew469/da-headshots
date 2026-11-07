import json, numpy as np
M=json.load(open('model.json')); PT=M['PT']+[M['P_OUT']]
C=[c for c in M['C'] if c['name']!='Jared Goff']
w=np.array([np.exp(-(5-c['top3'])/1.5) for c in C]); w/=w.sum()
for c,x in zip(C,w): print('%-20s w=%.3f fut=%s'%(c['name'],x,c['fut']))
rng=np.random.default_rng(15); N=100_000
k=rng.choice(len(C),N,p=w); R=np.zeros(N,int); NS=np.zeros(N,int)
for j,c in enumerate(C):
    ii=np.where(k==j)[0]; f=c['fut']
    if not f or len(ii)==0: continue
    p=np.array([PT[t] for t in f]); R[ii]=(rng.random((len(ii),len(f)))<p).sum(1); NS[ii]=len(f)
tot=3+R
res=dict(N=N,dist=np.bincount(R,minlength=8).tolist(),mean_more=float(R.mean()),p0=float((R==0).mean()),p1=float((R>=1).mean()),p_tie=float((tot>=7).mean()),p_pass=float((tot>=8).mean()),p5=float((tot>=5).mean()),p4=float((tot>=4).mean()),med_seasons=float(np.median(NS)),PT=PT,w=w.round(3).tolist(),names=[c['name'] for c in C])
# honesty: predicted vs actual rings after 30 for comps
act={'Peyton Manning':2,'Tom Brady':4,'Drew Brees':1}
pred=sum(sum(PT[t] for t in c['fut']) for c in C); actual=sum(act.get(c['name'],0) for c in C)
res['pred_comps']=pred; res['act_comps']=actual
# Mahomes so far 2018-2025 tiers
mt=[0,0,0,0,0,1,2,2]; p=np.array([PT[t] for t in mt]); S=(np.random.default_rng(3).random((200000,8))<p).sum(1)
res['mahomes_exp_sofar']=float(p.sum()); res['p_ge3_sofar']=float((S>=3).mean())
print(json.dumps({k:v for k,v in res.items() if k not in('w','names')},indent=1))
json.dump(res,open('sim.json','w'))
