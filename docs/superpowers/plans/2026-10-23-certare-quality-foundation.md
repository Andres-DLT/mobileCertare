# Certare Quality Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> or superpowers:executing-plans to implement this plan task by task.

**Goal:** Deliver the approved Certare README/metadata and secrets-free quality-CI
phase in a reviewable pull request without changing production.

**Architecture:** Keep the existing Angular and Functions test stacks and lockfiles.
Run quality checks independently of Firebase credentials and gate previews behind
an explicit maintainer label. Keep application behavior and live deployment intact.

**Tech Stack:** Angular 19.2, TypeScript 5.7, Karma/Jasmine, Jest/ts-jest, Node test
runner, Node 22.23.4 and GitHub Actions on Ubuntu 24.04.

**Spec:** `docs/superpowers/specs/2026-10-23-certare-quality-foundation-design.md`.

## Global Constraints

- Only `Andres-DLT/mobileCertare`; only Certare is attributed to its owner.
- No merge, main push, production deployment, Firebase CLI, IAM, secrets or rulesets.
- Original Firebase cache and main/live workflow remain byte-identical.
- No private contact data, confidential audit material or private-project content.
- Keep dependencies, Angular version, backend business behavior and deployment
  engine unchanged; Node 22 is the test/quality runtime.
- Public technical documentation is English. Claims must have execution evidence.
- Use native file-edit tools and explicit staging; never stage generated coverage,
  build output, dependencies, runtime caches or local coordination notes.

## Review Focus

- Missing secrets or Dependabot context must not prevent quality tests from running.
- Adding/removing `deploy-preview` must evaluate the opt-in preview guard correctly.
- Windows uses an installed Chromium browser via CHROME_BIN; CI uses real Chrome.
- Standalone Node tools tests must be executed, not merely listed in documentation.
- Historical test counts and measured coverage must not become invented CI claims.

## Task 1: Preserve and Verify the Baseline

**Files:** existing manifests, test configuration and workflows, read-only.

- [x] Record base `94e62621e579425f0adf3e60b753ef5a70a35aba` and cache checksum.
- [x] Create an external worktree on `quality/certare-foundation` without stashing
  or restoring the published checkout.
- [x] Install locked root and Functions dependencies and provision Node 22 locally
  without switching the owner's global Node installation.
- [x] Run Angular, Functions and tools tests plus both builds; retain actual exits.

## Task 2: Implement Quality CI

**Files:** `.github/workflows/quality.yml`, the existing PR-preview workflow,
`.nvmrc`, root/Functions `package.json`, and generated-artifact ignore entries.

**Interfaces:** npm scripts `test:ci`, `test:tools`, `verify` and the Functions
`test:ci`/`verify` scripts; root `verify` runs every approved verification layer.

- [ ] Add stable commands without changing the default interactive test behavior.
- [ ] Pin the Node quality runtime and third-party actions to verified versions.
- [ ] Run real tests, coverage and builds with read-only job permissions and
  retain reports as short-lived artifacts, with no secret references.
- [ ] Add the explicit preview-label guard and label event types; do not modify
  the live workflow or request the preview label on the quality PR.
- [ ] Validate YAML and run the exact commands locally. Prove the tools gate fails
  when the existing serializer defect is temporarily reintroduced, then restore it.

## Task 3: Document the Product and Verification Contract

**Files:** `README.md`, `docs/TESTING.md`, `CONTRIBUTING.md`.

**Interfaces:** consume the npm commands from Task 2 and current product facts in
`docs/PROJECT.md`, `docs/QUALITY.md`, `docs/SECURITY.md` and release records.

- [ ] Explain shipped behavior, demo, setup, test commands and known limitations.
- [ ] Distinguish public intake from the legacy order-email backend; do not promise
  automatic intake notifications or enabled checkout.
- [ ] Document secret-free CI, opt-in previews, safe test environments and the
  unchanged production/IAM boundary. Do not copy local machine paths or secrets.
- [ ] Verify commands, links, attribution and absence of private data.

## Task 4: Review and Publish the Authorized GitHub Changes

**Files/targets:** intended branch diff, generated code graph, PR #3 body and repo
About metadata. Local coordination notes record execution evidence separately.

- [ ] Read every changed file; run diagnostics, tests and both builds again.
- [ ] Run the mandatory code-only Graphify update; retain appropriate versioned
  graph outputs, not transient cache files.
- [ ] Review scope and privacy; create atomic commits and push only the feature branch.
- [ ] Open one PR; verify real quality jobs for its exact revision without merge.
- [ ] Preserve PR #3 body except `Cambia 30 archivos` to `Cambia 37 archivos`.
- [ ] Set the verified repository description, homepage and factual topics.
- [ ] Check the original cache/live workflow, branch states and production boundary.

## Execution Notes

This file records the implementation plan. The local coordination ledger and final
PR evidence are the execution record. Documentation and CI may proceed in parallel
only with disjoint write targets. Nothing is complete merely because a body or
workflow contains an expected string: command exits and real GitHub checks matter.
