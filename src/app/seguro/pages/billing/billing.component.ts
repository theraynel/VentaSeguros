import { DialogBillingComponent } from './dialog-billing/dialog-billing.component';
import { Component } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../interfaces/billings';
import { segurosCommon } from 'src/app/shared/common/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [],
})
export class BillingComponent {
  ref: DynamicDialogRef | undefined;

  public billinglts: Billing[] = [];

  public common = new segurosCommon();

  constructor(
         private billingService: BillingService,
         public dialogService: DialogService,
         private mess: MessageService,
) {}

  ngOnInit() {
    this.getBillings();
  }

  getBillings() {
    this.billingService.getBillings().subscribe((res: any) => {
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

  detalle(det: Billing){
    this.ref = this.dialogService.open(BillingDetailsComponent, {
      header: 'Detalle de Factura',
      data: det,
    });
  }
  imprimir(imp: Billing){

  }
  openNew(){
    this.ref = this.dialogService.open(DialogBillingComponent, {
      header: 'Agregar Factura',
      data: null,
    });

    this.ref.onClose.subscribe((client) => {
      this.getBillings();

      console.log(client);
      if (client !== undefined) {
        if (client.id > 0) {
          this.mess.add({
            severity: 'success',
            summary: 'Creacion de Factura',
            detail: `Factura creada con Exito!`,
          });
        }
      }
    });
  }
}
