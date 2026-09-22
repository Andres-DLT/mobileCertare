import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SalesHistoryComponent } from './sales-history.component';
import { DiscoveryService } from '../../agency/discovery.service';

describe('SalesHistoryComponent', () => {
  let component: SalesHistoryComponent;
  let fixture: ComponentFixture<SalesHistoryComponent>;

  beforeEach(async () => {
    const discoverySpy = jasmine.createSpyObj('DiscoveryService', ['listMyRequests']);
    discoverySpy.listMyRequests.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [SalesHistoryComponent, RouterTestingModule],
      providers: [{ provide: DiscoveryService, useValue: discoverySpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the empty state when there are no requests', () => {
    expect(fixture.nativeElement.textContent).toContain('No requests yet.');
  });
});
