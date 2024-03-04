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

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'sales', component: ConsultSalesPageComponent, },
      { path: 'consultSales', component: ConsultSalesComponent, },
      { path: 'clients', component: ClientsPageComponent, },
      { path: 'billing', component: BillingComponent, },
      { path: 'consultBilling', component: ConsultBillingComponent, },
      { path: 'plans', component: PlansPageComponent, },
      { path: 'accountType', component: AccountTypesPageComponent, },
      { path: 'insuranceTypes', component: InsuranceTypesPageComponent, },
      { path: 'dashboard', redirectTo: ''}
    ]),
  ],
  exports: [RouterModule],
})
export class SeguroRoutingModule {}
