import { Component } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChangePassword } from 'src/app/seguro/interfaces/changerPassword';
import { LoginUsersDTO } from 'src/app/seguro/interfaces/loginUserDTO';
import { UsersService } from 'src/app/seguro/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent {
  public passWord: string = '';
  public confirmPassWord: string = '';

  public userInfo: LoginUsersDTO;

  constructor(
    private user: UsersService,
    public ref: DynamicDialogRef,
    private mess: MessageService,
    private config: DynamicDialogConfig
  ) {
    this.userInfo = this.config.data;
  }

  changePassword() {
    const data: ChangePassword = {
      id: this.userInfo.id,
      newPassword: this.passWord,
      changePassword: this.userInfo.changePassword,
      vencimiennto: this.userInfo.vencimiennto,
    };

    console.log(data);

    const fecha: Date = new Date();
    const fecha2: string = new Date().toLocaleString();
    const fecha3 = moment() ;

    console.log("fecha", fecha);
    console.log("fecha2", fecha2);
    console.log("fecha3", fecha3);
    console.log("this.userInfo.vencimiennto", this.userInfo.vencimiennto);
    console.log(fecha3.diff(this.userInfo.vencimiennto, 'second'));



    if (fecha && this.userInfo?.vencimiennto && fecha > this.userInfo.vencimiennto) {
      this.mess.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha y hora han expirado.',
      });
    }else{
      // if (this.passWord !== this.confirmPassWord) {
      //   this.mess.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'Las password no son iguales',
      //   });
      // } else {
      //   this.user.changerPassword(data).subscribe((res) => {
      //     const dataRes: any = res;
      //     if (res.id > 0) {
      //       this.ref.close(res);
      //     } else {
      //       this.mess.add({
      //         severity: 'error',
      //         summary: 'Error',
      //         detail: dataRes,
      //       });
      //     }
      //   });
      // }
    }
  }
}
