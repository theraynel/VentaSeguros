import { Component } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../interfaces/billings';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styles: [],
})
export class BillingComponent {
  public billinglts: Billing[] = [];

  public common = new segurosCommon();

  constructor(private clientService: BillingService) {}

  ngOnInit() {
    this.getBillings();
  }

  getBillings() {
    this.clientService.getBillings().subscribe((res: any) => {
      console.log('res', res);

      this.billinglts = res;
    });
  }

  updateStatus(sale: Billing) {

    console.log("Esta entrando por aqui");

    // if (sale.estado == true) sale.estado = false;
    // else sale.estado = true;

    // const saleInfo: InsuranceSale = {
    //   id: sale.idVenta,
    //   idCliente: sale.idCliente,
    //   idPlan: sale.idPlan,
    //   idTipoCuenta: sale.idTipoCuenta,
    //   idTiposeguro: sale.idTiposeguro,
    //   fechaVenta: sale.fechaVenta,
    //   montocuota: sale.montocuota,
    //   noProducto: sale.noProducto,
    //   noSeguro: sale.noSeguro,
    //   estado: sale.estado
    // };

    // this.saleService
    //   .editSales(saleInfo.id, saleInfo)
    //   .subscribe((res) => {
    //     if (res === null) {
    //       this.getSales();
    //     }
    //   });
  }

  detalle(det: Billing){}
  imprimir(imp: Billing){}
}
