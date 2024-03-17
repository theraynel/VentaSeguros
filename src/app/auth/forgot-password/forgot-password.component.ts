import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/seguro/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  public email: string = '';

  constructor(
    private user: UsersService,
    private router: Router,
    public mess: MessageService
  ) {}

  forgotPassword() {
    this.user.forgotPassword(this.email).subscribe((res) => {
      if (res.id > 0) {
        this.mess.add({
          severity: 'success',
          summary: 'Forgot Password',
          detail: res.token,
        });

        // Agrega un retraso antes de la navegación
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      } else {
        const valor: any = res;
        this.mess.add({
          severity: 'error',
          summary: 'Forgot Password',
          detail: valor,
        });
      }
    });
  }
}
