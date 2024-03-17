import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthLoginGuard } from "./guardLogin";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent, canActivate: [AuthLoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthLoginGuard] },
      { path: 'forgot', component: ForgotPasswordComponent, canActivate: [AuthLoginGuard] },
      // { path: 'change', component: ChangePasswordComponent, canActivate: [AuthGuard]}
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
