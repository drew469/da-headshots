import pandas as pd, numpy as np, json
d=pd.read_csv('data/ne/NBA Elo 2025 - nba_elo.csv',parse_dates=['date'])
def last(team,season):
    g=d[((d.team1==team))&(d.season==season)].sort_values('date')
    r=g.iloc[-1]; return r.elo1_post, g.elo1_post.max(), g[g.playoff.isna()].elo1_post.iloc[-1]
for t,s in [('CHI',1996),('GSW',2017),('CHI',1997),('GSW',2016),('GSW',2018),('CHI',1992),('LAL',2001),('BOS',1986),('CHI',1991)]:
    print(t,s,[round(x) for x in last(t,s)])
