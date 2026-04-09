```
                  ___   __  _ __       __
   ____ ___  ____/ (_) /_/ (_) /__ ___/ /__ _   __
  / __ `/ / / / / __/ / __ / /  '_/ / / _  / | / /
 / /_/ / /_/ / / /__ / / // / ,<  / / / /_/ /| |/ /
 \__, /\____/  \__(_)_/ (_)_/|_|(_) \_____/ |___/
   /_/
```

# q0tik.dev

Personal pixel-art portfolio with cyberpunk neon aesthetics.

**[Live →](https://q0tik.dev)**

---

## Features

**Visual**
- Dark neon cyberpunk theme with CRT scanlines and vignette overlay
- Animated pixel-art cats on navbar (gray sitting + tricolor lying)
- Space horse flying across the background in random directions
- Floating pixel particles (green, pink, blue)
- Pulsing neon glow effects on all interactive elements
- TV character with white noise animation
- Light bulb toggle — "dark room" mode (click the bulb!)
- Pixel cursor trail on mouse movement
- Click anywhere for pixel firework explosions

**Interactive**
- 3D rotating skill tag cloud — drag to spin
- Hacker text scramble on section titles (scroll to trigger)
- Fake terminal — press `` ` `` or click the PC icon
  - Commands: `help`, `whoami`, `skills`, `projects`, `contacts`, `matrix`, `sudo rm -rf /`
- `matrix` command triggers Matrix rain + page-wide text scramble
- Konami Code easter egg (↑↑↓↓←→←→BA) — SYSTEM OVERLOAD
- Typewriter effect on About text
- Responsive design with mobile support

**Tech**
- Pure HTML + CSS + vanilla JS — zero dependencies
- PixelLab MCP for sprite generation
- Nginx in Docker for deployment
- `prefers-reduced-motion` respected across all animations

## Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5, semantic |
| Styles | CSS3, custom properties, keyframe animations, sprite sheets |
| Scripts | Vanilla JS, IntersectionObserver, Canvas API, requestAnimationFrame |
| Font | Press Start 2P (Google Fonts) |
| Assets | PixelLab AI pixel art generation |
| Deploy | Docker + Nginx Alpine |

## Quick Start

```bash
# Local development
python3 -m http.server 8080

# Docker
docker build -t q0tik-dev .
docker run -d -p 80:80 --name q0tik-dev q0tik-dev
```

## Project Structure

```
q0tik.dev/
├── index.html              # Single page
├── css/style.css           # All styles (~1000 lines)
├── js/
│   ├── cat.js              # Cat sprite animations
│   ├── horse.js            # Space horse background
│   ├── skills.js           # 3D tag cloud
│   ├── particles.js        # Floating pixel particles
│   ├── effects.js          # Typewriter + mouse trail
│   ├── hacker-text.js      # Title scramble on scroll
│   ├── terminal.js         # Fake terminal overlay
│   ├── matrix.js           # Matrix rain + text scramble
│   ├── konami.js           # Konami Code easter egg
│   ├── pixel-explosions.js # Click fireworks
│   ├── bulb.js             # Light bulb dark mode
│   └── main.js             # Scroll reveals, nav logic
├── assets/
│   ├── cat/                # Cat spritesheets
│   ├── horse/              # Space horse spritesheets
│   ├── sprites/            # Avatar, TV, borders
│   ├── icons/              # Social + terminal icons
│   └── bulb/               # Light bulb on/off
├── Dockerfile
├── nginx.conf
└── .dockerignore
```

## License

MIT

---

*built with <3 by q0tik*
