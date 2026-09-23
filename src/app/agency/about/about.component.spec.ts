import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AboutComponent } from './about.component';
import { InsightService } from '../insight.service';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    const insightsSpy = jasmine.createSpyObj('InsightService', ['getInsights']);
    insightsSpy.getInsights.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule],
      providers: [{ provide: InsightService, useValue: insightsSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  });

  it('presents the five practices without requiring a member account', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Certare');
    expect(text).toContain('Mobile development');
    expect(text).toContain('Web development');
    expect(text).toContain('Global testing');
    expect(text).toContain('AI integration');
    expect(text).toContain('IT education');
  });

  it('offers a scheduling call to action', () => {
    expect(fixture.nativeElement.querySelector('cx-cta-section')).not.toBeNull();
  });

  it('describes the approach without publishing invented team or business figures', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Mission');
    expect(text).toContain('Working with Certare');
    expect(text).not.toContain('Replace with the real number');
    expect(text).not.toContain('Name — Mobile');
    expect(text).not.toContain('Email: pending');
  });
});
