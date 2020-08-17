import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/sales`);
  }
  getDetails(saleId: number){
    return this.http.get<any>(`${environment.apiUrl}/getsaledetails/${saleId}`)
  }
}
