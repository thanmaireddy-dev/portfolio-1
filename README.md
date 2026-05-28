# SAAHIL ZAMEER SHAIK — Developer & Designer Portfolio

A dark-themed premium personal portfolio for **SAAHIL ZAMEER SHAIK** — ECE student at CMR Institute of Technology, Hyderabad, currently building Prompt Techies. Focused on AI, product development, web technologies, and startup building.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- Next.js 14 (App Router)
- React 18 / TypeScript
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icons)
- Kanit font (Google Fonts, weights 300–900)

## Sections

1. **Hero** — cinematic custom `intro.mp4` video background, direct video sound unmuting controls, neon electric-blue dialogue subtitles card
2. **About** — bio + skills grouped by Languages / Frameworks / Tools / AI
3. **Services** — UI/UX Design, Front-end Development, GenAI Integration, Prompt Engineering, Data Analysis
4. **Projects** — sticky-stacking cards for AI HUB, MindEase ai, ResumeIQ, Notch
5. **Contact** — Email, WhatsApp, LinkedIn, GitHub

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # start production server
```

## Deploy to Vercel

Push to GitHub → import the repo at [vercel.com/new](https://vercel.com/new) → click Deploy. No environment variables needed.

## Project structure

```
src/
├── app/
│   ├── layout.tsx             # Root Layout (metadata, Kanit font)
│   ├── page.tsx               # Home Page (composes all sections with "use client")
│   └── globals.css            # global styles + custom typography and gradients
└── components/
    ├── HeroSection.tsx        # navbar, cinematic video, audio controls, dialogue subtitles card
    ├── AboutSection.tsx       # bio, animated text, skills grid
    ├── ServicesSection.tsx    # white section, numbered services list
    ├── ProjectsSection.tsx    # sticky-stacking project cards
    ├── ContactSection.tsx     # contact methods, social media links, footer
    │
    ├── ContactButton.tsx      # gradient pill CTA
    ├── LiveProjectButton.tsx  # ghost outline pill
    ├── FadeIn.tsx             # whileInView animation wrapper
    ├── Magnet.tsx             # mouse-following magnetic hover
    └── AnimatedText.tsx       # char-by-char scroll-driven reveal
```

## Customisation

| Want to change | Open this file |
|---|---|
| Name, nav links, video subtitles | `src/components/HeroSection.tsx` |
| About paragraph, skills list | `src/components/AboutSection.tsx` |
| Services list | `src/components/ServicesSection.tsx` (`SERVICES` array) |
| Projects, screenshots, live URLs | `src/components/ProjectsSection.tsx` (`PROJECTS` array) |
| Contact methods | `src/components/ContactSection.tsx` (`CONTACT_METHODS` array) |
| Project screenshots | drop new images in `public/` and reference as `/filename.png` |
| Brand gradient, font, scrollbars | `src/app/globals.css` |
| Page title, SEO metadata | `src/app/layout.tsx` |

## Credits

Designed & built by **SAAHIL ZAMEER SHAIK** · [LinkedIn](https://www.linkedin.com/in/shaik-saahilzameer-7a3b66293/) · [GitHub](https://github.com/saahilzameer)
