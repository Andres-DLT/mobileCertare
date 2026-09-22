import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ScheduleComponent } from './schedule.component';
import { DiscoveryService } from '../discovery.service';
import { Auth } from '@angular/fire/auth';

describe('ScheduleComponent', () => {
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    const discoverySpy = jasmine.createSpyObj('DiscoveryService', ['createRequest', 'listMyRequests']);
    discoverySpy.listMyRequests.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ScheduleComponent],
      providers: [
        { provide: DiscoveryService, useValue: discoverySpy },
        { provide: Auth, useValue: { currentUser: null } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    fixture.detectChanges();
  });

  it('should create with a request form', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.request-form')).not.toBeNull();
  });

  it('requires name, email and message before sending', async () => {
    const component = fixture.componentInstance;
    await component.sendRequest();
    expect(component.errorMessage).toContain('required');
  });
});
