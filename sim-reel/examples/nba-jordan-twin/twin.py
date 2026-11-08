import pandas as pd, numpy as np, json
D='data/br/Data/'
A=pd.read_csv(D+'Advanced.csv'); P=pd.read_csv(D+'Per 100 Poss.csv')
def one(df):
    df=df[(df.lg=='NBA')&(df.season>=1980)&(df.season<=2026)].copy()
    multi=df.team.astype(str).str.match(r'^(TOT|\dTM)$')
    df['m']=multi
    df=df.sort_values('m',ascending=False).drop_duplicates(['season','player_id'])
    return df
A=one(A); P=one(P)
X=A.merge(P[['season','player_id','pts_per_100_poss','ft_percent']],on=['season','player_id'])
X=X[X.mp>=1000].copy()
M={'pts100':'pts_per_100_poss','ts':'ts_percent','usg':'usg_percent','ftr':'f_tr','3par':'x3p_ar','ast':'ast_percent','tov':'tov_percent','orb':'orb_percent','drb':'drb_percent','blk':'blk_percent','stl':'stl_percent','dimp':'dbpm','oimp':'obpm','ftp':'ft_percent'}
for k,c in M.items():
    X[k]=X.groupby('season')[c].rank(pct=True)*100
X['tov']=100-X['tov']  # lower turnovers = better? keep as "ball security" percentile
K=list(M)
X=X.dropna(subset=K)
T=X[(X.player=='Michael Jordan')&(X.season==1996)].iloc[0]
print('Jordan 96 n=',len(X)); print(T[K].round(1).to_dict())
O=X[X.player_id!=T.player_id].copy()
O['dist']=np.sqrt(((O[K]-T[K].astype(float))**2).sum(1))
O=O.sort_values('dist')
print(O[['season','player','team','dist','pts100','ts','usg','oimp','dimp']].head(15).round(1).to_string())
print('median dist',O.dist.median().round(1),'n',len(O))
# own seasons
J=X[X.player_id==T.player_id].copy(); J['dist']=np.sqrt(((J[K]-T[K].astype(float))**2).sum(1)); print(J[['season','team','dist']].round(1))
# raw rank of Jordan 96 in oimp etc
for k,c in M.items():
    r=(X[c]>T[c]).sum()+1 if k!='tov' else (X[c]<T[c]).sum()+1
    print(k,c,T[c],'rank all-time',r)
O.head(50).to_csv('closest.csv',index=False); X.to_pickle('X.pkl')
