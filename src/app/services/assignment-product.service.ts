import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentProductService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/assignmentproduct`);
  }

  store(assignmentproduct: any) {
    return this.http.post<any>(`${environment.apiUrl}/assignmentproduct`, assignmentproduct);
  }

  update(assignmentproduct: any) {
    return this.http.put<any>(`${environment.apiUrl}/assignmentproduct/${assignmentproduct.id}`, assignmentproduct);
  }
}
