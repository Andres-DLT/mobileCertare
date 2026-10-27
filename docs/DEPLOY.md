# Deploy — Certare

Production operations are performed by a maintainer after Quality passes for the intended commit. A merge does not deploy automatically. The Hosting workflow is manually dispatched on `main` and builds that revision. Verify the commit, environment and rollback plan before running it.

The Firebase project is `smartfoodie-dda27`, with Hosting site `certare` (`https://certare.web.app`). The legacy `smartfoodie-dda27.web.app` site is disabled. Never use production as a test fixture.

## Hosting

1. Confirm the intended `main` commit passed Quality and the correct build configuration is present.
2. Run **Deploy to Firebase Hosting** with `main` selected. Check the action result and the Hosting release history.
3. Open `https://certare.web.app`, browse the catalog and check the public contact flow without submitting fake production requests. Check a member account only when authorized.
4. If the action reports `serviceusage.services.get` denied, a project administrator must review the deployment identity and grant an appropriate least-privilege role before retrying.

## Firestore and Functions

Hosting deployment does not deploy Firestore rules, indexes or Cloud Functions. These require a separate reviewed operator action. The repository's `sendOrderEmail` handler rejects all requests; this only takes effect in Firebase after a Functions deployment. Inventory the currently deployed function and its callers before taking action. Do not enable checkout until payment verification, authorization and idempotency exist on the server.

The member history query requires the composite index in `firestore.indexes.json`. Test rules and indexes with a non-production Firebase project or emulator before an approved deployment. Do not run catalog seed scripts against production without a backup and explicit review; some scripts overwrite data.

## Android

The native `android/` project is ignored by Git. On a clean clone install the required Android SDK and Java, run `npx cap add android` once, then `npm run android:sync`. Preserve any native customizations and signing configuration separately. Test a debug build before planning a signed release.

## Rollback

Use Firebase Hosting release history to restore a verified previous release. Review Firestore and Functions independently; rolling back Hosting alone does not revert data, rules, indexes or Functions.
