import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'mc_user';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // simple client-side check for demo purposes only
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(this.storageKey, JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getUsername(): string | null {
    const v = localStorage.getItem(this.storageKey);
    if (!v) return null;
    try { return JSON.parse(v).username; } catch { return null; }
  }
}
