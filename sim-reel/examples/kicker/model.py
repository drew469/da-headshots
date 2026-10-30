import pandas as pd,numpy as np,json
import statsmodels.api as sm
fg=pd.read_csv('fg.csv'); fg=fg[fg.field_goal_result.isin(['made','missed','blocked'])&fg.kick_distance.notna()&(fg.season_type=='REG')|(fg.season_type=='POST')]
fg=fg[fg.field_goal_result.isin(['made','missed','blocked'])]
fg['m']=(fg.field_goal_result=='made').astype(int)
fg['dome']=fg.roof.isin(['dome','closed']).astype(int); fg['alt']=fg.stadium.fillna('').str.contains('Mile High|Sports Authority|Broncos|INVESCO|Empower').astype(int)
d=fg[fg.kick_distance>=40].copy(); d['x']=d.kick_distance-55; d['yr']=d.season-2012
X=sm.add_constant(d[['x','yr','dome','alt']]); m=sm.Logit(d.m,X).fit(disp=0)
b,g=m.params['x'],m.params['yr']; cov=m.cov_params().loc[['x','yr'],['x','yr']].values
r=-g/b; J=np.array([g/b**2,-1/b]); se_r=float(np.sqrt(J@cov@J))
print('params',m.params.round(4).to_dict(),'shift yd/yr',round(r,3),'se',round(se_r,3))
# calibration of logistic on long kicks (50+) by bucket
d['p']=m.predict(X)
for lo,hi in [(50,55),(55,60),(60,65),(65,80)]:
    s=d[(d.kick_distance>=lo)&(d.kick_distance<hi)]; print(lo,len(s),round(s.p.mean(),3),round(s.m.mean(),3))
# 2025 conditions: expected makes per season at each distance using 2023-2025 attempts
rec=fg[fg.season.isin([2023,2024,2025])]
att=rec.groupby('kick_distance').size()/3
dd=np.arange(50,72); lam=np.array([att.get(x,0) for x in dd])
# exponential fit for d>=55
mask=(dd>=55)&(lam>0); A=np.polyfit(dd[mask]-55,np.log(lam[mask]),1); k=-A[0]; a0=np.exp(A[1])
print('attempts/season at 55:',round(a0,1),'decay per yard',round(k,3),'(halves every',round(np.log(2)/k,1),'yd)')
# p at 2025 using long-attempt condition mix
L=rec[rec.kick_distance>=58]; dome_s=L.dome.mean(); alt_s=L.alt.mean()
c=m.params['const']+m.params['dome']*dome_s+m.params['alt']*alt_s
def p25(dist): return 1/(1+np.exp(-(c+b*(dist-55)+g*(2025-2012))))
def lam25(dist): return a0*np.exp(-k*(dist-55))
for x in [55,60,65,68,70,75,80,90,100]: print(x,'p=%.4f'%p25(x),'att/yr=%.3f'%lam25(x),'makes/yr=%.5f'%(p25(x)*lam25(x)))
json.dump(dict(b=b,g=g,c=c,r=r,se_r=se_r,a0=a0,k=k,dome=dome_s,alt=alt_s),open('model.json','w'))
