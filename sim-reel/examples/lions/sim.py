import json, math, numpy as np, collections
G=json.load(open('games.json'))
HFA=65.0
def prob(d): return 1/(10**(-d/400)+1)
def upd(e1,e2,s1,s2,neutral):
    diff=e1-e2+(0 if neutral else HFA); p=prob(diff); r=1.0 if s1>s2 else 0.0 if s1<s2 else 0.5
    mult=math.log(max(abs(s1-s2),1)+1)*(2.2/(1.0 if r==.5 else ((diff if r==1 else -diff)*.001+2.2))); sh=20*mult*(r-p); return e1+sh,e2-sh
NFC_DIV={}
def divs(s):
    if s==1966: return {'W':['IND','CHI','DET','GB','LAR','MIN','SF']}
    if s<=1969: return {'C':['CHI','DET','GB','MIN']}
    if s<=2001:
        c=['CHI','DET','GB','MIN']+(['TB'] if s>=1977 else [])
        w=['ATL','LAR','NO','SF']+(['CAR'] if s>=1995 else [])+(['SEA'] if s==1976 else [])
        return {'E':['DAL','NYG','PHI','WSH','ARI'],'C':c,'W':w}
    return {'E':['DAL','NYG','PHI','WSH'],'N':['CHI','DET','GB','MIN'],'S':['ATL','CAR','NO','TB'],'W':['ARI','LAR','SF','SEA']}
def nwc(s):
    return 0 if s<=1969 else 1 if s<=1977 else 2 if s<=1989 else 3
def nbye(s):
    return None if s<=1977 else 'div' if s<=1989 else 2 if s<=2019 else 1
