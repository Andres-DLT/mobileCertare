import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { testProviders } from '../../testing/firebase-testing';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser', 'getRememberMe']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));
    authServiceSpy.getRememberMe.and.returnValue(true);

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

  it('defaults to the stored remember-me choice and passes it on login', async () => {
    expect(component.rememberMe).toBeTrue();
    expect(fixture.nativeElement.querySelector('input[name="rememberMe"]')).not.toBeNull();
    component.email = 'a@b.com';
    component.password = 'secret123';
    component.rememberMe = false;
    await component.login();
    const spy = TestBed.inject(AuthService) as unknown as jasmine.SpyObj<AuthService>;
    expect(spy.login).toHaveBeenCalledWith('a@b.com', 'secret123', false);
  });
});
