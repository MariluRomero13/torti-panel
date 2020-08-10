import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignCustomerService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(`${environment.apiUrl}/assignment-customers`);
  }

  store(assignment: any) {
    return this.http.post<any>(`${environment.apiUrl}/assignment-customers`, assignment);
  }

  update(assignment: any) {
    return this.http.put<any>(`${environment.apiUrl}/assignment-customers/${assignment.employee_id}`, assignment);
  }

  show(employeId: number) {
    return this.http.get<any>(`${environment.apiUrl}/assignment-customers/${employeId}`);
  }

  delete(assignmentId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/assignment-customers/${assignmentId}`);
  }

  getUnassignedCustomers() {
    return this.http.get(`${environment.apiUrl}/unassigned-customers`);
  }

  storeDelivery(delivery: any) {
    return this.http.post<any>(`${environment.apiUrl}/deliveries`, delivery);
  }

  updateDelivery(delivery: any) {
    return this.http.put<any>(`${environment.apiUrl}/deliveries/${delivery.id}`, delivery);
  }

  getDeliveriesPerCustomer(assignmentId: number) {
    return this.http.get<any>(`${environment.apiUrl}/deliveries/${assignmentId}`);
  }

  cancelDelivery(assignmentDetailId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/deliveries/${assignmentDetailId}`);
  }

  getDailyDeliveries() {
    return this.http.get<any>(`${environment.apiUrl}/daily-deliveries`);
  }

  getRecordDeliveries() {
    return this.http.get<any>(`${environment.apiUrl}/record-deliveries`);
  }

  getFutureDeliveries() {
    return this.http.get<any>(`${environment.apiUrl}/future-deliveries`);
  }
}
