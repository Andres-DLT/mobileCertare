import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { COLLECTIONS } from '../collections/collection-config';
import { Insight, InsightService } from '../agency/insight.service';
import { CxCardComponent } from '../shared/ui/cx-card.component';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CxCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly practices = COLLECTIONS;
  insights: Insight[] = [];
  private insightsSub?: Subscription;

  constructor(private insightsService: InsightService, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Engineering for software that has to work',
      description: 'Explore mobile, web, quality engineering, AI evaluation and training with Certare. Understand the approach and start a discovery conversation.',
      path: '/',
    });
    this.insightsSub = this.insightsService.getInsights().subscribe({
      next: items => this.insights = items,
      error: () => this.insights = [],
    });
  }

  ngOnDestroy(): void {
    this.insightsSub?.unsubscribe();
  }
}
