import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEmployee } from './../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/employees`);
  }

  store(employee: IEmployee) {
    return this.http.post<any>(`${environment.apiUrl}/employees`, employee);
  }

  update(employee: IEmployee) {
    return this.http.put<any>(`${environment.apiUrl}/employees/${employee.id}`, employee);
  }

  delete(employeeId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/employees/${employeeId}`);
  }

  getEmployeeDetails(employeeId: number) {
    return this.http.get<any>(`${environment.apiUrl}/employees/${employeeId}`);
  }
}
