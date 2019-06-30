import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistroService } from '../services/registro.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../config/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cedula1: string;
  edad1: string;
  celular1: string;
  telefono1: string;



  constructor(private registroService: RegistroService,
              private snackBar: MatSnackBar,
              private router: Router ) {
   }

  ngOnInit() {
  }


  Registro(form: NgForm) {

    if (form.value.clave != form.value.clave2) {
     return this.toast('Las contraseña deben ser iguales', 'Cerrar')
    }

    if (form.value.email != form.value.email2) {
     return this.toast('Los email deben ser iguales', 'Cerrar')
    }

    const cliente: Usuario = {
      cedula: form.value.initCedula + this.cedula1,
      celular: this.celular1,
      direccion: form.value.direccion,
      edad: this.edad1,
      email: form.value.email,
      nombre: form.value.nombre,
      password: form.value.clave,
      telefono: this.telefono1

    }

    this.registroService.AgregarCliente(cliente).subscribe((resp) => {
      this.toast('Usuario Creado con exito', 'Cerrar');
      return this.router.navigate(['login']);
    })

  }


  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 4000,
    });
  }

}
