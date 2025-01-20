import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../plantillas/header/header.component";
import { FooterComponent } from "../../plantillas/footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { AlertasService } from '../../services/alertas/alertas.service';
import { ResponseI } from '../../models/response.interface';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-nuevo',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {

  apiService = inject(ApiService);
  router = inject(Router);
  alertas = inject(AlertasService);
  utils = inject(UtilsService);

  nuevoForm = new FormGroup({
    pacienteId: new FormControl('', Validators.required),
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    dni: new FormControl(''),
    correo: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    fechaNacimiento: new FormControl('')
  })

  insertarPaciente(form:any){
  
    let token = this.utils.getToken();
    this.apiService.addPatience(form, token).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status === "ok"){
        this.alertas.showSuccess('Datos Ingresado', 'Hecho');
        this.router.navigate(['listaPacientes']);
      } else {
        this.alertas.showError(respuesta.result.error_msg, 'Error');
      }
    })
  
  }

  volver(){
    this.router.navigate(['listaPacientes']);
  }

}
