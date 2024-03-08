import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './seguro/services/users.service';
import { AuthService } from './seguro/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
})
export class AppLayoutComponent {
  constructor(private router: Router, private authService: AuthService ) {}

  ngOnInit() {
  }

  cerrarSession() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
