import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { InsuranceTypesPageComponent } from './pages/insurance-types-page/insurance-types-page.component';
import { AccountTypesPageComponent } from './pages/account-types-page/account-types-page.component';
import { ConsultSalesPageComponent } from './pages/consult-sales-page/consult-sales-page.component';
import { InsuranceSaleComponent } from './pages/consult-sales-page/insurance-sale/insurance-sale.component';






@NgModule({
  declarations: [
    ClientsPageComponent,
    PlansPageComponent,
    InsuranceTypesPageComponent,
    AccountTypesPageComponent,
    ConsultSalesPageComponent,
    InsuranceSaleComponent


  ],
  imports: [
    CommonModule
  ]
})
export class SeguroModule { }
