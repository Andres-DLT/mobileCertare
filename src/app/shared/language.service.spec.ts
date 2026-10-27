import { TestBed } from '@angular/core/testing';
import { LanguageService, TranslatePipe } from './language.service';

describe('LanguageService', () => {
  afterEach(() => {
    localStorage.removeItem('certare.language');
    document.documentElement.lang = 'en';
  });

  it('switches translated content, persists the selection and updates the document language', () => {
    localStorage.removeItem('certare.language');
    TestBed.configureTestingModule({});
    const language = TestBed.inject(LanguageService);
    const pipe = new TranslatePipe(language);
    expect(pipe.transform('DevOps Essentials')).toBe('DevOps Essentials');
    language.setLanguage('es');
    expect(pipe.transform('DevOps Essentials')).toBe('Fundamentos de DevOps');
    expect(pipe.transform('Certare')).toBe('Certare');
    expect(localStorage.getItem('certare.language')).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    language.setLanguage('en');
    expect(pipe.transform('DevOps Essentials')).toBe('DevOps Essentials');
  });
});
