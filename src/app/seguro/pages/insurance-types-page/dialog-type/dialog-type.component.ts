import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { InsuranceTypes } from 'src/app/seguro/interfaces/insuranceTypes';
import { InsuranceTypeService } from 'src/app/seguro/services/insurance-type.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-dialog-type',
  templateUrl: './dialog-type.component.html',
  providers: [MessageService],
  styles: [],
})
export class DialogTypeComponent {
  public name: string = '';
  public code: string = '';
  public estado: boolean = false;
  public id: number = 0;
  public user_id: number = 0;

  public common = new segurosCommon();

  typeForm = this.fb.group({
    nameType: ['', Validators.required],
    codeType: ['', Validators.required],
  });

  constructor(
    private typeServices: InsuranceTypeService,
    private mess: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.name = this.config.data.nombre;
    this.code = this.config.data.codigo;
    this.estado = this.config.data.estado;
    this.id = this.config.data.id;
    this.user_id = this.config.data.user_id;
  }

  addInsuranceType() {
    const type: InsuranceTypes = {
      id: this.id,
      codigo: this.code,
      nombre: this.name,
      estado: true,
      user_id: this.common.getUserId(),
    };

    this.typeServices.addInsuranceType(type).subscribe((res) => {
      if (res.id > 0) {
        this.ref.close(res);
      } else {
        this.mess.add({
          severity: 'error',
          summary: 'Tipo de Seguro Creado',
          detail: 'A ocurrido un error al crear Tipo de Seguro',
        });
      }
    });
  }

  editInsuranceType() {
    if (this.id > 0) {
      const type: InsuranceTypes = {
        id: this.id,
        codigo: this.code,
        nombre: this.name,
        estado: this.estado,
        user_id: this.user_id
      };

      this.typeServices.editInsuranceType(this.id, type).subscribe((res) => {
        if (res === null) {
          this.ref.close(type);
        } else {
          this.mess.add({
            severity: 'error',
            summary: 'Tipo de Seguro Editado',
            detail: 'A ocurrido un error al crear Tipo de Seguro',
          });
        }
      });
    } else {
      this.mess.add({
        severity: 'error',
        summary: 'Tipo de Seguro Editado',
        detail: 'Debe enviar la data a Editar',
      });
    }
  }

  close() {
    this.ref.close();
  }
}
