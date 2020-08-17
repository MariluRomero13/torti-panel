import { Component, OnInit,ElementRef, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from './../../../services/sale.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  employee:any; 
  date:any;
  dataSource: any;
  saleDetailsColumns: string[] = ['product', 'quantity', 'total'];
  constructor(private dialog: MatDialog,
               private saleSvc: SaleService,
               @Inject(MAT_DIALOG_DATA) public data: any
               ) { }

  ngOnInit(): void {
    this.getsaleDetails();
  }    

  private getsaleDetails(): void {
    this.saleSvc.getDetails(this.data.sale.id).subscribe(saleDetails => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = saleDetails;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.employee = this.data.sale.assignment.assignment.employees.name;
      this.date = this.data.sale.created_at;
    }, error => {
      
    });
  }


}
