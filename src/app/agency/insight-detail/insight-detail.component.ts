import { TranslatePipe } from '../../shared/language.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, timeout } from 'rxjs';
import { Insight, InsightService } from '../insight.service';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-insight-detail',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterLink],
  template: `
    <main class="insight-page" id="main-content">
      <nav aria-label="Breadcrumb"><a routerLink="/">{{ 'Home' | tr }}</a> / <a routerLink="/agency/about">{{ 'Agency' | tr }}</a> / Insight</nav>
      <p *ngIf="loading" role="status">Loading insight…</p>
      <div *ngIf="error" role="alert"><h1>Insight unavailable</h1><p>{{ error }}</p><a routerLink="/agency/about">Explore our approach</a></div>
      <article *ngIf="insight as item">
        <header><p class="eyebrow">Industry context · {{ item.readingTime }} min read</p><h1>{{ item.title | tr }}</h1><p class="intro">{{ item.excerpt | tr }}</p></header>
        <p class="body-paragraph" *ngFor="let paragraph of paragraphs">{{ paragraph | tr }}</p>
        <div class="tags"><span *ngFor="let tag of item.tags">{{ tag | tr }}</span></div>
        <aside class="insight-end"><h2>Explore the work behind the topic</h2><p>Browse relevant services and discuss your own constraints with Certare.</p><a routerLink="/products/list">{{ 'Explore services' | tr }}</a><a routerLink="/agency/schedule">{{ 'Start a conversation' | tr }}</a></aside>
      </article>
    </main>
  `,
  styles: [`
    .insight-page { max-width: 880px; margin: 0 auto; padding: calc(88px + var(--safe-top)) var(--space-5) var(--space-7); }
    nav { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); } nav a { color: var(--text-muted); text-decoration: underline; }
    header { padding: var(--space-7) 0; border-bottom: 2px solid var(--border-strong); }
    .eyebrow { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
    h1 { font-size: clamp(2.1rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.08; }
    .intro { font-size: 1.18rem; line-height: 1.6; }
    .body-paragraph { font-size: 1.06rem; line-height: 1.8; margin: var(--space-6) 0; }
    .tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .tags span { padding: 2px 8px; background: var(--surface-2); border-radius: 4px; color: var(--text-muted); font-family: var(--font-mono); font-size: var(--text-xs); }
    .insight-end { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--space-5); margin-top: var(--space-7); }
    .insight-end a { display: inline-flex; min-height: var(--touch-min); align-items: center; margin-right: var(--space-4); font-weight: 600; text-decoration: underline; text-underline-offset: 5px; }
  `],
})
export class InsightDetailComponent implements OnInit, OnDestroy {
  insight?: Insight;
  loading = true;
  error = '';
  private sub?: Subscription;

  constructor(private route: ActivatedRoute, private insights: InsightService, private seo: SeoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.insights.getInsights().pipe(timeout({ first: 15000 })).subscribe({
      next: items => {
        this.insight = items.find(item => item.id === id);
        this.loading = false;
        if (this.insight) this.seo.setPage({ title: this.insight.title, description: this.insight.excerpt, path: `/agency/insights/${encodeURIComponent(id ?? '')}` });
        else this.error = 'This insight is not available.';
      },
      error: () => { this.loading = false; this.error = 'Unable to load this insight. Please try again.'; },
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  get paragraphs(): string[] { return this.insight?.body.split(/\n\n/).filter(Boolean) ?? []; }
}
