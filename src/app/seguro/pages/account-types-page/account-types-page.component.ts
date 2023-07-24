import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AccountTypes } from '../../interfaces/accountTypes';
import { DialogAccountTypesComponent } from './dialog-account-types/dialog-account-types.component';

import { AccountTypeService } from '../../services/account-type.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-account-types-page',
  templateUrl: './account-types-page.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
  styles: []
})
export class AccountTypesPageComponent implements OnInit {
  ref?: DynamicDialogRef;

  public accountTypes: AccountTypes[] = [];

  public accountType: AccountTypes = { id: 0, codigo: '',  estado : false, nombre: '' }

  public common = new segurosCommon;

  constructor(
    private accountServices: AccountTypeService,
    public dialogService: DialogService,
    public mess: MessageService,
    private confirmDialogService: ConfirmationService
  ){}

  ngOnInit(): void {
     this.getAccountType();
  }

  getAccountType(){
     this.accountServices.getAccountType().subscribe((res: any) =>{
        this.accountTypes = res;
     });
  }

  show(){
     this.ref = this.dialogService.open(DialogAccountTypesComponent, {
      header: 'Crear Tipo de Cuenta',
      data: this.accountType,
     });

     this.ref.onClose.subscribe((res) =>{
        this.getAccountType();

        if (res !== undefined) {
          this.mess.add({
            severity: 'success',
            summary: 'Tipo de Cuenta Creado',
            detail: `Tipo de Cuenta ${res.nombre} creado con Exito!`
          });
        }
     })
  }

  openEdit(account: AccountTypes){

    this.ref = this.dialogService.open(DialogAccountTypesComponent, {
      header: 'Editar Tipo de Cuenta',
      data: account,
    });

    this.ref.onClose.subscribe((res) => {
      this.getAccountType();

      if (res !== undefined) {
        this.mess.add({
          severity: 'success',
          summary: 'Tipo de Cuenta Editado',
          detail: `Tipo de Cuenta ${res.nombre} editada con Exito!`
        });
      }
    });
  }

  delete(account: AccountTypes){
    this.confirmDialogService.confirm({
      message: 'Deseas eliminar este Registro?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () =>{
        this.accountServices.deleteAccountType(account.id).subscribe((resp) =>{
           if (resp == null) {
            this.getAccountType();
            this.mess.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Registro eliminado Correctamente!',
            });
           }
        })
      },
      reject: () => {},
    });
  }
}
