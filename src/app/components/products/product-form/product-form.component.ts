import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { productMessage } from 'src/app/functions/messages';
import { IProduct } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { successMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  product: IProduct;
  validationMessages = productMessage;
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
              private productSvc: ProductService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
    if (this.data.edit) {
      this.show();
    }
  }

  private createForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      unit_price: new FormControl('', Validators.required)
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {
    this.getProductData();
    this.productSvc.store(this.product).subscribe(res => {
      if (res.success) {
        successMessage('Producto registrado correctamente').then(() => this.clear());
      }
    });
  }

  update(): void {
    this.getProductData();
    this.productSvc.update(this.product).subscribe(res => {
      if (res.success) {
        successMessage('Producto actualizado correctamente').then(() => this.clear());
      }
    });
  }

  show(): void {
    this.productForm.patchValue(this.data.product);
  }

  private getProductData(): void {
    this.product = {
      ...this.productForm.value
    };

    if (this.data.edit) {
      this.product.id = this.data.product.id;
    }
  }

  private clear(): void {
    this.productForm.reset();
    this.dialogRef.close();
  }
}
