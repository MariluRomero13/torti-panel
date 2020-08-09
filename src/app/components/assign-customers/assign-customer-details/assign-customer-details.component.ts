import { Inject } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';
import { FormDeliveryComponent } from './../../deliveries/form-delivery/form-delivery.component';
import { DeliveryDaysComponent } from './../../deliveries/delivery-days/delivery-days.component';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-assign-customer-details',
  templateUrl: './assign-customer-details.component.html',
  styleUrls: ['./assign-customer-details.component.css']
})
export class AssignCustomerDetailsComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  assignmentColumns: string[] = ['customer', 'status', 'options'];
  employee: string;
  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssignCustomerDetailsComponent>,
              private assignmentSvc: AssignCustomerService) { this.dialogRef.disableClose = true;  }

  ngOnInit(): void {
    this.employee = `${this.data.name} ${this.data.paternal} ${this.data.maternal}`;
    this.index();
  }

  private index(): void {
    this.assignmentSvc.show(this.data.id).subscribe(customers => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = customers[0].assignCustomer;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDeliveryForm(edit, assignment): void {
    this.dialog.open(FormDeliveryComponent, {
      width: '450px',
      height: '230px',
      data: { edit, assignment }
    });
  }

  openDeliveryDaysForm(assignment): void {
    this.dialog.open(DeliveryDaysComponent, {
      width: '700px',
      height: '400px',
      data: assignment
    });
  }

  changeAssignmentStatus(assignment) {
    let message = '';
    let confirm = '';
    assignment.is_active ?
      (
        confirm = '¿Deseas desactivar el cliente?',
        message = 'Cliente desactivado correctamente') :
      (
        confirm = '¿Deseas activar el cliente?',
        message = 'Cliente activado correctamente'
      );
    confirmMessage(confirm).then(result => {
      if (result.value) {
        this.assignmentSvc.delete(assignment.id).subscribe(res => {
          if (res.success) {
            successMessage(message).then(() => this.index());
          }
        });
      }
    });
  }
}
