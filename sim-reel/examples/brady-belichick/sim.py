import pandas as pd, numpy as np, json
from scipy.special import ndtr
FIX={'OAK':'LV','SD':'LAC','STL':'LA'}
K,HFA,SIG=1.0,2.6,13.5
T=pd.read_csv('ratings.csv')
G=pd.read_csv('/home/claude/brady-sim/data/games_nflverse.csv')
for c in ['home_team','away_team']: G[c]=G[c].replace(FIX)
NEW={'AFC':[['BUF','MIA','NE','NYJ'],['BAL','CIN','CLE','PIT'],['HOU','IND','JAX','TEN'],['DEN','KC','LV','LAC']],
     'NFC':[['DAL','NYG','PHI','WAS'],['CHI','DET','GB','MIN'],['ATL','CAR','NO','TB'],['ARI','LA','SF','SEA']]}
OLD={'AFC':[['BUF','IND','MIA','NE','NYJ'],['BAL','CIN','CLE','JAX','PIT','TEN'],['DEN','KC','LV','LAC','SEA']],
     'NFC':[['ARI','DAL','NYG','PHI','WAS'],['CHI','DET','GB','MIN','TB'],['ATL','CAR','NO','SF','LA']]}
SEAS=[y for y in range(2001,2020) if y!=2008]
rng=np.random.default_rng(7)
def season(y,S,teams):
    ix={t:i for i,t in enumerate(teams)}; N=S.shape[0]
    g=G[(G.season==y)&(G.game_type=='REG')]
    W=rng.random((N,len(teams)))*0.01
    for h,a,loc in zip(g.home_team,g.away_team,g.location):
        hi,ai=ix[h],ix[a]; p=ndtr((S[:,hi]-S[:,ai]+(HFA if loc!='Neutral' else 0))/SIG)
        w=rng.random(N)<p; W[:,hi]+=w; W[:,ai]+=~w
    champ=np.empty(N,int); rows=np.arange(N)
    finals=[]
    for conf,divs in (OLD if y<2002 else NEW).items():
        D=[np.array([ix[t] for t in d]) for d in divs]
        win=np.stack([d[np.argmax(W[:,d],1)] for d in D],1)          # (N,nd)
        Wm=W.copy(); Wm[rows[:,None],win]=-1e9
        cidx=np.concatenate(D); nwc=6-len(D)
        order=np.argsort(-Wm[:,cidx],1)[:,:nwc]; wc=cidx[order]
        wo=np.argsort(-W[rows[:,None],win],1); win=np.take_along_axis(win,wo,1)
        wo2=np.argsort(-W[rows[:,None],wc],1); wc=np.take_along_axis(wc,wo2,1)
        seeds=np.concatenate([win,wc],1)   # seed1..6
        def play(a,b,hfa=HFA):
            p=ndtr((S[rows,a]-S[rows,b]+hfa)/SIG); return np.where(rng.random(N)<p,a,b)
        s=lambda i: seeds[:,i-1]
        w36=play(s(3),s(6)); w45=play(s(4),s(5))
        sn36=np.where(w36==s(3),3,6); sn45=np.where(w45==s(4),4,5)
        low=np.where(sn36>sn45,w36,w45); hi_=np.where(sn36>sn45,w45,w36); hisn=np.minimum(sn36,sn45)
        d1=play(s(1),low); d2=play(s(2),hi_)
        cc=play(d1,d2); finals.append(cc)
        if conf=='AFC': pass
    a,b=finals; champ=np.where(rng.random(N)<ndtr((S[rows,a]-S[rows,b])/SIG),a,b)
    return champ,finals,ix
def run(N=100000,mode='real'):
    franch=sorted(set(T[T.season==2010].team)-{'NE'})
    f=rng.integers(0,len(franch),N)
    ringsB=np.zeros(N,int); ringsNE=np.zeros(N,int); sbB=np.zeros(N,int); per=[]
    for y in SEAS:
        ty=T[T.season==y].set_index('team'); teams=list(ty.index)
        base=(K*ty.mar).values; S=np.tile(base,(N,1)); ix={t:i for i,t in enumerate(teams)}
        bq=ty.loc['NE','qb']
        if mode=='swap':
            ne=ix['NE']; S[:,ne]=K*ty.loc['NE','rest']
            fi=np.array([ix[franch[j]] if franch[j] in ix else ne for j in range(len(franch))])[f]
            S[np.arange(N),fi]=K*(ty.rest.values[fi]+bq)
        else: fi=np.full(N,ix['NE'])
        champ,(af,nf),_=season(y,S,teams)
        rb=champ==fi; ringsB+=rb; sbB+=(af==fi)|(nf==fi); ringsNE+=champ==ix['NE']
        per.append(dict(y=y,pB=float(rb.mean()),pNE=float((champ==ix['NE']).mean())))
        print(y,round(rb.mean(),3),round((champ==ix['NE']).mean(),3),flush=True)
    return dict(ringsB=np.bincount(ringsB).tolist(),sbB=np.bincount(sbB).tolist(),ringsNE=np.bincount(ringsNE).tolist(),
        meanB=float(ringsB.mean()),meanNE=float(ringsNE.mean()),per=per,f=np.bincount(f,minlength=len(franch)).tolist(),franch=franch,
        byfr={franch[j]:float(ringsB[f==j].mean()) for j in range(len(franch))})
out={'real':run(mode='real'),'swap':run(mode='swap')}
json.dump(out,open('sim.json','w'))
for k,v in out.items(): print(k,'Brady mean',round(v['meanB'],2),'dist',v['ringsB'][:10],'NE',round(v['meanNE'],2),v['ringsNE'][:8])
