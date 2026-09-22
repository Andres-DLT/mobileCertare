require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const aiServices = [
  {
    id: 'ai-opportunity-assessment',
    price: 14000,
    title: 'AI Opportunity Assessment',
    description: 'Use-case mapping, feasibility and ROI analysis to find where AI actually pays off before investing in build.',
    phase: 'Discovery',
    order: 1,
    deliverables: ['Use-case shortlist', 'Feasibility matrix', 'ROI estimate'],
    tags: ['Discovery', 'Strategy', 'ROI'],
  },
  {
    id: 'llm-integration',
    price: 28000,
    title: 'LLM Integration',
    description: 'Production integration of large language models into new or existing products, with guardrails from day one.',
    phase: 'Integration',
    order: 2,
    deliverables: ['Integrated LLM features', 'Guardrail policies', 'Cost controls'],
    tags: ['LLM', 'Integration', 'Chatbots'],
  },
  {
    id: 'rag-systems',
    price: 26000,
    title: 'RAG & Knowledge Systems',
    description: 'Retrieval-augmented pipelines over your own documents, with vector stores, grounding and cited answers.',
    phase: 'Integration',
    order: 3,
    deliverables: ['RAG pipeline', 'Vector index', 'Grounded answers'],
    tags: ['RAG', 'Vector DB', 'Knowledge'],
  },
  {
    id: 'ai-agents',
    price: 30000,
    title: 'AI Agents & Workflows',
    description: 'Agent workflows with tool use and human-in-the-loop checkpoints for multi-step tasks.',
    phase: 'Integration',
    order: 4,
    deliverables: ['Agent workflows', 'Tool integrations', 'Approval checkpoints'],
    tags: ['Agents', 'Automation', 'Workflows'],
  },
  {
    id: 'ml-model-qa',
    price: 18000,
    title: 'ML Model QA',
    description: 'Accuracy, robustness and fairness benchmarking of machine learning models against labeled datasets.',
    phase: 'AI Testing',
    order: 5,
    deliverables: ['Evaluation report', 'Benchmark suite', 'Failure analysis'],
    tags: ['ML', 'Benchmarks', 'Fairness'],
  },
  {
    id: 'llm-evaluation',
    price: 16000,
    title: 'LLM Evaluation Harnesses',
    description: 'Golden datasets and automated evals that catch regressions every time prompts or models change.',
    phase: 'AI Testing',
    order: 6,
    deliverables: ['Golden dataset', 'Eval harness', 'Regression gates'],
    tags: ['Evals', 'Regression', 'LLM'],
  },
  {
    id: 'prompt-testing',
    price: 12000,
    title: 'Prompt Testing & Versioning',
    description: 'Systematic prompt versioning, A/B comparisons and safety checks across models and releases.',
    phase: 'AI Testing',
    order: 7,
    deliverables: ['Prompt library', 'A/B results', 'Safety checklist'],
    tags: ['Prompts', 'A/B', 'Safety'],
  },
  {
    id: 'ai-red-teaming',
    price: 20000,
    title: 'AI Red Teaming',
    description: 'Adversarial testing — jailbreaks, injections and misuse scenarios — with mitigations for each finding.',
    phase: 'AI Testing',
    order: 8,
    deliverables: ['Attack catalog', 'Findings with severity', 'Mitigation plan'],
    tags: ['Red team', 'Security', 'Guardrails'],
  },
  {
    id: 'ai-performance',
    price: 15000,
    title: 'AI Performance & Cost Tuning',
    description: 'Latency reduction and token-budget control through caching, routing and right-sized models.',
    phase: 'AI Testing',
    order: 9,
    deliverables: ['Latency baseline', 'Cost-per-task report', 'Tuning actions'],
    tags: ['Latency', 'Cost', 'Optimization'],
  },
  {
    id: 'ai-governance',
    price: 18000,
    title: 'AI Governance & Monitoring',
    description: 'Responsible-AI checklists, data-privacy reviews and production monitoring for drift and incidents.',
    phase: 'Governance',
    order: 10,
    deliverables: ['Governance checklist', 'Privacy review', 'Monitoring setup'],
    tags: ['Governance', 'Privacy', 'Monitoring'],
  },
];

