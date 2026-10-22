"""Fetch player headshots into headshots/<slug>.<ext>.

Reads players.txt:  lines like "nfl: Barry Sanders"  (league prefix: nfl, nba, mlb, nhl, wnba, soccer, college-football, mens-college-basketball)
Sources, in order:
  1. ESPN player headshot (clean cutout, transparent PNG) — found via ESPN's public search API
  2. Wikipedia lead image (good for retired legends ESPN doesn't carry)
Skips players already in headshots/. Writes report.md (what was found where / what's missing) and sources.json.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'headshots')
UA = 'DailyAthleteHeadshotBot/1.0 (github.com/drew469/da-headshots)'
os.makedirs(OUT, exist_ok=True)

ESPN_SPORT = {'nfl': 'football', 'college-football': 'football', 'nba': 'basketball', 'wnba': 'basketball',
              'mens-college-basketball': 'basketball', 'mlb': 'baseball', 'nhl': 'hockey', 'soccer': 'soccer'}
WIKI_HINT = {'nfl': 'American football', 'college-football': 'American football', 'nba': 'basketball', 'wnba': 'basketball',
             'mens-college-basketball': 'basketball', 'mlb': 'baseball', 'nhl': 'ice hockey', 'soccer': 'footballer'}


def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())


def get(url, as_json=False, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
            with urllib.request.urlopen(req, timeout=20) as r:
                data = r.read()
                return json.loads(data) if as_json else (data, r.headers.get('Content-Type', ''))
        except urllib.error.HTTPError as e:
            if e.code in (404, 400):
                return None
            time.sleep(1 + i)
        except Exception:
            time.sleep(1 + i)
    return None


def walk(o):
    if isinstance(o, dict):
        yield o
        for v in o.values():
            yield from walk(v)
    elif isinstance(o, list):
        for v in o:
            yield from walk(v)


def espn_candidates(name, league):
    """Return ESPN athlete ids whose name matches, trying a few public search endpoints."""
    q = urllib.parse.quote(name)
    urls = [
        f'https://site.web.api.espn.com/apis/common/v3/search?query={q}&type=player&limit=10',
        f'https://site.web.api.espn.com/apis/search/v2?query={q}&limit=10&type=player',
        f'https://site.api.espn.com/apis/search/v2?query={q}&limit=10',
    ]
    ids = []
    for u in urls:
        data = get(u, as_json=True)
        if not data:
            continue
        for d in walk(data):
            nm = d.get('displayName') or d.get('name') or d.get('fullName') or ''
            if norm(nm) != norm(name):
                continue
            blob = json.dumps(d).lower()
            aid = d.get('id') or d.get('uid', '').split('~a:')[-1]
            m = re.search(r'/(?:players|player)/(?:_/id/)?(\d+)', blob) if not str(aid).isdigit() else None
            if m: aid = m.group(1)
            if not str(aid).isdigit():
                continue
            # prefer matches that mention the league/sport
            score = (league in blob) * 2 + (ESPN_SPORT.get(league, '') in blob)
            ids.append((score, str(aid)))
        if ids:
            break
    ids.sort(key=lambda x: -x[0])
    seen, out = set(), []
    for _, a in ids:
        if a not in seen:
            seen.add(a); out.append(a)
    return out[:3]


def try_espn(name, league):
    for aid in espn_candidates(name, league):
        url = f'https://a.espncdn.com/i/headshots/{league}/players/full/{aid}.png'
        r = get(url)
        if r and len(r[0]) > 5000:
            return r[0], 'png', url
    return None


def try_wiki(name, league):
    hint = WIKI_HINT.get(league, '')
    titles = [f'{name} ({hint})', name] if hint else [name]
    for title in titles:
        api = ('https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages|categories'
               '&piprop=thumbnail&pithumbsize=800&cllimit=50&titles=' + urllib.parse.quote(title))
        data = get(api, as_json=True)
        if not data:
            continue
        for page in data.get('query', {}).get('pages', {}).values():
            if 'missing' in page or 'thumbnail' not in page:
                continue
            cats = ' '.join(c.get('title', '') for c in page.get('categories', [])).lower()
            if 'disambiguation' in cats:
                continue
            src = page['thumbnail']['source']
            r = get(src)
            if r and len(r[0]) > 3000:
                ext = 'png' if src.lower().endswith('.png') else 'jpg'
                return r[0], ext, 'https://en.wikipedia.org/wiki/' + urllib.parse.quote(page['title'].replace(' ', '_'))
    return None


def main():
    src_path = os.path.join(ROOT, 'sources.json')
    sources = json.load(open(src_path)) if os.path.exists(src_path) else {}
    existing = {os.path.splitext(f)[0] for f in os.listdir(OUT)}
    lines = [l.strip() for l in open(os.path.join(ROOT, 'players.txt')) if l.strip() and not l.startswith('#')]
    found, missing, skipped = [], [], []
    for line in lines:
        league, name = [x.strip() for x in line.split(':', 1)]
        s = slug(name)
        if s in existing:
            skipped.append(name); continue
        res = try_espn(name, league)
        origin = 'ESPN'
        if not res:
            res = try_wiki(name, league); origin = 'Wikipedia'
        if not res:
            missing.append(f'{name} ({league})'); print('MISSING', name); continue
        data, ext, url = res
        open(os.path.join(OUT, f'{s}.{ext}'), 'wb').write(data)
        sources[s] = {'name': name, 'league': league, 'source': origin, 'url': url}
        found.append(f'{name} — {origin}'); print('OK', name, origin)
        time.sleep(0.3)
    json.dump(sources, open(src_path, 'w'), indent=1, sort_keys=True)
    with open(os.path.join(ROOT, 'report.md'), 'w') as f:
        f.write(f'# Last run\n\nFetched {len(found)} · already had {len(skipped)} · missing {len(missing)}\n\n')
        f.write('## Missing (add manually to headshots/<slug>.jpg)\n' + ''.join(f'- {m}\n' for m in missing) + '\n')
        f.write('## Fetched\n' + ''.join(f'- {x}\n' for x in found))
    print(f'fetched={len(found)} skipped={len(skipped)} missing={len(missing)}')


if __name__ == '__main__':
    main()
