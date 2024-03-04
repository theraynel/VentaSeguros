import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AppLayoutComponent } from './app.layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'seguro', loadChildren: () => import('./seguro/seguro.module').then(m => m.SeguroModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
