import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clickSubmit = false;

  constructor(private loginService: LoginService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  logear(form: NgForm) {

    this.clickSubmit = true;
    
    const admin = {
      email: form.value.email,
      password: form.value.clave
    }

    this.loginService.Login(admin).subscribe((resp: any) => {
      
      if (resp.message === 'Email Incorrecto') {
        this.clickSubmit = false;
        return this.toast('Email invalido', 'Cerrar')
      }
      if (resp.message === 'Contraseña invalida') {
        this.clickSubmit = false;
        return this.toast('Contraseña invalida', 'Cerrar')
      }
      if (resp.message === 'Logeado') {

        this.clickSubmit = false;
        localStorage.setItem('nombre',resp.user.nombre )
        localStorage.setItem('JWT', resp.JWT)
        this.toast(`Bienvenido ${resp.user.nombre}`, 'Cerrar')
        return this.router.navigate(['/dashboard']);
      }
    })
  }


  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
    });
  }

}
