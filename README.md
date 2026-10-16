# 🌿 BioSphere

> **Threats to Biodiversity and the Healthy Society**  
> A research-based educational website for Science, Technology & Society.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-Educational-blue)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Features](#-live-features)
- [Tech Stack](#-tech-stack)
- [File Structure](#-file-structure)
- [Getting Started](#-getting-started)
- [Design System](#-design-system)
- [Animations](#-animations)
- [Interactive Quiz](#-interactive-quiz)
- [Accessibility](#-accessibility)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Contributing](#-contributing)
- [Team](#-team)
- [References](#-references)
- [License](#-license)

---

## 🌱 About the Project

**BioSphere** is an educational website that translates the group's research on biodiversity loss into an accessible, engaging digital resource. The site explores:

- Major threats to biodiversity (habitat destruction, climate change, pollution)
- Real-world case studies (Amazon, Coral Triangle, West Africa)
- Ethical and social dimensions of conservation
- Direct links between ecosystem health and human well-being
- Interactive knowledge check (20-question quiz)

**Goal:** Inform, provoke critical thinking, and inspire action toward biodiversity conservation.

---

## ✨ Live Features

| Feature | Description |
|---|---|
| 📰 **Main Headline** | Synthesized research article on biodiversity loss & global health |
| 📚 **5 Research Articles** | Cards covering deforestation, coral reefs, agrobiodiversity, urbanization, climate change |
| 📊 **Visual Materials** | Animated bar chart, timeline, diagram placeholders, icons |
| 🌍 **Case Studies** | Amazon malaria, Coral Triangle blast fishing, West Africa Ebola |
| ⚖️ **Ethics Section** | Intrinsic value, environmental justice, gene drives, sustainable development |
| 🧠 **Interactive Quiz** | 20 questions with per-question feedback, scoring, reset |
| 👥 **Editorial Staff** | Team credits with roles |
| 📖 **References** | Academic and institutional sources |
| ⬆️ **Back-to-Top Button** | Appears after scrolling 400px |
| 🎬 **Scroll Animations** | IntersectionObserver-based reveal effects |

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties (variables), Grid, Flexbox, Keyframe animations
- **Vanilla JavaScript (ES6+)** — No frameworks, no dependencies
- **Font Awesome 6.0** — Icons via CDN
- **Google Fonts** — System fonts fallback (`Segoe UI`, `Roboto`, `system-ui`)

**Zero build tools. Zero npm. Just open `dashboard.html` in a browser.**

---

## 📁 File Structure

```
biosphere/
├── dashboard.html      # Main HTML file
├── style.css           # All styles + animations
├── script.js           # Quiz logic + scroll animations
└── README.md           # This file
```

---

## 🚀 Getting Started

### Option 1 — Direct Open
1. Download or clone this repository.
2. Open `dashboard.html` in any modern browser.
3. Done. 🎉

### Option 2 — Local Server (recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve
```

Then visit: `http://localhost:8000/dashboard.html`

### Browser Support
| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 🎨 Design System

### Color Palette

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#0f4c5c` | Navbar, headers, primary buttons |
| `--primary-light` | `#2a6f7a` | Icons, accents, chart bars |
| `--secondary` | `#3c6e47` | Card borders, hover states |
| `--accent` | `#e3b448` | Highlights, section underlines, badges |
| `--card-bg` | `#ffffff` | Card backgrounds |
| `--text-dark` | `#1e2b3c` | Body text |
| `--text-light` | `#4f5e6b` | Meta text, subheadings |
| `--shadow` | `0 8px 20px rgba(0,0,0,0.05)` | Card shadows |
| `--radius` | `18px` | Global border radius |

### Typography

- **Font Stack:** `'Segoe UI', Roboto, system-ui, sans-serif`
- **Base Line Height:** `1.6`
- **Headings:** Weight `700–800`, letter-spacing `-0.5px to -1px`
- **Body:** Weight `400`, size `0.98–1.1rem`

### Spacing Scale

- Cards: `1.8rem` padding
- Sections: `2.5rem` vertical margin
- Grid gaps: `1.5rem – 2rem`

---

## 🎬 Animations

### Keyframes Available

| Name | Purpose |
|---|---|
| `fadeUp` | Hero content entry |
| `fadeIn` | Bar chart value labels |
| `float` | Hero images idle animation |
| `leafSway` | Logo leaf icon |
| `shimmer` | Card hover effect |
| `growBar` | Bar chart entrance |
| `popIn` | Quiz correct feedback |
| `shake` | Quiz incorrect feedback |

### Scroll Reveal

Elements with class `.reveal` become visible via `IntersectionObserver`.

**Auto-tagged elements:**
- `.card`
- `.case-card`
- `.ethics-item`
- `.visual-item`
- `.staff-member`

**Stagger delay** applied per grid item:
```css
.reveal.visible { transition-delay: var(--delay, 0s); }
```

### Reduced Motion

Full `prefers-reduced-motion: reduce` support — animations disabled for accessibility.

---

## 🧠 Interactive Quiz

### Architecture

- **Data:** `quizData[]` array in `script.js` with 20 questions.
- **Correct answers:** Varied indices (not always "A").
- **Rendering:** Dynamic HTML injection via `renderQuiz()`.
- **Evaluation:** `evaluateQuiz()` checks all answers, highlights per question.
- **Reset:** `resetQuiz()` clears selections and feedback.

### Scoring Logic

| Score | Message |
|---|---|
| 20/20 | "Perfect! You are a biodiversity expert!" |
| 15–19 | "Great job! You have a strong understanding." |
| 0–14 | "Good start — review the articles and try again!" |

### Visual Feedback

- ✅ Correct → `.correct-highlight` (green) + `popIn` animation
- ❌ Incorrect → `.incorrect-highlight` (red) + `shake` animation
- Shows user's answer + correct answer

---

## ♿ Accessibility

| Feature | Implementation |
|---|---|
| Alt text | All images have descriptive `alt` attributes |
| ARIA labels | Search button, back-to-top button, search input |
| Focus styles | `:focus-visible` with gold outline |
| Radio labels | `<label for="qXoY">` properly associated |
| Reduced motion | `prefers-reduced-motion` media query |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Contrast | All text meets WCAG AA |

### Keyboard Navigation

- Tab through nav links, search, buttons, quiz options
- Enter/Space activates buttons
- Arrow keys navigate radio groups

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Changes |
|---|---|---|
| `> 1024px` | Desktop | Full 3-column grids |
| `768px – 1024px` | Tablet | 2-column grids |
| `480px – 768px` | Mobile landscape | Navbar stacks, 1-column grids |
| `< 480px` | Mobile portrait | Reduced font sizes, vertical quiz options |

### Mobile-Specific

- Navbar becomes column layout
- Ad banner stacks text + badge
- Quiz options stack vertically
- Back-to-top button shrinks to 44px

---

## 🤝 Contributing

This is an educational group project. If you're extending it:

1. **Preserve the design system** — use CSS variables, don't hardcode colors.
2. **Keep animations subtle** — follow existing `cubic-bezier(0.34, 1.56, 0.64, 1)` easing.
3. **Accessibility first** — test with keyboard + screen reader.
4. **Document changes** — update this README.
5. **No external libraries** unless essential — keep it vanilla.

### Code Style

- **CSS:** kebab-case classes, 2-space indent
- **JS:** camelCase variables, `const`/`let` (no `var`), IIFE wrapper
- **HTML:** lowercase tags, double quotes for attributes

---

## 👥 Team

| Name | Role | Contribution |
|---|---|---|
| **Addriane Quintela** | Lead Researcher & Writer | Main headline, case studies |
| **Camille Osinsao** | Research & Data Analyst | Infographics, charts, references |
| **Aleah Talusan** | Ethics & Society Editor | Ethical section, social implications |
| **Moschin Talusan** | Web Developer | HTML/CSS/JS, interactive quiz |
| **Johnmarc Asuncion** | Web Developer | HTML/CSS/JS, interactive quiz |
| **Marivic Quikelez** | Visual & Media | Images, video, alt text |

*All members contributed to research, writing, and review.*

---

## 📚 References

- IPBES (2019). *Global Assessment Report on Biodiversity and Ecosystem Services.*
- WHO (2021). *Biodiversity and Health.*
- WWF (2022). *Living Planet Report.*
- Keesing, F. et al. (2010). Impacts of biodiversity on the emergence of infectious diseases. *Nature.*
- Philippine Biodiversity Conservation Priorities (2020).
- Additional group research findings, 2025 (unpublished).
- Icons: [Font Awesome](https://fontawesome.com/) (CC BY 4.0).
- SVG graphics: original work by the team.

---

## 📝 Changelog

### v1.0.0 — Initial Release
- ✅ Full HTML structure with semantic sections
- ✅ Complete CSS design system with variables
- ✅ 20-question interactive quiz
- ✅ Scroll reveal animations (IntersectionObserver)
- ✅ Stagger delays for grid items
- ✅ Back-to-top button
- ✅ Scroll spy (active nav link)
- ✅ Reduced motion support
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Accessibility: focus styles, ARIA labels, alt text

### Planned (v1.1.0)
- 🌙 Dark mode toggle
- 🔍 Functional search filter
- 📊 Animated stat counters
- 🗺️ Interactive Leaflet map for case studies
- 📧 Newsletter signup section
- 🎉 Confetti animation for perfect quiz score

---

## 📄 License

This project is created for **educational purposes** as part of a Science, Technology & Society course requirement.

- **Code:** Free to use, modify, and learn from.
- **Content & Research:** © 2025 BioSphere Team. Please cite appropriately.
- **Icons:** Font Awesome (CC BY 4.0).
- **Images:** Original SVGs by team; other imagery used with permission.

---

## 📬 Contact

For questions, corrections, or collaboration:

- 📧 Email: *(add team email)*
- 🌐 Website: *(add deployed link if any)*
- 📍 Institution: *(add school/university)*

---

<div align="center">

**🌿 Protecting nature is protecting ourselves. 🌿**

Made with 💚 by the BioSphere Team · 2025


- Map tiles: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Map library: [Leaflet](https://leafletjs.com/) 1.9.4

| 🗺️ **Interactive Map** | Leaflet.js world map with 3 case study markers and rich popups |

</div>