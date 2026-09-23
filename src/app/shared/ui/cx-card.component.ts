import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CxCardVariant = 'service' | 'stage' | 'insight' | 'capability' | 'featured';

@Component({
  selector: 'cx-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="cx-card" [attr.data-variant]="variant">
      <div class="cx-card-top">
        <span class="cx-card-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
        <span class="cx-card-badge" *ngIf="badge">{{ badge }}</span>
      </div>
      <h3 class="cx-card-title">{{ title }}</h3>
      <p class="cx-card-desc" *ngIf="description">{{ description }}</p>
      <div class="cx-card-tags" *ngIf="tags?.length">
        <span class="cx-tag" *ngFor="let tag of tags">{{ tag }}</span>
      </div>
      <div class="cx-card-foot" *ngIf="priceLabel || actionLabel">
        <span class="cx-card-price" *ngIf="priceLabel">{{ priceLabel }}</span>
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
      border-radius: var(--radius-lg); padding: 22px 24px; width: 100%;
      box-shadow: var(--shadow-1);
    }
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
    .cx-card-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; margin: 0 0 6px; }
    .cx-card-desc { font-size: var(--text-md); line-height: 1.55; margin: 0 0 14px; }
    .cx-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .cx-tag {
      padding: 3px 10px; border-radius: var(--radius-full); background: var(--surface-2);
      border: 1px solid var(--border); color: var(--text-muted);
      font-size: var(--text-xs); font-weight: 600;
    }
    .cx-card-foot { display: flex; gap: 14px; align-items: center; }
    .cx-card-price {
      background: var(--surface); padding: 0.6rem 1.4rem; border: 1px solid var(--border);
      border-radius: var(--radius-full); font-weight: 800; font-size: 1.15rem; color: var(--accent-2);
    }
    .cx-card-action {
      min-width: var(--touch-min); min-height: var(--touch-min); border-radius: var(--radius);
      background: linear-gradient(90deg, var(--accent), #7c6cf6); color: #fff;
      border: none; cursor: pointer; font-weight: 700; padding: 0 var(--space-4);
      display: inline-flex; align-items: center; justify-content: center;
    }
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
  @Output() action = new EventEmitter<void>();
}
