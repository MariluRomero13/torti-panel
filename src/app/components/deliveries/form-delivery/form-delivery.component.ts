import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { successMessage } from 'src/app/functions/alerts';
import { dateFormat } from 'src/app/functions/dateFormats';
import { deliveryMessage } from 'src/app/functions/messages';
import { AssignCustomerService } from 'src/app/services/assign-customer.service';

@Component({
  selector: 'app-form-delivery',
  templateUrl: './form-delivery.component.html',
  styleUrls: ['./form-delivery.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat }
  ]
})
export class FormDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  delivery: any;
  validationMessages = deliveryMessage;
  constructor(public dialogRef: MatDialogRef<FormDeliveryComponent>,
              private assignSvc: AssignCustomerService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm(); }

  ngOnInit(): void {
    if (this.data.edit) {
      this.deliveryForm.get('deliveryDate').setValue(this.data.assignment.delivery_date);
    }
  }

  private createForm(): void {
    this.deliveryForm = new FormGroup({
      deliveryDate: new FormControl('', Validators.required),
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {
    this.getProductData();
    this.assignSvc.storeDelivery(this.delivery).subscribe(res => {
      if (res.success) {
        successMessage('Entrega registrado correctamente').then(() => this.clear());
      }
    });
  }

  update(): void {
    this.getProductData();
    this.assignSvc.updateDelivery(this.delivery).subscribe(res => {
      if (res.success) {
        successMessage('Entrega actualizada correctamente').then(() => this.clear());
      }
    });
  }

  private getProductData(): void {
    this.delivery = {
      assignments_customers_id: this.data.edit ?  this.data.assignment.assignments_customers_id
        : this.data.assignment.id,
      delivery_date: moment(this.deliveryForm.get('deliveryDate').value).format('YYYY-MM-DD'),
      id: this.data.edit ? this.data.assignment.id : ''
    };
  }

  private clear(): void {
    this.deliveryForm.reset();
    this.dialogRef.close();
  }

}
