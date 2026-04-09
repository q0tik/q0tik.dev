# q0tik.dev

Personal portfolio website — pixel-art cyberpunk neon aesthetic.

## Sections

- **About** — short bio with typewriter effect, pixelated avatar in circle frame
- **Skills** — 3D rotating tag cloud (drag to spin), grouped: Backend (green), Data/AI (blue), Infra (pink)
- **Projects** — Voidreign (MMORPG, WIP ribbon), Finansoid (Telegram mini-app)

## Stack

- Pure HTML + CSS + vanilla JS — zero dependencies
- Font: Press Start 2P (Google Fonts)
- Sprites: PixelLab MCP for pixel art generation
- Deploy: Docker + Nginx Alpine

## Architecture

```
index.html              — single page, all sections
css/style.css           — all styles (~1200 lines), CSS variables for palette
js/
  cat.js                — gray cat (idle) + tricolor cat (paw swing) sprites
  horse.js              — space horse flying across background, random angles + rotation
  skills.js             — 3D Fibonacci sphere tag cloud with drag interaction
  particles.js          — floating pixel particles on canvas
  effects.js            — typewriter on About text + mouse pixel trail
  hacker-text.js        — title text scramble on scroll (IntersectionObserver)
  terminal.js           — fake terminal overlay (` key or PC icon click)
  matrix.js             — matrix rain + page-wide text scramble (terminal command)
  konami.js             — Konami Code easter egg (↑↑↓↓←→←→BA)
  pixel-explosions.js   — click-to-spawn pixel fireworks
  bulb.js               — light bulb toggle, dark room CSS class
  main.js               — scroll reveal (IntersectionObserver), nav logic
assets/
  cat/                  — cat spritesheets (gray 8 frames, tricolor 4 frames)
  horse/                — horse run east/west spritesheets (8 frames each)
  sprites/              — avatar, TV spritesheet, circle border/mask
  icons/                — GitHub, Telegram, PC terminal icons
  bulb/                 — light bulb on/off sprites
```

## CSS Palette (variables in :root)

- `--bg`: #0a0a0a (background)
- `--surface`: #1a1a2e (cards, navbar)
- `--text`: #e0e0e0
- `--accent-green`: #00ff88 (primary neon, titles, Backend skills)
- `--accent-pink`: #ff0080 (secondary, project names, Infra skills)
- `--accent-blue`: #00bfff (tertiary, tags, Data/AI skills)
- `--navbar-height`: 48px

## Key Patterns

- **Sprite animations**: horizontal sprite sheets + CSS `steps()` keyframes
- **Pixel rendering**: `image-rendering: pixelated` on all pixel assets
- **Scroll reveals**: sections start `opacity: 0; transform: translateY(30px)`, get `.visible` class via IntersectionObserver
- **Dark room mode**: `body.lights-off` CSS class toggles visibility of text/elements, neon elements dim ~30%
- **Easter eggs**: Konami Code (keyCode-based), terminal commands, matrix rain triggers text scramble
- **Reduced motion**: all animations respect `prefers-reduced-motion: reduce`

## Style Guidelines

- Everything must follow a consistent **pixel-art aesthetic**
- Use PixelLab MCP for generating pixel art assets
- Keep the design retro, clean, and playful
- Prefer small sprite-like icons and pixelated fonts
- Dark neon cyberpunk theme
- Custom pixel cursors (green crosshair default, pink for interactive)

## PixelLab Characters (for reference)

- Gray cat (sitting idle): `9d72aa92-92c6-4fec-ab71-8523bf03f3ab`
- Tricolor cat (lying): `1d51e2c5-5dcf-4ba6-9cc2-76e254979c93`
- TV character: `4fb09254-11b0-4fd2-842e-3475777ffd9b`
- Space horse: `7ccb1daf-ff72-4f96-8235-a8b7a17ff07e`
- Light bulb ON: `2f12fcba-a6b0-4b0a-8b56-bceae99df046`
- Ghost (no animation yet): `b2cb9901-452d-47a4-bc02-72c9e8e09ba1`

## Rules

- Always respond in Russian
- Keep generated assets in an `assets/` directory
- Commit messages in English
- Deployment: Docker container with nginx:alpine
