import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  saleColumns: string[] = ['product', 'quantity', 'status', 'total', 'description'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeliveryDetailsComponent>,
              private assignmentSvc: AssignCustomerService) { this.dialogRef.disableClose = true;  }

  ngOnInit(): void {
    this.index();
  }

  private index(): void {
    this.assignmentSvc.getSoldProducts(this.data.id).subscribe(products => {
      const sales = this.setSales(products.sales);
      const lostProducts = this.setLostProducts(products.lostProducts);
      const productsCompleted = [];
      productsCompleted.push(...sales);
      productsCompleted.push(...lostProducts);
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = productsCompleted;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private setSales(sales) {
    // Status 1- Vendido, 2- Pendiente, 3- Vendido
    const newSales = [];
    sales.forEach(sale => {
      sale.details.forEach(detail => {
        newSales.push({
          product: detail.product.name,
          quantity: detail.quantity,
          status: sale.status === 1 || sale.status === 3 ? 1 : 2,
          total: `$${detail.total}`,
          description: 'Sin descripción'
        });
      });
    });
    return newSales;
  }

  private setLostProducts(sales) {
    const newLostProducts = [];
    sales.forEach(sale => {
      if (sale.lost_products.length > 0) {
        sale.lost_products.forEach(detail => {
          newLostProducts.push({
            product: detail.product.name,
            quantity: detail.quantity,
            status: 3,
            total: 'Sin total',
            description: detail.description
          });
        });
      }
    });
    return newLostProducts;
  }
}
