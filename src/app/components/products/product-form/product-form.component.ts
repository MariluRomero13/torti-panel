import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { productMessage } from 'src/app/functions/messages';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  validationMessages = productMessage;
  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {}

  update(): void {}
}
