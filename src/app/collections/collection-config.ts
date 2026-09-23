import { CatalogSector } from '../products/product-services';

export interface CollectionConfig {
  key: CatalogSector;
  collection: string;
  label: string;
  /** Short, specific intro used on collection surfaces. */
  intro: string;
  route: string;
  groupBy: 'category' | 'phase';
}

/** Certare Collection Standard v1: a new collection = data + one entry here. */
export const COLLECTIONS: CollectionConfig[] = [
  {
    key: 'testing',
    collection: 'product-store',
    label: 'Testing',
    intro: 'Quality engineering across the stack: manual, automation, API, performance and CI/CD gates.',
    route: '/products/list',
    groupBy: 'category',
  },
  {
    key: 'mobile',
    collection: 'mobile-services',
    label: 'Mobile',
    intro: 'iOS and Android apps tested on real devices and published without surprises.',
    route: '/agency/mobile',
    groupBy: 'phase',
  },
  {
    key: 'web',
    collection: 'web-services',
    label: 'Web',
    intro: 'Web platforms and APIs with automated coverage wired into the pipeline.',
    route: '/agency/web',
    groupBy: 'phase',
  },
  {
    key: 'ai',
    collection: 'ai-services',
    label: 'AI',
    intro: 'LLM features, agents and knowledge systems — evaluated and governed for production.',
    route: '/agency/ai',
    groupBy: 'phase',
  },
  {
    key: 'training',
    collection: 'training-services',
    label: 'Training',
    intro: 'Courses, bootcamps and mentoring across QA, development and IT operations.',
    route: '/agency/training',
    groupBy: 'phase',
  },
];
