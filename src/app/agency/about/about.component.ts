import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScheduleCallComponent } from '../schedule-call/schedule-call.component';
import { SeoService } from '../../shared/seo.service';
import { CxHeroComponent } from '../../shared/ui/cx-hero.component';
import { CxCtaSectionComponent } from '../../shared/ui/cx-cta-section.component';
import { CxCardComponent } from '../../shared/ui/cx-card.component';
import { InsightService, Insight } from '../insight.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, ScheduleCallComponent, CxHeroComponent, CxCtaSectionComponent, CxCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  insights: Insight[] = [];
  private sub?: Subscription;

  constructor(
    private seo: SeoService,
    private insightsService: InsightService
  ) {}

  ngOnInit() {
    this.seo.setPage({
      title: 'About',
      description: 'Certare is a technology consultancy across mobile, web, testing, AI and training. How we work and how to start.',
      path: '/agency/about',
    });
    this.sub = this.insightsService.getInsights().subscribe({
      next: (items) => (this.insights = items ?? []),
      error: () => (this.insights = []),
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
