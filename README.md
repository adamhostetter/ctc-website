# Charlotte Temperature Controls (CTC) Website

Standalone website for **Charlotte Temperature Controls** — a Honeywell-accredited building automation and commercial HVAC company serving North and South Carolina since 1988. A FirstCall company.

Built from the same template pipeline as `Starnes HVAC/` (sibling folder) — single-location standalone-brand pattern — but with a **CTC-specific monochromatic blue palette**, a Honeywell partner-strip section, and a controls/BAS-leaning content set (residential service removed; commercial scope only).

---

## Structure

```
CTC/
├── index.html               ← Charlotte HQ (single location)
├── services/
│   ├── commercial-hvac.html      (adapted from Starnes; BAS/controls lean)
│   ├── planned-maintenance.html  (adapted)
│   ├── emergency.html            (adapted; 24/7 line: 1-800-782-7637)
│   └── project-support.html      (adapted; controls retrofits surfaced)
├── config.json              ← Root config (build target: index.html)
├── services/<slug>/config.json
├── shared/
│   ├── css/                 ← tokens + base + components + branch + service
│   ├── js/site.js           ← nav dropdowns, header scroll, hero video, parallax
│   ├── templates/
│   │   ├── branch.html      ← single-location template, includes Honeywell partner strip
│   │   └── service.html     ← service template (no location picker)
│   ├── partials/industries-grid--main.html
│   └── img/
│       ├── logos/
│       │   ├── ctc-color.svg          ← full color logo (reference / future use)
│       │   ├── ctc-hero-white.svg     ← inlined into header + footer
│       │   ├── ctc-favicon.svg        ← favicon
│       │   └── firstcall-*.svg        ← parent-org refs
│       ├── videos/
│       │   └── charlotte-raw_flyover.mp4   ← hero video (shared w/ STR Charlotte)
│       └── photos/ctc/            ← TODO: populate (see below)
├── scripts/
│   ├── build-branches.js
│   ├── dev-server.js
│   └── wire-forms.js
├── reference/               ← CTC NEW LOGO.svg + legacy site screenshot
└── _worker.js               ← Cloudflare Worker (not used by GitHub Pages)
```

## Build

```bash
# Charlotte HQ
node scripts/build-branches.js

# Any service page
node scripts/build-branches.js \
  --template shared/templates/service.html \
  --css "tokens.css,base.css,components.css,service.css" \
  --config services/<slug>/config.json \
  --out services/<slug>.html
```

---

## Brand palette — divergence from STR / Starnes

CTC uses a **monochromatic single-blue system** built around its own logo colors. No contrasting accent (the logo carries none), no cream-and-forest-green Columbus palette. Documented inline in `shared/css/tokens.css`:

| Token | Value | Source |
|---|---|---|
| `--color-primary` | `#045D91` | CTC brand blue (logo wordmark + symbol) |
| `--color-primary-dark` | `#023A5C` | Deep navy — header + footer + partner strip |
| `--color-primary-mid` | `#1276B0` | Lifted blue for cards on dark surfaces |
| `--color-primary-soft` | `#7CB8DC` | Pale sky — eyebrows + soft hover on dark |
| `--color-accent` | `#045D91` | **Same as primary** — CTC has no contrasting accent |
| `--color-accent-light` | `#7CB8DC` | Sky blue eyebrows (same hue family — monochromatic) |
| `--color-bg` | `#FCFBF7` | Cream page bg (kept from template — works with any brand) |
| `--color-text-muted` | `#595A5C` | Matches CTC logo gray ("TEMPERATURE" wordmark) |
| Tier-1/2/3 (industries grid) | `#045D91 / #4A92BD / #BFD9EA` | Single-hue gradient |
| Focus ring | `rgba(4, 93, 145, 0.35)` | Brand blue (Starnes used red — CTC keeps it monochromatic) |
| Shadows | Tinted `rgba(2, 58, 92, …)` | Navy-tinted |

