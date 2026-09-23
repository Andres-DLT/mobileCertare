# SECURITY — Certare

Threat model: public catalog and public intake of contact details, with
member-only account access. Checkout and order processing are disabled.

## Current controls

- **Firestore rules** (`firestore.rules`): the five catalog collections and
  published insights are public read-only. `discovery-requests` accepts a
  bounded new record from visitors; unauthenticated reads are denied. Only an
  allowlisted member may read their own signed-in requests. Clients cannot
  edit/delete requests or assign a status beyond `new`. Unlisted data remains
  inaccessible to public clients.
- **Auth**: Firebase Authentication (email/password) plus Admin-provisioned
  `access-allowlist/{uid}`. Client sign-in and restored sessions check this
  record before enabling private UI. Firestore rules restrict reads of private
  request history to allowlisted owners. The two pre-existing accounts were
  provisioned with `scripts/allow-private-accounts.js` after verifying their
  UIDs exist. Members still use the "remember me" choice.
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
| 3 | Public form without App Check / server-side rate limiting | **Open.** Client honeypot and 60-second local throttle only deter basic bots. Add App Check enforcement and a server-managed quota before promoting the form widely; monitor the `discovery-requests` collection and disable public `create` if abused. |
| 4 | Auth authorized domains | Verify `certare.web.app` is listed (Authentication → Settings → Authorized domains). Add the paid domain on purchase or login breaks there. |
| 5 | Firebase web `apiKey` visible in `environment.ts` | Expected for web clients. Restrict the key by HTTP referrer in Google Cloud Console and enforce App Check later. |
| 6 | `npm audit --omit=dev`: 17 findings (9 moderate, 6 high, 2 critical, mostly transitive) | Open. Tracked separately; major upgrades (Angular 19→22) are a dedicated release, not mixed into feature work. |
| 7 | Android release hygiene (signing, minify, permissions) | Open until Play Store track. Debug builds only for now. |
| 8 | Firebase Auth email/password provider still accepts direct sign-up API calls | UI registration and private access are closed, **but this is not an identity-provider-level sign-up ban**. Current project config has email/password enabled and no blocking functions; disabling email/password also breaks existing login. A beforeCreate blocking function (Identity Platform + enabled Functions/billing) or an equivalent authentication broker is needed to reject account creation itself. Newly created UIDs cannot read member-only data without Admin allowlisting. |
| 9 | Discovery requests are not automatically emailed to an operator | Review Firestore `discovery-requests` in the Firebase console; no response-time promise is displayed. Add a server-side notification when Cloud Functions are available. |

## Rules for contributors

- Never commit secrets (`.env`, `serviceAccountKey.json`, `functions/.env` are git-ignored — keep them so).
- New collections ship deny-by-default. Public writes require allowlisted fields, types and length bounds; no public readback of messages.
- Mark demo/placeholder content with `data-placeholder` and list it in the verification doc; never present it as customer proof.
