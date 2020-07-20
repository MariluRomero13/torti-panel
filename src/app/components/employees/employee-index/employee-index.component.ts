import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationDetailComponent } from '../../notifications/notification-detail/notification-detail.component';
import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { EmployeeService } from './../../../services/employee.service';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  employeeColumns: string[] = ['employee', 'phone', 'status', 'options'];
  constructor(private dialog: MatDialog, private employeeSvc: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeSvc.index().subscribe(employees => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEmployeeDetail(employee): void {
    this.dialog.open(EmployeeDetailsComponent, {
      width: '450px',
      height: '350px',
      data: employee
    });
  }

  searchEmployee = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changeEmployeeStatus(employee) {
    let message = '';
    let confirm = '';
    employee.is_active ?
      (
        confirm = '¿Deseas desactivar el empleado?',
        message = 'Empleado desactivado correctamente') :
      (
        confirm = '¿Deseas activar el empleado?',
        message = 'Empleado activado correctamente'
      );
    confirmMessage(confirm).then(result => {
      if (result.value) {
        this.employeeSvc.delete(employee.id).subscribe(res => {
          if (res.success) {
            successMessage(message).then(() => this.getEmployees());
          }
        });
      }
    });
  }

}
