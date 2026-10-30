import json,glob
G=[]
def walk(x,year):
    if isinstance(x,list):
        if len(x)==2 and all(isinstance(e,dict) and 'seed' in e for e in x):
            a,b=x; G.append(dict(y=year,r=a['round_of'],sa=a['seed'],sb=b['seed'],ta=a['team'],tb=b['team'],pa=a['score'],pb=b['score']))
        else:
            for e in x: walk(e,year)
    elif isinstance(x,dict):
        for v in x.values(): walk(v,year)
for f in sorted(glob.glob('/home/claude/mm-data/data/*.json')):
    d=json.load(open(f)); walk(d,d['year'])
json.dump(G,open('games.json','w'))
import collections
print(len(G), collections.Counter(g['y'] for g in G).most_common(3), min(g['y'] for g in G), max(g['y'] for g in G))
print(collections.Counter(g['r'] for g in G))
s16=[g for g in G if 16 in(g['sa'],g['sb'])]
for g in s16:
    if (g['sa']==16 and g['pa']>g['pb']) or (g['sb']==16 and g['pb']>g['pa']) or g['r']<64: print(g)
print('16-seed games',len(s16))
