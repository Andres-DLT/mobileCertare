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

  it('should create and present the three practices', () => {
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

  it('renders mission, stats, team and contact sections', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Mission');
    expect(text).toContain('By the numbers');
    expect(text).toContain('Team');
    expect(text).toContain('Contact');
  });
});
