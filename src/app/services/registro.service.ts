import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../config/url';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }



  AgregarCliente(Cliente){
    const uri = `${URI}/usuario`;

    return this.http.post(uri, Cliente);
  }
}
