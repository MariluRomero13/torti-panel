import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from './../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/products`);
  }

  store(product: IProduct) {
    return this.http.post<any>(`${environment.apiUrl}/products`, product);
  }

  update(product: IProduct) {
    return this.http.put<any>(`${environment.apiUrl}/products/${product.id}`, product);
  }

  delete(productId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/products/${productId}`);
  }
  indexHasStock() {
    return this.http.get<any>(`${environment.apiUrl}/producthasstock`);
  }
}
