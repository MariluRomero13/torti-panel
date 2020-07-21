import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<any>(`${environment.apiUrl}/notifications`);
  }

  show(notificationId: number) {
    return this.http.get<any>(`${environment.apiUrl}/notifications/${notificationId}`);
  }
}
