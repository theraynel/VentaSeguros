import { DialogTypeComponent } from './dialog-type/dialog-type.component';
import { Component, OnInit } from '@angular/core';
import { InsuranceTypes } from '../../interfaces/insuranceTypes';
import { InsuranceTypeService } from '../../services/insurance-type.service';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-insurance-types-page',
  templateUrl: './insurance-types-page.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [],
})
export class InsuranceTypesPageComponent implements OnInit {
  public types: InsuranceTypes[] = [];

  ref: DynamicDialogRef | undefined;

  public type: InsuranceTypes = {
    id: 0,
    codigo: '',
    nombre: '',
    estado: false,
  };

  constructor(
    private typeServices: InsuranceTypeService,
    public mess: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getInsuranceType();
  }

  getInsuranceType() {
    this.typeServices.getInsurenceType().subscribe((res: any) => {
      this.types = res;
    });
  }

  show() {
    this.ref = this.dialogService.open(DialogTypeComponent, {
      header: 'Crear Tipo de Seguro',
      data: this.type,
    });

    this.ref.onClose.subscribe((type) => {
      this.getInsuranceType();
      if (type !== undefined) {
        this.mess.add({
          severity: 'success',
          summary: 'Tipo de Seguro Creado',
          detail: `Tipo de Seguro ${type.nombre} creado con Exito!`,
        });
      }
    });
  }

  openEdit(type: InsuranceTypes) {
    this.ref = this.dialogService.open(DialogTypeComponent, {
      header: 'Editar Tipo de Seguro',
      data: type,
    });

    this.ref.onClose.subscribe((type) => {
      this.getInsuranceType();
      if (type !== undefined) {
        this.mess.add({
          severity: 'success',
          summary: 'Tipo de Seguro Editado',
          detail: `Tipo de Seguro ${type.nombre} editado con Exito!`,
        });
      }
    });
  }

  delete(type: InsuranceTypes) {
   this.confirmationService.confirm({
       message: 'Deseas eliminar este Registro?',
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () =>{
         this.typeServices.deleteInsuranceType(type.id).subscribe((res) =>{
            if (res === null) {
               this.getInsuranceType();
               this.mess.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Registro eliminado Correctamente!',
              });
            }
         });
       },
       reject: () =>{},
   });

  }
}
