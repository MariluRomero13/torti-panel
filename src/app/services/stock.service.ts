import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IStock } from './../models/stock';
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/stock`);
  }

  store(stock: IStock) {
    return this.http.post<any>(`${environment.apiUrl}/stock`, stock);
  }

  update(stock: IStock) {
    return this.http.put<any>(`${environment.apiUrl}/stock/${stock.id}`, stock);
  }
}
