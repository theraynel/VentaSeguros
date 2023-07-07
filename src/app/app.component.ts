import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ventaSeguroApp';

  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
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
        ],
      },
    ];
  }
}
