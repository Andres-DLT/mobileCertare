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
  imports: [CommonModule, RouterModule],
  template: `
    <section class="cx-hero">
      <span class="cx-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
      <h1 class="cx-display">{{ title }}</h1>
      <p class="cx-lead" *ngIf="subtitle">{{ subtitle }}</p>
      <div class="cx-hero-actions" *ngIf="primaryLabel || secondaryLabel">
        <a *ngIf="primaryLabel" class="cx-btn-primary" [routerLink]="primaryLink">{{ primaryLabel }}</a>
        <a *ngIf="secondaryLabel" class="cx-btn-secondary" [routerLink]="secondaryLink">{{ secondaryLabel }}</a>
      </div>
      <dl class="cx-hero-stats" *ngIf="stats?.length">
        <div class="cx-stat" *ngFor="let stat of stats">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
      <ng-content></ng-content>
    </section>
  `,
  styles: [`
    .cx-hero { text-align: center; padding: var(--space-7) var(--space-2) var(--space-3); }
    .cx-eyebrow {
      display: inline-block; padding: 6px 14px; border-radius: var(--radius-full);
      background: var(--accent-soft); border: 1px solid var(--border); color: var(--accent-2);
      font-size: var(--text-xs); font-weight: 600; letter-spacing: 2px;
      text-transform: uppercase; margin-bottom: var(--space-4);
    }
    .cx-display {
      font-family: var(--font-display); font-size: var(--text-display);
      font-weight: 700; letter-spacing: 1px; margin: 0 0 14px;
    }
    .cx-lead { max-width: 560px; margin: 0 auto; color: var(--text-muted); font-size: var(--text-lg); line-height: 1.6; }
    .cx-hero-actions { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; margin-top: var(--space-5); }
    .cx-btn-primary, .cx-btn-secondary {
      display: inline-flex; align-items: center; min-height: var(--touch-min);
      padding: 0 var(--space-5); border-radius: var(--radius); font-weight: 700;
      font-size: var(--text-md); text-decoration: none;
    }
    .cx-btn-primary { background: linear-gradient(90deg, var(--accent), #7c6cf6); color: #fff; }
    .cx-btn-secondary { border: 1px solid var(--border); color: var(--text); }
    .cx-hero-stats { display: flex; justify-content: center; gap: var(--space-6); margin: 28px 0 0; padding: 0; flex-wrap: wrap; }
    .cx-stat { display: flex; flex-direction: column; align-items: center; }
    .cx-stat dd { font-family: var(--font-display); font-size: 22px; color: var(--text); margin: 0; order: -1; }
    .cx-stat dt { font-size: var(--text-xs); color: var(--text-muted); letter-spacing: 0.5px; }
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
}
