import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AccountTypes } from './../../../interfaces/accountTypes';

import { AccountTypeService } from 'src/app/seguro/services/account-type.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-dialog-account-types',
  templateUrl: './dialog-account-types.component.html',
  providers: [MessageService],
  styles: [],
})
export class DialogAccountTypesComponent {
  public name: string = '';
  public code: string = '';
  public id: number = 0;
  public estado: boolean = false;
  public user_id: number = 0;

  public common = new segurosCommon();

  public respose?: AccountTypes;

  accountForm = new FormGroup({
    nameGroup: new FormControl('', Validators.required),
    codeGroup: new FormControl('', Validators.required),
  });

  constructor(
    private accountServices: AccountTypeService,
    public ref: DynamicDialogRef,
    public mess: MessageService,
    public config: DynamicDialogConfig
  ) // private fb: FormBuilder
  {
    this.name = config.data.nombre;
    this.code = this.config.data.codigo;
    this.estado = this.config.data.estado;
    this.id = this.config.data.id;
    this.user_id = this.config.data.user_id
  }

  addAccountType() {
    const account: AccountTypes = {
      id: this.id,
      codigo: this.code,
      nombre: this.name,
      estado: true,
      user_id: this.common.getUserId(),
    };

    this.accountServices.addAccountType(account).subscribe((res) => {
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
  editAccountType() {
    if (this.id > 0) {
      const account: AccountTypes = {
        id: this.id,
        codigo: this.code,
        nombre: this.name,
        estado: this.estado,
        user_id: this.user_id
      };

      this.accountServices
        .editAccountType(account.id, account)
        .subscribe((resp) => {
          if (resp === null) {
            this.ref.close(account);
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
