import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription, timeout, TimeoutError } from 'rxjs';
import { DevSectorService, DevSector, DevStage } from '../dev-sector.service';
import { SeoService } from '../../shared/seo.service';
import { CxHeroComponent } from '../../shared/ui/cx-hero.component';
import { CxCardComponent } from '../../shared/ui/cx-card.component';
import { CxEmptyStateComponent } from '../../shared/ui/cx-empty-state.component';
import { CxCtaSectionComponent } from '../../shared/ui/cx-cta-section.component';

interface PillarContent {
  chip: string;
  title: string;
  intro: string;
  included: string[];
  excluded: string[];
  estimates: string[];
  faqs: { q: string; a: string }[];
  catalogLink?: string;
}

const PILLARS: Record<string, PillarContent> = {
  mobile: {
    chip: 'MOBILE DEVELOPMENT',
    title: 'Mobile apps without surprises',
    intro:
      'Apps for iOS and Android built by senior engineers, tested on real devices and published to the stores. You own the code, the suites and the release process.',
    included: [
      'Native or cross-platform development scoped to your goals',
      'Test automation on real devices (device-farm coverage)',
      'Startup, render and energy profiling',
      'Store publishing: signing, listings, review handling',
      'Crash reporting and release dashboards wired from day one',
    ],
    excluded: [
      'Backend systems outside the agreed scope',
      'App Store / Play Store fees and developer accounts',
      'Marketing assets and store copywriting',
    ],
    estimates: [
      'S — single-platform MVP: 4–6 weeks',
      'M — two platforms with automation: 8–12 weeks',
      'L — full product with backend integration: scoped after discovery',
    ],
    faqs: [
      { q: 'Who owns the code?', a: 'You do — repository, credentials and documentation are transferred from the first sprint.' },
      { q: 'How do releases work?', a: 'Versioned releases with automated checks, staged rollouts and rollback playbooks.' },
      { q: 'Can you take over an existing app?', a: 'Yes. We start with an audit of code, tests and release health, then propose a roadmap.' },
    ],
  },
  web: {
    chip: 'WEB DEVELOPMENT',
    title: 'Web platforms that hold up',
    intro:
      'Web applications and APIs with automated end-to-end coverage running in your pipeline. Performance budgets and quality gates included, not optional.',
    included: [
      'Frontend applications and supporting APIs',
      'End-to-end suites with Playwright covering key journeys',
      'Contract testing for REST or GraphQL services',
      'CI quality gates: tests, coverage, lint and security',
      'Load baselines with k6 or JMeter before launch',
    ],
    excluded: [
      'Infrastructure billing (hosting, CDN, databases)',
      'Third-party license costs',
      'Content creation and copywriting',
    ],
    estimates: [
      'S — marketing site or portal: 3–5 weeks',
      'M — platform with auth and integrations: 6–10 weeks',
      'L — multi-service product: scoped after discovery',
    ],
    faqs: [
      { q: 'Which stack do you use?', a: 'We adapt to yours. Our recent work centers on Angular, Playwright, REST/GraphQL and GitHub Actions or Jenkins pipelines.' },
      { q: 'How is quality measured?', a: 'Coverage, flake rate, load thresholds and defect escape rate — reported on dashboards you keep.' },
      { q: 'Do you work with in-house teams?', a: 'Yes. Embedded engineers join your rituals and hand over suites your team can run and extend.' },
    ],
  },
  testing: {
    chip: 'GLOBAL TESTING',
    title: 'One testing practice, whole stack',
    intro:
      'Manual, automation, API, performance and CI/CD quality gates from a single practice. Browse the catalog below or talk to us about coverage for your stack.',
    included: [
      'Manual, exploratory and accessibility testing',
      'Web, mobile and visual test automation',
      'API contract and integration suites',
      'Load, stress and performance audits',
      'CI/CD quality gates and release orchestration',
    ],
    excluded: [
      'Fixing application code outside the agreed scope',
      'Production infrastructure operation',
    ],
    estimates: [
      'S — focused audit or single suite: 2–4 weeks',
      'M — automation program per platform: 6–10 weeks',
      'L — embedded QA across squads: quarterly engagement',
    ],
    faqs: [
      { q: 'How do we start?', a: 'With a maturity audit: we map risks, then propose suites ordered by business impact.' },
      { q: 'What do we receive?', a: 'Test plans, automated suites, defect reports with evidence, and dashboards.' },
      { q: 'Can testing run inside our pipeline?', a: 'That is the default — gates run on every pull request with clear pass/fail signals.' },
    ],
    catalogLink: '/products/list',
  },
  ai: {
    chip: 'AI INTEGRATION & TESTING',
    title: 'AI you can trust in production',
    intro:
      'Integration of language models, agents and knowledge systems — plus the evaluations, red teaming and governance that keep them safe, fast and affordable.',
    included: [
      'LLM integration, RAG pipelines and agent workflows',
      'Model QA, eval harnesses and prompt testing',
      'Red teaming, guardrails and cost tuning',
      'Governance checklists and production monitoring',
    ],
    excluded: [
      'Training foundation models from scratch',
      'GPU infrastructure billing',
    ],
    estimates: [
      'S — opportunity assessment or single integration: 2–4 weeks',
      'M — RAG system or agent workflow with evals: 6–10 weeks',
      'L — AI program with governance: scoped after discovery',
    ],
    faqs: [
      { q: 'How do you prevent hallucinations?', a: 'Grounding over your data, cited answers, guardrails and eval gates on every change.' },
      { q: 'How is AI quality measured?', a: 'Golden datasets, task success rate, latency and cost per task — tracked continuously.' },
      { q: 'Who owns the data?', a: 'You do. Reviews cover privacy, retention and model-training opt-outs before anything ships.' },
    ],
  },
  training: {
    chip: 'IT EDUCATION & TRAINING',
    title: 'Teams that level up',
    intro:
      'Hands-on courses, bootcamps and mentoring across QA, development and IT operations — built around your stack, not generic slides.',
    included: [
      'QA, automation, API and performance courses',
      'Mobile, web and DevOps training with labs',
      'SDET mentoring and quality leadership workshops',
      'Material, repositories and certificates your team keeps',
    ],
    excluded: [
      'Official certification exam fees',
      'Third-party platform licenses',
    ],
    estimates: [
      'S — focused workshop: 1–2 weeks',
      'M — bootcamp per discipline: 4–8 weeks',
      'L — enablement program: quarterly engagement',
    ],
    faqs: [
      { q: 'On-site or remote?', a: 'Both. Remote-first with live labs; on-site available for teams.' },
      { q: 'Is it theory or practice?', a: 'Practice: every module ends with working artifacts in your own repositories.' },
      { q: 'Do you certify?', a: 'You receive completion certificates plus guided prep for industry certifications.' },
    ],
  },
};

