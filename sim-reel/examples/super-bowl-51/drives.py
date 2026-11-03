import pandas as pd, numpy as np, glob
rows=[]
cols=['game_id','season','season_type','posteam','defteam','fixed_drive','fixed_drive_result','yardline_100','game_seconds_remaining','posteam_score','defteam_score','qtr','home_team','away_team','play_type','home_score','away_score','result']
for y in range(2009,2026):
    d=pd.read_parquet(f'/home/claude/fg-sim/pbp/pbp_{y}.parquet',columns=cols)
    d=d[d.posteam.notna()&d.fixed_drive.notna()&d.yardline_100.notna()&d.play_type.isin(['pass','run','punt','field_goal','qb_kneel','qb_spike','no_play'])]
    g=d.groupby(['game_id','fixed_drive'],sort=False)
    f=g.first(); l=g.last()
    D=pd.DataFrame({'game_id':[i[0] for i in f.index],'drive':[i[1] for i in f.index],'season':f.season.values,'stype':f.season_type.values,
       'off':f.posteam.values,'def':f.defteam.values,'res':f.fixed_drive_result.values,'start':f.yardline_100.values,'t0':f.game_seconds_remaining.values,
       't1':l.game_seconds_remaining.values,'diff':(f.posteam_score-f.defteam_score).values,'qtr':f.qtr.values,
       'home':f.home_team.values,'hs':f.home_score.values,'as':f.away_score.values})
    rows.append(D)
D=pd.concat(rows,ignore_index=True).sort_values(['game_id','drive']).reset_index(drop=True)
D['dur']=(D.t0-D.t1).clip(lower=5)
# next opponent start
D['nstart']=D.groupby('game_id').start.shift(-1); D['ndef']=D.groupby('game_id').off.shift(-1)
D.loc[D.ndef!=D['def'],'nstart']=np.nan
print(D.res.value_counts()); print(len(D))
D.to_parquet('drives.parquet')
