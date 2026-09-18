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
├─ contact.html        # contact page
├─ privacy.html        # privacy policy with AdSense cookie disclosure
├─ robots.txt          # sitemap line activated once domain is set
├─ css/style.css       # shared styles
├─ tools/              # one HTML file per calculator
│  ├─ print-size-calculator.html
│  ├─ paper-size-to-pixels.html
│  ├─ aspect-ratio-calculator.html
│  ├─ pixels-to-inches-cm.html
│  ├─ retina-image-calculator.html
│  ├─ common-print-sizes.html
│  ├─ poster-dpi-calculator.html
│  ├─ canvas-print-calculator.html
│  ├─ megapixel-calculator.html
│  ├─ ppi-calculator.html
│  ├─ print-bleed-calculator.html
│  ├─ picture-frame-mat-calculator.html
│  ├─ image-file-size-calculator.html
│  ├─ pixels-to-points-converter.html
│  ├─ image-print-size-checker.html
│  ├─ how-big-can-i-print.html
│  ├─ business-card-size-calculator.html
│  ├─ roll-up-banner-calculator.html
│  ├─ print-ppi-calculator.html
│  ├─ photo-crop-calculator.html
│  └─ trifold-brochure-calculator.html
├─ guides/
│  ├─ what-is-300-dpi.html
│  ├─ paper-sizes-in-pixels.html
│  ├─ how-to-check-image-resolution.html
│  ├─ what-is-bleed-in-printing.html
│  ├─ rgb-vs-cmyk-for-printing.html
│  ├─ large-format-print-resolution.html
│  ├─ vector-vs-raster-images.html
│  ├─ best-file-format-for-printing.html
│  ├─ print-resolution-complete-guide.html
│  ├─ prepare-images-for-print.html
│  ├─ canvas-vs-poster-vs-photo-print.html
│  └─ print-file-setup-checklist.html
└─ scripts/
   ├─ check-site.js    # syntax + link integrity checks
   ├─ verify-math.js   # deterministic math assertions
   └─ serve.js         # local static dev server
```

## Launch checklist (user gates)

1. Domain purchased and live: print-sizer.com (Namecheap), with ICANN contact verification completed.
2. Hosting: GitHub Pages with branch deployment (Settings → Pages → Source: Deploy from a branch → main / root).
3. The `.github/workflows/pages.yml` file is intentionally ignored: the current login token has no `workflow` scope, and branch deployment updates automatically on every push without it.
4. Custom domain print-sizer.com is configured; HTTPS certificate approved and enforced.
5. DNS: 4 GitHub A records for the apex + CNAME www to husongjie521-alt.github.io.
6. Google Search Console verified; homepage indexing requested; sitemap at https://print-sizer.com/sitemap.xml.
7. AdSense first review returned "low value content". Content depth upgrade in progress (expanded tool pages + long-form guides); reapply after the expansion is complete and live for about a week.
8. `robots.txt` uses an absolute sitemap URL; `privacy.html` includes the Google AdSense cookie and personalised-advertising disclosure.

## Editorial rule

Every page must solve one real problem, explain its formula, and be read by the site owner before publishing. No doorway pages, no copied content, no cross-linking between future sites.
