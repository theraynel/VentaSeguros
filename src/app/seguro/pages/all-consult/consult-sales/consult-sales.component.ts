import { Component } from '@angular/core';
import { Clients } from 'src/app/seguro/interfaces/clients';
import { ConsultSales } from 'src/app/seguro/interfaces/consultSales';
import { ClientService } from 'src/app/seguro/services/client.service';
import { SaleService } from 'src/app/seguro/services/sale.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-consult-sales',
  templateUrl: './consult-sales.component.html',
  styles: [
  ]
})
export class ConsultSalesComponent {
  public clienteId: number = 0;
  public fechaDesde: string = "";
  public fechaHasta: string = "";
  public saleslts: ConsultSales[] = [];

  public common = new segurosCommon();

  public clients: Clients[] | undefined;

  constructor(
    private clientService: ClientService,
    public saleService: SaleService,
  ) { }

  ngOnInit() {
    this.getClients();
  }


  getClients() {
    this.clientService.getClients().subscribe((res: any) => {
      this.clients = this.common.getCbListClient(res);
    });
  }

  search(){

    this.saleService.getSales().subscribe((res: any) => {
      console.log(res);

      this.saleslts = res

      if (this.clienteId > 0)
         this.saleslts = this.saleslts.filter((x) => x.idCliente === this.clienteId);

      if (this.fechaDesde != '')
        this.saleslts = this.saleslts.filter(x => new Date(x.fechaVenta).getTime() >=  new Date(this.fechaDesde).getTime());

      if (this.fechaHasta != '')
        this.saleslts = this.saleslts.filter(x => new Date(x.fechaVenta).getTime() <=  new Date(this.fechaHasta).getTime());
    });
  }

}
