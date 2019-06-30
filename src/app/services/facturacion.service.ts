import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../config/url';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  token = localStorage.getItem('JWT')

  NuevaFactura = false;

  constructor(private http: HttpClient) { }


  ObtenerClientePorCedula(cedula){

    const uri = `${URI}/cliente/cedula/${cedula}?token=${this.token}`

    return this.http.get(uri);
  }

  llamarProductos(){
    const uri = `${URI}/producto?token=${this.token}`;

    return this.http.get(uri);

  }

  BuscarCodigoProducto(codigo){
    const uri = `${URI}/producto/codigo/${codigo}?token=${this.token}`;

    return this.http.get(uri);

  }

 
  crearFactura(factura){
    const uri = `${URI}/factura?token=${this.token}`;

    return this.http.post(uri, factura);
  }

  ObtenerunaFactura(id){
    const uri = `${URI}/factura/${id}?token=${this.token}`;

    return this.http.get(uri);
  }


  llamarFacturas(){
    const uri = `${URI}/factura?token=${this.token}`;

    return this.http.get(uri);
  }

  EliminarFactura(id){
    const uri = `${URI}/factura/${id}?token=${this.token}`;

    return this.http.delete(uri);
  }


  buscarFacturaporCliente(busqueda){
    const uri = `${URI}/factura/busqueda/${busqueda}?token=${this.token}`;
    return this.http.get(uri);
  }
}
