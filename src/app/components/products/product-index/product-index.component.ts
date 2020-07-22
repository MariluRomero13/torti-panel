import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { ProductFormComponent } from './../product-form/product-form.component';
import { ProductService } from './../../../services/product.service';

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
  constructor(private dialog: MatDialog, private productSvc: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.productSvc.index().subscribe(products => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openProductDialog(edit, product): void {
    const dialog = this.dialog.open(ProductFormComponent, {
      width: '450px',
      height: '290px',
      data: { edit, product }
    });
    dialog.afterClosed().subscribe(() => {
      this.getProducts();
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
    product.is_active ?
      (
        confirm = '¿Deseas desactivar el producto?',
        message = 'Producto desactivado correctamente') :
      (
        confirm = '¿Deseas activar el producto?',
        message = 'Producto activado correctamente'
      );
    confirmMessage(confirm).then(result => {
      if (result.value) {
        this.productSvc.delete(product.id).subscribe(res => {
          if (res.success) {
            successMessage(message).then(() => this.getProducts());
          }
        });
      }
    });
  }

}
