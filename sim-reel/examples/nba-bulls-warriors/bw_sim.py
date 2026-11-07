import pandas as pd, numpy as np, json
E=lambda x:1/(1+10**(-x/400))
rng=np.random.default_rng(96)
def series(ea,eb,home_a=True,N=100000,hca=100):
    ven=[1,1,0,0,1,0,1] if home_a else [0,0,1,1,0,1,0]
    W=np.zeros(N,int);L=np.zeros(N,int);n=np.zeros(N,int)
    for v in ven:
        live=(W<4)&(L<4); p=E(ea-eb+(hca if v else -hca)); w=rng.random(N)<p
        W+=live&w; L+=live&~w; n+=live
    return W==4, n
CHI,GSW=1823.0,1846.0
aw,n=series(CHI,GSW,True)
print('Bulls win',aw.mean())
for k in range(4,8): print('Bulls in',k,(aw&(n==k)).mean().round(4),'Warriors in',k,(~aw&(n==k)).mean().round(4))
aw2,_=series(CHI,GSW,False); print('Bulls win w/o home court',aw2.mean())
pk,_=series(1853,1865,True); print('peak',pk.mean())
# calibration of Elo series predictions, 1984+
d=pd.read_csv('data/ne/NBA Elo 2025 - nba_elo.csv',parse_dates=['date'])
p=d[d.playoff.notna()&(d.season>=1984)].sort_values('date').copy()
p['k2']=[(s,)+tuple(sorted([a,b])) for s,a,b in zip(p.season,p.team1,p.team2)]
p=p.drop_duplicates(['date','k2'])
rows=[]
for k,g in p.groupby('k2',sort=False):
    g=g.reset_index(drop=True); r=g.iloc[0]
    if len(g)<4: continue
    a=r.team1; h1=a if r.is_home==1 else r.team2
    ea=r.elo1_pre; eb=r.elo2_pre
    wins=[(x.team1 if x.score1>x.score2 else x.team2) for x in g.itertuples()]
    best=4 if max(wins.count(a),wins.count(r.team2))==4 else 3
    if best!=4: continue
    if r.neutral==1: hca=0
    else: hca=100
    aw,_=series(ea,eb,h1==a,N=20000,hca=hca)
    rows.append(dict(p=aw.mean(),won=wins.count(a)==4))
C=pd.DataFrame(rows); C['fav']=np.maximum(C.p,1-C.p); C['fw']=np.where(C.p>=.5,C.won,~C.won)
C['b']=pd.cut(C.fav,[.5,.6,.7,.8,.9,1])
print(len(C)); print(C.groupby('b').agg(n=('fw','size'),pred=('fav','mean'),act=('fw','mean')).round(3))
json.dump(dict(bulls=float(aw.mean())),open('bw.json','w'))
