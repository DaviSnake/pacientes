import { inject, Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { ListaPacientesI } from '../../models/listapacientes.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PacienteI } from '../../models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost/Proyectos/CursoApiRestYT/";
  http = inject(HttpClient);

  constructor() { }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    
    let direccion = `${this.url}auth`;
    return this.http.post<ResponseI>(direccion, form);

  }

  logOut(form: any, token: string): Observable<ResponseI> {
    
    let direccion =  `${this.url}auth`; 
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer 
      })
    }

    return this.http.put<ResponseI>(direccion, form, Options);
  }
  
  getAllPatients(page:number, token: string):Observable<ListaPacientesI[]>{
    
    let direccion = `${this.url}pacientes?page=${page}`;    
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      })
    }    

    return this.http.get<ListaPacientesI[]>(direccion, Options);
  }

  getSinglePatience(id: string, token: string): Observable<PacienteI[]>{

    let direccion = `${this.url}pacientes?id=${id}`;    
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      })
    }    

    return this.http.get<PacienteI[]>(direccion, Options);

  }

  addPatience(form: PacienteI,token: string): Observable<ResponseI>{

    let direccion = `${this.url}pacientes`;    
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      })
    }    

    return this.http.post<ResponseI>(direccion, form, Options);

  }

  updatePatience(form: PacienteI,token: string): Observable<ResponseI>{

    let direccion = `${this.url}pacientes`;    
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      })
    }    

    return this.http.put<ResponseI>(direccion, form, Options);

  }

  deletePatience(form: PacienteI,token: string): Observable<ResponseI>{

    let direccion = `${this.url}pacientes`;    
    let bearer = `Bearer ${ token }`;
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      }),
      body: form
    }    

    return this.http.delete<ResponseI>(direccion, Options);

  }

}
