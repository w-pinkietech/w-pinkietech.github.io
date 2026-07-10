# Repository Guidance

This repository contains the public PinkieTech website.

Read `DESIGN.md` before changing layout, typography, color, logo use, components, or responsive behavior. It is derived from the canonical `pinkietech-brand/docs/website-design-system.md` source.

## Brand principles

- Center the people doing the work and the reality of their work site (`現場`).
- Treat AI, IoT, and OSS as means, not the headline or purpose.
- Prefer warm, practical, direct language over futurist or buzzword-heavy copy.
- Avoid cyberpunk, neon, hologram, robot, AI-brain, and generic corporate imagery.
- Do not invent customer results, testimonials, partners, certifications, or contact details.
- Use `#E86A2D`, `#111827`, `#FFFFFF`, and `#0DA5A4` according to the brand system.
- Keep semantic HTML, keyboard focus, contrast, reduced motion, and responsive behavior intact.

The canonical brand source is the private `w-pinkietech/pinkietech-brand` repository.

## Commands

```bash
npm ci
npm run lint
npm run build
npm audit
```

## Deployment

Merges to `main` are built and deployed to GitHub Pages by the existing `Deploy to GitHub Pages` workflow. The production domain is `https://pinkie-tech.jp/`.
