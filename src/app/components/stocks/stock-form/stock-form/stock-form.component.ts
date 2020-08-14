import { Component, OnInit, Inject,AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stockMessage } from 'src/app/functions/messages';
import { IProduct } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { successMessage } from 'src/app/functions/alerts';
import { IStock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;
  product: IProduct;
  stock: IStock;
  products;
  validationMessages = stockMessage;
  constructor(public dialogRef: MatDialogRef<StockFormComponent>,
              private productSvc:ProductService,
              private stockSvc:StockService,
              @Inject(MAT_DIALOG_DATA) public data: any) {this.createForm(); }

  ngOnInit(): void {

    this.productSvc.index().subscribe(res=>{
      this.products = res;
    });
    this.stockForm.get('actual_stock').disable()
    if(this.data.edit){
      this.stockForm.get('actual_stock').enable()
      this.show();
    }
     
  }

  private createForm(): void {
    this.stockForm = new FormGroup({
      product_id: new FormControl('', Validators.required),
      initial_stock: new FormControl('',Validators.pattern("^[0-9]*$")),
      actual_stock: new FormControl('',Validators.pattern("^[0-9]*$"))
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {
    this.getStockData();
    console.log("El stock", this.stock);
    this.stock.actual_stock=this.stock.initial_stock
    this.stockSvc.store(this.stock).subscribe(res => {
      if (res.success) {
        successMessage('Inventario registrado correctamente').then(() => this.clear());
      }
    });
  }

  update(): void {
    this.getStockData();
    this.stockSvc.update(this.stock).subscribe(res => {
      if (res.success) {
        successMessage('Inventario actualizado correctamente').then(() => this.clear());
      }
    });
  }

  show(): void {
    this.stockForm.patchValue(this.data.stock);
  }

  private getStockData(): void {
    this.stock = {
      ...this.stockForm.value
    };
    
    if (this.data.edit) {
      this.stock.id = this.data.stock.id;
    }

    
  }

  private clear(): void {
    this.stockForm.reset();
    this.dialogRef.close();
  }

}
