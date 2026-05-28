# Security Policy

## Supported Versions

The project is still pre-1.0. Security fixes are applied to the `master` branch only. Self-hosters should track the latest tag.

## Reporting a Vulnerability

**Do not open a public GitHub issue for security problems.**

Email security reports to **`nelsonlemmy61@gmail.com`** with:

- A description of the issue
- Steps to reproduce
- Affected version / commit SHA
- Impact assessment (data exposure, RCE, XSS, etc.)
- Your name + contact for the credit line (or "anonymous" if you prefer)

You will receive an acknowledgement within 72 hours. Triage and fix timelines depend on severity:

| Severity | Initial response | Fix target |
| --- | --- | --- |
| Critical (RCE, auth bypass, data leak) | 24 hours | 7 days |
| High (privilege escalation, XSS with impact) | 72 hours | 14 days |
| Medium (CSRF, info disclosure) | 7 days | 30 days |
| Low (defence-in-depth, headers, hardening) | 14 days | best effort |

## Scope

In scope:
- `kepas-design-editor` server code (Express, controllers, DB layer)
- The single-file editor HTML and its handling of user-supplied data
- The bundled templates and the `/templates/design-editor/*` static serving path
- Docker / docker-compose configuration

Out of scope:
- Vulnerabilities in third-party CDN libraries (Fabric.js, jsPDF) — report upstream
- The live production site at `kepas.co.ke` (report through KEPAS Technologies channels)
- DoS / volumetric attacks
- Social engineering of contributors or maintainers

## Safe Harbour

Good-faith security research that follows this policy will not result in legal action. Maintainers will work with researchers to acknowledge fixes and credit reporters in release notes.
