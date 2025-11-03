import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './layout/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, SidebarComponent],
  template: `
  <div class="app">
    <ng-container *ngIf="!showShell">
      <main class="app-main"><router-outlet></router-outlet></main>
      <footer class="app-footer">&copy; 2024 Módulo Clientes.</footer>
    </ng-container>

    <ng-container *ngIf="showShell">
      <app-sidebar></app-sidebar>

      <div class="content">
        <header class="topbar">
          <div class="tb-left">
            <input class="search" type="search" placeholder="Buscar..." />
          </div>
          <div class="tb-right">
            <a class="btn-primary" routerLink="/clientes/nuevo">Nuevo Cliente</a>
            <a *ngIf="!auth.isLoggedIn()" routerLink="/login">Entrar</a>

            <div *ngIf="auth.isLoggedIn()" class="user-menu" (click)="$event.stopPropagation()">
              <button class="avatar" (click)="toggleMenu()" aria-label="User menu">
                <span>U</span>
              </button>
              <div class="menu" *ngIf="menuOpen">
                <a routerLink="/settings" (click)="closeMenu()">Settings</a>
                <a routerLink="/preferences" (click)="closeMenu()">User preferences</a>
                <button class="menu-item" (click)="logout(); closeMenu()">Log out</button>
              </div>
            </div>
          </div>
        </header>

        <main class="app-main">
          <router-outlet></router-outlet>
        </main>

        <footer class="app-footer">
          &copy; 2024 Módulo Clientes.
        </footer>
      </div>
    </ng-container>
  </div>
  `,
  styles: [`
    :host{--border:#e5e7eb;--muted:#6b7280;--bg:#f8fafc}
    .app{min-height:100vh;background:var(--bg);display:flex}
    .content{flex:1;display:flex;flex-direction:column;min-width:0}
    .topbar{height:64px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 16px;gap:12px;position:sticky;top:0;z-index:10}
    .search{width:420px;max-width:60vw;border:1px solid var(--border);border-radius:10px;padding:10px 12px;outline:0}
    .tb-right{display:flex;align-items:center;gap:.5rem}
    .user-menu{position:relative}
    .avatar{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;color:#0f172a;cursor:pointer}
    .menu{position:absolute;right:0;top:44px;background:#fff;border:1px solid var(--border);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.06);min-width:180px;padding:6px}
    .menu a,.menu .menu-item{display:block;width:100%;text-align:left;padding:8px 10px;border-radius:8px;color:#111827;text-decoration:none;background:transparent;border:none;cursor:pointer}
    .menu a:hover,.menu .menu-item:hover{background:#f3f4f6}
    .btn-primary{background:#1d4ed8;color:#fff;text-decoration:none;padding:8px 12px;border-radius:8px}
    .btn-ghost{background:transparent;border:1px solid var(--border);padding:8px 10px;border-radius:8px}
    .user{color:#0f172a;font-weight:600;margin:0 4px}
    .app-main{flex:1;padding:20px;max-width:1200px;margin:0 auto;width:100%}
    .app-footer{padding:14px;color:var(--muted);text-align:center}
  `]
})
export class AppComponent implements OnDestroy {
  showShell = true;
  private sub: any;
  menuOpen = false;

  constructor(public auth: AuthService, private router: Router) {
    this.showShell = !(this.router.url === '/login' || this.router.url.startsWith('/login'));
    this.sub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.urlAfterRedirects || evt.url;
        this.showShell = !(url === '/login' || url.startsWith('/login'));
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      setTimeout(() => {
        const onDoc = () => { this.menuOpen = false; document.removeEventListener('click', onDoc); };
        document.addEventListener('click', onDoc);
      });
    }
  }

  closeMenu() {
    this.menuOpen = false;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

