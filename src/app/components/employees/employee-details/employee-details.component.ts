import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
              { dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

}