**Liberties taken vs. Starnes pattern:**
- Header tagline next to the logo reads **"Since 1988"** (CTC's founding year, three decades).
- Hero eyebrow reads `Charlotte Temperature Controls · Charlotte, NC · Since 1988`.
- The "A FirstCall Company" section heading reads **"Carolinas local. National platform."** (vs. Starnes's "50 years local").
- **New partner-strip section** between hero and capabilities — surfaces the Honeywell accreditation as a brand-identity signal carried over from CTC's legacy website. Inline-styled in `branch.html` so it doesn't require touching `branch.css`.
- Residential service entry removed everywhere (templates, configs, nav, footer, form select) — CTC is commercial-only.
- Service-form CTA is `ctc-contact` (was `starnes-contact`).

---

## Honeywell accreditation — where it surfaces

This is a load-bearing brand-identity signal (it's the top callout on the legacy site), so it shows up multiple places:

1. **Partner strip** (new section in `branch.html`) — full-width navy band between hero and capabilities. Heading: "A Honeywell Authorized Building Controls Specialist."
2. **Hero paragraph** — "Honeywell-accredited building automation and HVAC service across North and South Carolina."
3. **Commercial HVAC service page** — lede mentions "Honeywell-accredited," whyBullets lead with "Honeywell-accredited controls integrator (Niagara / WEBs / Tridium)."
4. **Meta descriptions** — index + commercial-hvac surface "Honeywell-accredited" in the SERP snippet.

To **change or expand** the partner section, edit the `partners` object in `config.json` (eyebrow / heading / body). No template edits required.

---

## 🚨 BLOCKING TODOs (must fix before any push)

### 1. NC + SC contractor license numbers
`stateLicenses: []` in `config.json`. NC HVAC H-1/H-2/H-3 + Electrical Limited/Intermediate/Unlimited, SC Mechanical, SC Electrical, low-voltage licenses — confirm what's required and supply numbers. Will appear in the footer.

### 2. Hero video compression
`shared/img/videos/charlotte-raw_flyover.mp4` is the raw 18 MB flyover (shared with STR Charlotte). Compress to ~3-5 MB before launch (target 720p, H.264, ~2 Mbps).

### 3. Photo strip
`photoStrip: []` in `config.json` — currently empty, so the photo-strip section is suppressed by `{{#if photoStrip}}`. Add 3-4 photos to `shared/img/photos/ctc/`:
- A Niagara / WEBs / BAS head-end screen (controls identity)
- A mechanical room overview (HVAC identity)
- A rooftop / AHU / chiller shot
- A tech-on-site photo

Then list them in `config.json` `photoStrip` array.

### 4. Map coordinates
`mapCoords` in `config.json` are approximated for the 1705-A Orr Industrial Ct. address. Refine to street-level if you want the JSON-LD geo block to be tight.

### 5. Confirm partner copy
The Honeywell partner strip text in `config.json` `partners.*` is drafted (eyebrow / heading / body). Have the CTC team review for accuracy — particularly the "three decades of awards" claim. If CTC has specific Honeywell award names/years to cite, add them to the body copy.

---

## ⚠️ Pre-launch content review

### Service descriptions
- **`commercial-hvac` was adapted from Starnes** with a controls/BAS lean. Mentions Niagara, WEBs, Tridium, and lists Honeywell as a manufacturer alongside Trane/Carrier/Daikin/JCI/Lennox/Mitsubishi/LG. Confirm the actual manufacturer training list.
- **`planned-maintenance`, `emergency`, `project-support`** adapted from Starnes — `whyEyebrow` updated to "Why CTC," Lebanon/Southwest VA references replaced with Charlotte/Carolinas. Should still be reviewed for CTC-specific tone.
- Service titles in the main `config.json` list "Commercial HVAC & Controls" (vs. Starnes's "Commercial HVAC") to signal the controls scope.

### Geographic claims
- Hero / footer copy uses "North and South Carolina." Confirm specific metros / counties if more granular targeting is wanted (Charlotte metro, Triangle, Triad, Upstate SC, etc.).
- Industries grid (the honeycomb) carries the shared 19-industry list — confirm CTC actually serves all of these. If not, swap a few hex labels.

### Building automation as a standalone page?
Decided **not** to make Building Automation its own service page (per the "Starnes list minus Residential" decision). It's surfaced via the hero, partner strip, commercial-hvac page lede, and the technicalExperience list. **Consider adding** `services/building-automation.html` as a 5th service page if BAS is the lead revenue driver and deserves its own SEO target.

### Honeywell partnership
The legacy site headlines this. We surface it in 4 places (see above). If CTC has additional manufacturer partnerships (JCI, Schneider, Distech, etc.) worth surfacing, the `partners` object could expand to a list — would require a small template change.

---

## 🎨 Polish

- **CTC favicon** wired via `<link rel="icon" type="image/svg+xml" href="shared/img/logos/ctc-favicon.svg" />` in both templates.
- **Privacy + Terms pages** — currently `href="#"` placeholders in the footer.
- **LinkedIn link** wired to `https://www.linkedin.com/company/charlotte-temperature-controls`.
- **Sitemap.xml + robots.txt** — see below.

---

## 📦 When ready to push to GitHub

Empty repo is already created at https://github.com/adamhostetter/ctc-website. Same flow as Starnes / STR:

```powershell
cd "CTC"
git init
git add .
git commit -m "Initial commit: Charlotte Temperature Controls site (1 location + 4 services)"
git remote add origin https://github.com/adamhostetter/ctc-website.git
git branch -M main
git push -u origin main
```

Then GitHub Pages: Settings → Pages → Deploy from branch `main` / root.

`.gitignore` already excludes `reference/`, `node_modules/`, OS junk. The build output (`index.html`, `services/*.html`) is committed.
