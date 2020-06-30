import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recoveryPasswordMessage } from 'src/app/functions/messages';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  recoveryPasswordForm: FormGroup;
  validationMessages = recoveryPasswordMessage;
  constructor(public dialogRef: MatDialogRef<RecoveryPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.recoveryPasswordForm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
    });
    this.dialogRef.disableClose = true;
  }

  changePassword(): void {

  }
}
