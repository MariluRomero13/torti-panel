import { Component, OnInit,ElementRef, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PendingPaymentsService } from './../../../services/pending-payments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-pending-payments-form',
  templateUrl: './pending-payments-form.component.html',
  styleUrls: ['./pending-payments-form.component.css']
})
export class PendingPaymentsFormComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  employee:any; 
  date:any;
  dataSource: any;
  pendingpaymentDetailsColumns: string[] = ['product', 'quantity', 'total'];
  constructor(private dialog: MatDialog,
              private pendingpaymentSvc: PendingPaymentsService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getpendingpaymentDetails();
  }

  private getpendingpaymentDetails(): void {
    this.pendingpaymentSvc.getDetails(this.data.pendingpayment.id).subscribe(pendingpaymentDetails => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = pendingpaymentDetails;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.employee = this.data.pendingpayment.assignment.assignment.employees.name;
      this.date = this.data.pendingpayment.created_at;
    }, error => {
      
    });
  }

}
