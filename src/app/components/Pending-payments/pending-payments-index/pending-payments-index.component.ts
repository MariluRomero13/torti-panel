import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PendingPaymentsService } from './../../../services/pending-payments.service';
import { PendingPaymentsFormComponent } from './../pending-payments-form/pending-payments-form.component';
@Component({
  selector: 'app-pending-payments-index',
  templateUrl: './pending-payments-index.component.html',
  styleUrls: ['./pending-payments-index.component.css']
})
export class PendingPaymentsIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  pendingpaymentColumns: string[] = ['employee','customer','total','total_to_pay','options']
  constructor(private dialog: MatDialog, private pendingpaymentsSvc: PendingPaymentsService) { }

  ngOnInit(): void {
    this.getPendingPayments();
  }

  openPendingPaymentDialog( pendingpayment): void {
    const dialog = this.dialog.open(PendingPaymentsFormComponent, {
      width: 'auto',
      height: 'auto',
      data: {pendingpayment}
    });
    dialog.afterClosed().subscribe(() => {
      this.getPendingPayments();
    });
  }

  private getPendingPayments(): void{
    this.pendingpaymentsSvc.index().subscribe(pendingpayments => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = pendingpayments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  searchPendingPayment = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
