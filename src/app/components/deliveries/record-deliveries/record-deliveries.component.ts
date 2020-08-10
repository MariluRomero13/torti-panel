import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-record-deliveries',
  templateUrl: './record-deliveries.component.html',
  styleUrls: ['./record-deliveries.component.css']
})
export class RecordDeliveriesComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  deliveryColumns: string[] = ['employee', 'phone', 'customer', 'delivery_date', 'status', 'options'];
  constructor(private assignmentSvc: AssignCustomerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRecordDeliveries();
  }

  private getRecordDeliveries(): void {
    this.assignmentSvc.getRecordDeliveries().subscribe(deliveries => {
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

  getEmployee(delivery) {
    const employee = delivery.assignment.employees;
    return `${employee.name} ${employee.paternal} ${employee.maternal}`;
  }

  showLostProducts() {

  }
}
