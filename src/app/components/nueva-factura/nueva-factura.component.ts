import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';
import { PagesComponent } from '../pages/pages.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FacturacionService } from '../../services/facturacion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.component.html',
  styleUrls: ['./nueva-factura.component.css']
})
export class NuevaFacturaComponent implements OnInit {


  Producto = {codigoProducto: 0,
    producto: '',
    monto: 0};


  formulario1: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;

  cliente: any = {};
  existeCliente = true;

  nuevaFacturacion = {
    cedula: 'V-',
    cliente: '',
    productos: []
  }

  subtotalMonto: number;
  iva: number;
  TotalMonto: number;

  UltimoCodigoFatura: number;

  clickSubmit = false;


 


  constructor(private bottomSheetRef: MatBottomSheetRef<PagesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private snackBar: MatSnackBar,
    private facturacionService: FacturacionService,
    private router: Router) {}

  ngOnInit() {

    this.llamarFacturas()


  }




  cerrarModal(event: MouseEvent): void {
    event.preventDefault();

    this.clickSubmit = true;
    

    let factura = {
      cliente: this.nuevaFacturacion.cliente,
      cedula: this.cliente.cedula,
      productos: this.nuevaFacturacion.productos,
      subtotal: this.subtotalMonto,
      iva: this.iva,
      totalmonto: this.TotalMonto,
      codigoFactura: this.UltimoCodigoFatura + 1 || 10000,
      fechaCreacion: Date.now()
    }

    this.facturacionService.crearFactura(factura).subscribe((resp: any) => {
      if(resp.ok === true){
        this.clickSubmit = false;
        this.router.navigate(['/dashboard'])
        this.bottomSheetRef.afterDismissed().subscribe(() => {
           this.facturacionService.NuevaFactura = true;
        })
        this.toast('Factura creada con exito', 'Cerrar')
         return this.bottomSheetRef.dismiss()
      }
      
    })





  }

  buscarCliente(key){

    if (key.length === 0){
      return;
    }
    this.facturacionService.ObtenerClientePorCedula(key).subscribe((resp: any) => {
      if (resp.message === 'exito') {
        this.cliente = resp.cliente
        this.existeCliente = true;
        return this.nuevaFacturacion.cliente = resp.cliente.nombre;
      }
      if (resp.message === 'no se encontro cliente') {
        this.existeCliente = false;
        this.toast(`No existe cliente con la cedula ${key}`, 'Cerrar')
        return this.nuevaFacturacion.cliente = '';
        
      }
    })

  }

  llamarFacturas(){
    this.facturacionService.llamarFacturas().subscribe((resp: any) => {

      this.UltimoCodigoFatura = resp.listado[0].codigoFactura;
      

    })
  }


  buscarProducto(key){

    if (key.length === 0){
      return;
    }

    this.facturacionService.BuscarCodigoProducto(key).subscribe((resp: any) => {
      
      if (resp.message === 'Exito'){
          this.Producto = {
          codigoProducto: resp.codigoProducto.codigoProducto,
          producto: resp.codigoProducto.producto,
          monto: resp.codigoProducto.monto}

        
      }

      if (resp.message === 'No existe codigo'){

        this.toast(`No existe producto con el codigo ${key}`, 'Cerrar')
        
        return this.Producto = {codigoProducto: 0,
          producto: '',
          monto: 0};
      }
    })

    
  }


  clear(){
    return this.Producto = {codigoProducto: 0,
      producto: '',
      monto: 0}
  }


  agregarProducto(producto){
    
    this.clear()
    this.nuevaFacturacion.productos.push({
      codigoProducto: producto.codigoProducto,
      producto: producto.producto,
      monto: producto.monto
    })


    let monto = 0;

  for (let i = 0; i <= this.nuevaFacturacion.productos.length; i++){

    monto = monto + this.nuevaFacturacion.productos[i].monto;

    this.subtotalMonto = monto

    this.iva = (this.subtotalMonto * 16) / 100

    this.TotalMonto = this.subtotalMonto + this.iva



    i++

    monto = monto + this.nuevaFacturacion.productos[i].monto || 0;

    this.subtotalMonto = monto
    this.iva = (this.subtotalMonto * 16) / 100
    this.TotalMonto = this.subtotalMonto + this.iva

  }


    
  }

  borrarProducto(i){

    this.subtotalMonto = this.subtotalMonto - this.nuevaFacturacion.productos[i].monto;
    
    this.iva = (this.subtotalMonto * 16) / 100

    this.TotalMonto = this.subtotalMonto + this.iva
    

    return this.nuevaFacturacion.productos.splice(i, 1)
  }


  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
    });
  }

}
