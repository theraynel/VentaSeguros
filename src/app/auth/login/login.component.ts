import { Component } from '@angular/core';
import { UsersService } from 'src/app/seguro/services/users.service';
import { LoginUsers } from '../../seguro/interfaces/loginUser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
  public email: string = '';
  public passWord: string = '';

  constructor(private user: UsersService, private router: Router, public mess: MessageService) { }

  login() {
    const data: LoginUsers = {
      email: this.email,
      password: this.passWord,
    };

    this.user.login(data).subscribe((res) => {
      if (res && res.token) {
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({ name: res.nombres, token: res.token, id: res.id, lastname: res.apellidos })
        );
        this.router.navigate(['/seguro']);
      } else {
        const valor: any = res;
        this.mess.add({
          severity: 'error',
          summary: 'Error',
          detail: valor
        })
      }
    });
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}
