# Certare

Certare is a public service catalog and discovery intake with an allowlisted
member portal, built with Angular 19, Capacitor 7 and Firebase.

Live demo: <https://certare.web.app>

## What ships

- **Public catalog.** 60 services across five practices at `/products/list`,
  with search, practice filters and per-service detail pages. No account
  needed to browse.
- **Discovery intake.** `/agency/schedule` collects a discovery request from
  visitors. Submissions are stored privately in Firestore; guests cannot read
  them back, and only an allowlisted member can see their own history.
- **Member portal.** Existing, admin-allowlisted accounts can sign in and view
  their own request history at `/sales/history`.
- **Insights.** Three published articles with their existing attribution.
- **Android wrapper.** Capacitor 7 wraps the same web build for debug APKs.
  A Play Store release is a separate, not-yet-done task.

## Intentionally disabled

- **Checkout and payments.** The committed configuration sets
  `paymentsEnabled: false` with an empty PayPal client ID, and this repo's
  public flow has checkout and order processing disabled.
- **Automatic booking and notifications.** In this repo's configured public
  flow, the form records a discovery request only: it does not email the
  operator or book a calendar slot. The Google Appointment Schedules link
  (`scheduleUrl`) is empty in the environment configuration, and the intake
  path implemented here wires no operator notification.
- **Legacy order email.** The `sendOrderEmail` callable remains in `functions/`
  for the legacy checkout path. Checkout is disabled in the app configuration,
  so the current public catalog and discovery intake do not invoke it.
- **Self-service registration.** `/auth/register` redirects to login. The
  Firebase email/password API can still create an Auth record directly, but
  the `access-allowlist` keeps such accounts out of private data. See
  [docs/SECURITY.md](docs/SECURITY.md) for the distinction and the open
  server-side follow-up.

## Stack and boundaries

- **Frontend.** Angular 19 standalone components with lazy-loaded feature
  areas (`auth`, `products`, `sales`, `agency`). Capacitor 7 wraps the same
  build for Android.
- **Data.** Firestore, with access controlled by the committed rules in
  `firestore.rules`: the five catalog collections and published insights are
  public read-only; `discovery-requests` accepts a bounded write from visitors
  and denies unauthenticated reads; `access-allowlist/{uid}` is read-own,
  Admin-write, and gates member access.
- **Backend.** Cloud Functions live in `functions/` with a Node 18 deployment
  engine, a documented legacy limitation. Functions are not part of the public
  request path today.
- **Hosting.** Firebase Hosting serves the single-page app with security
  headers configured in `firebase.json`.

## Setup from a clean clone

The quality runtime target is Node 22.23.4.

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

Browser note: on Windows, Karma needs `CHROME_BIN` pointing at an installed
Chromium or Chrome. CI runners use their preinstalled Chrome.

Node note: quality tests and builds run on Node 22. The Functions deployment
engine stays on Node 18; testing on 22 does not migrate or deploy the backend.

## Documentation

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
| [docs/VERIFICATION-2026-09-21.md](docs/VERIFICATION-2026-09-21.md) | Dated verification record (historical) |
| [docs/UX-RELEASE-2026-09-23.md](docs/UX-RELEASE-2026-09-23.md) | Public release verification record (historical) |

The two verification records describe what was checked on those dates. They
are historical evidence, not a claim about the current branch.

## Security reporting

Please report vulnerabilities privately through GitHub's security reporting
for this repository instead of opening a public issue. No personal contact
address is published for this purpose.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch and pull request workflow,
the verification expected before a PR, and the rule that documentation or test
changes must never cause unrequested production operations.

No license has been chosen yet; do not add one without the owner's decision.
