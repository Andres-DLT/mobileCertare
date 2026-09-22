# DOMAIN — connecting a paid domain

Pre-work already done in the repo: single-site Hosting config for `certare`,
security headers in `firebase.json`, canonical URL + `siteUrl` centralized in
`src/environments/environment.ts` (`NG_APP_SITE_URL` override in `tools/set-env.ts`),
`lang="en"`, meta/OG tags in `src/index.html`, brand SVG assets.

## Steps on purchase day (example: `certare.mx`)

1. Firebase Console → Hosting → **Add custom domain** → enter the domain.
2. Verify ownership: add the TXT record at your DNS provider, wait for
   verification in the console.
3. Point the domain: add the A/AAAA records Firebase shows. SSL is issued
   automatically (up to 24 h propagation).
4. Firebase Console → Authentication → Settings → **Authorized domains** →
   add the new domain, or login breaks outside `*.web.app`.
5. Update `NG_APP_SITE_URL` (or `environment.siteUrl` + `index.html`
   canonical/OG) to the new domain, rebuild, redeploy Hosting.
6. `certare.web.app` stays live as fallback; the legacy
   `smartfoodie-dda27.web.app` remains disabled.

## Later (same window or after)

- Email sender domain (Functions still use Gmail) — rotate the app password
  and move SMTP credentials to Secret Manager.
- Search Console + Analytics property for the new domain.
- Play Store listing reuses `docs/BRAND.md` assets and the same package
  (`com.certare.app`); no code change needed for the domain.
