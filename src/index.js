import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import apiRouter from './routes/api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const app = express();

// Behind the kepas.co.ke nginx proxy this serves at `/tools/design-editor`.
// For standalone runs everything sits at the root. Templates pick up the
// values through Nunjucks so the front-end fetch() calls resolve in
// both modes.
const BASE_PATH      = process.env.BASE_PATH      || '';
const API_PATH       = process.env.API_PATH       || '/api/designs';
const TEMPLATES_PATH = process.env.TEMPLATES_PATH || '/templates/design-editor';

nunjucks.configure(join(ROOT, 'templates'), { autoescape: false, express: app });
app.set('view engine', 'html');

// Design Editor's drag-and-drop library loads template JSON at runtime —
// served straight from public/.
app.use('/templates', express.static(join(ROOT, 'public', 'templates')));

app.use('/api/designs',
  bodyParser.json({ limit: '20mb' }),
  bodyParser.urlencoded({ extended: true, limit: '20mb' }),
  apiRouter,
);

const renderDesign = (req, res) => {
  res.render('design-editor.html', {
    pageTitle: 'Free Design Editor — Certificates, Receipts & Invoices',
    metaDescription: 'Create certificates, receipts, and invoices with a drag-and-drop editor. Export as PNG, JPG, or PDF — free.',
    canonicalPath: `${BASE_PATH || '/design-editor'}`,
    apiBase: API_PATH,
    templatesBase: TEMPLATES_PATH,
    shareCode: req.params.shareCode || null,
  });
};

app.get('/design-editor',               renderDesign);
app.get('/design-editor/:shareCode',    renderDesign);
app.get('/',                            (req, res) => res.redirect('/design-editor'));

app.get('/healthz', (req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4200;
app.listen(PORT, () => {
  console.log(`kepas-design-editor listening on :${PORT}`);
});
