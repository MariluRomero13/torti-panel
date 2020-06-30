import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { RecoveryPasswordComponent } from './../recovery-password/recovery-password.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.user = {
      username: 'Omar García',
      email: 'admin@example.com'
    };
  }

  openRecoveryPasswordForm(): void {
    this.dialog.open(RecoveryPasswordComponent, {
      width: '400px',
      height: '285px',
      data: { ...this.user }
    });
  }
}
