import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DevolutionService } from './../../../services/devolution.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-reports-devolutions',
  templateUrl: './reports-devolutions.component.html',
  styleUrls: ['./reports-devolutions.component.css']
})
export class ReportsDevolutionsComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  devolutionDateForm:FormGroup;
  dataSource: any;
  start_date:any;
  end_date:any;
  employeeColumns: string[] = ['product', 'quantity', 'date'];
  constructor(private devolutionSvc: DevolutionService) { this.createForm() }

  ngOnInit(): void {
    this.getDevolutions();
  }

  private createForm(): void {
    const current_date = moment.utc().local().format('YYYY-MM-DD');
    const last_month = moment(current_date).subtract(1, 'month').format('YYYY-MM-DD');
    this.devolutionDateForm = new FormGroup({
      start_date: new FormControl(last_month, Validators.required),
      end_date: new FormControl(current_date, Validators.required)
    });
  }

  searchDevolution = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  searchDateDevolutions() {
    this.start_date = moment(this.devolutionDateForm.get('start_date').value).format('YYYY-MM-DD')
    this.end_date = moment(this.devolutionDateForm.get('end_date').value).format('YYYY-MM-DD')
    this.devolutionSvc.getDateFilteredDevolutions(this.start_date, this.end_date).subscribe(devolutions => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = devolutions;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    console.log(this.start_date)
    console.log(this.end_date)
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
