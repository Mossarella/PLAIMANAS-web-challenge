# Plaimanas-web-challenge

This frontend project was rapidly built following the provided design, with a **design system in mind**. The UI uses a shared set of tokens for colors, typography, and spacing so the layout stays consistent and easy to extend. Implemented with vanilla HTML, CSS, and JavaScript, plus Tailwind CSS via CDN—no build step required.

The hardest part about this work is, We need to do anything in vanilla, It's been nice sweeping a dust off myself for once in a while, but on the other hand I also felt like i'm shooting myself in the leg.

🌐 **Try it live:** https://plaimanas-web-challenge.vercel.app/

- **Colors** — Semantic tokens (e.g. `--text-black-primary`, `--bg-white-primary`, `--bg-black-primary`) used across components.
- **Typography** — Hanken Grotesk via Google Fonts; size scale (`--font-size-xs/sm/md`) and utility class `.font-hanken`.
- **Spacing** — 5px-based scale in `:root` (`--spacing-5` through `--spacing-120`) and a shared `.utility-max-width` (1600px) for content width.

All of this lives in `styles/custom.css` and is referenced via Tailwind arbitrary values (e.g. `px-[var(--spacing-15)]`) and custom classes.

- ✔️ **Fully responsive** — Mobile hamburger menu that opens a full-screen white overlay with all nav items; EDITORIAL expands to a dropdown (A.S.C, BAZAAR, ELLE, GQ, ) with open/close state styling.

## 📁 Project structure

```
plaimanas/
├── index.html          # Single-page markup
├── styles/
│   └── custom.css      # Design tokens, base styles, component overrides
├── js/
│   └── main.js         # Nav dropdowns, mobile menu, accordion, tabs, collection hover, etc.
├── assets/
│   ├── images/         # Images and icons
│   └── videos/         # Hero and collection videos
└── README.md
```

## 🚀 How to run

1. Clone or download the project and go to the folder:

   ```bash
   cd plaimanas
   ```

2. Open `index.html` in a browser (e.g. drag into Chrome/Firefox or use a local server):

   ```bash
   # Optional: serve with a simple HTTP server
   npx serve .
   # or
   python3 -m http.server 8000
   ```

   No build or environment variables required.

## 🛠️ Technologies

- **HTML5** — Semantic structure (nav, main, section, etc.)
- **Tailwind CSS** — Via CDN; utilities + design tokens from `custom.css`
- **Vanilla JavaScript** — IIFE-based; no framework (accordion, tabs, infinite scroll, language dropdown, mobile menu, EDITORIAL submenu)

## 📐 Responsive breakpoints

- `md:` — 768px and up (desktop nav, layout shifts)
- `lg:` — 1024px and up (wider spacing and typography)

---

\
_Created by Mossarelladev, 2026_.\
Thanks for sticking to here ⭐
