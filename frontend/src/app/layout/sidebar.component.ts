import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
  <aside class="sb">
    <div class="sb-head">
      <a routerLink="/dashboard" class="brand">ISCO</a>
      <small class="brand-sub">Módulo de Clientes</small>
    </div>

    <nav class="sb-nav">
      <a routerLink="/dashboard" routerLinkActive="active"><span>Inicio</span></a>

      <div class="sb-section">Clientes</div>
      <a routerLink="/clientes" routerLinkActive="active"><span>Lista de Clientes</span></a>
      <a routerLink="/clientes/nuevo" routerLinkActive="active"><span>Nuevo cliente</span></a>

      <div class="sb-section">Gestión</div>
      <a routerLink="/exams" routerLinkActive="active"><span>Gestión de Documentos</span></a>
      <a routerLink="/students" routerLinkActive="active"><span>Campaña al Cliente</span></a>
      <a routerLink="/monitoring" routerLinkActive="active"><span>Enviar eMail</span></a>
      <a routerLink="/notifications" routerLinkActive="active"><span>Notifications</span></a>
      <a routerLink="/stream" routerLinkActive="active"><span>Cumplaños del Cl</span></a>
      <a routerLink="/assignments" routerLinkActive="active"><span>Localización</span></a>

      <div class="sb-section">Sistema</div>
      <a routerLink="/settings" routerLinkActive="active"><span>Configuración</span></a>
      <a routerLink="/help" routerLinkActive="active"><span>Ayuda y Soporte</span></a>
    </nav>
  </aside>
  `,
  styles: [`
    .sb{width:260px;flex:0 0 260px;background:#fff;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;min-height:100vh;position:sticky;top:0}
    .sb-head{padding:18px 16px;border-bottom:1px solid #eef0f2}
    .brand{font-weight:800;color:#0f172a;text-decoration:none;font-size:18px}
    .brand-sub{display:block;color:#6b7280;margin-top:2px}
    .sb-nav{padding:8px}
    .sb-section{color:#9ca3af;font-size:12px;font-weight:600;margin:12px 8px 6px}
    .sb-nav a{display:flex;align-items:center;gap:.5rem;padding:10px 12px;border-radius:8px;color:#374151;text-decoration:none}
    .sb-nav a:hover{background:#f3f4f6}
    .sb-nav a.active{background:#eef2ff;color:#1d4ed8}
  `]
})
export class SidebarComponent {}


