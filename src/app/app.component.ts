import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
// Debugger API Key import
import { environment } from '../environments/environment';
// Logout Logic
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'marketplace';
  isLoggedIn = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
    // Debugger API Key
    //console.log('🔥 Firebase config loaded:', environment.firebaseConfig);
    //const key = environment.firebaseConfig.apiKey;
    //console.log('🔑 apiKey full:', key);
    //console.log('🔑 apiKey length:', key.length);
    //console.log('📂 storageBucket:', environment.firebaseConfig.storageBucket);
  }

  logout() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['/auth/login']);
    });
  }
}
