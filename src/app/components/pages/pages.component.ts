import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { NuevaFacturaComponent } from '../nueva-factura/nueva-factura.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturacionService } from '../../services/facturacion.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  nombre = localStorage.getItem('nombre')

  constructor(private bottomSheet: MatBottomSheet,
              private router: Router,
              private snackBar: MatSnackBar,
              private facturacionService: FacturacionService) { }

  ngOnInit() {
  }

  abrirModal(): void {
    this.bottomSheet.open(NuevaFacturaComponent, {data: '123'});

 
}

dashboard(){

  return this.router.navigate(['dashboard']);

}


toast(mensaje: string, accion: string) {
  this.snackBar.open(mensaje, accion, {
    duration: 3000,
  });
}


salir(){
  localStorage.clear()
  return this.router.navigate(['/login'])
}

cliente(){
  return this.router.navigate(['/clientes'])
}

producto(){
  return this.router.navigate(['/productos'])
}

}
