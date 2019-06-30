import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// components

import {PagesComponent} from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LogeadoGuard } from '../guards/logeado.guard';





const routesPage: Routes = [
    {path: '', component: PagesComponent, canActivate: [LogeadoGuard] ,children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'productos', component: ProductosComponent},
        {path: 'clientes', component: ClientesComponent},
        {path: '**', redirectTo: 'dashboard'}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routesPage)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {

}