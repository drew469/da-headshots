import pandas as pd, numpy as np, json
S=pd.read_csv('/home/claude/ah-sim/data/player_stats_season.csv',low_memory=False); P=pd.read_csv('/home/claude/ah-sim/data/players.csv',low_memory=False)
S=S[(S.season_type=='REG')&(S.position=='WR')]
P=P[P.position=='WR'][['gsis_id','draft_year','draft_round','draft_pick','display_name']]
S=S.merge(P,left_on='player_id',right_on='gsis_id')
S=S[(S.draft_round==1)&(S.draft_year>=1999)&(S.draft_year<=2017)]
C=[]
RY,RG,RR=921,20,50  # Ruggs first two seasons: yards, games, receptions
for pid,g in S.groupby('player_id'):
    g=g.sort_values('season'); dy=int(g.draft_year.iloc[0])
    f2=g[g.season<=dy+1]; 
    if len(f2)==0: continue
    y,gm,rec=f2.receiving_yards.sum(),f2.games.sum(),f2.receptions.sum()
    if not(500<=y<=1500 and gm>=12): continue
    ypg=y/gm; ypr=y/max(rec,1)
    seq=[];prev=dy+1
    for _,r in g[g.season>dy+1].iterrows():
        if r.season!=prev+1: break
        seq.append([int(r.games),float(r.receiving_yards),int(r.receiving_tds)]); prev=r.season
    w=np.exp(-abs(np.log(ypg/(RY/RG)))/0.25)*np.exp(-abs(np.log(ypr/(RY/RR)))/0.3)
    C.append(dict(name=g.player_display_name.iloc[0],dy=dy,pick=int(g.draft_pick.iloc[0]),y2=float(y),ypg=float(ypg),ypr=float(ypr),w=float(w),fut=seq,
      f3=float(sum(s[1] for s in seq[:3])),futy=float(sum(s[1] for s in seq)),nseas=len(seq),best=float(max([s[1] for s in seq],default=0))))
C=sorted(C,key=lambda c:-c['w'])
for c in C: print('%-20s %d #%2d 2yr %4d ypg %4.1f ypr %4.1f w %.2f | next3 %5d career-after %5d seasons %2d best %4d'%(c['name'],c['dy'],c['pick'],c['y2'],c['ypg'],c['ypr'],c['w'],c['f3'],c['futy'],c['nseas'],c['best']))
print(len(C))
json.dump(C,open('comps.json','w'))
