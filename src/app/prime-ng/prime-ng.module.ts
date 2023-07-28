import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    PanelMenuModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    ToolbarModule,
    TagModule,
    ChartModule,
    CalendarModule,
    InputMaskModule,
    DropdownModule
  ]
})
export class PrimeNgModule { }
