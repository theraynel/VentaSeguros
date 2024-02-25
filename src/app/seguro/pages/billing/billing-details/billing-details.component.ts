import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BillingDetail } from 'src/app/seguro/interfaces/billingDetails';
import { Billing } from 'src/app/seguro/interfaces/billings';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styles: [],
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

  constructor(private config: DynamicDialogConfig) {
    this.codFactura = this.config.data.nombre;
    this.cliente = this.config.data.apellido;
    this.numProduct = this.config.data.cedula;
    this.tipoSeguro = this.config.data.sexo;
    this.numSeguro = this.config.data.id;
    this.fechaFactura = new Date(this.config.data.fechaNacimiento);

    this.billingInfo = this.config.data;

    this.billingDetailInfo = this.billingInfo.detalle;
  }

  imprimir() {
    const doc = new jsPDF();

    let startY = 0;

    // Configuración de la tabla de detalle
    const columns = ['Nombre', 'Cantidad', 'Precio Unitario', 'Total'];
    const rows = this.billingDetailInfo.map((item) => [
      item.plan,
      1,
      '$' + item.montoCuota.toFixed(2),
      '$' + item.montoCuota.toFixed(2),
    ]);

    // Agregar otros datos de la factura
    doc.setFontSize(22);
    doc.setFont("times");

    doc.text(`Factura`, 14, startY + 35,);
    doc.setFontSize(13)
    doc.text(`Codigo Factura: ${this.billingInfo.id}`, 14, startY + 50);
    doc.text(`Cliente: ${this.billingInfo.cliente}`, 14, startY + 55);
    doc.text(`Número de Producto: ${this.billingDetailInfo[0].noProducto}`, 14, startY + 60);
    doc.text(`Tipo de Seguro: ${this.billingDetailInfo[0].tipoSeguro}`, 14, startY + 65);
    doc.text(`Número de Seguro: ${this.billingDetailInfo[0].noSeguro}`, 14, startY + 70);
    doc.text(`Fecha Factura: ${new Date(this.billingInfo.fechaFactura).toLocaleString()}`, 14, startY + 75);

    // Agregar tabla de detalle al PDF
    (doc as any).autoTable({
      startY: 90,
      head: [columns],
      body: rows,
    });

    // Calcular total
    const total = this.billingDetailInfo.reduce((acc, item) => acc + item.montoCuota, 0);

    // Agregar sección de totales
    startY = (doc as any).autoTable.previous.finalY + 20;
    doc.text('Subtotal: $' + total, 14, startY);
    doc.text('Impuestos: $' + 0.00, 14, startY + 5);
    doc.text('Total: $' + total, 14, startY + 10);

    // Guardar el PDF
    doc.save('factura.pdf');
  }
}
