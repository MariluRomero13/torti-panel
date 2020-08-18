import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from './../../../services/sale.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-reports-sale',
  templateUrl: './reports-sale.component.html',
  styleUrls: ['./reports-sale.component.css']
})
export class ReportsSaleComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  saleDateForm:FormGroup;
  dataSource: any;
  saleColumns: string[] = ['employee','customer','total','date']
  constructor(private saleSvc: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  private getSales(): void {
    this.saleSvc.index().subscribe(sales => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = sales;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("sales",sales);

    });
  }

  searchSale = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
