import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/seguro/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent {

  public email: string = '';

  constructor(private user: UsersService, private router: Router) { }

  forgotPassword(){
    console.log("Entro al dato", this.email);

    this.user.forgotPassword(this.email).subscribe((res) => {
      var data: string = res;

      console.log("data", data);


      if (data.trim() === "Corre Envia Exitosamente!") {
        console.log("Valor", res);

        this.router.navigate(['/auth/login']);
      } else {
        console.log(data);

      }
    });
  }
}
