# PrintSizer

English-language print / image-production calculator site. Static HTML + CSS + vanilla JS; no build step, no server, no data collection.

Live domain: **print-sizer.com** (registered at Namecheap)

## Commands

- Local preview: `node scripts/serve.js` then open http://localhost:8765
- Site self check (JS syntax + internal links): `node scripts/check-site.js`
- Calculator math checks: `node scripts/verify-math.js`

## Structure

```text
printsizer/
├─ index.html          # homepage with tool cards
├─ about.html          # about page
├─ privacy.html        # privacy policy (update before AdSense)
├─ robots.txt          # sitemap line activated once domain is set
├─ css/style.css       # shared styles
├─ tools/              # one HTML file per calculator
│  ├─ print-size-calculator.html
│  ├─ paper-size-to-pixels.html
│  ├─ aspect-ratio-calculator.html
│  ├─ pixels-to-inches-cm.html
│  └─ retina-image-calculator.html
└─ scripts/
   ├─ check-site.js    # syntax + link integrity checks
   ├─ verify-math.js   # deterministic math assertions
   └─ serve.js         # local static dev server
```

## Launch checklist (user gates)

1. Domain purchased: print-sizer.com (Namecheap). DNS changes still pending.
2. Hosting: GitHub Pages with branch deployment (Settings → Pages → Source: Deploy from a branch → main / root). This folder is pushed as a dedicated public repository (site files only, no workspace documents).
3. The `.github/workflows/pages.yml` file is intentionally ignored: the current login token has no `workflow` scope, and branch deployment updates automatically on every push without it.
4. Set custom domain print-sizer.com in Pages settings; CNAME is already committed.
5. At Namecheap, add DNS records (4 GitHub A records for the apex + CNAME www to `<username>.github.io`).
6. Register in Google Search Console and submit https://print-sizer.com/sitemap.xml.
7. After 20-30 quality pages exist, apply for AdSense with the owner's real tax/bank details.

## Editorial rule

Every page must solve one real problem, explain its formula, and be read by the site owner before publishing. No doorway pages, no copied content, no cross-linking between future sites.
