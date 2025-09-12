# Atkins Catering Website — Client Handoff

This document summarizes what was delivered, where it’s deployed, how to make common updates, and what to do next.

## Overview
- Framework: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Hosting: Netlify (Static export + Netlify Functions)
- Internationalization (i18n): Custom context with pluralization helper
- Key feature: “Box Options” flow with grouped cart behavior, constraints, mobile-friendly UX
- Serverless: Contact submission via Netlify Function with optional email provider (Resend)

## Live URLs
- Production site: https://atkins-catering.netlify.app
- Netlify project dashboard: https://app.netlify.com/projects/atkins-catering
- Latest production deploy logs: See dashboard → Deploys

## What’s included
- Fully built, production-ready site with SPA fallback on Netlify
- Contact form with safe serverless submission (returns success with or without email provider)
- Image optimization scripts and responsive image variants (non-destructive)
- Automated checks: Lighthouse and Link crawl scripts
- Security headers and caching policies via netlify.toml

## How to run locally
1) Requirements: Node 18+ (Node 22 tested)
2) Install deps: `npm install`
3) Start dev: `npm run dev` → http://localhost:3000
4) Production build: `npm run build`
5) Preview static export locally: `npm run serve:out` → http://localhost:4173

## Deployments (Netlify)
- Build command: `npm run build`
- Publish directory: `out`
- Functions directory: `netlify/functions`
- Configuration file: `netlify.toml`

Two ways to deploy:
1) Git-based (recommended): connect the repo in Netlify → automatic builds on push
2) CLI: `npx netlify deploy --prod` (project already linked on your machine)

## Environment variables
Managed by Netlify (UI or netlify.toml). Current/expected:
- `NEXT_PUBLIC_SITE_URL` = https://atkins-catering.netlify.app (set in netlify.toml at build time)
- Optional (enable email sending):
  - `RESEND_API_KEY` = your Resend API key
  - `CONTACT_TO_EMAIL` = recipient for contact submissions (e.g., order@atikismn.com)
  - `CONTACT_FROM_EMAIL` = optional from/sender address (verified domain recommended)

Update in Netlify UI: Site settings → Environment variables → Add variable → Save → Redeploy

## Contact form (serverless) details
- Endpoint: `/.netlify/functions/contact-submit`
- Source: `netlify/functions/contact-submit.ts`
- Behavior:
  - Always accepts POSTed submissions and returns 202 Accepted
  - If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are provided, the function will attempt to send an email
  - Frontend gracefully falls back to mailto if the function is unavailable

## Image optimization
- Optimizer script: `scripts/optimize-images.mjs` (generates responsive JPEGs in `public/optimized/...`)
- WebP script: `scripts/create-webp.mjs` (requires system support or switching to `sharp` if desired)
- Originals are preserved; no references are removed

## Automated checks
- Link crawl (local or live): `npm run pre-demo:links`
- Lighthouse (local): `npm run pre-demo:lighthouse`
- CI workflow: `.github/workflows/lighthouse.yml` (non-blocking assertions)

## Content updates (common tasks)
- Pages: `app/*/page.tsx` (e.g., `app/menu/page.tsx`, `app/contact/page.tsx`)
- Layout & metadata: `app/layout.tsx` (reads `NEXT_PUBLIC_SITE_URL` for canonical/OG base)
- Images: `public/images/...` (add new; optional to generate variants with scripts above)
- Components (UI): `components/...`
- Translations: search for i18n usages and language dictionaries under project components; new keys should be added across all locales for consistency.

## Release notes (high-level)
- Implemented Box Options enhancements: grouped cart, constraints, mobile UX, pluralization
- Added privacy and terms pages; fixed favicon/OG links
- Serverless contact submission with graceful fallback
- Optimized images and added responsive variants
- Added Lighthouse and link checks + CI workflow
- Netlify configuration with SPA redirects and security headers

## Post-launch recommendations
- Configure email sending: add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Netlify → Redeploy
- Set up custom domain (Netlify → Domain management) and update `NEXT_PUBLIC_SITE_URL` accordingly
- Analytics/Monitoring: add your preferred analytics and uptime monitoring (Netlify, Pingdom, etc.)
- Improve “Best Practices” to 90+ (current Lighthouse BP ~79). I can provide a targeted PR if desired.
- Optional: switch WebP generation to `sharp` for consistent results across systems

## Support & handoff
If you need assistance applying content changes, domain setup, or enabling email delivery, I can perform those steps or prepare short how‑tos for your team. Just let me know your preferences.

