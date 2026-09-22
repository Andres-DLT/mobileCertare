import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Auth } from '@angular/fire/auth';
import { DiscoveryService } from '../discovery.service';
import { environment } from '../../../environments/environment';

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

  constructor(
    private sanitizer: DomSanitizer,
    private auth: Auth,
    private discovery: DiscoveryService
  ) {}

  ngOnInit() {
    if (this.scheduleUrl) {
      this.safeScheduleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.scheduleUrl);
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
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.errorMessage = 'Name, email and a short message are required.';
      return;
    }
    this.isLoading = true;
    try {
      await this.discovery.createRequest({
        name: this.name,
        email: this.email,
        message: this.message,
      });
      this.successMessage = 'Request sent. We reply within one business day.';
      this.message = '';
    } catch (err: unknown) {
      const e = err as Error;
      this.errorMessage = e?.message || 'Could not send the request. Try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
