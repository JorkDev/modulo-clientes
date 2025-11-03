import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dash-grid">
      <div class="card">
        <h3>Clientes</h3>
        <p>Gestión de clientes (demo). Accede a la lista de clientes.</p>
        <div class="card-actions">
          <button (click)="goTo('/clientes')" class="btn">Ir a Clientes</button>
        </div>
      </div>

      <div class="card">
        <h3>Demo opción</h3>
        <p>Opción demo para futuras funcionalidades.</p>
        <div class="card-actions">
          <button class="btn" (click)="noop()">Ver demo</button>
        </div>
      </div>

      <div class="card">
        <h3>Perfil</h3>
        <p>Información de la cuenta (demo).</p>
        <div class="card-actions">
          <button class="btn" (click)="noop()">Perfil</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; }
    .card { background:white; padding:1rem; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.04); }
    .card h3 { margin:0 0 0.5rem 0; }
    .card-actions { margin-top:1rem; display:flex; justify-content:flex-end; }
    .btn { background:#0f172a; color:white; border:none; padding:0.5rem 0.9rem; border-radius:6px; }
  `]
})
export class DashboardComponent {
  constructor(private router: Router, private auth: AuthService) {}

  goTo(path: string) { this.router.navigate([path]); }
  noop() { alert('Demo - funcionalidad no implementada todavía'); }
}
