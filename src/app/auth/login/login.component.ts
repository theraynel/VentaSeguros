import { Component } from '@angular/core';
import { UsersService } from 'src/app/seguro/services/users.service';
import { LoginUsers } from '../../seguro/interfaces/loginUser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService, DialogService],
})
export class LoginComponent {
  ref: DynamicDialogRef | undefined;

  public email: string = '';
  public passWord: string = '';

  constructor(
    private user: UsersService,
    private router: Router,
    public mess: MessageService,
    public dialogService: DialogService
  ) {}

  login() {
    const data: LoginUsers = {
      email: this.email,
      password: this.passWord,
    };

    console.log("entro por esta parte");


    this.user.login(data).subscribe((res) => {
      if (res && res.token) {
        if (res.changePassword) {
          this.mess.add({
            severity: 'success',
            summary: 'Change Password',
            detail: 'Debe agregar su nueva Contraseña',
          });

          setTimeout(() => {
            this.ref = this.dialogService.open(ChangePasswordComponent, {
              header: 'Change Password',
              data: res,
            });

            this.ref.onClose.subscribe((changer) => {
              if (changer !== undefined) {
                if (changer.id > 0) {
                  this.mess.add({
                    severity: 'success',
                    summary: 'Change Passworda',
                    detail: `Contraseña modificada con Exito!`,
                  });

                  setTimeout(() => {
                    sessionStorage.setItem(
                      'currentUser',
                      JSON.stringify({
                        name: res.nombres,
                        token: res.token,
                        id: res.id,
                        lastname: res.apellidos,
                      })
                    );
                    this.router.navigate(['/seguro']);
                  }, 2000);
                }
              }
            });
          }, 3000);
        } else {
          sessionStorage.setItem(
            'currentUser',
            JSON.stringify({
              name: res.nombres,
              token: res.token,
              id: res.id,
              lastname: res.apellidos,
            })
          );
          this.router.navigate(['/seguro']);
        }
      } else {
        console.log("Entro el primer error del login");
        console.log("res", res);

        const valor: any = res;
        this.mess.add({
          severity: 'error',
          summary: 'Error',
          detail: valor,
        });
      }
    });
  }

  register() {
    this.router.navigate(['auth/register']);
  }

  forgot() {
    this.router.navigate(['auth/forgot']);
  }
}
