import pandas as pd, numpy as np, json
Q=pd.read_parquet('qbrank.parquet'); P=pd.read_csv('/home/claude/ah-sim/data/players.csv',low_memory=False)[['gsis_id','display_name','birth_date']]
Q=Q.merge(P,left_on='id',right_on='gsis_id',how='left')
Q['age']=Q.season-pd.to_datetime(Q.birth_date).dt.year-((pd.to_datetime(Q.birth_date).dt.month>=9).astype(int))
H=Q[Q.season<=2025].copy(); H['won']=(H.team==H.sbw)
def tier(r): return 0 if r<=3 else 1 if r<=8 else 2 if r<=16 else 3
H['tier']=H['rank'].apply(tier)
pt=H.groupby('tier').won.agg(['mean','sum','size']); print(pt)
# seasons where a team's main QB didn't qualify: P(SB) for that team ~ leftover
tot=H.season.nunique(); won_q=H.won.sum(); print('SB won by qualifying QBs',won_q,'of',tot)
PT=pt['mean'].tolist(); P_OUT=0.01
print('P_OUT',P_OUT)
# comps: >=3 top-3 seasons by age 29, careers observed to age 30+
C=[]
for (pid,name),g in Q.groupby(['id','display_name']):
    g=g.sort_values('season')
    if g.age.isna().all(): continue
    if not(((g['rank']<=3)&(g.age<=29)).sum()>=2 or ((g['rank']<=8)&(g.age<=29)).sum()>=3) or name=='Patrick Mahomes': continue
    a0=g.age.min(); 
    fut=[]; last=int(g.season.max()); first30=None
    for _,r in g.iterrows(): pass
    # build season-by-season from age 30 using season numbers
    s30=int(g.season[g.age==30].iloc[0]) if (g.age==30).any() else int(g.season.iloc[0]+(30-g.age.iloc[0]))
    if s30>2025: continue
    for s in range(s30,min(last,2025)+1):
        r=g[g.season==s]; fut.append(int(tier(r['rank'].iloc[0])) if len(r) else 4)
    while fut and fut[-1]==4: fut.pop()
    C.append(dict(name=name,s30=s30,fut=fut,top3=int(((g['rank']<=3)&(g.age<=29)).sum()),active=bool(last>=2025)))
for c in C: print(c)
json.dump(dict(PT=PT,P_OUT=P_OUT,C=C),open('model.json','w'))
