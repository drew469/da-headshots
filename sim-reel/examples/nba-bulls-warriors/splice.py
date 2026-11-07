import sys
d,cap,words,title=sys.argv[1:5]
s=open(d+'/scene.html').read(); c=open(d+'/chapters.js').read()
a=s.index('/* ===================== chapters'); b=s.index('/* ---------- captions')
s=s[:a]+c+"\n"+s[b:]
s=s.replace("CT('I simulated his career')-.02",f"CT('{cap}')-.02")
s=s.replace("FOLLOW|DAILY|ATHLETE|BRADY|BELICHICK|RINGS",words)
s=s.replace("Tom Brady",title,1)
open(d+'/scene.html','w').write(s)
