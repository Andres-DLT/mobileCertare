import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ScheduleCallComponent } from '../schedule-call/schedule-call.component';

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
};

@Component({
  selector: 'app-pillar',
  standalone: true,
  imports: [CommonModule, RouterModule, ScheduleCallComponent],
  templateUrl: './pillar.component.html',
  styleUrl: '../about/about.component.css'
})
export class PillarComponent implements OnInit {
  pillar: PillarContent = PILLARS['mobile'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const key = this.route.snapshot.data['pillar'] as string;
    this.pillar = PILLARS[key] ?? PILLARS['mobile'];
  }
}
