# Public experience release — verification record

## Delivered structure

Guest: Home → practice or directory → service detail → shortlist or discovery
request. Guest submissions have no account and no public readback. Member:
same public journey plus owned request history after allowlist verification.

The public About page omits metrics, employee profiles and contact addresses
that have not been provided by the business. Insight detail pages show the
three previously published posts with their existing attribution. Prices are
indicative starting points; scope and final price are decided with the client.

## Operational facts and limitations

- Google Appointment Schedules link is not configured (`scheduleUrl` is
  currently empty): the site collects a discovery request, but cannot book a
  calendar time automatically until the operator supplies a link.
- Public intake has no Cloud Function notification (Functions API was
  disabled earlier). Review messages in Firebase Console → Firestore →
  `discovery-requests`; do not publish an SLA until a notification process
  is working.
- The new public create rule is field- and length-limited. Basic client-side
  honeypot/throttle is not server-side rate limiting; see `SECURITY.md`.
- Two existing accounts are allowlisted. A direct Firebase REST signup can
  still create a Firebase Auth record, but cannot enter private UI/data.
- SEO metadata on Angular routes is client-side; SSR or prerender is needed
  for crawlers that do not execute JavaScript.
- Native Android content changes require `npm run android:sync`, rebuilding
  and reinstalling the APK. The Play Store is not updated by Hosting deploys.

## Verified before the production release

- 56/56 Angular unit tests pass; application and spec TypeScript checks pass.
- Debug Android APK builds and installs on Pixel_10_Pro emulator. Its WebView
  navigates the public home, 60 services, filter sheet, service detail,
  About and discovery page without JavaScript errors.
- Chrome journeys at 1440, 820 and 412px pass with no horizontal page
  overflow: practices (20/10/10/10/10), filters, Escape-to-close sheet,
  service detail, shortlist and public contact page.
- Real Firestore checks: guests can create a bounded request but cannot read
  it or submit invalid data; existing members can read their own allowlist
  entry, never another member's; temporary test requests were deleted.
- A signed-in, previously existing account navigates the private request
  history; no test accounts or production credentials were created.
