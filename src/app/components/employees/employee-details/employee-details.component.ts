import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from './../../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = { employee: '', user: '', role: '' };
  constructor(public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
              public employeeSvc: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any)
              { dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  private getEmployeeDetails(): void {
    this.employeeSvc.getEmployeeDetails(this.data.id).subscribe(employee => {
      this.employee.employee = employee[0];
      this.employee.user = employee[0].user;
      this.employee.role = employee[0].role;
    });
  }

}
