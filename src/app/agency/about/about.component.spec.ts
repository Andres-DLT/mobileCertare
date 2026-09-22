import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule]
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
  });

  it('offers a scheduling call to action', () => {
    expect(fixture.nativeElement.querySelector('app-schedule-call')).not.toBeNull();
  });

  it('renders mission, stats, team and contact sections', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Mission');
    expect(text).toContain('By the numbers');
    expect(text).toContain('Team');
    expect(text).toContain('Contact');
  });
});
