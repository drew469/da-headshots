import pandas as pd, numpy as np, json
exec(open('model.py').read().split("# elite-ish")[0])
S['cy']=S.groupby('player_id').receiving_yards.cumsum(); S['cg']=S.groupby('player_id').games.cumsum(); S['cypg']=S.cy/S.cg
S['first']=S.groupby('player_id').season.transform('min')
M=S[(S.cy>=1300)&(S.cy<=2900)&(S.age>=21)&(S.age<=25)&(S.cypg>=38)&(S.season<=2016)&(S.player_id!='00-0027713')]
M=M[~M.player_display_name.isin(['Jordan Matthews','Devin Funchess'])]  # WRs mislabeled as TE
M=M.sort_values('season').groupby('player_id').head(1)  # first season they hit the band
C=[]
for _,m in M.iterrows():
    fut=S[(S.player_id==m.player_id)&(S.season>m.season)].sort_values('season')
    # stop at first gap year (out of league) -> treat as retirement
    seq=[];prev=m.season
    for _,f in fut.iterrows():
        if f.season!=prev+1: break
        seq.append([int(f.games),float(f.receiving_yards),int(f.receiving_tds)]); prev=f.season
    w=np.exp(-abs(m.age-23)/1.5)*np.exp(-abs(np.log(m.cypg/51.47))/0.25)
    C.append(dict(name=m.player_display_name,season=int(m.season),age=int(m.age),cy=float(m.cy),cypg=float(m.cypg),w=float(w),fut=seq,
       futy=float(sum(s[1] for s in seq)),futtd=int(sum(s[2] for s in seq)),nseas=len(seq),censored=bool(prev==2024)))
C=sorted(C,key=lambda c:-c['w'])
for c in C: print('%-20s %d age%d cum%5d ypg%5.1f w%.2f  future %6d yds %3d td %2d seasons%s'%(c['name'],c['season'],c['age'],c['cy'],c['cypg'],c['w'],c['futy'],c['futtd'],c['nseas'],' (active)' if c['censored'] else ''))
json.dump(C,open('comps.json','w'))
