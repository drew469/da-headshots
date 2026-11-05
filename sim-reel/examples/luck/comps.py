import pandas as pd, numpy as np, json
S=pd.read_csv('/home/claude/ah-sim/data/player_stats_season.csv',low_memory=False); P=pd.read_csv('/home/claude/ah-sim/data/players.csv',low_memory=False)
S=S[(S.season_type=='REG')&(S.position=='QB')].merge(P[['gsis_id','birth_date','rookie_season','draft_year','draft_pick']],left_on='player_id',right_on='gsis_id',how='left')
S=S[S.birth_date.notna()].copy()
S['age']=S.season-pd.to_datetime(S.birth_date).dt.year-((pd.to_datetime(S.birth_date).dt.month>=9).astype(int))
S=S.sort_values(['player_id','season'])
S=S[S.rookie_season.fillna(S.draft_year).fillna(0)>=1999]
S['cy']=S.groupby('player_id').passing_yards.cumsum(); S['ctd']=S.groupby('player_id').passing_tds.cumsum(); S['cg']=S.groupby('player_id').games.cumsum(); S['cypg']=S.cy/S.cg
LY,LTD,LYPG=23671,171,23671/86
C=[]
for pid,g in S.groupby('player_id'):
    n=g.player_display_name.iloc[0]
    if n=='Andrew Luck': continue
    m=g[(g.age>=27)&(g.age<=29)&(g.cy>=14000)&(g.cy<=34000)&(g.cypg>=200)&(g.season<=2019)]
    if len(m)==0: continue
    m=m.iloc[(m.age-28).abs().argsort()[:1]].iloc[0]
    seq=[];prev=m.season
    for _,f in g[g.season>m.season].iterrows():
        gap=int(f.season-prev-1)
        if gap>2: break
        seq+= [[0,0.0,0]]*gap
        seq.append([int(f.games),float(f.passing_yards),int(f.passing_tds)]); prev=f.season
    w=np.exp(-abs(np.log(m.cypg/LYPG))/0.15)*np.exp(-abs(np.log(m.cy/LY))/0.4)*np.exp(-abs(m.age-28)/1.5)
    C.append(dict(name=n,season=int(m.season),age=int(m.age),cy=float(m.cy),ctd=int(m.ctd),cypg=float(m.cypg),w=float(w),fut=seq,
      futy=float(sum(s[1] for s in seq)),futtd=int(sum(s[2] for s in seq)),nseas=len(seq),active24=bool(prev==2024)))
C=sorted(C,key=lambda c:-c['w'])
for c in C: print('%-20s %d age%d cum%6d ypg%5.1f w%.3f | future %6d yds %3d td %2d seasons%s'%(c['name'],c['season'],c['age'],c['cy'],c['cypg'],c['w'],c['futy'],c['futtd'],c['nseas'],' (thru 2024)' if c['active24'] else ''))
json.dump(C,open('comps.json','w')); print(len(C))
