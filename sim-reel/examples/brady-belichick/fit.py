import pandas as pd, numpy as np
from scipy.stats import norm
from scipy.optimize import minimize
FIX={'OAK':'LV','SD':'LAC','STL':'LA'}
T=pd.read_csv('ratings.csv'); M={(r.season,r.team):r.mar for r in T.itertuples()}
G=pd.read_csv('/home/claude/brady-sim/data/games_nflverse.csv')
G=G[(G.season>=2001)&(G.season<=2023)&G.result.notna()].copy()
for c in ['home_team','away_team']: G[c]=G[c].replace(FIX)
G=G[G.result!=0]
d=np.array([M[(s,h)]-M[(s,a)] for s,h,a in zip(G.season,G.home_team,G.away_team)])
neu=(G.location=='Neutral').values; y=(G.result>0).values
def nll(p):
    k,hfa=p; pr=norm.cdf((k*d+hfa*(~neu))/13.5); pr=np.clip(pr,1e-6,1-1e-6)
    return -(y*np.log(pr)+(1-y)*np.log(1-pr)).sum()
r=minimize(nll,[.8,2]); print(r.x)
k,hfa=r.x; pr=norm.cdf((k*d+hfa*(~neu))/13.5)
b=pd.cut(np.maximum(pr,1-pr),[.5,.6,.7,.8,.9,1.0]); fav=np.where(pr>=.5,y,~y)
print(pd.DataFrame({'b':b,'p':np.maximum(pr,1-pr),'w':fav}).groupby('b').agg(n=('w','size'),pred=('p','mean'),act=('w','mean')).round(3))
po=(G.game_type!='REG').values
print('playoffs', len(pr[po]), np.maximum(pr,1-pr)[po].mean().round(3), fav[po].mean().round(3))
