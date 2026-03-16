# groven.online

Website and landing page for **[Groven](https://github.com/sofilab-art/groven)** — an open source platform where collective thinking becomes collective action.

Live at **[groven.online](https://groven.online)**

---

## About Groven

Groven is a platform for communities that need to think together — not just talk. It combines a typed idea graph, LLM-assisted semantic classification, and integrated governance into a single spatial interface.

Core concepts:

- **The Grove** — a spatial, depth-navigable environment where conversations grow like plants: seeds become seedlings, shrubs, and trees as discourse deepens
- **Semantic relationships** — five types (Clarification, Extension, Reframing, Contradiction, Synthesis) proposed by AI, confirmed by humans
- **Governance from conversation** — decisions emerge from structured thinking, not imposed voting

→ App repository: [sofilab-art/groven](https://github.com/sofilab-art/groven)

---

## This repository

Static website built with vanilla HTML, CSS, and JavaScript. No build step, no framework, no dependencies beyond Google Fonts.

```
index.html   — landing page with animated canvas hero + content sections
style.css    — all styles (CSS custom properties, responsive)
main.js      — animated node graph hero, scroll reveal, nav
v6/          — design documents and mockups
```

### Hero

The hero section features an animated canvas node graph — drifting nodes connected by edges, with gentle pulsing and glow effects. The animation pauses when scrolled out of view for performance.

---

## Development

Clone and open `index.html` directly in a browser, or use a local server:

```bash
git clone https://github.com/sofilab-art/groven.online
cd groven.online
npx serve .
```

---

## Deployment

Hosted via GitHub Pages from the `main` branch root. Push to `main` → live within seconds.

`groven.online` forwards to GitHub Pages via DNS CNAME.

---

## Contributing

Issues and PRs welcome. For substantive changes to copy or concept, please open an issue first.

---

## Credits

Initiated by [Sofilab GmbH](https://sofilab.art), Munich.

---

*Groven is not a product. It is a question. Fork it.*
