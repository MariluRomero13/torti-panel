import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';
import { FormDeliveryComponent } from '../form-delivery/form-delivery.component';

@Component({
  selector: 'app-delivery-days',
  templateUrl: './delivery-days.component.html',
  styleUrls: ['./delivery-days.component.css']
})
export class DeliveryDaysComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  deliveryColumns: string[] = ['deliveryDate', 'status', 'options'];
  employee: string;
  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeliveryDaysComponent>,
              private assignmentSvc: AssignCustomerService) { this.dialogRef.disableClose = true;  }

  ngOnInit(): void {
    this.employee = `${this.data.name} ${this.data.paternal} ${this.data.maternal}`;
    this.index();
  }

  private index(): void {
    this.assignmentSvc.getDeliveriesPerCustomer(this.data.id).subscribe(deliveries => {
      console.log(deliveries)
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = deliveries;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDeliveryForm(edit, assignment): void {
    const dialog = this.dialog.open(FormDeliveryComponent, {
      width: '450px',
      height: '230px',
      data: { edit, assignment }
    });
    dialog.afterClosed().subscribe(() => {
      this.index();
    });
  }

  cancelDelivery(assignment) {
    confirmMessage('¿Estás seguro de cancelar la entrega?').then(result => {
      if (result.value) {
        this.assignmentSvc.cancelDelivery(assignment.id).subscribe(res => {
          if (res.success) {
            successMessage('Entrega cancelada correctamente').then(() => this.index());
          }
        });
      }
    });
  }
}
