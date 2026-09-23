import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cx-cta-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="cx-cta" aria-label="Call to action">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="cx-cta-actions">
        <a class="cx-btn-primary" [routerLink]="primaryLink">{{ primaryLabel }}</a>
        <a *ngIf="secondaryLabel" class="cx-btn-secondary" [routerLink]="secondaryLink">{{ secondaryLabel }}</a>
      </div>
    </section>
  `,
  styles: [`
    .cx-cta {
      margin: 56px auto 0; max-width: 920px; text-align: center;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 40px 28px;
    }
    .cx-cta h2 { font-family: var(--font-display); font-size: var(--text-3xl); margin: 0 0 12px; }
    .cx-cta p { font-size: var(--text-lg); max-width: 640px; margin: 0 auto; }
    .cx-cta-actions { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; margin-top: var(--space-5); }
    .cx-btn-primary, .cx-btn-secondary {
      display: inline-flex; align-items: center; min-height: var(--touch-min);
      padding: 0 var(--space-5); border-radius: var(--radius); font-weight: 700;
      font-size: var(--text-md); text-decoration: none;
    }
    .cx-btn-primary { background: linear-gradient(90deg, var(--accent), #7c6cf6); color: #fff; }
    .cx-btn-secondary { border: 1px solid var(--border); color: var(--text); }
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
