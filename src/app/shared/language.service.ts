import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SPANISH } from './translations-es';

export type Language = 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  language: Language = 'en';

  constructor() {
    try {
      const saved = localStorage.getItem('certare.language');
      if (saved === 'es' || saved === 'en') this.language = saved;
    } catch { /* Browser storage is optional. */ }
    this.updateDocument();
  }

  setLanguage(language: Language): void {
    this.language = language;
    try { localStorage.setItem('certare.language', language); } catch { /* Optional. */ }
    this.updateDocument();
  }

  translate(value: string | null | undefined): string {
    if (!value) return '';
    return this.language === 'es' ? (SPANISH[value] ?? value) : value;
  }

  private updateDocument(): void {
    if (typeof document !== 'undefined') document.documentElement.lang = this.language;
  }
}

@Pipe({ name: 'tr', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private language: LanguageService) {}
  transform(value: string | null | undefined): string { return this.language.translate(value); }
}
