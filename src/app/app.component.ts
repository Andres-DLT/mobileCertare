import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationError } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Subscription, filter } from 'rxjs';

/** Session flag: a stale cached index.html can reference chunks from a
 *  previous release. Reload once so the browser fetches the fresh shell;
 *  never loop if the chunk is genuinely missing. */
const CHUNK_RELOAD_KEY = 'certare.chunkReloaded';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'certare';
  private routerSub?: Subscription;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationError => e instanceof NavigationError))
      .subscribe((e) => {
        if (this.isStaleChunkError(e.error) && !this.reloadedOnce()) {
          try {
            sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
          } catch {
            /* storage blocked: reload once anyway */
          }
          window.location.reload();
        }
      });
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setBackgroundColor({ color: '#0b1220' });
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setOverlaysWebView({ overlay: true });
      } catch (error) {
        console.warn('Status bar configuration unavailable:', error);
      }
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private isStaleChunkError(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error ?? '');
    return (
      message.includes('loading dynamically imported module') ||
      message.includes('ChunkLoadError') ||
      message.includes('Failed to fetch dynamically imported module')
    );
  }

  private reloadedOnce(): boolean {
    try {
      return sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1';
    } catch {
      return false;
    }
  }
}
