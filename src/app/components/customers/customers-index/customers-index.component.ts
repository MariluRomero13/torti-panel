import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from './../customer-form/customer-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-customers-index',
  templateUrl: './customers-index.component.html',
  styleUrls: ['./customers-index.component.css']
})
export class CustomersIndexComponent implements OnInit {
  customerColumns: string[] = ['name', 'phone', 'status', 'options'];
  dataSource:any;

  constructor(private dialog: MatDialog, private customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers(): void {
    this.customerSvc.index().subscribe(customers => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = customers;
    })
  }

  openCustomerDialog(edit, customer): void {
    const dialog = this.dialog.open(CustomerFormComponent, {
      width: 'auto',
      height: 'auto',
      data: { edit, customer }
    });
    dialog.afterClosed().subscribe(() => {
      this.getCustomers();
    });
  }


  searchCustomer = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changeCustomerStatus(customer) {
    let message = '';
    let confirm = '';
    customer.is_active ?
      (
        confirm = '¿Deseas desactivar el cliente?',
        message = 'Cliente desactivado correctamente') :
      (
        confirm = '¿Deseas activar el cliente?',
        message = 'Cliente activado correctamente'
      );
    confirmMessage(confirm).then(result => {
      if (result.value) {
        this.customerSvc.delete(customer.id).subscribe(res => {
          if (res.success) {
            successMessage(message).then(() => this.getCustomers());
          }
        });
      }
    });
  }

}
