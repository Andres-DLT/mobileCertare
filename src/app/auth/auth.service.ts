import { DestroyRef, Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';
// AngularFire 19 wraps function arguments as callbacks, which breaks the
// persistence constructor passed to setPersistence ("cls is not a constructor").
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from '../sales/cart.service';

const REMEMBER_ME_KEY = 'certare.rememberMe';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private persistenceReady: Promise<void>;

  constructor(
    private auth: Auth,
    private router: Router,
    private injector: EnvironmentInjector,
    private cartService: CartService,
    destroyRef: DestroyRef
  ) {
    // Restore the last "remember me" choice (default: stay signed in).
    this.persistenceReady = setPersistence(this.auth, this.storedPersistence());
    // Observe the rejection immediately; login/register still propagate it.
    this.persistenceReady.catch(error => console.error('[Auth] Persistence unavailable:', error));
    const unsubscribe = onAuthStateChanged(this.auth, user => {
      this.currentUser.next(user);
    });
    destroyRef.onDestroy(unsubscribe);
  }

  /** Last saved choice: true = stay signed in across restarts. */
  getRememberMe(): boolean {
    try {
      return localStorage.getItem(REMEMBER_ME_KEY) !== '0';
    } catch {
      return true;
    }
  }

  private storedPersistence() {
    return this.getRememberMe() ? browserLocalPersistence : browserSessionPersistence;
  }

  private async applyPersistence(rememberMe: boolean): Promise<void> {
    try {
      localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? '1' : '0');
    } catch {
      /* storage blocked: persistence choice still applies to this session */
    }
    // Must run before sign-in so it applies to the new session.
    await setPersistence(this.auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  }

  async login(email: string, password: string, rememberMe = true): Promise<UserCredential> {
    await this.persistenceReady;
    await this.applyPersistence(rememberMe);
    const credential = await runInInjectionContext(this.injector, () =>
      signInWithEmailAndPassword(this.auth, email.trim(), password)
    );
    this.currentUser.next(credential.user);
    return credential;
  }

  async register(email: string, password: string, fullName?: string): Promise<UserCredential> {
    await this.persistenceReady;
    const credential = await runInInjectionContext(this.injector, () =>
      createUserWithEmailAndPassword(this.auth, email.trim(), password)
    );
    if (fullName?.trim()) {
      await runInInjectionContext(this.injector, () =>
        updateProfile(credential.user, { displayName: fullName.trim() })
      );
    }
    this.currentUser.next(credential.user);
    return credential;
  }

  async logout(): Promise<void> {
    await runInInjectionContext(this.injector, () => firebaseSignOut(this.auth));
    this.currentUser.next(null);
    this.cartService.clearCart();
    await this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
}
