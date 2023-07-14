import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { MenuComponent } from './components/menu/menu.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    MenuComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    MenuComponent
  ]

})
export class SharedModule { }
