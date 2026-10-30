"""Lions 1966-2025: per-game pre-game win prob (538 Elo through 2020, same method extended 2021-2025),
season records for every team, Lions playoff games."""
import csv, json, math, sys
sys.path.insert(0,'/home/claude/brady-sim')
D='/home/claude/brady-sim/data'
HFA,K,REVERT=65.0,20.0,1/3
def prob(diff): return 1/(10**(-diff/400)+1)
def update(elo,t1,t2,s1,s2,neutral):
    diff=elo[t1]-elo[t2]+(0 if neutral else HFA); p=prob(diff)
    r=1.0 if s1>s2 else 0.0 if s1<s2 else 0.5
    mult=math.log(max(abs(s1-s2),1)+1)*(2.2/(1.0 if r==.5 else ((diff if r==1 else -diff)*.001+2.2)))
    sh=K*mult*(r-p); elo[t1]+=sh; elo[t2]-=sh; return p
G=[]; elo={}
for g in csv.DictReader(open(f'{D}/nfl_games.csv')):
    s=int(g['season'])
    e1,e2=float(g['elo1']),float(g['elo2'])
    tmp={g['team1']:e1,g['team2']:e2}; update(tmp,g['team1'],g['team2'],int(g['score1']),int(g['score2']),g['neutral']=='1'); elo.update(tmp)
    if s<1966: continue
    G.append(dict(s=s,date=g['date'],po=g['playoff']!='0',h=g['team1'],a=g['team2'],p=float(g['elo_prob1']),hs=int(g['score1']),as_=int(g['score2']),eh=e1,ea=e2,neutral=g['neutral']=='1'))
MAP={'LA':'LAR','STL':'LAR','SD':'LAC','LV':'OAK','WAS':'WSH'}
nv=list(csv.DictReader(open(f'{D}/games_nflverse.csv')))
for s in range(2021,2026):
    for t in elo: elo[t]=1505*REVERT+elo[t]*(1-REVERT)
    for g in sorted([g for g in nv if g['season']==str(s)],key=lambda g:(g['gameday'],g['game_id'])):
        h,a=MAP.get(g['home_team'],g['home_team']),MAP.get(g['away_team'],g['away_team']); nt=g['location']=='Neutral'
        e1,e2=elo[h],elo[a]; p=update(elo,h,a,int(g['home_score']),int(g['away_score']),nt)
        G.append(dict(s=s,date=g['gameday'],po=g['game_type']!='REG',h=h,a=a,p=p,hs=int(g['home_score']),as_=int(g['away_score']),eh=e1,ea=e2,neutral=nt,rd=g['game_type']))
json.dump(G,open('games.json','w'))
L=[g for g in G if g['po'] and 'DET' in (g['h'],g['a'])]
for g in L:
    me=g['h']=='DET'; pd=g['p'] if me else 1-g['p']; w=(g['hs']>g['as_'])==me
    print(g['s'],g['h'],g['a'],g['hs'],g['as_'],'p_DET=%.3f'%pd,'W' if w else 'L')
print('exp wins',sum((g['p'] if g['h']=='DET' else 1-g['p']) for g in L),'actual',sum(((g['hs']>g['as_'])==(g['h']=='DET')) for g in L),'n',len(L))
