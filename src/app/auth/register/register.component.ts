import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginUsers } from 'src/app/seguro/interfaces/loginUser';
import { Users } from 'src/app/seguro/interfaces/users';
import { UsersService } from 'src/app/seguro/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent {
  public firsName: string = '';
  public lastName: string = '';
  public email: string = '';
  public passWord: string = '';
  public confirmPassWord: string = '';

  constructor(private user: UsersService, private router: Router, public mess: MessageService) {}

  register() {
    const data: Users = {
      id: 0,
      nombres: this.firsName,
      apellidos: this.lastName,
      email: this.email,
      password: this.passWord,
    };

    if (this.passWord !== this.confirmPassWord) {
      this.mess.add({
          severity: 'error',
          summary: 'Error',
          detail: 'La password no son iguales'
      });
    } else {
      this.user.register(data).subscribe((res) => {
        const dataRes: any = res;

        if (res.id > 0) {
          const data: LoginUsers = {
            email: this.email,
            password: this.passWord,
          };

          this.user.login(data).subscribe((res) => {
            const dataLogin: any = res;
            if (res && res.token) {
              sessionStorage.setItem(
                'currentUser',
                JSON.stringify({
                  name: res.nombres,
                  token: res.token,
                  id: res.id,
                })
              );
              this.router.navigate(['/seguro']);
            } else {
              this.mess.add({
                severity: 'error',
                summary: 'Error',
                detail: dataLogin
              });
            }
          });
        } else {
          this.mess.add({
            severity: 'error',
            summary: 'Error',
            detail: dataRes
          });
        }
      });
    }
  }
}
