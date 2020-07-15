import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginMessage } from './../../../functions/messages';
import { AuthService } from './../../../services/authentication/auth.service';
import { IAuth } from './../../../models/auth';
import { Router } from '@angular/router';
import { warningMessage, timeMessage, errorMessage, successMessage } from 'src/app/functions/alerts';
import { DataService } from './../../../services/authentication/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationMessages = loginMessage;
  loginForm: FormGroup;
  isLoading = false;
  auth: IAuth;
  constructor(private authSvc: AuthService,
              private dataSvc: DataService,
              private route: Router) { this.createForm(); }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.invalid) {
      if (!this.loginForm.get('email').valid) {
        warningMessage('Ingresa una dirección de correo válida');
      } else {
        warningMessage('Ingresa tu correo y/o contraseña para continuar');
      }
    } else {
      this.getUserData();
      this.authSvc.login(this.auth).subscribe(res => {
        timeMessage('Iniciando...', 1500).then(() => {
          if (res) {
            if (res.user[0].employee.role_id !== 2) {
              successMessage('Bienvenido').then(() => {
                this.dataSvc.setData(res);
                this.route.navigate(['/panel']);
              });
            } else {
              errorMessage('No eres usuario administrador');
            }
          } else {
            errorMessage('Ocurrió un error');
          }
        });
      }, error => {
        if (error.error) {
          if (error.status === 401) {
            errorMessage('Correo y/o contraseña incorrectos');
          }
        }
      });
    }
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  private getUserData(): void {
    this.auth = {
      ...this.loginForm.value
    };
  }
}
