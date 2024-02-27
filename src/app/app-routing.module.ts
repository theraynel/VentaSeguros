import { ConsultBillingComponent } from './seguro/pages/all-consult/consult-billing/consult-billing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsPageComponent } from './seguro/pages/clients-page/clients-page.component';
import { AccountTypesPageComponent } from './seguro/pages/account-types-page/account-types-page.component';
import { ConsultSalesPageComponent } from './seguro/pages/consult-sales-page/consult-sales-page.component';
import { InsuranceTypesPageComponent } from './seguro/pages/insurance-types-page/insurance-types-page.component';
import { PlansPageComponent } from './seguro/pages/plans-page/plans-page.component';
import { DashboardComponent } from './seguro/pages/dashboard/dashboard.component';
import { BillingComponent } from './seguro/pages/billing/billing.component';
import { ConsultSalesComponent } from './seguro/pages/all-consult/consult-sales/consult-sales.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'sales',
    component: ConsultSalesPageComponent
  },
  {
    path: 'consultSales',
    component: ConsultSalesComponent
  },
  {
    path: 'clients',
    component: ClientsPageComponent
  },
  {
     path: 'billing',
     component: BillingComponent
  },
  {
     path: 'consultBilling',
     component: ConsultBillingComponent
  },
  {
    path: 'plans',
    component: PlansPageComponent
  },
  {
    path: 'accountType',
    component: AccountTypesPageComponent
  },
  {
    path: 'insuranceTypes',
    component:InsuranceTypesPageComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
