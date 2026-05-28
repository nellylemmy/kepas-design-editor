# KEPAS Design Editor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![CI](https://github.com/nellylemmy/kepas-design-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/nellylemmy/kepas-design-editor/actions/workflows/ci.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Made in Kenya](https://img.shields.io/badge/made%20in-Kenya-006B3F.svg)](https://kepas.co.ke)
[![Good first issues](https://img.shields.io/github/issues/nellylemmy/kepas-design-editor/good%20first%20issue?color=7057ff&label=good%20first%20issues)](https://github.com/nellylemmy/kepas-design-editor/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

> Drag-and-drop design editor for certificates, receipts, and invoices. Powered by Fabric.js with built-in Kenya-ready templates (KRA PIN + M-Pesa fields on invoices). Export as PNG, JPG, or PDF. Self-hostable. Built by [KEPAS Technologies](https://kepas.co.ke).

Live at **[kepas.co.ke/tools/design-editor](https://kepas.co.ke/tools/design-editor)**.

> **Looking for contributors.** This project exists to help Kenyan SMEs, schools, training programs, churches, and NGOs. If you can design templates, write JavaScript, or write documentation, see [CONTRIBUTING.md](./CONTRIBUTING.md) and pick a [good first issue](https://github.com/nellylemmy/kepas-design-editor/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

## What it does

- **Three document types** — certificates, receipts, invoices.
- **Drag-and-drop canvas** — text, shapes, images, signature fields.
- **Built-in templates** — Kenya-ready invoice templates with KRA PIN and M-Pesa fields, plus generic certificate and receipt layouts.
- **Shareable links** — every design gets a `share_code`; share like a Google Doc.
- **Export** — PNG, JPG, or PDF, all from the browser.
- **No sign-up, no tracking, no ads.**

## Stack

| Layer | Tech |
| --- | --- |
| Backend | Node.js · Express · Nunjucks templating |
| Storage | PostgreSQL · `design_documents` table (JSONB Fabric.js scene + base64 thumbnail) |
| Frontend | Vanilla HTML/CSS/JS · Fabric.js v6 (CDN) · jsPDF (CDN) — no build step |
| Deploy | Docker Compose (one-command setup) |

## Quick start

```bash
git clone https://github.com/nellylemmy/kepas-design-editor.git
cd kepas-design-editor

cp .env.example .env
docker compose up
```

Browse to `http://localhost:4200/design-editor`. Migrations run automatically on first boot.

## API

The Express server exposes five endpoints under `/api/designs`:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/designs` | Create a new design. Returns `{ shareCode }`. |
| GET | `/api/designs/:shareCode` | Load a saved design. |
| PUT | `/api/designs/:shareCode` | Update an existing design. |
| POST | `/api/designs/:shareCode` | Same as PUT, for `navigator.sendBeacon()` on tab close. |
| DELETE | `/api/designs/:shareCode` | Delete the design. |

When deployed behind a reverse proxy at a sub-path (KEPAS serves it at
`/tools/design-editor`), set `BASE_PATH`, `API_PATH`, and
`TEMPLATES_PATH` in the environment so rendered HTML emits correct URLs.

## Schema

```sql
CREATE TABLE design_documents (
    id             SERIAL PRIMARY KEY,
    share_code     VARCHAR(12) UNIQUE NOT NULL,
    document_type  VARCHAR(20) NOT NULL DEFAULT 'certificate',
    document_name  VARCHAR(255) NOT NULL DEFAULT 'Untitled Design',
    design_data    JSONB NOT NULL DEFAULT '{}',
    thumbnail_data TEXT,
    created_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

`document_type` is one of `certificate`, `receipt`, `invoice`, `custom`.

## Bundled templates

`public/templates/design-editor/` ships with:

- **manifest.json** — index of available templates
- **certificates/** — generic certificate layouts
- **receipts/** — receipt templates
- **invoices/** — Kenya-ready invoice templates (KRA PIN, M-Pesa fields)

The editor loads these at startup so new users see ready-to-use designs.

## Contributing

We welcome contributions from designers, developers, and writers — at every experience level. The easiest way in is adding a new template (no code required). See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

- Found a bug? Open a [bug report](https://github.com/nellylemmy/kepas-design-editor/issues/new?template=bug_report.yml).
- Have an idea? Open a [feature request](https://github.com/nellylemmy/kepas-design-editor/issues/new?template=feature_request.yml).
- Want to contribute a template? Use the [template proposal](https://github.com/nellylemmy/kepas-design-editor/issues/new?template=template_contribution.yml).
- Just want to chat? Drop into [Discussions](https://github.com/nellylemmy/kepas-design-editor/discussions).

All participants in this project are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

Security issues should be reported privately per [SECURITY.md](./SECURITY.md).

## License

MIT — see [LICENSE](./LICENSE).

## Author

Built by **Nelson Lemein** at [KEPAS Technologies](https://kepas.co.ke), Nairobi, Kenya.
