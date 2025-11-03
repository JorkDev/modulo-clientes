import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./app/login/login.component').then(m => m.LoginComponent) },
    { path: 'dashboard', loadComponent: () => import('./app/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'clientes', loadChildren: () => import('./app/cliente/cliente.routes').then(m => m.routes) }
    ]),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));

