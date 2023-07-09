import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';

import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { InsuranceTypesPageComponent } from './pages/insurance-types-page/insurance-types-page.component';
import { AccountTypesPageComponent } from './pages/account-types-page/account-types-page.component';
import { ConsultSalesPageComponent } from './pages/consult-sales-page/consult-sales-page.component';
import { InsuranceSaleComponent } from './pages/consult-sales-page/insurance-sale/insurance-sale.component';
import { DialogPlanComponent } from './pages/plans-page/dialog-plan/dialog-plan.component';

@NgModule({
  declarations: [
    ClientsPageComponent,
    PlansPageComponent,
    InsuranceTypesPageComponent,
    AccountTypesPageComponent,
    ConsultSalesPageComponent,
    InsuranceSaleComponent,
    DialogPlanComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    HttpClientModule
  ]
})
export class SeguroModule { }
