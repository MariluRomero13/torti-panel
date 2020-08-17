
import { Component, OnInit, Inject,AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { EmployeeService } from '../../../services/employee.service';
import { AssignmentProductService } from '../../../services/assignment-product.service';
import { IProduct } from './../../../models/product';
import { IEmployee } from './../../../models/employee';
import { AssignmentProductMessage } from 'src/app/functions/messages';
import { successMessage } from 'src/app/functions/alerts';
@Component({
  selector: 'app-assignmentproduct-form',
  templateUrl: './assignmentproduct-form.component.html',
  styleUrls: ['./assignmentproduct-form.component.css']
})
export class AssignmentproductFormComponent implements OnInit {
  assignmentproductForm: FormGroup;
  product: IProduct;
  employee: IEmployee;
  assignmentproduct:any;
  products;
  employees;
  validationMessages = AssignmentProductMessage;
  constructor(public dialogRef: MatDialogRef<AssignmentproductFormComponent>,
    private productSvc:ProductService,
    private employeeSvc:EmployeeService,
    private assignmentproductSvc: AssignmentProductService,
    @Inject(MAT_DIALOG_DATA) public data: any) {this.createForm();  }

  ngOnInit(): void {
    this.productSvc.indexHasStock().subscribe(res=>{
      this.products = res;
    });
    /*
    this.employeeSvc.index().subscribe(res=>{
      this.employees = res;
    });*/
    this.employeeSvc.index().subscribe(res => {
      this.employees = res.filter(e => e.role_id === 2);
    });
    if(this.data.edit){
      this.show();
    }
  }
  private createForm(): void {
    this.assignmentproductForm = new FormGroup({
      employee_id: new FormControl('', Validators.required),
      stock_id: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.pattern("^[0-9]*$"))
    });
    this.dialogRef.disableClose = true;
  }

  show(): void {
    console.log(this.data.assignmentproduct)
    this.assignmentproductForm.patchValue(this.data.assignmentproduct);
  }

  private getAssignmentProductData(): void {
    this.assignmentproduct = {
      ...this.assignmentproductForm.value
    };
    
    if (this.data.edit) {
      this.assignmentproduct.id = this.data.assignmentproduct.id;
    }

    
  }

  update(): void {
    this.getAssignmentProductData();
    this.assignmentproductSvc.update(this.assignmentproduct).subscribe(res => {
      if (res.success) {
        successMessage('Asignación actualizada correctamente').then(() => this.clear());
      }
    });
  }

  store(): void {
    this.getAssignmentProductData();
    console.log(this.assignmentproduct)
    this.assignmentproductSvc.store(this.assignmentproduct).subscribe(res => {
      if (res.success) {
        successMessage('Asignación registrada correctamente').then(() => this.clear());
      }
    });
  }

  private clear(): void {
    this.assignmentproductForm.reset();
    this.dialogRef.close();
  }

}
