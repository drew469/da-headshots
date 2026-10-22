# da-headshots

Daily Athlete's player photo library for the timeline video skill.

- Add players to `players.txt` (`nfl: Barry Sanders`) and push — the **Fetch headshots** GitHub Action downloads each photo into `headshots/<slug>.png|jpg` (ESPN headshot first, Wikipedia lead image as fallback) and commits it back.
- `report.md` shows what the last run found and what's missing. Anything missing can be dropped into `headshots/` by hand using the same slug (lowercase, dashes: `odell-beckham-jr.jpg`).
- `sources.json` records where every photo came from.
