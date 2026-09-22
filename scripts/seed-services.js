require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const services = [
  {
    id: '1',
    title: 'Functional & UAT Testing',
    description: 'Manual functional and user acceptance testing executed by senior engineers, with traceable test cases and defect reporting.',
    price: 8900,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'manual',
    tags: ['Functional', 'UAT', 'Defect reports'],
  },
  {
    id: '2',
    title: 'Regression Test Cycles',
    description: 'Structured regression cycles with impact analysis, test selection and full execution reporting.',
    price: 7200,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'manual',
    tags: ['Regression', 'Test planning'],
  },
  {
    id: '3',
    title: 'Exploratory Testing Sprint',
    description: 'Week-long exploratory sessions that surface edge cases and usability issues, delivered as rich bug reports.',
    price: 6500,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'manual',
    tags: ['Exploratory', 'Ad-hoc'],
  },
  {
    id: '4',
    title: 'Accessibility & Usability Audit',
    description: 'WCAG-aligned accessibility audits and usability validation across key flows, delivered as prioritized findings.',
    price: 9600,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'manual',
    tags: ['Accessibility', 'WCAG', 'Usability'],
  },
  {
    id: '5',
    title: 'Web E2E Automation',
    description: 'End-to-end suites with Playwright covering the user journeys that matter, flake-resistant and maintained.',
    price: 26000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'automation',
    tags: ['Playwright', 'E2E', 'Web'],
  },
  {
    id: '6',
    title: 'Selenium Framework Setup',
    description: 'Production-grade Selenium framework with page objects, parallel execution and CI reporting.',
    price: 21000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'automation',
    tags: ['Selenium', 'Java', 'Framework'],
  },
  {
    id: '7',
    title: 'Mobile Test Automation',
    description: 'Appium suites for iOS and Android with device-farm integration and real-device coverage.',
    price: 31000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'automation',
    tags: ['Appium', 'iOS', 'Android'],
  },
  {
    id: '8',
    title: 'Visual Regression Testing',
    description: 'Pixel-level visual monitoring with branded baselines and a review workflow for UI consistency.',
    price: 15500,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'automation',
    tags: ['Visual', 'UI', 'Baselines'],
  },
  {
    id: '9',
    title: 'REST API Test Suite',
    description: 'Contract and integration suites with REST Assured, including auth flows, schemas and negative cases.',
    price: 16500,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'api',
    tags: ['REST', 'REST Assured', 'Postman'],
  },
  {
    id: '10',
    title: 'GraphQL Contract Testing',
    description: 'Schema-first contract testing for GraphQL services with snapshot baselines and schema-drift alerts.',
    price: 15000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'api',
    tags: ['GraphQL', 'Contract', 'Schema'],
  },
  {
    id: '11',
    title: 'Backend Integration Suite',
    description: 'End-to-end backend verification across services, databases and message queues.',
    price: 18500,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'api',
    tags: ['Integration', 'Microservices', 'Queues'],
  },
  {
    id: '12',
    title: 'Load & Stress Testing (k6)',
    description: 'Scripted load, stress and soak scenarios with k6, plus thresholds wired into your CI.',
    price: 21000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'performance',
    tags: ['k6', 'Load', 'Stress'],
  },
  {
    id: '13',
    title: 'JMeter Baseline & Tuning',
    description: 'JMeter baselines, bottleneck analysis and actionable tuning recommendations.',
    price: 18500,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'performance',
    tags: ['JMeter', 'Profiling', 'Tuning'],
  },
  {
    id: '14',
    title: 'Mobile Performance Audit',
    description: 'Profiling of app startup, render and energy consumption on representative devices.',
    price: 18000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'performance',
    tags: ['Mobile', 'Profiling', 'UX'],
  },
  {
    id: '15',
    title: 'CI Quality Gates (GitHub Actions)',
    description: 'Quality gates in GitHub Actions: tests, coverage, lint and security on every pull request.',
    price: 20000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'cicd',
    tags: ['GitHub Actions', 'Gates', 'Coverage'],
  },
  {
    id: '16',
    title: 'Jenkins Pipeline Setup',
    description: 'Declarative Jenkins pipelines with staged test execution, artifacts and failure reporting.',
    price: 19000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'cicd',
    tags: ['Jenkins', 'Pipelines', 'Stages'],
  },
  {
    id: '17',
    title: 'Release Orchestration',
    description: 'End-to-end release automation with environments, sign-offs and rollback playbooks.',
    price: 23000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'cicd',
    tags: ['Release', 'Deployment', 'Rollback'],
  },
  {
    id: '18',
    title: 'Testing Maturity Audit',
    description: 'A structured audit of your testing practice, people, tooling and metrics, with a realistic roadmap.',
    price: 16000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'consulting',
    tags: ['Audit', 'Strategy', 'Roadmap'],
  },
  {
    id: '19',
    title: 'Embedded SDET Team',
    description: 'Senior SDETs embedded in your squad for delivery, not just advice.',
    price: 24000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'consulting',
    tags: ['Embedded', 'Delivery', 'Coaching'],
  },
  {
    id: '20',
    title: 'Training & Enablement',
    description: 'Hands-on workshops in automation, performance and quality culture, built around your stack.',
    price: 22000,
    'image-front': 'assets/images/icons/products-icon.png',
    'image-back': 'assets/images/icons/cart-buy-icon.png',
    category: 'consulting',
    tags: ['Training', 'Workshops', 'Enablement'],
  },
];

/** Seed Firestore con el catálogo de 1 precio único por servicio (MXN) */
async function seed() {
  try {
    const col = db.collection('product-store');

    const existing = await col.listDocuments();
    await Promise.all(existing.map((doc) => doc.delete()));
    console.log(`🗑️  Cleared ${existing.length} existing articles`);

    for (const s of services) {
      await col.doc(s.id).set(s);
      console.log(`✅ Service "${s.title}" created`);
    }

    console.log(`🎉 Certare catalog seeded: ${services.length} services`);
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed:', e);
    process.exit(1);
  }
}

seed();
