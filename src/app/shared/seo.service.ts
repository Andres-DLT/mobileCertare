import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

/** Per-route SEO: title, description, Open Graph and canonical URL. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  setPage(page: PageSeo): void {
    const url = environment.siteUrl.replace(/\/$/, '') + page.path;
    this.title.setTitle(page.title + ' — Certare');
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title + ' — Certare' });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
}
