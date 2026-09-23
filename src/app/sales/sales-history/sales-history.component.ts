import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiscoveryService, DiscoveryRequest } from '../../agency/discovery.service';
import { CxEmptyStateComponent } from '../../shared/ui/cx-empty-state.component';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule, RouterModule, CxEmptyStateComponent],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit, OnDestroy {
  requests: DiscoveryRequest[] = [];
  loading = true;
  loadError = '';
  private sub?: Subscription;

  constructor(
    private discovery: DiscoveryService,
    private router: Router
  ) {}

  goSchedule() {
    this.router.navigate(['/agency/schedule']);
  }

  ngOnInit() {
    this.sub = this.discovery.listMyRequests().subscribe({
      next: (data) => {
        this.requests = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.requests = [];
        this.loading = false;
        this.loadError = 'Could not load your requests. Try again later.';
      },
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
