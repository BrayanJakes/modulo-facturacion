import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard implements CanActivate  {

  constructor(private login: LoginService,
    private router: Router) {}

  canActivate() {
    if ( this.login.estaLogueado()) {
      return true;
    }



    this.router.navigate(['login']);
    return false;

}
  
}
