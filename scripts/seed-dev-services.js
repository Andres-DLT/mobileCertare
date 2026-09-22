require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const mobileServices = [
  {
    id: 'discovery-scoping',
    title: 'Discovery & Scoping',
    description: 'Goals, users, risks and constraints are mapped into a scoped roadmap with milestones and estimates before a line of code is written.',
    phase: 'Discovery',
    order: 1,
    deliverables: ['Scoped roadmap', 'Risk register', 'Milestone estimates'],
    tags: ['Discovery', 'Roadmap', 'Estimates'],
  },
  {
    id: 'ux-ui-design',
    title: 'UX & UI Design',
    description: 'User flows, wireframes and interface design validated with prototypes, following platform guidelines for iOS and Android.',
    phase: 'Design',
    order: 2,
    deliverables: ['User flows', 'Clickable prototype', 'Design system'],
    tags: ['UX', 'UI', 'Prototype'],
  },
  {
    id: 'ios-development',
    title: 'iOS Development',
    description: 'Native iOS applications built with current tooling, versioned releases and automated checks on every change.',
    phase: 'Development',
    order: 3,
    deliverables: ['Native iOS app', 'Versioned releases', 'Unit test coverage'],
    tags: ['iOS', 'Native'],
  },
  {
    id: 'android-development',
    title: 'Android Development',
    description: 'Native Android applications covering the device range your users actually carry, with staged rollouts.',
    phase: 'Development',
    order: 4,
    deliverables: ['Native Android app', 'Device coverage matrix', 'Staged rollouts'],
    tags: ['Android', 'Native'],
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Development',
    description: 'A single codebase serving both stores when the product fits it, with platform-specific tuning where it matters.',
    phase: 'Development',
    order: 5,
    deliverables: ['Shared codebase', 'Platform adaptations', 'Single release train'],
    tags: ['Cross-platform', 'iOS', 'Android'],
  },
  {
    id: 'backend-integration',
    title: 'Backend & API Integration',
    description: 'Authentication, data sync, push notifications and third-party services integrated with contract-tested APIs.',
    phase: 'Development',
    order: 6,
    deliverables: ['API integration layer', 'Auth & push setup', 'Contract tests'],
    tags: ['APIs', 'Backend', 'Push'],
  },
  {
    id: 'qa-device-farm',
    title: 'QA on Real Devices',
    description: 'Functional, regression and usability testing on a real-device farm across OS versions and screen sizes.',
    phase: 'Quality',
    order: 7,
    deliverables: ['Test plans', 'Defect reports with evidence', 'Release sign-off'],
    tags: ['QA', 'Devices', 'Regression'],
  },
  {
    id: 'beta-distribution',
    title: 'Beta Distribution',
    description: 'Closed beta tracks with crash reporting and feedback loops before the public launch.',
    phase: 'Release',
    order: 8,
    deliverables: ['Beta tracks', 'Crash reports', 'Feedback triage'],
    tags: ['Beta', 'TestFlight', 'Play testing'],
  },
  {
    id: 'store-publishing',
    title: 'Store Publishing',
    description: 'Signing, listings, review handling and release notes for the App Store and Google Play.',
    phase: 'Release',
    order: 9,
    deliverables: ['Signed releases', 'Store listings', 'Review responses'],
    tags: ['App Store', 'Google Play'],
  },
  {
    id: 'maintenance-monitoring',
    title: 'Maintenance & Monitoring',
    description: 'Crash monitoring, OS compatibility updates and prioritized fixes after launch, with monthly health reports.',
    phase: 'Care',
    order: 10,
    deliverables: ['Crash monitoring', 'Compatibility updates', 'Monthly health report'],
    tags: ['Monitoring', 'Support'],
  },
];

