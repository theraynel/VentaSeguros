import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: any[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: 'seguro/dashboard'
      },
      {
        label: 'Consultas',
        icon: 'pi pi-fw pi-file-pdf',
        items: [
          {
            label: 'Ventas por Rango de Fechas',
            icon: 'pi pi-cart-plus',
            routerLink: 'seguro/consultSales'
          },
          {
            label: 'Facturacion por Rango de Fechas',
            icon: 'pi pi-credit-card',
            routerLink: 'seguro/consultBilling'
          }
        ]
      },
      {
        label: 'Administacion',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Planes',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: 'seguro/plans'
          },
          {
            label: 'Tipo Cuentas',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: 'seguro/accountType'
          },
          {
            label: 'Tipo Seguro',
            icon: 'pi pi-fw pi-lock',
            routerLink: 'seguro/insuranceTypes'
          },
        ],
      },
      {
        label: 'Operaciones',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'Cliente',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'seguro/clients'
          },
          {
            label: 'Venta Seguro',
            icon: 'pi pi-cart-plus',
            routerLink: 'seguro/sales'
          },
          {
             label: 'Facturacion',
             icon: 'pi pi-credit-card',
             routerLink: 'seguro/billing'
          },
        ],
      },

    ];
  }


}
