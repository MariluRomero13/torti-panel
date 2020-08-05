import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): any {
    return localStorage.getItem('refresh-token');
  }

  getUser(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  removeAll(): void {
    localStorage.clear();
  }

  setData(data: any) {
    const user = data.user[0];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', data.token.token);
    localStorage.setItem('refresh-token', data.token.refreshToken);
    localStorage.setItem('notifications', '0');
  }
}
