import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ClienteService } from '../cliente/services/cliente.service';
import { Cliente } from '../cliente/models/cliente.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="page-head">
    <h2>Información General</h2>
    <p>En esta sección podrás ver la información general de la aplicación.</p>
  </section>

  <div class="kpis">
    <div class="kpi"><div class="kpi-title">Total Clientes</div><div class="kpi-value">10</div><div class="kpi-sub">9 activos</div></div>
    <div class="kpi"><div class="kpi-title">Total Documentos</div><div class="kpi-value">645</div><div class="kpi-sub">De todos los clientes</div></div>
    <div class="kpi"><div class="kpi-title">Campañas Activas</div><div class="kpi-value">975</div><div class="kpi-sub">De todos los clientes</div></div>
    <div class="kpi"><div class="kpi-title">Emails Enviados</div><div class="kpi-value">65</div><div class="kpi-sub">Por clientes</div></div>
  </div>

  <div class="panel">
    <div class="panel-head">
      <h3>Ultimos Clientes</h3>
    </div>
    <ul class="list">
      <li *ngFor="let c of latestClientes">
        <b>{{ c.nombre }} {{ c.apellido }}</b> — {{ c.email.replace('@','&#64;') }}
      </li>
      <li *ngIf="latestClientes.length === 0" class="muted">No hay clientes recientes</li>
    </ul>
  </div>
  `,
  styles: [`
    .page-head h2{margin:0 0 4px}
    .page-head p{margin:0;color:#6b7280}
    .kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:14px 0 18px}
    .kpi{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px}
    .kpi-title{color:#6b7280;font-size:13px}
    .kpi-value{font-size:28px;font-weight:800;line-height:1;margin-top:6px}
    .kpi-sub{color:#9ca3af;font-size:12px}
    .panel{background:#fff;border:1px solid #e5e7eb;border-radius:12px}
    .panel-head{padding:12px 14px;border-bottom:1px solid #e5e7eb}
    .list{list-style:none;margin:0;padding:12px 16px}
    .list li{padding:10px 0;border-bottom:1px dashed #f1f5f9}
    .list li:last-child{border-bottom:none}
  `]
})
export class DashboardComponent implements OnInit {
  latestClientes: Cliente[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.loadLatestClientes();
  }

  private loadLatestClientes(): void {
    this.clienteService
      .getAll(0, 10, 'fechaCreacion', 'DESC')
      .subscribe({
        next: (res) => {
          this.latestClientes = res.content ?? [];
        },
        error: () => {
          this.latestClientes = [];
        }
      });
  }
}