const webServices = [
  {
    id: 'discovery-scoping',
    title: 'Discovery & Scoping',
    description: 'Audiences, journeys, integrations and risks are mapped into a scoped plan with milestones and estimates.',
    phase: 'Discovery',
    order: 1,
    deliverables: ['Scoped roadmap', 'Sitemap & journeys', 'Milestone estimates'],
    tags: ['Discovery', 'Roadmap'],
  },
  {
    id: 'ux-ui-design',
    title: 'UX & UI Design',
    description: 'Responsive interfaces designed around conversion and usability, validated with prototypes before development.',
    phase: 'Design',
    order: 2,
    deliverables: ['Responsive layouts', 'Clickable prototype', 'Design system'],
    tags: ['UX', 'UI', 'Responsive'],
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    description: 'Fast, accessible interfaces with component architecture, state management and performance budgets.',
    phase: 'Development',
    order: 3,
    deliverables: ['Production frontend', 'Accessibility pass', 'Performance budget report'],
    tags: ['Frontend', 'Accessibility'],
  },
  {
    id: 'backend-api-development',
    title: 'Backend & API Development',
    description: 'Services, authentication, data models and integrations built with contract tests from the start.',
    phase: 'Development',
    order: 4,
    deliverables: ['APIs & services', 'Auth flows', 'API documentation'],
    tags: ['Backend', 'APIs'],
  },
  {
    id: 'cms-ecommerce',
    title: 'Content & Commerce',
    description: 'Content management, catalogs and checkout flows your team can operate without developers.',
    phase: 'Development',
    order: 5,
    deliverables: ['CMS setup', 'Catalog & checkout', 'Editor training'],
    tags: ['CMS', 'E-commerce'],
  },
  {
    id: 'qa-e2e',
    title: 'E2E Quality Assurance',
    description: 'Automated end-to-end suites covering critical journeys, plus exploratory testing for edge cases.',
    phase: 'Quality',
    order: 6,
    deliverables: ['E2E suites', 'Exploratory reports', 'Release sign-off'],
    tags: ['E2E', 'Playwright', 'QA'],
  },
  {
    id: 'performance-hardening',
    title: 'Performance Hardening',
    description: 'Load baselines, Core Web Vitals tuning and bottleneck analysis before traffic arrives.',
    phase: 'Quality',
    order: 7,
    deliverables: ['Load baseline', 'Vitals report', 'Tuning actions'],
    tags: ['Performance', 'Load'],
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD',
    description: 'Pipelines with tests, coverage, lint and security gates on every pull request, plus preview environments.',
    phase: 'Release',
    order: 8,
    deliverables: ['CI pipelines', 'Preview environments', 'Quality gates'],
    tags: ['CI/CD', 'DevOps'],
  },
  {
    id: 'launch-migration',
    title: 'Launch & Migration',
    description: 'DNS cutover, data migration, rollback plans and launch checklists executed with monitoring on.',
    phase: 'Release',
    order: 9,
    deliverables: ['Launch checklist', 'Migration runbook', 'Rollback plan'],
    tags: ['Launch', 'Migration'],
  },
  {
    id: 'maintenance-sla',
    title: 'Maintenance & SLAs',
    description: 'Prioritized fixes, dependency updates and uptime monitoring with monthly reports.',
    phase: 'Care',
    order: 10,
    deliverables: ['SLA coverage', 'Dependency updates', 'Monthly report'],
    tags: ['Support', 'SLA'],
  },
];

/** Seeds mobile-services and web-services. Aborts if a collection is not empty. */
async function seed() {
  try {
    const targets = [
      { name: 'mobile-services', items: mobileServices },
      { name: 'web-services', items: webServices },
    ];
    for (const target of targets) {
      const col = db.collection(target.name);
      const existing = await col.listDocuments();
      if (existing.length > 0) {
        console.error(`❌ Collection "${target.name}" already has ${existing.length} documents. Clear it first (scripts/clear-product-store.js pattern).`);
        process.exit(1);
      }
      for (const item of target.items) {
        await col.doc(item.id).set(item);
        console.log(`✅ [${target.name}] "${item.title}" created`);
      }
    }
    console.log('🎉 Dev catalogs seeded: mobile-services (10) + web-services (10)');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed:', e);
    process.exit(1);
  }
}

seed();
