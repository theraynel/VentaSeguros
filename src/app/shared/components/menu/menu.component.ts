import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Administacion',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Planes',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: 'plans'
          },
          {
            label: 'Tipo Cuentas',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: 'accountType'
          },
          {
            label: 'Tipo Seguro',
            icon: 'pi pi-fw pi-lock',
            routerLink: 'insuranceTypes'
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
            routerLink: 'clients'
          },
          {
            label: 'Venta Seguro',
            icon: 'pi pi-cart-plus',
            routerLink: 'consultSale'
          },
          {
             label: 'Facturacion',
             icon: 'pi pi-credit-card',
             routerLink: 'billing'
          },
        ],
      },
      {
        label: 'Reportes',
        icon: 'pi pi-fw pi-file-pdf',
        items: [
          {
            label: 'Ventas por Rango de Fechas',
            icon: 'pi pi-cart-plus',
          },
          {
            label: 'Facturacion por Rango de Fechas',
            icon: 'pi pi-credit-card',
          },
          {
            label: 'Listado Cliente',
            icon: 'pi pi-fw pi-user-plus',
          },
        ]
      }
    ];
  }


}
