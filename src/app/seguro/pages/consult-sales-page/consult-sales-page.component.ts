import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { InsuranceSale } from '../../interfaces/insuranceSale';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InsuranceSaleComponent } from './insurance-sale/insurance-sale.component';

@Component({
  selector: 'app-consult-sales-page',
  templateUrl: './consult-sales-page.component.html',
  providers: [MessageService, ConfirmationService, DialogService],
  styles: [
  ]
})
export class ConsultSalesPageComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  public saleslts: InsuranceSale[] = [];

 public sales: InsuranceSale = {
    id: 0,
    idCliente: 0,
    fechaVenta: new Date(),
    montocuota: 0,
    noProducto: '',
    noSeguro: '',
    idTiposeguro: 0,
    idPlan: 0,
    idTipoCuenta: 0
}
  constructor(
       private mess: MessageService,
       public saleService: SaleService,
       private confirmationService: ConfirmationService,
       public dialogService: DialogService
  ){}

  ngOnInit() {
    this.getSales();
  }

  getSales() {
     this.saleService.getSales().subscribe( (res: any) => {
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

  editClient(sale: InsuranceSale) {
    this.ref = this.dialogService.open(InsuranceSaleComponent, {
      header: 'Editar Venta Seguro',
      data: sale,
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


  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
