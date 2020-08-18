import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from './../../../services/sale.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-sale',
  templateUrl: './reports-sale.component.html',
  styleUrls: ['./reports-sale.component.css']
})
export class ReportsSaleComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  saleDateForm:FormGroup;
  start_date:any;
  end_date:any;
  dataSource: any;
  saleColumns: string[] = ['employee','customer','total','date']
  constructor(private saleSvc: SaleService) { this.createForm() }

  ngOnInit(): void {
     this.getSales();
  }

  private getSales(): void {
    this.saleSvc.index().subscribe(sales => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = sales;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }

  searchDateSales() {
    this.start_date = moment(this.saleDateForm.get('start_date').value).format('YYYY-MM-DD')
    this.end_date = moment(this.saleDateForm.get('end_date').value).format('YYYY-MM-DD')
    this.saleSvc.getDateFilteredSales(this.start_date, this.end_date).subscribe(sales => {
      console.log(sales)
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = sales;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    console.log(this.start_date)
    console.log(this.end_date)
  }

  private createForm(): void {
    const current_date = moment.utc().local().format('YYYY-MM-DD');
    const last_month = moment(current_date).subtract(1, 'month').format('YYYY-MM-DD');
    this.saleDateForm = new FormGroup({
      start_date: new FormControl(last_month, Validators.required),
      end_date: new FormControl(current_date, Validators.required)
    });
  }

  searchSale = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
