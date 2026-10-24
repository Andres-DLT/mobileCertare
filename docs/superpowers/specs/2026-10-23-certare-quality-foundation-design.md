# Certare Quality Foundation

## Approved Outcome

Complete the approved initial phase for `Andres-DLT/mobileCertare`: a truthful
project README, repository metadata, the PR #3 count correction, and a reviewable
pull request with real quality CI. Only Certare is presented as the owner's
project. Other accessible repositories are outside this work.

## Scope

- Document the public service catalog, discovery intake and allowlisted member
  portal. Checkout and public order processing remain disabled.
- Provide reproducible setup and verification commands for Angular, Functions
  unit tests, the environment-generator regression test and production builds.
- Add a secrets-free quality workflow on the supported Node 22 line.
- Retain PR previews as explicitly requested, opt-in deployments rather than a
  prerequisite for validating ordinary or Dependabot pull requests.
- Update the repository description, homepage and factual topics after checking
  the implementation. Correct only `30` to `37` in the existing PR #3 description.

## Boundaries

- No merge or direct push to `main`, production deployment, Firebase CLI call,
  IAM/ruleset/secret change, license decision or edit to another repository.
- Do not change the live Hosting workflow or application business behavior.
- Keep the original published checkout and its dirty Firebase cache untouched.
- Do not publish the confidential audit, personal email, private-project names,
  credentials, customer data or unsupported professional claims.
- Do not upgrade Angular or mass-remediate dependencies in this phase.
- Do not create a profile repository or edit account biography/pins in this phase.
- Functions' Node 18 deployment engine remains a documented legacy limitation;
  using Node 22 for unit tests does not migrate or deploy that backend.

## Design Decisions

Node `22.23.4` is the reproducible quality-runtime target. Angular 19.2 supports
Node 22. Existing lockfiles and dependencies are retained.

The quality workflow runs Angular unit tests with coverage and the web build,
Functions Jest with coverage and its TypeScript build, and the native Node tools
test. It declares read-only repository permissions and uses immutable action
commit references. Coverage is measured, not given an arbitrary passing threshold.

The existing preview workflow requires a maintainer's `deploy-preview` label as
well as the same-repository guard. Label changes are workflow events, so a label
can actually request a preview. Ordinary quality runs need no cloud credentials.
The main/live deployment workflow remains unchanged.

## Verification Contract

- All existing tests and both builds must run successfully on the isolated branch.
- No assertion is weakened, test skipped, install forced, or failing command hidden.
- The tools gate must be proven to reject its existing serializer regression,
  with the implementation restored before committing.
- GitHub must execute the quality checks for the exact feature revision; the
  preview job must be skipped without the explicit opt-in label.
- Documentation may describe historical results only as historical results and
  must not claim E2E, native builds, coverage percentages or deployments not run.
- The original Firebase cache hash and live-workflow bytes must match the baseline.

## Delivery

Meaningful commits on `quality/certare-foundation`, one open reviewable PR, verified
repository metadata and the narrowly corrected historical PR description. No
automatic merge or production publication is part of the delivery.
