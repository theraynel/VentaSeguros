import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BillingDetail } from 'src/app/seguro/interfaces/billingDetails';
import { Billing } from 'src/app/seguro/interfaces/billings';

import  {jsPDF} from 'jspdf';
import 'jspdf-autotable';

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


  }

  imprimir(){

    const doc = new jsPDF();
        // Datos de la factura
        const factura = {
          numero: '001',
          fecha: '2024-02-23',
          cliente: 'Cliente Ejemplo',
          direccion: 'Calle Ejemplo, Ciudad Ejemplo',
          telefono: '123456789'
        };


        let startY = 0;

        // Detalle de la factura
        const detalle = [
          { descripcion: 'Producto 1', cantidad: 2, precio_unitario: 10, total: 20 },
          { descripcion: 'Producto 2', cantidad: 1, precio_unitario: 15, total: 15 },
          { descripcion: 'Producto 3', cantidad: 3, precio_unitario: 8, total: 24 }
        ];

        // Configuración de la tabla de detalle
        const columns = ['Descripción', 'Cantidad', 'Precio Unitario', 'Total'];
        const rows = detalle.map(item => [item.descripcion, item.cantidad, item.precio_unitario, item.total]);

                // Agregar otros datos de la factura
                doc.text(`Factura #${factura.numero}`, 14, startY + 10);
                doc.text(`Fecha: ${factura.fecha}`, 14, startY + 20);
                doc.text(`Cliente: ${factura.cliente}`, 14, startY + 30);
                doc.text(`Dirección: ${factura.direccion}`, 14, startY + 40);
                doc.text(`Teléfono: ${factura.telefono}`, 14, startY + 50);

        // Agregar tabla de detalle al PDF
        (doc as any).autoTable({
          head: [columns],
          body: rows
        });

        // Calcular total
        const total = detalle.reduce((acc, item) => acc + item.total, 0);

        // Agregar sección de totales
         startY = (doc as any).autoTable.previous.finalY + 10;
        doc.text('Total: $' + total, 14, startY);



        // Guardar el PDF
        doc.save('factura.pdf');
      }

}
