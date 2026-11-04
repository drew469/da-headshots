import pandas as pd, numpy as np, json
S=pd.read_csv('data/player_stats_season.csv',low_memory=False); P=pd.read_csv('data/players.csv',low_memory=False)
S=S[(S.season_type=='REG')&(S.position=='TE')].merge(P[['gsis_id','birth_date']],left_on='player_id',right_on='gsis_id',how='left')
S=S[S.birth_date.notna()].copy()
S['age']=S.season-pd.to_datetime(S.birth_date).dt.year-((pd.to_datetime(S.birth_date).dt.month>=9).astype(int))
S['ypg']=S.receiving_yards/S.games.clip(lower=1); S['tdpy']=S.receiving_tds/S.receiving_yards.clip(lower=1)
S=S.sort_values(['player_id','season'])
nx=S.groupby('player_id').shift(-1)
S['n_season']=nx.season; S['n_ypg']=nx.ypg; S['n_g']=nx.games; S['n_age']=nx.age
# elite-ish pool: seasons with >=45 ypg and >=8 games  (Hernandez career 51.5 ypg)
E=S[(S.ypg>=45)&(S.games>=8)&(S.season<=2023)]
cont=E[E.n_season==E.season+1]
print('pool seasons',len(E),'players',E.player_id.nunique())
ages=list(range(23,39)); out={}
# aging: mean log ratio of ypg next year by age (smoothed with neighbors), retirement/out hazard, games dist
rows=[]
for a in ages:
    w=E[(E.age>=a-1)&(E.age<=a+1)]
    c=w[(w.n_season==w.season+1)&(w.n_g>=1)]
    lr=np.log(c.n_ypg.clip(lower=3)/c.ypg)
    haz=1-len(c)/len(w) if len(w) else .5
    rows.append(dict(age=a,n=len(w),lr=float(lr.mean()),sd=float(lr.std()),haz=float(haz),g=c.n_g.tolist()))
    print(a,len(w),'logratio %.3f sd %.3f exit %.3f games %.1f'%(lr.mean(),lr.std(),haz,c.n_g.mean()))
tdpy=E.tdpy.median(); print('median TD per yard',tdpy, 'AH',18/1956)
json.dump(dict(rows=rows,tdpy=float(tdpy)),open('aging.json','w'))
