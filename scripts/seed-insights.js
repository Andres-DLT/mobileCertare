require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const insights = [
  {
    id: 'ai-generated-code-qa-playbook',
    title: 'AI-generated code needs a new QA playbook',
    excerpt: 'More than half of new code is AI-assisted. Volume is up, review capacity is not — quality has to move into the pipeline, not after it.',
    body: [
      'Industry research in 2026 puts AI-assisted code above half of all new code, and QA teams report testing demand growing faster than headcount. The bottleneck is no longer writing code — it is verifying it.',
      'The practical answer is a playbook built for generated code: risk-based test selection, AI-aware review checklists, and automated gates that run on every change. Human reviewers stop re-reading boilerplate and focus on intent, edge cases and security.',
      'Sources: Sembi Software Quality Pulse Report 2026; Tricentis Quality Transformation Report 2026.',
    ].join('\n\n'),
    tags: ['AI testing', 'Quality engineering', 'Shift-left'],
    readingTime: 4,
    relatedServices: ['llm-evaluation', 'ai-opportunity-assessment'],
    order: 1,
  },
  {
    id: 'continuous-quality-over-gates',
    title: 'From testing gates to continuous quality',
    excerpt: 'Release speed keeps rising. Quality stops being a final checkpoint and becomes a loop: test early, observe in production, feed back.',
    body: [
      'High-performing teams run testing inside delivery pipelines instead of after them — a model the industry calls QAOps. Shift-left catches defects in design and code; shift-right validates with production telemetry.',
      'The two directions inform each other: production incidents become test cases for the next release, and pipeline gates prevent repeats. Velocity goes up because rework goes down.',
      'Sources: Perforce State of DevOps: AI in Testing 2026; Zuci Systems QE Trends 2026.',
    ].join('\n\n'),
    tags: ['Continuous testing', 'DevOps', 'QAOps'],
    readingTime: 3,
    relatedServices: ['devops-cicd', 'qa-e2e'],
    order: 2,
  },
  {
    id: 'evaluating-ai-systems',
    title: 'Evaluating AI systems: from pass/fail to confidence',
    excerpt: 'Non-deterministic output breaks binary testing. Teams replace it with golden datasets, LLM judges and production monitoring.',
    body: [
      'An LLM can answer the same prompt differently twice. Deterministic assertions cannot judge that — evaluation harnesses can: curated datasets, rubric-based judges and statistical thresholds per release.',
      'Mature setups add online evaluation on production traces, so drift and regressions surface in hours instead of quarters. Offline evals gate releases; online evals guard them.',
      'Sources: LangChain State of Agent Engineering 2026; Databricks Big Book of AgentOps 2026.',
    ].join('\n\n'),
    tags: ['LLM evals', 'LLMOps', 'AI observability'],
    readingTime: 4,
    relatedServices: ['llm-evaluation', 'ai-governance'],
    order: 3,
  },
];

/** Seeds the insights collection. Aborts if it is not empty. */
async function seed() {
  try {
    const col = db.collection('insights');
    const existing = await col.listDocuments();
    if (existing.length > 0) {
      console.error(`❌ Collection "insights" already has ${existing.length} documents. Clear it first.`);
      process.exit(1);
    }
    for (const item of insights) {
      await col.doc(item.id).set(item);
      console.log(`✅ [insights] "${item.title}" created`);
    }
    console.log('🎉 Seeded: insights (3)');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed:', e);
    process.exit(1);
  }
}

seed();
