import { Component, OnInit } from '@angular/core';
import { AccountTypes } from '../../interfaces/accountTypes';
import { AccountTypeService } from '../../services/account-type.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogAccountTypesComponent } from './dialog-account-types/dialog-account-types.component';

@Component({
  selector: 'app-account-types-page',
  templateUrl: './account-types-page.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
  styles: []
})
export class AccountTypesPageComponent implements OnInit {
  ref?: DynamicDialogRef;

  public accountTypes: AccountTypes[] = [];

  constructor(
    private accountServices: AccountTypeService,
    public dialogService: DialogService,
    public mess: MessageService,
    private confirmDialogService: ConfirmationService
  ){}

  public accountType: AccountTypes = {
    id: 0,
    codigo: '',
    estado : false,
    nombre: ''
   }

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
     })
  }

  openEdit(account: AccountTypes){

    this.ref = this.dialogService.open(DialogAccountTypesComponent, {
      header: 'Editar Tipo de Cuenta',
      data: account,
    });

    this.ref.onClose.subscribe((res) => {
      this.getAccountType();
    })
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
