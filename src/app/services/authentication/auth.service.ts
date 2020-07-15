import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { IAuth } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  requestCount = 0;
  constructor(private http: HttpClient, private dataSvc: DataService) { }

  login(credentials: IAuth) {
    return this.http.post<any>(`${environment.apiUrl}/login`, credentials);
  }

  refreshToken(): any {
    return this.http.post<any>(`${environment.apiUrl}/login/refresh-token`, {
      refresh_token: this.dataSvc.getRefreshToken()
    });
  }

  logout() {
    return this.http.post<any>(`${environment.apiUrl}/logout`, {
      refresh_token: this.dataSvc.getRefreshToken()
    }).pipe(
      tap(() => {
        this.dataSvc.removeAll();
      })
    );
  }
}
