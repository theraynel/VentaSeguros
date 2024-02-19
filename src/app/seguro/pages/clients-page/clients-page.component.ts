import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Clients } from '../../interfaces/clients';
import { ClientService } from '../../services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';
import { DialogClientsComponent } from './dialog-clients/dialog-clients.component';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [],
})
export class ClientsPageComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  public clientlts: Clients[] = [];

  public client: Clients = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    fechaNacimiento: new Date(),
    sexo: '',
  };

  public common = new segurosCommon();

  constructor(
    private mess: MessageService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((res: any) => {
      this.clientlts = res;
    });
  }

  openNew() {
    this.ref = this.dialogService.open(DialogClientsComponent, {
      header: 'Crear Cliente',

      data: this.client,
    });

    this.ref.onClose.subscribe((client) => {
      this.getClients();

      console.log(client);
      if (client !== undefined) {
        if (client.id > 0) {
          this.mess.add({
            severity: 'success',
            summary: 'Cliente Creado',
            detail: `Cliente ${client.nombre} creado con Exito!`,
          });
        }
      }
    });
  }

  editClient(client: Clients) {
    this.ref = this.dialogService.open(DialogClientsComponent, {
      header: 'Editar Cliente',
      data: client,
    });

    this.ref.onClose.subscribe((client) => {
      this.getClients();

      console.log(client);
      if (client !== undefined) {
        if (client.id > 0) {
          this.mess.add({
            severity: 'success',
            summary: 'Cliente Editado',
            detail: `Cliente ${client.nombre} editado con Exito!`,
          });
        }
      }
    });
  }

  deleteClient(client: Clients) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar a ' + client.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.deleteClient(client.id).subscribe((res) => {
          if (res === null) {
            this.getClients();
            this.mess.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Registro eliminado Correctamente!',
            });
          }
        });
      },
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
