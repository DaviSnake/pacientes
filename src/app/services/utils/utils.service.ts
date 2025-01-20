import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getToken(){
    let token:any = "";
    if (typeof window !== 'undefined' && window.localStorage){
      token = localStorage.getItem('token');
      return token;
    }
  }

  getUsuarioId(){
    let usuarioId:any = "";
    if (typeof window !== 'undefined' && window.localStorage){
      usuarioId = localStorage.getItem('usuarioId');
      return usuarioId;
    }
  }

}
