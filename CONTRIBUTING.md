# Contributing to Certare

Thanks for helping improve Certare. This document covers how to work in the
repository, what verification is expected, and the boundaries that keep
documentation and test changes from causing unrequested production side
effects.

## Ground rules

- **Branches and pull requests.** Work on a branch and open a pull request.
  Don't push directly to `main`; merging is a maintainer decision.
- **No unrequested production side effects.** A documentation or test change
  must never trigger a production deployment. The one explicit exception is a
  maintainer opt-in preview: a maintainer applies the `deploy-preview` label
  to a same-repository pull request. Ordinary quality runs need no cloud
  credentials and never touch Firebase. The live deployment workflow on `main` is manually dispatched and stays a
  maintainer operation.
- **No secrets in git.** `.env`, `functions/.env` and `serviceAccountKey.json`
  are git-ignored. Keep them that way, and never paste credentials into
  issues, PRs or logs.
- **Safe test data.** Use clearly fake values in examples and fixtures. Don't
  create accounts or documents in the production Firebase project. Mark demo
  or placeholder content with `data-placeholder` and never present it as
  customer proof.
- **Private vulnerability reporting.** Report security issues through GitHub's
  security reporting for this repository, not in a public issue. No personal
  contact address is published for this purpose.

## Setup

The quality runtime target is Node 22.23.4.

```bash
git clone https://github.com/Andres-DLT/mobileCertare.git
cd mobileCertare
npm ci
npm ci --prefix functions
```

On Windows, set `CHROME_BIN` to an installed Chromium or Chrome before running
the Karma suite. CI runners use their preinstalled Chrome.

## Verification before a pull request

Run what matches your change and say in the PR description which commands you
ran:

| Change | Run |
| --- | --- |
| App code | `npm run test:ci` and `npm run build` |
| Functions code | `npm --prefix functions run verify` |
| Environment generator (`tools/set-env.ts`) | `npm run test:tools` |
| Anything and everything | `npm run verify` |

`npm run verify` covers root unit tests, the tools test, the web build and
Functions verify. Install dependencies in both directories first.

Don't weaken an assertion, skip a test or hide a failing command to get a
green run. If a check fails, fix the cause or describe the failure honestly in
the PR.

## What CI does and doesn't do

- The quality workflow runs Angular unit tests with coverage, the web build,
  Functions Jest with coverage and its TypeScript build, and the tools
  regression. It needs no cloud secrets, declares read-only repository
  permissions, and pins actions to immutable commit references. Coverage is
  measured, not gated by an arbitrary threshold.
- Preview deploys happen only with the maintainer-applied `deploy-preview`
  label on a same-repository pull request.
- The live deployment workflow is manually dispatched on `main`. Merging to
  `main` and production deploying are maintainer operations.
- End-to-end journeys, native APK builds and production deployments are not
  part of the quality workflow. See [docs/TESTING.md](docs/TESTING.md) for the
  full boundary and the historical verification records.

## Code standards

[docs/QUALITY.md](docs/QUALITY.md) is the reference: standalone Angular
components, Firebase calls inside `runInInjectionContext`, English copy and
comments, and error paths that always resolve loading states.

## Licensing

No license has been chosen yet. Don't add a license file or license headers
without the owner's decision.
