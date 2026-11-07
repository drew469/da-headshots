import pandas as pd, numpy as np, json
rows=[]
for y in range(1999,2027):
    d=pd.read_parquet(f'/home/claude/fg-sim/pbp/pbp_{y}.parquet',columns=['season','season_type','posteam','qb_dropback','qb_epa','id','name','game_id','home_team','away_team','home_score','away_score','week'])
    r=d[(d.season_type=='REG')&(d.qb_dropback==1)&d.id.notna()]
    g=r.groupby(['id','name']).agg(n=('qb_epa','size'),epa=('qb_epa','mean'),team=('posteam',lambda s:s.mode().iloc[0])).reset_index()
    g=g[g.n>=250].sort_values('epa',ascending=False); g['rank']=np.arange(1,len(g)+1); g['season']=y; g['nq']=len(g)
    # super bowl winner
    p=d[d.season_type=='POST']
    sbw=None
    if len(p):
        last=p.groupby('game_id').last().reset_index(); last=last[last.week==last.week.max()]
        if len(last)==1 and y<2026:
            r0=last.iloc[0]; sbw=r0.home_team if r0.home_score>r0.away_score else r0.away_team
    g['sbw']=sbw; rows.append(g)
Q=pd.concat(rows); Q.to_parquet('qbrank.parquet')
print(Q.groupby('season').sbw.first().to_dict())
print(Q[Q.name.str.contains('Mahomes')][['season','team','n','epa','rank','nq']])
