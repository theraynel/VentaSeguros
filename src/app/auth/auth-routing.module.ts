import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthLoginGuard } from "./guardLogin";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent, canActivate: [AuthLoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthLoginGuard] }
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
