import pandas as pd, numpy as np, json
S=pd.read_csv('/home/claude/ah-sim/data/player_stats_season.csv',low_memory=False); P=pd.read_csv('/home/claude/ah-sim/data/players.csv',low_memory=False)
S=S[(S.season_type=='REG')&(S.position=='WR')].merge(P[['gsis_id','birth_date','rookie_season','draft_year']],left_on='player_id',right_on='gsis_id',how='left')
S=S[S.birth_date.notna()].copy()
S['age']=S.season-pd.to_datetime(S.birth_date).dt.year-((pd.to_datetime(S.birth_date).dt.month>=9).astype(int))
S=S[S.rookie_season.fillna(S.draft_year).fillna(0)>=1999].sort_values(['player_id','season'])
S['cy']=S.groupby('player_id').receiving_yards.cumsum(); S['ctd']=S.groupby('player_id').receiving_tds.cumsum(); S['cg']=S.groupby('player_id').games.cumsum(); S['cypg']=S.cy/S.cg
ab=S[S.player_display_name=='Josh Gordon']; print(ab[['season','age','games','receiving_yards','receiving_tds','cy','cypg']])
m0=ab[ab.season==2013].iloc[0]; AY,ATD,AYPG,AAGE=float(m0.cy),int(m0.ctd),float(m0.cypg),int(m0.age)
# recent form: last 3 seasons ypg
r3=ab[(ab.season>=2012)&(ab.season<=2013)]; R3=r3.receiving_yards.sum()/r3.games.sum(); print('AB thru 2018',AY,ATD,AYPG,AAGE,'last3 ypg',R3)
C=[]
for pid,g in S.groupby('player_id'):
    n=g.player_display_name.iloc[0]
    if n=='Josh Gordon': continue
    m=g[(g.age>=21)&(g.age<=24)&(g.cy>=1600)&(g.cy<=4200)&(g.cypg>=50)&(g.season<=2016)]
    if len(m)==0: continue
    m=m.iloc[(m.age-AAGE).abs().argsort()[:1]].iloc[0]
    l3=g[(g.season>m.season-2)&(g.season<=m.season)]; r3=l3.receiving_yards.sum()/max(l3.games.sum(),1)
    seq=[];prev=m.season
    for _,f in g[g.season>m.season].iterrows():
        gap=int(f.season-prev-1)
        if gap>2: break
        seq+=[[0,0.0,0]]*gap; seq.append([int(f.games),float(f.receiving_yards),int(f.receiving_tds)]); prev=f.season
    C.append(dict(name=n,season=int(m.season),age=int(m.age),cy=float(m.cy),ctd=int(m.ctd),cypg=float(m.cypg),r3=float(r3),fut=seq,
      futy=float(sum(s[1] for s in seq)),futtd=int(sum(s[2] for s in seq)),nseas=len(seq),active24=bool(prev==2024)))
def wts(t,cs): return np.array([np.exp(-abs(np.log(c['r3']/t['r3']))/0.15)*np.exp(-abs(np.log(c['cy']/t['cy']))/0.4)*np.exp(-abs(c['age']-t['age'])/1.5) for c in cs])
T=dict(cy=AY,r3=R3,age=AAGE); w=wts(T,C)
for c,x in zip(C,w): c['w']=float(x)
C=sorted(C,key=lambda c:-c['w'])
for c in C: print('%-20s %d age%d cum%6d r3 %5.1f w%.3f | future %6d yds %3d td %2d seasons%s'%(c['name'],c['season'],c['age'],c['cy'],c['r3'],c['w'],c['futy'],c['futtd'],c['nseas'],' (thru 2024)' if c['active24'] else ''))
json.dump(dict(C=C,T=dict(cy=AY,ctd=ATD,cypg=AYPG,r3=R3,age=AAGE)),open('comps.json','w')); print(len(C))
