import pandas as pd, numpy as np
d=pd.read_csv('data/ne/NBA Elo 2025 - nba_elo.csv',parse_dates=['date'])
p=d[d.playoff.notna()&(d.playoff!=0)].copy() if d.playoff.dtype!=object else d[d.playoff.notna()].copy()
print(d.playoff.unique()[:10])
p=p.sort_values('date')
p['key']=p.apply(lambda r:(r.season,)+tuple(sorted([r.team1,r.team2])),axis=1)
p=p[p.team1<p.team2]   # one row per game
S=[]
for k,g in p.groupby('key',sort=False):
    a,b=k[1],k[2]; wa=wb=0; hist=[]
    for r in g.itertuples():
        pa=r.elo_prob1; wina=r.score1>r.score2
        hist.append((wa,wb,pa)); wa+=wina; wb+=not wina
    S.append(dict(season=k[0],a=a,b=b,wa=wa,wb=wb,n=len(g),hist=hist,start=g.date.iloc[0],rd=g.playoff.iloc[0]))
S=pd.DataFrame(S); S.to_pickle('series.pkl')
print(len(S), S.season.min()); print(S[S.season==2016].tail(3)[['a','b','wa','wb','n','rd']])
