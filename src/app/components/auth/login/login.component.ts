import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginMessage } from './../../../functions/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationMessages = loginMessage;
  loginForm: FormGroup;
  isLoading = false;
  constructor() { this.createForm(); }

  ngOnInit(): void {
  }

  login(): void {}

 private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }
}
