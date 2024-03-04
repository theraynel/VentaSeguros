import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { PlansService } from '../../services/plans.service';
import { Plans } from '../../interfaces/plans';
import { SaleService } from '../../services/sale.service';
import { ConsultSales } from '../../interfaces/consultSales';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../interfaces/billings';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  clientCount: number = 0;

  plansCount: number = 0;
  planslts: Plans[] = [];

  saleslts: ConsultSales[] = [];
  saleCount: number = 0;

  billinglts: Billing[] = [];
  billignAmount: number = 0;

  montosPorMes: any = {};

  meseseChar: any[] = [];
  montosChar: any[] = [];
  cantidadChar: any[] = [];

  public common = new segurosCommon();

  data: any;

  options: any;

  constructor(
    private clientService: ClientService,
    private planServices: PlansService,
    public saleService: SaleService,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    this.getCardInfo();
    this.getInfoChart();
  }

  getCardInfo() {
    //#region card de clientes
    this.clientService.getClients().subscribe((res: any) => {
      this.clientCount = res.length;
    });

    //#endregion

    //#region Card Plan
    this.planServices.getPlans().subscribe((response: any) => {
      this.planslts = response;

      this.planslts = this.planslts.filter((x) => x.estado === true);

      this.plansCount = this.planslts.length;
    });
    //#endregion

    //#region Card Sale
    this.saleService.getSales().subscribe((res: any) => {
      this.saleslts = res;

      this.saleslts = this.saleslts.filter(
        (x) =>
          x.estado === true &&
          new Date(x.fechaVenta).getFullYear() === new Date().getFullYear()
      );

      this.procesarMontosPorMes(this.saleslts);

      this.saleCount = this.saleslts.length;
    });
    //#endregion

    //#region Card Billing
    this.billingService.getBillings().subscribe((res: any) => {
      this.billinglts = res;

      this.billinglts = this.billinglts.filter(
        (x) =>
          x.estado === true &&
          new Date(x.fechaFactura).getFullYear() === new Date().getFullYear()
      );

      for (var i = 0; i < this.billinglts.length; i++) {
        this.billignAmount += this.billinglts[i].montoFactura;
      }
    });
    //#endregion
  }

  procesarMontosPorMes(facturas: ConsultSales[]): void {
    console.log('factyrasssssss', facturas);

    facturas.forEach((factura) => {
      const mes = new Date(factura.fechaVenta).getMonth() + 1;
      const monto = factura.montocuota;

      if (!this.montosPorMes[mes]) {
        this.montosPorMes[mes] = { monto: monto, count: 1 };
      } else {
        this.montosPorMes[mes].monto += monto;
        this.montosPorMes[mes].count++;
      }
    });

    // Convertir el objeto montosPorMes a un objeto char
    for (var key in this.montosPorMes) {
      this.meseseChar.push(this.common.getMes(Number(key)));
      this.montosChar.push(this.montosPorMes[key].monto);
      this.cantidadChar.push(this.montosPorMes[key].count);
    }

    this.getInfoChart();
  }

  getInfoChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: this.meseseChar,
      datasets: [
        {
          type: 'bar',
          label: 'Ventas en Monto',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: this.montosChar,
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Ventas en Cantidad',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: this.cantidadChar,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
