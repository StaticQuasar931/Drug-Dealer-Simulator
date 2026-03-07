# Drug Dealer Simulator 2.0.0

Fictional 2D idle tycoon game built with plain HTML, CSS, and JavaScript.

Play link: https://sites.google.com/view/staticquasar931/gm3z

## Project Structure

```text
assets/
  icons/
  ui/
  characters/
  backgrounds/
  achievements/
  banner.png
  thumb.png
  favicon.svg
css/
  main.css
  ui.css
  animations.css
  responsive.css
js/
  game.js
  economy.js
  production.js
  workers.js
  map.js
  laundering.js
  events.js
  achievements.js
  ui.js
  saveSystem.js
  antiCheat.js
  settings.js
data/
  items.json
  upgrades.json
  workers.json
  districts.json
  events.json
  achievements.json
index.html
README.md
```

## Run Locally

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. No dependencies, build tools, or local server required.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub: `Settings -> Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/ (root)`.
5. Save and wait for Pages URL to publish.

## Embed in Google Sites

1. Open Google Sites editor.
2. Insert a new `Embed` element.
3. Paste your hosted game URL (GitHub Pages or your hosted page).
4. Resize the embed frame to fit desktop and mobile.
5. Publish the site.

Note: localStorage save slots may be limited depending on the host container, but core gameplay runs.

## Core Systems Included

- Production with item time/value/quality/heat.
- Worker automation (dealers, chemists, smugglers, accountants, security, hackers).
- District unlocks and multipliers.
- Heat stages and raid risk.
- Laundering fronts with pros and cons.
- Economy demand fluctuations and event modifiers.
- Random events.
- Achievement rewards.
- Offline progress with anti-time-manipulation guard.
- Manual save, autosave, and 3 save slots.
- Device-optimized layout for desktop, tablet, and mobile.
- Settings: quality, animation, scaling, sound, music.
- Content warning screen with first-launch acknowledgement.
- Hidden admin debug panel.
