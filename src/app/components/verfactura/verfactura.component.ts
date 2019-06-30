import { Component, OnInit, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FacturacionService } from '../../services/facturacion.service';

@Component({
  selector: 'app-verfactura',
  templateUrl: './verfactura.component.html',
  styleUrls: ['./verfactura.component.css']
})
export class VerfacturaComponent implements OnInit {

  factura: any = {};

  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
              private facturacionService: FacturacionService) { }

  ngOnInit() {

    this.ObtenerFactura(this.data)
  }


  CerrarDialogo(): void {
    this.dialogRef.close();
  }


  ObtenerFactura(id){
    this.facturacionService.ObtenerunaFactura(id).subscribe((resp: any) => {

      this.factura = resp.solicitud;
    })
  }

}
