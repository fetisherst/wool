# AGENTS.md

## What this is

A collection of sign-in / task-running JavaScript scripts (青龙/qinglong-style "薅羊毛" scripts) plus SillyGirl (傻妞) bot plugin files. No build system, no tests, no linting — scripts run under Node.js (CommonJS `require`) on a schedule, typically inside the qinglong panel.

## Layout

- `scripts/` — one self-contained JS task script per app/activity (e.g. `ahy.js`, `lc.js`). Each starts with a header comment naming the app, its credential env variable (e.g. `ahyck`), the credential format (`phone#password`), and multi-account separator (`@`).
- `scripts/sendNotify.js`, `scripts/notify.py` — shared push-notification helpers (lxk0301/whyour qinglong versions). Don't rewrite; scripts `require("sendNotify")`.
- `scripts/env.json` — exported environment variables (cookies/tokens). Contains real credentials; never commit new values, never log/print its contents.
- `scripts/package.json` — deps used by sendNotify (`got`, `tough-cookie`, `ws`, `nodemailer`). Individual task scripts may `require` more (`request`, `crypto-js`, `node-rsa`) that are NOT declared here — they exist only in the qinglong runtime; don't try to `npm install && node script.js` locally without adding them.

## Conventions / gotchas

- Many scripts are still partially obfuscated (`_0x...` variable names). When editing, preserve behavior; when deobfuscating, output replaces the original at the same path — do NOT keep `*.deobf.js` copies in `scripts/`.
- Script header block (`NAME`, `VALY`, cron hints) is metadata read by the panel — keep it accurate when touching a script.
- Multi-account logic: env value split by `@`, account fields split by `#` or `&` — keep that parsing intact.
- README.md is a stub; this file is the real documentation.

## Maintenance

When directory layout, script conventions, dependencies, or other facts documented here change, update this file in the same change.
