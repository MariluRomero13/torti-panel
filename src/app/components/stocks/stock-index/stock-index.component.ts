import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { StockFormComponent } from '../stock-form/stock-form/stock-form.component';

@Component({
  selector: 'app-stock-index',
  templateUrl: './stock-index.component.html',
  styleUrls: ['./stock-index.component.css']
})
export class StockIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  stockColumns: string[] = ['product','initial_stock','actual_stock','options'];
  constructor(private dialog: MatDialog, private productSvc: ProductService,private stockSvc: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }
  private getStocks(): void {
    this.stockSvc.index().subscribe(stocks => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = stocks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  searchStock = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openStockDialog(edit, stock): void{
    const dialog = this.dialog.open(StockFormComponent,{
      width: '450px',
      height: '290px',
      data: { edit, stock }
    })
    dialog.afterClosed().subscribe(() => {
      this.getStocks();
    });
  }

}
