import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CxHeroComponent } from './cx-hero.component';
import { CxCardComponent } from './cx-card.component';
import { CxFilterBarComponent } from './cx-filter-bar.component';
import { CxEmptyStateComponent } from './cx-empty-state.component';
import { CxCtaSectionComponent } from './cx-cta-section.component';

describe('Shared UI components', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CxHeroComponent,
        CxCardComponent,
        CxFilterBarComponent,
        CxEmptyStateComponent,
        CxCtaSectionComponent,
      ],
    }).compileComponents();
  });

  it('renders the hero with CTAs and stats', () => {
    const fixture: ComponentFixture<CxHeroComponent> = TestBed.createComponent(CxHeroComponent);
    fixture.componentInstance.title = 'Certare';
    fixture.componentInstance.primaryLabel = 'Schedule';
    fixture.componentInstance.stats = [{ value: '60', label: 'Services' }];
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Certare');
    expect(text).toContain('Schedule');
    expect(text).toContain('60');
  });

  it('emits card actions with an accessible label', () => {
    const fixture: ComponentFixture<CxCardComponent> = TestBed.createComponent(CxCardComponent);
    const component = fixture.componentInstance;
    component.title = 'API Testing';
    component.actionLabel = '+';
    component.actionAriaLabel = 'Add API Testing to shortlist';
    spyOn(component.action, 'emit');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Add API Testing to shortlist');
    button.click();
    expect(component.action.emit).toHaveBeenCalled();
  });

  it('marks selected filter chips with aria-pressed and clears all', () => {
    const fixture: ComponentFixture<CxFilterBarComponent> = TestBed.createComponent(CxFilterBarComponent);
    const component = fixture.componentInstance;
    component.groups = [{ key: 'sector', label: 'Practice', options: [
      { key: 'all', label: 'All' },
      { key: 'ai', label: 'AI' },
    ]}];
    component.selection = { sector: 'ai' };
    component.collapsibleGroups = [{ key: 'group', label: 'Category', options: [{ key: 'all', label: 'All' }] }];
    spyOn(component.selectionChange, 'emit');
    spyOn(component.searchChange, 'emit');
    fixture.detectChanges();
    const active = fixture.nativeElement.querySelector('.cx-chip.active') as HTMLButtonElement;
    expect(active.getAttribute('aria-pressed')).toBe('true');
    expect(active.textContent).toContain('AI');
    fixture.nativeElement.querySelector('.cx-filter-trigger').click();
    fixture.detectChanges();
    expect(component.isOpen).toBeTrue();
    expect(fixture.nativeElement.querySelector('.cx-filter-trigger').getAttribute('aria-expanded')).toBe('true');
    fixture.nativeElement.querySelector('.cx-panel-reset').click();
    expect(component.selectionChange.emit).toHaveBeenCalledWith({ sector: 'all' });
    expect(component.searchChange.emit).toHaveBeenCalledWith('');
    component.closeFilters();
  });

  it('emits empty-state actions', () => {
    const fixture: ComponentFixture<CxEmptyStateComponent> = TestBed.createComponent(CxEmptyStateComponent);
    const component = fixture.componentInstance;
    component.message = 'Nothing matches.';
    component.actionLabel = 'Clear filters';
    spyOn(component.action, 'emit');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(component.action.emit).toHaveBeenCalled();
  });

  it('renders the CTA section links', () => {
    const fixture: ComponentFixture<CxCtaSectionComponent> = TestBed.createComponent(CxCtaSectionComponent);
    fixture.componentInstance.title = 'Start';
    fixture.componentInstance.primaryLabel = 'Schedule';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Schedule');
  });
});
