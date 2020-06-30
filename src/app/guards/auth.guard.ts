import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './../services/authentication/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataSvc: DataService,
              private router: Router) {}

    canActivate() {
      if (!this.dataSvc.getToken()) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}
