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
    private confirmDialogService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getBillings();
  }

  getBillings() {
    this.billingService.getBillings().subscribe((res: any) => {

      this.billinglts = res;

      this.billinglts = this.billinglts.filter((x) => x.estado === true);

    });
  }

  updateStatus(sale: Billing) {

    this.confirmDialogService.confirm({
      message: 'Seguro que deseas cancelar esta Factura?',
      header: 'Cancelation Confirmation',
      icon: 'pi pi-trash',
      accept: () => {

        if (sale.estado == true) sale.estado = false;
        else sale.estado = true;

        const saleInfo: Billing = {
          id: sale.id,
          idCliente: sale.idCliente,
          idVenta: sale.idVenta,
          anio: sale.anio,
          mes: sale.mes,
          fechaFactura: sale.fechaFactura,
          montoFactura: sale.montoFactura,
          estado: sale.estado,
          detalle: []
        };

        console.log("SaleInfo", saleInfo);


        this.billingService
          .editBilling(saleInfo.id, saleInfo)
          .subscribe((res) => {
            if (res === null) {
              this.getBillings();
              this.mess.add({
                severity: 'success',
                summary: 'Cancelación de Factura',
                detail: `Factura cancelada con Exito!`,
              });
            }
          });
      },
      reject: () => { },
    });
  }

  detalle(det: Billing) {
    this.ref = this.dialogService.open(BillingDetailsComponent, {
      header: 'Detalle de Factura',
      data: det,
    });
  }

  openNew() {
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
