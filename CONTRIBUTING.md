# Contributing

## How we work

- Work on a branch and open a pull request. Don't push straight to `main`.
- Say in the PR which checks you ran.
- Keep secrets out of git. `.env`, `functions/.env` and `serviceAccountKey.json`
  are already ignored.
- Use fake data in examples and tests, and don't create accounts or documents in
  the production Firebase project. Mark placeholder content with
  `data-placeholder`.
- A docs or test change shouldn't deploy anything. The only exception is the
  `deploy-preview` label, which a maintainer can add to a PR from this repo to
  get a preview.
- Report security issues privately through GitHub's security reporting, not in
  a public issue.

## Setup

Use Node 22.

```bash
git clone https://github.com/Andres-DLT/mobileCertare.git
cd mobileCertare
npm ci
npm ci --prefix functions
```

On Windows, set `CHROME_BIN` to your Chrome or Chromium before running the Karma
tests.

## Before opening a PR

| Change | Run |
| --- | --- |
| App code | `npm run test:ci` and `npm run build` |
| Functions code | `npm --prefix functions run verify` |
| Environment generator (`tools/set-env.ts`) | `npm run test:tools` |
| Anything | `npm run verify` |

`npm run verify` runs the root unit tests, the tools test, the web build and the
Functions checks. Install dependencies in both folders first.

If something fails, fix it or explain it in the PR. Don't skip or loosen a test
just to get a green run.

## CI

The quality workflow runs the Angular tests with coverage, the web build, the
Functions tests and build, and the tools test. It doesn't need any cloud
secrets. Preview deploys only happen with the `deploy-preview` label, and the
production deploy is run by hand from `main`. End-to-end tests and APK builds
aren't part of CI yet; see [docs/TESTING.md](docs/TESTING.md).

## Code style

See [docs/QUALITY.md](docs/QUALITY.md): standalone Angular components, Firebase
calls inside `runInInjectionContext`, English for code and comments, and loading
states that always finish, even when something fails.

## License

There's no license yet, so please don't add one or add license headers.
