import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../plantillas/header/header.component';
import { FooterComponent } from '../../plantillas/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { PacienteI } from '../../models/paciente.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResponseI } from '../../models/response.interface';
import { AlertasService } from '../../services/alertas/alertas.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-editar',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  apiService = inject(ApiService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  alertas = inject(AlertasService);
  utils = inject(UtilsService);

  datosPaciente: PacienteI | undefined;

  editarForm = new FormGroup({
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

  ngOnInit(): void {
      let pacienteId: any = this.activeRoute.snapshot.paramMap.get('id');
      let token = this.utils.getToken();
      this.apiService.getSinglePatience(pacienteId, token).subscribe(data => {
        this.datosPaciente = data[0];
      
        this.editarForm.setValue({
          'pacienteId': this.datosPaciente.PacienteId ? this.datosPaciente.PacienteId : '',
          'nombre': this.datosPaciente.Nombre ?? null,
          'dni': this.datosPaciente.DNI ?? null,
          'direccion': this.datosPaciente.Direccion ?? null,
          'correo': this.datosPaciente.Correo ?? null,
          'codigoPostal': this.datosPaciente.CodigoPostal ?? null,
          'genero': this.datosPaciente.Genero ?? null,
          'telefono': this.datosPaciente.Telefono ?? null,
          'fechaNacimiento': this.datosPaciente.FechaNacimiento ?? null
        })
        
      })
  }

  actualizarPaciente(form:any){

    let token = this.utils.getToken();
    this.apiService.updatePatience(form, token).subscribe(data => {
      let respuesta: ResponseI = data;
      console.log(respuesta.status)
      if (respuesta.status === "ok"){
        this.alertas.showSuccess('Datos Modificados', 'Hecho');
        this.router.navigate(['listaPacientes']);
      } else {
        this.alertas.showError(respuesta.result.error_msg, 'Error');
      }
    })

  }

  eliminarPaciente(form:any){

    let token = this.utils.getToken();
    this.apiService.deletePatience(form, token).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status === "ok"){
        this.alertas.showSuccess('Paciente Eliminado', 'Hecho');
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


