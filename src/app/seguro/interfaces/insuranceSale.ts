export interface InsuranceSale
{
    id: number,
    idCliente: number,
    fechaVenta: Date,
    montocuota: number,
    noProducto: string,
    noSeguro: string,
    idTiposeguro: number,
    idPlan: number,
    idTipoCuenta: number
}
