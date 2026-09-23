import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { InsightService } from '../agency/insight.service';

describe('Public home', () => {
  it('offers all five practices and a path to discovery without login', async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [{ provide: InsightService, useValue: { getInsights: () => of([]) } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelectorAll('.practice-link').length).toBe(5);
    expect(root.querySelector('a.primary-action')?.getAttribute('href')).toBe('/agency/schedule');
    expect(root.textContent).toContain('Software delivery with the risks in plain sight');
  });
});
