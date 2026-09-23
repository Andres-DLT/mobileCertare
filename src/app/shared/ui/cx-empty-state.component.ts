import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cx-empty-state',
  standalone: true,
  imports: [CommonModule],
  host: { role: 'status' },
  template: `
    <div class="cx-empty">
      <p>{{ message }}</p>
      <button *ngIf="actionLabel" class="cx-chip-active" type="button" (click)="action.emit()">
        {{ actionLabel }}
      </button>
    </div>
  `,
  styles: [`
    .cx-empty {
      text-align: center; padding: 56px 16px; background: var(--surface);
      border: 1px dashed var(--border); border-radius: var(--radius-lg);
    }
    .cx-empty p { margin: 0 0 16px; color: var(--text-muted); }
    .cx-chip-active {
      min-height: var(--touch-min); padding: 8px 16px; border-radius: var(--radius-full);
      background: var(--accent-action); color: #fff;
      border: none; font-weight: 600; cursor: pointer;
    }
  `]
})
export class CxEmptyStateComponent {
  @Input() message = 'Nothing here yet.';
  @Input() actionLabel = '';
  @Output() action = new EventEmitter<void>();
}
