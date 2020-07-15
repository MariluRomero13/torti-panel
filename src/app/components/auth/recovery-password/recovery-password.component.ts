import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { errorMessage, successMessage } from 'src/app/functions/alerts';
import { recoveryPasswordMessage } from 'src/app/functions/messages';
import { IPassword } from 'src/app/models/user';
import { AuthService } from './../../../services/authentication/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  password: IPassword;
  recoveryPasswordForm: FormGroup;
  validationMessages = recoveryPasswordMessage;
  constructor(public dialogRef: MatDialogRef<RecoveryPasswordComponent>,
              private authSvc: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
    console.log(this.data);
  }

  private createForm(): void {
    this.recoveryPasswordForm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
    });
    this.dialogRef.disableClose = true;
  }

  changePassword(): void {
    this.getPasswordData();
    this.authSvc.changePassword(this.password).subscribe(res => {
      if (res.success) {
        successMessage('La contraseña fue cambiada correctamente').then(() => {
          this.dialogRef.close();
        });
      }
    }, error => {
      if (error.error === 'Invalid Password') {
        errorMessage('La contraseña actual es inválida');
      }
    });
  }

  private getPasswordData(): void {
    this.password = {
      user: this.data.id,
      ...this.recoveryPasswordForm.value
    };
  }
}
