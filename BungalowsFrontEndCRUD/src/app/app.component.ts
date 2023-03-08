 
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Reserva } from './Interfaces/reserva';
import { ReservaService } from './Services/reserva.service';

import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['NombreCompleto','TipoReserva', 'Costo', 'FechaInicio', 'FechaSalida', 'Acciones'];
  dataSource = new MatTableDataSource<Reserva>();
  constructor(
    private _reservaServicio: ReservaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ){
      
    }

    ngOnInit(): void {
      this.mostrarReservas();
    }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

mostrarReservas(){
  this._reservaServicio.getList().subscribe({
    next:(dataResponse) =>{
     console.log(dataResponse)
     this.dataSource.data = dataResponse;
    },error:(e) => {}
    
    })
}

dialogoNuevaReserva() {
  this.dialog.open(DialogAddEditComponent,{
    disableClose:true,
    width:"350px"
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Creada"){
      this.mostrarReservas();
    }
  })
}




dialogoEditarReserva(dataReserva: Reserva) {
  this.dialog.open(DialogAddEditComponent,{
    disableClose:true,
    width:"350px",
    data: dataReserva
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Editada"){
      this.mostrarReservas();
    }
  })
}

mostrarAlerta(msg: string, accion: string) {
  this._snackBar.open(msg, accion,{
    horizontalPosition:"end",
    verticalPosition:"top",
    duration: 3000
  });
}

dialogoEliminarReserva(dataReserva:Reserva){
  this.dialog.open(DialogoDeleteComponent,{
    disableClose:true,
    data: dataReserva
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "Eliminar"){

      this._reservaServicio.delete(dataReserva.idReserva).subscribe({
        next:(data) =>{
          this.mostrarAlerta("Reserva Eliminada", "Listo");
          this.mostrarReservas();
        },
        error:(e)=>{console.log(e)}
      })

    }
  })
}

}



 