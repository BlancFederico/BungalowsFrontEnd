import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { TipoReserva } from '../Interfaces/tipo-reserva';

@Injectable({
  providedIn: 'root'
})
export class TipoReservaService {

  private endpoint:string= environment.endPoint;
  private apirUrl:string = this.endpoint + "tiporeserva/";

  constructor(private http:HttpClient) { }

  getList():Observable<TipoReserva[]>{
    return this.http.get<TipoReserva[]>(this.apirUrl + 'lista');
  }
}
