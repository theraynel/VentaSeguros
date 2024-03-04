import { Component } from '@angular/core';
import { UsersService } from 'src/app/seguro/services/users.service';
import { LoginUsers } from '../../seguro/interfaces/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public userName: string = '';
  public passWord: string = '';


  public respuesta: any = '';

  constructor(
    private user: UsersService
  ){}

  login(){

    const data: LoginUsers = {
       username: this.userName,
       password: this.passWord
    };

    this.user.login(data).subscribe((res) => {

       if (res && res.text) {
        this.respuesta = res.text;
        sessionStorage.setItem('token', this.respuesta);
         this.user.isLoggedIn = true;
      } else {
        console.error(res);
      }

    });

  }

}
