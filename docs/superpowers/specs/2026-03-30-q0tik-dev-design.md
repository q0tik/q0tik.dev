# q0tik.dev — Design Spec

## Overview

Personal pixel-art portfolio website for q0tik. Single-page site with anchor navigation, deployed on GitHub Pages. Features an animated pixel-art cat mascot sitting on the navbar.

## Stack

- Pure HTML/CSS/JS — no frameworks, no build tools
- GitHub Pages for hosting
- PixelLab MCP for generating pixel art assets
- Google Fonts (Press Start 2P)

## File Structure

```
/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── cat/
│   │   └── cat-spritesheet.png
│   ├── sprites/
│   ├── backgrounds/
│   ├── icons/
│   ├── animations/
│   └── fonts/
├── CNAME
└── CLAUDE.md
```

## Color Palette

| Role        | Color     | Usage                        |
|-------------|-----------|------------------------------|
| Background  | `#0a0a0a` | Page background              |
| Surface     | `#1a1a2e` | Cards, navbar                |
| Text        | `#e0e0e0` | Primary text                 |
| Accent 1    | `#00ff88` | Primary neon green           |
| Accent 2    | `#ff0080` | Secondary neon pink          |
| Accent 3    | `#00bfff` | Tertiary blue                |

## Typography

- **Headings & nav**: Press Start 2P (Google Fonts)
- **Body text / long content**: monospace fallback (system mono stack)

## Navbar

- `position: fixed`, full width, height ~48px
- Background: `#1a1a2e`
- Bottom border: 1px `#00ff88` (neon accent line)
- `overflow: visible` to allow cat tail to hang below
- Menu items: horizontal, pixel-font, neon glow on hover (`text-shadow`)

### Menu Items

- About
- Projects
- Blog
- Links

### Responsive (<=768px)

- Menu collapses into pixel-art burger icon (left side)
- Menu items drop down vertically on toggle
- Cat remains on navbar (right side), scaled to 48x48 via `transform: scale(0.75)`

## Cat Mascot

### Specs

- **Size**: 64x64px (48x48 on mobile via CSS scale)
- **Color**: orange/ginger
- **Position**: absolute, right side of navbar, bottom ~16-20px extends below navbar edge (tail hangs down)
- **Generation**: PixelLab MCP

### Sprite Sheet

All frames in a single horizontal strip, each frame 64x64. CSS `background-position` shifts via `steps()` animation. JS swaps CSS class to switch between animation states.

### Animation States

| State       | Frames | Duration | Trigger                        |
|-------------|--------|----------|--------------------------------|
| Idle        | ~4     | loop     | Base state (breathing + tail)  |
| Blink       | ~3     | 0.3s     | Random every 3-6s              |
| Head turn   | ~4     | 0.8s     | Random every 8-15s             |
| Grooming    | ~6     | 1.5s     | Random every 15-30s            |

### Animation Logic (JS)

- Base loop: idle (tail sway, subtle breathing)
- Random timer selects an action (blink / head turn / groom)
- After action completes, return to idle
- Actions do not interrupt each other — queue-based

## Page Sections

### About / Resume

- Brief intro, pixel-art avatar, key skills
- Room for additional pixel-art decorations later

### Projects

- Card grid: 2-3 columns on desktop, 1 on mobile
- Each card: project name, description, link, screenshot/icon

### Blog

- Placeholder or hidden for now
- Future: separate HTML pages linked from main page

### Links

- Social/contact icons in pixel-art style, horizontal row
- Platforms TBD (GitHub, Telegram, etc.)

## Visual Effects

- Hover on buttons/links: neon glow (`text-shadow` / `box-shadow`)
- Scroll-triggered section reveals via `IntersectionObserver` (no libraries)
- No heavy animations beyond the cat — pixel art decorations added incrementally

## Extensibility

- New pixel art assets and animations will be added over time
- Structured `assets/` directory accommodates growth
- Each new asset gets its own subfolder or goes into the appropriate category