@Component({
  selector: 'app-pillar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CxHeroComponent,
    CxCardComponent,
    CxEmptyStateComponent,
    CxCtaSectionComponent,
  ],
  templateUrl: './pillar.component.html',
  styleUrl: '../about/about.component.css'
})
export class PillarComponent implements OnInit, OnDestroy {
  pillar: PillarContent = PILLARS['mobile'];
  stages: DevStage[] = [];
  stagesLoading = false;
  stagesError = '';
  sectorKey = '';
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private devSectors: DevSectorService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    const key = this.route.snapshot.data['pillar'] as string;
    this.pillar = PILLARS[key] ?? PILLARS['mobile'];
    this.seo.setPage({
      title: this.pillar.title,
      description: this.pillar.intro,
      path: this.route.snapshot.url.map((s) => '/' + s.path).join('') || '/agency',
    });
    if (key === 'mobile' || key === 'web' || key === 'ai' || key === 'training') {
      this.sectorKey = key;
      this.loadStages(key);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  loadStages(sector: DevSector) {
    this.sub?.unsubscribe();
    this.stagesLoading = true;
    this.stagesError = '';
    this.sub = this.devSectors
      .getStages(sector)
      .pipe(timeout({ first: 15000 }))
      .subscribe({
        next: (stages) => {
          this.stages = stages;
          this.stagesLoading = false;
        },
        error: (err: unknown) => {
          this.stages = [];
          this.stagesLoading = false;
          this.stagesError =
            err instanceof TimeoutError
              ? 'Stages took too long to load. Check your connection and retry.'
              : 'Could not load the lifecycle stages. Try again later.';
          console.error('[Pillar] loadStages failed:', err);
        },
      });
  }

  retryStages() {
    if (this.sectorKey === 'mobile' || this.sectorKey === 'web' || this.sectorKey === 'ai' || this.sectorKey === 'training') this.loadStages(this.sectorKey);
  }
}
