import { TranslatePipe } from '../language.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cx-cta-section',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterModule],
  template: `
    <section class="cx-cta" aria-label="Call to action">
      <h2>{{ title | tr }}</h2>
      <p>{{ message | tr }}</p>
      <div class="cx-cta-actions">
        <a class="cx-btn-primary" [routerLink]="primaryLink">{{ primaryLabel | tr }}</a>
        <a *ngIf="secondaryLabel" class="cx-btn-secondary" [routerLink]="secondaryLink">{{ secondaryLabel | tr }}</a>
      </div>
    </section>
  `,
  styles: [`

    .cx-cta {
      margin: var(--space-8) 0 0; padding: var(--space-7) clamp(24px, 5vw, 56px);
      background: var(--text); color: var(--bg); border-radius: var(--radius-lg);
    }
    .cx-cta h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 600; color: var(--bg); margin: 0 0 var(--space-3); }
    .cx-cta p { font-size: var(--text-lg); line-height: 1.6; max-width: 620px; margin: 0; color: var(--bg); opacity: .8; }
    .cx-cta-actions { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-top: var(--space-5); }
    .cx-btn-primary, .cx-btn-secondary {
      display: inline-flex; align-items: center; min-height: 48px;
      padding: 0 var(--space-5); border-radius: var(--radius-sm); font-weight: 600;
      font-size: var(--text-md); text-decoration: none;
    }
    .cx-btn-primary { background: var(--signal); color: var(--on-signal); }
    .cx-btn-primary:hover { filter: brightness(1.08); }
    .cx-btn-secondary { border: 1px solid var(--bg); color: var(--bg); }
    @media (max-width: 600px) { .cx-cta-actions a { width: 100%; justify-content: center; } }
  `]
})
export class CxCtaSectionComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() primaryLabel = '';
  @Input() primaryLink: string | unknown[] = '/';
  @Input() secondaryLabel = '';
  @Input() secondaryLink: string | unknown[] = '/';
}
