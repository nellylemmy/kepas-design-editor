# Contributing to KEPAS Design Editor

Thanks for your interest. This project exists to give Kenyan SMEs, schools, training programs, churches, and NGOs a free drag-and-drop tool for certificates, receipts, and invoices. Every contribution helps real people.

There are **two ways to contribute** — pick whichever fits.

---

## 1. Contribute a template (no coding required)

This is the easiest way in. If you can design in Canva or Figma, you can contribute here.

Templates are plain JSON files under `public/templates/design-editor/`. Each template is one Fabric.js scene with text, shapes, and image placeholders.

**Steps:**

1. Fork this repo.
2. Open the editor locally (`docker compose up`) at `http://localhost:4200/design-editor`.
3. Build your template in the editor — name fields clearly (`{{recipient_name}}`, `{{date}}`, etc. for variable spots).
4. Save it, then copy the JSON from the share link's API response — or use the **Export Template** button.
5. Add the file to the right folder:
   - `public/templates/design-editor/certificates/<your-template>.json`
   - `public/templates/design-editor/receipts/<your-template>.json`
   - `public/templates/design-editor/invoices/<your-template>.json`
6. Register it in `public/templates/design-editor/manifest.json`.
7. Open a PR with a screenshot in the description.

**What we want most:**
- Kenya-relevant invoices (KRA PIN field, M-Pesa till + paybill placeholders, VAT line)
- Certificate templates with Maasai / Kikuyu / Luo / Kalenjin colour palettes
- Training-completion certificates for tech bootcamps and vocational schools
- Receipt formats for small kiosks, salons, matatu SACCOs
- Wedding / harambee / dowry templates

Designers without a GitHub account: open a [Discussion](https://github.com/nellylemmy/kepas-design-editor/discussions) and attach the JSON — a maintainer will land the PR for you.

---

## 2. Contribute code

Standard open-source flow: fork, branch, PR.

### Setup

```bash
git clone https://github.com/<your-username>/kepas-design-editor.git
cd kepas-design-editor
cp .env.example .env
docker compose up --build
```

Editor at `http://localhost:4200/design-editor`. Migrations run automatically.

### Project shape

```
src/
├── index.js                Express + Nunjucks bootstrap
├── config/database.js      pg Pool
├── controllers/            Request handlers
└── routes/api.js           REST endpoints
templates/
└── design-editor.html      Single-file SPA editor (Fabric.js + jsPDF)
public/templates/
└── design-editor/          JSON templates (the contribution surface)
migrations/                  SQL migrations, applied via `_migrations` table
```

The frontend is **one HTML file with no build step**. Edit, refresh, done.

### Code style

- ES modules (`import` / `export`), Node 20+.
- 2-space indent, single quotes, semicolons (matches the existing files).
- Keep dependencies minimal — every new package is a maintenance cost.

### Pull request checklist

- [ ] Issue linked (or new issue opened first if the change is non-trivial)
- [ ] One topic per PR — don't bundle unrelated changes
- [ ] If you touched the editor, tested in Chrome + Firefox at desktop + mobile widths
- [ ] If you added a template, include a screenshot in the PR body
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `docs:`)

### Maintainer review SLA

We aim to triage every PR within 7 days. If yours has been quiet for longer, ping the thread.

---

## Good first issues

The [`good first issue`](https://github.com/nellylemmy/kepas-design-editor/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) label marks tasks suitable for new contributors. Pick one, comment "I'll take this", and go.

---

## Reporting bugs

Open an issue using the bug report template. Include:
- Browser + OS
- Steps to reproduce
- Expected vs actual behaviour
- Screenshot if visual

---

## Reporting security issues

Do **not** open a public issue. Email `nelsonlemmy61@gmail.com` instead. See [SECURITY.md](./SECURITY.md).

---

## Code of conduct

This project follows the [Contributor Covenant v2.1](./CODE_OF_CONDUCT.md). Be excellent to each other.

---

## License

By contributing, you agree your work is licensed under the [MIT License](./LICENSE) that covers the project.
