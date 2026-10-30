import pandas as pd,numpy as np,json
F=json.load(open('fit2.json')); c,b1,b2,r0,cd,ca=F['th']; rse=F['r_se']
M=json.load(open('model.json')); a0,k=M['a0'],M['k']
fg=pd.read_csv('fg.csv'); fg=fg[fg.field_goal_result.isin(['made','missed','blocked'])]
fg['dome']=fg.roof.isin(['dome','closed']).astype(int); fg['alt']=fg.stadium.fillna('').str.contains('Mile High|Sports Authority|Broncos|INVESCO|Empower').astype(int)
L=fg[(fg.season.isin([2023,2024,2025]))&(fg.kick_distance>=58)]
mix=L.groupby(['dome','alt']).size()/len(L)
def p_at(dist,y,r):   # mixed conditions
    e=dist-r*(y-2012)-55; z0=c+b1*e+b2*np.clip(e,0,None)**2
    return sum(w/(1+np.exp(-(z0+cd*do+ca*al))) for (do,al),w in mix.items())
def lam(dist,y,r): return a0*np.exp(-k*(dist-r*(y-2025)-55))   # attempts per season at exactly `dist`
yrs=np.arange(2027,2601); MIL=[69,70,75,80,90,100]
N=100_000; rng=np.random.default_rng(68)
R=rng.normal(r0,rse,N)
# expected makes >=D in year y depends only on shift; precompute on a grid of r
rg=np.linspace(r0-5*rse,r0+5*rse,81)
out={}
dist=np.arange(40,121)
for D in MIL:
    H=np.zeros((len(rg),len(yrs)))
    for i,r in enumerate(rg):
        for j,y in enumerate(yrs):
            dd=dist[dist>=D]; H[i,j]=np.sum(lam(dd,y,r)*p_at(dd,y,r))
    CH=np.cumsum(H,1)
    E=rng.exponential(1,N); ri=np.clip(np.searchsorted(rg,R),0,len(rg)-1)
    first=np.array([yrs[np.searchsorted(CH[ri_],e)] if CH[ri_,-1]>=e else 9999 for ri_,e in zip(ri,E)])
    q=np.percentile(first,[10,50,90]); out[D]=dict(p10=int(q[0]),med=int(q[1]),p90=int(q[2]),by2030=float((first<=2030).mean()),by2050=float((first<=2050).mean()),by2100=float((first<=2100).mean()),never=float((first==9999).mean()))
    print(D,out[D],flush=True)
# today's expected makes per season at each distance (2025 level)
today={int(x):round(float(lam(x,2025,r0)*p_at(x,2025,r0)),4) for x in range(55,101,5)}
print(today)
json.dump(dict(mil=out,today=today,r=r0,rse=rse),open('sim.json','w'))
