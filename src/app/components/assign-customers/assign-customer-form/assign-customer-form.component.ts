import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { successMessage } from 'src/app/functions/alerts';
import { IEmployee } from 'src/app/models/employee';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';
import { assignMessage } from './../../../functions/messages';
import { EmployeeService } from './../../../services/employee.service';

@Component({
  selector: 'app-assign-customer-form',
  templateUrl: './assign-customer-form.component.html',
  styleUrls: ['./assign-customer-form.component.css']
})
export class AssignCustomerFormComponent implements OnInit, OnDestroy {
  assignForm: FormGroup;
  assignment: any;
  employees: IEmployee[];
  customers: any;
  validationMessages = assignMessage;
  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;
  public filteredCustomer: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public customerFilterCtrl: FormControl = new FormControl();
  protected onDestroy = new Subject<void>();
  constructor(public dialogRef: MatDialogRef<AssignCustomerFormComponent>,
              private assignSvc: AssignCustomerService,
              private employeeSvc: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
    if (this.data.edit) {
      this.show();
    } else {
      this.getEmployees();
      this.getUnassignedCustomers();
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private createForm(): void {
    this.assignForm = new FormGroup({
      employee: new FormControl('', Validators.required),
      customers: new FormControl('', Validators.required)
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {
    // this.getProductData();
    // this.assignSvc.store(this.product).subscribe(res => {
    //   if (res.success) {
    //     successMessage('Producto registrado correctamente').then(() => this.clear());
    //   }
    // });
  }

  update(): void {
    // this.getProductData();
    // this.assignSvc.update(this.product).subscribe(res => {
    //   if (res.success) {
    //     successMessage('Producto actualizado correctamente').then(() => this.clear());
    //   }
    // });
  }

  show(): void {
    this.assignForm.patchValue(this.data.product);
  }

  private getProductData(): void {
    // this.product = {
    //   ...this.assignForm.value
    // };

    // if (this.data.edit) {
    //   this.product.id = this.data.product.id;
    // }
  }

  private clear(): void {
    this.assignForm.reset();
    this.dialogRef.close();
  }

  private getEmployees(): void {
    this.employeeSvc.index().subscribe(employees => {
      this.employees = employees;
    });
  }

  private getUnassignedCustomers(): void {
    this.assignSvc.getUnassignedCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  protected setInitialValue() {
    this.filteredCustomer
    .pipe(take(1), takeUntil(this.onDestroy))
    .subscribe(() => {
      this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
    });
  }

  protected filterData(array: any, filter: any, filtered: any) {
    if (!array) {
      return;
    }
    let search = filter.value;
    if (!search) {
      filtered.next(array.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    filtered.next(
      array.filter(customer => customer.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private searcher(array: any, filter: any, filtered) {
    filtered.next(array.slice());
    filter.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterData(array, filter, filtered);
      });
  }

}
