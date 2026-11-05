#!/bin/bash
# Run once assets.vidiq.com is allowed: downloads the real Liam VO, re-times captions, renders the final reel.
set -e; cd /home/claude/luck/reel
curl -sS -o vo_raw.mp3 'https://assets.vidiq.com/voiceovers/4c85b088-0d0e-4b6c-9296-9c44a043e138/b5bb00ac-732f-4901-9b66-bd4c4bfc9cd9.mp3'
echo '{"brees":"breeze"}' > subs.json
python3 /home/claude/da-headshots/sim-reel/scripts/vo_pipeline.py vo_raw.mp3 script_spoken.txt --fmt fmt.json --subs subs.json | tail -1
python3 /home/claude/da-headshots/sim-reel/scripts/qa_bounds.py scene.html | tail -1
python3 /home/claude/da-headshots/sim-reel/scripts/render.py scene.html --vo vo.wav --out DA_Luck_100k_Careers.mp4 | tail -1
