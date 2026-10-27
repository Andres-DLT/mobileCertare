import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ServiceDetailComponent } from './service-detail.component';
import { CatalogItem, ProductService } from '../product-services';

describe('Service detail', () => {
  const service: CatalogItem = {
    id: 'ios-development', title: 'iOS Development', description: 'Native applications.',
    sector: 'mobile', sectorLabel: 'Mobile', group: 'Development', price: 35000,
    deliverables: ['Code repository'],
  };

  it('resolves a service and links directly to a conversation', async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailComponent, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: { getService: () => of(service), getCollection: () => of([service]) } },
        { provide: ActivatedRoute, useValue: { paramMap: new BehaviorSubject(convertToParamMap({ sector: 'mobile', id: 'ios-development' })) } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ServiceDetailComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('h1')?.textContent).toBe('iOS Development');
    expect(root.textContent).toContain('Code repository');
    const contact = root.querySelector('.detail-add') as HTMLAnchorElement;
    expect(contact.getAttribute('href')).toContain('/agency/schedule');
    expect(contact.getAttribute('href')).toContain('service=iOS');
    expect(root.textContent).not.toContain('shortlist');
  });

  it('loads new service data and clears state when route parameters change', async () => {
    const params = new BehaviorSubject(convertToParamMap({ sector: 'mobile', id: 'ios-development' }));
    const next = { ...service, id: 'android-development', title: 'Android Development' };
    const products = jasmine.createSpyObj('ProductService', ['getService', 'getCollection']);
    products.getService.and.callFake((_sector: string, id: string) => of(id === service.id ? service : next));
    products.getCollection.and.returnValue(of([service, next]));
    await TestBed.configureTestingModule({
      imports: [ServiceDetailComponent, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: products },
        { provide: ActivatedRoute, useValue: { paramMap: params } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ServiceDetailComponent);
    fixture.detectChanges();
    params.next(convertToParamMap({ sector: 'mobile', id: next.id }));
    fixture.detectChanges();
    expect(fixture.componentInstance.service?.id).toBe(next.id);
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe(next.title);
  });

});
