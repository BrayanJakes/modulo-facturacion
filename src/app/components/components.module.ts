import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { ComponentsRoutingModule } from './components.routing';
import { AngularMaterialModule } from './angular-material.module';
import { MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { NuevaFacturaComponent } from './nueva-factura/nueva-factura.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VerclienteComponent } from './vercliente/vercliente.component';
import { VerfacturaComponent } from './verfactura/verfactura.component';






@NgModule({


    entryComponents: [NuevaFacturaComponent, VerclienteComponent, VerfacturaComponent],
    declarations: [DashboardComponent, PagesComponent, NuevaFacturaComponent, ProductosComponent, ClientesComponent, VerclienteComponent, VerfacturaComponent],

    imports: [BrowserModule,
        BrowserAnimationsModule,
        ComponentsRoutingModule,
        AngularMaterialModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule
        ],

    exports: []
})
export class ComponentsModule {

}