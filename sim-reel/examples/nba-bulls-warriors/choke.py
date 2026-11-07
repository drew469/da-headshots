import pandas as pd, numpy as np, json
d=pd.read_csv('data/ne/NBA Elo 2025 - nba_elo.csv',parse_dates=['date'])
p=d[d.playoff.notna()].sort_values('date')
p['k2']=[tuple(sorted([a,b])) for a,b in zip(p.team1,p.team2)]
p=p.drop_duplicates(['date','k2'])
import collections
nba=collections.defaultdict(set)
for s_,g in d[d.playoff.isna()].groupby('season'):
    seen={'BOS'} if 'BOS' in set(g.team1) else set(); 
    for _ in range(4):
        seen|=set(g[g.team1.isin(seen)].team2)
    nba[s_]=seen
p=p[[ (a in nba[s_]) for s_,a in zip(p.season,p.team1)]]
p['key']=[(s,)+tuple(sorted([a,b])) for s,a,b in zip(p.season,p.team1,p.team2)]
E=lambda x:1/(1+10**(-x/400))
rows=[]
for k,g in p.groupby('key',sort=False):
    g=g.drop_duplicates(['date']).reset_index(drop=True)
    if len(g)<5: continue
    w=[]; 
    for r in g.itertuples(): w.append(r.team1 if r.score1>r.score2 else r.team2)
    a,b=k[1],k[2]; ca=w[:4].count(a); cb=w[:4].count(b)
    if sorted([ca,cb])!=[1,3]: continue
    lead=a if ca==3 else b; trail=b if lead==a else a
    winner=max([a,b],key=w.count)
    if max(w.count(a),w.count(b))<4: continue
    g5=g.iloc[4]
    el=g5.elo1_pre if g5.team1==lead else g5.elo2_pre; et=g5.elo2_pre if g5.team1==lead else g5.elo1_pre
    h1=g.iloc[0].team1  # home team game 1
    fin=(k[0]>=1985)&(k[0]<=2013)&(g5.date.month>=6)  # approx finals 2-3-2
    # venues for G5,G6,G7: home team
    if fin and len(g)>=5:
        other=b if h1==a else a; ven=[other,h1,h1]
    else:
        other=b if h1==a else a; ven=[h1,other,h1]
    pr=1
    hca=0 if g5.neutral==1 else 100
    for v in ven: pr*=E((et-el)+(hca if v==trail else -hca))
    act=[]
    for i in range(4,len(g)):
        r=g.iloc[i]; act.append(r.elo_prob1 if r.team1==trail else r.elo_prob2)
    rows.append(dict(season=int(k[0]),lead=lead,trail=trail,comeback=winner==trail,p=pr,pact=float(np.prod(act)) if winner==trail else None,leadelo=el,trailelo=et))
R=pd.DataFrame(rows); R.to_csv('three_one.csv',index=False)
print(len(R),'comebacks',R.comeback.sum(), 'expected',R.p.sum().round(1))
print(R[R.comeback].sort_values('p')[['season','lead','trail','p','pact','leadelo','trailelo']].round(4).to_string())
