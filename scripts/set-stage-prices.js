// One-time: adds starting MXN prices to the 40 dev/AI/training stage docs.
// Prices are starting prices for proposal purposes — confirm with the business.
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const prices = {
  'mobile-services': {
    'discovery-scoping': 12000, 'ux-ui-design': 15000, 'ios-development': 35000,
    'android-development': 35000, 'cross-platform': 30000, 'backend-integration': 22000,
    'qa-device-farm': 14000, 'beta-distribution': 9000, 'store-publishing': 8000,
    'maintenance-monitoring': 12000,
  },
  'web-services': {
    'discovery-scoping': 10000, 'ux-ui-design': 13000, 'frontend-development': 24000,
    'backend-api-development': 24000, 'cms-ecommerce': 16000, 'qa-e2e': 15000,
    'performance-hardening': 18000, 'devops-cicd': 20000, 'launch-migration': 12000,
    'maintenance-sla': 10000,
  },
  'ai-services': {
    'ai-opportunity-assessment': 14000, 'llm-integration': 28000, 'rag-systems': 26000,
    'ai-agents': 30000, 'ml-model-qa': 18000, 'llm-evaluation': 16000,
    'prompt-testing': 12000, 'ai-red-teaming': 20000, 'ai-performance': 15000,
    'ai-governance': 18000,
  },
  'training-services': {
    'qa-foundations': 6000, 'automation-bootcamp': 14000, 'api-testing-course': 8000,
    'performance-course': 9000, 'certification-prep': 5000, 'mobile-dev-course': 10000,
    'web-dev-course': 10000, 'devops-course': 9000, 'sdet-mentoring': 12000,
    'quality-leadership': 15000,
  },
};

async function main() {
  for (const [collection, map] of Object.entries(prices)) {
    for (const [id, price] of Object.entries(map)) {
      const ref = db.doc(collection + '/' + id);
      const snap = await ref.get();
      if (!snap.exists) {
        console.error('MISSING: ' + collection + '/' + id);
        process.exitCode = 1;
        continue;
      }
      if (typeof snap.data().price === 'number') {
        console.log('SKIP (has price): ' + collection + '/' + id);
        continue;
      }
      await ref.update({ price });
      console.log('SET $' + price + ': ' + collection + '/' + id);
    }
  }
  await admin.app().delete();
}

main().catch((e) => { console.error(e.message); process.exitCode = 1; });
