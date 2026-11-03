import numpy as np, pandas as pd, json
from sim import *
R=pd.read_parquet('results.parquet')
H2=D[(D.qtr>=3)&(D.qtr<=4)&(D.stype=='REG')].merge(R,left_on='game_id',right_index=True)
H2['offwin']=np.where(H2.result==0,.5,np.where((H2.result>0)==(H2.off==H2.home_team),1.0,0.0))
rng=np.random.default_rng(3); S=H2.sample(3000,random_state=4)
pred=[]
for k,(i,g) in enumerate(S.iterrows()):
    O=run(400,float(g.t0),0,-int(g['diff']),0,float(g.start),0,0,CW,off,R_,DUR,NS,P,1000+k) if False else run(400,float(g.t0),int(max(g['diff'],0)),int(max(-g['diff'],0)),0,float(g.start),0,0,CW,off,R_,DUR,NS,P,1000+k)
    pred.append((O[:,0]==0).mean())
S['pred']=pred
S['b']=pd.cut(S.pred,[0,.1,.3,.5,.7,.9,1.0001],include_lowest=True)
cal=S.groupby('b',observed=True).agg(n=('pred','size'),m=('pred','mean'),a=('offwin','mean'))
print(cal)
# historical: teams trailing by 25+ during second half (drive starts), 2009-2025 all games
T=D[(D.qtr>=3)].merge(R,left_on='game_id',right_index=True)
T['offwin']=np.where(T.result==0,.5,np.where((T.result>0)==(T.off==T.home_team),1.0,0.0))
x=T[T['diff']<=-25].groupby(['game_id','off']).offwin.first()
print('games trailing by 25+ in 2H:',len(x),'wins',x.sum())
json.dump(dict(cal=[[float(r.m),float(r.a),int(r.n)] for r in cal.itertuples()],hist_n=int(len(x)),hist_w=float(x.sum())),open('calib.json','w'))
