import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URI } from '../config/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  Login(admin){
    const uri = `${URI}/login`;

    return this.http.post(uri, admin)
  }


  estaLogueado() {
    return ( localStorage.getItem('JWT') ) ? true : false;
  }
}
