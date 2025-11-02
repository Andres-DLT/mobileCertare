import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    // 1️⃣ Usa session persistence (ideal para dev)
    setPersistence(this.auth, browserSessionPersistence);

    // 2️⃣ Fuerza un signOut al arrancar (para limpiar cualquier sesión previa)
    firebaseSignOut(this.auth).catch(() => { /* ignora errores */ });

    // 3️⃣ Luego suscríbete a onAuthStateChanged normalmente
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // si Firebase sabe de un usuario, guardalo
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.next(user);
      } else {
        // si no, bórralo
        localStorage.removeItem('user');
        this.currentUser.next(null);
      }
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return firebaseSignOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    });
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }
}
