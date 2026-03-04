# groven.github.io

Website and landing page for **[Groven](https://github.com/sofilab-art/groven)** — an open source platform combining a typed idea graph, LLM-assisted semantic typology, and integrated governance voting.

Live at **[groven.online](https://groven.online)**

---

## About Groven

Groven is where structured thinking becomes collective action. It is a communication platform for communities that need to move from open discussion to informed collective decision — without losing the reasoning that got them there.

Core concepts:

- **Seed → Branch → Forest** — a Git-inspired model for idea lineage
- **Branch typology** — five semantic types (Clarification, Extension, Reframing, Contradiction, Synthesis) classified by an LLM, confirmed or overridden by the author
- **Governance module** — discussion, readiness declaration, and voting integrated in a single graph; decisions anchored as immutable nodes

→ App repository: [sofilab-art/groven](https://github.com/sofilab-art/groven)

---

## This repository

Static website built with vanilla HTML, CSS, and JavaScript. No build step, no framework, no dependencies beyond Google Fonts.

```
index.html   — full landing page
style.css    — all styles (CSS custom properties, responsive)
main.js      — scroll reveal, canvas animations, nav behaviour
```

---

## Development

Clone and open `index.html` directly in a browser. No server required for local development.

```bash
git clone https://github.com/sofilab-art/groven.github.io
cd groven.github.io
open index.html
```

For live-reload during editing:

```bash
npx serve .
```

---

## Deployment

Hosted via GitHub Pages from the `main` branch root. Push to `main` → live within seconds.

`groven.online` forwards to `groven.github.io` via DNS CNAME.

---

## Contributing

Issues and PRs welcome. For substantive changes to copy or concept, please open an issue first — content decisions are made in [sofilab-art/groven](https://github.com/sofilab-art/groven) using Groven's own governance process once the platform is live.

---

## Credits

Initiated by [Sofilab GmbH](https://sofilab.art), Munich.  
Co-funded by the European Union (Creative Europe).

---

*This file is a Seed. Fork it.*
