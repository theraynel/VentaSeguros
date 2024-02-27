import { Component } from '@angular/core';
import { Billing } from 'src/app/seguro/interfaces/billings';
import { Clients } from 'src/app/seguro/interfaces/clients';
import { BillingService } from 'src/app/seguro/services/billing.service';
import { ClientService } from 'src/app/seguro/services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';
import { BillingDetailsComponent } from '../../billing/billing-details/billing-details.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-consult-billing',
  templateUrl: './consult-billing.component.html',
  providers: [DialogService],
  styles: [],
})
export class ConsultBillingComponent {
  ref: DynamicDialogRef | undefined;
  public clienteId: number = 0;
  public fechaDesde: string = '';
  public fechaHasta: string = '';

  public billinglts: Billing[] = [];

  public common = new segurosCommon();

  public clients: Clients[] | undefined;

  constructor(
    private clientService: ClientService,
    private billingService: BillingService,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = this.common.getCbListClient(res);
    });
  }

  detalle(det: Billing) {
    this.ref = this.dialogService.open(BillingDetailsComponent, {
      header: 'Detalle de Factura',
      data: det,
    });
  }

  search(){

    this.billingService.getBillings().subscribe((res: any) => {
      console.log(res);

      this.billinglts = res

      if (this.clienteId > 0)
         this.billinglts = this.billinglts.filter((x) => x.idCliente === this.clienteId);

      if (this.fechaDesde != '')
        this.billinglts = this.billinglts.filter(x => new Date(x.fechaFactura).getTime() >=  new Date(this.fechaDesde).getTime());

      if (this.fechaHasta != '')
        this.billinglts = this.billinglts.filter(x => new Date(x.fechaFactura).getTime() <=  new Date(this.fechaHasta).getTime());
    });
  }
}
