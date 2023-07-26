import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Clients } from '../../interfaces/clients';
import { ClientService } from '../../services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  providers: [MessageService, ConfirmationService],
  styles: [],
})
export class ClientsPageComponent implements OnInit {

  public clientlts: Clients[] = [];

  public common = new segurosCommon;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients(){
     this.clientService.getClients().subscribe( (res: any) =>{
        this.clientlts = res;
     })
  }

  openNew() {}

  editClient(client: Clients) {}

  deleteClient(client: Clients) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
    });
  }
}
