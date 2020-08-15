import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';

@Component({
  selector: 'app-future-deliveries',
  templateUrl: './future-deliveries.component.html',
  styleUrls: ['./future-deliveries.component.css']
})
export class FutureDeliveriesComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  deliveryColumns: string[] = ['employee', 'customer', 'delivery_date', 'options'];
  constructor(private assignmentSvc: AssignCustomerService) { }

  ngOnInit(): void {
    this.getFutureDeliveries();
  }

  private getFutureDeliveries(): void {
    this.assignmentSvc.getFutureDeliveries().subscribe(deliveries => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = deliveries;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  searchDelivery = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  cancelDelivery(delivery) {
    confirmMessage('¿Estás seguro de cancelar la entrega?').then(result => {
      if (result.value) {
        this.assignmentSvc.cancelDelivery(delivery.id).subscribe(res => {
          if (res.success) {
            successMessage('Entrega cancelada correctamente').then(() => this.getFutureDeliveries());
          }
        });
      }
    });
  }

  getEmployee(delivery) {
    const employee = delivery.assignment.employees;
    return `${employee.name} ${employee.paternal} ${employee.maternal}`;
  }

}
