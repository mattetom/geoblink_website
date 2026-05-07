# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing site for **GeoCam**, a geofencing companion app for Blink home security cameras (iOS + Android). The site is plain HTML/CSS/JS — no build step, no package manager, no framework. It is deployed via **GitHub Pages** at `geocam.matteotomasini.com` (see `CNAME`, `.nojekyll`, and the `Sitemap` in `robots.txt`).

`firebase-debug.log` at the root is incidental output from an unrelated `firebase` CLI invocation; the site itself does not use Firebase. Do not commit this file (it is not currently in `.gitignore`, but should not be added to deploys).

## Working on the site

- **Preview locally**: open the HTML files directly in a browser, or run `python3 -m http.server` from the repo root and visit `http://localhost:8000`. There is no build, lint, or test command — there is nothing to run.
- **Deploy**: pushing to `main` publishes via GitHub Pages. There is no CI config in the repo.
- **Cache-bust assets**: `assets/css/main.css` and `assets/js/main.js` have no fingerprint. After visual changes, hard-reload in the browser to confirm.

## Page architecture

Every top-level `.html` is a standalone page with a duplicated header/footer — there are no includes or templating. Pages share the same chrome by **copy-paste**, so when you change navigation, footer, meta-tag conventions, or shared scripts, you must update **every** HTML file.

Pages currently in the set:
- `index.html` — home (hero, features, tracking, download, FAQ, etc.)
- `privacy.html`, `terms.html`, `data-handling.html` — legal / trust pages
- `geocam-vs-{ifttt,home-assistant,alexa,blink-schedules}-blink.html` — SEO comparison pages
- `sitemap.xml`, `robots.txt` — search engine surfaces

When you add a new page:
1. Add a `<url>` entry to `sitemap.xml`.
2. Add the link to the navbar and footer in **all** other HTML files (the comparison submenu lives under a `.has-submenu` `<li>`).
3. Include `<link rel="canonical">` and OG/Twitter meta tags following the pattern in `index.html`.
4. Reuse the same four CSS includes in this order: `bootstrap-5.0.0-alpha-2.min.css`, `LineIcons.2.0.css`, `animate.css`, `main.css`.

## Asset and styling conventions

- **CSS**: vendor stylesheets in `assets/css/` are pinned and untouched (Bootstrap 5 alpha 2, LineIcons 2.0, animate.css). Author all custom styling in `assets/css/main.css`. Per-page overrides go in inline `<style>` blocks at the top of that page (see comparison pages for the pattern).
- **JS**: `assets/js/main.js` is the only authored script. It is wrapped in a single IIFE and runs unconditionally on every page. It expects specific DOM hooks: `.preloader`, `.navbar-area`, `.scroll-top`, `.page-scroll` (for smooth-scroll anchors), `.navbar-toggler` + `.navbar-collapse`, `.has-submenu`/`.compare-toggle`/`.sub-nav-toggler` (for the Compare dropdown), and optionally `.testimonial-active`. Removing these classes from a page will break navigation behavior site-wide.
- **Tiny slider** is referenced (`new tns(...)`) but the `tns` library is **not** included in any page — the slider block is guarded by an element-existence check, so it silently no-ops. If you need testimonial sliders, add the library script.
- **Animations**: `wow.js` + `animate.css` drive `data-wow-delay` reveals. New sections should follow the same `wow fadeInUp` + `data-wow-delay=".Ns"` pattern.
- **Icons**: use `<i class="lni lni-..."></i>` from LineIcons.
- **Brand palette** (from `main.css`): primary text `#1D2A5D`, body `#5E678C`, accent/teal `#22A0AB` (hover) / `#19b7aa` (icons in comparison cards), card border `#d8e2ff` on `#f4f8ff → #f8fffc` gradient.

## SEO conventions

Each page carries: a `<title>`, `<meta description>`, `<meta keywords>`, `<link rel="canonical">`, full Open Graph + Twitter card tags, and one or more `application/ld+json` blocks (typically `FAQPage`, plus `BreadcrumbList` on comparison pages, and `SoftwareApplication` on `index.html`). When editing copy, keep these aligned — search engines rely on them and the comparison pages were specifically built for SEO.

## Git / commit style

Recent history uses Conventional Commits (`feat:`, `fix:`, `chore:`). Match that format. The site is published from `main`, so commit messages effectively double as release notes.
