import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  template: `
    <div class="app-container">
  <nav *ngIf="showNav" class="app-nav">
        <div class="nav-left">
          <a class="brand" routerLink="/dashboard">Módulo Clientes</a>
        </div>
        <div class="nav-center">
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/clientes" routerLinkActive="active">Clientes</a>
          <a routerLink="/clientes/nuevo" routerLinkActive="active">Nuevo cliente</a>
        </div>
        <div class="nav-right">
          <span *ngIf="auth.isLoggedIn()" class="user">{{ auth.getUsername() }}</span>
          <a *ngIf="!auth.isLoggedIn()" routerLink="/login">Entrar</a>
          <button *ngIf="auth.isLoggedIn()" class="btn-ghost" (click)="logout()">Cerrar sesión</button>
        </div>
      </nav>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Módulo Clientes.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container { min-height:100vh; display:flex; flex-direction:column; }
    .app-nav { display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1rem; background:#ffffff; border-bottom:1px solid #e6e6e6; }
    .nav-left .brand { font-weight:700; color:#0f172a; text-decoration:none; }
    .nav-center { display:flex; gap:1rem; }
    .nav-center a { color:#374151; text-decoration:none; padding:0.35rem 0.5rem; border-radius:4px; }
    .nav-center a.active { background:#f3f4f6; }
    .nav-right { display:flex; gap:0.5rem; align-items:center; }
    .user { color:#374151; font-weight:600; }
    .btn-ghost { background:transparent; border:1px solid #e6e6e6; padding:0.4rem 0.6rem; border-radius:6px; }

    .app-main { flex:1; padding:1.5rem; max-width:1200px; width:100%; margin:0 auto; }
    .app-footer { text-align:center; padding:1rem 0; color:#6b7280; }
  `]
})
export class AppComponent implements OnDestroy {
  showNav = true;
  private sub: any;

  constructor(public auth: AuthService, private router: Router) {
    // set initial visibility
    this.showNav = !(this.router.url === '/login' || this.router.url.startsWith('/login'));

    // update visibility on navigation
    this.sub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.urlAfterRedirects || evt.url;
        this.showNav = !(url === '/login' || url.startsWith('/login'));
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

