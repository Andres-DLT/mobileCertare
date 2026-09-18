import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'certare';
  isLoggedIn = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;

    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: '#0b1220' });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }

  logout() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['/auth/login']);
    });
  }
}