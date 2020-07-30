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
    return this.http.put<any>(`${environment.apiUrl}/assignment-customers/${assignment.id}`, assignment);
  }

  delete(assignmentId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/assignment-customers/${assignmentId}`);
  }

  getUnassignedCustomers() {
    return this.http.get(`${environment.apiUrl}/unassigned-customers`);
  }
}
