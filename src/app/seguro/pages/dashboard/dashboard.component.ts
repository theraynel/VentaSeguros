import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ClientService } from '../../services/client.service';
import { Clients } from '../../interfaces/clients';
import { PlansService } from '../../services/plans.service';
import { Plans } from '../../interfaces/plans';
import { SaleService } from '../../services/sale.service';
import { ConsultSales } from '../../interfaces/consultSales';
import { BillingService } from '../../services/billing.service';
import { Billing } from '../../interfaces/billings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  items!: [
    { label: 'Add New'; icon: 'pi pi-fw pi-plus' },
    { label: 'Remove'; icon: 'pi pi-fw pi-minus' }
  ];

  clientCount: number = 0;

  plansCount: number = 0;
  planslts: Plans[] = [];

  saleslts: ConsultSales[] = [];
  saleCount: number = 0;

  billinglts: Billing[] = [];
  billignAmount: number = 0;

  products!: Product[];

  montosPorMes: any = {};

  data: any;

  options: any;

  constructor(
    private clientService: ClientService,
    private planServices: PlansService,
    public saleService: SaleService,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    this.getInfoChart();
    this.getCardInfo();
  }

  getCardInfo() {
    this.clientService.getClients().subscribe((res: any) => {
      this.clientCount = res.length;
    });

    this.planServices.getPlans().subscribe((response: any) => {
      this.planslts = response;

      this.planslts = this.planslts.filter((x) => x.estado === true);

      this.plansCount = this.planslts.length;
    });

    this.saleService.getSales().subscribe((res: any) => {
      this.saleslts = res;

      this.saleslts = this.saleslts.filter(
        (x) =>
          x.estado === true &&
          new Date(x.fechaVenta).getFullYear() === new Date().getFullYear()
      );

      this.saleCount = this.saleslts.length;
    });

    this.billingService.getBillings().subscribe((res: any) => {
      console.log('res', res);

      this.billinglts = res;

      this.billinglts = this.billinglts.filter(
        (x) =>
          x.estado === true &&
          new Date(x.fechaFactura).getFullYear() === new Date().getFullYear()
      );

      this.procesarMontosPorMes(this.billinglts);

      for (var i = 0; i < this.billinglts.length; i++) {
        this.billignAmount += this.billinglts[i].montoFactura;
      }
    });

  }


  procesarMontosPorMes(facturas: Billing[]): void {

    console.log("factyra", facturas);

    facturas.forEach(factura => {
      const mes = factura.mes;
      const monto = factura.montoFactura;

      console.log("factyra", factura);


      if (!this.montosPorMes[mes]) {
        this.montosPorMes[mes] = monto;
      } else {
        this.montosPorMes[mes] += monto;
      }



    console.log("montosPorMes", this.montosPorMes[0]);
    });
  }

  getInfoChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Facturacion',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Ventas',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
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
