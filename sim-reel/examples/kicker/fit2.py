import pandas as pd,numpy as np,json
from scipy.optimize import minimize
fg=pd.read_csv('fg.csv'); fg=fg[fg.field_goal_result.isin(['made','missed','blocked'])&fg.kick_distance.notna()]
fg['m']=(fg.field_goal_result=='made').astype(int)
fg['dome']=fg.roof.isin(['dome','closed']).astype(int); fg['alt']=fg.stadium.fillna('').str.contains('Mile High|Sports Authority|Broncos|INVESCO|Empower').astype(int)
d=fg[fg.kick_distance>=40]
D=d.kick_distance.values.astype(float); Y=(d.season.values-2012).astype(float); Mk=d.m.values; DO=d.dome.values; AL=d.alt.values
def logit(th,D,Y,DO,AL):
    c,b1,b2,r,cd,ca=th; e=D-r*Y-55; return c+b1*e+b2*np.clip(e,0,None)**2+cd*DO+ca*AL
def nll(th,idx=None):
    z=logit(th,D,Y,DO,AL) if idx is None else logit(th,D[idx],Y[idx],DO[idx],AL[idx]); mk=Mk if idx is None else Mk[idx]
    return np.sum(np.logaddexp(0,z)-mk*z)
th0=[.15,-.087,-.01,.37,.26,.23]
res=minimize(nll,th0,method='Nelder-Mead',options=dict(maxiter=20000,xatol=1e-6,fatol=1e-6)); th=res.x
print('theta',np.round(th,4))
p=1/(1+np.exp(-logit(th,D,Y,DO,AL)))
cal=[]
for lo,hi in [(40,45),(45,50),(50,55),(55,60),(60,63),(63,66),(66,80)]:
    s=(D>=lo)&(D<hi); cal.append([lo,int(s.sum()),round(p[s].mean(),3),round(Mk[s].mean(),3)]); print(cal[-1])
rng=np.random.default_rng(0); rs=[]
for i in range(60):
    idx=rng.integers(0,len(D),len(D)); rr=minimize(nll,th,args=(idx,),method='Nelder-Mead',options=dict(maxiter=4000)).x; rs.append(rr[3])
print('r',th[3],'boot se',np.std(rs))
json.dump(dict(th=list(th),r_se=float(np.std(rs)),cal=cal),open('fit2.json','w'))
