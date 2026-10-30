import { TranslatePipe } from '../language.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface HeroStat {
  value: string;
  label: string;
}

@Component({
  selector: 'cx-hero',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterModule],
  template: `
    <section class="cx-hero" [class.cx-hero-compact]="compact">
      <span class="cx-eyebrow" *ngIf="eyebrow">{{ eyebrow | tr }}</span>
      <h1 class="cx-display">{{ title | tr }}</h1>
      <p class="cx-lead" *ngIf="subtitle">{{ subtitle | tr }}</p>
      <div class="cx-hero-actions" *ngIf="primaryLabel || secondaryLabel">
        <a *ngIf="primaryLabel" class="cx-btn-primary" [routerLink]="primaryLink">{{ primaryLabel | tr }}</a>
        <a *ngIf="secondaryLabel" class="cx-btn-secondary" [routerLink]="secondaryLink">{{ secondaryLabel | tr }}</a>
      </div>
      <dl class="cx-hero-stats" *ngIf="stats.length">
        <div class="cx-stat" *ngFor="let stat of stats">
          <dt>{{ stat.label | tr }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
      <ng-content></ng-content>
    </section>
  `,
  styles: [`

    .cx-hero { padding: var(--space-7) 0 var(--space-6); max-width: 820px; }
    .cx-hero.cx-hero-compact { padding: var(--space-6) 0 var(--space-5); }
    .cx-hero-compact .cx-display { font-size: clamp(2.2rem, 4.5vw, 3.4rem); }
    .cx-hero-compact .cx-hero-stats { margin-top: var(--space-4); }
    .cx-eyebrow {
      display: block; margin-bottom: var(--space-4);
      font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted);
    }
    .cx-display {
      font-family: var(--font-display); font-size: var(--text-display);
      font-weight: 600; line-height: 1.04; letter-spacing: -0.02em; margin: 0 0 var(--space-4);
    }
    .cx-lead { max-width: 620px; margin: 0; color: var(--text-muted); font-size: var(--text-lg); line-height: 1.6; }
    .cx-hero-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-top: var(--space-5); }
    .cx-btn-primary, .cx-btn-secondary {
      display: inline-flex; align-items: center; min-height: 48px;
      padding: 0 var(--space-5); border-radius: var(--radius-sm); font-weight: 600;
      font-size: var(--text-md); text-decoration: none;
    }
    .cx-btn-primary { background: var(--signal); color: var(--on-signal); }
    .cx-btn-primary:hover { filter: brightness(1.08); }
    .cx-btn-secondary { border: 1px solid var(--border-strong); color: var(--text); }
    .cx-hero-stats { display: flex; gap: var(--space-6); margin: var(--space-5) 0 0; padding: 0; flex-wrap: wrap; }
    .cx-stat { display: flex; flex-direction: column; }
    .cx-stat dd { font-family: var(--font-mono); font-size: var(--text-xl); color: var(--text); margin: 0; order: -1; }
    .cx-stat dt { font-size: var(--text-sm); color: var(--text-muted); }
    @media (max-width: 600px) { .cx-hero-actions a { width: 100%; justify-content: center; } }
  `]
})
export class CxHeroComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() primaryLabel = '';
  @Input() primaryLink: string | unknown[] = '/';
  @Input() secondaryLabel = '';
  @Input() secondaryLink: string | unknown[] = '/';
  @Input() stats: HeroStat[] = [];
  @Input() compact = false;
}
