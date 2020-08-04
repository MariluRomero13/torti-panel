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
  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect;
  public filteredCustomer: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public customerCtrl: FormControl = new FormControl();
  protected onDestroy = new Subject<void>();
  constructor(public dialogRef: MatDialogRef<AssignCustomerFormComponent>,
              private assignSvc: AssignCustomerService,
              private employeeSvc: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
    this.getEmployees();
    this.getUnassignedCustomers();
    if (this.data.edit) {
      this.show();
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
    this.getAssignmentData();
    this.assignSvc.store(this.assignment).subscribe(res => {
      if (res.success) {
        successMessage('Asignación registrada correctamente').then(() => this.clear());
      }
    });
  }

  update(): void {
    this.getAssignmentData();
    this.assignSvc.update(this.assignment).subscribe(res => {
      if (res.success) {
        successMessage('Asignación editada correctamente').then(() => this.clear());
      }
    });
  }

  show(): void {
    this.assignForm.get('employee').setValue(this.data.assignment.id);
    this.assignForm.get('employee').disable();
    this.assignSvc.show(this.data.assignment.id).subscribe(res => {
      const customers = [];
      const customersSaved = [];
      res[0].assignCustomer.forEach(assign => {
        customersSaved.push(assign.customers);
      });

      this.assignForm.get('customers').setValue(customersSaved);
      customers.push(...this.customers);
      customers.push(...customersSaved);
      this.customers = customers;
      this.searcher(this.customers, this.customerCtrl , this.filteredCustomer);
    });
  }

  private getAssignmentData(): void {
    const customerSelected = this.assignForm.get('customers').value;
    const customers = [];
    customerSelected.forEach(customer => {
      customers.push(customer.id);
    });
    this.assignment = {
      employee_id: this.assignForm.get('employee').value,
      customers
    };
  }

  private clear(): void {
    this.assignForm.reset();
    this.dialogRef.close();
  }

  private getEmployees(): void {
    this.employeeSvc.index().subscribe(employees => {
      this.employees = employees.filter(e => e.role_id === 2);
    });
  }

  private getUnassignedCustomers(): void {
    this.assignSvc.getUnassignedCustomers().subscribe(customers => {
      this.customers = customers;
      this.searcher(this.customers, this.customerCtrl , this.filteredCustomer);
    });
  }

  protected setInitialValue() {
    this.filteredCustomer
    .pipe(take(1), takeUntil(this.onDestroy))
    .subscribe(() => {
      this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
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
