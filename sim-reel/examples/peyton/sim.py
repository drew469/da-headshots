"""Monte Carlo: replay every playoff run Brady actually had (same opponents, same order) 100,000 times.
Each game is a loaded coin at the Elo pre-game win probability; a run ends at the first loss; win every game = ring."""
import json, os, random
from collections import Counter, defaultdict
from math import prod

D = '/home/claude/peyton-sim/data'
G = json.load(open(os.path.join(D, 'qb_playoffs.json')))
import csv, math
B = json.load(open(os.path.join(D, 'bracket.json')))
HFA = 65.0
MAP = {'LA': 'LAR', 'STL': 'LAR', 'SD': 'LAC', 'LV': 'OAK', 'WAS': 'WSH'}
# regular-season win% + point diff -> who would host a hypothetical game
rec = defaultdict(lambda: [0, 0, 0])
for g in csv.DictReader(open(os.path.join(D, 'games_nflverse.csv'))):
    if g['game_type'] != 'REG' or not g['home_score']: continue
    h, a = MAP.get(g['home_team'], g['home_team']), MAP.get(g['away_team'], g['away_team'])
    hs, as_ = int(g['home_score']), int(g['away_score'])
    for t, f, ag in ((h, hs, as_), (a, as_, hs)):
        r = rec[(int(g['season']), t)]; r[0] += (f > ag) + .5 * (f == ag); r[1] += 1; r[2] += f - ag
def seedkey(season, t): r = rec[(season, t)]; return (r[0] / r[1], r[2])
def prob(diff): return 1 / (10 ** (-diff / 400) + 1)

runs = defaultdict(list)
for g in G: runs[g['season']].append(dict(g, real=True))
RND = {'WC': 1, 'DIV': 2, 'CON': 3, 'SB': 4}
for s, gs in runs.items():
    last = gs[-1]
    if last['won']: continue
    rd = RND[last['round']]
    lost = next(b for b in B if b['season'] == s and b['round'] == rd and {b['team1'], b['team2']} == {last['team'], last['opp']})
    my_elo = lost['elo1'] if lost['team1'] == last['team'] else lost['elo2']
    slot = last['opp']
    for r in range(rd + 1, 5):
        b = next(b for b in B if b['season'] == s and b['round'] == r and slot in (b['team1'], b['team2']))
        opp = b['team2'] if b['team1'] == slot else b['team1']
        opp_elo = b['elo2'] if b['team1'] == slot else b['elo1']
        if r == 4 or b['neutral']: hfa = 0
        else: hfa = HFA if seedkey(s, last['team']) >= seedkey(s, opp) else -HFA
        gs.append(dict(season=s, round={2: 'DIV', 3: 'CON', 4: 'SB'}[r], team=last['team'], opp=opp, p=round(prob(my_elo - opp_elo + hfa), 4), real=False, home=hfa > 0))
        slot = b['team1'] if b['win1'] else b['team2']
seasons = sorted(runs)
for s in seasons:
    print(s, ' -> '.join(f"{g['round']} {g['opp']} {g['p']:.2f}{'' if g['real'] else '*'}" for g in runs[s]))
N = 100_000
rng = random.Random(12)

title_p = {s: prod(g['p'] for g in runs[s]) for s in seasons}   # exact chance per run (if every game is reached)
rings, per_season = Counter(), Counter()
paths = []                                  # for the galton board: first 2000 careers' cumulative rings per season
for i in range(N):
    r, path = 0, []
    for s in seasons:
        won_all = all(rng.random() < g['p'] for g in runs[s])
        if won_all: r += 1; per_season[s] += 1
        path.append(r)
    rings[r] += 1
    if i < 2000: paths.append(path)

dist = {k: rings[k] / N for k in range(0, max(rings) + 1)}
exp = sum(title_p.values())
print('runs:', len(seasons), 'games:', len(G), 'record', sum(g['won'] for g in G), '-', sum(not g['won'] for g in G))
print('expected rings (exact):', round(exp, 2))
for k, v in dist.items(): print(f'  {k} rings: {v*100:5.2f}%')
ge7 = sum(v for k, v in dist.items() if k >= 4)
print(f'4+ rings: {ge7*100:.2f}%   ({1/ge7:.0f} to 1)' if ge7 else '7+ never')
mode = max(dist, key=dist.get)
print('most common:', mode, f'{dist[mode]*100:.1f}%', ' 0 rings:', f'{dist[0]*100:.1f}%', ' 3+:', f'{sum(v for k,v in dist.items() if k>=3)*100:.1f}%')
REAL = {s for s in seasons if any(g['real'] and g['round']=='SB' and g['won'] for g in runs[s])}
print('title chance by season:')
for s in seasons:
    print(f'  {s} {runs[s][0]["team"]}  games={len(runs[s])}  P(title)={title_p[s]*100:5.1f}%  sim={per_season[s]/N*100:5.1f}%  real={"RING" if s in REAL else "-"}')
# the 7 real title runs
real = sorted(REAL)
pr = prod(title_p[s] for s in real)
print('real title seasons', real, ' P(winning exactly those real runs) =', f'{pr:.2e}', f'(1 in {1/pr:,.0f})')
# underdog wins
dog = [g for g in G if g['won'] and g['p'] < .5]
print('underdog wins:', len(dog), [(g['season'], g['round'], g['opp'], g['p']) for g in dog], ' all of them:', f'1 in {1/prod(g["p"] for g in dog):,.0f}')
fav_losses = [g for g in G if not g['won'] and g['p'] > .5]
print('losses as favorite:', [(g['season'], g['round'], g['opp'], g['p']) for g in fav_losses])
json.dump({'runs': {str(k): v for k, v in runs.items()}, 'dist': dist, 'title_p': title_p, 'paths': paths, 'seasons': seasons, 'exp': exp}, open(os.path.join(D, 'sim.json'), 'w'))

# calibration buckets (favorite's perspective)
cal = json.load(open(os.path.join(D, 'calibration.json')))
for lo, hi in [(.5, .6), (.6, .7), (.7, .8), (.8, 1.0)]:
    b = [(p, w) for p, w in cal if lo <= p < hi]
    print(f'  model {lo:.0%}-{hi:.0%}: n={len(b):3}  model avg {sum(p for p,_ in b)/len(b)*100:.1f}%  actual {sum(w for _,w in b)/len(b)*100:.1f}%')


print('expected playoff wins', round(sum(g['p'] for g in G),2), 'actual', sum(g['won'] for g in G))
best = sorted(seasons, key=lambda s: -title_p[s])[:6]
print('best shots:', [(s, round(title_p[s]*100, 1), 'RING' if s in REAL else '-') for s in best])
print('P(<=2 rings)', round(sum(v for k,v in dist.items() if k<=2)*100,1), 'P(>=3)', round(sum(v for k,v in dist.items() if k>=3)*100,1), 'P(>=Brady 7)', sum(v for k,v in dist.items() if k>=7))
