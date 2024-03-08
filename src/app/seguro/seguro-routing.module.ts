import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConsultSalesPageComponent } from './pages/consult-sales-page/consult-sales-page.component';
import { ConsultSalesComponent } from './pages/all-consult/consult-sales/consult-sales.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ConsultBillingComponent } from './pages/all-consult/consult-billing/consult-billing.component';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { AccountTypesPageComponent } from './pages/account-types-page/account-types-page.component';
import { InsuranceTypesPageComponent } from './pages/insurance-types-page/insurance-types-page.component';
import { AuthGuard } from '../auth/guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: ConsultSalesPageComponent, canActivate: [AuthGuard]},
      { path: 'consultSales', component: ConsultSalesComponent, canActivate: [AuthGuard]},
      { path: 'clients', component: ClientsPageComponent, canActivate: [AuthGuard]},
      { path: 'billing', component: BillingComponent, canActivate: [AuthGuard]},
      { path: 'consultBilling', component: ConsultBillingComponent, canActivate: [AuthGuard]},
      { path: 'plans', component: PlansPageComponent, canActivate: [AuthGuard]},
      { path: 'accountType', component: AccountTypesPageComponent, canActivate: [AuthGuard]},
      { path: 'insuranceTypes', component: InsuranceTypesPageComponent, canActivate: [AuthGuard]},
      { path: 'dashboard', redirectTo: ''}
    ]),
  ],
  exports: [RouterModule],
})
export class SeguroRoutingModule {}
