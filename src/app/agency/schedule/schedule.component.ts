import { TranslatePipe, LanguageService } from '../../shared/language.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Auth } from '@angular/fire/auth';
import { DiscoveryService } from '../discovery.service';
import { SeoService } from '../../shared/seo.service';
import { environment } from '../../../environments/environment';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, RouterModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleUrl = environment.scheduleUrl;
  safeScheduleUrl: SafeResourceUrl | null = null;
  @ViewChild('stepHeading') stepHeading?: ElementRef<HTMLElement>;

  readonly stepLabels = ['You', 'Your project', 'Review'];
  readonly stepTitles = ['Who should we reply to?', 'What are you working on?', 'Check your request'];
  step = 1;
  sent = false;

  readonly services = ['Development', 'Quality engineering', 'AI evaluation', 'Training', 'Not sure yet'];
  readonly timelines = ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Exploring options'];
  readonly budgets = ['Under MX$25k', 'MX$25k–50k', 'MX$50k–100k', 'Over MX$100k', 'Not sure yet'];

  name = '';
  email = '';
  company = '';
  role = '';
  country = '';
  service = '';
  timeline = '';
  budget = '';
  message = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  website = '';

  get companyLine(): string {
    return [this.company, this.role, this.country].map(value => value.trim()).filter(Boolean).join(' · ');
  }

  get legalReady(): boolean {
    const legal = environment.legal;
    return Boolean(legal.entityName && legal.address && legal.email);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private auth: Auth,
    private discovery: DiscoveryService,
    private seo: SeoService,
    private route: ActivatedRoute,
    private language: LanguageService
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
    const selectedService = this.route.snapshot.queryParamMap.get('service')?.trim().slice(0, 150);
    if (selectedService && !this.message) {
      this.message = this.language.language === 'es'
        ? `Me gustaría conocer más sobre ${selectedService}. Mi proyecto consiste en: `
        : `I would like to discuss ${selectedService}. My project context is: `;
    }
    const user = this.auth.currentUser;
    if (user) {
      this.name = user.displayName ?? '';
      this.email = user.email ?? '';
    }
  }

  /** Validates the current step before moving on; the last step sends. */
  submitStep() {
    if (this.step < this.stepLabels.length) this.next();
    else void this.sendRequest();
  }

  next() {
    this.errorMessage = '';
    if (this.step === 1 && (this.name.trim().length < 2 || !EMAIL_PATTERN.test(this.email.trim()))) {
      this.errorMessage = 'Enter your name and a valid email.';
      return;
    }
    if (this.step === 2 && this.message.trim().length < 15) {
      this.errorMessage = 'Tell us about your project in at least 15 characters.';
      return;
    }
    this.goTo(this.step + 1);
  }

  back() {
    this.goTo(this.step - 1);
  }

  goTo(step: number) {
    this.errorMessage = '';
    this.step = Math.min(Math.max(step, 1), this.stepLabels.length);
    this.focusHeading();
  }

  reset() {
    this.sent = false;
    this.successMessage = '';
    this.step = 1;
    this.focusHeading();
  }

  private focusHeading() {
    setTimeout(() => this.stepHeading?.nativeElement.focus());
  }

  openBooking() {
    if (this.scheduleUrl) window.open(this.scheduleUrl, '_blank', 'noopener');
  }

  async sendRequest() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.website) return;
    if (this.name.trim().length < 2 || !EMAIL_PATTERN.test(this.email.trim()) || this.message.trim().length < 15) {
      this.errorMessage = 'Enter your name, a valid email and at least 15 characters about your project.';
      return;
    }
    const context = [
      this.company.trim() && `Company: ${this.company.trim()}`,
      this.role.trim() && `Role: ${this.role.trim()}`,
      this.country.trim() && `Country: ${this.country.trim()}`,
      this.service && `Service interest: ${this.service}`,
      this.timeline && `Timeline: ${this.timeline}`,
      this.budget && `Budget: ${this.budget}`,
    ].filter(Boolean).join('\n');
    const payloadMessage = `${context}${context ? '\n\n' : ''}${this.message.trim()}`;
    if (payloadMessage.length > 1500 || this.name.length > 100) {
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
        message: payloadMessage,
      });
      this.successMessage = 'Request received. We will reply by email to arrange a call and agree on the next step.';
      this.sent = true;
      this.focusHeading();
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
