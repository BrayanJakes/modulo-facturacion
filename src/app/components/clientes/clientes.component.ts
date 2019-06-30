import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/config/cliente';

import { ClienteService } from '../../services/cliente.service';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { VerclienteComponent } from '../vercliente/vercliente.component';






@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clickSubmit = false;

  edad1: string;
  celular1: string;
  telefono1: string;

  formulario = {
    nombre: '',
    cedula: 'V-',
    edad: '',
    celular: '',
    telefono: '',
    direccion: '',
    id: ''
  }

  clientes: any[] = [];

  editandoCliente = false;

  existeCliente = true;







  constructor(private clienteService: ClienteService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.llamarCliente()
  }

  RegistrarCliente(form: NgForm) {


    if (this.formulario.cedula.charAt(0)  === 'V' || this.formulario.cedula.charAt(0) === 'E'){
      
      this.clickSubmit = true;



    if (this.formulario.id !== '') {

      const cliente = {
        cedula: this.formulario.cedula,
        celular: this.celular1,
        direccion: this.formulario.direccion,
        edad: this.edad1,
        nombre: this.formulario.nombre,
        telefono: this.telefono1
     }

      return this.clienteService.actualizarCliente(this.formulario.id, cliente).subscribe((resp4) => {
       this.toast('Cliente editado con exito', 'Cerrar')
       this.clickSubmit = false;
       this.llamarCliente()
       form.reset()
       this.formulario.cedula = 'V-'
       this.formulario.id = '';
       this.editandoCliente = false;
     })
    }

    


    const cliente: Cliente = {
       cedula: this.formulario.cedula,
       celular: this.celular1,
       direccion: this.formulario.direccion,
       edad: this.edad1,
       fechaCreacion: Date.now(),
       nombre: this.formulario.nombre,
       telefono: this.telefono1
    }

    return this.clienteService.CrearCliente(cliente).subscribe((resp: any) => {

      if (!resp.err){
        form.reset();
        this.formulario.cedula = 'V-'
    
        this.llamarCliente();
        this.clickSubmit = false;
        return this.toast('Cliente creado con exito', 'Cerrar')

      }
        if (resp.err.message === 'clientes validation failed: cedula: cedula debe ser unico'){
          this.clickSubmit = false;
          return this.toast(`Ya existe un usuario con la cedula ${this.formulario.cedula}`, 'Cerrar')
        }

    })

  }else{
    this.clickSubmit = false;
    return this.toast('La cedula debe empezar con V o E, verifique el ejemplo', 'Cerrar')
  }

  }


  llamarCliente(){
    this.clienteService.llamarClientes().subscribe((resp2: any) => {

      this.clientes = resp2.listado;

    })
  }


  VerCliente(id){
    const solicitud = this.bottomSheet.open(VerclienteComponent, {data: id});

    solicitud.afterDismissed().subscribe((resp) => {
  

    });
  }

  EditarCliente(id){
    this.clienteService.verCliente(id).subscribe((resp: any) => {
      this.editandoCliente = true;
      this.formulario.nombre = resp.solicitud.nombre;
      this.formulario.cedula = resp.solicitud.cedula;
      this.formulario.direccion = resp.solicitud.direccion;
      this.formulario.edad = resp.solicitud.edad;
      this.formulario.celular = resp.solicitud.celular;
      this.formulario.telefono = resp.solicitud.telefono;
      this.formulario.id = resp.solicitud._id;
    })
  }



  buscarCliente(key){

    if(key.length > 0){
     return this.clienteService.buscarCliente(key).subscribe((resp: any) => {
        this.clientes = resp.listado;

        this.existeCliente = true;

        if(this.clientes.length === 0) {

          this.existeCliente = false;
        }
      });
      
    }
    this.existeCliente = true;
    this.llamarCliente()

    
  }


  EliminarCliente(id){
    this.clienteService.EliminarCliente(id).subscribe(() => {
      this.toast('Cliente Eliminado', 'Cerrar')
      this.editandoCliente = false;
      this.formulario.id = '';
      return this.llamarCliente();
    })
  }



  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
    });
  }



}
