import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from './../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<IRole>(`${environment.apiUrl}/roles`);
  }
}
