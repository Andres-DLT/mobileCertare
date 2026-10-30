# Testing: Certare verification guide

This document describes the verification suites, the agreed CI interfaces, and
the boundary between what these suites prove and what they don't.

## Verification layers

| Layer | Command | What it proves |
| --- | --- | --- |
| Angular unit tests | `npm run test:ci` | Karma, watch off, ChromeHeadless, coverage written under `coverage/` (Angular project subdirectory, e.g. `coverage/phone-developers/`) |
| Tools regression | `npm run test:tools` | `node --test tools/set-env.spec.cjs`: the environment generator preserves quoted and multiline `NG_APP_*` values |
| Functions unit tests | `npm --prefix functions run test:ci` | Jest with `--ci --runInBand --coverage` |
| Functions build | `npm --prefix functions run verify` | Runs the Functions test suite, then the `tsc` build |
| Full local gate | `npm run verify` | Root unit tests, tools test and web build, plus Functions verify |

Run `npm run verify` only after installing dependencies in both directories
(`npm ci` at the root and `npm ci --prefix functions`).

## Browser requirements

- **Windows:** set `CHROME_BIN` to an installed Chromium or Chrome before
  running the Karma suite.
- **CI:** runners use their preinstalled Chrome; no `CHROME_BIN` is needed.

## Node versions

- Quality tests and builds target Node 22.23.4.
- The Functions deployment engine is Node 22. Changing this declaration and
  running tests does not migrate or deploy the production backend.

## CI design (agreed interfaces)

- **Quality workflow.** Runs on pull requests without cloud secrets: Angular
  unit tests with coverage, the web build, Functions Jest with coverage and
  its TypeScript build, and the tools regression. It declares read-only
  repository permissions and pins actions to immutable commit references.
  Coverage is measured and kept as an artifact, not gated by an arbitrary
  threshold.
- **Opt-in previews.** A pull request preview deploys only when a maintainer
  applies the `deploy-preview` label to a same-repository pull request.
  Ordinary quality runs never touch Firebase.
- **Live deployment.** The main deployment workflow is separate and manually dispatched by a maintainer.

These are the agreed interfaces for this repository's quality CI. This
document describes the design; it does not claim results for any particular
run. For a specific pull request or revision, check that exact commit's
Actions runs and uploaded coverage artifacts on GitHub.

## What these suites do not cover

Unit tests and builds are not end-to-end, native, integration or deployment
evidence. The unit/build gates described here do not claim any of the
following:

- Browser end-to-end journeys
- Android APK builds on a device or emulator
- Integration tests against live Firebase services
- Firebase deployments or production smoke checks

## Safe test data

- Unit tests mock Firebase through the shared test providers in
  `src/app/testing/firebase-testing.ts`, so the unit gates run isolated from
  Firebase. Repository policy forbids running tests or scripts against the
  production Firebase project.
- Do not create test accounts, requests or documents in the live project.
- Mark demo or placeholder content with `data-placeholder` and never present
  it as customer proof.
- Never commit secrets: `.env`, `functions/.env` and `serviceAccountKey.json`
  stay git-ignored.
