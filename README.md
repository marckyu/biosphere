# BioSphere

> **Threats to Biodiversity and the Healthy Society**
> A research-based educational website for Science, Technology & Society.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-Educational-blue)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Live Features](#live-features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Navbar](#navbar)
- [Animations](#animations)
- [Interactive Map](#interactive-map)
- [Interactive Quiz](#interactive-quiz)
- [Dark Mode](#dark-mode)
- [Search Filter](#search-filter)
- [Accessibility](#accessibility)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Contributing](#contributing)
- [Team](#team)
- [References](#references)
- [Changelog](#changelog)
- [License](#license)

---

## About the Project

**BioSphere** is an educational website that translates the group's research on biodiversity loss into an accessible, engaging digital resource. The site explores:

- Major threats to biodiversity (habitat destruction, climate change, pollution)
- Real-world case studies (Amazon, Coral Triangle, West Africa)
- Ethical and social dimensions of conservation
- Direct links between ecosystem health and human well-being
- Interactive knowledge check (20-question quiz)

**Goal:** Inform, provoke critical thinking, and inspire action toward biodiversity conservation.

---

## Live Features

| Feature | Description |
|---|---|
| Modern Navbar | Glassmorphism with gradient logo and pill-shaped nav links |
| Light / Dark Mode | Toggle with localStorage persistence and OS preference detection |
| Working Search | Real-time filter across articles, cases, ethics, visuals, and staff |
| Interactive Map | Leaflet.js world map with 3 case study markers and rich popups |
| Quiz Redesign | Lettered options, progress bar, animated score card, retake button |
| Confetti | Celebration animation on perfect quiz score |
| Animated Counters | Bar chart values count up when scrolled into view |
| Back-to-Top Button | Appears after scrolling 400px |
| Scroll Animations | IntersectionObserver-based reveal effects with stagger |
| Mobile Menu | Hamburger toggle with smooth slide-down and staggered links |
| Reduced Motion | Respects prefers-reduced-motion for accessibility |

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, Keyframe animations, backdrop-filter
- **Vanilla JavaScript (ES6+)** — No frameworks, no dependencies
- **Leaflet 1.9.4** — Interactive world map via CDN
- **canvas-confetti 1.9.2** — Confetti animation for perfect quiz score
- **Font Awesome 6.0** — Icons via CDN

**Zero build tools. Zero npm. Just open `index.html` in a browser.**

---

## File Structure

```
biosphere/
├── index.html      # Main HTML file
├── style.css       # All styles + animations + themes
├── script.js       # Quiz, map, search, theme, animations
└── README.md       # This file
```

---

## Getting Started

### Option 1 — Direct Open
1. Download or clone this repository.
2. Open `index.html` in any modern browser.

### Option 2 — Local Server (recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve
```

### Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Design System

### Color Palette — Light Theme

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#0f4c5c` | Navbar, headers, primary buttons |
| `--primary-light` | `#2a6f7a` | Icons, accents, chart bars |
| `--secondary` | `#3c6e47` | Card borders, hover states |
| `--accent` | `#e3b448` | Highlights, section underlines, badges |
| `--card-bg` | `#ffffff` | Card backgrounds |
| `--text-dark` | `#1e2b3c` | Body text |
| `--text-light` | `#4f5e6b` | Meta text, subheadings |
| `--body-bg` | `#f5f7fa` | Page background |

### Color Palette — Dark Theme

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#4db8c9` | Accent teal for dark backgrounds |
| `--primary-light` | `#6ed3e0` | Lighter accent |
| `--secondary` | `#6fb87f` | Green accent |
| `--accent` | `#f0c868` | Gold accent |
| `--card-bg` | `#142a2e` | Card backgrounds |
| `--text-dark` | `#e8f0f2` | Body text |
| `--text-light` | `#a8bcc4` | Meta text |
| `--body-bg` | `#0a1416` | Page background |

### Typography

- **Font Stack:** `'Segoe UI', Roboto, system-ui, sans-serif`
- **Base Line Height:** `1.6`
- **Headings:** Weight `700–800`, letter-spacing `-0.5px to -1px`
- **Body:** Weight `400`, size `0.95–1.1rem`

---

## Navbar

### Design

Modern glassmorphism with strong translucency and saturated blur.

- **Backdrop blur:** 40px
- **Saturation:** 200%
- **Background:** `rgba(15, 76, 92, 0.42)` in light mode
- **Inner glow:** `rgba(255, 255, 255, 0.08)` inset highlight

### Structure

- **Top bar:** logo + theme toggle + hamburger (mobile)
- **Nav links row:** search box + nav menu

### Logo

- Gold gradient icon with rounded square
- Rotation and glow on hover
- Leaf icon has continuous sway animation

### Navigation Links

- Pill-shaped on hover
- Gold tint for active link
- Underline dot for active state
- Full-width tap targets on mobile

### Mobile Menu

- Hamburger toggle with icon swap (bars to X)
- Smooth slide-down with spring easing
- Staggered menu item entrance
- Auto-close on link click, outside click, or window resize

---

## Animations

### Keyframes Available

| Name | Purpose |
|---|---|
| `fadeUp` | Hero content entry, general reveal |
| `fadeIn` | Bar chart value labels, active indicator |
| `float` | Hero images idle animation |
| `leafSway` | Logo leaf icon |
| `shimmer` | Progress bar fill animation |
| `growBar` | Bar chart entrance |
| `pinDrop` | Map marker entrance |
| `pulseRing` | Map marker pulse |
| `popIn` | Quiz feedback and result card |
| `shake` | Quiz incorrect feedback |
| `menuItemIn` | Mobile menu staggered entrance |

### Easing Functions

- **Smooth:** `cubic-bezier(0.4, 0, 0.2, 1)` — Material Design standard
- **Spring:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — Bouncy interactive elements

### Scroll Reveal

Elements with class `.reveal` become visible via `IntersectionObserver`:

- `.card`
- `.case-card`
- `.ethics-item`
- `.visual-item`
- `.staff-member`

Stagger delay applied per grid item: `--delay` custom property.

### Reduced Motion

Full `prefers-reduced-motion: reduce` support — animations and transitions disabled for accessibility.

---

## Interactive Map

### Overview

A world map embedded in the Case Studies section, powered by Leaflet 1.9.4 and OpenStreetMap tiles.

### Markers

| Location | Case Study | Stat |
|---|---|---|
| Amazon Basin, Brazil | Deforestation & Malaria | 48% rise in malaria cases |
| Tubbataha Reefs, Philippines | Blast Fishing & Food Security | 60% drop in fish catch |
| Guinea, West Africa | Ebola & Bushmeat | 70% outbreaks near forest edges |

### Behavior

- Auto-opens first popup after 800ms
- Custom animated pins with pulse ring
- Scroll-wheel zoom disabled by default, enabled on focus or click
- Responsive heights: 400px desktop, 320px tablet, 260px mobile
- Dark theme aware (popup and zoom controls recolor)

---

## Interactive Quiz

### Architecture

- **Data:** `quizData[]` array with 20 questions
- **Correct answers:** Varied indices (not always first option)
- **Rendering:** Dynamic HTML injection via `renderQuiz()`
- **Evaluation:** `evaluateQuiz()` checks all answers, highlights per question
- **Reset:** `resetQuiz()` clears selections and feedback

### Modern Design Features

#### Lettered Options

Each option has a circular badge with letter A, B, C, or D. Selected option shows gold tint and letter transforms.

#### Progress Bar

Live progress tracking with:
- "X of 20 answered" counter
- Percentage label
- Gradient fill with animated shimmer
- Smooth width transition

#### Animated Score Card

Results screen displays:
- Dynamic icon based on score (trophy, star, thumbs up, books)
- Count-up animation for score number
- Percentage badge
- Contextual message
- Retake button

#### Scoring Logic

| Score | Icon | Message |
|---|---|---|
| 20/20 | Trophy | Perfect! You are a biodiversity expert! |
| 15–19 | Star | Great job! You have a strong understanding. |
| 10–14 | Thumbs up | Good work! Review the articles to sharpen your knowledge. |
| 0–9 | Books | Keep learning! Review the articles and try again. |

#### Feedback

- Correct: green left border + popIn animation
- Incorrect: red left border + shake animation
- Shows user's answer and correct answer
- Incomplete submission: warning with auto-scroll to first unanswered

#### Confetti

Triggered via `canvas-confetti` on perfect score. Three staggered bursts with BioSphere brand colors.

---

## Dark Mode

### How It Works

Dark mode is driven by a `data-theme` attribute on `<html>`. All colors swap through CSS variable overrides.

### Persistence

Theme preference stored in `localStorage` under key `biosphere-theme`.

### OS Preference

Follows `prefers-color-scheme` when no user preference is saved.

### Anti-FOUC

Inline script in `<head>` applies theme before page renders, preventing flash of wrong theme.

### Toggle Button

Located in the navbar. Moon icon in light mode, sun icon in dark mode with rotation animation.

---

## Search Filter

### Behavior

- Live filtering with 200ms debounce
- Enter key or button click triggers immediate search
- Filters: articles, case cards, ethics items, visual items, staff members
- Status message: "Found N results for X"
- Empty state: "No results found for X"
- Clear button resets search and refocuses input

### Accessibility

- `role="status"` with `aria-live="polite"` on status message
- Keyboard accessible

---

## Accessibility

| Feature | Implementation |
|---|---|
| Alt text | All images have descriptive `alt` attributes |
| ARIA labels | Search button, theme toggle, menu toggle, map region, back-to-top |
| Focus styles | `:focus-visible` with gold outline |
| Radio labels | `<label for="qXoY">` properly associated |
| Reduced motion | `prefers-reduced-motion` media query |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>` |
| Live region | Search status uses `aria-live="polite"` |
| Contrast | Text meets WCAG AA in both themes |

### Keyboard Navigation

- Tab through nav links, search, theme toggle, buttons, quiz options
- Enter or Space activates buttons
- Arrow keys navigate radio groups
- Map can be focused for keyboard scroll zoom

---

## Responsive Breakpoints

| Breakpoint | Target | Changes |
|---|---|---|
| > 1024px | Desktop | Full 3-column grids, 400px map |
| 768px – 1024px | Tablet | 2-column grids, 320px map |
| 480px – 768px | Mobile landscape | Navbar stacks, 1-column grids |
| < 480px | Mobile portrait | Reduced fonts, 260px map, full-width buttons |

### Mobile-Specific

- Hamburger menu with slide-down animation
- Staggered menu item entrance
- Full-width tap targets (min 48px)
- Full-width search box
- Quiz buttons full-width
- Map popup narrows to 200px
- Back-to-top shrinks to 42px

---

## Contributing

1. Preserve the design system — use CSS variables, do not hardcode colors
2. Support both themes — always test in light and dark mode
3. Keep animations subtle — follow existing easing functions
4. Accessibility first — test with keyboard and screen reader
5. Document changes — update this README
6. No external libraries unless essential

### Code Style

- **CSS:** kebab-case classes, 2-space indent
- **JS:** camelCase variables, `const` or `let` (no `var`), IIFE wrapper
- **HTML:** lowercase tags, double quotes for attributes

---

## Team

| Name | Role | Contribution |
|---|---|---|
| Addriane Quintela | Lead Researcher & Writer | Main headline, case studies |
| Camille Osinsao | Research & Data Analyst | Infographics, charts, references |
| Aleah Talusan | Ethics & Society Editor | Ethical section, social implications |
| Moschin Talusan | Web Developer | HTML/CSS/JS, interactive quiz |
| Johnmarc Asuncion | Web Developer | HTML/CSS/JS, interactive quiz |
| Marivic Quikelez | Visual & Media | Images, video, alt text |

All members contributed to research, writing, and review.

---

## References

- IPBES (2019). *Global Assessment Report on Biodiversity and Ecosystem Services.*
- WHO (2021). *Biodiversity and Health.*
- WWF (2022). *Living Planet Report.*
- Keesing, F. et al. (2010). Impacts of biodiversity on the emergence of infectious diseases. *Nature.*
- Philippine Biodiversity Conservation Priorities (2020).
- Additional group research findings, 2025 (unpublished).
- Icons: Font Awesome (CC BY 4.0).
- SVG graphics: original work by the team.
- Map tiles: OpenStreetMap contributors.
- Map library: Leaflet 1.9.4.
- Confetti library: canvas-confetti 1.9.2.

---

## Changelog

### v1.5.0 — Quiz Redesign (Modern & Clean)
- Added lettered options (A, B, C, D) with circular badges
- Added progress bar with live "X of 20 answered" counter
- Added animated gradient fill on progress bar
- Improved hover and selected states with smooth transitions
- Added animated score card with count-up number
- Added dynamic icon and message based on score
- Added "Retake Quiz" button on results screen
- Improved incomplete submission warning with auto-scroll

### v1.4.0 — Navbar Redesign
- Redesigned navbar with modern glassmorphism effect
- Added gradient logo icon with rotation on hover
- Improved nav links with pill-shaped hover and active states
- Refined search box with focus glow
- Updated mobile menu with slide-down animation and staggered items
- Increased navbar transparency with stronger blur
- Consistent rounded-square buttons for theme and menu toggles

### v1.3.0 — Polish Update
- Added dark mode toggle with localStorage persistence
- Added live search filter across all content cards
- Added confetti animation for perfect quiz score
- Added animated counters for bar chart values

### v1.1.0 — Interactive Map Update
- Added interactive world map (Leaflet 1.9.4)
- 3 clickable markers with animated pins
- Rich popups with case study details

### v1.0.0 — Initial Release
- Full HTML structure with semantic sections
- Complete CSS design system with variables
- 20-question interactive quiz
- Scroll reveal animations
- Back-to-top button
- Responsive design
- Accessibility features

### Planned (v1.6.0)
- Interactive glossary with tooltips
- Modal reader for "Read more" buttons
- Newsletter signup section
- Print-friendly stylesheet

---

## License

This project is created for **educational purposes** as part of a Science, Technology & Society course requirement.

- **Code:** Free to use, modify, and learn from.
- **Content & Research:** © 2025 BioSphere Team.
- **Icons:** Font Awesome (CC BY 4.0).
- **Images:** Original SVGs by team; other imagery used with permission.

---

## Contact

- Email: *(add team email)*
- Website: *(add deployed link)*
- Institution: *(add school)*

---

<div align="center">

**Protecting nature is protecting ourselves.**

Made by the BioSphere Team · 2025

</div>