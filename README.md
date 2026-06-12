# Ayush Jaiswal — Portfolio v5 (Corporate Premium)

Clean, recruiter-friendly portfolio in the Stripe / Linear / Vercel design language —
flat dark surfaces, hairline borders, a single amber accent, Inter typography, and a
data-driven case-study engine.

**Live:** https://ayush231002.github.io/ayush-portfolio/

## Structure

```
index.html          — single-page shell (semantic HTML, SEO meta, JSON-LD)
thank.html          — form-success page
css/
  base.css          — design tokens, reset, type scale, nav, buttons, footer
  sections.css      — hero, about, projects, deployment, tools, training, experience, contact
  case-study.css    — slide-in project deep-dive panel
js/
  data.js           — ALL content: projects, tools, certificates  ← edit copy here
  case-study.js     — renders a project object into the case-study panel
  main.js           — loader, nav, reveals, counters, filters, renderers
AyushJaiswal_Resume.pdf
```

## Sections

Hero (live product preview) → About → Projects (case studies) → **Deployment architecture**
(EC2 / NGINX / PM2 / SSL flow) → **Platforms & tools** → Power BI training → Experience /
Education (incl. MSc Data Science, Chandigarh University) / **Certificate grid** → Contact.

## Editing content

- **Project case studies** → `PROJECTS` in `js/data.js` (block types: text, arch, steps,
  grid, list, pairs, stack, apis, shots, road — rendered automatically).
- **Platforms & tools** → `TOOLS` in `js/data.js`.
- **Certificates** → `CERTS` in `js/data.js`. Set `url` to the real verification link;
  empty falls back to LinkedIn.
- **Screenshots** — case studies contain placeholder slots (`shots` blocks). Swap in real
  `<img>` tags in `js/case-study.js` → `R.shots` when captures are ready.

## Local preview

```
python -m http.server 4173
```

## Deploy

Push to `main` — GitHub Pages serves the repo root. No build step required.
