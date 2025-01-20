import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  apiService = inject(ApiService);
  router = inject(Router);

  errorStatus: boolean = false;
  errorMsj: any = "";
  
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor() {}

  ngOnInit(): void {
      this.validarLocalStorageToken();
  }

  validarLocalStorageToken() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("token")) {
        this.router.navigate(['listaPacientes']);
      }
    }
  }

  onLogin(form: LoginI){
    this.apiService.loginByEmail(form).subscribe(data =>{
      let dataResponse: ResponseI = data;
      if (dataResponse.status === "ok") {
        localStorage.setItem("token", dataResponse.result.token);
        localStorage.setItem("usuarioId", dataResponse.result.usuarioId);
        this.router.navigate(['listaPacientes']);
      } else {
        this.errorStatus = true;
        this.errorMsj = dataResponse.result.error_msg;
      }
    });
  }

}
