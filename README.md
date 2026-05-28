# KEPAS Design Editor

> Drag-and-drop design editor for certificates, receipts, and invoices. Powered by Fabric.js with built-in Kenya-ready templates (KRA PIN + M-Pesa fields on invoices). Export as PNG, JPG, or PDF. Self-hostable. Built by [KEPAS Technologies](https://kepas.co.ke).

Live at **[kepas.co.ke/tools/design-editor](https://kepas.co.ke/tools/design-editor)**.

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

## License

MIT — see [LICENSE](./LICENSE).

## Author

Built by **Nelson Lemein** at [KEPAS Technologies](https://kepas.co.ke), Nairobi, Kenya.
