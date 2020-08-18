import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { DevolutionService } from './../../../services/devolution.service';
@Component({
  selector: 'app-reports-devolutions',
  templateUrl: './reports-devolutions.component.html',
  styleUrls: ['./reports-devolutions.component.css']
})
export class ReportsDevolutionsComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  saleDateForm:FormGroup;
  dataSource: any;
  employeeColumns: string[] = ['product', 'quantity', 'date'];
  constructor(private devolutionSvc: DevolutionService) { }

  ngOnInit(): void {
    this.getDevolutions();
  }

  searchDevolution = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private getDevolutions(): void {
    this.devolutionSvc.index().subscribe(devolutions => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = devolutions;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("devolutions",devolutions);

    });
  }

}
