import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignCustomerDetailsComponent } from '../assign-customer-details/assign-customer-details.component';
import { AssignCustomerFormComponent } from '../assign-customer-form/assign-customer-form.component';
import { AssignCustomerService } from './../../../services/assign-customer.service';

@Component({
  selector: 'app-assign-customer-index',
  templateUrl: './assign-customer-index.component.html',
  styleUrls: ['./assign-customer-index.component.css']
})
export class AssignCustomerIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  assignmentColumns: string[] = ['employee', 'phone', 'customers', 'options'];
  constructor(private dialog: MatDialog, private assignmentSvc: AssignCustomerService) { }

  ngOnInit(): void {
    this.index();
  }

  private index(): void {
    this.assignmentSvc.index().subscribe(assignment => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = assignment;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAssignmentDetails(assignment): void {
    this.dialog.open(AssignCustomerDetailsComponent, {
      width: '450px',
      height: '350px',
      data: assignment
    });
  }

  openAssignmentForm(edit, assignment): void {
    const dialog = this.dialog.open(AssignCustomerFormComponent, {
      width: '450px',
      height: '290px',
      data: { edit, assignment }
    });
    dialog.afterClosed().subscribe(() => {
      this.index();
    });
  }

  searchAssignment = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
