import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [
  ]
})
export class ChangePasswordComponent {

  public passWord: string = ''
  public confirmPassWord: string = ''

  changePassword(){}
}
