"""Rebuild FiveThirtyEight's classic NFL Elo (their published forecast.py method), verify it against
their published elo_prob1 through 2020, then extend it through Brady's last season (2022) using nflverse results.
Outputs data/brady_playoffs.json: every Brady playoff start with his team's pre-game win probability.
"""
import csv, json, math, os

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
HFA, K, REVERT = 65.0, 20.0, 1 / 3.0

def prob(diff): return 1.0 / (math.pow(10.0, -diff / 400.0) + 1.0)

def update(elo, t1, t2, s1, s2, neutral):
    for t in (t1, t2): elo.setdefault(t, 1300.0)
    diff = elo[t1] - elo[t2] + (0 if neutral else HFA)
    p = prob(diff)
    r = 1.0 if s1 > s2 else 0.0 if s1 < s2 else 0.5
    pd = abs(s1 - s2)
    mult = math.log(max(pd, 1) + 1.0) * (2.2 / (1.0 if r == 0.5 else ((diff if r == 1.0 else -diff) * 0.001 + 2.2)))
    shift = K * mult * (r - p)
    elo[t1] += shift; elo[t2] -= shift
    return p, diff

# ---- 1. use 538's published numbers through 2020; verify our formula reproduces them on 2000-2020 games ----
rows538, maxerr, elo = [], 0.0, {}
for g in csv.DictReader(open(os.path.join(D, 'nfl_games.csv'))):
    if int(g['season']) < 2000: continue
    e1, e2 = float(g['elo1']), float(g['elo2'])
    diff = e1 - e2 + (0 if g['neutral'] == '1' else HFA)
    maxerr = max(maxerr, abs(prob(diff) - float(g['elo_prob1'])))
    g['_p'] = float(g['elo_prob1']); rows538.append(g)
    # post-game ratings (overwritten each game -> after loop = end-of-2020 ratings)
    tmp = {g['team1']: e1, g['team2']: e2}
    update(tmp, g['team1'], g['team2'], int(g['score1']), int(g['score2']), g['neutral'] == '1')
    elo.update(tmp)
print(f'538 games 2000-2020: {len(rows538)}, max |formula prob - published prob| = {maxerr:.1e}')
# sanity: our post-game update must equal 538's next pre-game rating (same team, same season)
chk, last = 0.0, {}
for g in rows538:
    for t, e in ((g['team1'], float(g['elo1'])), (g['team2'], float(g['elo2']))):
        if t in last and last[t][0] == g['season']: chk = max(chk, abs(last[t][1] - e))
    tmp = {g['team1']: float(g['elo1']), g['team2']: float(g['elo2'])}
    update(tmp, g['team1'], g['team2'], int(g['score1']), int(g['score2']), g['neutral'] == '1')
    for t in tmp: last[t] = (g['season'], tmp[t])
print(f'update-rule check: max |our post-game - 538 next pre-game| = {chk:.1e}')

# ---- 2. extend with nflverse 2021 + 2022 ----
MAP = {'LA': 'LAR', 'STL': 'LAR', 'SD': 'LAC', 'LV': 'OAK', 'WAS': 'WSH'}  # nflverse -> 538 codes
nv = list(csv.DictReader(open(os.path.join(D, 'games_nflverse.csv'))))
ext = []
for s in ('2021', '2022'):
    for t in elo: elo[t] = 1505.0 * REVERT + elo[t] * (1 - REVERT)
    for g in sorted([g for g in nv if g['season'] == s], key=lambda g: (g['gameday'], g['game_id'])):
        h, a = MAP.get(g['home_team'], g['home_team']), MAP.get(g['away_team'], g['away_team'])
        assert h in elo and a in elo, (h, a)
        neutral = g['location'] == 'Neutral'
        e1, e2 = elo[h], elo[a]
        p, diff = update(elo, h, a, int(g['home_score']), int(g['away_score']), neutral)
        ext.append(dict(date=g['gameday'], season=s, playoff=g['game_type'] != 'REG', team1=h, team2=a, score1=int(g['home_score']),
                        score2=int(g['away_score']), _p=p, gid=g['game_id'], elo1=e1, elo2=e2, neutral=neutral, round=g['game_type']))

