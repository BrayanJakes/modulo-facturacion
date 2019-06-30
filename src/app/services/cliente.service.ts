import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URI } from '../config/url';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  token = localStorage.getItem('JWT');

  constructor(private http: HttpClient) { }


  CrearCliente(cliente){
    const uri = `${URI}/cliente?token=${this.token}`;

    return this.http.post(uri, cliente);
  }

  llamarClientes(){
    const uri = `${URI}/cliente?token=${this.token}`;

    return this.http.get(uri);

  }

  verCliente(id){
    const uri = `${URI}/cliente/${id}?token=${this.token}`;
    return this.http.get(uri);
  }

  actualizarCliente(id, body){
    const uri = `${URI}/cliente/${id}?token=${this.token}`;
    return this.http.put(uri, body);
  }

  buscarCliente(busqueda){
    const uri = `${URI}/cliente/busqueda/${busqueda}?token=${this.token}`;
    return this.http.get(uri);
  }

  EliminarCliente(id){
    const uri = `${URI}/cliente/${id}?token=${this.token}`;
    return this.http.delete(uri);
  }
}