rng=np.random.default_rng(1957)
N=100_000
seasons=sorted(set(g['s'] for g in G if g['s']<=2025))
out=dict(titles=np.zeros(N,int),sbapp=np.zeros(N,int),pwins=np.zeros(N,int),apps=np.zeros(N,int))
perseason={}
for s in seasons:
    reg=[g for g in G if g['s']==s and not g['po']]
    po=[g for g in G if g['s']==s and g['po']]
    rec=collections.Counter(); elo={}
    for g in sorted(reg,key=lambda g:g['date']):
        r=1 if g['hs']>g['as_'] else 0 if g['hs']<g['as_'] else .5
        rec[g['h']]+=r; rec[g['a']]+=1-r
        e1,e2=upd(g['eh'],g['ea'],g['hs'],g['as_'],g['neutral']); elo[g['h']]=e1; elo[g['a']]=e2
    D=divs(s); nfc=[t for d in D.values() for t in d]
    # actual NFC playoff teams (from playoff games, excluding SB): teams in nfc that appear
    poteams=set()
    for g in po:
        if s<=1969:
            pass
        for t in (g['h'],g['a']):
            if t in nfc: poteams.add(t)
    # Lions' sim regular season
    dg=[(g['p'] if g['h']=='DET' else 1-g['p']) for g in reg if 'DET' in (g['h'],g['a'])]
    W=(rng.random((N,len(dg)))<np.array(dg)).sum(1).astype(float)
    # actual others
    others={t:rec[t] for t in nfc if t!='DET'}
    divmates=[t for d in D.values() if 'DET' in d for t in d if t!='DET']
    dmax=max(others[t] for t in divmates)
    tb=rng.random(N)<.5
    divwin=(W>dmax)|((W==dmax)&tb)
    # other division winners (actual best per division, prefer actual playoff team on ties)
    odw=[]
    for k,d in D.items():
        if 'DET' in d: continue
        best=max(others[t] for t in d); cand=[t for t in d if others[t]==best]; c2=[t for t in cand if t in poteams]; odw.append((c2 or cand)[0])
    # Lions' division "winner" if Lions don't win it
    dcand=[t for t in divmates if others[t]==dmax]; dw_real=([t for t in dcand if t in poteams] or dcand)[0]
    k=nwc(s)
    if s==1982:  # 8-team conference tournament
        pool=sorted(others.items(),key=lambda x:-x[1]); cut=pool[7][1]
        made=(W>cut)|((W==cut)&tb)
        divwin=np.zeros(N,bool); iswc=made
    else:
        wcpool=sorted([(others[t],t) for t in nfc if t!='DET' and t not in odw],reverse=True)
        # if Lions don't win div, the real div winner is not in wc pool
        wc_noLdiv=[x for x in wcpool if x[1]!=dw_real]
        cut_w=wc_noLdiv[k-1][0] if k>0 else 1e9
        iswc=(~divwin)&((W>cut_w)|((W==cut_w)&(rng.random(N)<.5)))
        made=divwin|iswc
    # playoff path for qualified sims: bracket with real Elo of other qualifiers
    LE=elo['DET']
    # field without Lions: top teams
    def field_for(dw):
        if s==1982:
            pool=sorted(others.items(),key=lambda x:-x[1])[:7]; return [(t,v,False) for t,v in pool]
        dws=odw+([] if dw else [dw_real])
        wcs=[x[1] for x in sorted([(others[t],t) for t in nfc if t!='DET' and t not in dws],reverse=True)][:k-(0 if dw else 1)] if k>0 else []
        return [(t,others[t],True) for t in dws]+[(t,others[t],False) for t in wcs]
    sbopp=[g for g in po if (g['h'] not in nfc or g['a'] not in nfc)]
    # AFC/other-side champion = opponent in final game (SB) that isn't NFC
    fin=sorted(po,key=lambda g:g['date'])[-1]
    afc=fin['h'] if fin['h'] not in nfc else fin['a']
    AFCE=fin['eh'] if fin['h']==afc else fin['ea']
    idx=np.where(made)[0]
    titles=np.zeros(N,int); sba=np.zeros(N,int); pw=np.zeros(N,int)
    for dwflag in (True,False):
        ii=idx[divwin[idx]==dwflag]
        if len(ii)==0: continue
        fld=field_for(dwflag)
        n=len(ii); Wl=W[ii]
        # seeds: div winners by record then wc by record; ties random
        teams=[('DET',None,dwflag)]+fld
        m=len(teams)
        recs=np.zeros((n,m)); isdw=np.zeros(m,bool); el=np.zeros(m)
        for j,(t,v,d) in enumerate(teams):
            recs[:,j]=Wl if t=='DET' else v; isdw[j]=d if t!='DET' else dwflag; el[j]=LE if t=='DET' else elo[t]
        if s==1982: isdw[:]=False
        key=-(recs+isdw*100)+rng.random((n,m))*1e-3
        seed=np.argsort(key,1)  # seed[:,0]=top seed team index
        rank=np.argsort(seed,1)   # rank of each team
        # rounds: build list of alive per sim, simulate reseeding bracket
        alive=np.ones((n,m),bool)
        nb=nbye(s)
        if s<=1969: nb=None
        byes=np.zeros((n,m),bool)
        if nb=='div': byes=np.broadcast_to(isdw,(n,m)).copy()
        elif isinstance(nb,int): byes=rank<nb
        lions_alive=np.ones(n,bool); wins=np.zeros(n,int)
        # wildcard round (if any non-bye teams)
        def play_round(alive,participants):
            # pair highest vs lowest among participants per sim
            newalive=alive.copy()
            for r_ in range(n):
                pass
            return newalive
        # vectorized per-sim loop is simpler with python over unique seed orders; n can be large -> loop in chunks
        lw=np.zeros(n,int); champ=np.zeros(n,bool)
        order=np.argsort(key,1)
        for r_ in range(n):
            al=list(order[r_])  # seed order
            by=set(j for j in al if byes[r_,j])
            first=True
            cur=[j for j in al]
            # first round: non-bye teams
            if s<=1969 or len(cur)==1:
                pass
            rounds_left=True; alive_l=True
            participants=[j for j in cur if j not in by]
            if s<=1966: participants=[]
            def game(a,b,neutral=False):
                d=el[a]-el[b]+(0 if neutral else HFA); return a if rng.random()<prob(d) else b
            while len(cur)>1:
                if participants:
                    ps=participants; winners=[]
                    for q in range(len(ps)//2):
                        a,b=ps[q],ps[-1-q]; w=game(a,b); winners.append(w)
                        if 0 in (a,b):
                            if w==0: lw[r_]+=1
                            else: alive_l=False
                    if len(ps)%2: winners.append(ps[len(ps)//2])
                    cur=[j for j in cur if j in by or j in winners]; by=set(); participants=[]
                else:
                    ps=cur; winners=[]
                    for q in range(len(ps)//2):
                        a,b=ps[q],ps[-1-q]; w=game(a,b,neutral=(s<=1969)); winners.append(w)
                        if 0 in (a,b):
                            if w==0: lw[r_]+=1
                            else: alive_l=False
                    cur=[j for j in ps if j in winners]
                if not alive_l: break
            if alive_l and cur==[0]:
                # 1966-69: NFL title game vs East champion then SB; treat East champ via actual
                extra=[]
                if s<=1969:
                    nonsb=sorted([g for g in po if g!=fin],key=lambda g:g['date'])
                    nflg=nonsb[-1]; west=set(D[list(D)[0]])
                    if s>=1967:
                        wcg=[g for g in nonsb if (g['h'] in west) or (g['a'] in west)][0]
                        co=wcg['h'] if wcg['h'] not in west else wcg['a']; ce=wcg['eh'] if wcg['h']==co else wcg['ea']
                        if rng.random()<prob(LE-ce): lw[r_]+=1
                        else: continue
                        excl={wcg['h'],wcg['a']}
                    else: excl=west
                    east=[t for t in (nflg['h'],nflg['a']) if t not in excl][0]
                    ee=nflg['eh'] if nflg['h']==east else nflg['ea']
                    if rng.random()<prob(LE-ee): lw[r_]+=1
                    else: continue
                sba[ii[r_]]=1
                if rng.random()<prob(LE-AFCE): lw[r_]+=1; titles[ii[r_]]=1
        pw[ii]=lw
    out['titles']+=titles; out['sbapp']+=sba; out['pwins']+=pw; out['apps']+=made
    perseason[s]=dict(make=float(made.mean()),sb=float(sba.mean()),title=float(titles.mean()),actualW=rec['DET'],expW=float(np.mean(W)),afc=afc)
    print(s,f"W act {rec['DET']:4} exp {W.mean():5.2f}  make {made.mean():.3f}  SB {sba.mean():.4f} title {titles.mean():.4f}",flush=True)
res=dict(N=N,titles=np.bincount(out['titles']).tolist(),sbapp=np.bincount(out['sbapp']).tolist(),apps_mean=float(out['apps'].mean()),
 pwins_mean=float(out['pwins'].mean()),titles_mean=float(out['titles'].mean()),sb_mean=float(out['sbapp'].mean()),apps=np.bincount(out['apps']).tolist(),
 pwins=np.bincount(out['pwins']).tolist(),perseason=perseason)
json.dump(res,open('sim.json','w'))
print({k:v for k,v in res.items() if k!='perseason'})
