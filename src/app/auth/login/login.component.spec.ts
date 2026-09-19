import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { testProviders } from '../../testing/firebase-testing';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        ...testProviders,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
