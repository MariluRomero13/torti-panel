import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { ProductFormComponent } from './../product-form/product-form.component';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  productColumns: string[] = ['name', 'price', 'status', 'options'];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    const products = [
      { id: 1, name: 'Kilo de Masa', price: '52', status: true },
      { id: 2, name: 'Frijoles', price: '20', status: false }
    ];
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = products;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openProductDialog(edit, product): void {
    this.dialog.open(ProductFormComponent, {
      width: '450px',
      height: '290px',
      data: { edit, product }
    });
  }

  searchProduct = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changeProductStatus(product) {
    let message = '';
    let confirm = '';
    product.status ?
      (
        confirm = '¿Deseas desactivar el producto?',
        message = 'Producto desactivado correctamente') :
      (
        confirm = '¿Deseas activar el producto?',
        message = 'Producto activado correctamente'
      );
    confirmMessage(confirm).then(result => {
      if (result.value) {
        successMessage(message).then(() => this.getProducts());
      }
    });
  }

}
