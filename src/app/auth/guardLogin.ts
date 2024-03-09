import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../seguro/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {

      this.router.navigate(['seguro']);
      return false;
    }
    return true;
  }
}
