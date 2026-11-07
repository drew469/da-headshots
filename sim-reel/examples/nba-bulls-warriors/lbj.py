import pandas as pd, numpy as np, json
E=lambda x:1/(1+10**(-x/400))
rng=np.random.default_rng(23)
d=pd.read_csv('data/ne/NBA Elo 2025 - nba_elo.csv',parse_dates=['date'])
R=pd.read_csv('data/ne/nba_estimated_RAPTOR.csv',encoding='latin-1'); R=R[R.Type=='RS']
P=d[d.playoff.notna()].sort_values('date').copy()
P['k2']=[tuple(sorted([a,b])) for a,b in zip(P.team1,P.team2)]
P=P.drop_duplicates(['date','k2'])
TEAM_MP=48*82*5; EPP=0.95*28
def contrib(name,year):
    x=R[(R.Player==name)&(R.Year==year)]
    if not len(x): return 0.0
    return float((x.eRT*x.MP).sum()/(TEAM_MP/5)*EPP)   # Elo points
def path(team,season):
    s=P[P.season==season]; out=[]; cur=team; t0=pd.Timestamp('1900-01-01')
    while True:
        g=s[(s.date>t0)&((s.team1==cur)|(s.team2==cur))]
        if not len(g): break
        opp=g.iloc[0].team2 if g.iloc[0].team1==cur else g.iloc[0].team1
        ser=g[g.k2==tuple(sorted([cur,opp]))]
        r0=ser.iloc[0]; home_first=(r0.team1==cur and r0.is_home==1) or (r0.team2==cur and r0.is_home==0)
        # opponent elo at series start, team elo at series start
        eo=r0.elo2_pre if r0.team1==cur else r0.elo1_pre
        wins=[(x.team1 if x.score1>x.score2 else x.team2) for x in ser.itertuples()]
        best=7 if len(ser)>=4 and max(wins.count(cur),wins.count(opp))==4 else (5 if max(wins.count(cur),wins.count(opp))==3 else 3)
        if max(wins.count(cur),wins.count(opp))==4: best=7
        out.append(dict(opp=opp,eo=float(eo),home=bool(home_first),best=best,neutral=bool(r0.neutral==1)))
        winner=cur if wins.count(cur)>wins.count(opp) else opp
        cur=winner if winner!=team else team
        t0=ser.date.max()
    return out
def team_elo_pre(team,season):
    g=d[(d.season==season)&(d.team1==team)&d.playoff.isna()].sort_values('date'); return float(g.elo1_post.iloc[-1])
def sim_series(ea,s,N):
    n=s['best']; need=n//2+1
    ven={7:[1,1,0,0,1,0,1],5:[1,1,0,0,1],3:[1,0,1]}[n]
    if not s['home']: ven=[1-v for v in ven]
    hca=0 if s['neutral'] else 100
    W=np.zeros(N,int);L=np.zeros(N,int)
    for v in ven:
        live=(W<need)&(L<need); p=E(ea-s['eo']+(hca if v else -hca)); w=rng.random(N)<p; W+=live&w; L+=live&~w
    return W==need
def titles(team,seasons,delta,N=100000):
    T=np.zeros(N,int); per={}
    for y in seasons:
        pth=path(team,y); ea=team_elo_pre(team,y)+delta[y]; alive=np.ones(N,bool)
        for s in pth: alive&=sim_series(ea,s,N)
        # if real team won title path has 4 rounds; if eliminated, path continues via eliminator so still full
        T+=alive; per[y]=dict(p=float(alive.mean()),rounds=len(pth),delta=round(delta[y],1),elo=round(ea))
    return T,per
out={}
# Bulls 1985-1998, LeBron age-matched (age = Jordan age that season)
jy=list(range(1985,1999)); 
dl={y:contrib('LeBron James',y+21)-contrib('Michael Jordan',y) for y in jy}
for y in jy: print(y,'MJ',round(contrib('Michael Jordan',y)),'LBJ',y+21,round(contrib('LeBron James',y+21)))
T0,p0=titles('CHI',jy,{y:0 for y in jy}); T1,p1=titles('CHI',jy,dl)
out['bulls_real']=dict(dist=np.bincount(T0).tolist(),mean=float(T0.mean()),per=p0)
out['bulls_lebron']=dict(dist=np.bincount(T1).tolist(),mean=float(T1.mean()),per=p1)
# LeBron's teams 2006-2019 with Jordan age-matched (1994 -> avg of 1993,1996)
ly=list(range(2006,2020)); TM={y:('CLE' if y<=2010 or 2015<=y<=2018 else ('MIA' if y<=2014 else 'LAL')) for y in ly}
def mj(y): 
    yy=y-21
    return (contrib('Michael Jordan',1993)+contrib('Michael Jordan',1996))/2 if yy in (1994,1995) else contrib('Michael Jordan',yy)
res=[];resr=[]
Tm=np.zeros(100000,int); Tr=np.zeros(100000,int); pm={}
for y in ly:
    if y==2019: continue  # Lakers missed playoffs
    dd=mj(y)-contrib('LeBron James',y)
    a,pp=titles(TM[y],[y],{y:dd}); b,_=titles(TM[y],[y],{y:0}); Tm+=a; Tr+=b; pm[y]=pp[y]
out['lebron_real']=dict(dist=np.bincount(Tr).tolist(),mean=float(Tr.mean()))
out['lebron_mj']=dict(dist=np.bincount(Tm).tolist(),mean=float(Tm.mean()),per=pm)
json.dump(out,open('lbj.json','w'),indent=0)
for k,v in out.items(): print(k,round(v['mean'],2),v['dist'])
for y,v in p1.items(): print(y,v,'real',p0[y]['p'])
