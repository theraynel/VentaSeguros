import { Component } from '@angular/core';
import { UsersService } from 'src/app/seguro/services/users.service';
import { LoginUsers } from '../../seguro/interfaces/loginUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public email: string = '';
  public passWord: string = '';


  constructor(private user: UsersService, private router: Router) {}

  login() {
    const data: LoginUsers = {
      email: this.email,
      password: this.passWord,
    };

    this.user.login(data).subscribe((res) => {
      console.log('Respuesta', res);

      if (res && res.token) {
        sessionStorage.setItem('token', String(res.token));
        this.user.isLoggedIn = true;

        this.router.navigate(['/seguro']);
      } else {
        console.error(res);
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
