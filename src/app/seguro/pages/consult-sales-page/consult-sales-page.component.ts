import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { InsuranceSale } from '../../interfaces/insuranceSale';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InsuranceSaleComponent } from './insurance-sale/insurance-sale.component';
import { ConsultSales } from '../../interfaces/consultSales';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-consult-sales-page',
  templateUrl: './consult-sales-page.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [
  ]
})
export class ConsultSalesPageComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  public saleslts: ConsultSales[] = [];

  public common = new segurosCommon();

  public sales: InsuranceSale = {
    id: 0,
    idCliente: 0,
    fechaVenta: new Date(),
    montocuota: 0,
    noProducto: '',
    noSeguro: '',
    idTiposeguro: 0,
    idPlan: 0,
    idTipoCuenta: 0,
    estado: true
  }
  constructor(
    private mess: MessageService,
    public saleService: SaleService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales().subscribe((res: any) => {
      console.log(res);

      this.saleslts = res
    });

    console.log(this.saleslts);

  }

  openNew() {
    this.ref = this.dialogService.open(InsuranceSaleComponent, {
      header: 'Venta Seguro',
      data: this.sales,
    });

    this.ref.onClose.subscribe((sale) => {
      this.getSales();

      console.log(sale);
      if (sale !== undefined) {
        if (sale.id > 0) {
          this.mess.add({
            severity: 'success',
            summary: 'Venta Seguro Creado',
            detail: `Venta Seguro creado con Exito!`,
          });
        }
      }
    });
  }

  editSales(sale: ConsultSales) {
    const saleInfo: InsuranceSale = {
      id: sale.idVenta,
      idCliente: sale.idCliente,
      idPlan: sale.idPlan,
      idTipoCuenta: sale.idTipoCuenta,
      idTiposeguro: sale.idTiposeguro,
      fechaVenta: sale.fechaVenta,
      montocuota: sale.montocuota,
      noProducto: sale.noProducto,
      noSeguro: sale.noSeguro,
      estado: sale.estado
    };

    this.ref = this.dialogService.open(InsuranceSaleComponent, {
      header: 'Editar Venta Seguro',
      data: saleInfo,
    });

    this.ref.onClose.subscribe((sales) => {
      this.getSales();

      console.log(sales);
      if (sales !== undefined) {
        if (sales.id > 0) {
          this.mess.add({
            severity: 'success',
            summary: 'Venta Seguro Editado',
            detail: `Venta Seguro editado con Exito!`,
          });
        }
      }
    });
  }

  updateStatus(sale: ConsultSales) {
    if (sale.estado == true) sale.estado = false;
    else sale.estado = true;

    const saleInfo: InsuranceSale = {
      id: sale.idVenta,
      idCliente: sale.idCliente,
      idPlan: sale.idPlan,
      idTipoCuenta: sale.idTipoCuenta,
      idTiposeguro: sale.idTiposeguro,
      fechaVenta: sale.fechaVenta,
      montocuota: sale.montocuota,
      noProducto: sale.noProducto,
      noSeguro: sale.noSeguro,
      estado: sale.estado
    };

    this.saleService
      .editSales(saleInfo.id, saleInfo)
      .subscribe((res) => {
        if (res === null) {
          this.getSales();
        }
      });
  }


  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
