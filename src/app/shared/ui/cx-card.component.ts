import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type CxCardVariant = 'service' | 'stage' | 'insight' | 'capability' | 'featured';

@Component({
  selector: 'cx-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="cx-card" [attr.data-variant]="variant" [attr.data-sector]="sector">
      <span class="cx-card-mark" *ngIf="variant === 'service'" aria-hidden="true">{{ title.charAt(0) }}</span>
      <div class="cx-card-top">
        <span class="cx-card-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
        <span class="cx-card-badge" *ngIf="badge">{{ badge }}</span>
      </div>
      <h3 class="cx-card-title">
        <a *ngIf="detailLink; else plainTitle" [routerLink]="detailLink">{{ title }}</a>
        <ng-template #plainTitle>{{ title }}</ng-template>
      </h3>
      <p class="cx-card-desc" *ngIf="description">{{ description }}</p>
      <div class="cx-card-tags" *ngIf="tags?.length">
        <span class="cx-tag" *ngFor="let tag of tags">{{ tag }}</span>
      </div>
      <div class="cx-card-foot" *ngIf="priceLabel || actionLabel">
        <span class="cx-card-price" *ngIf="priceLabel">{{ priceLabel }}</span>
        <a *ngIf="detailLink && variant === 'service'" class="cx-card-detail" [routerLink]="detailLink" [attr.aria-label]="'Explore ' + title">Details <span aria-hidden="true">↗</span></a>
        <button
          *ngIf="actionLabel"
          class="cx-card-action"
          type="button"
          (click)="action.emit()"
          [attr.aria-label]="actionAriaLabel || actionLabel">
          {{ actionLabel }}
        </button>
      </div>
    </article>
  `,
  styles: [`
    .cx-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: var(--space-5); width: 100%;
      display: flex; flex-direction: column; min-width: 0;
      transition: border-color var(--motion-fast), transform var(--motion-fast);
    }
    .cx-card:hover { border-color: var(--accent-2); transform: translateY(-2px); }
    .cx-card[data-variant="service"] { border-top: 2px solid var(--accent); }
    .cx-card[data-sector="mobile"] { border-top-color: #9e8cf5; }
    .cx-card[data-sector="web"] { border-top-color: #80a8f4; }
    .cx-card[data-sector="ai"] { border-top-color: var(--accent-2); }
    .cx-card[data-sector="training"] { border-top-color: #f0bc78; }
    .cx-card-mark { display: grid; place-items: center; width: 40px; height: 40px; margin-bottom: var(--space-4); background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-sm); font: 700 var(--text-2xl) var(--font-display); color: var(--accent-2); }
    .cx-card-top { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
    .cx-card-eyebrow {
      display: inline-block; padding: 3px 10px; border-radius: var(--radius-full);
      background: var(--accent-soft); color: var(--accent-2);
      font-size: var(--text-xs); font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    }
    .cx-card-badge {
      display: inline-block; padding: 3px 10px; border-radius: var(--radius-full);
      background: var(--surface-2); border: 1px solid var(--border); color: var(--text-muted);
      font-size: var(--text-xs); font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    }
    .cx-card-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; margin: 0 0 var(--space-2); }
    .cx-card-title a { color: var(--text); }
    .cx-card-title a:hover { color: var(--accent-2); }
    .cx-card-desc { font-size: var(--text-md); line-height: 1.6; margin: 0 0 var(--space-4); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .cx-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .cx-tag {
      padding: 3px 10px; border-radius: var(--radius-full); background: var(--surface-2);
      border: 1px solid var(--border); color: var(--text-muted);
      font-size: var(--text-xs); font-weight: 600;
    }
    .cx-card-foot { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; margin-top: auto; }
    .cx-card-detail { color: var(--accent-2); font-weight: 700; font-size: var(--text-sm); min-height: var(--touch-min); display: inline-flex; align-items: center; }
    .cx-card-price {
      padding: 0; font-weight: 700; font-size: var(--text-md); color: var(--accent-2);
    }
    .cx-card-action {
      min-width: var(--touch-min); min-height: var(--touch-min); border-radius: var(--radius);
      background: var(--accent-action); color: #fff;
      border: none; cursor: pointer; font-weight: 700; padding: 0 var(--space-4);
      display: inline-flex; align-items: center; justify-content: center;
    }
    @media (max-width: 600px) { .cx-card { padding: var(--space-4); } }
  `]
})
export class CxCardComponent {
  @Input() variant: CxCardVariant = 'service';
  @Input() eyebrow = '';
  @Input() badge = '';
  @Input() title = '';
  @Input() description = '';
  @Input() tags: string[] = [];
  @Input() priceLabel = '';
  @Input() actionLabel = '';
  @Input() actionAriaLabel = '';
  @Input() detailLink = '';
  @Input() sector = '';
  @Output() action = new EventEmitter<void>();
}
