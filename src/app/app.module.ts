import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// components
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { ComponentsModule } from './components/components.module';

// angular material
import { MatToolbarModule } from '@angular/material';
import { AngularMaterialModule } from './components/angular-material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatToolbarModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
