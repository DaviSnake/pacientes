import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  toast = inject(ToastrService);

  constructor() { }

  showSuccess(texto: string, titulo: string){
    this.toast.success(texto, titulo);
  }

  showError(texto: string, titulo: string){
    this.toast.error(texto, titulo);
  }
}
