# RLS Governance Demo

An interactive static web app that demonstrates how row-level security (RLS) and governed data structure change what different users can see in reporting.

The demo lets viewers switch between personas, toggle RLS, reveal blocked records, and inspect the policy decisions behind each row.

## What It Shows

- How the same report changes for different roles and entitlements
- How region, data domain, and sensitivity policies filter report rows
- How masking protects sensitive values while preserving approved context
- How a governed data model creates auditable allow, deny, and mask decisions

## Run Locally

This app has no frontend build step and no external dependencies.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a browser.

## Validate

GitHub Actions uses a small Node script to confirm the static site has the required files and demo hooks.

```bash
npm test
```

## GitHub Pages Deployment

The included workflow at `.github/workflows/pages.yml` validates the static site and deploys it to GitHub Pages on pushes to `main`.

To use it:

1. Push this repository to GitHub.
2. In GitHub, go to **Settings > Pages**.
3. Set the source to **GitHub Actions**.
4. Push to the `main` branch or run the workflow manually.

## Files

- `index.html` contains the app structure.
- `styles.css` contains the responsive UI styling.
- `app.js` contains the sample personas, governed data rows, RLS policies, and interactions.
- `scripts/validate-site.mjs` performs lightweight CI validation.
