import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Reserva } from '../Interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {


  private endpoint:string= environment.endPoint;
  private apirUrl:string = this.endpoint + "reserva/";

  
  constructor(private http:HttpClient) { }

  getList():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.apirUrl + 'lista');
}

add(modelo:Reserva):Observable<Reserva>{
  return this.http.post<Reserva>(this.apirUrl + 'guardar', modelo);
}

update(idReserva:number,modelo:Reserva):Observable<Reserva>{
  return this.http.put<Reserva>(this.apirUrl + 'actualizar/' + idReserva, modelo);
}

delete(idReserva:number):Observable<void>{
  return this.http.delete<void>(this.apirUrl + 'eliminar/' + idReserva);
}


}
