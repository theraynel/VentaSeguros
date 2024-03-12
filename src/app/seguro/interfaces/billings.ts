import { BillingDetail } from './billingDetails';

export interface Billing
{
   id: number,
   idVenta: number,
   idCliente: number,
   cliente?: string,
   anio: number
   mes: number,
   montoFactura: number,
   fechaFactura: Date,
   estado: boolean,
   user_id: number,
   detalle: BillingDetail[]
}
