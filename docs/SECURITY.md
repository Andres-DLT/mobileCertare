# SECURITY — Certare

Threat model: public catalog + authenticated requests. No payments, no
private customer data beyond account profile and discovery messages.

## Current controls

- **Firestore rules** (`firestore.rules`): `product-store` public read-only;
  `discovery-requests` create/read/update/delete restricted to the owning
  `request.auth.uid`, with field allow-listing and type checks on create;
  everything else denied.
- **Auth**: Firebase Authentication (email/password), `browserLocalPersistence`
  so sessions survive the Capacitor WebView. No privileged roles yet.
- **Hosting headers** (`firebase.json`): `nosniff`, strict referrer policy,
  `SAMEORIGIN` framing, restrictive `Permissions-Policy`.
- **Payments**: fully disabled (`paymentsEnabled: false`, empty
  `paypalClientId`); the PayPal SDK never loads.
- **Logs**: `console.*` only on error paths; no PII is logged.

## Known risks and actions

| # | Risk | Status / action |
|---|---|---|
| 1 | `serviceAccountKey.json` (Admin SDK) lives in the repo root | Ignored by git — correct. Rotate periodically; never attach or upload it. Use Secret Manager / ADC before deploying Functions. |
| 2 | Gmail app password in `functions/.env` | Ignored by git. Rotate when the paid domain lands; move to managed secrets before customer-facing emails. |
| 3 | No App Check / reCAPTCHA on public forms | Open. Enable App Check (free) plus reCAPTCHA Enterprise on Auth once `/agency/schedule` is public. |
| 4 | Auth authorized domains | Verify `certare.web.app` is listed (Authentication → Settings → Authorized domains). Add the paid domain on purchase or login breaks there. |
| 5 | Firebase web `apiKey` visible in `environment.ts` | Expected for web clients. Restrict the key by HTTP referrer in Google Cloud Console and enforce App Check later. |
| 6 | `npm audit --omit=dev`: 17 findings (9 moderate, 6 high, 2 critical, mostly transitive) | Open. Tracked separately; major upgrades (Angular 19→22) are a dedicated release, not mixed into feature work. |
| 7 | Android release hygiene (signing, minify, permissions) | Open until Play Store track. Debug builds only for now. |
| 8 | `discovery-requests` has no rate limiting | Acceptable at current volume; add per-uid quotas or App Check enforcement if abused. |

## Rules for contributors

- Never commit secrets (`.env`, `serviceAccountKey.json`, `functions/.env` are git-ignored — keep them so).
- New collections ship deny-by-default with owner-only access and field validation, like `discovery-requests`.
- Mark demo/placeholder content with `data-placeholder` and list it in the verification doc; never present it as customer proof.
