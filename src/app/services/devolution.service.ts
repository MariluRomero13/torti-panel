import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DevolutionService {

  constructor(private http: HttpClient) { }
  index() {
    return this.http.get<any>(`${environment.apiUrl}/devolutions`);
  }

  getDateFilteredDevolutions(start_date: any, end_date: any){
    return this.http.post<any>(`${environment.apiUrl}/getdatefiltereddevolutions`, {
      start_date: start_date,
      end_date: end_date
    })
  }
}