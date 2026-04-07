# Sadhasivam Jayabalaganesan - Resume

Professional resume website for Enterprise Platform Architect specializing in logistics intelligence platforms, event-driven data systems, and AI experimentation frameworks.

🔗 **Live Site:** [https://sadhasivam.github.io](https://sadhasivam.github.io)

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (v1.3.11 or later) - Fast JavaScript runtime and package manager

### Development

```bash
# Install dependencies
bun install

# Start development server with live reload
bun run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
# Build optimized CSS
bun run build
```

---

## 📁 Project Structure

```
.
├── src/                    # Authoring source (edit these)
│   ├── index.html          # Resume HTML source
│   └── styles/
│       ├── screen.css      # Screen styles source
│       ├── print.css       # Print styles source
│       └── fonts.css       # Font face definitions
├── tools/                  # Build/export pipeline (TypeScript)
│   ├── build.ts            # Main build script
│   ├── export-markdown.ts  # HTML → Markdown
│   ├── export-pdf.ts       # HTML → PDF (future)
│   └── export-latex.ts     # HTML → LaTeX (future)
├── assets/                 # Source assets
│   └── fonts/              # FiraGo .woff2 files
├── generated/              # Intermediate export output (gitignored)
│   ├── resume.md           # Generated markdown
│   ├── resume.pdf          # Generated PDF (future)
│   └── resume.tex          # Generated LaTeX (future)
├── docs/                   # Published site (GitHub Pages serves this)
│   ├── index.html          # Built HTML
│   ├── css/
│   │   ├── screen.css      # Built screen CSS
│   │   └── print.css       # Built print CSS
│   ├── assets/
│   │   └── fonts/          # Copied fonts
│   └── downloads/
│       └── sadhasivam-jayabalaganesan-resume.pdf  # Manual PDF
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── .gitignore              # Ignore generated/ and node_modules
```

**Architecture:**
- **`src/`** - Source files you edit
- **`tools/`** - Build pipeline (transforms src/ → docs/)
- **`assets/`** - Source assets (fonts, images)
- **`generated/`** - Intermediate outputs (local only, gitignored)
- **`docs/`** - Published site (committed, served by GitHub Pages)

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| **`bun run dev`** | 🔥 **Live development** - watches HTML/CSS, auto-reloads browser |
| **`bun run watch`** | Same as dev - live development mode |
| **`bun run build`** | 🏗️ **Production build** - CSS + markdown + copy to docs/ |
| `bun run serve` | Serve docs/ folder only (no live reload) |
| `bun run preview` | Build once + serve (no live reload) |
| `bun run build:css` | Build both screen.css and print.css |
| `bun run export:md` | Export HTML → Markdown (generated/resume.md) |
| `bun run export:pdf` | Export HTML → PDF (coming soon) |
| `bun run export` | Run all exports |

**Most used commands:**
- **Development:** `bun run dev` → edit files → browser auto-reloads ✨
- **Production:** `bun run build` → deploy docs/ folder

---

## 🎨 Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS 3.4** - Utility-first styling
- **PostCSS** - CSS processing pipeline
- **Bun** - Fast JavaScript runtime and package manager
- **FiraGo Font** - Professional typography

---

### Manual Updates

1. Edit content in `index.html`
2. Run `bun run dev` to preview changes
3. Commit and push to deploy (GitHub Pages auto-deploys from `main` branch)

---

## 🌐 Deployment

This site is hosted on **GitHub Pages** and deploys automatically when changes are pushed to the `main` branch.

**Deployment URL:** `https://sadhasivam.github.io`

---

## 📦 Dependencies

### Core

- **Tailwind CSS** `^3.4.17` - Utility-first CSS framework
- **PostCSS** `^8.4.49` - CSS transformation pipeline
- **Autoprefixer** `^10.4.20` - Vendor prefix automation
- **cssnano** `^7.0.6` - CSS minification

### Development

- **serve** `^14.2.4` - Static file server
- **concurrently** `^9.1.2` - Run multiple commands
- **postcss-cli** `^11.0.0` - PostCSS command-line interface

---

## 🎯 Design Principles

1. **Simplicity first** - Clean, professional appearance
2. **Platform thinking** - Emphasize architecture leadership
3. **Fast loading** - Minimal dependencies, optimized assets
4. **Mobile responsive** - Mobile-first design approach
5. **Accessibility** - Semantic HTML, proper ARIA labels
6. **Print friendly** - Optimized for PDF export

---

## 📄 License

UNLICENSED - Personal resume site

---

## 🔧 Troubleshooting

### Port already in use

```bash
# Change port in package.json serve script
# Or kill process on port 3000
lsof -ti:3000 | xargs kill
```

### CSS not updating

```bash
# Clear build cache and rebuild
rm -rf public/css/build.css
bun run build:css
```

### Dependencies issues

```bash
# Clear and reinstall
rm -rf node_modules bun.lockb
bun install
```

---

**Built with Bun 🥟**
