# Atikis Aviation Catering Website

## Environment configuration

Set the canonical site URL used for robots.txt and sitemap generation:

- NEXT_PUBLIC_SITE_URL=https://your-domain.example

If not set, the app falls back to https://atkins-catering.netlify.app.

## Forbidden pattern scan (CI)

This repository includes a lightweight scan to catch risky patterns:
- localhost / 127.0.0.1 / http://0.0.0.0
- API key–like strings (sk-...)

Run locally:

```
npm run scan:forbidden
```

GitHub Actions runs the same scan on every push/PR (see .github/workflows/forbidden-scan.yml).

## Netlify 404 SPA fallback

The Netlify config (netlify.toml) includes a SPA redirect so client-side routes don’t 404:

```
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Build

```
npm ci
npm run build
```

The site uses static export (Next.js) and is deployed from the `out` directory.

