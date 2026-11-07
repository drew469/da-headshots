import pandas as pd, numpy as np, json
FIX={'OAK':'LV','SD':'LAC','STL':'LA'}
G=pd.read_csv('/home/claude/brady-sim/data/games_nflverse.csv')
G=G[(G.season>=2000)&(G.season<=2023)].copy()
for c in ['home_team','away_team']: G[c]=G[c].replace(FIX)
R=G[G.game_type=='REG']
rows=[]
for y in range(2000,2024):
    d=pd.read_parquet(f'/home/claude/fg-sim/pbp/pbp_{y}.parquet',columns=['season_type','posteam','qb_dropback','qb_epa','id','name'])
    d=d[(d.season_type=='REG')&(d.qb_dropback==1)&d.qb_epa.notna()].copy(); d['posteam']=d.posteam.replace(FIX)
    lg=d.qb_epa.mean()
    g=R[R.season==y]
    for t in sorted(set(g.home_team)|set(g.away_team)):
        h=g[g.home_team==t]; a=g[g.away_team==t]; n=len(h)+len(a)
        mar=((h.home_score-h.away_score).sum()+(a.away_score-a.home_score).sum())/n
        dt=d[d.posteam==t]; qb=(dt.qb_epa-lg).sum()/n
        top=dt.groupby('name').size().idxmax()
        coach=pd.concat([h.home_coach,a.away_coach]).mode().iloc[0]
        rows.append(dict(season=y,team=t,mar=mar,qb=qb,rest=mar-qb,qbname=top,coach=coach,n=n))
T=pd.DataFrame(rows); T.to_csv('ratings.csv',index=False)
print(T[(T.team=='NE')][['season','mar','qb','rest','qbname','coach']].round(1).to_string())
print(T[(T.team=='TB')&(T.season>=2020)][['season','mar','qb','rest','qbname']].round(1))
print('rest sd',T.rest.std().round(2),'qb sd',T.qb.std().round(2))
