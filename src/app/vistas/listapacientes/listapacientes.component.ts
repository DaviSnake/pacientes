import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../plantillas/header/header.component';
import { FooterComponent } from '../../plantillas/footer/footer.component';
import { ApiService } from '../../services/api/api.service';
import { ListaPacientesI } from '../../models/listapacientes.interface';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-listapacientes',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './listapacientes.component.html',
  styleUrl: './listapacientes.component.css'
})
export class ListapacientesComponent implements OnInit {

  apiService = inject(ApiService);
  utils = inject(UtilsService);
  router = inject(Router);
  token: string = "";


  listaPacientes: ListaPacientesI[] = [];
  
  ngOnInit(): void {  
   
    this.validarLocalStorageToken();
    this.token = this.utils.getToken()
    this.apiService.getAllPatients(1, this.token).subscribe(data => { 
      this.listaPacientes = data;      
    })
    
  } 
  
  validarLocalStorageToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem("token")) {
        this.router.navigate(['login']);
      }
    }
  }

  editarPaciente(id: string){
    this.router.navigate(['editar', id]);
  }

  nuevoPaciente(){
    this.router.navigate(["nuevo"]);
  }

}
