export interface InsuranceSale
{
    id: number,
    idCliente: number,
    fechaVenta: Date,
    Montocuota: number,
    noProducto: string,
    NoSeguro: string,
    idTiposeguro: number,
    idPlan: number,
    idTipoCuenta: number
}
