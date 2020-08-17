import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from './../../../services/sale.service';
import { SaleFormComponent } from './../sale-form/sale-form.component';

@Component({
  selector: 'app-sale-index',
  templateUrl: './sale-index.component.html',
  styleUrls: ['./sale-index.component.css']
})
export class SaleIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  saleColumns: string[] = ['employee','customer','total','options']
  constructor(private dialog: MatDialog, private saleSvc: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  openSaleDialog( sale): void {
    const dialog = this.dialog.open(SaleFormComponent, {
      width: '450px',
      data: {sale}
    });
    dialog.afterClosed().subscribe(() => {
      this.getSales();
    });
  }

  searchSale = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private getSales(): void{
    this.saleSvc.index().subscribe(sales => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = sales;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
