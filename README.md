# RLS Governance Demo

An interactive static web app that demonstrates how row-level security (RLS) and governed data structure change what different users can see across operational and commercial analytics reporting.

The demo lets viewers switch between business scenarios, personas, and reporting lenses; toggle RLS; reveal blocked records; and inspect the policy decisions behind each row.

The first screen now includes a Parallax-branded guided demo path so a presenter can run the story directly from the page:

1. Choose a scoped viewer.
2. Toggle RLS off to reveal the unrestricted comparison.
3. Switch reporting lenses to show policy reuse.
4. Open Access audit to explain the allow, deny, and mask decisions.

## What It Shows

- How the same site data changes for different roles and entitlements
- How site, data domain, and sensitivity policies filter report rows
- How operational analytics can be the featured use case while commercial analytics shows the same RLS pattern outside operations
- How leading indicators and predictive analytics can be shared without opening every row
- How one governed report can replace many one-off dashboards for different audiences
- How masking protects sensitive values while preserving approved context
- How a governed data model creates auditable allow, deny, and mask decisions
- How empty states explain when every row is blocked for a viewer instead of leaving a blank report

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

The included workflow at `.github/workflows/pages.yml` validates the static site and deploys it to GitHub Pages on pushes to `main` or `master`.

To use it:

1. Push this repository to GitHub.
2. In GitHub, go to **Settings > Pages**.
3. Set the source to **GitHub Actions**.
4. Push to the `main` or `master` branch, or run the workflow manually.

## Files

- `index.html` contains the app structure.
- `styles.css` contains the responsive UI styling.
- `app.js` contains the sample personas, governed data rows, RLS policies, and interactions.
- `scripts/validate-site.mjs` performs lightweight CI validation.
