import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';


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
    InputTextModule
  ]
})
export class PrimeNgModule { }
