import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './../services/authentication/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private dataSvc: DataService,
              private router: Router) { }

  canActivate() {
    if (this.dataSvc.getToken()) {
      this.router.navigate(['/panel/dashboard']);
      return false;
    }
    return true;
  }

}
