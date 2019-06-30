import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VerfacturaComponent } from '../verfactura/verfactura.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Facturas = [];

  existeFactura = true;

  constructor(private facturacionService: FacturacionService, 
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
                
                setInterval(() => {

                if (this.facturacionService.NuevaFactura){
                  this.llamarFacturas()
                  this.facturacionService.NuevaFactura = false;
                }
          
              }, 1000) 
            
            }

  ngOnInit() {
    this.llamarFacturas()

    
  }


  llamarFacturas(){
    this.facturacionService.llamarFacturas().subscribe((resp: any) => {
      this.Facturas = resp.listado;
    })
  }


  abrirDialog(id) {
    const dialogRef = this.dialog.open(VerfacturaComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });
  }


  EliminarFactura(id){
    this.facturacionService.EliminarFactura(id).subscribe(() => {
      this.toast('Factura Eliminada', 'Cerrar')
      return this.llamarFacturas()
    })
  }

  buscarCliente(key){
    if (key.length > 0){
      return this.facturacionService.buscarFacturaporCliente(key).subscribe((resp: any) => {
        this.Facturas = resp.listado;

        this.existeFactura = true;

        if (this.Facturas.length === 0) {
          this.existeFactura = false;
        }
      })
      
    }

    this.existeFactura = true;
    this.llamarFacturas()
  }

  toast(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      duration: 3000,
    });
  }

}
