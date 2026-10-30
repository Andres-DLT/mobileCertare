# Certare

Certare is a public service catalog and discovery intake with an allowlisted
member portal, built with Angular 19, Capacitor 7 and Firebase.

Live demo: <https://certare.web.app>

## What's in it

- A public catalog of 60 services across five practices at `/products/list`,
  with search, filters by practice and a page for each service. You don't need
  an account to browse.
- A discovery form at `/agency/schedule`. Requests are saved in Firestore and
  visitors can't read them back.
- A member area at `/sales/history` where approved accounts see their own
  requests. An admin approves accounts through an allowlist.
- Three articles under Insights.
- An Android build: Capacitor wraps the same web app into a debug APK. It's not
  on the Play Store yet.

## Turned off for now

- Payments. `paymentsEnabled` is `false` and the PayPal client ID is empty, so
  there's no checkout.
- Booking and email notifications. The form only saves the request; it doesn't
  send an email or book a meeting (`scheduleUrl` is empty).
- `sendOrderEmail` in `functions/` rejects every call. The old deployed version
  stays live until functions are deployed again, but nothing on the site calls
  it.
- Sign-up. `/auth/register` redirects to login. Someone could still create an
  account directly through the Firebase Auth API, but without being on the
  allowlist they can't see any private data. More in
  [docs/SECURITY.md](docs/SECURITY.md).

## Stack and boundaries

- **Frontend.** Angular 19 standalone components with lazy-loaded feature
  areas (`auth`, `products`, `sales`, `agency`). Capacitor 7 wraps the same
  build for Android.
- **Data.** Firestore. The rules are in `firestore.rules`: the catalog and the
  articles are public and read-only, `discovery-requests` takes a limited write
  from visitors and can't be read without signing in, and
  `access-allowlist/{uid}` can only be read by its owner and written by an admin.
- **Backend.** Cloud Functions in `functions/` (Node 22). The public site
  doesn't call them right now.
- **Hosting.** Firebase Hosting, with the security headers in `firebase.json`.

## Running it locally

Use Node 22.

```bash
git clone https://github.com/Andres-DLT/mobileCertare.git
cd mobileCertare
npm ci
npm ci --prefix functions
```

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server (`ng serve`) |
| `npm run build` | Production web build |
| `npm run test:ci` | Angular unit tests: watch off, ChromeHeadless, coverage |
| `npm run test:tools` | Environment-generator regression test (`node --test`) |
| `npm --prefix functions run test:ci` | Functions Jest with coverage |
| `npm --prefix functions run verify` | Functions test suite, then the TypeScript build |
| `npm run verify` | Root unit tests, tools test and web build, plus Functions verify |
| `npm run android:sync` | Rebuild web assets and sync them into the Android wrapper |

On Windows, Karma needs `CHROME_BIN` pointing to Chrome or Chromium. The CI
runners already have Chrome.

Pushing to the repo doesn't deploy the functions; that's a separate step (see
[docs/DEPLOY.md](docs/DEPLOY.md)).

## Docs

| Doc | Contents |
| --- | --- |
| [docs/PROJECT.md](docs/PROJECT.md) | Routes, visitor flow, data model and collections |
| [docs/TESTING.md](docs/TESTING.md) | Verification suites, CI design, and what is and isn't covered |
| [docs/SECURITY.md](docs/SECURITY.md) | Threat model, current controls, known risks |
| [docs/QUALITY.md](docs/QUALITY.md) | Code standards and the maintenance backlog |
| [docs/BRAND.md](docs/BRAND.md) | Logo assets and brand rules |
| [docs/DOMAIN.md](docs/DOMAIN.md) | Connecting a paid domain |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Production deployment runbook (operator only) |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Release history |

## Security

If you find a vulnerability, please report it privately through GitHub's
security reporting for this repo instead of opening an issue.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). There's no license yet.
