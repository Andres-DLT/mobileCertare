import { TranslatePipe } from '../language.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cx-empty-state',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  host: { role: 'status' },
  template: `
    <div class="cx-empty">
      <p>{{ message | tr }}</p>
      <button *ngIf="actionLabel" class="cx-chip-active" type="button" (click)="action.emit()">
        {{ actionLabel | tr }}
      </button>
    </div>
  `,
  styles: [`

    .cx-empty {
      text-align: center; padding: 56px 16px; background: transparent;
      border: 1px dashed var(--surface-3); border-radius: var(--radius);
    }
    .cx-empty p { margin: 0 0 16px; color: var(--text-muted); font-size: var(--text-lg); }
    .cx-chip-active {
      min-height: var(--touch-min); padding: 0 var(--space-5); border-radius: var(--radius-sm);
      background: transparent; color: var(--text); border: 1px solid var(--border-strong);
      font: 600 var(--text-md) var(--font-body); cursor: pointer;
    }
    .cx-chip-active:hover { background: var(--surface-2); }
  `]
})
export class CxEmptyStateComponent {
  @Input() message = 'Nothing here yet.';
  @Input() actionLabel = '';
  @Output() action = new EventEmitter<void>();
}
