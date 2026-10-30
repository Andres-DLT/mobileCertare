import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ScheduleComponent } from './schedule.component';
import { DiscoveryService } from '../discovery.service';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

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
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ service: 'iOS Development' }) } } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    fixture.detectChanges();
  });

  it('should create with a request form', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.request-form')).not.toBeNull();
    expect(fixture.componentInstance.message).toContain('iOS Development');
  });

  it('walks through the three steps and validates each one', () => {
    const component = fixture.componentInstance;
    component.next();
    expect(component.step).toBe(1);
    expect(component.errorMessage).toContain('valid email');
    component.name = 'Visitor Example';
    component.email = 'visitor@example.com';
    component.next();
    expect(component.step).toBe(2);
    component.message = 'Too short';
    component.next();
    expect(component.step).toBe(2);
    component.message = 'We need an iOS application with a test strategy.';
    component.next();
    expect(component.step).toBe(3);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.review').textContent).toContain('visitor@example.com');
    expect(fixture.nativeElement.querySelector('[aria-current="step"]').textContent).toContain('Review');
  });

  it('requires name, email and message before sending', async () => {
    const component = fixture.componentInstance;
    await component.sendRequest();
    expect(component.errorMessage).toContain('valid email');
  });

  it('accepts a valid visitor request without a signed-in user', async () => {
    const discovery = TestBed.inject(DiscoveryService) as jasmine.SpyObj<DiscoveryService>;
    discovery.createRequest.and.resolveTo({} as never);
    localStorage.removeItem('certare.lastRequest');
    const component = fixture.componentInstance;
    component.name = 'Visitor Example';
    component.email = 'visitor@example.com';
    const message = 'We need an iOS application with a test strategy.';
    component.message = message;
    await component.sendRequest();
    expect(discovery.createRequest).toHaveBeenCalledWith({
      name: 'Visitor Example', email: 'visitor@example.com', message,
    });
    expect(component.successMessage).toContain('Request received');
    localStorage.removeItem('certare.lastRequest');
  });
});
