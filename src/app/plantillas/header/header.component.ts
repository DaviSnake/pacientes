import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils/utils.service';
import { ApiService } from '../../services/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseI } from '../../models/response.interface';
import { AlertasService } from '../../services/alertas/alertas.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  apiService = inject(ApiService);
  router = inject(Router);
  utils = inject(UtilsService);
  alertas = inject(AlertasService);

  usuarioForm = new FormGroup({
      usuarioId: new FormControl('')
    })

  ngOnInit(): void {

    this.usuarioForm.setValue({
      'usuarioId': this.utils.getUsuarioId()
    })

      
  }
  
  Salir(){

    let token = this.utils.getToken();
    this.apiService.logOut(this.usuarioForm.value, token).subscribe(data => {
      let respuesta: ResponseI = data;
          if (respuesta.status === "ok"){
            this.alertas.showSuccess('Sesión terminada', 'Hecho');
            if (typeof window !== 'undefined' && window.localStorage){
              localStorage.removeItem('token');
              localStorage.removeItem('usuarioId');
            }
            this.router.navigate(['login']);
          }else{
            this.alertas.showError(respuesta.result.error_msg, 'Error');
          }
    });
  }

}
