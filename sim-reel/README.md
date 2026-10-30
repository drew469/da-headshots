# sim-reel: Daily Athlete "I simulated ___ 100,000 times" reels

Toolkit behind the DA simulation reels (first one: Tom Brady, 100,000 careers).

```
scripts/
  render.py        HTML scene (window.render(t), window.T, window.SFX) -> 1080x1920 30fps MP4, VO + synthesized SFX, -14 LUFS
  sfx.py           synthesized SFX bank (whoosh, whip, pop, ding, sparkle, thump, riser, swell, ...)
  vo_pipeline.py   raw VO -> vo.wav with every pause cut to 0.2s, word timings, caption cues -> timing.js
  qa_bounds.py     scans every 0.2s for text off the safe frame or colliding with captions (must print 0 issues)
  make_sticker.py  photo -> full-body cutout with white outline + colored offset shadow
template/
  scene_reference_brady.html   the finished Brady scene: copy its helpers, chrome, hook and chapter patterns
  data.js games.js timing.js   the data it reads
  fonts/ brand/                Anton, Oswald 600/700, Permanent Marker; DA logo
examples/
  brady/           538-style NFL Elo replication + counterfactual playoff-bracket Monte Carlo
  march-madness/   seed-strength margin model (1985-2024 games) + 100k brackets + 1-billion 16-seed path sim
```

Quick start (in a scratch folder next to the scene):

```
cp -r sim-reel/template/{fonts,brand} .
python3 sim-reel/scripts/vo_pipeline.py vo_raw.mp3 script_spoken.txt --fmt fmt.json
python3 sim-reel/scripts/render.py scene.html --stills 0.3,1,2.2,10 --out qa.png
python3 sim-reel/scripts/qa_bounds.py scene.html
python3 sim-reel/scripts/render.py scene.html --vo vo.wav --out DA_Reel.mp4
```
