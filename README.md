
# Pieter's Recipe Website (Production Build)

This is a static, JSON-powered recipe website ready for deployment on **GitHub Pages**.

## Deploy to GitHub Pages
1. Create a public repository (e.g., `pieter-recipes`).
2. Upload the **contents of this folder** to the repo root (not the zip itself).
3. In **Settings → Pages**: set **Branch** to `main` and **Folder** to `/root`, then Save.
4. Your site will be live at: `https://<your-username>.github.io/pieter-recipes/`.

No custom domain is configured in this build.

## Local Development
Use a local server so `fetch()` can load `recipes.json`:
- VS Code Live Server (Right-click `index.html` → Open with Live Server), or
- Python: `python3 -m http.server`

## Structure
- `index.html`: Home with search + type filter
- `recipe.html`: Recipe detail page (reads `id` from query string)
- `recipes.json`: Content source
- `styles.css`: Styles (responsive, accessible)
- `script.js`: Loads JSON, renders cards, search + filter
- `recipe.js`: Loads selected recipe and renders detail
- `images/`: Placeholder logo + thumbnails (replace with your own)

## Editing Content
Add/edit recipes in `recipes.json`. Ensure each recipe has a stable unique `id`.
