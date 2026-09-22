import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-schedule-call',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="schedule-call">
      <a class="chip active" routerLink="/agency/schedule">Schedule a discovery call</a>
      <p class="schedule-note" *ngIf="!scheduleUrl">Online booking opens soon — send a request below and we reply within one business day.</p>
    </div>
  `,
  styles: [`
    .schedule-call { display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0; }
    .schedule-note { color: var(--text-muted); font-size: 13px; margin: 0; text-align: center; }
  `]
})
export class ScheduleCallComponent {
  scheduleUrl = environment.scheduleUrl;
}
