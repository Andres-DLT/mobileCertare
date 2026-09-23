# Certare — project overview

Certare is an Angular 19 + Capacitor 7 application backed by Firebase. The
public site introduces five connected practices and lets visitors browse the
catalog without an account. A separate, private member area serves existing
accounts. Checkout and PayPal remain disabled.

## Routes and visitor flow

- `/`: public editorial landing page with practices, delivery approach and
  links to discovery, catalog and published insights.
- `/products/list`: 60 services in a data-driven directory with search,
  practice filters and a native mobile filter dialog.
- `/products/:sector/:id`: individual service details (scope, documented
  deliverables when available, indicative price, related services and
  shortlist). Detail uses a single Firestore document read plus one related
  collection listener, not five catalog listeners.
- `/agency/about`, `/agency/mobile|web|testing|ai|training`: approach and
  practice pages. `/agency/insights/:id` is the reader for the three published
  articles; `/agency/schedule` accepts a public discovery request.
- `/sales/cart`: in-memory shortlist; signed-in existing members can see
  their requests at `/sales/history`.
- `/auth/login`: existing managed accounts only. `/auth/register` redirects
  to login; Firebase's email/password API can still create accounts directly,
  but the `access-allowlist` prevents those accounts from using private data.
  See `SECURITY.md` for the distinction and the server-side follow-up.

## Data model and collections

`src/app/collections/collection-config.ts` owns the five practice definitions:

| Firestore collection | Public documents | Role |
| --- | ---: | --- |
| `product-store` | 20 | Quality/testing services |
| `mobile-services` | 10 | Mobile lifecycle stages |
| `web-services` | 10 | Web lifecycle stages |
| `ai-services` | 10 | AI integration, evaluation and governance |
| `training-services` | 10 | Technical education and enablement |
| `insights` | 3 | Referenced industry reading |

`discovery-requests`: visitor-created, private-contact messages; optional
`uid` is included when an authorized member submits. Only Admin SDK can
change statuses. `access-allowlist/{uid}`: read-own, Admin-write membership
used by `AuthService` and Firestore security rules.

The catalog is loaded by `ProductService` and normalized to `CatalogItem`
(`sector + document ID` is the stable route; starting prices are indicative).
Client-side state handles search, filters and sort across the small catalog.

## Local commands

```powershell
npm ci
npm start
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
npm run android:sync
firebase deploy --only hosting,firestore --project smartfoodie-dda27 --non-interactive
```

`npm run android:sync` rebuilds Angular assets before copying them into the
native wrapper. Signing and publishing an Android release is a separate task.

## Decisions and operations

- `DESIGN-SYSTEM.md`: visual, UX, content and collection decisions.
- `SECURITY.md`: public form, membership, registration/API limitation and
  current risks.
- `DOMAIN.md` and `DEPLOY.md`: paid domain and Firebase Hosting operations.
- `BRAND.md`: current SVG mark and pending exports.
- `QUALITY.md`: code standards and maintenance backlog.
