import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
//import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'seguro', loadChildren: () => import('./seguro/seguro.module').then(m => m.SeguroModule) },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path:'**', redirectTo:'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
