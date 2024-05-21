import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentification/AuthServices/authentication.service';
import { TokenService } from '../authentification/AuthServices/token.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private localStorageRole:TokenService,private router: Router) {}

  canActivate(): boolean {
    if (this.localStorageRole.getRole() === 'superadmin') {
      return true; // Grant access
    } else {
      this.router.navigate(['/no-access']); // Redirect to a "no access" page
      return false; // Deny access
    }
  }
}
