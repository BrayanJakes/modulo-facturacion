import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  clickSubmit = false;


  formulario = {
    producto: '',
    monto: 0,
    codigoProducto: 1000

  }

  Productos = [];

  UltimoCodigoProducto: number;

  existeCliente = true;

  constructor(private productoService: ProductoService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.llamarProductos();
  }

  RegistrarProducto(form: NgForm){



    if(this.formulario.producto === ''){
      return;
    }

    this.clickSubmit = true;

    const producto = {
      producto: this.formulario.producto,
      monto: this.formulario.monto,
      fechaCreacion: Date.now(),
      codigoProducto: this.UltimoCodigoProducto + 1 || 1000
    }

    this.productoService.CrearProducto(producto).subscribe((resp) => {
      this.toast('Producto Creado con exito', 'Cerrar')
      this.clickSubmit = false;
      form.reset();
      this.llamarProductos();
    })



  }

  llamarProductos(){
    this.productoService.llamarProductos().subscribe((resp2: any) => {
      this.Productos = resp2.listado;



        this.UltimoCodigoProducto = resp2.listado[0].codigoProducto;
      
    })
  }

  EliminarProducto(id){

    this.productoService.EliminarProducto(id).subscribe((resp) => {
      this.toast('Producto eliminado', 'Cerrar')
      this.llamarProductos()
    })
  }

  buscarProducto(key){


    if(key.length > 0){
      return this.productoService.buscarProducto(key).subscribe((resp: any) => {
         this.Productos = resp.listado;
 
         this.existeCliente = true;
 
         if(this.Productos.length === 0) {
 
           this.existeCliente = false;
         }
       });
       
     }
     this.existeCliente = true;
     this.llamarProductos()
  }


  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
    });
  }

}
