import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { InsuranceTypesPageComponent } from './pages/insurance-types-page/insurance-types-page.component';
import { AccountTypesPageComponent } from './pages/account-types-page/account-types-page.component';
import { ConsultSalesPageComponent } from './pages/consult-sales-page/consult-sales-page.component';
import { InsuranceSaleComponent } from './pages/consult-sales-page/insurance-sale/insurance-sale.component';
import { DialogPlanComponent } from './pages/plans-page/dialog-plan/dialog-plan.component';
import { DialogTypeComponent } from './pages/insurance-types-page/dialog-type/dialog-type.component';
import { DialogAccountTypesComponent } from './pages/account-types-page/dialog-account-types/dialog-account-types.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogClientsComponent } from './pages/clients-page/dialog-clients/dialog-clients.component';

@NgModule({
  declarations: [
    ClientsPageComponent,
    PlansPageComponent,
    InsuranceTypesPageComponent,
    AccountTypesPageComponent,
    ConsultSalesPageComponent,
    InsuranceSaleComponent,
    DialogPlanComponent,
    DialogTypeComponent,
    DialogAccountTypesComponent,
    DashboardComponent,
    DialogClientsComponent,
  ],
  imports: [CommonModule, PrimeNgModule, HttpClientModule, FormsModule],
})
export class SeguroModule {}
