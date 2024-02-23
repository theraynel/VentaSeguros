import { Component } from '@angular/core';
import { ConsultSales } from 'src/app/seguro/interfaces/consultSales';
import { SaleService } from 'src/app/seguro/services/sale.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BillingService } from 'src/app/seguro/services/billing.service';

@Component({
  selector: 'app-dialog-billing',
  templateUrl: './dialog-billing.component.html',
  providers: [ConfirmationService],
  styles: [],
})
export class DialogBillingComponent {
  public clienteId: number = 0;
  public mostrarDiv: boolean = false;
  public dataFact: any;

  public saleslts: ConsultSales[] = [];

  constructor(
    public saleService: SaleService,
    private billingService: BillingService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public mess: MessageService,
    private confirmDialogService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getSales();
  }

  cambioDiv(filaSeleccionada: any) {
    this.dataFact = this.saleslts.filter((x) => x.idVenta == filaSeleccionada);

    if (this.clienteId !== 0) {
      this.mostrarDiv = true;
    }
  }

  facturar() {
    const sale: ConsultSales = this.dataFact[0];

    this.confirmDialogService.confirm({
      message: 'Deseas Registrar esta Factura?',
      header: 'Register Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.billingService.addBilling(sale).subscribe((res) => {
          const valor: any = res;

          if (res.id > 0) {
            this.ref.close(res);
          } else {
            this.mess.add({
              severity: 'error',
              summary: 'Facturacion',
              detail: valor,
            });

            this.ref.close(res);
          }
        });
      },
      reject: () => {},
    });
  }

  getSales() {
    this.saleService.getSales().subscribe((res: any) => {

      this.saleslts = res;

      this.saleslts.forEach((x) => {
        x.clientePlan = x.cliente + ' - ' + x.nombrePlan;
      });
    });
  }
}
