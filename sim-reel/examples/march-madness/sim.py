import json,numpy as np
M=json.load(open('model.json')); R=np.array(M['r']); SIG=M['sig']
TAU=2.2; SG=np.sqrt(SIG**2-2*TAU**2)
ORDER=[1,16,8,9,5,12,4,13,6,11,3,14,7,10,2,15]
rng=np.random.default_rng(16)
def play(sa,ta,sb,tb):
    """vectorized game; returns winner seed, strength"""
    m=ta-tb+rng.standard_normal(len(ta))*SG
    w=m>0
    return np.where(w,sa,sb),np.where(w,ta,tb)
def pod(seeds,N):
    """simulate a sub-bracket given list of seeds in bracket order"""
    cur=[(np.full(N,s),R[s-1]+rng.standard_normal(N)*TAU) for s in seeds]
    while len(cur)>1:
        cur=[play(*cur[i],*cur[i+1]) for i in range(0,len(cur),2)]
    return cur[0]
# ---- 1) 100,000 full tournaments
N=100_000
reach={k:np.zeros(17) for k in ['R32','S16','E8','F4','NC','CH']}
regs=[]; 
deep16=np.zeros(N,int)  # deepest round any 16 seed reached
for reg in range(4):
    cur=[(np.full(N,s),R[s-1]+rng.standard_normal(N)*TAU) for s in ORDER]
    for name in ['R32','S16','E8','F4']:
        cur=[play(*cur[i],*cur[i+1]) for i in range(0,len(cur),2)]
        for s,_ in cur:
            reach[name]+=np.bincount(s,minlength=17)
            if 16 in s: deep16=np.maximum(deep16,(s==16)*['R32','S16','E8','F4'].index(name)+1*(s==16))
    regs.append(cur[0])
sf1=play(*regs[0],*regs[1]); sf2=play(*regs[2],*regs[3])
reach['NC']+=np.bincount(sf1[0],minlength=17)+np.bincount(sf2[0],minlength=17)
ch=play(*sf1,*sf2); reach['CH']+=np.bincount(ch[0],minlength=17)
out={'N':N,'titles_by_seed':{int(s):int(reach['CH'][s]) for s in range(1,17)},
     'f4_by_seed':{int(s):int(reach['F4'][s]) for s in range(1,17)},
     'r32_16':int(reach['R32'][16]),'s16_16':int(reach['S16'][16]),'e8_16':int(reach['E8'][16]),'f4_16':int(reach['F4'][16]),'nc_16':int(reach['NC'][16]),'ch_16':int(reach['CH'][16])}
print(json.dumps(out,indent=0))
json.dump(out,open('sim100k.json','w'))
