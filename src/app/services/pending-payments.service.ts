import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PendingPaymentsService {

  constructor(private http: HttpClient) { }
  index() {
    return this.http.get<any>(`${environment.apiUrl}/pendingpayments`);
  }
  getDetails(penpaymntId: number){
    return this.http.get<any>(`${environment.apiUrl}/getpendingpaymentsdetails/${penpaymntId}`)
  }
}
