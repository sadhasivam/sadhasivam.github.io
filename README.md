# Sadhasivam Jayabalaganesan — Resume

Professional resume website for Enterprise Platform Architect specializing in logistics intelligence platforms, event-driven data systems, and AI/ML experimentation frameworks.

🔗 **Live:** [sadhasivam.github.io](https://sadhasivam.github.io)  
📄 **PDF:** [sadhasivam.github.io/resume/sadhasivam-jayabalaganesan-resume.pdf](https://sadhasivam.github.io/resume/sadhasivam-jayabalaganesan-resume.pdf)

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.3.11+

### Development

```bash
bun install
bun run dev
```

Site available at `http://localhost:3000` with live reload.

### Production Build

```bash
bun run build
```

Generates optimized CSS, exports PDF/Markdown, and copies to `docs/` for GitHub Pages deployment.

---

## Project Structure

```
.
├── src/
│   ├── index.html          # Resume source (edit this)
│   └── styles/
│       ├── screen.css      # Screen/web styles
│       ├── print.css       # Print/PDF styles
│       └── fonts.css       # Font definitions
├── tools/                  # Build pipeline (TypeScript)
│   ├── build.ts            # Main build orchestrator
│   ├── export-markdown.ts  # HTML → Markdown converter
│   ├── export-pdf.ts       # HTML → PDF (Playwright)
│   ├── watch.ts            # Dev server with live reload
│   └── constants.ts        # Shared configuration
├── assets/
│   ├── fonts/              # FiraGo .woff2 files
│   └── favicon.png
├── docs/                   # GitHub Pages deployment target
│   ├── index.html          # Built HTML
│   ├── css/
│   │   ├── screen.css      # Built screen CSS
│   │   └── print.css       # Built print CSS
│   ├── assets/fonts/       # Copied fonts
│   └── resume/             # Exported artifacts
│       ├── *.pdf           # Generated PDF
│       └── *.md            # Generated Markdown
└── generated/              # Intermediate output (gitignored)
```

**Key Directories:**
- **`src/`** — Edit these source files
- **`tools/`** — Build pipeline transforms `src/` → `docs/`
- **`docs/`** — Published site served by GitHub Pages
- **`generated/`** — Local artifacts (gitignored)

---

## Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | **Development server** — live reload on file changes |
| `bun run build` | **Production build** — CSS + PDF + Markdown → `docs/` |
| `bun run serve` | Serve `docs/` folder (no live reload) |
| `bun run export:md` | Generate Markdown export only |
| `bun run export:pdf` | Generate PDF export only |
| `bun run export` | Generate both PDF and Markdown |
| `bun run lint` | Lint TypeScript files |
| `bun run fmt` | Format TypeScript files |

**Typical workflow:**
1. `bun run dev` — edit `src/index.html` with live preview
2. `bun run build` — generate production assets
3. Commit and push — GitHub Pages auto-deploys

---

## Technical Stack

### Core
- **HTML5** — Semantic markup with accessibility
- **Tailwind CSS 3.4** — Utility-first styling
- **PostCSS** — CSS processing (autoprefixer, cssnano)
- **Bun** — Fast runtime and package manager

### Build Pipeline
- **TypeScript 6.0** — Type-safe build scripts
- **Playwright** — Headless browser for PDF generation
- **unified/rehype/remark** — HTML → Markdown conversion
- **Browser Sync** — Live reload development server

### Typography
- **FiraGo** — Professional sans-serif (WOFF2 format)

---

## Deployment

Hosted on **GitHub Pages**, auto-deploys from `main` branch.

**URL:** `https://sadhasivam.github.io`

GitHub Pages serves the `docs/` directory. Push to `main` triggers automatic deployment.

---

## Design Principles

- **Technical leadership positioning** — Platform ownership over implementation details
- **Director-level polish** — Professional aesthetic and content hierarchy
- **Multi-format support** — Web (responsive), PDF (print-optimized), Markdown (ATS-friendly)
- **Performance** — Minimal dependencies, optimized assets, fast load times
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation

---

## Export Formats

### PDF
Generated via Playwright headless browser:
- Print-optimized CSS (`src/styles/print.css`)
- US Letter format (8.5" × 11")
- Clickable links preserved
- Single-page layout

### Markdown
Generated via unified pipeline:
- Preserves contact links (LinkedIn, GitHub)
- Email obfuscation handled via noscript fallback
- ATS-compatible formatting

---

## Troubleshooting

### Port conflict
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
```

### CSS not updating
```bash
rm -rf docs/css/*.css
bun run build
```

### Dependencies issues
```bash
rm -rf node_modules bun.lockb
bun install
```

---

## License

Apache 2.0 — See [LICENSE](LICENSE) for details

The build pipeline and template code are open source. Resume content remains personal.

---

**Built with Bun 🥟**
