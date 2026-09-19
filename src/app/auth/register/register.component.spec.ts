import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { testProviders } from '../../testing/firebase-testing';
import { AuthService } from '../auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        ...testProviders,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
