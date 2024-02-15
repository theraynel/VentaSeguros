import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BillingDetail } from 'src/app/seguro/interfaces/billingDetails';
import { Billing } from 'src/app/seguro/interfaces/billings';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styles: [
  ]
})
export class BillingDetailsComponent {

  public billingInfo: Billing;
  public billingDetailInfo: BillingDetail[] = [];

  public codFactura: number = 0;
  public cliente: string = '';
  public numProduct: string = '';
  public tipoSeguro: string = '';
  public numSeguro: string = '';
  public fechaFactura: Date;

  constructor(
    private config: DynamicDialogConfig,
  ){
    this.codFactura = this.config.data.nombre;
    this.cliente = this.config.data.apellido;
    this.numProduct = this.config.data.cedula;
    this.tipoSeguro = this.config.data.sexo;
    this.numSeguro = this.config.data.id;
    this.fechaFactura = new Date(this.config.data.fechaNacimiento);

    this.billingInfo = this.config.data;

    this.billingDetailInfo = this.billingInfo.detalle;

    console.log("data que llega", this.billingInfo);
    console.log("data que llega detalle", this.billingDetailInfo);

  }
}
