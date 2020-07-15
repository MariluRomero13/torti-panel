import { Component, OnInit } from '@angular/core';
import { IUser } from './../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { RecoveryPasswordComponent } from './../recovery-password/recovery-password.component';
import { DataService } from './../../../services/authentication/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  constructor(private dialog: MatDialog, private dataSvc: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    const user = this.dataSvc.getUser();
    this.user = {
      id: user.id,
      name: `${user.employee.name} ${user.employee.paternal} ${user.employee.maternal}`,
      username: user.username,
      email: user.email
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
