import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private path = '/';
  constructor(private cookieSvc: CookieService) { }

  getToken(): string {
    return this.cookieSvc.get('token');
  }

  getRefreshToken(): any {
    return this.cookieSvc.get('refresh-token');
  }

  getUser(): any {
    return this.cookieSvc.get('user');
  }

  setCookie(name: string, content: string) {
    if (environment.production) {
      this.cookieSvc.set(name, content, null, null, null, true, 'None'); // Produccion
    } else {
      this.cookieSvc.set(name, content, null, null, null, false, 'Strict'); // Desarrollo
    }
  }

  checkCookie(name: string): any {
    return this.cookieSvc.check(name);
  }

  removeCookie(name: string): void {
    this.cookieSvc.delete(name, this.path);
  }

  removeAll(): void {
    if (environment.production) {
      this.cookieSvc.deleteAll(this.path, null, true, 'None'); // Produccion
      this.cookieSvc.deleteAll('/panel', null, true, 'None');
    } else {
      this.cookieSvc.deleteAll(this.path, null, false, 'Strict'); // Desarrollo
      this.cookieSvc.deleteAll('/panel', null, false, 'Strict');
    }
    localStorage.clear();
  }

  setData(data: any) {
    this.setCookie('token', data.token);
    this.setCookie('refresh-token', data.refreshToken);
  }
}
