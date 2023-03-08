import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Reserva } from 'src/app/Interfaces/reserva';




@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public dataReserva: Reserva
  ){}

  confirmar_Eliminar(){
    if(this.dataReserva){
      this.dialogoReferencia.close("Eliminar")
    }
  }


}
