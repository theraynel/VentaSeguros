import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/seguro/interfaces/users';
import { UsersService } from 'src/app/seguro/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public firsName: string = '';
  public lastName: string = '';
  public email: string = '';
  public passWord: string = '';
  public confirmPassWord: string = '';

  constructor(private user: UsersService, private router: Router) {}

  register() {
    const data: Users = {
      id: 0,
      nombres: this.firsName,
      apellidos: this.lastName,
      email: this.email,
      password: this.passWord,
    };

    if (this.passWord !== this.confirmPassWord) {
      console.log("La spassword no son iguales ");

    } else {
      this.user.register(data).subscribe((res) => {
        console.log('Respuesta de resgitro', res);

        if (res) {
          this.user.isLoggedIn = true;

          this.router.navigate(['/seguro']);
        } else {
          console.error(res);
        }
      });
    }
  }
}
