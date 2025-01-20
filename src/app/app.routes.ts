import { Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { ListapacientesComponent } from './vistas/listapacientes/listapacientes.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'listaPacientes', component: ListapacientesComponent },
    { path: 'nuevo', component: NuevoComponent },
    { path: 'editar/:id', component: EditarComponent },
    
];
