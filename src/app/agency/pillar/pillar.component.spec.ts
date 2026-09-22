import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PillarComponent } from './pillar.component';
import { DevSectorService, DevStage } from '../dev-sector.service';

describe('PillarComponent', () => {
  const stages: DevStage[] = [
    { id: 'a', title: 'Discovery', description: 'Scope first', phase: 'Discovery', order: 1, deliverables: ['Roadmap'] },
    { id: 'b', title: 'Build', description: 'Ship it', phase: 'Development', order: 2, deliverables: ['App'] },
  ];

  async function setup(pillar: string, stagesValue: DevStage[]) {
    const devSpy = jasmine.createSpyObj('DevSectorService', ['getStages']);
    devSpy.getStages.and.returnValue(of(stagesValue));
    await TestBed.configureTestingModule({
      imports: [PillarComponent, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { pillar } } } },
        { provide: DevSectorService, useValue: devSpy },
      ]
    }).compileComponents();
    const fixture: ComponentFixture<PillarComponent> = TestBed.createComponent(PillarComponent);
    fixture.detectChanges();
    return { fixture, devSpy };
  }

  it('loads lifecycle stages for the mobile sector', async () => {
    const { fixture, devSpy } = await setup('mobile', stages);
    expect(devSpy.getStages).toHaveBeenCalledWith('mobile');
    expect(fixture.componentInstance.stages.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Lifecycle stages');
    expect(fixture.nativeElement.textContent).toContain('Discovery');
  });

  it('skips stages for the testing pillar and links the catalog', async () => {
    const { fixture, devSpy } = await setup('testing', []);
    expect(devSpy.getStages).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Browse the testing catalog');
  });
});
