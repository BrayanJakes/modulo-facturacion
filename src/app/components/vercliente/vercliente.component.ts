import { Component, OnInit, Inject } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ClientesComponent } from '../clientes/clientes.component';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-vercliente',
  templateUrl: './vercliente.component.html',
  styleUrls: ['./vercliente.component.css']
})
export class VerclienteComponent implements OnInit {

  cliente: any = {};

  constructor(private bottomSheetRef: MatBottomSheetRef<ClientesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private clienteService: ClienteService) {

      this.ObtenerCliente(data)
     }

  ngOnInit() {
  }



  ObtenerCliente(id){
    this.clienteService.verCliente(id).subscribe((resp: any) => {

      this.cliente = resp.solicitud;
      
    });
  }

}
