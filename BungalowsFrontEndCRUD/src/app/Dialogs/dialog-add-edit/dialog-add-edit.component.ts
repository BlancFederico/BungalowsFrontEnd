import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import * as moment from "moment";
import { TipoReserva } from 'src/app/Interfaces/tipo-reserva';
import { Reserva } from 'src/app/Interfaces/reserva';
import { TipoReservaService } from 'src/app/Services/tipo-reserva.service';
import { ReservaService } from 'src/app/Services/reserva.service';

export const MY_DATE_FORMATS = {
  parse:{
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers:[{
    provide : MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
  }]
})
export class DialogAddEditComponent {

  formReserva: FormGroup;
  tituloAccion: string="Nueva";
  botonAccion: string="Guardar";
  listaTipoReserva: TipoReserva[]=[];


constructor(
  private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
  private fb: FormBuilder,
  private _snackBar: MatSnackBar,
  private _tipoReservaServicio: TipoReservaService,
  private _reservaServicio: ReservaService,
  @Inject(MAT_DIALOG_DATA) public dataReserva: Reserva
){
  this.formReserva = this.fb.group({
    nombreCompleto: ['',Validators.required],
    idTipoReserva: ['',Validators.required],
    costo: ['',Validators.required],
    fechaInicio: ['',Validators.required],
    fechaSalida: ['',Validators.required]
  })

  this._tipoReservaServicio.getList().subscribe({
    next:(data)=>{
      this.listaTipoReserva = data;
    },error:(e)=>{}
  })
}


mostrarAlerta(msg: string, accion: string) {
  this._snackBar.open(msg, accion,{
    horizontalPosition:"end",
    verticalPosition:"top",
    duration: 3000
  });
}


addEditReserva(){
  
  console.log(this.formReserva.value)

  const modelo : Reserva = {
    idReserva: 0,
    nombreCompleto : this.formReserva.value.nombreCompleto, 
    idTipoReserva : this.formReserva.value.idTipoReserva,
    costo : this.formReserva.value.costo,
    fechaInicio : moment(this.formReserva.value.fechaInicio).format("DD/MM/YYYY"),
    fechaSalida : moment(this.formReserva.value.fechaSalida).format("DD/MM/YYYY")
  }

  if(this.dataReserva == null){

    this._reservaServicio.add(modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("Reserva Creada","Listo");
        this.dialogoReferencia.close("Creada");
      },error:(e)=>{
        this.mostrarAlerta("No se pudo crear la reserva","Error");
      }
    })

  }else{
    this._reservaServicio.update(this.dataReserva.idReserva, modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("Reserva Editada","Listo");
        this.dialogoReferencia.close("Editada");
      },error:(e)=>{
        this.mostrarAlerta("No se pudo editar la reserva","Error");
      }
    })
  }

}


ngOnInit(): void{
  if(this.dataReserva){

    this.formReserva.patchValue({
      nombreCompleto: this.dataReserva.nombreCompleto,
      idTipoReserva: this.dataReserva.idTipoReserva,
      costo: this.dataReserva.costo,
      fechaInicio: moment(this.dataReserva.fechaInicio, "DD/MM/YYYY"),
      fechaSalida: moment(this.dataReserva.fechaSalida, "DD/MM/YYYY")
    })

    this.tituloAccion = "Editar";
    this.botonAccion = "Actualizar";

  }
}


}