const trainingServices = [
  {
    id: 'qa-foundations',
    price: 6000,
    title: 'QA Foundations',
    description: 'Manual testing fundamentals: test design, defect reporting and acceptance criteria for new testers.',
    phase: 'Foundations',
    order: 1,
    deliverables: ['Course material', 'Hands-on labs', 'Completion certificate'],
    tags: ['QA', 'Manual', 'Beginners'],
  },
  {
    id: 'automation-bootcamp',
    price: 14000,
    title: 'Test Automation Bootcamp',
    description: 'Intensive Playwright and Selenium training: locators, page objects, parallel runs and CI integration.',
    phase: 'Quality',
    order: 2,
    deliverables: ['Working frameworks', 'Lab repository', 'CI integration'],
    tags: ['Automation', 'Playwright', 'Selenium'],
  },
  {
    id: 'api-testing-course',
    price: 8000,
    title: 'API Testing Course',
    description: 'Contract, integration and negative testing for REST and GraphQL services with real tooling.',
    phase: 'Quality',
    order: 3,
    deliverables: ['Contract suites', 'Postman collections', 'Reporting templates'],
    tags: ['API', 'Contract', 'Postman'],
  },
  {
    id: 'performance-course',
    price: 9000,
    title: 'Performance Testing Course',
    description: 'Load, stress and soak testing with k6 and JMeter: scripting, thresholds and result analysis.',
    phase: 'Quality',
    order: 4,
    deliverables: ['Load scripts', 'Threshold policy', 'Analysis workshop'],
    tags: ['k6', 'JMeter', 'Load'],
  },
  {
    id: 'certification-prep',
    price: 5000,
    title: 'Certification Prep',
    description: 'Guided preparation for industry testing certifications, with mock exams and study plans.',
    phase: 'Quality',
    order: 5,
    deliverables: ['Study plan', 'Mock exams', 'Exam readiness review'],
    tags: ['Certification', 'ISTQB', 'Career'],
  },
  {
    id: 'mobile-dev-course',
    price: 10000,
    title: 'Mobile Development Course',
    description: 'iOS and Android fundamentals through cross-platform practice: navigation, state, storage and releases.',
    phase: 'Development',
    order: 6,
    deliverables: ['Sample apps', 'Lab repository', 'Release walkthrough'],
    tags: ['Mobile', 'iOS', 'Android'],
  },
  {
    id: 'web-dev-course',
    price: 10000,
    title: 'Web Development Course',
    description: 'Modern frontend and backend development: components, APIs, auth and deployment basics.',
    phase: 'Development',
    order: 7,
    deliverables: ['Sample projects', 'API labs', 'Deployment guide'],
    tags: ['Web', 'Frontend', 'Backend'],
  },
  {
    id: 'devops-course',
    price: 9000,
    title: 'DevOps Essentials',
    description: 'CI/CD, containers, cloud basics and quality gates for teams shipping for the first time.',
    phase: 'Operations',
    order: 8,
    deliverables: ['Pipeline templates', 'Container labs', 'Gate checklist'],
    tags: ['DevOps', 'CI/CD', 'Cloud'],
  },
  {
    id: 'sdet-mentoring',
    price: 12000,
    title: 'SDET Mentoring',
    description: 'One-on-one or small-group mentoring for test engineers growing into automation and delivery ownership.',
    phase: 'Development',
    order: 9,
    deliverables: ['Mentoring plan', 'Code reviews', 'Growth roadmap'],
    tags: ['Mentoring', 'SDET', 'Career'],
  },
  {
    id: 'quality-leadership',
    price: 15000,
    title: 'Quality Leadership Workshop',
    description: 'Test strategy, metrics that matter and quality culture for leads and managers owning delivery risk.',
    phase: 'Leadership',
    order: 10,
    deliverables: ['Strategy canvas', 'Metrics playbook', '90-day plan'],
    tags: ['Leadership', 'Strategy', 'Metrics'],
  },
];

/** Seeds ai-services and training-services. Aborts if a collection is not empty. */
async function seed() {
  try {
    const targets = [
      { name: 'ai-services', items: aiServices },
      { name: 'training-services', items: trainingServices },
    ];
    for (const target of targets) {
      const col = db.collection(target.name);
      const existing = await col.listDocuments();
      if (existing.length > 0) {
        console.error(`❌ Collection "${target.name}" already has ${existing.length} documents. Clear it first.`);
        process.exit(1);
      }
      for (const item of target.items) {
        await col.doc(item.id).set(item);
        console.log(`✅ [${target.name}] "${item.title}" created`);
      }
    }
    console.log('🎉 Seeded: ai-services (10) + training-services (10)');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error seed:', e);
    process.exit(1);
  }
}

seed();
