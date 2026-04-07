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
├── index.html              # Main resume page
├── tailwind.css            # Tailwind source styles
├── public/
│   ├── css/
│   │   └── build.css       # Compiled CSS (generated)
│   ├── fonts/              # FiraGo font files
│   └── js/                 # JavaScript files
├── CLAUDE.md               # AI agent instructions for resume maintenance
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with CSS watch and live reload |
| `bun run build` | Build production-optimized CSS |
| `bun run preview` | Alias for `dev` - preview changes locally |
| `bun run serve` | Start static file server only |
| `bun run build:css` | Build CSS once |
| `bun run watch:css` | Watch and rebuild CSS on changes |

---

## 🎨 Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS 3.4** - Utility-first styling
- **PostCSS** - CSS processing pipeline
- **Bun** - Fast JavaScript runtime and package manager
- **FiraGo Font** - Professional typography

---

## 📝 Updating Content

### Using Claude Code

This repository includes `CLAUDE.md` - instructions for AI-assisted resume maintenance. The file defines:

- Platform leadership narrative framework
- Content modernization rules
- Technical positioning guidelines
- 2026+ Technical Director positioning strategy

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

Following guidelines from `CLAUDE.md`:

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

## 👤 Author

**Sadhasivam Jayabalaganesan**
- Email: sadhasivam@gmail.com
- LinkedIn: [linkedin.com/in/sadhasivam](https://linkedin.com/in/sadhasivam)
- GitHub: [github.com/sadhasivam](https://github.com/sadhasivam)
- Location: Chester Springs, PA

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