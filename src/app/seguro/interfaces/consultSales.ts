export interface ConsultSales
{
    idVenta: number,
    idCliente: number,
    cliente: string,
    cedula: string,
    fechaNacimiento: Date
    sexo?: string,
    fechaVenta: Date,
    noSeguro: string,
    montocuota: number,
    noProducto: string,
    idTiposeguro: number,
    codTiposeguro: string,
    nombreTiposeguro: string,
    idPlan: number,
    codPlan: string,
    nombrePlan: string,
    idTipoCuenta: number,
    codTipoCuenta: string,
    nombreTipoCuenta: string,
    estado:boolean
    clientePlan?: string,
    userId: number,
    usuario: string
}
