import { Routes } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

export const routes: Routes = [
  { path: '', component: ClienteListComponent },
  { path: 'nuevo', component: ClienteFormComponent },
  { path: 'editar/:id', component: ClienteFormComponent },
  { path: ':id', component: ClienteDetailComponent }
];

