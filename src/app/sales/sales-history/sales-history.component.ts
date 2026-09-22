import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiscoveryService, DiscoveryRequest } from '../../agency/discovery.service';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit, OnDestroy {
  requests: DiscoveryRequest[] = [];
  loading = true;
  loadError = '';
  private sub?: Subscription;

  constructor(private discovery: DiscoveryService) {}

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
