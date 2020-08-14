import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICustomer } from './../models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/customers`);
  }

  store(customer: ICustomer) {
    return this.http.post<any>(`${environment.apiUrl}/customers`, customer);
  }

  update(customer: ICustomer) {
    return this.http.put<any>(`${environment.apiUrl}/customers/${customer.id}`, customer);
  }

  delete(customerId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/customers/${customerId}`);
  }
}
