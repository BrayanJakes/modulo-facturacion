import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../config/url';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  token = localStorage.getItem('JWT');

  constructor(private http: HttpClient) { }


  CrearProducto(producto){
    const uri = `${URI}/producto?token=${this.token}`;

    return this.http.post(uri, producto);
  }

  llamarProductos(){
    const uri = `${URI}/producto?token=${this.token}`;

    return this.http.get(uri);

  }


  buscarProducto(busqueda){
    const uri = `${URI}/producto/busqueda/${busqueda}?token=${this.token}`;
    return this.http.get(uri);
  }

  EliminarProducto(id){
    const uri = `${URI}/producto/${id}?token=${this.token}`;
    return this.http.delete(uri);
  }
}
