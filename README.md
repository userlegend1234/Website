# OGURION Website

One-page website for OGURION – fiber-optic in-situ particle sensors for PVD/ALD/CVD vacuum coating systems.
Plain HTML, CSS and JavaScript, no frameworks and no build step.

## Files

| File | Content |
| --- | --- |
| `index.html` | One-pager: Hero, Mission, Product (exploded view), Solutions, Projects, Team, Contact |
| `privacy.html`, `legal.html` | Privacy Policy and Legal Notice (fill in the `[…]` placeholders) |
| `styles.css` | All styles (colors as CSS variables at the top) |
| `script.js` | Exploded view, mobile menu, hero particles, contact form |
| `images/` | Logo (`logo.png`, `favicon.png`) and sensor parts (placeholder SVGs) |
| `docs/` | Put `OGURION_Spec_Sheet.pdf` and `OGURION_Brochure.pdf` here |

## Preview

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Replacing the sensor images

The exploded view uses five parts from top to bottom (`images/sensor-01-…` to `sensor-05-…`).
Replace them with your CAD renderings (transparent PNG or SVG, ideally the same width and viewing angle)
and update the `src` in `index.html`. Per part you can tune:

- `data-overlap` – how far the part overlaps the one above when assembled (fraction of the image width)
- `data-label-x` – where the label line starts (fraction of the image width)

To add or remove parts, also adjust `STEP_PARTS` in `script.js` (which parts are highlighted for which text step).

## Still to do

- Replace team placeholders (names, roles, photos)
- Verify the Innosuisse project texts and contact details
- Add the spec sheet and brochure PDFs to `docs/`
- Fill in the Legal Notice / Privacy Policy placeholders

## Brand color

The accent color is the blue from the logo (`#01004C`). It is defined once at the top of `styles.css`
as `--accent-rgb` and also used by the hero animation in `script.js`.
The pink (`--pink-rgb`) and cyan (`--cyan-rgb`) from the logo highlight the particles crossing the measurement beam in the hero.