# ---- 3. Brady's playoff starts (QB from nflverse; 538 rows matched by date+teams) ----
nvp = {g['game_id']: g for g in nv}
def qb_of(g, side): return g[f'{side}_qb_name']
brady = []
for g in nv:
    if g['game_type'] == 'REG': continue
    for side, opp in (('home', 'away'), ('away', 'home')):
        if qb_of(g, side) == 'Tom Brady':
            team, oppt = MAP.get(g[f'{side}_team'], g[f'{side}_team']), MAP.get(g[f'{opp}_team'], g[f'{opp}_team'])
            # find matching elo row
            src = rows538 if int(g['season']) <= 2020 else ext
            m = [r for r in src if r.get('date') == g['gameday'] and {r['team1'], r['team2']} == {team, oppt}]
            assert len(m) == 1, (g['game_id'], len(m))
            r = m[0]
            pteam = r['_p'] if r['team1'] == team else 1 - r['_p']
            ts, os_ = int(g[f'{side}_score']), int(g[f'{opp}_score'])
            brady.append(dict(season=int(g['season']), round=g['game_type'], date=g['gameday'], team=team, opp=oppt,
                              home=side == 'home' and g['location'] != 'Neutral', p=round(pteam, 4), score=f'{ts}-{os_}', won=ts > os_))
brady.sort(key=lambda b: b['date'])
json.dump(brady, open(os.path.join(D, 'brady_playoffs.json'), 'w'), indent=1)
print(len(brady), 'Brady playoff starts,', sum(b['won'] for b in brady), 'wins')
for b in brady:
    print(f"{b['season']} {b['round']:4} {b['team']:3} vs {b['opp']:3} {'H' if b['home'] else 'A/N'}  p={b['p']:.3f}  {b['score']:6} {'W' if b['won'] else 'L'}")

# ---- 4. calibration on all playoff games 2000-2022 (favorite's perspective) ----
allp = [(r['_p'], int(r['score1']) > int(r['score2'])) for r in rows538 if r['playoff'] == '1']
allp += [(r['_p'], r['score1'] > r['score2']) for r in ext if r['playoff']]
fav = [(max(p, 1 - p), (w if p >= .5 else not w)) for p, w in allp]
json.dump(fav, open(os.path.join(D, 'calibration.json'), 'w'))
print('playoff games 2000-2022:', len(fav), ' model avg fav prob', round(sum(p for p, _ in fav) / len(fav), 3), ' fav actually won', round(sum(w for _, w in fav) / len(fav), 3))

# ---- 5. full playoff brackets 2001-2022 (for counterfactual rounds) ----
RND = {'WC': 1, 'DIV': 2, 'CON': 3, 'SB': 4}
nvround = {}
for g in nv:
    if g['game_type'] != 'REG':
        nvround[(g['gameday'], frozenset({MAP.get(g['home_team'], g['home_team']), MAP.get(g['away_team'], g['away_team'])}))] = g['game_type']
bracket = []
for r in rows538:
    if r['playoff'] == '1' and int(r['season']) >= 2001:
        rd = nvround[(r['date'], frozenset({r['team1'], r['team2']}))]
        bracket.append(dict(season=int(r['season']), round=RND[rd], team1=r['team1'], team2=r['team2'], elo1=float(r['elo1']), elo2=float(r['elo2']),
                            neutral=r['neutral'] == '1', win1=int(r['score1']) > int(r['score2'])))
for r in ext:
    if r['playoff']:
        bracket.append(dict(season=int(r['season']), round=RND[r['round']], team1=r['team1'], team2=r['team2'], elo1=r['elo1'], elo2=r['elo2'],
                            neutral=r['neutral'], win1=r['score1'] > r['score2']))
json.dump(bracket, open(os.path.join(D, 'bracket.json'), 'w'))
print('bracket games', len(bracket))
