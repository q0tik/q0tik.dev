# Pixel asset tools (not deployed)

1. Generate on a flat magenta background (key in `~/.config/gemini/api-key`):
   `python3 -I tools/gemini_gen.py gemini-3-pro-image "<prompt ... solid flat magenta background #FF00FF>" out.png [ref.png]`
   A ref image (an existing sprite on magenta, upscaled) keeps style/colors consistent.
2. Snap to a real pixel grid, cut palette, transparent bg:
   `uv run --with pillow --with numpy python -I tools/pixelize.py out.png sprite.png 12`
3. Near-black outlines vanish on the dark site — recolor them to #34244a.

Diffusion output is a fake pixel grid (~20px cells on 1024 canvas); step 2 finds the cell size and phase.
