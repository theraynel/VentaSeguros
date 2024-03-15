import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthLoginGuard } from "./guardLogin";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { AuthGuard } from "./guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent, canActivate: [AuthLoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthLoginGuard] },
      { path: 'forgot', component: ForgotPasswordComponent, canActivate: [AuthLoginGuard] },
      { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]}
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
