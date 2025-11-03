import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Iniciar sesión</h2>
        <form (ngSubmit)="submit()">
          <label>
            Usuario
            <input [(ngModel)]="username" name="username" required />
          </label>

          <label>
            Contraseña
            <input [(ngModel)]="password" name="password" type="password" required />
          </label>

          <div class="actions">
            <button class="btn-primary" type="submit">Entrar</button>
          </div>

          <p *ngIf="error" class="error">Credenciales incorrectas</p>
          <p class="hint">Demo: usuario <strong>admin</strong> / contraseña <strong>admin</strong></p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:60vh;
    }

    .login-card {
      width: 360px;
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      display:flex;
      flex-direction:column;
      gap:0.75rem;
    }

    .login-card h2 { margin: 0 0 0.5rem 0; }

    label { display:flex; flex-direction:column; font-size:0.9rem; color:#333; }
    input { padding:0.5rem; margin-top:0.5rem; border:1px solid #e6e6e6; border-radius:4px; }

    .actions { display:flex; justify-content:flex-end; margin-top:0.5rem; }

    .btn-primary { background:#0f172a; color:white; border:none; padding:0.6rem 1rem; border-radius:6px; }

    .error { color:#b91c1c; font-size:0.9rem; }
    .hint { font-size:0.85rem; color:#6b7280; margin-top:0.5rem; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = false;
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }
}
