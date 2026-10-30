import { TranslatePipe } from '../language.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type CxCardVariant = 'service' | 'stage' | 'insight' | 'capability' | 'featured';

@Component({
  selector: 'cx-card',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterLink],
  template: `
    <article class="cx-card" [attr.data-variant]="variant" [attr.data-sector]="sector">
      <div class="cx-card-top" *ngIf="eyebrow || badge">
        <span class="cx-card-eyebrow" *ngIf="eyebrow">{{ eyebrow | tr }}</span>
        <span class="cx-card-badge" *ngIf="badge"><span class="cx-dot" *ngIf="sector" aria-hidden="true"></span>{{ badge | tr }}</span>
      </div>
      <h3 class="cx-card-title">
        <a *ngIf="detailLink; else plainTitle" [routerLink]="detailLink">{{ title | tr }}</a>
        <ng-template #plainTitle>{{ title | tr }}</ng-template>
      </h3>
      <p class="cx-card-desc" *ngIf="description">{{ description | tr }}</p>
      <div class="cx-card-tags" *ngIf="tags.length">
        <span class="cx-tag" *ngFor="let tag of tags">{{ tag | tr }}</span>
      </div>
      <div class="cx-card-foot" *ngIf="priceLabel || actionLabel || (detailLink && variant === 'service')">
        <span class="cx-card-price" *ngIf="priceLabel">{{ priceLabel | tr }}</span>
        <a *ngIf="detailLink && variant === 'service'" class="cx-card-detail" [routerLink]="detailLink" [attr.aria-label]="('Details' | tr) + ': ' + (title | tr)">{{ "Details" | tr }} <span aria-hidden="true">→</span></a>
        <button
          *ngIf="actionLabel"
          class="cx-card-action"
          type="button"
          (click)="action.emit()"
          [attr.aria-label]="actionAriaLabel || actionLabel">
          {{ actionLabel | tr }}
        </button>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; --rule: var(--border-strong); }
    .cx-card[data-sector="mobile"] { --rule: var(--p-mobile); }
    .cx-card[data-sector="web"] { --rule: var(--p-web); }
    .cx-card[data-sector="ai"] { --rule: var(--p-ai); }
    .cx-card[data-sector="training"] { --rule: var(--p-training); }
    .cx-card[data-sector="testing"] { --rule: var(--p-testing); }
    .cx-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: var(--space-5); width: 100%; height: 100%;
      display: flex; flex-direction: column; min-width: 0;
      transition: border-color var(--motion-fast);
    }
    .cx-card:hover { border-color: var(--border-strong); }
    .cx-card[data-variant="service"] { border-top: 3px solid var(--rule); border-top-left-radius: 4px; border-top-right-radius: 4px; }
    .cx-card-top { display: flex; gap: var(--space-3); flex-wrap: wrap; align-items: center; margin-bottom: var(--space-3); }
    .cx-card-eyebrow, .cx-card-badge { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
    .cx-card-badge { display: inline-flex; align-items: center; gap: 6px; }
    .cx-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--rule); flex: none; }
    .cx-card-title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 600; line-height: 1.25; margin: 0 0 var(--space-2); }
    .cx-card-title a { color: var(--text); }
    .cx-card-title a:hover { text-decoration: underline; }
    .cx-card-desc { font-size: var(--text-md); line-height: 1.55; margin: 0 0 var(--space-4); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .cx-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--space-4); }
    .cx-tag {
      padding: 2px 8px; border-radius: 4px; background: var(--surface-2);
      color: var(--text-muted); font-family: var(--font-mono); font-size: var(--text-xs);
    }
    .cx-card-foot { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; margin-top: auto; }
    .cx-card-detail { color: var(--text); font-weight: 600; font-size: var(--text-sm); min-height: var(--touch-min); display: inline-flex; align-items: center; gap: 6px; text-decoration: underline; }
    .cx-card-price { font-family: var(--font-mono); font-weight: 500; font-size: var(--text-sm); color: var(--text); }
    .cx-card-action {
      min-width: var(--touch-min); min-height: var(--touch-min); border-radius: var(--radius-sm);
      background: transparent; color: var(--text); border: 1px solid var(--border-strong);
      cursor: pointer; font-weight: 600; padding: 0 var(--space-4);
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
