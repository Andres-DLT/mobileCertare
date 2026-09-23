import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Auth } from '@angular/fire/auth';
import { DiscoveryService } from '../discovery.service';
import { SeoService } from '../../shared/seo.service';
import { environment } from '../../../environments/environment';
import { CartService } from '../../sales/cart.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: '../about/about.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleUrl = environment.scheduleUrl;
  safeScheduleUrl: SafeResourceUrl | null = null;

  name = '';
  email = '';
  message = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  website = '';

  constructor(
    private sanitizer: DomSanitizer,
    private auth: Auth,
    private discovery: DiscoveryService,
    private seo: SeoService,
    private shortlist: CartService
  ) {}

  ngOnInit() {
    this.seo.setPage({
      title: 'Start a conversation',
      description: 'Share your project context with Certare. A visitor can request a discovery conversation without opening an account.',
      path: '/agency/schedule',
    });
    if (this.scheduleUrl) {
      this.safeScheduleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scheduleUrl);
    }
    const selected = this.shortlist.snapshot();
    if (selected.length && !this.message) {
      this.message = `I would like to discuss: ${selected.map(item => item.title).join(', ')}. My project context is: `;
    }
    const user = this.auth.currentUser;
    if (user) {
      this.name = user.displayName ?? '';
      this.email = user.email ?? '';
    }
  }

  openBooking() {
    if (this.scheduleUrl) window.open(this.scheduleUrl, '_blank', 'noopener');
  }

  async sendRequest() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.website) return;
    if (this.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim()) || this.message.trim().length < 15) {
      this.errorMessage = 'Enter your name, a valid email and at least 15 characters about your project.';
      return;
    }
    if (this.message.length > 1500 || this.name.length > 100) {
      this.errorMessage = 'Please shorten the message or name before sending.';
      return;
    }
    try {
      const last = Number(localStorage.getItem('certare.lastRequest') ?? 0);
      if (Date.now() - last < 60_000) {
        this.errorMessage = 'Please wait a minute before sending another request.';
        return;
      }
    } catch { /* Storage is optional; Firestore still validates payload. */ }
    this.isLoading = true;
    try {
      await this.discovery.createRequest({
        name: this.name,
        email: this.email,
        message: this.message,
      });
      this.successMessage = 'Request received. Certare can review the context you shared.';
      try { localStorage.setItem('certare.lastRequest', String(Date.now())); } catch { /* Optional throttle. */ }
      this.message = '';
    } catch (err: unknown) {
      const e = err as Error;
      this.errorMessage = e?.message || 'Could not send the request. Try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
